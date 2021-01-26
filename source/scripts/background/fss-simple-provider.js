var FssSimpleProvider = (function () {
	var container;
	var renderer;
	var scene;
	var light;
	var geometry;
	var material;
	var mesh;
	var now, start;

	function initialize(c) {
		container = c;
		renderer = new FSS.CanvasRenderer();
		scene = new FSS.Scene();
		light = new FSS.Light('#111122', '#5555AA');// TODO randomize
		geometry = new FSS.Plane(c.width(), c.height(), 20, 15); // TODO
		material = new FSS.Material('#FFFFFF', '#FFFFFF');
		mesh = new FSS.Mesh(geometry, material);
		start = Date.now();

		scene.add(mesh);
		scene.add(light);
		container.appendChild(renderer.element);
		window.addEventListener('resize', resize);
	}

	function resize() {
		renderer.setSize(container.offsetWidth, container.offsetHeight);
	}

	function animate() {
		now = Date.now() - start;
		light.setPosition(300 * Math.sin(now * 0.001), 200 * Math.cos(now * 0.0005), 60);
		renderer.render(scene);
		requestAnimationFrame(animate);
	}

	function createBackground(container) {
		initialize(container);
		resize();
		animate();
	}

})();