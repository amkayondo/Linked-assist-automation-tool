
function saveToFile(fileName, content) {

	var a = window.document.createElement('a');
	a.href = window.URL.createObjectURL(new Blob([content], { type: 'text/csv' }));
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	console.log(content)
}

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {

	if (request.msg == "displaydata") {
		console.log(request.data)
		var currentdata = request.data;

		var strcsv = "";
		for (var datacounter = 0; datacounter < currentdata.length; datacounter++) {
			for (var datacounter2 = 0; datacounter2 < currentdata[datacounter].length; datacounter2++) {
				if (datacounter2 == 0) {
					strcsv += currentdata[datacounter][datacounter2].trim();
				}
				else {
					strcsv += "," + currentdata[datacounter][datacounter2].trim();
				}

			}
			if (datacounter != currentdata.length - 1) {
				strcsv += "\n"
			}
		}
		saveToFile('download.csv', strcsv);
	}

	if (request.msg == "createTab") {
		console.log(request.url)
		chrome.tabs.create({ url: request.url, active: true });
	}

	if (request.msg == "removeTab") {

		chrome.tabs.remove(sender.tab.id);
	}


	if (request.msg == "deduct") {
		var feature = request.feature;

		$.ajax({
			method: "post",
			url: localStorage.website,
			data: {
				feature: feature,
				deduct: true,
				email: localStorage.email
			},
			success: function (r) {
				//alert(r);
			}
		})
	}

	if (request.msg == "updateUsername") {
		var username = request.username;

		$.ajax({
			method: "post",
			url: localStorage.website,
			data: {
				username: username,
				updateUsername: true,
				email: localStorage.email
			},
			success: function (r) {
				r = JSON.parse(r);

				chrome.storage.local.set({ user: r });
			}
		})
	}
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == "loading") {

		if (tab.url.match(/https\:\/\/www.linkedin.com\/dms\//gi)) {
			chrome.tabs.remove(tabId);
		}
	}
});
