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

async function readJsonFileAsync(path) {
    const response = await fetchFileAsync(path);
    return await response.json();
}

async function readTextFileAsync(path) {
    const response = await fetchFileAsync(path);
    return await response.text();
}

async function fetchFileAsync(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Error loading file: ${path}, status: ${response.status}`);
    }
    return response;
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

function setElementByIdInnerText(id, text) {
	const element = document.getElementById(id);
	element.innerText = text;
}