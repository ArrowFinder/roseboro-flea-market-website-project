import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";
const context = vm.createContext({});
vm.runInContext(
  readFileSync(new URL("../dist/vendor-map.js", import.meta.url), "utf8"),
  context,
);
const map = vm.runInContext("VendorMap", context);
test("map narrows stadium selections and keeps unmapped plots at area level", () => {
  assert.equal(map.selection("stadium", "stadium-1").keys[0], "blue700");
  assert.equal(map.selection("stadium", "stadium-11").keys[0], "gold2000");
  assert.equal(map.selection("stadium", "").keys.length, 10);
  assert.equal(map.selection("stadium", "stadium-6").keys.length, 5);
  assert.equal(map.selection("orange", "orange-3").keys[0], "orange");
  assert.equal(map.selection("pearl", "pearl-6").keys[0], "pearl");
  assert.equal(map.selection("", "").keys.length, 0);
});
