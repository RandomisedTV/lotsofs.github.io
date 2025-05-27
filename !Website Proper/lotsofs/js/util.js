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

function appendChildToElement(parent, childTag, childTextContent = "") {
	const element = document.createElement(childTag)
	element.textContent = childTextContent
	parent.appendChild(element)
	return element
}
