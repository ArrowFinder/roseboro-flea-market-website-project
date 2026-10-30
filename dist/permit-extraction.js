/* Conservative extraction: unclear/multiple numbers require manual entry. No network here. */
const PermitExtraction = (() => {
  function parse(text) {
    const normalized = text.replace(/[’‘]/g, "'");
    const matches = [
      ...normalized.matchAll(
        /(?:permit|account)\s*(?:number|no\.?|#)\s*[:#]?\s*((?:[A-Z]{2,3}\s*[- ]\s*)?\d[\d -]{6,25}\d)/gi,
      ),
    ].map((match) =>
      match[1]
        .trim()
        .replace(/\s*-\s*/g, "-")
        .replace(/ +/g, " "),
    );
    const unique = [...new Set(matches)];
    // All address components must occur together, not scattered across unrelated locations.
    const roseBowl =
      /1001\s+rose\s+bowl\s+(?:drive|dr\.?)\s*,?\s*pasadena\s*,?\s*(?:ca|california)\s+91103\b/i.test(
        text,
      );
    return {
      number: unique.length === 1 ? unique[0] : "",
      registered: roseBowl ? "yes" : "",
    };
  }
  return { parse };
})();
