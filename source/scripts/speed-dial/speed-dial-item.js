// responsible for creating a speed dial item along with its functionalities
//
var SpeedDialItem = (function () {

	// item display modes
	var MODE = {
		VIEW: 1,
		EDIT: 2
	};

	// creates a completely functional speed dial item, and as such it's a huge method!
	function create(mode, dataItem) {

		var item = $('<li>');

		// ellipsize the URL if necessary
		var ellipsizedUrl = String.ellipsize(dataItem.url, Const.MAX_URL_LENGTH);
		// if creating a new item (url is empty), use a placeholder url to avoid 404 response when calling the favicon service
		var faviconUrl = dataItem.url === undefined || dataItem.url === '' ? '1' : dataItem.url;

		// load the template
		var itemInnerHtml = String.format(Const.speedDialItemTemplate, dataItem.name, dataItem.url, ellipsizedUrl, faviconUrl);
		item.html(itemInnerHtml);

		// set the ID
		item.id = dataItem.id;

		// initialize elements
		item.uiElements = {
			// view mode
			vmFavicon: item.find('[view-mode] .favicon img'),
			vmSiteName: item.find('[view-mode] .speed-dial-item-name p'),
			vmSiteUrl: item.find('[view-mode] .speed-dial-item-url p'),

			// edit mode
			emSiteName: item.find('#input-site-name'),
			emSiteUrl: item.find('#input-site-url'),
		};
		//
		// event handlers
		//
		var viewModeUrl = item.find('.speed-dial-item-url');
		var viewModeButtons = item.find('[view-mode] button');

		item.mouseenter(function () {
			Util.toggleVisibility(true, viewModeUrl, viewModeButtons);
		});

		item.mouseleave(function () {
			Util.toggleVisibility(false, viewModeUrl, viewModeButtons);
		});

		item.find('a').on('click', function (e) {
			if (getMode(item) === MODE.EDIT) {
				e.preventDefault();
			}

		});
		//
		// secondary button click handler
		//
		item.find('[button-secondary]').on('click', function (e) {
			e.preventDefault();
			var newMode = getMode(item) === MODE.EDIT ? MODE.VIEW : MODE.EDIT;

			var name = getViewModeName(item);
			var url = getViewModeUrl(item);

			// remove the item if the item was new and the cancel button was pressed
			if (newMode === MODE.VIEW && (item.id === undefined || item.id === '')) {
				item.slideUp(250, function () {
					item.remove();
				});

			// go to EDIT mode if the edit item was pressed
			// or to VIEW mode if the cancel button was pressed and it's not a new item
			} else {
				setMode(item, newMode, true);
			}
		});
		//
		// primary button click handler
		//
		item.find('[button-primary]').on('click', function (e) {
			e.preventDefault();
			var currentMode = getMode(item);

			// trash button
			if (currentMode === MODE.VIEW) {
				item.slideUp(250, function () {
					SpeedDialStorage.removeItem(item.id);
					item.remove();
				});

			// accept button
			} else {
				// get the values
				var name = getEditModeName(item);
				var url = getEditModeUrl(item);

				// validate them
				var isValidName = Validate.name(name);
				var isValidUrl = Validate.url(url);
				if (isValidName && isValidUrl) {
					SpeedDialStorage.addItem(name, url, item.id, function (id) {
						setFavicon(item, url);
						setName(item, name);
						setUrl(item, url);

						item.id = id; // set the item ID
						item.find('a').attr('href', url);

						setMode(item, MODE.VIEW, true);
					});

				} else { // if invalid, show invalid UI
					updateValidationUi(item, isValidName, isValidUrl);
				}
			}
		});

		// edit mode input changed handler (works on both Name, and URL input fields)
		item.find('.group input').on('input', function (e) {
			updateElementValidationUi($(e.currentTarget), true);
		});

		// set the display mode
		setMode(item, mode, false);

		return item;
	}
	//
	// getters/setters
	//
	function getMode(item) {
		return item.find('[edit-mode]').css('display') === 'none' ? MODE.VIEW : MODE.EDIT;
	}

	function setMode(item, mode, animate) {
		var animationDuration = animate === true ? 250 : 0;

		var selectorToHide = mode === MODE.VIEW ? '[edit-mode]' : '[view-mode]';
		var selectorToShow = mode === MODE.VIEW ? '[view-mode]' : '[edit-mode]';

		// slideUp/slideDown require the item to be attached to DOM?
		setTimeout(function () {
			item.find(selectorToHide).slideUp(animationDuration, function () {
				item.find(selectorToShow).slideDown(animationDuration);
			});
		}, 1);
	}

	function setFavicon(item, url) {
		item.uiElements.vmFavicon.attr('src', Const.GOOGLE_FAVICON_API + url);
	}

	function getViewModeName(item) {
		return item.uiElements.vmSiteName.html();
	}

	function getEditModeName(item) {
		return item.uiElements.emSiteName.val();
	}

	function setName(item, name) {
		item.uiElements.emSiteName.val(name);
		item.uiElements.vmSiteName.html(name);
	}

	function getViewModeUrl(item) {
		return item.uiElements.vmSiteUrl.html();
	}

	function getEditModeUrl(item) {
		return item.uiElements.emSiteUrl.val();
	}

	function setUrl(item, url) {
		item.uiElements.emSiteUrl.val(url);
		item.uiElements.vmSiteUrl.html(String.ellipsize(url, Const.MAX_URL_LENGTH));
	}

	// helper method that updates the input boxes' labels depending on their valid state
	function updateValidationUi(item, isValidName, isValidUrl) {
		var inputLabels = item.find('.group input');

		updateElementValidationUi(inputLabels.eq(0), isValidName);
		updateElementValidationUi(inputLabels.eq(1), isValidUrl);
	}

	function updateElementValidationUi(element, isValid) {
		if (isValid) {
			element.removeClass('invalid');
		} else {
			element.addClass('invalid');
		}
	}

	return {
		MODE: MODE,
		create: create,
		setMode: setMode
	};

})();