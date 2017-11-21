// stores application consts, obviously
//
var Const = {
	// {0} maps to URL, {1} maps to name
	speedDialItemTemplate: `
		<a href="{1}" class="row" draggable="false">
			<div class="row" view-mode>
				<div class="column column-1 favicon">
					<img src="http://www.google.com/s2/favicons?domain={1}" width="18" />
				</div>

				<div class="column column-9">
					<div class="column speed-dial-item-name">
						<p>{0}</p>
					</div>

					<div class="column speed-dial-item-url hide">
						<p title="{1}">{2}</p>
					</div>
				</div>
				<div class="column column-1">
					<button class="center-horizontal ripple circle alpha-button hide" button-secondary title="Edit Item">
						<img src="../images/edit-icon.png" width="14" />
					</button>
				</div>

				<div class="column column-1">
					<button class="center-horizontal ripple circle alpha-button hide" button-primary title="Remove Item">
						<img src="../images/trash-icon.png" width="14" />
					</button>
				</div>
			</div>

			<div class="row" edit-mode>
				<div class="column column-1 favicon">
					<img src="../images/speed-dial-icon-16.png" width="18" />
				</div>
				<div class="column column-9 edit-mode">
					<div class="column column-6 site-name">
						<div class="group">
							<input id="input-site-name" type="text" value="{0}" required>
							<span class="bar"></span>
							<label>Name</label>
						</div>
					</div>
					<div class="column column-6 site-url">
						<div class="group">
							<input id="input-site-url" type="text" value="{1}" required>
							<span class="bar"></span>
							<label>URL</label>
						</div>
					</div>
				</div>

				<div class="column column-1">
					<button class="center-horizontal ripple circle alpha-button" button-secondary title="Cancel">
						<img src="../images/close-icon.png" width="14" />
					</button>
				</div>

				<div class="column column-1">
					<button class="center-horizontal ripple circle alpha-button" button-primary title="Accept">
						<img src="../images/accept-icon.png" width="14" />
					</button>
				</div>
			</div>
		</a>
	`,
	MAX_URL_LENGTH: 40,
	GOOGLE_FAVICON_API: 'http://www.google.com/s2/favicons?domain=',
	DEBUG: false // enables/disables extension-wide logging
};