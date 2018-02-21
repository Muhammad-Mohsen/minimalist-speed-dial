// contains utility and extension functions
//
var Util = (function () {

	// toggles the visibility of the given elements using the show/hide CSS classes and the disabled property
	function toggleVisibility(endVisibility, elems) {
		var classToAdd = endVisibility ? 'show' : 'hide';
		var classToRemove = endVisibility ? 'hide' : 'show';

		for (var i = 1; i < arguments.length; i++) {
			var elem = arguments[i];

			elem.addClass(classToAdd);
			elem.removeClass(classToRemove);

			elem.prop('disabled', !endVisibility);
		}
	}

	// returns a random color in hex format
	function getRandomColor() {
		return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
	}

	function init() {
		addStringFormat();
		addEllipsis();
	}

	// adds String.format method. Thanks https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
	function addStringFormat() {
		if (!String.format) {
			String.format = function (format) {
				var args = Array.prototype.slice.call(arguments, 1);
				return format.replace(/{(\d+)}/g, function (match, number) {
					return typeof args[number] != 'undefined' ? args[number] : match;
				});
			};
		}
	}

	// adds String.ellipsize method
	function addEllipsis() {
		if (!String.ellipsize) {
			String.ellipsize = function (string, maxLength) {
				return string.length < maxLength ? string : string.substr(0, maxLength) + '...';
			};
		}
	}

	return {
		init: init,
		toggleVisibility: toggleVisibility,
		randomColor: getRandomColor
	};

})();
//
// responsible for logging
// use Const.DEBUG boolean to turn logging on/off
//
var Log = (function () {

	function d(message) {
		if (Const.DEBUG) {
			if (arguments.length > 1)
				console.log(now() + ' -- ' + message, arguments); // the arguments are ALL the arguments passed in to the log function!
			else
				console.log(now() + ' -- ' + message);
		}
	}

	function now() {
		var current = new Date();
		return current.getFullYear() + '-' + current.getMonth() + '-' + current.getDay() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();
	}

	return {
		d: d
	};

})();
//
// responsible for validation, sorry if the identifier wasn't clear!!
//
var Validate = (function () {
	// validates speed dial item name
	function isValidName(name) {
		return name !== undefined && name.length > 0;
	}

	// validates speed dial item URL
	function isValidUrl(url) {
		return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
	}

	return {
		name: isValidName,
		url: isValidUrl
	};
})();