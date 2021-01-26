// maintains the list of speed dial items
var SpeedDialStorage = (function () {

	function get(callback) {
		chrome.storage.local.get('list', function (result) {
			if (result && result.list) callback(result.list);
			else callback([]); // return an empty array
		});
	}

	// upserts a speed dial item
	// I don't know why but if I rename the 'itemId' to just 'id' its value is undefined within the get() method
	function add(name, url, itemId, callback) {
		get(function (list) {
			//
			// update the duplicate if found
			//
			for (var i = 0; i < list.length; i++) {
				if (list[i].id === itemId) {
					list[i].name = name;
					list[i].url = url;

					setList(list); // Save list

					if (callback) callback(list[i].id);
					return;
				}
			}
			//
			// add the new site to the array
			//
			var id = generateId(list); // generate the new item ID
			list.push({ id: id, name: name, url: url }); // push the new item to the list
			setList(list); // Save list

			if (callback) callback(id);
		});
	}

	function rearrange(oldIndex, newIndex, callback) {
		get(function (list) {
			var item = list.splice(oldIndex, 1); // remove the item from its original position
			list.splice(newIndex, 0, item[0]); // put it back at the new position

			setList(list); // Save list

			if (callback) callback();
			return;
		});
	}

	function remove(id, callback) {
		get(function (list) {
			Log.d('id to remove: ' + id);

			// remove site from array
			for (var i = 0; i < list.length; i++) {
				if (list[i].id === id) {
					Log.d('we found it!');

					list.splice(i, 1);
					break;
				}
			}

			// Save list to localstorage
			setList(list);

			if (callback) callback();
		});
	}

	// a 'private' function updates the locally stored list of speed dials
	// list is an array
	function setList(list) {
		chrome.storage.local.set({ 'list': list });
	}

	// generates IDs for new list items
	function generateId(list) {
		return Math.floor(Math.random() * list.length + Math.random() * 1024);
	}

	return {
		getList: get,
		addItem: add,
		moveItem: rearrange,
		removeItem: remove
	};

})();