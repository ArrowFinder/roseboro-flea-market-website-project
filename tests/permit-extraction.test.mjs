import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";
const context = vm.createContext({});
vm.runInContext(
  readFileSync(
    new URL("../dist/permit-extraction.js", import.meta.url),
    "utf8",
  ),
  context,
);
const parse = vm.runInContext("PermitExtraction.parse", context);
test("extracts labeled permit and complete venue address", () => {
  const result = parse(
    "SELLER’S PERMIT\nPermit Number: 123456789-001\n1001 Rose Bowl Drive\nPasadena, CA 91103",
  );
  assert.equal(result.number, "123456789-001");
  assert.equal(result.registered, "yes");
});
test("does not guess from unrelated numbers or incomplete addresses", () => {
  assert.equal(
    parse("Phone 3235550142\n1001 Rose Bowl Drive\nLos Angeles CA 90001")
      .number,
    "",
  );
  assert.equal(
    parse("1001 Rose Bowl Drive\nLos Angeles CA 91103").registered,
    "",
  );
  assert.equal(
    parse("Permit Number: 123456789\nAccount Number: 987654321").number,
    "",
  );
  assert.equal(parse("Unreadable document").registered, "");
});
