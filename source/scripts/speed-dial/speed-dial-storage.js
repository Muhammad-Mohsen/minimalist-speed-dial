// maintains the list of speed dial items
var SpeedDialStorage = (function () {

	function get(callback) {
		chrome.storage.local.get('list', function (result) {
			if (result && result.list)
				callback(result.list);

			else
				callback([]); // return an empty array
		});
	}

	// a 'private' function updates the locally stored list of speed dials
	// list is an array
	function setList(list) {
		chrome.storage.local.set({ 'list': list });
	}

	function add(name, url, oldUrl, callback) {
		// update the duplicate if found
		get(function (list) {
			for (var i = 0; i < list.length; i++) {
				if (list[i].url == oldUrl) {
					list[i].name = name;
					list[i].url = url;

					// Save list to localstorage
					setList(list);

					if (callback)
						callback();

					return;
				}
			}

			// actually add the new site to the array
			list.push({ name: name, url: url });

			// Save list to localstorage
			setList(list);

			if (callback)
				callback();
		});
	}

	function remove(url, callback) {
		get(function (list) {
			Log.d('url to remove: ' + url);

			// remove site from array
			for (var i = 0; i < list.length; i++) {
				if (list[i].url === url) {
					Log.d('we found it!');

					list.splice(i, 1);
					break;
				}
			}

			// Save list to localstorage
			setList(list);

			if (callback)
				callback();
		});
	}

	return {
		getList: get,
		addItem: add,
		removeItem: remove
	};

})();