var DiagonalProvider = (function () {

	var template = `
		<div class="diagonal-bg"></div>
		<div class="diagonal-bg diagonal-bg2"></div>
		<div class="diagonal-bg diagonal-bg3"></div>
	`;

	var cssTemplate = ``; // TODO

	function createBackground(elem) {
		elem.innerHTML = template;
	}

	return {
		createBackground: createBackground
	};

})();