// responsible for creating a speed dial item along with its functionalities
var SpeedDialItem = (function () {

	var template = `
		<a href="{1}" data-id="{3}" class="dial-item row" draggable="true">
			<img class="favicon" src="http://www.google.com/s2/favicons?domain={2}" />

			<div class="row expand">
				<p class="dial-item-name">{0}</p>
				<p class="dial-item-url" title="{1}">{1}</p>
			</div>

			<button button-secondary class="center-horizontal circle alpha-button" title="Edit Item">
				<img src="../images/edit-icon.png" width="14" />
			</button>

			<button button-primary class="center-horizontal circle alpha-button" title="Remove Item">
				<img src="../images/trash-icon.png" width="14" />
			</button>
		</a>
	`;

	// creates a completely functional speed dial item
	function create(data) {

		// if creating a new item (url is empty), use a placeholder url to avoid 404 response when calling the favicon service
		var faviconUrl = data.url === undefined || data.url === '' ? '1' : data.url;

		var item = document.createElement('li');
		item.innerHTML = String.format(template, data.name, data.url, faviconUrl, data.id); // compile the template

		// remove button click handler
		item.querySelector('[button-primary]').addEventListener('click', function (e) {
			e.preventDefault();

			Util.slideOut(item.querySelector('a'), 300, () => {
				SpeedDialStorage.removeItem(data.id);
				item.parentNode.removeChild(item);
			});
		});

		// edit button click handler
		item.querySelector('[button-secondary]').addEventListener('click', function (e) {
			e.preventDefault();
			SpeedDialForm.show(data);
		});

		return item;
	}

	function update(data) {
		var item = document.querySelector('[data-id="' + data.id + '"]');
		if (item) {
			item.querySelector('.dial-item-name').innerHTML = data.name;
			item.querySelector('.dial-item-url').innerHTML = data.url;

		} else {
			// TODO do entrance animation
			var newItem = create(data);
			document.querySelector('#speed-dial-list').insertAdjacentElement('beforeend', newItem);
		}
	}

	function emptyDataObject() {
		return {
			name: '',
			url: ''
		}
	}

	function handleItemDragDrop(parentInput, dial) {
		var dragHandle = dial.querySelector('.drag-handle');

		dragHandle.addEventListener('dragstart', function (e) {
			dial.classList.add('start');

			e.dataTransfer.effectAllowed = 'move';
			parentInput.dragSource = item;
		});
		dial.addEventListener('dragenter', function (e) {
			dial.classList.add('over');
		});
		dial.addEventListener('dragover', function (e) {
			e.preventDefault();
			return false;
		});
		dial.addEventListener('dragleave', function (e) {
			if (e.target != item) return;
			item.classList.remove('over');
		});
		dragHandle.addEventListener('dragend', function (e) {
			var dials = parentInput.children[0].children;
			for (var i = 0; i < dials.length; i++) dials[i].classList.remove('over');

			dial.classList.remove('start');
		});

		dials.addEventListener('drop', function (e) {
			e.stopPropagation(); // stops the browser from redirecting.

			if (parentInput.dragSource !== dial) {
				// TODO
				// updateItems(parentInput);
			}

			return false;
		});

	}

	return {
		create: create,
		update, update,
		emptyDataObject: emptyDataObject
	};

})();