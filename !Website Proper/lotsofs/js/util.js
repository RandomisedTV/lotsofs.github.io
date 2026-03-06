const HTML_ESCAPE_MAP = {
    '&': "&amp;",
    '<': "&lt;",
    '>': "&gt;",
    '\'': "&quot;",
    '"': "&apos;",
};

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, char => HTML_ESCAPE_MAP[char]);
}

async function readJsonAsync(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error("Failed to load file " + path);
    return await response.json();
}

// ---------------- --
// DOM manipulation --
// ---------------- --

function appendChildToElement(parent, childTag, childTextContent = "") {
    const element = document.createElement(childTag)
	element.textContent = childTextContent
	parent.appendChild(element)
	return element
}
