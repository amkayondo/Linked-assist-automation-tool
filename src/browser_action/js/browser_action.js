// var url = "http://localhost/APP/master.php";
var url = "https://www.linked-assist.com/master.php";
var user;
var currentUrl = "";


localStorage.website = url;


function ddone() {
	$.ajax({
		method: "post",
		url: url,
		data: {
			ddone: true,
			email: localStorage.email
		},
		success: function () {
			window.close();
		}
	})
}


chrome.tabs.getSelected(null, function (tab) {
	currentUrl = tab.url;
});


$(document).ready(function () {
	chrome.storage.local.get("popupSettings", function (d) {
		var x = d.popupSettings;
		if (typeof x != "undefined") {
			$.each(x, function (z, y) {
				$("input[name='" + y.name + "']").val(y.value);
			})
			$("#timeBwPages").val("");
			$("#numOfPages").val("");
		}
	})
})


$("#pauseOperation").on("click", function () {
	chrome.storage.local.get("settings", function (x) {
		var d = x.settings;
		if (typeof d != "undefined") {
			d.pause = true;
			localStorage.removeItem("endorseTobePerformCount");
			chrome.storage.local.set({ settings: d }, function () {
				chrome.tabs.executeScript({ code: "makeCsvFile();window.location.reload()" });
				window.location.reload();
			})
		}
	})
})



var app = angular.module("myapp", []);


app.controller("ctrl", function ($scope, $http, $q, $filter) {

	var s = $scope;

	$scope.creditNum = 30;
	$scope.process = "no";

	$("#amount").on("change", function () {
		var v = $(this).val();
		$scope.creditNum = $("#amount option[value='" + v + "']").attr("c");
	})


	$scope.checkProcess = function () {
		chrome.storage.local.get("settings", function (x) {
			var d = x.settings;
			if (typeof d != "undefined") {
				if (d && d.pause == false) {
					$scope.$apply(function () {
						$scope.process = "yes";

					})
				} else {
					$scope.$apply(function () {
						$scope.process = "no";
					})
				}
			}
		})
	}

	$scope.checkProcess();

	setInterval($scope.checkProcess, 1000);

	$scope.toast = function (msg, c) {

		$("<div id='snackbar' style='background-color:" + c + "'>" + msg + "</div>").appendTo("body");

		var ss = setInterval(function () {
			clearInterval(ss);

			$("body")[0].removeChild($("#snackbar")[0]);

		}, 3000);

	}



	$scope.ajax = function (d) {
		var deferred = $q.defer();

		$http({
			method: "POST",
			url: url,
			data: d,
			headers: { "content-type": "application/x-www-form-urlencoded" }
		}).then(function (r) {
			deferred.resolve(r.data);
		})
		return deferred.promise;
	}


	$scope.check = function () {

		var secret = localStorage.secret;

		if (secret) {

			var d = $.param({
				login: "true",
				secret: secret
			})




			s.ajax(d).then(function (r) {

				if (r.email) {
					$("#section_2").show();
					$scope.u = r;

					user = r;
					chrome.storage.local.set({ user: r });
					$scope.msg_sig = $scope.u.signature;
					$scope.u.cCredits = r.credit;
				}
				else {


					localStorage.secret = "";
					localStorage.email = "";
					localStorage.pass = "";


					window.location.reload();


				}
			})
		}
		else {
			$("#section_1").show();
		}
	}

	$scope.check();

	$scope.validateLicense = function (e) {

		var d = $.param({
			login: true,
			secret: $scope.license_key
		})

		s.ajax(d).then(function (r) {

			if (r.status == "error") {

				s.toast("Invalid License Key", "red");
			}
			else {

				localStorage.secret = r.secret;
				localStorage.email = r.email;
				localStorage.pass = r.password;
				localStorage.user_id = r.id;

				window.location.reload();
			}
		})


	}





	$scope.login_register = function (e) {
		e = e.currentTarget;
		var d = $(e).serialize();
		s.ajax(d).then(function (r) {
			//alert(JSON.stringify(r));
			console.log(r);
			if (r.status == "error") {

				s.toast(r.reason, "red");
			}
			else {

				localStorage.email = r.email;
				localStorage.user_id = r.id;
				localStorage.pass = r.password;
				localStorage.secret = r.secret;
				window.location.reload();
			}
		})


	}

	$scope.forgetPassword = function () {
		var o = $.param({
			forgotPassword: true,
			email: $scope.p.email,

		});

		s.ajax(o).then(function (d) {
			if (d.status == "success") {
				$scope.toast(d.reason, "green");
			}
			else {
				$scope.toast(d.reason, "red");
			}

		})
	}

	$scope.logout = function () {
		localStorage.secret = "";

		window.location.reload();
	}

	$scope.updateCounter = function () {
		chrome.storage.local.get("counterConnection", function (xx) {
			var d = xx.counterConnection;
			if (typeof d != "undefined") {
				var c = 0;
				if (d) {

					c = d;
				}

				$("#counterConnectionCount").text(c);
			}
		})

		chrome.storage.local.get("settings", function (x) {
			var s = x.settings;
			if (typeof s != "undefined") {
				if (s.pause == true) {

					$("#pauseOperation").hide();
					$("#startAutoBB").show();

				}
				else {

				}
			}
		})


	}


	$scope.addMsg = function () {
		var msg_name = $scope.msg_name;
		var msg_text = $scope.msg_text;
		var text = "Message Added.";
		var id = new Date().getTime();

		if ($scope.editMsgb) {
			$scope.u.messages = $scope.u.messages.filter(function (x, y) {
				return x.id != $scope.editMsgb;
			})
			text = "Message Updated.";
			id = $scope.editMsgb;
		}

		$scope.u.messages.push({ id: id, msg_name: msg_name, msg_text: msg_text });


		var o = $.param({
			messages: JSON.stringify($scope.u.messages),
			addMessages: true,
			email: localStorage.email
		})

		s.ajax(o).then(function (d) {
			if (d.status == "success") {
				$scope.msg_name = $scope.msg_text = "";
				$scope.editMsgb = false;

				$scope.toast(text, "green");



			}
		})

	}


	$scope.addSig = function () {
		var msg_text = $scope.msg_sig;

		var o = $.param({
			signature: msg_text,
			addSignature: true,
			email: localStorage.email
		})

		s.ajax(o).then(function (d) {
			if (d.status == "success") {
				$scope.toast("Signature Message Added.", "green");
			}
		})
	}

	$scope.updateCounter();

	setInterval($scope.updateCounter, 1000);

	$scope.editMsg = function (id) {

		var s = $scope.u.messages.filter(function (x, y) {
			return x.id == id;
		})
		s = s[0];
		$scope.msg_text = s.msg_text;
		$scope.msg_name = s.msg_name;
		$scope.editMsgb = s.id;
		window.scrollTo(window, -1000)

	}


	$scope.deleteMsg = function (id) {

		$scope.u.messages = $scope.u.messages.filter(function (x, y) {
			return x.id != id;
		})


		var o = $.param({
			messages: JSON.stringify($scope.u.messages),
			addMessages: true,
			email: localStorage.email
		})

		s.ajax(o).then(function (d) {
			if (d.status == "success") {
				//	$scope.msg_name = $scope.msg_text = "";
				$scope.toast("Message Deleted.", "green");



			}
		})
	}


	$scope.changeLanguage = function (l) {

		localStorage.language = l;
		$scope.checkLanguage();
	}

	$scope.checkLanguage = function () {
		var l = localStorage.language;
		$scope.l = l;

		if (l == "english" && window.location.href.match(/browser_action\.html/gi)) {
			window.location.href = "browser_action_english.html";
		} else
			if (l == "german" && window.location.href.match(/browser_action_english\.html/gi)) {
				window.location.href = "browser_action.html";
			}

	}


	$scope.checkLanguage();



	chrome.storage.local.get("settings", function (x) {
		var d = x.settings;
		if (typeof d != "undefined") {
			if (d.pause == false) {
				$scope.$apply(function () {
					$scope.settings = d;
					$scope.feature = d.feature;
					$scope.messages_select = localStorage.messages_select;

				})
				$("#pauseOperation").show();
				$("#startAutoBB").hide();
			}
		}
	})



	$("#autoConnectionForm").on("submit", function () {


		if (currentUrl.match(/linkedin.com\/search\/results/gi) || currentUrl.match(/linkedin.com\/groups\//gi) || currentUrl.match(/linkedin.com\/feed\/update/gi) || currentUrl.match(/linkedin.com\/company\/.*\/admin\/analytics\/followers\/\?anchor=org-view-followers/gi)) {

			chrome.storage.local.set({ popupSettings: $(this).serializeArray() });

			localStorage.messages_select = $scope.messages_select;

			var time = $("#timeBwPages").val();
			var num = $("#numOfPages").val();
			var note = $("#personalNote").val();
			var feature = $("#features").val();
			var custom = $("#custom").val() || "";

			if (typeof num == "undefined") {
				num = 0;
			}

			/*
			var lm = parseInt(user.limits[feature]);
		    
			if(lm<num || lm<1){
				$scope.$apply(function(){
					$scope.toast("Daily Limit Exceed. Come Tomorrow.","red");
				})
			 } else { */
			var o = { time: time, num: num, note: note, pause: false, feature: feature, custom: custom };

			chrome.storage.local.set({ settings: o }, function () {
				chrome.storage.local.set({ counterConnection: 0 });

				chrome.tabs.executeScript(null, { code: "var popup = true;" }, function () {

					chrome.tabs.executeScript(null, { file: "js/jquery.min.js" }, function () {
						chrome.tabs.executeScript(null, { file: "js/autoconnection.js" }, function () {
							window.location.reload();
							window.top.close();
						})
					})
				})
			});
		} else {
			$scope.$apply(function () {
				$scope.toast("You are in a wrong Page.", "red");
			})
		}
	})
})



$("#myfile").on("change", function () {
	var file = document.getElementById("myfile").files[0];
	var reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function (e) {

		var data = e.target.result;

		var d = new Array();
		d = data.split("\n");

		var dd = new Array();

		$(d).each(function (i, j) {
			var n = j.split(",");
			dd.push(n);
		})

		chrome.storage.local.set({ downloadedCsv: dd });
	}
})