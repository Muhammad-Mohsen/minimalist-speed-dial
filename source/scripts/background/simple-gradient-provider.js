var SimpleGradientProvider = (function () {

	function createBackground(elem) {
		var style = document.createElement('style');
		style.innerHTML = `
			body {
				background: linear-gradient(-45deg, #4a2418, #54152d, #0d3b4c, #0a4e3e)
				/* background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); */
				background-size: 400% 400%;
				animation: gradient 360s ease infinite;
			}

			@keyframes gradient {
				0% {
					background-position: 0% 50%;
				}
				50% {
					background-position: 100% 50%;
				}
				100% {
					background-position: 0% 50%;
				}
			}
		`;
		document.head.insertAdjacentElement('beforeend', style);
	}

	return {
		createBackground: createBackground
	};

})();