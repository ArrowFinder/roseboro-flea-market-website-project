/* In-memory prototype only. No requests, uploads, browser storage, or payments. */
const VendorFlow = (() => {
  const steps = [
    "Event & area",
    "Selling details",
    "Contact",
    "Payment process",
    "Review",
  ];
  const areas = [
    ["stadium", "Stadium / Blue–Gold"],
    ["orange", "Orange"],
    ["pearl", "Pearl / White"],
  ];
  const statuses = [
    ["permit", "California Seller’s Permit holder"],
    ["occasional", "Occasional seller of personal used belongings"],
    ["services", "Services / no merchandise sales"],
    ["exempt", "Retail product sales not subject to tax"],
    ["retailer", "Section 6015 retailer representative"],
  ];
  const data = {};
  let step = 0;
  const nav = () =>
    `<nav class="vendor-nav" aria-label="Vendor sections"><a href="#apply" aria-current="page">Vendor Application</a><a href="#spaces">Space Options</a><a href="#requirements">Requirements</a><a href="#policies">Policies & FAQs</a></nav>`;
  const field = (
    id,
    label,
    type = "text",
    required = true,
    options = [],
    help = "",
  ) => ({ id, label, type, required, options, help });
  function fields(index = step) {
    if (index === 0)
      return [
        field(
          "event",
          "Requested event",
          "select",
          true,
          [["2026-11-08", "November 8, 2026 — preview date"]],
          "This is a known shopper event. Vendor availability has not been connected or confirmed.",
        ),
        field("area", "Selling area", "select", true, areas),
      ];
    if (index === 1)
      return [
        field(
          "goods",
          "Describe the items or activity you will offer",
          "textarea",
          true,
          [],
          "Include enough detail for staff to review the fit for your selling area.",
        ),
        field("status", "Seller status", "select", true, statuses),
        ...(data.status === "permit"
          ? [
              field(
                "registered",
                "Is the Rose Bowl location registered under your permit?",
                "select",
                true,
                [
                  ["yes", "Yes"],
                  ["pending", "Update pending"],
                  ["no", "Not yet"],
                ],
              ),
            ]
          : []),
      ];
    if (index === 2)
      return [
        field("first", "First name"),
        field("last", "Last name"),
        field("email", "Email address", "email"),
        field("phone", "Phone number", "tel"),
        field("business", "Business / organization name", "text", false),
      ];
    return [];
  }
  function validate(f, value) {
    const v = String(value || "").trim();
    if (f.required && !v) return `Enter ${f.label.toLowerCase()}.`;
    if (!v) return "";
    if (f.type === "select" && !f.options.some(([key]) => key === v))
      return "Choose an option from the list.";
    if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return "Enter an email address such as name@example.com.";
    if (f.type === "tel" && v.replace(/\D/g, "").length < 7)
      return "Enter a phone number with at least 7 digits.";
    if (v.length > (f.type === "textarea" ? 1500 : 200))
      return "Please shorten this entry.";
    if (f.id === "status" && data.area === "stadium" && v === "occasional")
      return "Occasional-seller requests are accepted in Orange or Pearl only. Go back to change the area, or contact the office for help.";
    return "";
  }
  function fieldMarkup(f) {
    const attrs = `id="${f.id}" name="${f.id}" ${f.required ? "required" : ""} aria-describedby="${f.id}-help ${f.id}-error"`;
    const control =
      f.type === "select"
        ? `<select ${attrs}><option value="">Choose an option</option>${f.options.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select>`
        : f.type === "textarea"
          ? `<textarea ${attrs} maxlength="1500"></textarea>`
          : `<input ${attrs} type="${f.type}" maxlength="200" autocomplete="${{ first: "given-name", last: "family-name", email: "email", phone: "tel", business: "organization" }[f.id] || "off"}">`;
    return `<div class="field"><label for="${f.id}">${f.label} <span class="field-requirement">${f.required ? "(required)" : "(optional)"}</span></label>${control}<p class="field-help" id="${f.id}-help">${f.help}</p><span class="error" id="${f.id}-error"></span></div>`;
  }
  function guidance() {
    if (step === 0)
      return '<p class="note">Space types, dimensions, quantities, prices, and preferred-space choices will be added after the current inventory and pricing are verified. No availability is implied by these choices.</p>';
    if (step === 1) {
      const descriptions = {
        permit:
          "The existing application requires a permit number and a private permit document showing the Rose Bowl location. Those sensitive fields and uploads are not collected in this preview.",
        occasional:
          "The existing application requires event-specific statements about personal belongings and selling occasions in a rolling 12-month period. Full eligibility questions and certification still need to be implemented; selecting this option does not establish eligibility.",
        services:
          "Staff must review the activity and selling-area fit. The existing application includes a declaration about not making or soliciting merchandise sales.",
        exempt:
          "The existing application requires the specific products and exemption basis for staff review. This selection does not approve an exemption.",
        retailer:
          "The existing application requires the approved retailer’s name and a specific seller certification. Those questions remain to be implemented.",
      };
      return `<aside class="note" id="status-guidance" aria-live="polite">${descriptions[data.status] || "Choose your seller status to see which supporting information will be needed."}</aside>`;
    }
    if (step === 3)
      return `<div class="process"><h3>Review first. Payment comes next.</h3><ol><li>The office reviews your request and supporting documents.</li><li>Staff checks space availability and arranges payment.</li><li>A reservation is confirmed only after approval and successful payment.</li><li>Vendor tickets are then emailed to you.</li></ol></div><p class="note">This preview does not collect payment details or authorization. The final flow will show verified prices and approved payment choices before certification.</p><p>After payment, the current application states that refunds, exchanges, and cancellations are unavailable. Full policy review remains part of the production application.</p>`;
    return "";
  }
  function review() {
    return `<p>Review your draft below. Use Edit to return to a section.</p>${[
      0, 1, 2,
    ]
      .map(
        (i) =>
          `<section class="review-section"><div class="review-heading"><h3>${steps[i]}</h3><button type="button" class="text-button" data-edit="${i}">Edit ${steps[i].toLowerCase()}</button></div><dl class="review">${fields(
            i,
          )
            .map((f) => `<dt>${f.label}</dt><dd data-review="${f.id}"></dd>`)
            .join("")}</dl></section>`,
      )
      .join(
        "",
      )}<div class="note"><strong>Draft review only</strong><p>No request has been sent and no space is reserved. Verified space pricing, full seller certification, private documentation, and a submission service are still required before this application can accept requests.</p></div>`;
  }
  function render() {
    return `<section class="content">${nav()}<div class="page-intro"><p class="eyebrow">Vendors · Application preview</p><h1 class="application-title">Let’s find your place<br>at the market.</h1><p>Short steps, with a chance to review everything. This is a working design preview—use sample information only.</p></div><ol class="steps">${steps.map((name, i) => `<li class="${i === step ? "current" : ""}" ${i === step ? 'aria-current="step"' : ""}><span>${i + 1}</span> ${name}</li>`).join("")}</ol><div class="application-layout"><form class="formbox" id="vendor-form" novalidate><p class="eyebrow">Step ${step + 1} of ${steps.length}</p><h2 tabindex="-1" id="step-title">${steps[step]}</h2><p class="muted">Your entries stay in this tab’s memory and clear when you reload.</p><div id="error-summary" role="alert"></div>${step === 4 ? review() : fields().map(fieldMarkup).join("") + guidance()}<div class="actions">${step > 0 ? '<button type="button" class="button secondary" id="back">← Back</button>' : ""}${step < 4 ? '<button type="submit" class="button">Continue →</button>' : '<button class="button" type="button" disabled>Submission not connected</button>'}</div></form><aside class="application-aside"><p class="eyebrow">Good to know</p><h3>A request comes first.</h3><p>Your space is confirmed after office review, availability checks, and payment.</p><hr><h3>Need a hand?</h3><p>Event information and vendor assistance</p><a href="tel:+13235607469">(323) 560-7469</a><p class="muted">Contact number from the existing RGC Shows website.</p></aside></div></section>`;
  }
  function capture() {
    document
      .querySelectorAll(
        "#vendor-form input, #vendor-form select, #vendor-form textarea",
      )
      .forEach((el) => {
        data[el.name] = el.value;
      });
  }
  function bind(redraw) {
    document
      .querySelectorAll(
        "#vendor-form input, #vendor-form select, #vendor-form textarea",
      )
      .forEach((el) => {
        el.value = data[el.name] || "";
        el.addEventListener("input", capture);
      });
    document.querySelector("#status")?.addEventListener("change", () => {
      capture();
      if (data.status !== "permit") delete data.registered;
      redraw();
      document.querySelector("#status").focus();
    });
    document.querySelectorAll("[data-review]").forEach((el) => {
      const f = [0, 1, 2]
        .flatMap((i) => fields(i))
        .find((f) => f.id === el.dataset.review);
      const value = data[f.id];
      el.textContent =
        f.options.find(([key]) => key === value)?.[1] ||
        value ||
        "Not provided";
    });
    function move(index) {
      capture();
      step = index;
      redraw();
      document.querySelector("#step-title").focus();
    }
    document
      .querySelector("#back")
      ?.addEventListener("click", () => move(step - 1));
    document
      .querySelectorAll("[data-edit]")
      .forEach((el) =>
        el.addEventListener("click", () => move(Number(el.dataset.edit))),
      );
    document.querySelector("#vendor-form").addEventListener("submit", (e) => {
      e.preventDefault();
      capture();
      const errors = fields()
        .map((f) => [f, validate(f, data[f.id])])
        .filter(([, error]) => error);
      fields().forEach((f) => {
        const error = errors.find(([item]) => item.id === f.id)?.[1] || "";
        document.getElementById(f.id + "-error").textContent = error;
        document
          .getElementById(f.id)
          .setAttribute("aria-invalid", String(Boolean(error)));
      });
      document.querySelector("#error-summary").textContent = errors.length
        ? `Please correct ${errors.length} ${errors.length === 1 ? "field" : "fields"} before continuing.`
        : "";
      if (errors.length) {
        document.getElementById(errors[0][0].id).focus();
        return;
      }
      if (step < 4) move(step + 1);
    });
  }
  return { render, bind, validate, fields };
})();
