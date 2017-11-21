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
			var item = SpeedDialItem.create(SpeedDialItem.MODE.EDIT, '', '');
			uiElements.unorderedListSpeedDial.append(item);

			// it doesn't fucking work!! FUCK!!
			// item.hide();
			// item.slideDown(250);
		});

		populateSpeedDialList();
	}

	function populateSpeedDialList() {
		SpeedDialStorage.getList(function (list) {
			for (var i = 0; i < list.length; i++) {
				var item = SpeedDialItem.create(SpeedDialItem.MODE.VIEW, list[i].name, list[i].url);
				uiElements.unorderedListSpeedDial.append(item);
			}
		});

		// TODO add drag/drop functionality?
	}

	function toggleAddFormVisibility(show) {
		setTimeout(function () {
			Util.toggleVisibility(show, uiElements.divSiteName, uiElements.inputSiteName);
		}, show ? 150 : 300);
		setTimeout(function () {
			Util.toggleVisibility(show, uiElements.divSiteUrl, uiElements.inputSiteUrl);
		}, show ? 300 : 150);
		setTimeout(function () {
			Util.toggleVisibility(show, uiElements.buttonCancel);
		}, show ? 450 : 0);

		if (show) {
			uiElements.buttonAddConfirmContainer.addClass('button-add-final');
			uiElements.buttonAddConfirmContainer.removeClass('button-add-initial');

		} else {
			setTimeout(function () {
				uiElements.buttonAddConfirmContainer.addClass('button-add-initial');
				uiElements.buttonAddConfirmContainer.removeClass('button-add-final');
			}, 150);
		}
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