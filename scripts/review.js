const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2050", name: "Power Laces" },
    { id: "fs-1987", name: "Flying Skateboard" },
    { id: "ac-2000", name: "Acme Anvil" },
    { id: "gp-1961", name: "Gadget Pro" },
];

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function toText(value, fallback = "—") {
    if (value === null || value === undefined) return fallback;
    const trimmed = String(value).trim();
    return trimmed.length ? trimmed : fallback;
}

function renderSummary(params) {
    const summary = document.getElementById("summary");
    if (!summary) return;

    const features = params.getAll("features");
    const productId = params.get("productName");
    const productObj = products.find((p) => p.id === productId);
    const productName = productObj ? productObj.name : productId;

    const entries = [
        ["Product", toText(productName)],
        ["Rating", toText(params.get("rating"))],
        ["Installed", toText(params.get("installDate"))],
        ["Features", features.length ? features.join(", ") : "—"],
        ["Name", toText(params.get("userName"))],
        ["Review", toText(params.get("writtenReview"))],
    ];

    summary.innerHTML = entries
        .map(
            ([k, v]) =>
                `<div class="summary-row"><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`
        )
        .join("");
}

function setReviewCount(count) {
    const countEl = document.getElementById("reviewCount");
    if (countEl) countEl.textContent = String(count);
}

function incrementReviewCountIfSubmitted(params) {
    const hasSubmission = params.has("productName") && params.has("rating") && params.has("installDate");
    if (!hasSubmission) return;

    const key = "reviewCount";
    const current = Number(localStorage.getItem(key)) || 0;
    const next = current + 1;
    localStorage.setItem(key, String(next));
    setReviewCount(next);
}

const params = new URLSearchParams(window.location.search);

setReviewCount(Number(localStorage.getItem("reviewCount")) || 0);
renderSummary(params);
incrementReviewCountIfSubmitted(params);
