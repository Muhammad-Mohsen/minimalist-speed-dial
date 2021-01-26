var SpeedDial = (function () {

	var ui;

	function init() {

		SpeedDialForm.init();

		ui = {
			body: document.body,
			wrapper: document.querySelector('#speed-dial-wrapper'),
			dials: document.querySelector('#speed-dial-list'),
			addButton: document.querySelector('#button-add-item')
		};

		ui.addButton.addEventListener('click', () => {
			SpeedDialForm.show(SpeedDialItem.emptyDataObject());
		});

		populateSpeedDialList();
	}

	function populateSpeedDialList() {
		SpeedDialStorage.getList(function (list) {
			for (var i = 0; i < list.length; i++) {
				var item = SpeedDialItem.create(list[i]);
				ui.dials.insertAdjacentElement('beforeend', item);
			}
		});
	}

	return {
		init: init
	};

})();