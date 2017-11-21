// responsible for creating a speed dial item along with its functionalities
//
var SpeedDialItem = (function () {

	// item display modes
	var MODE = {
		VIEW: 1,
		EDIT: 2
	};

	// creates a completely functional speed dial item
	function create(mode, name, url) {

		// ellipsize the URL if necessary
		var ellipsizedUrl = String.ellipsize(url, Const.MAX_URL_LENGTH);
		// load the template
		var itemInnerHtml = String.format(Const.speedDialItemTemplate, name, url, ellipsizedUrl);

		var item = $('<li>');
		item.html(itemInnerHtml);

		// elements
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

		item.find('[button-secondary]').on('click', function (e) {
			e.preventDefault();
			var newMode = getMode(item) === MODE.EDIT ? MODE.VIEW : MODE.EDIT;

			// only move back to VIEW mode if the old values are valid (not empty)
			// basically, if it's not a new item
			var name = getViewModeName(item);
			var url = getViewModeUrl(item);
			if (newMode === MODE.VIEW && Validate.name(name) && Validate.url(url)) {
				setMode(item, newMode, true);

			} else if (newMode === MODE.EDIT) {
				item.oldUrl = getEditModeUrl(item); // set the oldUrl prop. It's used as an ID to update the item
				setMode(item, newMode, true);
			}
		});

		item.find('[button-primary]').on('click', function (e) {
			e.preventDefault();
			var currentMode = getMode(item);

			// trash button
			if (currentMode === MODE.VIEW) {
				item.slideUp(250, function () {
					SpeedDialStorage.removeItem(getEditModeUrl(item));
					item.remove();
				});

			// accept button
			} else {
				var name = getEditModeName(item);
				var url = getEditModeUrl(item);

				if (Validate.name(name) && Validate.url(url)) {
					// the old URL property was set on the item when the edit mode was first entered
					SpeedDialStorage.addItem(name, url, item.oldUrl, function () {
						setFavicon(item, url);
						setName(item, name);
						setUrl(item, url);

						setMode(item, MODE.VIEW, true);
					});
				}
			}
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

	return {
		MODE: MODE,
		create: create,
		setMode: setMode
	};

})();