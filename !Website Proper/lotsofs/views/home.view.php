<?php require('views/partials/head.php') ?>

<?php require('views/partials/nav.php') ?>

<h1>
	Main Page
</h1>
<div id="frontPage_exchangeRates">
	<h2>
		Exchange Rates
	</h2>
	<p>
		Exchange rates for commonly used currencies. (Based on EUR)
	</p>

	<table>
		<thead>
			<tr>
				<th>Alpha</th>
				<th>Numeric</th>
				<th>Currency Name</th>
				<th>Example Location</th>
				<th>Rate</th>
				<th>Rate (to EUR)</th>
				<th>Calculate</th>
			</tr>
		</thead>
		<tbody id="exchangeRates">
			
		</tbody>
	</table>
	<p id="exchangeRateReadError">
	</p>
	<p>
		<a href="exchangeRates">More</a>
	</p>
</div>

<p>
	There currently isn't much here yet. Did you mean to do one of the following?:
	<ul>
		<li>Access my Keep Talking and Nobody Explodes <a class="links-link" href="ktane">merged translated modules manuals w/ bonus languages</a>.</li>
	</ul>
</p>

<script src="js/exchangeRates.js"></script>
<script>
	currencyWhiteList = ["CHF", "DKK", "EUR", "GBP", "IDR", "MYR", "NPR", "SEK", "TRY", "USD"]
	processExchangeRates(<?= $exchangeRatesJson ?>)
</script>

<textarea id="jsonInput" placeholder='Example: 
[
  {"Artist":"Dream Theater","Title":"Bridges in the Sky"}, 
  {"Artist":"Paramore","Title":"The Only Exception"}
]'>
</textarea>
<p id="jsonFormat_Message"></p>
<table>
	<thead>
		<tr>
			<th>Provided Artist Name</th>
			<th>Found Artist Name</th>
		</tr>
	</thead>
	<tbody id="jsonFormat_ArtistTable">

	</tbody>
</table>
<button id="jsonFormat_SubmitButton">Submit Artists</button>

<script>
	const data_artistNames = <?= json_encode($globalData['artistNames']) ?>;
	
	const jsonInput = document.getElementById("jsonInput");
	const jsonFormat_Message = document.getElementById("jsonFormat_Message");
	const jsonFormat_ArtistTable = document.getElementById("jsonFormat_ArtistTable");
	const jsonFormat_ArtistSubmit = document.getElementById("jsonFormat_SubmitButton");

	function buildTableHtml(data_userInput) {
		if (!data_userInput) return;

		data_userInput.forEach(item => {
			// get the artist from our input data
			const artist = escapeHtml(item.Artist || item.artist || '');
			// create tablerow
			const tr_ClassName = "artist_" + artist;
			const tr_Exists = jsonFormat_ArtistTable.querySelector(`tr[data_artist="${CSS.escape(artist)}"]`);
			if (tr_Exists) {
				return;
			}
			const tr_Element = appendChildToElement(jsonFormat_ArtistTable, "tr");
			tr_Element.setAttribute('data_artist', artist);
			
			// create cell that contains our input name
			appendChildToElement(tr_Element, "td", artist);
			
			// create cell with dropdown + input field + checkbox
			const td_Element = appendChildToElement(tr_Element, "td", "");
			const dropDown_Element = appendChildToElement(td_Element, "select");
			const textInput_Element = appendChildToElement(td_Element, "input");
			textInput_Element.type = "text";
			const checkBox_Element = appendChildToElement(td_Element, "input");
			checkBox_Element.type = "checkbox";
			
			// populate dropdown list
			const optionNew = appendChildToElement(dropDown_Element, "option", "<New>");
			optionNew.value = "0";
			const optionSkip = appendChildToElement(dropDown_Element, "option", "<Skip>");
			optionSkip.value = "-1";
			data_artistNames.forEach(aName => {
				appendChildToElement(dropDown_Element, "option", aName);
			});
		});
	}

	jsonInput.addEventListener('input', () => {
		const text = jsonInput.value;
		jsonFormat_ArtistTable.innerHTML = "";
		if (!text) {
			jsonFormat_Message.innerHTML = "";
			return
		}
		try {
			const data = JSON.parse(text);
			if (!Array.isArray(data)) {
				jsonFormat_Message.innerHTML = "JSON must be array";
				return;
			}
			jsonFormat_Message.innerHTML = "";
			buildTableHtml(data);
		}
		catch (e) {
			jsonFormat_Message.innerHTML = "Invalid JSON " + e;
		}
	});

	jsonFormat_ArtistSubmit.addEventListener('click', () => {
		const newArtists = [];		

		const rows = jsonFormat_ArtistTable.querySelectorAll("tr[data_artist]");
		rows.forEach(row => {
			const artist = row.getAttribute("data_artist");
			const select = row.querySelector("select");
			const input = row.querySelector("input[type='text']");
			const checkbox = row.querySelector("input[type='checkbox'");

			if (select && select.value === "0") {
				newArtists.push({
					artist_id: select.value,
					name: input.value.trim(),
					is_actual: checkbox.checked,
				});
			}
		});
		if (newArtists.length === 0) {
			return;
		}

		// fetch
	});

	// function addCurrencyTableRow(tableElement, alphaCode, rate) {
	// 	const isoInfo = getIsoEntry(alphaCode)
			
	// 	const rowElement = appendChildToElement(tableElement, "tr", "")

	// 	appendChildToElement(rowElement, "td", alphaCode)
	// 	appendChildToElement(rowElement, "td", isoInfo.numericCode)
	// 	appendChildToElement(rowElement, "td", isoInfo.currency)
	// 	appendChildToElement(rowElement, "td", isoInfo.entity)
	// 	appendChildToElement(rowElement, "td", rate == -1 ? "" : rate.toFixed(RATE_DISPLAY_DECIMALS))
	// 	appendChildToElement(rowElement, "td", rate == -1 ? "" : (1/rate).toFixed(RATE_DISPLAY_DECIMALS))
		
	// 	const inputCellElement = appendChildToElement(rowElement, "td", "")
	// 	if (rate != -1) {
	// 		const inputFieldElement = appendChildToElement(inputCellElement, "input", "")
		
	// 		inputFieldElement.id = `calc-${alphaCode}`
	// 		inputFieldElement.classList.add(ELEMENT_CURRENCY_INPUT_FIELD_ID)
	// 		inputFieldElement.type = "number"
	// 		inputFieldElement.value = 0
	// 		inputFieldElement.addEventListener('input', () => {
	// 			calculateConversions(inputFieldElement)
	// 		})
	// 	}	
	// }

</script>


<?php require('views/partials/foot.php') ?>
