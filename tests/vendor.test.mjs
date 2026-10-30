import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";

// Run the browser module without a DOM. Validation must stay independent of UI.
const context = vm.createContext({});
vm.runInContext(
  readFileSync(new URL("../dist/vendor.js", import.meta.url), "utf8"),
  context,
);
const flow = vm.runInContext("VendorFlow", context);
const required = {
  id: "first",
  label: "First name",
  type: "text",
  required: true,
};
test("required values reject empty and whitespace-only input", () => {
  assert.ok(flow.validate(required, ""));
  assert.ok(flow.validate(required, "   "));
  assert.equal(flow.validate(required, "Sam"), "");
});
test("optional fields allow empty values", () => {
  assert.equal(flow.validate({ ...required, required: false }, ""), "");
});
test("email format is validated", () => {
  const field = { ...required, type: "email" };
  for (const value of [
    "invalid",
    "user@",
    "user@example",
    "user name@example.com",
  ])
    assert.ok(flow.validate(field, value));
  assert.equal(flow.validate(field, "vendor@example.com"), "");
});
test("selects reject values outside the configured choices", () => {
  const field = {
    id: "area",
    label: "Area",
    type: "select",
    required: true,
    options: [["pearl", "Pearl"]],
  };
  assert.ok(flow.validate(field, "unknown"));
  assert.equal(flow.validate(field, "pearl"), "");
});
test("phone numbers require a usable number of digits", () => {
  const field = { ...required, type: "tel" };
  assert.ok(flow.validate(field, "abc123"));
  assert.equal(flow.validate(field, "(323) 555-0123"), "");
});
test("length limits apply even if client input constraints are bypassed", () => {
  assert.ok(flow.validate(required, "a".repeat(201)));
  assert.ok(flow.validate({ ...required, type: "textarea" }, "a".repeat(1501)));
});

test("new and returning paths keep separate drafts and never reuse event choices", () => {
  flow.selectPath("returning");
  const returning = flow.snapshot();
  assert.equal(Object.keys(returning.data).length, 0);
  assert.equal(returning.data.event, undefined);
  assert.equal(returning.data.area, undefined);
  returning.data.email = "changed@example.com";
  assert.equal(flow.snapshot().data.email, undefined);
  flow.selectPath("new");
  assert.equal(Object.keys(flow.snapshot().data).length, 0);
  flow.selectPath("returning");
  assert.equal(flow.snapshot().data.first, undefined);
  assert.throws(() => flow.selectPath("invalid"));
});

test("payment preference is required only for returning vendors and is never preselected", () => {
  flow.selectPath("new");
  assert.equal(flow.fields(4)[0].id, "signerName");
  assert.match(flow.render(), /No payment is collected during the application/);
  flow.selectPath("returning");
  const preference = flow.fields(4)[0];
  assert.equal(preference.id, "paymentPreference");
  assert.equal(flow.snapshot().data.paymentPreference, undefined);
  assert.ok(flow.validate(preference, ""));
  assert.ok(flow.validate(preference, "charge-now"));
  assert.equal(flow.validate(preference, "on-file"), "");
  assert.equal(flow.validate(preference, "new-after-acceptance"), "");
  flow.selectPath("new");
  assert.equal(flow.fields(4)[0].id, "signerName");
});

test("space estimates use live-form prices and reject invalid cross-area choices", () => {
  assert.equal(flow.quote("orange", "orange-3", "2").total, 25000);
  assert.equal(flow.quote("pearl", "pearl-6", "5").total, 50000);
  assert.equal(flow.quote("stadium", "stadium-6", "1").total, 50000);
  assert.equal(flow.quote("orange", "pearl-6", "1"), null);
  for (const quantity of ["", "0", "6", "1.5", "invalid"])
    assert.equal(flow.quote("orange", "orange-3", quantity), null);
});

test("new vendor sequence is contact, space request, selling details, required forms, review", () => {
  flow.selectPath("new");
  assert.equal(flow.fields(0)[0].id, "first");
  assert.equal(flow.fields(1)[0].id, "event");
  assert.equal(flow.fields(2)[0].id, "category");
  assert.equal(flow.fields(3)[0].id, "status");
  assert.equal(flow.fields(4)[0].id, "signerName");
  const markup = flow.render();
  assert.ok(
    markup.indexOf("Seller / Business Contact") <
      markup.indexOf("Space / Plot Request"),
  );
  assert.ok(
    markup.indexOf("Space / Plot Request") <
      markup.indexOf("Permit Verification"),
  );
  assert.doesNotMatch(
    markup,
    /Vendor sections|Let’s find your place|Start fresh/,
  );
  flow.selectPath("returning");
  assert.equal(flow.fields(0)[0].id, "first");
  assert.equal(flow.fields(1)[0].id, "event");
  assert.equal(flow.fields(2)[0].id, "category");
  assert.equal(flow.fields(3)[0].id, "status");
  assert.doesNotMatch(flow.render(), /readonly|disabled/);
  assert.equal(flow.fields(4)[0].id, "paymentPreference");
});

test("selling categories and documentation rules follow the chosen area", () => {
  assert.equal(flow.sellerOptions("stadium").length, 1);
  assert.equal(flow.sellerOptions("stadium")[0][0], "permit");
  assert.equal(flow.sellerOptions("orange")[1][0], "occasional");
  assert.equal(flow.sellerOptions("pearl")[1][0], "occasional");
  assert.ok(flow.merchandise.stadium.includes("New Merchandise"));
  assert.ok(flow.merchandise.orange.includes("Antiques"));
  assert.ok(flow.merchandise.pearl.includes("Vintage Clothing"));
  assert.ok(!flow.merchandise.orange.includes("New Merchandise"));
  const permit = { ...required, id: "permitNumber" };
  assert.ok(flow.validate(permit, ""));
  assert.ok(flow.validate(permit, "invalid"));
  assert.equal(flow.validate(permit, "123456789-001"), "");
  assert.ok(flow.validate({ ...required, id: "registered" }, "pending"));
  assert.equal(flow.validate({ ...required, id: "registered" }, "yes"), "");
  assert.ok(flow.validate({ ...required, id: "priorSales" }, "2_plus"));
  assert.ok(flow.validate({ ...required, id: "personalUse" }, "no"));
});

test("final certification is required and checkbox consent must be explicit", () => {
  for (const [path, index] of [
    ["new", 4],
    ["returning", 5],
  ]) {
    flow.selectPath(path);
    const fields = flow.fields(index).filter((field) => field.required);
    assert.equal(fields.length, 4);
    for (const field of fields) assert.ok(flow.validate(field, ""));
    for (const field of fields.filter(
      (f) => f.type === "checkbox" && f.required,
    )) {
      for (const value of [false, undefined, "true", "on"])
        assert.ok(flow.validate(field, value));
      assert.equal(flow.validate(field, true), "");
      assert.equal(flow.snapshot().data[field.id], undefined);
    }
  }
});

test("permit upload is required independently of entered permit details", () => {
  const field = { id: "permitFile", type: "file", required: true };
  assert.ok(flow.validate(field, undefined));
  assert.ok(flow.validate(field, "file-name-only"));
  assert.equal(flow.validate(field, { name: "synthetic.png" }), "");
});

test("both application paths share blank fields; only returning adds payment preference", () => {
  flow.selectPath("new");
  const newFields = [0, 1, 2, 3, 4].map((i) => JSON.stringify(flow.fields(i)));
  flow.selectPath("returning");
  const returningFields = [0, 1, 2, 3, 5].map((i) =>
    JSON.stringify(flow.fields(i)),
  );
  assert.deepEqual(returningFields, newFields);
  assert.doesNotMatch(flow.render(), /Sample profile|prefilled|saved details/);
  assert.equal(flow.fields(4)[0].id, "paymentPreference");
});

test("auto-renewal interest is optional, unchecked, and shared by both review steps", () => {
  for (const [path, review] of [
    ["new", 4],
    ["returning", 5],
  ]) {
    flow.selectPath(path);
    const field = flow
      .fields(review)
      .find((f) => f.id === "autoRenewalInterest");
    assert.equal(field.required, false);
    assert.equal(field.type, "checkbox");
    for (const value of [undefined, false, true])
      assert.equal(flow.validate(field, value), "");
    assert.equal(flow.snapshot().data.autoRenewalInterest, undefined);
    assert.match(
      field.help,
      /does not enroll you or authorize recurring payments/,
    );
  }
});
