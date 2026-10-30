import test from "node:test";
import assert from "node:assert/strict";
import { readPermit } from "../permit-ocr.mjs";
async function request(headers, body = Buffer.from("not a document")) {
  let status, result;
  const req = {
    method: "POST",
    headers,
    async *[Symbol.asyncIterator]() {
      yield body;
    },
  };
  await readPermit(req, {
    writeHead(code) {
      status = code;
    },
    end(value) {
      result = JSON.parse(value);
    },
  });
  return { status, result };
}
const headers = {
  host: "127.0.0.1:4173",
  origin: "http://127.0.0.1:4173",
  "content-type": "image/png",
};
test("permit endpoint rejects cross-origin and unsupported uploads", async () => {
  assert.equal(
    (await request({ ...headers, origin: "https://example.com" })).status,
    403,
  );
  assert.equal(
    (await request({ ...headers, "content-type": "text/html" })).status,
    415,
  );
  assert.equal((await request(headers)).status, 415);
  assert.equal(
    (await request(headers, Buffer.alloc(5 * 1024 * 1024 + 1))).status,
    413,
  );
});
