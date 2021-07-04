


$("#autoMessagingForm").on("submit", function () {

	chrome.storage.local.set({ popupSettings2: $(this).serializeArray() });



	var time = $("#timeBwPages").val();

	var note = $("#personalNote").val();

	var o = { time: time, note: note, pause: false, activate: true };
	chrome.storage.local.set({ settings2: o }, function () {

		chrome.tabs.executeScript(null, { code: "var popup = true;" }, function () {

			chrome.tabs.executeScript(null, { file: "js/jquery.min.js" }, function () {
				chrome.tabs.executeScript(null, { file: "js/automessaging.js" }, function () {
					window.top.close();
				})

			})
		})

	});
})



$(document).ready(function () {
	chrome.storage.local.get("popupSettings2", function (d) {
		var x = d.popupSettings2;

		$.each(x, function (z, y) {
			$("*[name='" + y.name + "']").val(y.value);
		})
	})

	chrome.storage.local.get("settings2", function (x) {
		var d = x.settings2;
		if (d.pause == false && d.activate == true) {

			$("#pauseOperation").show();
			$("#startAutoBB").hide();
		}
	})

	updateCounter();

	function updateCounter() {
		chrome.storage.local.get("counterMessaging", function (xx) {
			var d = xx.counterMessaging;
			var c = 0;
			if (d) {
				c = d;
			}

			$("#counterMessagingCount").text(c);
		})
	}

	setInterval(updateCounter, 1000);

})


$("#pauseOperation").on("click", function () {
	chrome.storage.local.get("settings2", function (x) {
		var d = x.settings2;
		d.pause = true;
		chrome.storage.local.set({ settings2: d }, function () {
			chrome.tabs.executeScript({ code: "window.location.reload()" });
			window.location.reload();
		})
	})
})