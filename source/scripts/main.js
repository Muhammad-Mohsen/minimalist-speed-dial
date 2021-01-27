//
// entry point
//
var Main = (function () {

	function init() {
		Util.init();
		SpeedDial.init();

		BackgroundProvider.setProvider(BackgroundProvider.List.SOLAR_SYSTEM);
		BackgroundProvider.createBackground(document.querySelector('#background-wrapper'));
	}

	return {
		init: init
	};

})();

Main.init();