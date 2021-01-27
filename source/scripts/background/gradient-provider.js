var GradientProvider = (function () {

	function createBackground(elem) {
		var generator = new ColorfulBackgroundGenerator();

		generator.addLayer(new ColorfulBackgroundLayer({ degree: 50, h: 35, s: 0.95, l: 45, posColor: 100 })); // bottom layer
		generator.addLayer(new ColorfulBackgroundLayer({ degree: 140, h: 220, s: 0.9, l: 0.7, posColor: 30, posTransparency: 80 }));
		generator.addLayer(new ColorfulBackgroundLayer({ degree: 210, h: 340, s: 0.9, l: 0.65, posColor: 10, posTransparency: 55 })); // top layer

		// Assign generated style to the element identified by it's id
		generator.assignStyleToElement(elem);
		elem.style.height = '100vh';
	}

	return {
		createBackground: createBackground
	};

})();