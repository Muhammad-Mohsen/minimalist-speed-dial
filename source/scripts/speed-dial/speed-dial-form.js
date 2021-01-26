var SpeedDialForm = (function () {

	var template = `
		<div id="dial-form" class="row dial-item dial-form fade">
			<div class="row expand">
				<div class="group">
					<input id="input-site-name" type="text" value="{0}" required>
					<span class="bar"></span>
					<label>Name</label>
				</div>
			</div>
			<div class="row expand">
				<div class="group">
					<input id="input-site-url" type="text" value="{1}" required>
					<span class="bar"></span>
					<label>URL</label>
				</div>
			</div>

			<button class="center-horizontal circle alpha-button" button-secondary title="Cancel">
				<img src="../images/close-icon.png" width="14" />
			</button>

			<button class="center-horizontal circle alpha-button" button-primary title="Accept">
				<img src="../images/accept-icon.png" width="14" />
			</button>
		</div>
	`;

	var ui = {};
	var data;

	function init() {
		document.querySelector('#speed-dial-wrapper').insertAdjacentHTML('beforeend', template);

		ui.container = document.querySelector('.dial-form');
		ui.nameInput = document.querySelector('#input-site-name');
		ui.urlInput = document.querySelector('#input-site-url');

		// cancel button
		ui.container.querySelector('[button-secondary]').addEventListener('click', function (e) {
			e.preventDefault();
			ui.container.classList.add('fade');
		});

		// confirm button
		ui.container.querySelector('[button-primary]').addEventListener('click', function (e) {
			e.preventDefault();

			var newName = ui.nameInput.value;
			var newUrl = ui.urlInput.value;

			// validate them
			var isValidName = Validate.name(newName);
			var isValidUrl = Validate.url(newUrl);
			if (isValidName && isValidUrl) {
				SpeedDialStorage.addItem(newName, newUrl, data.id, function (id) {
					data = {
						id: id,
						name: newName,
						url: newUrl
					};
					SpeedDialItem.update(data);
					ui.container.classList.add('fade');
				});

			} else { // if invalid, show invalid UI
				updateElementValidationUi(ui.nameInput, isValidName);
				updateElementValidationUi(ui.urlInput, isValidUrl);
			}
		});

		ui.nameInput.addEventListener('input', function (e) {
			updateElementValidationUi(ui.nameInput, true);
		});
		ui.urlInput.addEventListener('input', function (e) {
			updateElementValidationUi(ui.urlInput, true);
		});
	}

	function show(itemData) {
		data = itemData;

		ui.container.classList.remove('fade');
		ui.nameInput.value = data.name;
		ui.urlInput.value = data.url;
	}

	function updateElementValidationUi(element, isValid) {
		if (isValid) element.classList.remove('invalid');
		else element.classList.add('invalid')
	}

	return {
		init: init,
		show: show
	};

})();