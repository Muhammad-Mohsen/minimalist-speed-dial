// thanks https://codepen.io/kowlor/pen/ZYYQoy
var SolarSystemProvider = (function () {

	var template = `
		<div class="solar-syst">
			<div class="sun"></div>
			<div class="mercury"></div>
			<div class="venus"></div>
			<div class="earth"></div>
			<div class="mars"></div>
			<div class="jupiter"></div>
			<div class="saturn"></div>
			<div class="uranus"></div>
			<div class="neptune"></div>
			<div class="pluto"></div>
			<div class="asteroids-belt"></div>
		</div>
	`;

	function createBackground(container) {
		// append the CSS
		document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="../../css/solar-system.css" type="text/css" />')

		// append the HTML
		container.innerHTML = template;
	}

	return {
		createBackground: createBackground
	};

})();