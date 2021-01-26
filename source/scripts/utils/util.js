// contains utility and extension functions
var Util = (function () {

	// returns a random color in hex format
	function getRandomColor() {
		return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
	}

	function slideOut(elem, duration, callback) {
		hide(elem, 'slide', duration, callback);
	}
	function slideIn(elem, duration, callback) {
		show(elem, 'slide', duration, callback);
	}

	function fadeOut(elem, duration, callback) {
		hide(elem, 'fade', duration, callback);
	}
	function fadeIn(elem, duration, callback) {
		show(elem, 'fade', duration, callback);
	}

	function hide(elem, cls, duration, callback) {
		elem.classList.add(cls);
		setTimeout(() => {
			if (callback) callback();
		}, duration);
	}
	function show(elem, cls, duration, callback) {
		elem.classList.remove(cls);
		setTimeout(() => {
			if (callback) callback();
		}, duration);
	}

	function init() {
		addStringFormat();
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

	return {
		init: init,

		randomColor: getRandomColor,

		slideOut: slideOut,
		slideIn: slideIn,
		fadeOut: fadeOut,
		fadeIn: fadeIn
	};

})();

var Const = {
	MAX_URL_LENGTH: 40,
	GOOGLE_FAVICON_API: 'http://www.google.com/s2/favicons?domain=',
	DEBUG: true // enables/disables extension-wide logging
};

// use Const.DEBUG boolean to turn logging on/off
var Log = (function () {

	function debug(message) {
		if (Const.DEBUG) {
			if (arguments.length > 1) console.log(now() + ' -- ' + message, arguments);
			else console.log(now() + ' -- ' + message);
		}
	}

	function now() {
		var n = new Date();
		return n.getFullYear() + '.' + n.getMonth() + '.' + n.getDay() + ' ' + n.getHours() + ':' + n.getMinutes() + ':' + n.getSeconds();
	}

	return {
		d: debug
	}

})();

var Validate = (function () {
	// validates speed dial item name
	function isValidName(name) {
		return name !== undefined && name.length > 2;
	}

	// validates speed dial item URL
	function isValidUrl(url) {
		return /^(ftp|http|https):\/\/[^ "]+$/.test(url);;
	}

	return {
		name: isValidName,
		url: isValidUrl
	}
})();