var UnsplashProvider = (function () {

	var template = `
		<img src={0} class="unsplash-background">
		<div class="unsplash-attribution">
			Photo by
			<a href="https://unsplash.com/@{1}?utm_source=minimalist-speed-dial&utm_medium=referral">Annie Spratt</a>&nbsp;
			on&nbsp;
			<a href="https://unsplash.com/?utm_source=minimalist-speed-dial&utm_medium=referral">Unsplash</a>
		</div>
	`;

	function createBackground(container) {
		// TODO compile the template

		// append the HTML
		container.innerHTML = template;
	}

	function getRandom() {
		// TODO xhr request
		// https://unsplash.com/documentation#get-a-random-photo
		// https://api.unsplash.com/photos/random/?client_id=NafZbHz1KQb3-1huWeoaHwkszS2ki31p1qD69a22Lzw
	}

	return {
		createBackground: createBackground
	};

})();