export const mps = {
	populate(levelData) {
		build(levelData);
	}
}

async function build(levelData) {
	const div = document.getElementById("mpsdiv");
	for (const m of levelData.macros) {
		try {
			appendChildToElement(div, "h4", `${m.title} [${m.fileName}]`);
			
			const pre = appendChildToElement(div, "pre", "");
			const code = document.createElement("code");
			
			const text = await readTextFileAsync(`/modules/ss2/text/macros/${levelData.id}/${m.fileName}.mps`);
			code.innerHTML = highlightText(text);

			const comments = code.querySelectorAll('span.comment');
			comments.forEach(c => {
				const innerSpans = c.querySelectorAll('span');
				innerSpans.forEach(inner => {
					inner.removeAttribute('class');
				})
			})

			const greens = code.querySelectorAll('span.green');
			greens.forEach(g => {
				const text = g.textContent;
				if (m.badVars.includes(text)) {
					g.classList.remove("green");
					g.classList.add("red");
				}
			})

			pre.appendChild(code);
		}
		catch (e) {
			console.log(e);
		}
	}
}

// Terrible AI generated code.
// Somewhat double checked by me, but idk regex
function highlightText(txt) {
	let text = txt;
	// VARIABLE=blahblah
	text = text.replace(/\b\w+(?==)/g, '<span class="red">$&</span>');
	// Macro header
	text = text.replace(/Macro\s+(\w+)\s+(\w+|\?)/g, 'Macro <span class="brown">$1</span> <span class="orange">$2</span>');
	// Global var assignments
	text = text.replace(/global\s+var\s+(\w+)\s+(\w+)/g, 'global var <span class="purple">$1</span> <span class="red">$2</span>');
	// Run(Async) sth.MACROTHINGY
	text = text.replace(/(?<=\b(RunAsync|Run)\b\s+\w+\.)\w+/g, '<span class="brown">$&</span>');
	// THIS.blahblah
	text = text.replace(/(?<=[(= ])This(?=\.)/g, '<span class="fadedgreen">$&</span>')
	// ANYTHINGELSE.blahblah
	text = text.replace(/(?<=[(= ])(?!This)[A-Za-z_]\w*(?=\.)/g, '<span class="green">$&</span>')
	// dosomething(VARIABLE)
	text = text.replace(/(?<=\()\s*(?!TRUE\b)(?!FALSE\b)([A-Za-z_]\w*)\b|(?<=,\s*)(?!")(?!(TRUE|FALSE)\b)([A-Za-z_]\w*)\b/gi, '<span class="green">$&</span>')
	// blah.FUNCTION()
	text = text.replace(/(?<=\.)\w+(?=\()/g, '<span class="teal">$&</span>');
	// blah.EVENTORSTH
	text = text.replace(/(?<=\.)[A-Za-z_]\w*(?!\()/g, '<span class="magenta">$&</span>');
	// X.XX SEC
	text = text.replace(/\d+(?:\.\d+)?\ssec/g, '<span class="purple">$&</span>');
	// X TIMES
	text = text.replace(/\b\d+\s+times\b/g, '<span class="purple">$&</span>');
	// wait (FALSE)
	text = text.replace(/(?<=\(\s*)(True|False)(?=\s*\))/gi, '<span class="purple">$&</span>');
	// action keywords
	text = text.replace(/\b(Wait|RunAsync|global|ActionAsync|Action|Run|On|Send event)\b/g, '<span class="blue">$&</span>');
	// event keywords
	text = text.replace(/(?<!Send\s)\b(event|every)\b/g, '<span class="purple">$&</span>');
	// comments
	text = text.replace(/\/\/.*/g, '<span class="green comment">$&</span>');
	return text;
}