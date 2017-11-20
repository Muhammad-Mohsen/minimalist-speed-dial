//
// background script
//
// browserAction click handler
chrome.browserAction.onClicked.addListener(function (activeTab) {
	chrome.tabs.update({
		url: 'chrome://newtab'
	});
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === 'apps') {
		chrome.tabs.update({
			url: 'chrome://apps'
		});
	}
});