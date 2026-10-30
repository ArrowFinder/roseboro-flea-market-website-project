import { spawn } from "node:child_process";
import { resolve } from "node:path";
const limit = 5 * 1024 * 1024;
let busy = false;
export async function readPermit(req, res) {
  const reply = (status, body) => {
    res.writeHead(status, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    res.end(JSON.stringify(body));
  };
  // Only this loopback preview may send documents; no CORS or remote host access.
  if (
    req.method !== "POST" ||
    req.headers.host !== "127.0.0.1:4173" ||
    req.headers.origin !== "http://127.0.0.1:4173"
  )
    return reply(403, { error: "Local preview access only." });
  if (busy)
    return reply(429, {
      error: "Another document is being read. Please try again shortly.",
    });
  if (
    !["application/pdf", "image/jpeg", "image/png"].includes(
      req.headers["content-type"],
    )
  )
    return reply(415, { error: "Choose a PDF, JPG or PNG." });
  busy = true;
  try {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > limit) {
        reply(413, { error: "File must be 5 MB or smaller." });
        return;
      }
      chunks.push(chunk);
    }
    const bytes = Buffer.concat(chunks);
    const pdf = bytes.subarray(0, 5).toString() === "%PDF-";
    const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    const png = bytes
      .subarray(0, 8)
      .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    if (!pdf && !jpg && !png)
      return reply(415, { error: "This file is not a supported document." });
    const result = await new Promise((accept, reject) => {
      const child = spawn(resolve(".local/permit-ocr"), [], {
        stdio: ["pipe", "pipe", "ignore"],
      });
      let output = "";
      const timer = setTimeout(() => {
        child.kill();
        reject(new Error());
      }, 30000);
      child.on("error", reject);
      child.stdin.on("error", () => {});
      child.stdout.on("data", (part) => {
        output += part;
        if (output.length > 200000) child.kill();
      });
      child.on("close", (code) => {
        clearTimeout(timer);
        if (code === 0) {
          try {
            accept(JSON.parse(output));
          } catch {
            reject(new Error());
          }
        } else reject(new Error());
      });
      child.stdin.end(bytes);
    });
    reply(200, result);
  } catch {
    reply(422, {
      error:
        "Unable to read this document. Use a clear JPG/PNG or an unlocked PDF of up to 5 pages, or enter the details manually.",
    });
  } finally {
    busy = false;
  }
}
