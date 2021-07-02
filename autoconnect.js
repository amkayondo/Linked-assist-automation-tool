const autoD = 1;
const autoD2 = 0;
const count = 1;
const countImme = true;
const delete_requests = [];
const st1;
const user;
const ccf = true;
const skipCountrer = false;

//
const _data = [];
const _counter = null;
const _is_have_iframe = false;
const _iframe = null;


const _class = ".entity-result__actions button";


const dr1 = localStorage.delete_requests;

if (typeof dr1 != "undefined" && dr1 != "") {
    try {
        delete_requests = JSON.parse(dr1);
    } catch (e) {

    }
}

chrome.storage.local.get("user", function(us) {
    user = us.user;
})


function checkcurrentnext() {
    if (s.feature == 1 && $(_class)
        .length) {

        for (icounter = i; icounter < $(_class)
            .length; icounter++) {
            const btn_text_temp = $(_class)
                .eq(icounter)
                .text()
                .trim();
            if (btn_text_temp.match(/connect|vernetzen/gi)) {
                i = icounter;
                is_current_available = 1;
                break;
            }

        }

        for (icounter = i; icounter < $(_class)
            .length; icounter++) {
            const btn_text_temp = $(_class)
                .eq(icounter)
                .text()
                .trim();
            if (btn_text_temp.match(/connect|vernetzen/gi)) {
                is_next_available = icounter;

            }

        }
        if (is_next_available > i) {
            is_next_available = 1;
        } else {
            is_next_available = 0;
        }
    }





    if (s.feature == 2 && $(_class)
        .length) {

        for (icounter = i; icounter < $(_class)
            .length; icounter++) {
            if ($(_class)
                .eq(icounter)
                .text()
                .match(/Message|Nachricht/gi)) {
                i = icounter;
                is_current_available = 1;
                break;
            }

        }

        for (icounter = i; icounter < $(_class)
            .length; icounter++) {
            if ($(_class)
                .eq(icounter)
                .text()
                .match(/Message|Nachricht/gi)) {
                is_next_available = icounter;
            }

        }
        if (is_next_available > i) {
            is_next_available = 1;
        } else {
            is_next_available = 0;
        }
    }


    if (s.feature == 3 && $(_class)
        .length) {

        if (i < $(_class)
            .length) {
            is_current_available = 1;
            is_next_available = $(_class)
                .length - 1;
            if (is_next_available > i) {
                is_next_available = 1;
            } else {
                is_next_available = 0;
            }
        }
    }
}

const is_current_available = 0;
const is_next_available = 0;

function autoConnection() {
    countImme = false;
    is_current_available = 0;
    is_next_available = 0;

    if (s.pause == false) {
        window.scrollTo(0, (document.body.scrollHeight / 2) + 100);


        if (s.feature != 3) {
            setTimeout(() => {
                checkcurrentnext()
                try {
                    if (s.feature == 13) {
                        const dl = JSON.parse(localStorage.data);
                        const pp = $(".message-anywhere-button")
                            .not("[lac='true']")
                            .eq(0)
                            .closest(".groups-members-list__typeahead-result")
                            .eq(0);
                        const url = "https://www.linkedin.com" + pp[0].getElementsByTagName("a")[0].getAttribute("href");
                        const username = pp[0].getElementsByTagName("a")[0].getAttribute("href")
                            .replace(/\/in\/|\//gi, "");

                        const fullname = pp.find(".artdeco-entity-lockup__title")
                            .text()
                            .trim();

                        var fname = fullname.split(" ")[0];
                        var lname = fullname.split(" ")[1];
                        var title = pp.find(".artdeco-entity-lockup__subtitle")
                            .text()
                            .trim();

                        dl.push([url, fname, lname, title]);
                        localStorage.data = JSON.stringify(dl);
                    } else {
                        if ((s.feature != 1) || (is_current_available == 1)) {
                            var dl = JSON.parse(localStorage.data);
                            var pp = $(".search-result.search-result__occluded-item")
                                .eq(i);
                            var url = "https://www.linkedin.com" + pp[0].getElementsByTagName("a")[0].getAttribute("href");
                            var username = pp[0].getElementsByTagName("a")[0].getAttribute("href")
                                .replace(/\/in\/|\//gi, "");

                            var fullname = pp.find(".actor-name")
                                .text();

                            var fname = fullname.split(" ")[0];
                            var lname = fullname.split(" ")[1];
                            var title = pp.find(".subline-level-1")
                                .text();

                            dl.push([url, fname, lname, title]);
                            localStorage.data = JSON.stringify(dl);
                        }
                    }


                } catch (e) {}
            }, 3000)

        }

        if (!window.location.href.match(/lacontrol=endrose/gi)) {
            console.log('here')
            chrome.storage.local.get("counterConnection", function(x) {
                var d = x.counterConnection;
                if (d && !skipCountrer) {
                    count = d + 1;
                }

                // Auto message in company followers
                if (s.feature == 14) {
                    let see_all_followers = document.querySelector(".org-view-page-followers-module__modal-button");
                    let modal = document.querySelector(".org-view-page-followers-modal");

                    function send_message() {
                        console.log("SEND MESSAGE CALLED");
                        setTimeout(() => {
                            try {

                                $("*[data-control-name='overlay.close_conversation_window']", _iframe.contentWindow.document)
                                    .each(function() {
                                        $(this)
                                            .trigger("click");
                                    })

                                setTimeout(() => {
                                    $(".message-anywhere-button", _iframe.contentWindow.document)[0].click();

                                    setTimeout(function() {
                                        try {



                                            var name = _iframe.contentWindow.document.querySelector(".pv-top-card--list .t-24")
                                                .innerText.split(" ")[0];
                                            var n = s.note;
                                            n = n.replace(/\[+firstname+\]/g, name);

                                            var t = $(".msg-overlay-conversation-bubble", _iframe.contentWindow.document)
                                                .not(".msg-overlay-conversation-bubble--is-minimized");

                                            if (t.prevObject[0].innerText.indexOf(n) === -1) {
                                                //var textarea = t.find("textarea[name='message']");
                                                var textarea = t.find(".msg-form__contenteditable p");

                                                textarea.text(n);
                                                var event = new Event('input', {
                                                    'bubbles': true,
                                                    'cancelable': true
                                                });

                                                if (textarea.length) {
                                                    textarea[0].dispatchEvent(event);
                                                    setTimeout(function() {

                                                        t.find('.msg-form__send-button')
                                                            .attr("disabled", false);
                                                        t.find('.msg-form__send-button')
                                                            .trigger("click");

                                                        setTimeout(function() {
                                                            try {
                                                                t.find(".artdeco-modal__dismiss")
                                                                    .click();
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                            t.find("li-icon[type='cancel-icon']")
                                                                .parent()
                                                                .click();
                                                            deduct();
                                                        }, 700);
                                                    }, 500);
                                                }
                                            } else {
                                                t.find("li-icon[type='cancel-icon']")
                                                    .parent()
                                                    .click();
                                            }
                                        } catch (error) {
                                            console.log(error);
                                        }

                                    }, 1000);
                                }, 1000);


                            } catch (error) {
                                console.log(error);
                            }
                        }, 1000);
                        //send message on profile page

                    }

                    function create_iframe() {
                        let iframe = document.createElement("iframe");
                        iframe.id = "gzk";
                        iframe.style.classList = "auto-message";
                        iframe.style.width = "100vw";
                        iframe.style.height = "100vh";
                        iframe.style.position = "absolute";
                        iframe.style.top = "0px";
                        iframe.style.left = "0px";
                        iframe.style.zIndex = "99";
                        iframe.style.overflow = "hidden";
                        return iframe;
                    }
                    console.log(_is_have_iframe, _data, _counter);
                    if (_is_have_iframe == false) {


                        if (document.body.contains(see_all_followers)) {

                            if (modal === null) {
                                see_all_followers.click();
                            }

                            setTimeout(() => {
                                var data = JSON.parse(localStorage.data);
                                let followers = document.querySelectorAll("#artdeco-modal-outlet .org-view-page-followers-modal__table-cell .artdeco-entity-lockup");
                                let num = parseInt(s.num);

                                for (var i = 0; i < followers.length; i++) {
                                    let link = followers[i].parentElement.href;
                                    let f_name = followers[i].querySelector(".artdeco-entity-lockup__title")
                                        .innerText.split(" ");
                                    let title = followers[i].querySelector(".artdeco-entity-lockup__caption")
                                        .innerText;
                                    let name = f_name[0];
                                    f_name.shift();
                                    let surname = f_name.toString()
                                        .replaceAll(",", " ");
                                    data.push([link, name, surname, title]);
                                    console.log([link, name, surname, title]);
                                    if (i + 1 == num) {
                                        break;
                                    }
                                }
                                _data = data;
                                localStorage.setItem("data", JSON.stringify(data));
                                _data.shift();
                                _is_have_iframe = true;
                                _counter = parseInt(num) - 1;

                                var l = document.querySelectorAll('body *:not(#assist)');
                                l.forEach((item) => {
                                    item.remove();
                                });

                                _iframe = create_iframe();
                                document.body.append(_iframe);

                                _iframe.addEventListener("load", () => {
                                    console.log(_counter);
                                    send_message();
                                    if (_counter <= 0) {
                                        s.pause = true;
                                    } else {
                                        _counter--;
                                    }
                                });

                                console.log("URL : " + _data[_counter][0]);
                                _iframe.src = _data[_counter][0];

                            }, 1000);

                        }
                    } else if (_is_have_iframe) {
                        console.log("URL : " + _data[_counter][0]);
                        _iframe.src = _data[_counter][0];
                    }

                }


                if (s.feature == 3) {
                    console.log('feature = 3')
                    setTimeout(() => {
                        console.log(localStorage);
                        let currentCounter = parseInt(localStorage.getItem("endorseTobePerformCount"));
                        let endorseDoneCount = parseInt(s.num) - currentCounter;
                        chrome.storage.local.set({
                            counterConnection: endorseDoneCount
                        }, function() {});

                        const isnextpage = 0;
                        if ($(".artdeco-pagination__button--next:not(:disabled)")
                            .length) {
                            console.log('next page is there.......')
                            isnextpage = 1;
                        }
                        if ((currentCounter <= 0) || ((is_next_available == 0) && (isnextpage == 0))) {
                            interval = null;
                            clearInterval(interval);
                            localStorage.removeItem("endorseTobePerformCount");
                            s.pause = true;
                            try {
                                if (localStorage.data != "") {
                                    // alert(1)
                                    makeCsvFile();

                                } else {
                                    window.location.reload();
                                }
                            } catch (e) {
                                setTimeout(function(e) {
                                    window.location.reload();
                                }, 2000);
                            }
                            chrome.storage.local.set({
                                settings: s
                            });
                        }
                    }, 10000)


                } else {
                    if ((s.feature == 1) || (s.feature == 2) || (s.feature == 3)) {
                        setTimeout(() => {

                            const isnextpage = 0;
                            if ($(".artdeco-pagination__button--next:not(:disabled)")
                                .length) {
                                isnextpage = 1;
                            }
                            if ((s.num == count) || ((is_next_available == 0) && (isnextpage == 0))) {
                                interval = null;
                                clearInterval(interval);
                                s.pause = true;
                                try {
                                    if (localStorage.data != "") {
                                        // alert(2)
                                        makeCsvFile();

                                    } else {
                                        window.location.reload();
                                    }
                                } catch (e) {
                                    setTimeout(function(e) {
                                        //window.location.reload();
                                    }, 2000);
                                }
                                chrome.storage.local.set({
                                    settings: s
                                });
                            }
                        }, 10000)
                    } else {
                        setTimeout(() => {
                            if (s.num == count) {
                                console.log(count);
                                console.log(s);
                                interval = null;
                                clearInterval(interval);
                                s.pause = true;
                                try {
                                    if (localStorage.data != "") {
                                        // alert(3)
                                        makeCsvFile();

                                    } else {
                                        console.log("RELOAD");
                                        window.location.reload();
                                    }
                                } catch (e) {
                                    setTimeout(function(e) {
                                        //window.location.reload();
                                    }, 2000);
                                }
                                chrome.storage.local.set({
                                    settings: s
                                });
                            }
                        }, 10000)

                    }


                }
                if (s.feature != 3) {
                    chrome.storage.local.set({
                        counterConnection: count
                    }, function() {});
                }

            })


            setTimeout(() => {
                checkcurrentnext()

                // Auto Connection requests
                if (is_current_available == 1 && s.feature == 1 && $(_class)
                    .length) {

                    const btn_text = $(_class)
                        .eq(i)
                        .text()
                        .trim();
                    if (btn_text.match(/connect|vernetzen/gi)) {

                        chrome.storage.local.get("requests_data", function(r) {
                            const d = r.requests_data;
                            const uu = new Array();
                            if (typeof d != "undefined") {
                                uu = d;
                            }
                            uu.push({
                                username: username,
                                time: new Date()
                                    .getTime()
                            })
                            chrome.storage.local.set({
                                requests_data: uu
                            });
                        })
                    }







                    const umatch = delete_requests.filter(function(x, y) {
                        return x.username == username;
                    })
                    $("html")
                        .animate({
                            scrollTop: $(_class)
                                .eq(i)
                                .offset()
                                .top - 300
                        }, 1500, function() {
                            if (umatch.length == 0 && !btn_text.match(/Invite Sent|InMail|Einladung gesendet/gi)) {

                                $(_class)
                                    .eq(i)
                                    .trigger("click");

                                const name = $(_class)
                                    .eq(i)
                                    .parents(".entity-result")
                                    .find("span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a > span > span:nth-child(1)")
                                    .text();

                                const full_name = name.split(" ");;
                                name = name.split(" ")[0];

                                var profile_link = $(_class)
                                    .eq(i)
                                    .parents(".entity-result")
                                    .find("a.app-aware-link")
                                    .attr("href");

                                if (profile_link.indexOf("headless?origin=FACETED_SEARCH") !== -1) {
                                    profile_link = "hidden";
                                }

                                var title = $(_class)
                                    .eq(i)
                                    .parents(".entity-result")
                                    .find(".entity-result__primary-subtitle")
                                    .text();
                                const data = JSON.parse(localStorage.data);

                                full_name.shift();

                                const last_name = full_name.toString()
                                    .replaceAll(",", " ");

                                data.push([profile_link, name, last_name, title]);


                                localStorage.setItem("data", JSON.stringify(data));



                                //	$(".button-secondary-large").eq(0).trigger("click");
                                const n = s.note;
                                n = n.replace(/\[+firstname+\]/g, name);

                                setTimeout(() => {
                                    let modalDialog = $(".send-invite");
                                    if (!modalDialog.find($(".artdeco-button--secondary"))[0].hasAttribute("disabled")) {

                                        modalDialog.find($(".artdeco-button--secondary"))[0].click();
                                        setTimeout(() => {
                                            $("#custom-message")[0].value = n;
                                            const event = new Event('input', {
                                                'bubbles': true,
                                                'cancelable': true
                                            });

                                            $("#custom-message")[0].dispatchEvent(event);
                                            setTimeout(() => {

                                                modalDialog.find($(".artdeco-button--primary"))
                                                    .removeAttr("disabled");
                                                modalDialog.find($(".artdeco-button--primary"))
                                                    .click();
                                                console.log("");
                                                deduct();
                                            }, 1000)
                                        }, 1000)
                                    } else {
                                        modalDialog.find($(".artdeco-modal__dismiss"))
                                            .click();
                                        deduct();
                                    }
                                    $(_class)
                                        .eq(i)
                                        .text("Invite Sent");
                                    $(_class)
                                        .eq(i)
                                        .css({
                                            color: "grey",
                                            fontSize: "14px"
                                        });

                                }, 1000)
                            }
                        })



                }
            }, 3000)

            setTimeout(() => {
                checkcurrentnext()

                // Auto Messaging
                if (is_current_available == 1 && s.feature == 2 && $(_class)
                    .length) {

                    // if(count>=$(_class).length){
                    // 	interval=null;
                    // 	clearInterval(interval);
                    // 	s.pause = true;
                    // 	chrome.storage.local.set({settings:s});
                    // }


                    $("html")
                        .animate({
                            scrollTop: $(_class)
                                .eq(i)
                                .offset()
                                .top - 300
                        }, 1500, function() {
                            console.log($(_class)
                                .eq(i)
                                .text()
                                .match(/Message|Nachricht/gi));
                            if ($(_class)
                                .eq(i)
                                .text()
                                .match(/Message|Nachricht/gi)) {

                                $("*[data-control-name='overlay.close_conversation_window']")
                                    .each(function() {
                                        $(this)
                                            .trigger("click");
                                    })

                                $(_class)
                                    .eq(i)
                                    .trigger("click");

                                const t = $(".msg-overlay-conversation-bubble")
                                    .not(".msg-overlay-conversation-bubble--is-minimized");

                                const name = $(_class)
                                    .eq(i)
                                    .parents(".entity-result")
                                    .find("span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a > span > span:nth-child(1)")
                                    .text();
                                const full_name = name.split(" ");
                                name = name.split(" ")[0];



                                const profile_link = $(_class)
                                    .eq(i)
                                    .parents(".entity-result")
                                    .find("a.app-aware-link")
                                    .attr("href");


                                if (profile_link.indexOf("headless?origin=FACETED_SEARCH") !== -1) {
                                    profile_link = "hidden";
                                }

                                const title = $(_class)
                                    .eq(i)
                                    .parents(".entity-result")
                                    .find(".entity-result__primary-subtitle")
                                    .text();
                                const data = JSON.parse(localStorage.data);

                                full_name.shift();

                                const last_name = full_name.toString()
                                    .replaceAll(",", " ");

                                data.push([profile_link, name, last_name, title]);


                                localStorage.setItem("data", JSON.stringify(data));

                                const n = s.note;
                                n = n.replace(/\[+firstname+\]/g, name);

                                setTimeout(function() {
                                    try {
                                        const t = $(".msg-overlay-conversation-bubble")
                                            .not(".msg-overlay-conversation-bubble--is-minimized");

                                        if (t.prevObject[0].innerText.indexOf(n) === -1) {

                                            const ntext = n.replace(/\s+/g, ' ')
                                                .trim();
                                            //ntext = ntext.replace(/\?/gi,'\\?');

                                            ntext = escapeRegExp(ntext);
                                            const re = new RegExp(ntext, "gi");

                                            const ttext = t.text()
                                                .replace(/\s+/g, ' ')
                                                .trim();

                                            if (!ttext.match(re)) {

                                                t.find('.msg-form__contenteditable p')
                                                    .text(n);

                                                const event = new Event('input', {
                                                    'bubbles': true,
                                                    'cancelable': true
                                                });
                                                try {
                                                    t.find('.msg-form__contenteditable')[0].dispatchEvent(event);
                                                } catch (error) {
                                                    console.log(error);
                                                }

                                                setTimeout(function() {
                                                    try {
                                                        t.find('.msg-form__send-button')
                                                            .removeAttr("disabled");
                                                        t.find('.msg-form__send-button')[0].click();
                                                        //artdeco-modal__dismiss 
                                                        t.find(".artdeco-modal .artdeco-modal__dismiss")[0].click();

                                                        deduct();
                                                    } catch (error) {
                                                        console.log(error);
                                                    }

                                                }, 1000);
                                            }
                                        } else {
                                            t.find("li-icon[type='cancel-icon']")
                                                .parent()
                                                .click();
                                        }
                                    } catch (error) {

                                    }


                                }, 1000);
                                $(_class)
                                    .eq(i)
                                    .text("Sent");
                                $(_class)
                                    .eq(i)
                                    .css({
                                        color: "grey",
                                        fontSize: "14px"
                                    });
                            }
                        })
                }
            }, 3000)



            setTimeout(() => {
                checkcurrentnext()

                // Auto profile view and endorsment
                if (is_current_available == 1 && s.feature == 3 && $(_class)
                    .length) {
                    console.log(111111)

                    // var t = document.getElementsByClassName("search-result__occluded-item")[i]

                    // reusable-search__result-container 
                    console.log(i)

                    // var t = document.getElementsByClassName("reusable-search__result-container")[i]

                    const t = $(".reusable-search__result-container")
                        .eq(i);
                    console.log(t)
                    //var t = $(".search-result.search-result__occluded-item").eq(i)[0];debugger
                    if (typeof $(t)
                        .find("a.app-aware-link:eq(1)")
                        .attr('href') != 'undefined') {

                        skipCountrer = true;


                        try {

                            const dl = JSON.parse(localStorage.data);
                            // //var pp  = $(".search-result.search-result__occluded-item").eq(i);
                            // entity-result__title-text  t-16
                            const url = $(t)
                                .find("a.app-aware-link:eq(1)")
                                .addClass('tech44444444')
                                .attr('href')
                            console.log(url)
                            if (url.indexOf('headless') == -1) {
                                // 	console.log(url)


                                const username = url.replace(/\/in\/|\//gi, "");

                                const fullname = $(t)
                                    .find("a.app-aware-link:eq(1) span:eq(0)")
                                    .text();

                                const fname = fullname.split(" ")[0];
                                const lname = fullname.split(" ")[1];
                                const title = $(t)
                                    .find(".entity-result__primary-subtitle")
                                    .text();

                                dl.push([url, fname, lname, title]);
                                console.log(dl)

                                localStorage.data = JSON.stringify(dl);
                                console.log(localStorage)
                            }
                        } catch (e) {
                            console.log(e);
                            // alert("Error occured" + e);
                        }

                        const url = $(t)
                            .find("a.app-aware-link:eq(1)")
                            .addClass('tech44444444')
                            .attr('href') + "?lacontrol=endrose";

                        let currentCounter = parseInt(localStorage.getItem("endorseTobePerformCount"));
                        localStorage.setItem("endorseTobePerformCount", currentCounter - 1);
                        // if(i>0){
                        // 	setTimeout(function(){
                        // 		chrome.extension.sendMessage({msg:"createTab",'url':url});
                        // 		skipCountrer=false;
                        // 	},5000);

                        // }
                        // else{

                        // 	skipCountrer=false;
                        // }
                        skipCountrer = false;
                        if (url.indexOf('headless') == -1) {
                            chrome.extension.sendMessage({ /////meeeeeeeeee
                                msg: "createTab",
                                'url': url
                            });

                            $(_class)
                                .eq(i)
                                .text("Profile Viewed");
                            $(_class)
                                .eq(i)
                                .css({
                                    color: "grey",
                                    fontSize: "14px"
                                });

                        }

                    } else {
                        skipCountrer = false;
                    }



                }
            }, 3000)

            // Auto Profile Follow
            if (s.feature == 4 && $(_class)
                .length) {
                const t = $(".search-result.search-result__occluded-item")
                    .eq(i)[0];
                const url = "https://www.linkedin.com" + t.getElementsByTagName("a")[0].getAttribute("href");

                if ($("#linkedassist_iframe")
                    .length) {
                    $("#linkedassist_iframe")
                        .remove();
                }


                var d = document.createElement("iframe");
                d.id = "linkedassist_iframe";
                d.src = url;

                document.body.appendChild(d);
                // d.style.display="none";
                $(d)
                    .css({
                        width: "100%",
                        height: "400px",
                        visibility: "hidden"
                    })
                d.onload = function() {
                    const e = d.contentDocument;

                    setInterval(function() {
                        $(e)
                            .find("body")
                            .css("zoom", ".1");
                        $(e)
                            .find("body")
                            .scrollTop($(e)
                                .find("body")[0].scrollHeight + 300);

                        $(e)
                            .find('.pv-s-profile-actions__overflow-toggle.button-secondary-large-muted')
                            .eq(0)
                            .trigger("click");
                        $(e)
                            .find('.pv-s-profile-actions.pv-s-profile-actions--follow')
                            .eq(0)
                            .trigger("click");

                    }, 1);
                }


                $(_class)
                    .eq(i)
                    .text("Profile Followed");
                $(_class)
                    .eq(i)
                    .css({
                        color: "grey",
                        fontSize: "14px"
                    });
            }

            // Auto profile view on previous CSV
            if (s.feature == 6) {
                chrome.storage.local.get("downloadedCsv", function(e) {
                    const d = e.downloadedCsv;
                    console.log(d)
                    s.num = d.length;
                    d = d[autoD];
                    autoD++;


                    chrome.storage.local.set({
                        settings: s
                    });

                    if (d && typeof d != "undefined") {
                        i = 0;
                        localStorage.data = "";
                        $("#autoDiframe")
                            .remove();
                        $if = $("<iframe id='autoDiframe'></iframe");
                        $if.attr("src", d[0]);
                        $if.css({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 9999,
                            border: "none"
                        })

                        $("body")
                            .append($if);
                    } else {
                        s.pause = true;
                        chrome.storage.local.set({
                            settings: s
                        });
                        window.location.reload();
                    }
                })
            }

            // Message based on previous CSV
            if (s.feature == 8) {
                chrome.storage.local.get("downloadedCsv", function(e) {
                    var d = e.downloadedCsv;
                    s.num = d.length;
                    d = d[autoD];
                    autoD++;


                    chrome.storage.local.set({
                        settings: s
                    });

                    if (d && typeof d != "undefined") {
                        i = 0;
                        localStorage.data = "";
                        $("#autoDiframe")
                            .remove();
                        $if = $("<iframe id='autoDiframe'></iframe");
                        $if.attr("src", d[0]);
                        $if.css({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 9999,
                            border: "none"
                        })

                        $("body")
                            .append($if);

                        $if.on("load", function() {
                            $b = $if.contents();


                            const st11 = setInterval(function() {
                                const message_btn = $b.find(".pv-s-profile-actions.pv-s-profile-actions--message");
                                if (message_btn.length) {
                                    clearInterval(st11);
                                    //$b.find("button:contains('Message'):eq(0)").trigger("click");
                                    //$b.find("button:contains('Nachricht'):eq(0)").trigger("click");
                                    //console.log(message_btn[0]);

                                    message_btn[0].click();

                                    const name = d[1];

                                    setTimeout(function() {
                                        try {
                                            const n = s.note;
                                            n = n.replace(/\[+firstname+\]/g, name);

                                            const t = $b.find(".msg-overlay-conversation-bubble")
                                                .not(".msg-overlay-conversation-bubble--is-minimized");

                                            if (t.prevObject[0].innerText.indexOf(n) === -1) {
                                                //var textarea = t.find("textarea[name='message']");
                                                const textarea = t.find(".msg-form__contenteditable p");

                                                textarea.text(n);

                                                const event = new Event('input', {
                                                    'bubbles': true,
                                                    'cancelable': true
                                                });
                                                if (textarea.length) {
                                                    textarea[0].dispatchEvent(event);
                                                    setTimeout(function() {
                                                        t.find('.msg-form__send-button')
                                                            .attr("disabled", false);

                                                        t.find('.msg-form__send-button')
                                                            .trigger("click");
                                                        setTimeout(function() {
                                                            t.find(".artdeco-modal .artdeco-modal__dismiss")[0].click();
                                                            message_btn.remove();

                                                        }, 500);
                                                    }, 500);
                                                }
                                            } else {
                                                t.find("li-icon[type='cancel-icon']")
                                                    .parent()
                                                    .click();
                                            }
                                        } catch (error) {

                                        }

                                    }, 1000);
                                }
                            }, 50);
                        })
                    } else {
                        s.pause = true;
                        chrome.storage.local.set({
                            settings: s
                        });
                        window.location.reload();
                    }
                })
            }

            // Delete older requests
            if (s.feature == 7) {
                chrome.storage.local.get("requests_data", function(e) {
                    const d = e.requests_data;

                    //  chrome.storage.local.set({settings:s});			  

                    if (d && typeof d != "undefined") {
                        i = 0;
                        localStorage.data = "";

                        if (!$("#autoDiframe")
                            .length) {
                            $if = $("<iframe id='autoDiframe'></iframe");
                            $if.attr("src", "https://www.linkedin.com/mynetwork/invitation-manager/sent/");
                            $if.css({
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                zIndex: 999999,
                                border: "none"
                            })

                            $("body")
                                .append($if);
                        }
                        if ($if[0].contentDocument.readyState == "complete") {

                            const c = $if.contents()
                                .find(".mn-invitation-card.mn-person-card.mn-person-card--selectable.ember-view");

                            $(c)
                                .each(function() {
                                    const currentc = $(this);

                                    const username = currentc.find(".mn-person-info__picture.mn-person-info__picture--selectable")
                                        .attr("href")
                                        .replace(/\/in\/|\//gi, "");
                                    const ret = true;

                                    $.each(d, function(y, x) {
                                        if (x.username == username) {
                                            const time = x.time;
                                            const ntime = new Date()
                                                .getTime();

                                            const diff = ((((ntime - time) / 1000) / 60) / 60);
                                            //console.log(diff+" "+s.note);
                                            if (diff > s.note) {

                                                currentc.find(".mn-person-card__person-btn-ext.button-tertiary-medium-muted:eq(0)")
                                                    .trigger("click");

                                                const uu = new Array();
                                                const ld = localStorage.delete_requests;

                                                if (typeof ld != "undefined") {
                                                    try {
                                                        uu = JSON.parse(ld);
                                                    } catch (e) {

                                                    }
                                                }
                                                uu.push({
                                                    username: username,
                                                    time: new Date()
                                                        .getTime()
                                                })
                                                localStorage.delete_requests = JSON.stringify(uu);

                                                ret = false;
                                            }
                                        }
                                    })
                                    //return ret;
                                })
                            autoD++;
                        }
                    }
                })
            }

            // Add suggested connection
            if (s.feature == 9 && !window.location.href.match(/lacontrol=connection/gi)) {

                localStorage.data = "";

                $if = $("<iframe id='addSuggestedIframe'></iframe");
                $if.attr("src", "https://www.linkedin.com/mynetwork/");
                $if.css({
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 9999,
                    border: "none"
                })


                const addSuggested = function() {
                    $body = $("#addSuggestedIframe")
                        .contents();
                    $body.scrollTop(40000);

                    //var e = $body.find("button[data-control-name='invite']").not("[LA='true']");
                    const e = $body.find("a[data-control-name='pymk_profile']")
                        .not("[LA='true']")
                        .eq(i);

                    e.attr("LA", true);
                    //  e.eq(0).trigger("click");
                    if (e.length) {
                        const link = "https://www.linkedin.com" + e.attr("href") + "?lacontrol=connection";

                        chrome.storage.local.get("settings", function(set) {
                            s = set.settings;

                            if (s.pause) {
                                window.location.reload();
                            } else {
                                chrome.extension.sendMessage({
                                    msg: "createTab",
                                    url: link
                                });
                            }
                        })
                    }
                }


                if (!$("#addSuggestedIframe")
                    .length) {
                    $("body")
                        .append($if);
                } else {
                    addSuggested();
                }

                $if.on("load", function() {
                    addSuggested();
                })
            }

            // Connection to likers
            if (s.feature == 10) {
                localStorage.data = "";
                if (!window.location.href.match(/lacontrol=connection/gi)) {
                    if (!$('.feed-base-likers-modal.feed-base-likers-modal--artdeco-variant.feed-fe-modal')
                        .length) {
                        $("button[data-control-name='likes_count']")
                            .click();
                        const e = $(".feed-base-likers-modal__actor-list.actor-list");
                        setInterval(function() {
                            e.scrollTop(e[0].scrollHeight * 99999999999);
                        }, 1000);
                    }

                    const c = $(".actor-item")
                        .eq(i);

                    const link = "https://www.linkedin.com" + c.find("a:eq(0)")
                        .attr("href") + "?lacontrol=connection";

                    chrome.extension.sendMessage({
                        msg: "createTab",
                        url: link
                    });
                }
            }

            // Connection to commenters
            if (s.feature == 11) {
                localStorage.data = "";
                if (!window.location.href.match(/lacontrol=connection/gi)) {

                    const item = $('.feed-shared-comments-list__comment-item.feed-shared-comment-item')
                        .not("[lac='true']");
                    if (item.length) {

                        setInterval(function() {
                            if ($("#show_prev")
                                .length) {
                                $("#show_prev")
                                    .trigger("click");
                            }

                        }, 1000);


                        const c = item.eq(i)
                            .find("a:eq(0)");

                        if (c.length) {
                            c.attr("lac", true);
                            const link = "https://www.linkedin.com" + c.attr("href") + "?lacontrol=connection";

                            chrome.extension.sendMessage({
                                msg: "createTab",
                                url: link
                            });
                        }
                    }
                }
            }

            // Message to Group Members
            if (s.feature == 13) {

                //localStorage.data = "";
                chrome.storage.local.get("settings", function(se) {
                    s = se.settings;
                    if (s.pause == true) {
                        window.location.reload();
                    } else {
                        if (!window.location.href.match(/lacontrol=message/gi)) {



                            /*if ($(".members-text.members-link.js-members-count").length) {
                            	$(".members-text.members-link.js-members-count")[0].click();
                            }*/
                            if (!window.location.href.match(/members/gi)) {
                                if ($("a[href*='/members/']")
                                    .length) {
                                    $("a[href*='/members/']")[0].click();
                                }
                            }

                            //var item = $('.js-message-member.message-member').not("[lac='true']");
                            /*var item = $('.ui-entity-action-row__link').not("[lac='true']");
                            console.log(s);
                            if (item.length && s.pause == false) {

                            	var c = item.eq(0);

                            	if (c.length) {
                            		c.attr("lac", true);
                            		var link = c.prop("href") + "&lacontrol=message";

                            		chrome.extension.sendMessage({
                            			msg: "createTab",
                            			url: link
                            		});
                            	}
                            }*/



                            setTimeout(function() {
                                try {
                                    $("html")
                                        .animate({
                                            scrollTop: $(".message-anywhere-button")
                                                .not("[lac='true']")
                                                .eq(0)
                                                .offset()
                                                .top - 300
                                        }, 1500, function() {
                                            if ($(".message-anywhere-button")
                                                .not("[lac='true']")
                                                .eq(0)
                                                .text()
                                                .match(/Message|Nachricht/gi)) {

                                                $("*[data-control-name='overlay.close_conversation_window']")
                                                    .each(function() {
                                                        $(this)
                                                            .trigger("click");
                                                    })


                                                $(".message-anywhere-button")
                                                    .not("[lac='true']")
                                                    .eq(0)
                                                    .trigger("click");

                                                const t = $(".msg-overlay-conversation-bubble")
                                                    .not(".msg-overlay-conversation-bubble--is-minimized");
                                                const name = $(".message-anywhere-button")
                                                    .not("[lac='true']")
                                                    .eq(0)
                                                    .parents(".groups-members-list__typeahead-result")
                                                    .find(".artdeco-entity-lockup__title")
                                                    .text()
                                                    .trim();

                                                name = name.split(" ")[0];

                                                const n = s.note;
                                                n = n.replace("[firstname]", name);

                                                setTimeout(function() {

                                                    try {
                                                        const t = $(".msg-overlay-conversation-bubble")
                                                            .not(".msg-overlay-conversation-bubble--is-minimized");


                                                        if (t.prevObject[0].innerText.indexOf(n) === -1) {

                                                            const ntext = n.replace(/\s+/g, ' ')
                                                                .trim();
                                                            //ntext = ntext.replace(/\?/gi,'\\?');

                                                            ntext = escapeRegExp(ntext);
                                                            const re = new RegExp(ntext, "gi");


                                                            const ttext = t.text()
                                                                .replace(/\s+/g, ' ')
                                                                .trim();

                                                            if (!ttext.match(re)) {

                                                                t.find('.msg-form__contenteditable p')
                                                                    .text(n);

                                                                const event = new Event('input', {
                                                                    'bubbles': true,
                                                                    'cancelable': true
                                                                });

                                                                t.find('.msg-form__contenteditable')[0].dispatchEvent(event);
                                                                setTimeout(function() {
                                                                    t.find('.msg-form__send-button')
                                                                        .removeAttr("disabled");
                                                                    t.find('.msg-form__send-button')[0].click();


                                                                    t.find("*[data-control-name='overlay.close_conversation_window']")[0].click();
                                                                    const findCloseModal = setInterval(() => {

                                                                        if ($('.artdeco-modal__dismiss[aria-label="Dismiss"]')
                                                                            .length > 0) {
                                                                            clearInterval(findCloseModal);
                                                                            $('.artdeco-modal__dismiss[aria-label="Dismiss"]')
                                                                                .click()
                                                                        }

                                                                    }, 10)

                                                                    $(".message-anywhere-button")
                                                                        .not("[lac='true']")
                                                                        .eq(0)
                                                                        .text("Sent");
                                                                    $(".message-anywhere-button")
                                                                        .not("[lac='true']")
                                                                        .eq(0)
                                                                        .css({
                                                                            color: "grey",
                                                                            fontSize: "14px"
                                                                        });
                                                                    $(".message-anywhere-button")
                                                                        .not("[lac='true']")
                                                                        .eq(0)
                                                                        .attr("lac", true);
                                                                }, 500);
                                                            } else {
                                                                //skipCountrer = true; 
                                                                t.find("li-icon[type='cancel-icon']")
                                                                    .parent()
                                                                    .click();

                                                                $(".message-anywhere-button")
                                                                    .not("[lac='true']")
                                                                    .eq(0)
                                                                    .text("Sent");
                                                                $(".message-anywhere-button")
                                                                    .not("[lac='true']")
                                                                    .eq(0)
                                                                    .css({
                                                                        color: "grey",
                                                                        fontSize: "14px"
                                                                    });

                                                                $(".message-anywhere-button")
                                                                    .not("[lac='true']")
                                                                    .eq(0)
                                                                    .attr("lac", true);

                                                            }
                                                        } else {
                                                            //skipCountrer = true; 
                                                            t.find("li-icon[type='cancel-icon']")
                                                                .parent()
                                                                .click();

                                                            $(".message-anywhere-button")
                                                                .not("[lac='true']")
                                                                .eq(0)
                                                                .text("Sent");
                                                            $(".message-anywhere-button")
                                                                .not("[lac='true']")
                                                                .eq(0)
                                                                .css({
                                                                    color: "grey",
                                                                    fontSize: "14px"
                                                                });

                                                            $(".message-anywhere-button")
                                                                .not("[lac='true']")
                                                                .eq(0)
                                                                .attr("lac", true);
                                                        }
                                                    } catch (error) {

                                                    }

                                                }, 1000);

                                            }
                                        })
                                } catch (error) {

                                }
                            }, 3000);

                        }
                    }
                })
            }

            // Congrates
            if (s.feature == 12) {

                localStorage.data = "";

                $if = $("<iframe id='congratesIframe'></iframe");
                $if.attr("src", "https://www.linkedin.com/notifications/");
                $if.css({
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 9999,
                    border: "none"
                })


                const addSuggested = function() {
                    $body = $("#congratesIframe")
                        .contents();
                    if (ccf) {
                        ccf = false;
                        setInterval(function() {
                            $body.scrollTop(4000000);
                        }, 2000);
                    }

                    const button = "";

                    switch (s.custom) {

                        case "1":
                            {
                                button = $body.find("button")
                                .filter(":contains('Say happy birthday'),:contains('Gratulieren')");

                                button = button.filter(function(x, y) {
                                    return $(y)
                                        .parent()
                                        .parent()
                                        .parent()
                                        .find(".nt-card__headline:eq(0) strong")
                                        .text()
                                        .match(/a happy birthday|alles Gute zum Geburtstag/gi);
                                })
                                break;
                            }
                        case "2":
                            {
                                button = $body.find("button")
                                .filter(":contains('Say congrats'),:contains('Gratulieren')");

                                button = button.filter(function(x, y) {
                                    return !$(y)
                                        .parent()
                                        .parent()
                                        .parent()
                                        .find(".nt-card__headline:eq(0) strong")
                                        .text()
                                        .match(/a happy birthday|alles Gute zum Geburtstag/gi);
                                })
                                break;
                            }
                        case "3":
                            {
                                button = $body.find("button")
                                .filter(":contains('See all views'),:contains('Alle Ansichten anzeigen')");

                                break;
                            }
                        case "4":
                            {
                                button = $body.find("button")
                                .filter(":contains('Say thanks'),:contains('Bedanken')");

                                break;
                            }
                    }

                    button = button.not("[la='true']");


                    if ($body.find(".me-wyva-card__title")
                        .length) {

                        $body.find("button[data-control-name='connect_CTA']:eq(0)")
                            .trigger("click");
                    }

                    if (button.length) {
                        console.log(button.eq(0)[0]);
                        button.eq(0)
                            .attr("la", "true");

                        $body.find("*[data-control-name='overlay.close_conversation_window']")
                            .each(function() {
                                $(this)
                                    .trigger("click");
                            })


                        button.eq(0)
                            .trigger("click");

                        const t = $body.find(".msg-overlay-conversation-bubble")
                            .not(".msg-overlay-conversation-bubble--is-minimized");

                        if (t.length) {
                            const name = t.find(".msg-connections-lookup__recipient-name")
                                .text()
                                .replace(/\s+ /, "")
                            name = name.split(" ")[0];

                            const n = s.note;
                            n = n.replace(/\[+firstname+\]/g, name);


                            t.find(".ember-text-area.msg-messaging-form__message.ember-view")
                                .val(n);

                            const event = new Event('input', {
                                'bubbles': true,
                                'cancelable': true
                            });

                            t.find(".ember-text-area.msg-messaging-form__message.ember-view:eq(0)")[0].dispatchEvent(event);

                            t.find(".msg-messaging-form__send-button.button-tertiary-small")
                                .attr("disabled", false);

                            t.find(".msg-messaging-form__send-button.button-tertiary-small")
                                .trigger("click");
                        }
                    }
                }


                if (!$("#congratesIframe")
                    .length) {
                    $("body")
                        .append($if);
                } else {
                    addSuggested();
                }

                $if.on("load", function() {
                    addSuggested();
                })
            }

            if ((s.feature == 1) || (s.feature == 2) || (s.feature == 3)) {
                setTimeout(() => {
                    i++;


                    if (i >= 10 || is_next_available == 0) {
                        interval = null;
                        clearInterval(interval);
                        const page = loc("page");
                        if (!page) {
                            page = 2;
                            const w = window.location.href;
                        } else {
                            const w = window.location.href.replace(/&page=\d/, "");

                            page++;
                        }

                        window.location.href = w + "&page=" + page;
                    }
                    //  console.log(JSON.stringify(s));
                }, 20000)
            } else {
                i++;

                if (s.feature != 1 && s.feature != 2 && s.feature != 13) {
                    deduct();
                }

                if (i >= 10 && s.feature != 9 && s.feature != 10 && s.feature != 11 && s.feature != 12 && s.feature != 13 && s.feature != 14) {
                    interval = null;
                    clearInterval(interval);
                    const page = loc("page");
                    if (!page) {
                        page = 2;
                        const w = window.location.href;
                    } else {
                        const w = window.location.href.replace(/&page=\d/, "");

                        page++;
                    }

                    window.location.href = w + "&page=" + page;
                }
                //  console.log(JSON.stringify(s));
            }


        } else {

        }
    }
}


const s;
const i = 0;
const interval;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function prepare_s_14(settings_count) {
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                console.log(settings_count);
                console.log(typeof settings_count);

                let see_all_followers = document.querySelector(".org-view-page-followers-module__modal-button");
                let modal = document.querySelector(".org-view-page-followers-modal");
                if (document.body.contains(see_all_followers)) {
                    let count = parseInt(settings_count);
                    let followers = document.querySelectorAll("#artdeco-modal-outlet .org-view-page-followers-modal__table-cell .artdeco-entity-lockup");
                    if (modal === null) {
                        see_all_followers.click();
                        await sleep(2000);
                    }
                    const last_followers_count = 0;
                    if (followers.length < count) {
                        last_followers_count = followers.length;
                        while (true) {
                            let scrollbar_div = document.querySelector(".org-view-page-followers-modal .artdeco-modal__content");
                            scrollbar_div.scrollBy(0, scrollbar_div.scrollHeight);
                            await sleep(2000);
                            followers = document.querySelectorAll("#artdeco-modal-outlet .org-view-page-followers-modal__table-cell .artdeco-entity-lockup");
                            if (followers.length > count) {
                                console.log(followers.length);
                                resolve("ok");
                                break;
                            } else if (followers.length == last_followers_count) {
                                reject("error");
                            }
                            last_followers_count = followers.length;
                        }
                    }
                }
            } catch (error) {
                reject(error);
            }
        })()
    });
}

$(document)
    .ready(function() {
        if (!window.location.href.match(/lacontrol=endrose/gi)) {

            if (typeof popup != "undefined") {
                const users = new Array();
                users.push(["LinkedIn Profile URL", "First Name", "Last Name", "Title"]);
                localStorage.data = JSON.stringify(users);
                localStorage.removeItem("endorseTobePerformCount");

                let savedEndorseCount = localStorage.getItem("endorseTobePerformCount");
                console.log(savedEndorseCount)
                chrome.storage.local.get("settings", function(se) {
                    s = se.settings;
                    if (s.feature == 3 && !savedEndorseCount && savedEndorseCount != 0) {
                        console.log(s);
                        localStorage.setItem('endorseTobePerformCount', s.num);
                    }
                })

            }
            chrome.storage.local.get("settings", function(se) {
                s = se.settings;
                if (s) {
                    if (s.pause == false) {
                        const url = chrome.extension.getURL("src/browser_action/browser_action.html");
                        $if = $("<iframe id='assist' src='" + url + "' style='position:fixed; border:1px solid #999; box-shadow:4px 4px 20px #efeff; overflow-x:hidden; overflow-y:scroll; z-index:9999999; bottom:0; right:0;  width:465px; height:500px;'> </iframe");
                        $("body")
                            .append($if);
                        checkUsername();

                        console.log(s.feature);
                        console.log(typeof s.feature);
                        if (s.feature == "14") {
                            prepare_s_14(s.num)
                                .then(() => {
                                    const timeInterval = (parseInt(s.time) * 1000);
                                    interval = setInterval(() => {
                                        console.log(timeInterval);
                                        if (interval != null) {
                                            if (!skipCountrer) {
                                                chrome.storage.local.get("settings", function(set) {
                                                    let savedSettings = set.settings;
                                                    s.pause = savedSettings.pause;
                                                    if (s.pause) {
                                                        chrome.storage.local.set({
                                                            settings: s
                                                        });
                                                        interval = null;
                                                        clearInterval(interval);
                                                    } else {
                                                        autoConnection();
                                                    }
                                                });
                                            }
                                        }
                                    }, timeInterval);
                                    autoConnection();

                                })
                                .catch(() => {
                                    s.pause = true;
                                    chrome.storage.local.set({
                                        settings: s
                                    }, () => {
                                        window.location.reload();
                                    });
                                });
                        } else {
                            const timeInterval = (parseInt(s.time) * 1000);
                            interval = setInterval(() => {
                                console.log(timeInterval);
                                if (interval != null) {
                                    if (!skipCountrer) {
                                        chrome.storage.local.get("settings", function(set) {
                                            let savedSettings = set.settings;
                                            s.pause = savedSettings.pause;
                                            if (s.pause) {
                                                chrome.storage.local.set({
                                                    settings: s
                                                });
                                                interval = null;
                                                clearInterval(interval);
                                            } else {
                                                autoConnection();
                                            }
                                        });
                                    }
                                }
                            }, timeInterval);
                            autoConnection();
                        }


                        // function interval2(){ 
                        // 	var random =  Math.floor(Math.random() * ((s.time-10)+1) + 10);
                        // 	console.log(random);
                        // 	/*
                        // 	if(random<60){
                        // 		random = 60;
                        // 	}

                        // 	if(random<60 && s.feature==3){
                        // 		random = 60;
                        // 	} */
                        // 	// random=20;

                        // 	if(countImme){					  
                        // 		random = 3; 
                        // 	}



                        // 	interval =setTimeout(function(){
                        // 		if(!skipCountrer)	{				
                        // 			chrome.storage.local.get("settings",function(set){
                        // 				let savedSettings = set.settings;
                        // 				s.pause= savedSettings.pause;
                        // 				autoConnection();
                        // 			});						
                        // 		}
                        // 		interval2();
                        // 	},random*1000);
                        // }
                        // interval2();
                    }
                }
            })
        }
    })


$(document)
    .ready(function() {

        if (window.location.href.match(/lacontrol=connection/gi)) {
            setTimeout(function() {

                if ($(".pv-s-profile-actions.pv-s-profile-actions--connect")
                    .length) {
                    $(".pv-s-profile-actions.pv-s-profile-actions--connect:eq(0)")
                        .trigger("click");
                    $(".send-invite__actions button:eq(0)")
                        .trigger("click");

                    const name = $(".pv-top-card-section__name:eq(0)")
                        .text();
                    name = name.split(" ")[0];

                    const n = s.note;
                    n = n.replace(/\[+firstname+\]/g, name);


                    $("#custom-message")
                        .val(n);
                    const event = new Event('input', {
                        'bubbles': true,
                        'cancelable': true
                    });

                    try {
                        $("#custom-message")[0].dispatchEvent(event);
                    } catch (e) {

                    }
                    $(".button-primary-large")
                        .eq(1)[0].click();

                } else {
                    chrome.extension.sendMessage({
                        msg: "removeTab"
                    });
                }

                const w = window.location.href;

                setInterval(function() {
                    if (w != window.location.href) {
                        w = window.location.href;
                        chrome.extension.sendMessage({
                            msg: "removeTab"
                        });
                    }
                }, 40);
            }, 5000);
        }
        if (window.location.href.match(/lacontrol=message/gi)) {

            /*setTimeout(function () {

            	var textarea = $(".msg-compose-form__message-text.msg-compose-form__editor-clones:eq(0)");
            	if (textarea.length) {

            		var name = $(".msg-connections-lookup__recipient-name").text().replace(/\s+/gi, ' ').trim();
            		name = name.split(" ")[0];

            		var n = s.note;
            		n = n.replace(/\[+firstname+\]/g, name);


            		textarea.val(n);
            		var event = new Event('input', {
            			'bubbles': true,
            			'cancelable': true
            		});

            		try {
            			textarea[0].dispatchEvent(event);
            		} catch (e) {

            		}
            		$(".button-primary-small.msg-compose-form__send-button").eq(0).attr("disabled", false);
            		$(".button-primary-small.msg-compose-form__send-button").eq(0).trigger("click");
            		deduct();
            		setTimeout(function () {

            			chrome.extension.sendMessage({
            				msg: "removeTab"
            			});
            		}, 5000);
            	} else {
            		chrome.extension.sendMessage({
            			msg: "removeTab"
            		});
            	}
            }, 5000);*/
        }
        if (window.location.href.match(/lacontrol=endrose/gi)) {
            activateEndorse();
        }
    })




const makeCsvFile = function(e) {
    console.log("CSV");
    const data = [];
    try {
        data = JSON.parse(localStorage.data);
    } catch (e) {}

    //var htmlData = '<table>';

    chrome.extension.sendMessage({
        msg: "displaydata",
        data: data
    });


    /*$.each(data, function (index, value) {
    	if (index == 0) {
    		htmlData += '<tr>';
    		htmlData += '<th>' + value[0] + '</th>';
    		htmlData += '<th>' + value[1] + '</th>';
    		htmlData += '<th>' + value[2] + '</th>';
    		htmlData += '<th>' + value[3] + '</th>';
    		htmlData += '</tr>';
    	} else {
    		htmlData += '<tr>';
    		htmlData += '<td>' + value[0] + '</td>';
    		htmlData += '<td>' + value[1] + '</td>';
    		htmlData += '<td>' + value[2] + '</td>';
    		htmlData += '<td>' + value[3] + '</td>';
    		htmlData += '</tr>';
    	}
    });*/
    localStorage.data = '';
    //htmlData += '</table>';

    //window.open('data:application/vnd.ms-excel,' + escape(htmlData));
    setTimeout(() => {

        //burayı degiştirdim
        window.location.reload();

    }, 5000);
    try {
        e.preventDefault();
    } catch (error) {

    }

}


function loc(sParam) {
    const sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


function S(a) {
    newString = a.replace(/\s+/g, ' ')
        .trim();
    return newString;
}

function deduct() {
    chrome.extension.sendMessage({
        msg: "deduct",
        feature: s.feature
    });

}


function checkUsername() {
    const username = $('code')
        .text()
        .match(/"publicIdentifier"\:"\S+"\,/gi);

    if (username) {

        username = username[0].split(",")[0].split(":");

        if (username.length > 1) {
            username = username[1].replace(/\"/gi, "");
            if (user.username == "first") {
                console.log(username);
                chrome.extension.sendMessage({
                    "msg": "updateUsername",
                    username: username
                });


            } else if (username != user.username) {
                //alert("Linked Assit Only works in one linkedin account");
                //s.pause = true;
                //chrome.storage.local.set({settings:s},function(){
                //	window.location.reload();
                //});

            }
        }
    }
}


function clickClasses() {

    $("html")
        .animate({
            scrollTop: $(".pv-skill-entity__featured-endorse-button-shared")
                .eq(0)
                .offset()
                .top - 300
        }, 2000, function() {
            let buttonArray = document.getElementsByClassName('pv-skill-entity__featured-endorse-button-shared')
            if (buttonArray && buttonArray.length > 0) {
                for (let i = 0; i < buttonArray.length; i++) {
                    if (buttonArray[i].firstElementChild.getAttribute("type") == "plus-icon") {
                        buttonArray[i].click();
                    }
                }
                setTimeout(function() {
                    chrome.extension.sendMessage({
                        msg: "removeTab"
                    });
                }, 5000)
            } else {
                chrome.extension.sendMessage({
                    msg: "removeTab"
                });
            }
        })


}

function showMore() {
    let showMore = document.getElementsByClassName('pv-skills-section__additional-skills')[0];
    if (showMore) {
        debugger
        showMore.click();
        setTimeout(function() {
            clickClasses();
        }, 3000)

    } else {
        clickClasses();
    }
}

function activateEndorse() {
    window.scroll({
        top: 100000,
        left: 0,
        behavior: 'smooth'
    });
    const EndorseCounter = 0;
    const EndorseInterval = setInterval(function() {
        EndorseCounter++;
        if ($(".pv-skill-entity__featured-endorse-button-shared")
            .length) {
            clearTimeout(EndorseInterval);
            setTimeout(function() {
                showMore();
            }, 3000)
        } else {
            if (EndorseCounter > 10) {
                clearTimeout(EndorseInterval);
                chrome.extension.sendMessage({
                    msg: "removeTab"
                });
            }
        }

    }, 1000);

}