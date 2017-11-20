//
// background creation interface
//
var BackgroundProvider = (function () {

	var provider;

	// sets the desired provider
	function setProvider(p) {
		provider = p;
	}

	// actually creates the background
	function createBackground(container) {
		initializeContainer(container);
		return provider.createBackground(container);
	}

	// sets the height and width of the container according to the client
	function initializeContainer(container) {
		var height = window.outerHeight;
		var width = window.outerWidth;

		container.height(height);
		container.width(width);
	}

	return {
		setProvider: setProvider,
		createBackground: createBackground
	};
})();