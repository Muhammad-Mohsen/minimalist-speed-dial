var SpeedDial = (function () {

	var uiElements;

	function init() {
		uiElements = {
			body: $('body'),
			speedDialWrapper: $('#speed-dial-wrapper'),
			unorderedListSpeedDial: $('#speed-dial-list'),
			buttonAddItem: $('#button-add-item'),

			buttonApps: $('#button-apps')
		};

		registerBodyMouseEnterLeave();

		uiElements.buttonApps.on('click', function () {
			chrome.runtime.sendMessage({
				action: 'apps'
			});
		});

		uiElements.buttonAddItem.on('click', function () {
			var dataItem = {
				name: '',
				url: ''
			};

			var item = SpeedDialItem.create(SpeedDialItem.MODE.EDIT, dataItem);
			uiElements.unorderedListSpeedDial.append(item);

			// it doesn't fucking work!! FUCK!!
			// item.hide();
			item.slideDown(250);
		});

		populateSpeedDialList();
	}

	function populateSpeedDialList() {
		SpeedDialStorage.getList(function (list) {
			for (var i = 0; i < list.length; i++) {
				var item = SpeedDialItem.create(SpeedDialItem.MODE.VIEW, list[i]);
				uiElements.unorderedListSpeedDial.append(item);
			}
		});
	}

	function registerBodyMouseEnterLeave() {
		uiElements.body.mouseenter(function () {
			Util.toggleVisibility(true, uiElements.speedDialWrapper, uiElements.buttonApps);
		});

		uiElements.body.mouseleave(function () {
			Util.toggleVisibility(false, uiElements.speedDialWrapper, uiElements.buttonApps);
		});
	}

	return {
		init: init
	};

})();