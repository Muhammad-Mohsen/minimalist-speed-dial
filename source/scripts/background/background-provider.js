//
// background creation interface
//
var BackgroundProvider = (function () {

	var List = {
		FSS: FssProvider,
		GRADIENT: GradientProvider,
		SIMPLE_GRADIENT: SimpleGradientProvider,
		DIAGONAL: DiagonalProvider,
		SOLAR_SYSTEM: SolarSystemProvider,
		UNSPLASH: UnsplashProvider
	}

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

		container.style.height = height + 'px';
		container.style.width = width + 'px';
	}

	return {
		List: List,
		setProvider: setProvider,
		createBackground: createBackground
	};
})();