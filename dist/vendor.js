/* In-memory prototype. Permit OCR uses the local-only service; no durable uploads or payments. */
const VendorFlow = (() => {
  // Step order is path-specific; section keys keep validation and review independent of order.
  const paths = {
    new: [
      { section: 2, title: "Seller / Business Contact" },
      { section: 0, title: "Space / Plot Request" },
      { section: 5, title: "Selling Details" },
      { section: 1, title: "Permit Verification" },
      { section: 4, title: "Review & Submit" },
    ],
    returning: [
      { section: 2, title: "Seller / Business Contact" },
      { section: 0, title: "Space / Plot Request" },
      { section: 5, title: "Selling Details" },
      { section: 1, title: "Permit Verification" },
      { section: 3, title: "Payment Preference" },
      { section: 4, title: "Review & Submit" },
    ],
  };
  const areas = [
    ["stadium", "Stadium / Blue–Gold"],
    ["orange", "Orange"],
    ["pearl", "Pearl / White"],
  ];
  const merchandise = {
    stadium: [
      "New Merchandise",
      "Arts & Crafts",
      "Services",
      "New Clothing",
      "New Jewelry",
      "New Footwear",
      "Beauty",
      "Electronics",
      "Home Goods",
      "Gift & Novelty",
      "New Furniture",
      "Technology",
      "Sports & Recreation",
      "Outdoor & Garden",
      "Other / Not Listed \u2014 describe in notes below",
    ],
    orange: [
      "Antiques",
      "Antiques & Collectibles",
      "Collectibles",
      "Antique Furniture",
      "Vintage Jewelry",
      "Vintage Lighting",
      "Vintage Musical Instruments",
      "Vintage Linens",
      "Art",
      "Miscellaneous Antiques / Collectibles",
      "Other / Not Listed \u2014 describe in notes below",
    ],
    pearl: [
      "Vintage Clothing",
      "Vintage Footwear",
      "Vintage Jewelry",
      "Vintage Linens",
      "Textiles",
      "Accessories",
      "General Merchandise",
      "Vintage Musical Instruments",
      "Home Goods",
      "Miscellaneous",
      "Other / Not Listed \u2014 describe in notes below",
    ],
  };
  const sellerOptions = (area) =>
    area === "stadium"
      ? [["permit", "California Seller’s Permit holder"]]
      : [
          ["permit", "California Seller’s Permit holder"],
          ["occasional", "Occasional seller verification"],
        ];
  let data = {};
  let mode = "new";
  const drafts = {
    new: { data: {}, step: 0 },
    returning: { data: {}, step: 0 },
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
    if (index === 5)
      return [
        field(
          "category",
          "Type of merchandise",
          "select",
          true,
          (merchandise[data.area] || []).map((label) => [label, label]),
          "Options reflect your selected selling area.",
        ),
        field(
          "goods",
          "Describe the items or activity you will offer",
          "textarea",
          true,
          [],
          "List the actual items or activity. Occasional sellers: describe your personal used belongings.",
        ),
      ];
    if (index === 1)
      return [
        field(
          "status",
          "Seller documentation",
          "select",
          true,
          sellerOptions(data.area),
        ),
        ...(data.status === "permit"
          ? [
              field(
                "permitFile",
                "Upload California Seller’s Permit",
                "file",
                true,
                [],
                "PDF, JPG or PNG · Up to 5 MB; PDFs up to 5 pages. Read locally on this computer and kept only for this preview session. Not sent to the market office.",
              ),
              field(
                "permitNumber",
                "California Seller’s Permit number",
                "text",
                true,
                [],
                "Check the extracted number or enter it manually. Include the location suffix if shown.",
              ),
              field(
                "registered",
                "Does your valid permit show the Rose Bowl selling location?",
                "select",
                true,
                [
                  ["yes", "Yes — 1001 Rose Bowl Drive, Pasadena, CA 91103"],
                  ["pending", "Not yet / update pending"],
                ],
                "A valid California Seller’s Permit showing this address is required to continue. Staff must verify the permit before approval.",
              ),
              field(
                "permitReviewed",
                "I have checked the permit number and selling location against my uploaded document.",
                "checkbox",
                true,
              ),
            ]
          : []),
        ...(data.status === "occasional"
          ? [
              field(
                "occasionalExempt",
                "My sales qualify as exempt occasional sales",
                "select",
                true,
                [
                  ["yes", "Yes"],
                  ["no", "No"],
                ],
              ),
              field(
                "personalUse",
                "I am selling my own used belongings acquired for personal use",
                "select",
                true,
                [
                  ["yes", "Yes"],
                  ["no", "No"],
                ],
              ),
              field(
                "notResale",
                "The items were not purchased for resale and are not retail business inventory",
                "select",
                true,
                [
                  ["yes", "Yes"],
                  ["no", "No"],
                ],
              ),
              field(
                "priorSales",
                "Other selling occasions in the 12 months before this event",
                "select",
                true,
                [
                  ["0", "0"],
                  ["1", "1"],
                  ["2_plus", "2 or more"],
                  ["unsure", "Not sure"],
                ],
                "Count occasions at all locations, including planned occasions before this event. Exclude this requested event; use a rolling 12-month period.",
              ),
              ...(data.priorSales === "1"
                ? [
                    field(
                      "priorDetails",
                      "Date and location of the other selling occasion",
                      "textarea",
                    ),
                  ]
                : []),
              field(
                "twoSaleLimit",
                "Including this event, I will have no more than two qualifying selling occasions in any 12-month period",
                "select",
                true,
                [
                  ["yes", "Yes"],
                  ["no", "No"],
                ],
                "Selling used goods alone does not establish eligibility.",
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
    if (index === 4)
      return [
        field("signerName", "Full name", "text", true),
        field("signerTitle", "Position or title", "text", true),
        field(
          "certifiedCorrect",
          "The above statements are certified to be correct to the best of my knowledge and belief.",
          "checkbox",
          true,
        ),
        field(
          "electronicConsent",
          "I am the seller or an authorized representative. By typing my full name and submitting this request, I intend to sign this seller certification and the payment instructions I selected electronically for the selected event, and agree to the use of an electronic record and signature.",
          "checkbox",
          true,
        ),
      ];
    return [];
  }
  function validate(f, value) {
    if (f.type === "file")
      return value && typeof value.name === "string"
        ? ""
        : "Upload your permit before continuing.";
    if (f.type === "checkbox")
      return value === true ? "" : "This confirmation is required.";
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
    if (f.id === "permitNumber" && (!/[0-9]/.test(v) || v.length > 32))
      return "Enter a permit number of up to 32 characters, including its location suffix if shown.";
    if (f.id === "registered" && v !== "yes")
      return "Your valid permit must show 1001 Rose Bowl Drive, Pasadena, CA 91103 before you can continue. Contact the office if you need help.";
    if (
      ["occasionalExempt", "personalUse", "notResale", "twoSaleLimit"].includes(
        f.id,
      ) &&
      v !== "yes"
    )
      return "This confirmation is required for occasional-seller verification. Select the permit-holder option or contact the office.";
    if (f.id === "priorSales" && !["0", "1"].includes(v))
      return "Contact the office to review eligibility before continuing, or use the permit-holder option.";
    return "";
  }
  function fieldMarkup(f) {
    const attrs = `id="${f.id}" name="${f.id}" ${f.required ? "required" : ""} aria-describedby="${f.id}-help ${f.id}-error"`;
    if (f.type === "file")
      return `<div class="field"><label for="${f.id}">${f.label} <span class="field-requirement">(required)</span></label><input ${attrs} type="file" accept="application/pdf,image/jpeg,image/png" hidden><button type="button" class="button" id="permit-upload-button" aria-describedby="${f.id}-help ${f.id}-error">Upload CA Seller's Permit</button><p class="field-help" id="${f.id}-help">${f.help}</p><p id="permit-file-name"></p><p id="permit-read-status" role="status"></p><span class="error" id="${f.id}-error"></span></div>`;
    if (f.type === "checkbox")
      return `<div class="field certification-check"><label for="${f.id}"><input ${attrs} type="checkbox"> <span>${f.label} <span class="field-requirement">(required)</span></span></label><p class="field-help" id="${f.id}-help">${f.help}</p><span class="error" id="${f.id}-error"></span></div>`;
    const control =
      f.type === "select"
        ? `<select ${attrs}><option value="">Choose an option</option>${f.options.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select>`
        : f.type === "textarea"
          ? `<textarea ${attrs} maxlength="1500"></textarea>`
          : `<input ${attrs} type="${f.type}" maxlength="200" autocomplete="${{ first: "given-name", last: "family-name", email: "email", phone: "tel", business: "organization" }[f.id] || "off"}">`;
    return `<div class="field"><label for="${f.id}">${f.label} <span class="field-requirement">${f.required ? "(required)" : "(optional)"}</span></label>${control}<p class="field-help" id="${f.id}-help">${f.help}</p><span class="error" id="${f.id}-error"></span></div>`;
  }
  function guidance() {
    if (sectionIndex() === 0) return "";
    if (sectionIndex() === 1)
      return `<aside class="note" aria-live="polite">${data.area === "stadium" ? "Blue/Gold requires a valid California Seller’s Permit showing 1001 Rose Bowl Drive, Pasadena, CA 91103. Occasional-seller verification is not available for this area." : `<strong>${data.area === "orange" ? "Orange" : "Pearl"} Area — two verification options</strong><ul><li><strong>California Seller’s Permit:</strong> provide details of a valid permit showing 1001 Rose Bowl Drive, Pasadena, CA 91103 as a selling location.</li><li><strong>Occasional-seller verification:</strong> for qualifying sales of your own personal used belongings. Items must have been acquired for personal use, not for resale or as retail business inventory. Complete the eligibility confirmations and selling-history questions, including the limit of two qualifying selling occasions in any 12-month period.</li></ul><p>Select the option that accurately describes your selling activity. Choosing occasional-seller verification does not by itself establish eligibility; staff must review your information.</p>`}<p>Preview only: these answers are not a permit validation or signed certification. Document reading runs locally; secure submission to the office and staff verification are not connected.</p></aside>`;
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
      )}${estimate()}${nextSteps()}<div class="note"><strong>Draft review only</strong><p>No request has been sent and no space is reserved. Final availability, private documentation, and a submission service are still required before this application can accept requests. No electronic signature is submitted or recorded in this preview.</p></div><section class="seller-certification" aria-labelledby="certification-title"><h3 id="certification-title">Seller certification</h3>${mode === "new" ? "<p>No payment instructions are selected for new vendors. Payment will be arranged after acceptance.</p>" : ""}${fields().map(fieldMarkup).join("")}</section>`;
  }
  function mapMarkup() {
    const option = spaceOptions[data.area]?.find(
      (item) => item.id === data.space,
    );
    return VendorMap.render(
      data.area,
      data.space,
      option ? option.label + " — " + money(option.cents) : "",
    );
  }
  function render() {
    return `<section class="content"><div class="page-intro"><p class="eyebrow">${mode === "returning" ? "Returning vendor" : "New vendor"}</p><h1 class="application-title">Vendor Application</h1><p class="muted">Design preview. Use sample information only. Submission is not connected.</p></div><ol class="steps">${paths[mode].map((item, i) => `<li class="${i === step ? "current" : ""}" ${i === step ? 'aria-current="step"' : ""}><span>${i + 1}</span> ${stepName(i)}</li>`).join("")}</ol><div class="application-layout ${sectionIndex() === 0 ? "space-request-layout" : ""}"><form class="formbox" id="vendor-form" novalidate><p class="eyebrow">Step ${step + 1} of ${paths[mode].length}</p><h2 tabindex="-1" id="step-title">${stepName(step)}</h2><p class="muted">Your entries stay in this tab’s memory and clear when you reload.</p><div id="error-summary" role="alert"></div>${isReview() ? review() : fields().map(fieldMarkup).join("") + guidance()}<div class="actions">${step > 0 ? '<button type="button" class="button secondary" id="back">← Back</button>' : ""}${!isReview() ? '<button type="submit" class="button">Continue →</button>' : '<button class="button" type="submit">Submit application (preview)</button>'}</div></form><dialog id="application-confirmation" aria-labelledby="confirmation-heading" aria-describedby="confirmation-message confirmation-preview"><p class="eyebrow" id="confirmation-preview">Preview only — no application has been sent</p><h2 id="confirmation-heading">Application submitted</h2><p id="confirmation-message">You’ll hear from our team shortly about the status of your application at the contact information you provided.</p><p>Your space is not confirmed until your application is accepted and payment is collected.</p><form method="dialog"><button type="submit" class="button" autofocus>Close window</button></form></dialog>${sectionIndex() === 0 ? `<div id="vendor-map-panel">${mapMarkup()}</div>` : `<aside class="application-aside"><p class="eyebrow">Application status</p><h3>Payment after acceptance</h3><p>No payment is collected during the application. If accepted, we’ll contact you by email or phone to finalize your space and arrange payment. Your space is confirmed once payment is collected.</p><hr><h3>Vendor assistance</h3><p>Event information and vendor assistance</p><a href="tel:+13235607469">(323) 560-7469</a><p class="muted">Contact number from the existing RGC Shows website.</p></aside>`}</div></section>`;
  }
  function capture() {
    document
      .querySelectorAll(
        "#vendor-form input, #vendor-form select, #vendor-form textarea",
      )
      .forEach((el) => {
        if (el.type === "file") return;
        data[el.name] = el.type === "checkbox" ? el.checked : el.value;
      });
  }
  function bind(redraw) {
    document
      .querySelectorAll(
        "#vendor-form input, #vendor-form select, #vendor-form textarea",
      )
      .forEach((el) => {
        if (el.type === "file") return;
        if (el.type === "checkbox") el.checked = data[el.name] === true;
        else el.value = data[el.name] || "";
        el.addEventListener("input", capture);
      });
    const upload = document.querySelector("#permitFile");
    if (upload) {
      document
        .querySelector("#permit-upload-button")
        .addEventListener("click", () => upload.click());
      document.querySelector("#permit-file-name").textContent = data.permitFile
        ? "Selected permit: " + data.permitFile.name
        : "No permit selected.";
      document.querySelector("#permit-read-status").textContent =
        data.permitReadStatus ||
        "Select a document to fill the fields below automatically. Review all results.";
      upload.addEventListener("change", async () => {
        const file = upload.files[0];
        if (!file) return;
        capture();
        const draft = data;
        delete draft.permitFile;
        delete draft.permitReviewed;
        if (
          !["application/pdf", "image/jpeg", "image/png"].includes(file.type) ||
          file.size > 5 * 1024 * 1024 ||
          !file.size
        ) {
          draft.permitReadStatus = "Choose a PDF, JPG or PNG up to 5 MB.";
          redraw();
          return;
        }
        draft.permitFile = file;
        draft.permitNumber = "";
        draft.registered = "";
        draft.permitReadStatus = "Reading permit…";
        redraw();
        const numberBefore = draft.permitNumber;
        const locationBefore = draft.registered;
        try {
          const response = await fetch("/api/permit-extract", {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
            signal: AbortSignal.timeout(35000),
          });
          const result = await response.json();
          if (!response.ok)
            throw new Error(result.error || "Document reading is unavailable.");
          if (draft.permitFile !== file) return;
          delete draft.permitReviewed; // Extraction changes require a fresh human review.
          const extracted = PermitExtraction.parse(result.text);
          if (draft.permitNumber === numberBefore)
            draft.permitNumber = extracted.number;
          if (draft.registered === locationBefore)
            draft.registered = extracted.registered;
          draft.permitReadStatus =
            extracted.number && extracted.registered
              ? "Details filled from your document. Check both fields and confirm below. This is not permit verification."
              : "Document read. Some details could not be identified confidently. Check or complete both fields manually, then confirm below.";
        } catch (error) {
          if (draft.permitFile !== file) return;
          draft.permitReadStatus =
            "Automatic reading could not complete. Enter the details manually and confirm them against your document. PDFs must be unlocked and no more than 5 pages.";
        }
        if (data === draft && sectionIndex() === 1) redraw();
      });
      ["permitNumber", "registered"].forEach((id) =>
        document.getElementById(id)?.addEventListener("input", () => {
          delete data.permitReviewed;
          document.getElementById("permitReviewed").checked = false;
        }),
      );
    }
    document.querySelector("#area")?.addEventListener("change", () => {
      capture();
      delete data.space; // Dependent choices must be made again after an area change.
      delete data.category;
      delete data.status;
      [
        "permitNumber",
        "registered",
        "permitFile",
        "permitReviewed",
        "permitReadStatus",
        "occasionalExempt",
        "personalUse",
        "notResale",
        "priorSales",
        "priorDetails",
        "twoSaleLimit",
      ].forEach((key) => delete data[key]);
      redraw();
      document.querySelector("#area").focus();
    });
    ["space", "quantity"].forEach((id) =>
      document.getElementById(id)?.addEventListener("change", () => {
        capture();
        if (id === "space")
          document.querySelector("#vendor-map-panel").innerHTML = mapMarkup();
      }),
    );
    document.querySelector("#status")?.addEventListener("change", () => {
      capture();
      [
        "permitNumber",
        "registered",
        "permitFile",
        "permitReviewed",
        "permitReadStatus",
        "occasionalExempt",
        "personalUse",
        "notResale",
        "priorSales",
        "priorDetails",
        "twoSaleLimit",
      ].forEach((key) => delete data[key]);
      redraw();
      document.querySelector("#status").focus();
    });
    document.querySelector("#priorSales")?.addEventListener("change", () => {
      capture();
      if (data.priorSales !== "1") delete data.priorDetails;
      redraw();
      document.querySelector("#priorSales").focus();
    });
    document.querySelectorAll("[data-review]").forEach((el) => {
      const f = paths[mode]
        .flatMap((_, i) => fields(i))
        .find((f) => f.id === el.dataset.review);
      const value = data[f.id];
      el.textContent =
        f.type === "file"
          ? value?.name || "Not provided"
          : f.type === "checkbox"
            ? value === true
              ? "Confirmed"
              : "Not confirmed"
            : f.options.find(([key]) => key === value)?.[1] ||
              value ||
              "Not provided";
    });
    function move(index) {
      capture();
      // Returning to earlier answers requires fresh consent to the revised application.
      if (isReview() && index !== step) {
        delete data.certifiedCorrect;
        delete data.electronicConsent;
      }
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
      if (data.permitReadStatus === "Reading permit…") {
        document.querySelector("#error-summary").textContent =
          "Please wait for document reading to finish.";
        return;
      }
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
        document
          .getElementById(
            errors[0][0].type === "file"
              ? "permit-upload-button"
              : errors[0][0].id,
          )
          .focus();
        return;
      }
      if (!isReview()) move(step + 1);
      else {
        // Recheck every section before showing the simulated receipt. A live receipt
        // must only appear after the submission service confirms durable acceptance.
        const incomplete = paths[mode].findIndex((_, index) =>
          fields(index).some((field) => validate(field, data[field.id])),
        );
        if (incomplete !== -1) {
          move(incomplete);
          document.querySelector("#error-summary").textContent =
            "Please complete this section before submitting.";
          return;
        }
        document.querySelector("#application-confirmation").showModal();
      }
    });
  }
  return {
    render,
    bind,
    validate,
    fields,
    selectPath,
    snapshot,
    quote,
    sellerOptions,
    merchandise,
  };
})();
