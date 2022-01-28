
const bplist = window.bpListCreator;

function download() {
	for (const el of document.querySelector('form').querySelectorAll("[required]")) {
		if (!el.reportValidity()) {
			return;
		}
	}

	const formData = new FormData(document.querySelector('form'));
	let fields = {};
	for (var pair of formData.entries()) {

		if (pair[1]) {
			fields[pair[0]] = pair[1];
		}
		console.log(pair[0] + ': ' + pair[1]);
	}
	let fileName = `${fields['speaker']}(${fields['title']}).pssoliloquy`;

	let bdata = bplist(fields);

	saveByteArray(fileName, bdata);

}

function saveByteArray(fileName, bytes) {
	var blob = new Blob([bytes], { type: "application/pdf" });
	var link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	link.download = fileName;
	link.click();
}