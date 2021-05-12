var UnsplashProvider = (function () {

	var URL = 'https://api.unsplash.com/photos/random/?client_id=NafZbHz1KQb3-1huWeoaHwkszS2ki31p1qD69a22Lzw&orientation=landscape';
	var KEY = 'NafZbHz1KQb3-1huWeoaHwkszS2ki31p1qD69a22Lzw';

	var htmlTemplate = `
		<div class="unsplash-background">
		<div class="unsplash-attribution">
			Photo by
			<a href="https://unsplash.com/@{0}?utm_source=minimalist-speed-dial&utm_medium=referral">{1}</a>&nbsp;
			on&nbsp;
			<a href="https://unsplash.com/?utm_source=minimalist-speed-dial&utm_medium=referral">Unsplash</a>
		</div>
	`;

	var cssTemplate = `
		<style>
			.unsplash-background {
				height: 100vh;
				width: 100vw;
				background: #111 url("{0}") no-repeat center;
				background-size: cover;
			}
			.unsplash-attribution {
				position: fixed;
				left: 20px;
				bottom: 20px;
				padding: 6px 12px;
				border-radius: 5px;
				transition: 0.3s ease;
			}
			.unsplash-attribution a {
				color: #aaa;
				font-weight: bold;
			}
			.unsplash-attribution:hover {
				background-color: rgba(128, 128, 128, .4);
			}
		</style>
	`;

	function createBackground(container) {

		getCachedBackground(function (response) {
			if (response) {
				container.innerHTML = String.format(htmlTemplate, response.user.username, response.user.name);
				document.head.insertAdjacentHTML('beforeend', String.format(cssTemplate, response.urls.regular));

			} else {
				getRandom(function (response) {
					setCachedBackground(response);

					container.innerHTML = String.format(htmlTemplate, response.user.username, response.user.name);
					document.head.insertAdjacentHTML('beforeend', String.format(cssTemplate, response.urls.regular));
				});
			}
		});
	}

	function getCachedBackground(callback) {
		chrome.storage.local.get('unsplash', function (cache) {
			if (cache && cache.unsplash && new Date().getTime() - cache.unsplash.date < 3 * 60 * 60 * 1000) {
				callback(cache.unsplash.data);
				return;
			}

			callback(null);
		});
	}
	function setCachedBackground(data) {
		chrome.storage.local.set({ 'unsplash': {
			'data': data,
			'date': new Date().getTime()
		} });
	}

	function getRandom(callback) {
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", function () {
			var response = JSON.parse(xhr.responseText);
			callback(response);
		});

		xhr.open("GET", URL);
		xhr.send();
	}

	function test(container) {
		var response = { "id": "cZvYhxgQvmw", "created_at": "2021-01-28T13:45:59-05:00", "updated_at": "2021-01-29T19:22:56-05:00", "promoted_at": null, "width": 3000, "height": 2000, "color": "#260c0c", "blur_hash": "L87m:JnLR#o~tTWCR$n%0ckEohRi", "description": null, "alt_description": "black sedan on road during night time", "urls": { "raw": "https://images.unsplash.com/photo-1611859555759-e33d429e0a33?ixid=MXwyMDE4NzZ8MHwxfHJhbmRvbXx8fHx8fHx8\u0026ixlib=rb-1.2.1", "full": "https://images.unsplash.com/photo-1611859555759-e33d429e0a33?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=MXwyMDE4NzZ8MHwxfHJhbmRvbXx8fHx8fHx8\u0026ixlib=rb-1.2.1\u0026q=85", "regular": "https://images.unsplash.com/photo-1611859555759-e33d429e0a33?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MXwyMDE4NzZ8MHwxfHJhbmRvbXx8fHx8fHx8\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080", "small": "https://images.unsplash.com/photo-1611859555759-e33d429e0a33?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MXwyMDE4NzZ8MHwxfHJhbmRvbXx8fHx8fHx8\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=400", "thumb": "https://images.unsplash.com/photo-1611859555759-e33d429e0a33?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MXwyMDE4NzZ8MHwxfHJhbmRvbXx8fHx8fHx8\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=200" }, "links": { "self": "https://api.unsplash.com/photos/cZvYhxgQvmw", "html": "https://unsplash.com/photos/cZvYhxgQvmw", "download": "https://unsplash.com/photos/cZvYhxgQvmw/download", "download_location": "https://api.unsplash.com/photos/cZvYhxgQvmw/download" }, "categories": [], "likes": 1, "liked_by_user": false, "current_user_collections": [], "sponsorship": null, "user": { "id": "ZEncYNLc9bE", "updated_at": "2021-01-29T23:00:50-05:00", "username": "5tep5", "name": "Alexander Popov", "first_name": "Alexander", "last_name": "Popov", "twitter_username": "5tep5", "portfolio_url": "http://5tep5.com/", "bio": "Moscow Street Photography (for contact: 5tep5.com/info)", "location": "Moscow", "links": { "self": "https://api.unsplash.com/users/5tep5", "html": "https://unsplash.com/@5tep5", "photos": "https://api.unsplash.com/users/5tep5/photos", "likes": "https://api.unsplash.com/users/5tep5/likes", "portfolio": "https://api.unsplash.com/users/5tep5/portfolio", "following": "https://api.unsplash.com/users/5tep5/following", "followers": "https://api.unsplash.com/users/5tep5/followers" }, "profile_image": { "small": "https://images.unsplash.com/profile-fb-1502611037-1478664905d8.jpg?ixlib=rb-1.2.1\u0026q=80\u0026fm=jpg\u0026crop=faces\u0026cs=tinysrgb\u0026fit=crop\u0026h=32\u0026w=32", "medium": "https://images.unsplash.com/profile-fb-1502611037-1478664905d8.jpg?ixlib=rb-1.2.1\u0026q=80\u0026fm=jpg\u0026crop=faces\u0026cs=tinysrgb\u0026fit=crop\u0026h=64\u0026w=64", "large": "https://images.unsplash.com/profile-fb-1502611037-1478664905d8.jpg?ixlib=rb-1.2.1\u0026q=80\u0026fm=jpg\u0026crop=faces\u0026cs=tinysrgb\u0026fit=crop\u0026h=128\u0026w=128" }, "instagram_username": "573p5", "total_collections": 0, "total_likes": 32, "total_photos": 176, "accepted_tos": true }, "exif": { "make": "Canon", "model": "Canon EOS 5D Mark III", "exposure_time": "1/60", "aperture": "4", "focal_length": "40.0", "iso": 3200 }, "location": { "title": "Moscow, Москва, Россия", "name": "Moscow, Москва, Россия", "city": null, "country": "Россия", "position": { "latitude": 55.546495, "longitude": 37.292627 } }, "views": 1285, "downloads": 18 };
		container.innerHTML = String.format(htmlTemplate, response.user.username, response.user.name);
		document.head.insertAdjacentHTML('beforeend', String.format(cssTemplate, response.urls.regular));
	}

	return {
		createBackground: createBackground
	};

})();