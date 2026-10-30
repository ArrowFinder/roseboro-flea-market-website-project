/* In-memory prototype only. No requests, uploads, browser storage, or payments. */
const VendorFlow = (() => {
  // Step order is path-specific; section keys keep validation and review independent of order.
  const paths = {
    new: [
      { section: 2, title: "Seller / Business Contact" },
      { section: 0, title: "Space / Plot Request" },
      { section: 1, title: "Required Forms" },
      { section: 4, title: "Review & Submit" },
    ],
    returning: [
      { section: 0, title: "Event & area" },
      { section: 1, title: "Selling details" },
      { section: 2, title: "Contact" },
      { section: 3, title: "Payment preference" },
      { section: 4, title: "Review" },
    ],
  };
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
  let data = {};
  let mode = "new";
  // Synthetic fixture only. Production profiles must come from an authenticated service.
  const sampleProfile = Object.freeze({
    goods: "Vintage homewares, framed artwork, and small furniture",
    status: "permit",
    registered: "yes",
    first: "Alex",
    last: "Morgan",
    email: "alex@example.com",
    phone: "323-555-0142",
    business: "Sample Vintage Co.",
  });
  const drafts = {
    new: { data: {}, step: 0 },
    returning: { data: { ...sampleProfile }, step: 0 },
  };
  function selectPath(nextMode) {
    if (!["new", "returning"].includes(nextMode))
      throw new Error("Unknown vendor path");
    drafts[mode] = { data, step };
    mode = nextMode;
    data = drafts[mode].data;
    step = drafts[mode].step;
  }
  // A copied snapshot supports regression checks without exposing mutable profile state.
  function snapshot() {
    return { mode, step, data: { ...data } };
  }
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
  const stepName = (index) => paths[mode][index].title;
  const sectionIndex = (index = step) => paths[mode][index].section;
  const isReview = () => sectionIndex() === 4;
  // Snapshot of live application options, 2026-10-30. Source and conflicts: SOURCE-REVIEW.md.
  const spaceOptions = {
    stadium: [
      { id: "stadium-1", label: "Blue-Left Side of the Stadium", cents: 12500 },
      { id: "stadium-2", label: "Blue-Left Side of the Stadium", cents: 15000 },
      { id: "stadium-3", label: "Blue-Left Side of the Stadium", cents: 17500 },
      { id: "stadium-4", label: "Blue-Left Side of the Stadium", cents: 25000 },
      {
        id: "stadium-5",
        label: "Blue-Premium Left Side of the Stadium",
        cents: 30000,
      },
      {
        id: "stadium-6",
        label: "Blue-Services or Promotional Companies",
        cents: 50000,
      },
      { id: "stadium-7", label: "Gold-Arts and Crafts Only", cents: 12500 },
      {
        id: "stadium-8",
        label: "Gold-Premium Right Side of the Stadium",
        cents: 30000,
      },
      {
        id: "stadium-9",
        label: "Gold-Right Side of the Stadium",
        cents: 15000,
      },
      {
        id: "stadium-10",
        label: "Gold-Right Side of the Stadium",
        cents: 17500,
      },
      {
        id: "stadium-11",
        label: "Gold-Right Side of the Stadium",
        cents: 25000,
      },
      {
        id: "stadium-12",
        label: "Gold-Services or Promotional Companies",
        cents: 50000,
      },
    ],
    orange: [
      { id: "orange-1", label: "Orange-Middle Premium Corner", cents: 30000 },
      {
        id: "orange-2",
        label: "Orange-Middle Premium Non-Corner",
        cents: 25000,
      },
      { id: "orange-3", label: "Orange-North End", cents: 12500 },
      { id: "orange-4", label: "Orange-South End", cents: 18000 },
    ],
    pearl: [
      { id: "pearl-1", label: "Pearl-Front Half Corner", cents: 15000 },
      { id: "pearl-2", label: "Pearl-Front Half Non-Corner", cents: 13500 },
      { id: "pearl-3", label: "Pearl-Perimeter", cents: 15000 },
      { id: "pearl-4", label: "Pearl-Premium", cents: 30000 },
      { id: "pearl-5", label: "Pearl-Rear Portion Corner", cents: 12500 },
      { id: "pearl-6", label: "Pearl-Rear Portion Non-Corner", cents: 10000 },
    ],
  };
  const money = (cents) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  function quote(area, space, quantity) {
    const option = spaceOptions[area]?.find((item) => item.id === space);
    const count = Number(quantity);
    if (!option || !Number.isInteger(count) || count < 1 || count > 5)
      return null;
    return {
      label: option.label,
      unit: option.cents,
      quantity: count,
      total: option.cents * count,
    };
  }
  function estimate() {
    const value = quote(data.area, data.space, data.quantity);
    return `<section class="space-estimate" aria-label="Space estimate"><p class="eyebrow">Your requested space</p><h3>${value?.label || "Choose your space and quantity"}</h3>${value ? `<p>${money(value.unit)} × ${value.quantity} ${value.quantity === 1 ? "space" : "spaces"}</p>` : ""}<div class="estimate-total"><span>Estimated total if accepted</span><strong>${value ? money(value.total) : "Select a space to see your total"}</strong></div><p class="muted">Based on the <a href="https://www.rgcshows.com/rose-bowl-order/">current vendor application rates</a>. No surcharge is added to this estimate. Subject to availability; any higher price or additional fee requires your approval.</p><p><strong>No payment is collected during this application.</strong></p></section>`;
  }
  function nextSteps() {
    return `<div class="process"><h3>What happens after you apply?</h3><ol><li>Our team reviews your application and checks space availability.</li><li>If accepted, we’ll contact you by email or phone to finalize your space and arrange payment${mode === "returning" ? " using your selected preference" : ""}.</li><li>Your vendor space is confirmed once payment is collected.</li></ol></div>`;
  }
  function fields(index = step) {
    return sectionFields(sectionIndex(index));
  }
  function sectionFields(index) {
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
        ...(data.area
          ? [
              field(
                "space",
                "Space choice",
                "select",
                true,
                (spaceOptions[data.area] || []).map((option) => [
                  option.id,
                  option.label + " — " + money(option.cents),
                ]),
              ),
              field(
                "quantity",
                "Number of spaces",
                "select",
                true,
                [1, 2, 3, 4, 5].map((n) => [String(n), String(n)]),
              ),
            ]
          : []),
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
    if (index === 3 && mode === "returning")
      return [
        field(
          "paymentPreference",
          "If your application is accepted, how would you like to pay?",
          "select",
          true,
          [
            ["on-file", "Use my existing payment method on file"],
            [
              "new-after-acceptance",
              "I’ll provide a new payment method upon acceptance",
            ],
          ],
          "Choose a preference only. No payment is collected now. If you choose a new method, staff will arrange it after acceptance. This preview is not connected to a payment account.",
        ),
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
    if (sectionIndex() === 0)
      return `<div id="space-quote" aria-live="polite">${estimate()}</div>`;
    if (sectionIndex() === 1) {
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
    if (sectionIndex() === 3) return estimate() + nextSteps();
    return "";
  }
  function review() {
    return `<p>Review your draft below. Use Edit to return to a section.</p>${paths[
      mode
    ]
      .map((_, i) => i)
      .filter((i) => paths[mode][i].section !== 4)
      .map(
        (i) =>
          `<section class="review-section"><div class="review-heading"><h3>${stepName(i)}</h3><button type="button" class="text-button" data-edit="${i}">Edit ${stepName(i).toLowerCase()}</button></div><dl class="review">${fields(
            i,
          )
            .map((f) => `<dt>${f.label}</dt><dd data-review="${f.id}"></dd>`)
            .join("")}</dl></section>`,
      )
      .join(
        "",
      )}${estimate()}${nextSteps()}<div class="note"><strong>Draft review only</strong><p>No request has been sent and no space is reserved. Final availability, full seller certification, private documentation, and a submission service are still required before this application can accept requests.</p></div>`;
  }
  function render() {
    return `<section class="content">${mode === "returning" ? nav() : ""}<div class="page-intro"><p class="eyebrow">${mode === "returning" ? "Returning vendor · Sample profile" : "New vendor"}</p><h1 class="application-title">Vendor Application</h1><p class="muted">Design preview. Use sample information only. Submission is not connected.</p></div><ol class="steps">${paths[mode].map((item, i) => `<li class="${i === step ? "current" : ""}" ${i === step ? 'aria-current="step"' : ""}><span>${i + 1}</span> ${stepName(i)}</li>`).join("")}</ol><div class="application-layout"><form class="formbox" id="vendor-form" novalidate><p class="eyebrow">Step ${step + 1} of ${paths[mode].length}</p><h2 tabindex="-1" id="step-title">${stepName(step)}</h2><p class="muted">Your entries stay in this tab’s memory and clear when you reload.</p><div id="error-summary" role="alert"></div>${isReview() ? review() : fields().map(fieldMarkup).join("") + guidance()}<div class="actions">${step > 0 ? '<button type="button" class="button secondary" id="back">← Back</button>' : ""}${!isReview() ? '<button type="submit" class="button">Continue →</button>' : '<button class="button" type="button" disabled>Submission not connected</button>'}</div></form><aside class="application-aside"><p class="eyebrow">Application status</p><h3>Payment after acceptance</h3><p>No payment is collected during the application. If accepted, we’ll contact you by email or phone to finalize your space and arrange payment. Your space is confirmed once payment is collected.</p><hr><h3>Vendor assistance</h3><p>Event information and vendor assistance</p><a href="tel:+13235607469">(323) 560-7469</a><p class="muted">Contact number from the existing RGC Shows website.</p></aside></div></section>`;
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
    document.querySelector("#area")?.addEventListener("change", () => {
      capture();
      delete data.space; // A space option is only valid within its selected area.
      redraw();
      document.querySelector("#area").focus();
    });
    ["space", "quantity"].forEach((id) =>
      document.getElementById(id)?.addEventListener("change", () => {
        capture();
        document.querySelector("#space-quote").innerHTML = estimate();
      }),
    );
    document.querySelector("#status")?.addEventListener("change", () => {
      capture();
      if (data.status !== "permit") delete data.registered;
      redraw();
      document.querySelector("#status").focus();
    });
    document.querySelectorAll("[data-review]").forEach((el) => {
      const f = paths[mode]
        .flatMap((_, i) => fields(i))
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
      if (!isReview()) move(step + 1);
    });
  }
  return { render, bind, validate, fields, selectPath, snapshot, quote };
})();
