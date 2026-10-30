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
  assert.equal(returning.data.email, "alex@example.com");
  assert.equal(returning.data.event, undefined);
  assert.equal(returning.data.area, undefined);
  returning.data.email = "changed@example.com";
  assert.equal(flow.snapshot().data.email, "alex@example.com");
  flow.selectPath("new");
  assert.equal(Object.keys(flow.snapshot().data).length, 0);
  flow.selectPath("returning");
  assert.equal(flow.snapshot().data.first, "Alex");
  assert.throws(() => flow.selectPath("invalid"));
});
