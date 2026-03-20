const tooltip = document.getElementById("popupToolTip");

export const tooltipPopup = {
	show(text) {
		tooltip.textContent = text;
		tooltip.style.visibility = "visible";
	},
	move(e) {
		tooltip.style.left = `${e.clientX + window.scrollX + 30}px`;
		tooltip.style.top = `${e.clientY + window.scrollY + 10}px`;
	},
	hide() {
		tooltip.style.visibility = "hidden";
		tooltip.style.left = "0";
		tooltip.style.top = "0";
	}
}