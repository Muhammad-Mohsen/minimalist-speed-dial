var SolarSystemProvider = (function () {

	function createBackground(container) {
		// append the CSS
		$('head').append('<link rel="stylesheet" href="../../css/solar-system.css" type="text/css" />');

		// append the HTML
		$.get('../../html/solar-system.html', function (html) {
			container.html(html);
		});
	}

	return {
		createBackground: createBackground
	};

})();