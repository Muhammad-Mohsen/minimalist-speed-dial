//
// entry point
//
var Main = (function () {

	function init() {
		Util.init();
		SpeedDial.init();

		var backgroundWrapper = $('#background-wrapper');

		BackgroundProvider.setProvider(FssProvider);
		BackgroundProvider.createBackground(backgroundWrapper);
	}

	return {
		init: init
	};

})();

Main.init();