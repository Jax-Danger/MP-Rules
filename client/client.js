(function () {
	const vein = exports.vein;

	const controlWidth = 0.2;
	const labelWidth = 0.1;

	const drawLabel = function (text) {
		vein.setNextItemWidth(labelWidth);
		vein.label(text);
	};

	let holoStyleSheet;

	let isChecked = false;
	let isCollapsed = true;
	let isHoloStyle = false;
	let floatValue = 0;
	let textValue = '';
	let selectable = [false, false, false];

	let windowState = {};
	let isWindowOpened = false;

	const showVeinDemo = async function (windowTick) {
		if (!isWindowOpened) {
			clearTick(windowTick);
			windowState = {};
			return;
		}

		if (!windowState.usedAlready && windowState.rect) {
			windowState.rect.x = 0.5 - windowState.rect.w / 2;
			windowState.rect.y = 0.5 - windowState.rect.h / 2;
			windowState.usedAlready = true;
		}

		vein.beginWindow(windowState.rect ? windowState.rect.x : null, windowState.rect ? windowState.rect.y : null);

		vein.heading('Main Power Rules');

		// for each rule draw a label with the rule number and title and description
		for (let i = 0; i < rules.length; i++) {
			const rule = rules[i];
			drawLabel(`${rule.number}: ${rule.title}`);
			vein.label(rule.description);
		}


		vein.spacing();

		if (vein.button('Close')) isWindowOpened = false;

		windowState.rect = vein.endWindow();
	};

	on('onClientResourceStart', function (resourceName) {
		if (resourceName != GetCurrentResourceName()) return;

		const fontFileName = 'roboto';
		RegisterFontFile(fontFileName);
		const fontId = RegisterFontId(fontFileName);

		holoStyleSheet = `text-edit {
			background-color: rgba(45, 49, 50, 1.0);
			font-family: ${fontId};
		}

		button, sprite-button {
			background-color: rgba(254, 254, 254, 1.0);
			background-image: url('holo', 'button');
			font-family: ${fontId};
		}

		check-box, collapsing-header {
			background-color: rgba(45, 49, 50, 1.0);
			font-family: ${fontId};
		}

		check-box:hover, collapsing-header:hover {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
		}

		button:hover, sprite-button:hover {
			background-color: rgba(254, 254, 254, 1.0);
			background-image: url('holo', 'button_hover');
		}

		heading {
			font-family: ${fontId};
		}

		label, text-area {
			color: rgba(255, 255, 240, 1.0);
			font-family: ${fontId};
		}

		progress-bar {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
		}

		separator {
			color: rgba(45, 49, 50, 1.0);
		}

		slider {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(255, 255, 240, 1.0);
		}

		slider:hover {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
		}

		text-edit:hover {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
		}

		window {
			background-color: rgba(254, 254, 254, 1.0);
			background-image: url('holo', 'window');
		}`;

		RegisterCommand('rules', function () {
			isWindowOpened = !isWindowOpened;
			if (isWindowOpened) {
				const windowTick = setTick(async function () {
					await showVeinDemo(windowTick);
				});
			}
		});
	});
})();