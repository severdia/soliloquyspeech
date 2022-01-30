
// const bplist = window.bpListCreator;

document.getElementById('lineForm').addEventListener('input', () => {
	calculateSpeechLength();
});

document.getElementById('speech').addEventListener('input', () => {
	calculateSpeechLength();
});

function calculateSpeechLength() {
	let speech = document.getElementById('speech').value;
	let lineForm = document.getElementById('lineForm');
	let lengthInSeconds = 0;
	switch (lineForm.value) {
		case null:
		case '':
		case 'Prose':
		case 'any'://No of words*3/7
			lengthInSeconds = countWords(speech) * 3 / 7;
			break;
		case 'Verse'://No of lines*3.5
			lengthInSeconds = countLines(speech) * 3.5;
			break;
	}
	document.getElementById('speechLength').value = secondsToString(Math.round(lengthInSeconds));
}
/**
 *
 * @param {string} str
 * @returns {number}
 */
function countWords(str) {
	return str.trim().split(/\s+/).length;
}
/**
 *
 * @param {string} str
 * @returns {number}
 */
function countLines(str) {
	return str.split(/\r\n|\r|\n/).filter(line => line.trim()).length;

}

/**
 *
 * @param {number} durationSeconds
 * @returns {string}
 */
function secondsToString(durationSeconds) {
	var hrs = Math.floor(durationSeconds / (60 * 60));
	var mins = Math.floor((durationSeconds / 60) % 60);
	var secs = durationSeconds % 60;
	return (hrs > 0 ? hrs + ':' : '') + (hrs > 0 ? leftPad(mins) : mins) + ':' + leftPad(secs);
}
/**
 *
 * @param {number} number
 * @returns {string}
 */
function leftPad(number) {
	return (number < 10 ? '0' : '') + number;
}

function clearForm() {
	document.querySelector('form').reset();
}

function download() {
	for (const el of document.querySelector('form').querySelectorAll("[required]")) {
		if (!el.reportValidity()) {
			return;
		}
	}

	const formData = new FormData(document.querySelector('form'));
	let fields = {};
	for (var pair of formData.entries()) {
		if (pair[1] && pair[1] != 'any') {
			fields[pair[0]] = pair[1];
		}
	}
	let fileName = `${fields['speaker']} (${fields['title']}).pssoliloquy`;





	let outputObject = {
		$version: 100000,
		$archiver: "NSKeyedArchiver",
		$top: {
			root: {
				CF$UID: 1
			}
		},
		$objects: [
			'$null',
			{
				'NS.keys': [],
				'NS.objects': [],
				$class: {}
			},
			// {
			// 	$classname: 'NSDictionary',
			// 	$classes: ['NSDictionary', 'NSObject']
			// }
		]
	};



	fields.id = 100;

	let uid = 2;
	Object.keys(fields).forEach(() => {
		outputObject.$objects[1]['NS.keys'].push({
			CF$UID: uid
		});
		uid++;
	});
	Object.keys(fields).forEach(() => {
		outputObject.$objects[1]['NS.objects'].push({
			CF$UID: uid
		});
		uid++;
	});
	outputObject.$objects[1]['$class'] = {
		CF$UID: uid
	};
	uid++;
	Object.keys(fields).forEach(fieldKey => {
		outputObject.$objects.push(fieldKey);
	});
	Object.values(fields).forEach(field => {
		outputObject.$objects.push(field);
	});

	outputObject.$objects.push(
		{
			$classname: 'NSDictionary',
			$classes: ['NSDictionary', 'NSObject']
		}
	);


	// let testOutputObject = {
	// 	$version: 100000,
	// 	$archiver: "NSKeyedArchiver",
	// 	$top: {
	// 		root: {
	// 			CF$UID: 1
	// 		}
	// 	},
	// 	$objects: [
	// 		'$null',
	// 		{
	// 			'NS.keys': [
	// 				{ CF$UID: 2 },
	// 				{ CF$UID: 3 },
	// 				{ CF$UID: 4 },
	// 				{ CF$UID: 5 },
	// 				{ CF$UID: 6 },
	// 				{ CF$UID: 7 },
	// 				{ CF$UID: 8 },
	// 				{ CF$UID: 9 },
	// 				{ CF$UID: 10 },
	// 				{ CF$UID: 11 },
	// 				{ CF$UID: 12 },
	// 			],
	// 			'NS.objects': [
	// 				{ CF$UID: 13 },
	// 				{ CF$UID: 14 },
	// 				{ CF$UID: 16 },
	// 				{ CF$UID: 13 },
	// 				{ CF$UID: 17 },
	// 				{ CF$UID: 14 },
	// 				{ CF$UID: 18 },
	// 				{ CF$UID: 19 },
	// 				{ CF$UID: 20 },
	// 				{ CF$UID: 14 },
	// 				{ CF$UID: 21 },
	// 			],
	// 			$class:
	// 				{ CF$UID: 22 }
	// 		},


	// 		'isBreeches',
	// 		'textAttributes',
	// 		'speaker',
	// 		'isOverdone',
	// 		'id',
	// 		'memorizationIgnoreRanges',
	// 		'gender',
	// 		'genre',
	// 		'text',
	// 		'authors',
	// 		'title',
	// 		false,
	// 		{
	// 			'NS.objects': [],
	// 			$class: { CF$UID: 15 },
	// 		},
	// 		{
	// 			$classname: 'NSArray',
	// 			$classes: ['NSArray', 'NSObject']
	// 		},
	// 		'Test character name',
	// 		16,
	// 		'male',
	// 		'comedy',
	// 		'Test speech goes here',
	// 		'Test play name',
	// 		{
	// 			$classname: 'NSDictionary',
	// 			$classes: ['NSDictionary', 'NSObject']
	// 		}
	// 	],

	// };

	let data = window.plist.build(outputObject);

	// console.log(data);

	saveByteArray(fileName, data);

}

function saveByteArray(fileName, bytes) {
	var blob = new Blob([bytes], { type: "application/x-pssoliloquy" });
	var link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	link.download = fileName;
	link.click();
}

//not included
//  textAttributes
//  memorizationIgnoreRanges

