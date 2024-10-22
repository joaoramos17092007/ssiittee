var AWIN = AWIN || {};
AWIN.Tracking = AWIN.Tracking || {},
AWIN.sProtocol = "https:" == location.protocol ? "https://" : "http://",
AWIN.iScriptCount = 0,
AWIN.Tracking.device9Url = "https://the.sciencebehindecommerce.com/d9core",
AWIN.Tracking.flags = {
    allowNewAWCCookie: !0,
    allowNewGCLIDCookie: !0
},
AWIN.Tracking.setFlag = function(e, n) {
    AWIN.Tracking.flags[e] = n
}
,
AWIN.Tracking.getFlag = function(e) {
    return AWIN.Tracking.flags[e]
}
,
AWIN.tldDomains = ["com", "org", "edu", "gov", "uk", "net", "ca", "de", "jp", "fr", "au", "us", "ru", "ch", "it", "nl", "se", "no", "es", "mil", "gw", "ax", "wf", "yt", "sj", "mobi", "eh", "mh", "bv", "ap", "cat", "kp", "iq", "um", "arpa", "pm", "gb", "cs", "td", "so", "aero", "biz", "coop", "info", "jobs", "museum", "name", "pro", "travel", "ac", "ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "as", "at", "aw", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bw", "by", "bz", "cc", "cd", "cf", "cg", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cx", "cy", "cz", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "er", "et", "eu", "fi", "fj", "fk", "fm", "fo", "ga", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "ir", "is", "je", "jm", "jo", "ke", "kg", "kh", "ki", "km", "kn", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "mg", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rw", "sa", "sb", "sc", "sd", "sg", "sh", "si", "sk", "sl", "sm", "sn", "sr", "st", "sv", "sy", "sz", "tc", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "ws", "ye", "yu", "za", "zm", "zw", "app"],
AWIN.twoPartsTldDomains = ["co.bb", "co.ck", "co.cr", "co.in", "co.id", "co.il", "co.jp", "co.nz", "co.za", "co.kr", "co.th", "co.uk", "org.uk", "net.uk", "com.pl", "biz.pl", "net.pl", "com.cl", "com.pe", "com.ar", "com.au", "com.br"],
AWIN.Tracking.fingerprinting = function(e) {
    if (!document.getElementById("d9tag")) {
        var n = AWIN.Tracking.getQueryVarValue("mtfp", document.location.search.substring(1));
        if (AWIN.Tracking.device9 && "no" != n) {
            window.D9v = e;
            var r = document.createElement("script");
            r.type = "text/javascript",
            r.id = "d9tag",
            r.async = !0,
            r.src = AWIN.Tracking.device9Url;
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(r, t)
        }
    }
}
,
AWIN.Tracking.digestClickId = function(e) {
    if (!/\d+_\d+_.+/.test(e))
        return !1;
    var n = e.split("_")
      , r = {};
    return r.sName = "_aw_m_" + n[0],
    r.sContents = e,
    r
}
,
AWIN.Tracking.getQueryVarValue = function(e, n) {
    for (var r = n.split("&"), t = 0; t < r.length; t++) {
        var a = r[t].split("=");
        if (e.toLowerCase() == a[0].toLowerCase())
            return a[1]
    }
}
,
AWIN.Tracking.getAnchorValue = function(e) {
    var n = document.location.hash.substring(1);
    if (n)
        return aid = n.match(e),
        aid ? aid.toString().substr(4) : null
}
,
AWIN.Tracking.buildQueryString = function(e) {
    var n = [];
    for (var r in e)
        e.hasOwnProperty(r) && n.push(r + "=" + encodeURIComponent(e[r]));
    return n.join("&")
}
,
AWIN.Tracking._getDomain = function() {
    return location.hostname
}
,
AWIN.Tracking._getCookieDomain = function() {
    if (void 0 !== AWIN.Tracking.cookieDomain)
        return AWIN.Tracking.cookieDomain;
    var e = AWIN.Tracking._getDomain();
    if (e.split(".").length < 3)
        return "." + e;
    var n = e.split(".").slice(-2).join(".");
    if (AWIN.twoPartsTldDomains.indexOf(n) >= 0)
        return "." + e.split(".").slice(-3).join(".");
    var r = e.split(".").pop();
    return AWIN.tldDomains.indexOf(r) >= 0 ? "." + e.split(".").slice(-2).join(".") : "www." == e.substr(0, 4) ? e.substr(3) : "." + e
}
,
AWIN.Tracking._getAWCValue = function() {
    for (var e, n = /[\?&]awc=(\d+_(\d+)_[0-9a-f]+)/gi, r = 0, t = !1; e = n.exec(AWIN.Tracking._getBrowserSearchBarUrl()); )
        r < e[2] && (r = e[2],
        t = e[1]);
    return t || AWIN.Tracking.getAnchorValue(/awc=[0-9a-z_]+/i)
}
,
AWIN.Tracking._getAWaidValue = function() {
    var e = /[\?&]awaid=(\d+)/gi.exec(AWIN.Tracking._getBrowserSearchBarUrl())
      , n = null;
    return e && (n = e[1]),
    n
}
,
AWIN.Tracking._getGCLIDValue = function() {
    var e = /[\?&]gclid=([0-9a-zA-Z_\-]+)/gi.exec(AWIN.Tracking._getBrowserSearchBarUrl())
      , n = null;
    return e && (n = e[1]),
    n
}
,
AWIN.Tracking._getBrowserSearchBarUrl = function() {
    return document.location.search
}
,
AWIN.Tracking.getQueryParameterDelimiter = function(e) {
    return -1 === e.indexOf("?") ? "?" : "&"
}
,
AWIN.Tracking._getATPValue = function() {
    var e = AWIN.Tracking.getQueryVarValue("atp", document.location.search.substring(1));
    return e ? parseInt(e) : AWIN.Tracking.getAnchorValue(/atp=[0-9]+/i) ? parseInt(parseanchorAtp) : 0
}
,
AWIN.Tracking.setCookie = function(e, n, r) {
    var t = !1;
    if (AWIN.Tracking.Consent.getSnRegEx().test(e) ? t = !0 : AWIN.Tracking.Consent.getConsentIsRespected() && !AWIN.Tracking.Consent.getConsent() || (t = !0),
    t) {
        var a = new Date;
        a.setTime(a.getTime() + 31536e6),
        r && a.setTime(1e3 * r);
        var i = "; expires=" + a.toGMTString();
        if (document.cookie = e + "=" + n + i + "; path=/;domain=" + this._getCookieDomain(),
        AWIN.Tracking.StorageProvider)
            if (0 === e.indexOf("_aw_m_")) {
                var c = e.split("_aw_m_")[1];
                AWIN.Tracking.StorageProvider.setAWC(c, n)
            } else if (0 === e.indexOf("_aw_sn_")) {
                c = e.split("_aw_sn_")[1];
                AWIN.Tracking.StorageProvider.setSn(c, n)
            }
    }
}
,
AWIN.Tracking.setAWCCookie = function() {
    var e = AWIN.Tracking._getAWCValue();
    if (!/\d+_\d+_.+/.test(e))
        return !1;
    var n = "_aw_m_" + e.split("_")[0];
    AWIN.Tracking.setCookie(n, e)
}
,
AWIN.Tracking.setGCLIDCookie = function() {
    var e = AWIN.Tracking._getGCLIDValue()
      , n = AWIN.Tracking._getAWaidValue();
    return null !== e && null !== n && (AWIN.Tracking.setCookie("_aw_m_" + n, "gclid_" + n + "_" + e),
    !0)
}
,
AWIN.Tracking.setIncentiveCookie = function() {
    var e = AWIN.Tracking._getAWCValue();
    if (!/\d+_\d+_.+/.test(e))
        return !1;
    var n = "_aw_sn_" + e.split("_")[0];
    AWIN.Tracking.setCookie(n, e)
}
,
AWIN.Tracking.setAidCookie = function() {
    var e = AWIN.Tracking.getQueryVarValue("xid", document.location.search.substring(1));
    e || (e = AWIN.Tracking.getAnchorValue(/xid=\d+/)),
    e && AWIN.Tracking.setCookie("_aw_xid", e)
}
,
AWIN.Tracking.getAffiliateId = function() {
    return AWIN.Tracking.getCookiesAsString(/_aw_xid/)
}
,
AWIN.Tracking.getSaleChannel = function() {
    return void 0 !== AWIN.Tracking.Sale.channel ? AWIN.Tracking.Sale.channel : ""
}
,
AWIN.Tracking.cookiesWereSpecifiedByMerchant = function() {
    if (AWIN.Tracking.Sale && AWIN.Tracking.Sale.click) {
        if (/\d+_\d+_.+/.test(AWIN.Tracking.Sale.click))
            return !0
    }
    return !1
}
,
AWIN.Tracking.getCookiesAsString = function(e) {
    var n, r = "", t = !AWIN.Tracking.Consent.getConsentIsRespected() || AWIN.Tracking.Consent.getConsent(), a = !1;
    if (e || (e = /_aw_m_\d+/,
    n = AWIN.Tracking.Consent.getSnRegEx(),
    a = !0),
    a || t) {
        for (var i = [], c = document.cookie.split(";"), o = 0; o < c.length; o++) {
            var s = c[o].split("=");
            e.test(s[0]) ? t && i.push(s[1]) : a && n.test(s[0]) && (i.push(s[1]),
            AWIN.Tracking.Consent.setIsSnCookieAvailable())
        }
        i.length > 0 && (r = i.toString().replace(" ", ""))
    }
    return r
}
,
AWIN.Tracking.getCookiesAsStringEscaped = function(e) {
    return escape(AWIN.Tracking.getCookiesAsString(e))
}
,
AWIN.Tracking.getScriptAppendNode = function() {
    var e = ["body", "head", "html"];
    for (var n in e)
        if (document.getElementsByTagName(e[n])[0])
            return document.getElementsByTagName(e[n])[0]
}
,
AWIN.Tracking.frameAppend = function(e, n) {
    document.getElementsByTagName("body")[0] && AWIN.Tracking.Consent.getGdprAppends(n, AWIN.Tracking.getQueryParameterDelimiter(e), (function(n) {
        e += n;
        var r = document.createElement("iframe");
        r.src = e,
        AWIN.Tracking.hideElement(r),
        document.getElementsByTagName("body")[0].appendChild(r)
    }
    ))
}
,
AWIN.Tracking.pixelAppend = function(e, n) {
    document.getElementsByTagName("body")[0] && AWIN.Tracking.Consent.getGdprAppends(n, AWIN.Tracking.getQueryParameterDelimiter(e), (function(n) {
        e += n;
        var r = document.createElement("img");
        r.src = e,
        AWIN.Tracking.hideElement(r),
        document.getElementsByTagName("body")[0].appendChild(r)
    }
    ))
}
,
AWIN.Tracking.scriptAppend = function(e, n, r, t, a) {
    if (!e || !n) {
        var i = document.createElement("script");
        if (i.type = "text/javascript",
        i.id = "_aw_script_" + AWIN.iScriptCount++,
        e ? i.src = e : n && (i.text = n),
        t)
            for (var c in t)
                i.setAttribute(c, t[c]);
        r && ("function" != typeof r && AWIN.Tracking.sendDebugEvent({
            severity: "warning",
            source: {
                app: "AMT",
                category: "scriptAppend"
            },
            body: {
                message: "onLoadCallback is not a function.",
                url: e || "inline script",
                advertiserId: AWIN.Tracking.iMerchantId
            }
        }),
        i.onreadystatechange = function() {
            "complete" != i.readyState && "loaded" != i.readyState || r()
        }
        ,
        i.onload = r),
        e ? AWIN.Tracking.Consent.getGdprAppends(a, AWIN.Tracking.getQueryParameterDelimiter(i.src), (function(e) {
            i.src += e,
            AWIN.Tracking.getScriptAppendNode().appendChild(i)
        }
        )) : AWIN.Tracking.getScriptAppendNode().appendChild(i)
    }
}
,
AWIN.Tracking.saleSubmit = function() {
    if (AWIN.Tracking.iMerchantId < 1)
        return !1;
    AWIN.Tracking.Sale.currency = void 0 !== AWIN.Tracking.Sale.currency ? AWIN.Tracking.Sale.currency : "",
    AWIN.Tracking.Sale.test = void 0 !== AWIN.Tracking.Sale.test ? AWIN.Tracking.Sale.test : "0",
    AWIN.Tracking.Sale.voucher = void 0 !== AWIN.Tracking.Sale.voucher ? AWIN.Tracking.Sale.voucher : "",
    AWIN.Tracking.scriptAppend(AWIN.Tracking.buildSaleUrl("js")),
    AWIN.Tracking.BasketImage = new Image(1,1),
    AWIN.Tracking.BasketImage.src = AWIN.Tracking.buildSaleUrl("ia"),
    AWIN.Tracking.cookiesWereSpecifiedByMerchant() || (AWIN.enhancedTracking && 1 == AWIN.enhancedTracking && 1 != AWIN.Tracking.Sale.pvOnly && AWIN.Tracking.embedIframe("get"),
    AWIN.Tracking.fingerprinting({
        AdvID: "1062",
        OrderID: AWIN.Tracking.Sale.orderRef,
        OrderTotal: AWIN.Tracking.Sale.amount,
        SiteID: AWIN.Tracking.iMerchantId,
        TAG: 2
    }))
}
,
AWIN.Tracking.basketSubmit = function() {
    var e = /^\s+|\s+$/g
      , n = document.getElementById("aw_basket").value.split("\n")
      , r = new Array;
    AWIN.Tracking.BasketImages = new Array;
    for (var t = 0; t < n.length; t++) {
        var a = n[t].replace(e, "");
        if (a.length > 0) {
            for (var i = a.split("|"), c = "", o = 0; o < i.length; o++) {
                c += i[o].replace(e, "").substring(0, 255) + "|"
            }
            r[r.length] = encodeURIComponent(c.substring(0, c.length - 1))
        }
    }
    for (t = 0; t < r.length; t++)
        r[t].length > 0 && (AWIN.Tracking.BasketImages[t] = new Image(1,1),
        AWIN.Tracking.BasketImages[t].src = AWIN.sProtocol + "www.awin1.com/basket.php?product_line=" + r[t])
}
,
AWIN.Tracking.getBasketData = function() {
    var e = [];
    if (!document.getElementById("aw_basket"))
        return e;
    for (var n = document.getElementById("aw_basket").value.split("\n"), r = 0; r < n.length; r++)
        if (n[r].length > 0) {
            var t = n[r].split("|");
            try {
                e.push({
                    id: t[3].replace(/^\[|\]$/gi, ""),
                    name: t[4].replace(/^\[|\]$/gi, ""),
                    price: t[5].replace(/^\[|\]$/gi, ""),
                    quantity: t[6].replace(/^\[|\]$/gi, ""),
                    sku: t[7].replace(/^\[|\]$/gi, ""),
                    cg: t[8].replace(/^\[|\]$/gi, ""),
                    category: t[9].replace(/^\[|\]$/gi, "")
                })
            } catch (n) {
                return e
            }
        }
    return e
}
,
AWIN.Tracking.hideElement = function(e) {
    "Microsoft Internet Explorer" == navigator.appName ? (e.style.height = 0,
    e.style.width = 0,
    e.style.visibility = "hidden",
    e.style.display = "inherit",
    e.style.margin = 0,
    e.style.border = 0,
    e.style.padding = 0) : (e.style.setProperty("height", "0", "important"),
    e.style.setProperty("width", "0", "important"),
    e.style.setProperty("visibility", "hidden", "important"),
    e.style.setProperty("display", "inherit", "important"),
    e.style.setProperty("margin", "0", "important"),
    e.style.setProperty("border", "0", "important"),
    e.style.setProperty("padding", "0", "important")),
    "IFRAME" != e.tagName && "IMG" != e.tagName || e.setAttribute("aria-hidden", "true")
}
,
AWIN.Tracking.embedIframe = function(e) {
    if (!document.getElementById("AW_ALT")) {
        if ("set" == e) {
            var n = "https://www.awin1.com/alt.php?mid=" + AWIN.Tracking.iMerchantId + "&sv=" + AWIN.Tracking._getAWCValue()
              , r = parseInt(AWIN.Tracking._getATPValue());
            r > 0 && (n = n + "|" + r)
        } else {
            var t = AWIN.Tracking.buildSaleUrl("et");
            n = "https://www.awin1.com/alt.php?mid=" + AWIN.Tracking.iMerchantId + "&gv=2&l=" + escape(t)
        }
        if (document.getElementsByTagName("body")[0]) {
            var a = document.createElement("iframe");
            a.setAttribute("aria-hidden", "true"),
            a.src = n,
            a.height = "0",
            a.width = "0",
            a.id = "AW_ALT",
            document.getElementsByTagName("body")[0].appendChild(a);
            var i = document.getElementById("AW_ALT");
            AWIN.Tracking.hideElement(i)
        }
    }
}
,
AWIN.Tracking.buildSaleUrl = function(e) {
    var n = "js" == e ? "js" : "php"
      , r = ""
      , t = ""
      , a = "";
    if ("fc" != e && "et" != e) {
        r = "&cks=" + AWIN.Tracking.sCookiesString,
        AWIN.Tracking.awcStorages && (t = "&awc_st=" + escape(AWIN.Tracking.awcStorages));
        var i = parseInt(AWIN.Tracking.getCookiesAsString(/_aw_atp/));
        i > 0 && (a = "&atp=" + i)
    }
    var c = encodeURIComponent(window.location.href);
    "fc" == e && (c = encodeURIComponent(c));
    var o = "";
    1 == AWIN.Tracking.Sale.pvOnly && (o = "&pv=1");
    var s = AWIN.sProtocol + "www.awin1.com/sread." + n + "?a=" + AWIN.Tracking.iMerchantId + "&b=" + AWIN.Tracking.Sale.amount + "&cr=" + AWIN.Tracking.Sale.currency + "&c=" + AWIN.Tracking.Sale.orderRef + "&d=" + AWIN.Tracking.Sale.parts + "&vc=" + AWIN.Tracking.Sale.voucher + "&t=" + AWIN.Tracking.Sale.test + "&ch=" + AWIN.Tracking.getSaleChannel() + r + AWIN.SaleQueryStringBuilder.getQueryString() + "&l=" + c + "&tv=2" + o + a + "&tt=" + e + t;
    return AWIN.Tracking.Sale.custom && AWIN.Tracking.Sale.custom instanceof Array && (s += AWIN.Tracking.getDynamicParametersAsQueryString("p", AWIN.Tracking.Sale.custom)),
    AWIN.Tracking.Sale.customerAcquisition && (s = s + "&customeracquisition=" + AWIN.Tracking.Sale.customerAcquisition),
    AWIN.Tracking.Sale.servicePartnerIds && AWIN.Tracking.Sale.servicePartnerIds instanceof Array && (s += AWIN.Tracking.getDynamicParametersAsQueryString("spa", AWIN.Tracking.Sale.servicePartnerIds)),
    AWIN.Tracking.Sale.servicePartnerReferences && AWIN.Tracking.Sale.servicePartnerReferences instanceof Array && (s += AWIN.Tracking.getDynamicParametersAsQueryString("sparef", AWIN.Tracking.Sale.servicePartnerReferences)),
    AWIN.Tracking.Consent.getConsentIsRespected() && (s += AWIN.Tracking.Consent.getGdprQuery()),
    AWIN.Tracking.Consent.getIsSnCookieAvailable() && (s += "&sn=1"),
    s
}
,
AWIN.Tracking.getDynamicParametersAsQueryString = function(e, n) {
    for (var r = "", t = 0; t < n.length; t++) {
        r = r + "&" + (e + (t + 1)) + "=" + n[t]
    }
    return r
}
,
AWIN.Tracking.fetchZxParam = function(e) {
    var n = window["zx_" + e]
      , r = AWIN.Tracking.getQueryVarValue("zx_" + e, document.location.search.substring(1))
      , t = AWIN.Tracking.getXPath('//*[@id="zx_' + e + '"]').next();
    if (null !== t) {
        n = null;
        var a = t.innerHTML
    }
    var i = AWIN.Tracking.getXPath('//META[@name="zx:' + e + '"]').next();
    if (null !== i)
        var c = i.getAttribute("content");
    return n || c || a || r
}
,
AWIN.Tracking.getXPath = function(e) {
    return document.evaluate ? {
        list: document.evaluate(e, document, null, XPathResult.ANY_TYPE, null),
        next: function() {
            return this.list.iterateNext()
        }
    } : {
        next: function() {
            return null
        }
    }
}
,
AWIN.Tracking.runAWCAnalyticsCheck = function() {
    try {
        if (!AWIN.Tracking._getAWCValue()) {
            var e = window.location.href;
            e && e.toLowerCase().indexOf("awc") > -1 && AWIN.Tracking.sendDebugEvent({
                severity: "warning",
                source: {
                    app: "AMT",
                    category: "awc"
                },
                body: {
                    message: 'AWC not available, but "awc" string found in url',
                    url: e,
                    advertiserId: AWIN.Tracking.iMerchantId
                }
            })
        }
    } catch (e) {}
}
,
AWIN.Tracking.runCount = 0,
AWIN.Tracking.run = function(e) {
    AWIN.Tracking.runCount++,
    AWIN.Tracking.cookiesWereSpecifiedByMerchant() ? AWIN.Tracking.sCookiesString = escape(AWIN.Tracking.Sale.click) : AWIN.Tracking.sCookiesString = void 0 === e ? escape(AWIN.Tracking.getCookiesAsString()) : escape(e),
    AWIN.Tracking.Sale && (AWIN.Tracking.Consent.getConsentIsRespected() && !AWIN.Tracking.Consent.getHasResult() || (AWIN.Tracking.saleSubmit(),
    document.getElementById("aw_basket") && AWIN.Tracking.basketSubmit())),
    AWIN.Tracking._getAWCValue() ? (AWIN.Tracking.Consent.getSnParameter() ? AWIN.Tracking.getFlag("allowNewAWCCookie") && AWIN.Tracking.setIncentiveCookie() : (AWIN.Tracking.getFlag("allowNewAWCCookie") && AWIN.Tracking.setAWCCookie(),
    AWIN.Tracking._getATPValue() > 0 && AWIN.Tracking.setCookie("_aw_atp", AWIN.Tracking._getATPValue())),
    AWIN.Tracking.Consent.getConsentIsRespected() && !AWIN.Tracking.Consent.getConsent() || (AWIN.enhancedTracking && 1 == AWIN.enhancedTracking && AWIN.Tracking.embedIframe("set"),
    AWIN.Tracking.fingerprinting({
        CampID: "3055",
        CCampID: AWIN.Tracking.iMerchantId,
        ImpID: AWIN.Tracking._getAWCValue(),
        TAG: 1
    }))) : AWIN.Tracking._getGCLIDValue() ? AWIN.Tracking.getFlag("allowNewGCLIDCookie") && AWIN.Tracking.setGCLIDCookie() : AWIN.Tracking.refreshAWCookies(),
    AWIN.Tracking.setAidCookie()
}
,
AWIN.Tracking.getAWCookies = function() {
    for (var e = /_aw_m_\d+/, n = /\d+_\d+_.+/, r = [], t = !AWIN.Tracking.Consent.getConsentIsRespected() || AWIN.Tracking.Consent.getConsent(), a = document.cookie.split(";"), i = 0; i < a.length; i++) {
        var c = a[i].split("=");
        e.test(c[0]) ? t && n.test(c[1]) && r.push(c) : AWIN.Tracking.Consent.getSnRegEx().test(c[0]) && n.test(c[1]) && r.push(c)
    }
    return r
}
,
AWIN.Tracking.refreshAWCookies = function() {
    for (var e = AWIN.Tracking.getAWCookies(), n = 0; n < e.length; n++) {
        var r = e[n][0]
          , t = e[n][1];
        AWIN.Tracking.setCookie(r, t, 1);
        var a = t.split("_")
          , i = 31536e3 + parseInt(a[1]);
        AWIN.Tracking.setCookie(r, t, i)
    }
}
,
"function" != typeof window.CustomEvent ? window.AwinCustomEvent = function(e, n) {
    n = n || {
        bubbles: !1,
        cancelable: !1,
        detail: void 0
    };
    var r = document.createEvent("CustomEvent");
    return r.initCustomEvent(e, n.bubbles, n.cancelable, n.detail),
    r
}
: window.AwinCustomEvent = window.CustomEvent,
AWIN.Tracking.Consent = {},
function(e) {
    var n, r = !1, t = !1, a = !1, i = !1, c = /_aw_sn_\d+/;
    function o(e) {
        return "string" == typeof e ? "true" === e.toLowerCase() || "false" === e.toLowerCase() || "1" === e || "0" === e : 1 == e || 0 == e
    }
    function s(e) {
        if ("string" == typeof e) {
            if ("true" === e.toLowerCase() || "1" === e)
                return !0;
            if ("false" === e.toLowerCase() || "0" === e)
                return !1
        } else if (1 == e || 0 == e)
            return 1 == e;
        return !0
    }
    e.checkForSnParameter = function() {
        var n = AWIN.Tracking.getQueryVarValue("sn", document.location.search.substring(1));
        n && e.setSnParameter(parseInt(n))
    }
    ,
    e.getGdprQuery = function() {
        return void 0 !== AWIN.Tracking.AdvertiserConsent ? o(AWIN.Tracking.AdvertiserConsent) ? e.getConsent() ? "&cons=1" : "&cons=0" : "&cons=" : ""
    }
    ,
    e.getConsent = function() {
        return void 0 !== AWIN.Tracking.AdvertiserConsent ? s(AWIN.Tracking.AdvertiserConsent) : t
    }
    ,
    e.getHasResult = function() {
        return void 0 !== AWIN.Tracking.AdvertiserConsent || a
    }
    ,
    e.setConsentPluginIsUsed = function(e) {
        r = e
    }
    ,
    e.getConsentIsRespected = function() {
        return void 0 !== AWIN.Tracking.AdvertiserConsent || r
    }
    ,
    e.setGdprQueryAdditionFunction = function(n) {
        void 0 === AWIN.Tracking.AdvertiserConsent && (e.getGdprQuery = n)
    }
    ,
    e.setConsent = function(e) {
        t = e,
        a = !0
    }
    ,
    e.setAdvertiserConsentStatus = function(e) {
        if (void 0 !== AWIN.Tracking.AdvertiserConsent) {
            o(e) || console.error('setAdvertiserConsentStatus was called with an unsupported value. Argument must have one of the following values: 1, 0, true, false, "true" and "false"'),
            AWIN.Tracking.AdvertiserConsent = e,
            a = !0;
            var n = new AwinCustomEvent("AdvertiserConsentChanged",{
                detail: {
                    consent: s(AWIN.Tracking.AdvertiserConsent)
                }
            });
            document.dispatchEvent(n),
            AWIN.Tracking.StorageProvider ? AWIN.Tracking.StorageProvider.get(AWIN.Tracking.getCookiesAsString(), AWIN.Tracking.run) : AWIN.Tracking.run()
        }
    }
    ,
    e.setSnParameter = function(e) {
        n = e
    }
    ,
    e.setIsSnCookieAvailable = function() {
        i = !0
    }
    ,
    e.getSnParameter = function() {
        return !!n
    }
    ,
    e.getIsSnCookieAvailable = function() {
        return i
    }
    ,
    e.getSnRegEx = function() {
        return c
    }
    ,
    e.getGdprAppends = function(e, n, r) {
        if (e) {
            var t = n + "gdpr=${GDPR}&gdpr_consent=${GDPR_CONSENT_" + e + "}";
            if ("function" == typeof __tcfapi)
                try {
                    __tcfapi("getTCData", 2, (function(e, a) {
                        var i = n;
                        if (e && a && void 0 !== e.gdprApplies)
                            return e.gdprApplies ? i += "gdpr=1" : i += "gdpr=0",
                            i += "&gdpr_consent=" + e.tcString,
                            void r(i);
                        r(t)
                    }
                    ), [e])
                } catch (e) {
                    r(t)
                }
            else
                r(t)
        } else
            r("")
    }
    ,
    e.checkForSnParameter()
}(AWIN.Tracking.Consent),
AWIN.SandBoxGenerator = function() {
    var e = AWIN.Tracking.getAffiliateId()
      , n = AWIN.Tracking._getAWCValue();
    function r(r, t) {
        var a = {
            advertiser: {},
            plugin: {}
        };
        return function(r, t) {
            r.plugin.publisherId = e,
            r.plugin.advertiserId = AWIN.Tracking.iMerchantId,
            r.plugin.protocol = AWIN.sProtocol,
            r.plugin.awc = n,
            r.advertiser.config = AWIN.Tracking[t]
        }(a, t),
        r.accessConfig.zxParams && function(e, n) {
            n.length > 0 && (e.zxParams = {});
            for (var r = 0; r < n.length; r++)
                e.zxParams[n[r]] = AWIN.Tracking.fetchZxParam(n[r])
        }(a.plugin, r.accessConfig.zxParams),
        r.accessConfig.location && (a.plugin.location = document.location),
        r.accessConfig.referrer && (a.plugin.referrer = document.referrer),
        r.accessConfig.sale && (a.plugin.sale = AWIN.Tracking.Sale),
        r.accessConfig.basket && (a.plugin.basket = AWIN.Tracking.getBasketData()),
        a
    }
    return {
        generate: function(e, n) {
            var t = "<body><script>var AWIN = AWIN || {};AWIN.Tracking = AWIN.Tracking || {};AWIN.payload = " + JSON.stringify(r(AWIN.Tracking[n], n)) + ';AWIN.pluginName = "' + n + '";<\/script><script>' + unescape("var%20AWIN%20%3D%20AWIN%20%7C%7C%20%7B%7D%3B%0AAWIN.iScriptCount%20%3D%200%3B%0A%0AAWIN.Tracking%20%3D%20%28function%20%28pluginName%2C%20payload%29%20%7B%0A%09var%20fetchZxParam%20%3D%20function%20%28name%29%20%7B%0A%09%09return%20payload.plugin.zxParams%5Bname%5D%20%7C%7C%20null%3B%0A%09%7D%3B%0A%09var%20scriptAppend%20%3D%20function%20%28sScriptSrc%2C%20sScriptContent%2C%20onLoadCallback%2C%20oScriptTagParams%2C%20tcfVendorId%29%20%7B%0A%09%09//%20only%20one%20of%20the%20two%20can%20be%20set%0A%09%09if%20%28sScriptSrc%20%26%26%20sScriptContent%29%20%7B%0A%09%09%09return%20false%3B%0A%09%09%7D%0A%0A%09%09//%20create%20script%20node%0A%09%09var%20scriptNode%20%3D%20document.createElement%28%27script%27%29%3B%0A%09%09scriptNode.type%20%3D%20%27text/javascript%27%3B%0A%09%09scriptNode.id%20%3D%20%27_aw_script_%27%20+%20AWIN.iScriptCount++%3B%0A%0A%09%09//%20only%20add%20if%20param%20was%20passed%0A%09%09if%20%28sScriptSrc%29%20%7B%0A%09%09%09scriptNode.src%20%3D%20sScriptSrc%3B%0A%09%09%7D%20else%20if%20%28sScriptContent%29%20%7B%0A%09%09%09scriptNode.text%20%3D%20sScriptContent%3B%0A%09%09%7D%0A%0A%09%09//%20set%20optional%20parameters%0A%09%09if%20%28oScriptTagParams%29%20%7B%0A%09%09%09for%20%28var%20name%20in%20oScriptTagParams%29%20%7B%0A%09%09%09%09scriptNode%5Bname%5D%20%3D%20oScriptTagParams%5Bname%5D%3B%0A%09%09%09%7D%0A%09%09%7D%0A%0A%09%09//%20attach%20an%20event%20handler%0A%09%09if%20%28onLoadCallback%29%20%7B%0A%09%09%09//%20send%20Debug%20EVent%20when%20onLoadCallback%20is%20not%20a%20function.%20TODO%20This%20is%20temporary%20change%2C%20should%20be%20removed%20after%20analysis%0A%09%09%09if%20%28typeof%20onLoadCallback%20%21%3D%3D%20%27function%27%29%20%7B%0A%09%09%09%09AWIN.Tracking.sendDebugEvent%28%7B%0A%09%09%09%09%09severity%3A%20%27warning%27%2C%0A%09%09%09%09%09source%3A%20%7B%20app%3A%20%27AMT%27%2C%20category%3A%20%27scriptAppend%27%20%7D%2C%0A%09%09%09%09%09body%3A%20%7B%0A%09%09%09%09%09%09message%3A%20%27onLoadCallback%20is%20not%20a%20function%20in%20mastertag-sb.%27%2C%0A%09%09%09%09%09%09url%3A%20sScriptSrc%20%7C%7C%20%27inline%20script%27%2C%0A%09%09%09%09%09%09advertiserId%3A%20AWIN.Tracking.iMerchantId%2C%0A%09%09%09%09%09%7D%2C%0A%09%09%09%09%7D%29%3B%0A%09%09%09%7D%0A%0A%09%09%09//%20for%20IE%0A%09%09%09scriptNode.onreadystatechange%20%3D%20function%20%28%29%20%7B%0A%09%09%09%09if%20%28scriptNode.readyState%20%3D%3D%20%27complete%27%20%7C%7C%20scriptNode.readyState%20%3D%3D%20%27loaded%27%29%20%7B%0A%09%09%09%09%09onLoadCallback%28%29%3B%0A%09%09%09%09%7D%0A%09%09%09%7D%3B%0A%0A%09%09%09//%20for%20everything%20elses%0A%09%09%09scriptNode.onload%20%3D%20onLoadCallback%3B%0A%09%09%7D%0A%0A%09%09//%20append%20node%0A%09%09if%20%28sScriptSrc%29%20%7B%0A%09%09%09AWIN.Tracking.Consent.getGdprAppends%28%0A%09%09%09%09tcfVendorId%2C%0A%09%09%09%09AWIN.Tracking.getQueryParameterDelimiter%28scriptNode.src%29%2C%0A%09%09%09%09function%20%28gdprAppends%29%20%7B%0A%09%09%09%09%09scriptNode.src%20+%3D%20gdprAppends%3B%0A%09%09%09%09%09AWIN.Tracking.getScriptAppendNode%28%29.appendChild%28scriptNode%29%3B%0A%09%09%09%09%7D%0A%09%09%09%29%3B%0A%09%09%7D%20else%20%7B%0A%09%09%09AWIN.Tracking.getScriptAppendNode%28%29.appendChild%28scriptNode%29%3B%0A%09%09%7D%0A%0A%09%09return%20scriptNode%3B%0A%09%7D%3B%0A%09var%20frameAppend%20%3D%20function%20%28sFrameSrc%2C%20tcfVendorId%29%20%7B%0A%09%09if%20%28document.getElementsByTagName%28%27body%27%29%5B0%5D%29%20%7B%0A%09%09%09AWIN.Tracking.Consent.getGdprAppends%28%0A%09%09%09%09tcfVendorId%2C%0A%09%09%09%09AWIN.Tracking.getQueryParameterDelimiter%28sFrameSrc%29%2C%0A%09%09%09%09function%20%28gdprAppends%29%20%7B%0A%09%09%09%09%09sFrameSrc%20+%3D%20gdprAppends%3B%0A%0A%09%09%09%09%09var%20iframe%20%3D%20document.createElement%28%27iframe%27%29%3B%0A%09%09%09%09%09iframe.setAttribute%28%27aria-hidden%27%2C%20%27true%27%29%3B%0A%09%09%09%09%09iframe.src%20%3D%20sFrameSrc%3B%0A%09%09%09%09%09document.getElementsByTagName%28%27body%27%29%5B0%5D.appendChild%28iframe%29%3B%0A%09%09%09%09%09//%20AWIN.Tracking.hideElement%28iframe%29%3B%20//%20not%20needed%2C%20iframe%20is%20hidden%20already%0A%09%09%09%09%7D%0A%09%09%09%29%3B%0A%09%09%7D%0A%09%7D%3B%0A%09var%20pixelAppend%20%3D%20function%20%28sImageSrc%2C%20tcfVendorId%29%20%7B%0A%09%09if%20%28document.getElementsByTagName%28%27body%27%29%5B0%5D%29%20%7B%0A%09%09%09AWIN.Tracking.Consent.getGdprAppends%28%0A%09%09%09%09tcfVendorId%2C%0A%09%09%09%09AWIN.Tracking.getQueryParameterDelimiter%28sImageSrc%29%2C%0A%09%09%09%09function%20%28gdprAppends%29%20%7B%0A%09%09%09%09%09sImageSrc%20+%3D%20gdprAppends%3B%0A%0A%09%09%09%09%09var%20image%20%3D%20document.createElement%28%27img%27%29%3B%0A%09%09%09%09%09image.setAttribute%28%27aria-hidden%27%2C%20%27true%27%29%3B%0A%09%09%09%09%09image.src%20%3D%20sImageSrc%3B%0A%09%09%09%09%09document.getElementsByTagName%28%27body%27%29%5B0%5D.appendChild%28image%29%3B%0A%09%09%09%09%09//%20AWIN.Tracking.hideElement%28image%29%3B%20//%20not%20needed%2C%20iframe%20is%20hidden%20already%0A%09%09%09%09%7D%0A%09%09%09%29%3B%0A%09%09%7D%0A%09%7D%3B%0A%09var%20getQueryParameterDelimiter%20%3D%20function%20%28currentUrl%29%20%7B%0A%09%09return%20currentUrl.indexOf%28%27%3F%27%29%20%3D%3D%3D%20-1%20%3F%20%27%3F%27%20%3A%20%27%26%27%3B%0A%09%7D%3B%0A%09var%20buildQueryString%20%3D%20function%20%28params%29%20%7B%0A%09%09var%20bits%20%3D%20%5B%5D%3B%0A%09%09for%20%28var%20name%20in%20params%29%20%7B%0A%09%09%09if%20%28params.hasOwnProperty%28name%29%29%20%7B%0A%09%09%09%09bits.push%28name%20+%20%27%3D%27%20+%20encodeURIComponent%28params%5Bname%5D%29%29%3B%0A%09%09%09%7D%0A%09%09%7D%0A%09%09return%20bits.join%28%27%26%27%29%3B%0A%09%7D%3B%0A%09var%20getScriptAppendNode%20%3D%20function%20%28%29%20%7B%0A%09%09return%20document.body%3B%0A%09%7D%3B%0A%09var%20getBasketData%20%3D%20function%20%28%29%20%7B%0A%09%09return%20payload.plugin.basket%20%7C%7C%20%5B%5D%3B%0A%09%7D%3B%0A%09var%20getAffiliateId%20%3D%20function%20%28%29%20%7B%0A%09%09return%20payload.plugin.publisherId%3B%0A%09%7D%3B%0A%09var%20_getAWCValue%20%3D%20function%20%28%29%20%7B%0A%09%09return%20payload.plugin.awc%3B%0A%09%7D%3B%0A%0A%09var%20Consent%20%3D%20%7B%7D%3B%0A%0A%09%28function%20%28awinTrackingConsent%29%20%7B%0A%09%09//%20if%20we%20locate%20the%20CMP%20iframe%20we%20will%20reference%20it%20with%20this%0A%09%09var%20cmpFrame%3B%0A%0A%09%09%28function%20%28%29%20%7B%0A%09%09%09//%20start%20here%20at%20our%20window%0A%09%09%09var%20frame%20%3D%20window%3B%0A%0A%09%09%09//%20map%20of%20calls%0A%09%09%09var%20cmpCallbacks%20%3D%20%7B%7D%3B%0A%09%09%09while%20%28frame%29%20%7B%0A%09%09%09%09try%20%7B%0A%09%09%09%09%09/**%0A%09%09%09%09%09%20*%20throws%20a%20reference%20error%20if%20no%20frames%20exist%0A%09%09%09%09%09%20*/%0A%09%09%09%09%09if%20%28frame.frames%5B%27__tcfapiLocator%27%5D%29%20%7B%0A%09%09%09%09%09%09cmpFrame%20%3D%20frame%3B%0A%09%09%09%09%09%09break%3B%0A%09%09%09%09%09%7D%0A%09%09%09%09%7D%20catch%20%28ignore%29%20%7B%7D%0A%09%09%09%09if%20%28frame%20%3D%3D%3D%20window.top%29%20%7B%0A%09%09%09%09%09break%3B%0A%09%09%09%09%7D%0A%09%09%09%09frame%20%3D%20frame.parent%3B%0A%09%09%09%7D%0A%0A%09%09%09/**%0A%09%09%09%20*%20Set%20up%20a%20__tcfapi%20proxy%20method%20to%20do%20the%20postMessage%20and%20map%20the%20callback.%0A%09%09%09%20*%20From%20the%20caller%27s%20perspective%2C%20this%20function%20behaves%20identically%20to%20the%0A%09%09%09%20*%20CMP%20API%27s%20__tcfapi%20call%0A%09%09%09%20*/%0A%09%09%09window.__tcfapi%20%3D%20function%20%28cmd%2C%20version%2C%20callback%2C%20arg%29%20%7B%0A%09%09%09%09if%20%28%21cmpFrame%29%20%7B%0A%09%09%09%09%09callback%28%7B%20msg%3A%20%27CMP%20not%20found%27%20%7D%2C%20false%29%3B%0A%09%09%09%09%7D%20else%20%7B%0A%09%09%09%09%09var%20callId%20%3D%20Math.random%28%29%20+%20%27%27%3B%0A%09%09%09%09%09var%20msg%20%3D%20%7B%0A%09%09%09%09%09%09__tcfapiCall%3A%20%7B%0A%09%09%09%09%09%09%09command%3A%20cmd%2C%0A%09%09%09%09%09%09%09parameter%3A%20arg%2C%0A%09%09%09%09%09%09%09version%3A%20version%2C%0A%09%09%09%09%09%09%09callId%3A%20callId%2C%0A%09%09%09%09%09%09%7D%2C%0A%09%09%09%09%09%7D%3B%0A%0A%09%09%09%09%09/**%0A%09%09%09%09%09%20*%20map%20the%20callback%20for%20lookup%20on%20response%0A%09%09%09%09%09%20*/%0A%09%09%09%09%09cmpCallbacks%5BcallId%5D%20%3D%20callback%3B%0A%09%09%09%09%09cmpFrame.postMessage%28msg%2C%20%27*%27%29%3B%0A%09%09%09%09%7D%0A%09%09%09%7D%3B%0A%0A%09%09%09function%20postMessageHandler%28event%29%20%7B%0A%09%09%09%09/**%0A%09%09%09%09%20*%20when%20we%20get%20the%20return%20message%2C%20call%20the%20mapped%20callback%0A%09%09%09%09%20*/%0A%09%09%09%09var%20json%20%3D%20%7B%7D%3B%0A%0A%09%09%09%09try%20%7B%0A%09%09%09%09%09/**%0A%09%09%09%09%09%20*%20if%20this%20isn%27t%20valid%20JSON%20then%20this%20will%20throw%20an%20error%0A%09%09%09%09%09%20*/%0A%09%09%09%09%09json%20%3D%20typeof%20event.data%20%3D%3D%3D%20%27string%27%20%3F%20JSON.parse%28event.data%29%20%3A%20event.data%3B%0A%09%09%09%09%7D%20catch%20%28ignore%29%20%7B%7D%0A%0A%09%09%09%09var%20payload%20%3D%20json.__tcfapiReturn%3B%0A%09%09%09%09if%20%28payload%29%20%7B%0A%09%09%09%09%09/**%0A%09%09%09%09%09%20*%20messages%20we%20care%20about%20will%20have%20a%20payload%0A%09%09%09%09%09%20*/%0A%09%09%09%09%09if%20%28typeof%20cmpCallbacks%5Bpayload.callId%5D%20%3D%3D%3D%20%27function%27%29%20%7B%0A%09%09%09%09%09%09/**%0A%09%09%09%09%09%09%20*%20call%20the%20mapped%20callback%20and%20then%20remove%20the%20reference%0A%09%09%09%09%09%09%20*/%0A%0A%09%09%09%09%09%09cmpCallbacks%5Bpayload.callId%5D%28payload.returnValue%2C%20payload.success%29%3B%0A%09%09%09%09%09%09cmpCallbacks%5Bpayload.callId%5D%20%3D%20null%3B%0A%09%09%09%09%09%7D%0A%09%09%09%09%7D%0A%09%09%09%7D%0A%09%09%09window.addEventListener%28%27message%27%2C%20postMessageHandler%2C%20false%29%3B%0A%09%09%7D%29%28%29%3B%0A%0A%09%09awinTrackingConsent.isCmpPresentOnPage%20%3D%20function%20%28%29%20%7B%0A%09%09%09return%20typeof%20cmpFrame%20%21%3D%3D%20%27undefined%27%3B%0A%09%09%7D%3B%0A%0A%09%09awinTrackingConsent.getGdprAppends%20%3D%20function%20%28tcfVendorId%2C%20delimiter%2C%20callback%29%20%7B%0A%09%09%09if%20%28tcfVendorId%29%20%7B%0A%09%09%09%09//%20prepare%20for%20no%20CMP%20and%20errors%0A%09%09%09%09var%20fallbackAppend%20%3D%20delimiter%20+%20%27gdpr%3D%24%7BGDPR%7D%26gdpr_consent%3D%24%7BGDPR_CONSENT_%27%20+%20tcfVendorId%20+%20%27%7D%27%3B%0A%0A%09%09%09%09//%20cmp%20found%2C%20asking%20__tcfapi%20for%20a%20consent%20string%20for%20this%20vendorId%0A%09%09%09%09if%20%28AWIN.Tracking.Consent.isCmpPresentOnPage%28%29%29%20%7B%0A%09%09%09%09%09try%20%7B%0A%09%09%09%09%09%09__tcfapi%28%0A%09%09%09%09%09%09%09%27getTCData%27%2C%0A%09%09%09%09%09%09%092%2C%0A%09%09%09%09%09%09%09function%20%28tcData%2C%20success%29%20%7B%0A%09%09%09%09%09%09%09%09var%20appends%20%3D%20delimiter%3B%0A%09%09%09%09%09%09%09%09if%20%28tcData%20%26%26%20success%29%20%7B%0A%09%09%09%09%09%09%09%09%09if%20%28typeof%20tcData.gdprApplies%20%21%3D%3D%20%27undefined%27%29%20%7B%0A%09%09%09%09%09%09%09%09%09%09if%20%28tcData.gdprApplies%29%20%7B%0A%09%09%09%09%09%09%09%09%09%09%09appends%20+%3D%20%27gdpr%3D1%27%3B%0A%09%09%09%09%09%09%09%09%09%09%7D%20else%20%7B%0A%09%09%09%09%09%09%09%09%09%09%09appends%20+%3D%20%27gdpr%3D0%27%3B%0A%09%09%09%09%09%09%09%09%09%09%7D%0A%09%09%09%09%09%09%09%09%09%09appends%20+%3D%20%27%26gdpr_consent%3D%27%20+%20tcData.tcString%3B%0A%09%09%09%09%09%09%09%09%09%09callback%28appends%29%3B%0A%09%09%09%09%09%09%09%09%09%09return%3B%0A%09%09%09%09%09%09%09%09%09%7D%0A%09%09%09%09%09%09%09%09%7D%0A%09%09%09%09%09%09%09%09//%20no%20data%2C%20no%20success%20or%20missing%20tcData.gdprApplies%0A%09%09%09%09%09%09%09%09callback%28fallbackAppend%29%3B%0A%09%09%09%09%09%09%09%7D%2C%0A%09%09%09%09%09%09%09%5BtcfVendorId%5D%0A%09%09%09%09%09%09%29%3B%0A%09%09%09%09%09%7D%20catch%20%28err%29%20%7B%0A%09%09%09%09%09%09callback%28fallbackAppend%29%3B%0A%09%09%09%09%09%7D%0A%09%09%09%09%7D%20else%20%7B%0A%09%09%09%09%09//%20no%20CMP%20found%0A%09%09%09%09%09callback%28fallbackAppend%29%3B%0A%09%09%09%09%7D%0A%09%09%09%7D%20else%20%7B%0A%09%09%09%09//%20no%20vendorId%20provided%0A%09%09%09%09callback%28%27%27%29%3B%0A%09%09%09%7D%0A%09%09%7D%3B%0A%09%7D%29%28Consent%29%3B%0A%0A%09var%20publicObject%20%3D%20%7B%0A%09%09//%20functions%0A%09%09fetchZxParam%3A%20fetchZxParam%2C%0A%09%09scriptAppend%3A%20scriptAppend%2C%0A%09%09frameAppend%3A%20frameAppend%2C%0A%09%09pixelAppend%3A%20pixelAppend%2C%0A%09%09getQueryParameterDelimiter%3A%20getQueryParameterDelimiter%2C%0A%09%09buildQueryString%3A%20buildQueryString%2C%0A%09%09getScriptAppendNode%3A%20getScriptAppendNode%2C%0A%09%09getBasketData%3A%20getBasketData%2C%0A%09%09getAffiliateId%3A%20getAffiliateId%2C%0A%09%09_getAWCValue%3A%20_getAWCValue%2C%0A%09%09Consent%3A%20Consent%2C%0A%0A%09%09//%20Awin%20properties%0A%09%09Sale%3A%20payload.plugin.sale%2C%0A%09%09iMerchantId%3A%20payload.plugin.advertiserId%2C%20//%20can%20be%20added%20without%20configuration%0A%09%09sProtocol%3A%20payload.plugin.protocol%2C%20//%20can%20be%20added%20without%20configuration%0A%0A%09%09//%20new%20access%20property%0A%09%09context%3A%20%7B%0A%09%09%09plugin%3A%20payload.plugin%2C%0A%09%09%09advertiser%3A%20payload.advertiser%2C%0A%09%09%09location%3A%20payload.plugin.location%2C%0A%09%09%7D%2C%0A%09%7D%3B%0A%0A%09AWIN.sProtocol%20%3D%20payload.plugin.protocol%3B%0A%09publicObject%5BpluginName%5D%20%3D%20payload.advertiser.config%3B%0A%09return%20publicObject%3B%0A%7D%29%28AWIN.pluginName%2C%20AWIN.payload%29%3B%0A") + "\n" + unescape(e) + "<\/script></body>"
              , a = document.createElement("iframe");
            a.setAttribute("aria-hidden", "true"),
            a.srcdoc = t,
            a.sandbox = "allow-scripts",
            a.id = "awin-plugin-" + n,
            document.body.appendChild(a),
            AWIN.Tracking.hideElement(a)
        },
        fetchPayload: r
    }
}(),
AWIN.SaleQueryStringBuilder = function() {
    var e = {};
    return {
        addParameter: function(n, r) {
            e[n] = r
        },
        getQueryString: function() {
            var n = [];
            for (var r in e)
                n.push(r + "=" + e[r]);
            return n.length > 0 ? "&" + n.join("&") : ""
        }
    }
}(),
function(e) {
    e.sendDebugEvent = function(e, n) {
        if ("function" == typeof navigator.sendBeacon)
            try {
                "string" == typeof e && (e = JSON.parse(e)),
                e.body.isIE = (r = navigator.userAgent,
                /Trident|MSIE/.test(r)),
                e.body.isSale = void 0 !== AWIN.Tracking.Sale,
                e.body.hasAwc = AWIN.Tracking.getAWCookies().length > 0,
                e.body.isLandingPage = !!AWIN.Tracking._getAWCValue(),
                n && (e.body.error = function(e) {
                    return "string" == typeof e ? e : "object" == typeof e && e.hasOwnProperty("message") ? e.message : "Unknown error"
                }(n)),
                navigator.sendBeacon("https://www.wepowerconnections.com/dbg", JSON.stringify(e))
            } catch (e) {}
        var r
    }
}(AWIN.Tracking),
AWIN.Tracking.aScripts = [],
AWIN.Tracking.iMerchantId = 17652,
AWIN.enhancedTracking = !0;
try {
    AWIN.Tracking.AdvancedClickStorage = function() {
        var e = {
            removeExpiredItems: function(e) {
                var n = !1;
                if (!e || 0 === e.length)
                    return n;
                for (var r in e)
                    new Date(e[r].expires) < Date.now() && (delete e[r],
                    n = !0);
                return n
            },
            addObjToList: function(e, n, r) {
                var t = new Date;
                r ? t.setTime(t.getTime() + 1e3 * r) : t.setTime(t.getTime() + 31536e6);
                var a = {
                    value: n,
                    expires: t.toGMTString()
                };
                if (e) {
                    var i, c = !1;
                    for (i = 0; i < e.length; i++)
                        if (e[i].value === n) {
                            e[i] = a,
                            c = !0;
                            break
                        }
                    c || e.push(a)
                } else
                    e = [a];
                return e
            },
            buildObj: function(e, n) {
                var r = new Date;
                return n ? r.setTime(r.getTime() + 1e3 * n) : r.setTime(r.getTime() + 31536e6),
                {
                    value: e,
                    expires: r.toGMTString()
                }
            }
        }
          , n = function() {
            var n = "cache-awc";
            function r(r) {
                var t = "/" + r + ".json";
                return new Promise((function(r, a) {
                    caches.open(n).then((function(n) {
                        n.match(t).then((function(i) {
                            if (!i)
                                return r({});
                            i.clone().json().then((function(a) {
                                a && (removed = e.removeExpiredItems(a),
                                removed && n.put(t, new Response(JSON.stringify(a)))),
                                r(a)
                            }
                            )).catch(a)
                        }
                        )).catch(a)
                    }
                    )).catch(a)
                }
                ))
            }
            return {
                set: function(t, a, i, c) {
                    var o = "/" + t + ".json";
                    return new Promise((function(s, g) {
                        caches.open(n).then((function(n) {
                            r(t).then((function(r) {
                                r || (r = {});
                                var t = e.buildObj(i, c);
                                r[a] = t,
                                n.put(o, new Response(JSON.stringify(r))),
                                s()
                            }
                            )).catch(g)
                        }
                        )).catch(g)
                    }
                    ))
                },
                get: r
            }
        }()
          , r = function() {
            function n(n) {
                var r = JSON.parse(localStorage.getItem(n));
                return r && e.removeExpiredItems(r) && localStorage.setItem(n, JSON.stringify(r)),
                r
            }
            return {
                set: function(r, t, a, i) {
                    var c = n(r);
                    c || (c = {});
                    var o = e.buildObj(a, i);
                    c[t] = o,
                    localStorage.setItem(r, JSON.stringify(c))
                },
                get: n
            }
        }();
        function t(e, n, r) {
            if (n)
                for (var t in n)
                    n[t].value in e || (e[n[t].value] = {}),
                    e[n[t].value][r] = ""
        }
        return {
            set: function(e, t, a, i) {
                return r.set(e, t, a, i),
                new Promise((function(r, c) {
                    n.set(e, t, a, i).then(r).catch(c)
                }
                ))
            },
            get: function(e, a, i) {
                var c = {};
                if (a) {
                    var o, s = a.split(","), g = !1;
                    if (i) {
                        var A = i.split(",");
                        s.length === A.length && (g = !0)
                    }
                    for (o = 0; o < s.length; o++)
                        if (g) {
                            var l;
                            s[o]in c || (c[s[o]] = {});
                            var d = A[o].split("-");
                            for (l = 0; l < d.length; l++)
                                c[s[o]][d[l]] = ""
                        } else
                            c[s[o]] = {},
                            c[s[o]].ck = ""
                }
                return t(c, r.get(e), "ls"),
                new Promise((function(r, a) {
                    function i(e) {
                        var n = []
                          , r = [];
                        if ("object" == typeof e)
                            for (var t in e) {
                                n.push(t);
                                var a = [];
                                for (var i in e[t])
                                    a.push(i);
                                r.push(a.join("-"))
                            }
                        return {
                            data: n.toString(),
                            storages: r.join(",")
                        }
                    }
                    n.get(e).then((function(e) {
                        t(c, e, "cc"),
                        r(i(c))
                    }
                    )).catch((function() {
                        try {
                            r(i(c))
                        } catch (e) {
                            a(e)
                        }
                    }
                    ))
                }
                ))
            }
        }
    }(),
    AWIN.Tracking.StorageProvider = function() {
        function e(e, n, r) {
            AWIN.Tracking.AdvancedClickStorage && "function" == typeof Promise && AWIN.Tracking.AdvancedClickStorage.set(e, n, r).catch((function() {}
            ))
        }
        return {
            setAWC: function(n, r) {
                e("awc_store", n, r)
            },
            setSn: function(n, r) {
                e("sn_store", n, r)
            },
            get: function(e, n) {
                if ("function" == typeof Promise) {
                    var r = !AWIN.Tracking.Consent.getConsentIsRespected() || AWIN.Tracking.Consent.getConsent();
                    AWIN.Tracking.AdvancedClickStorage.get("sn_store", e).then((function(t) {
                        t.storages && (t.storages.indexOf("cc") > -1 || t.storages.indexOf("ls") > -1) && AWIN.Tracking.Consent.setIsSnCookieAvailable(),
                        r ? AWIN.Tracking.AdvancedClickStorage.get("awc_store", t.data, t.storages).then((function(e) {
                            AWIN.Tracking.awcStorages = e.storages,
                            n(e.data)
                        }
                        )).catch((function() {
                            n(e)
                        }
                        )) : (AWIN.Tracking.awcStorages = t.storages,
                        n(t.data))
                    }
                    )).catch((function() {
                        n(e)
                    }
                    ))
                } else
                    n(e)
            }
        }
    }()
} catch (e) {
    AWIN.Tracking.sendDebugEvent('{"severity":"error","source":{"app":"AMT","category":"plugin"},"body":{"advertiserId":17652,"pluginName":"Advanced Click Storage"}}', e)
}
try {
    AWIN.Tracking.JourneyPath = AWIN.Tracking.JourneyPath || {},
    AWIN.Tracking.JourneyPath.publisherParameters = ["sv_campaign_id", "sv_affiliate_id", "sv_affiliateId", "zxuserid", "aw_affid", "awaid", "awinaffid", "AWPID", "awpubid", "sv_campaign", "awpid", "zxuid", "aw_publisherid", "awinpid"],
    AWIN.Tracking.JourneyPath = function() {
        var e = "https://www.wepowerconnections.com/j"
          , n = "_aw_j_" + AWIN.Tracking.iMerchantId
          , r = 7884e6
          , t = AWIN.Tracking.JourneyPath.publisherParameters || []
          , a = AWIN.Tracking._getBrowserSearchBarUrl()
          , i = {
            buildJourneyId: function() {
                var e = (new Date).getTime();
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(n) {
                    var r = (e + 16 * Math.random()) % 16 | 0;
                    return e = Math.floor(e / 16),
                    ("x" == n ? r : 3 & r | 8).toString(16)
                }
                )) + "-1"
            },
            incrementJourneyCounter: function(e) {
                var n = e.split("-");
                return n[n.length - 1] = parseInt(n[n.length - 1]) + 1,
                n.join("-")
            }
        }
          , c = function() {
            function e(e, n) {
                if (e) {
                    var r = new RegExp(`(?:[&?]|%26|%2526|%3F|%253F)${n}(?:%3D|%253D|=)[\\_\\.\\-a-zA-Z]*(\\d{3,7})(?!\\d)`,"i")
                      , t = e.match(r);
                    if (t && t[0]) {
                        var a = parseInt(t[1]);
                        if (a > 99)
                            return a
                    }
                }
            }
            return {
                getPublisherIdValue: function(n) {
                    for (var r = n.replace(/(\s|%20|%2520)/g, ""), a = 0; a < t.length; a++) {
                        var i = e(r, t[a]);
                        if (i)
                            return {
                                publisherIdSource: t[a],
                                publisherId: i
                            }
                    }
                },
                getClickRefs: function(e) {
                    if (!e)
                        return {};
                    for (var n, r = /[?&](clickRef(?:[2-5]?)?)\s*(=|%3D)\s*([^&#]+)/gi, t = {}, a = 0; null !== (n = r.exec(e)); ) {
                        var i = n[1].toLowerCase().replace("clickref", "")
                          , c = n[3];
                        if (t["clickRef" + i] = c,
                        a++ > 10)
                            break
                    }
                    return t
                }
            }
        }();
        function o(n) {
            var r;
            if (n.journeyId)
                r = n.journeyId;
            else {
                var t = s();
                t && (r = t.id)
            }
            var a = {
                journeyId: r,
                tag: {
                    type: n.touchpointType,
                    subType: n.touchpointSubType,
                    label: n.label
                },
                source: {
                    type: "ADVERTISER",
                    id: AWIN.Tracking.iMerchantId,
                    url: window.location.href
                },
                consentQuery: AWIN.Tracking.Consent.getGdprQuery().slice(1),
                extra: n.extraPayload
            };
            if ("function" == typeof navigator.sendBeacon)
                try {
                    navigator.sendBeacon(e, JSON.stringify(a))
                } catch (e) {
                    console.error(e)
                }
        }
        function s() {
            var e = AWIN.Tracking.getCookiesAsString(new RegExp(n));
            if (e)
                try {
                    return JSON.parse(e)
                } catch (e) {}
        }
        function g(e, t) {
            try {
                var a = JSON.parse(JSON.stringify(e))
            } catch (n) {
                return e
            }
            return a.expiration = t ? Math.floor(((new Date).getTime() + r) / 1e3) : e.expiration,
            AWIN.Tracking.setCookie(n, JSON.stringify(a), a.expiration),
            a
        }
        function A(e) {
            return e ? g(e, !0) : (t = Math.floor(((new Date).getTime() + r) / 1e3),
            a = {
                id: i.buildJourneyId(),
                expiration: t
            },
            AWIN.Tracking.setCookie(n, JSON.stringify(a), t),
            a);
            var t, a
        }
        function l(e, n, r) {
            var t = {
                expirationDate: n.expiration
            };
            if (r)
                for (var a in r)
                    r.hasOwnProperty(a) && (t[a] = r[a]);
            return {
                touchpointType: "LANDING_PAGE",
                touchpointSubType: e,
                label: "",
                extraPayload: t,
                journeyId: n.id
            }
        }
        function d() {
            try {
                if (AWIN.Tracking.Consent.getConsentIsRespected() && !AWIN.Tracking.Consent.getConsent())
                    return;
                var e = s()
                  , r = AWIN.Tracking._getAWCValue()
                  , t = c.getPublisherIdValue(a);
                if (t && function(e, n) {
                    n = A(n);
                    var r = c.getClickRefs(a);
                    0 === Object.keys(r).length && a && a.toLowerCase().indexOf("clickref") > -1 && AWIN.Tracking.sendDebugEvent({
                        severity: "warning",
                        source: {
                            app: "AMT",
                            category: "clickref"
                        },
                        body: {
                            message: 'clickrefs not available, but "clickref" string found in url',
                            url: a,
                            advertiserId: AWIN.Tracking.iMerchantId
                        }
                    }),
                    o(l("PUBLISHER", n, {
                        publisherId: e.publisherId,
                        publisherIdParameter: e.publisherIdSource,
                        clickRefs: r
                    }))
                }(t, e),
                r)
                    AWIN.Tracking.getFlag("allowNewAWCCookie") && function(e, n) {
                        o(l("AWC", n = A(n), {
                            awc: e
                        }))
                    }(r, e);
                else if (AWIN.Tracking.getFlag("allowNewGCLIDCookie")) {
                    var d = AWIN.Tracking._getGCLIDValue()
                      , u = AWIN.Tracking._getAWaidValue();
                    null !== d && null !== u && function(e, n, r) {
                        o(l("GCLID", r = A(r), {
                            awc: "gclid_" + n + "_" + e
                        }))
                    }(d, u, e)
                }
                AWIN.Tracking.Sale && e && (AWIN.SaleQueryStringBuilder.addParameter("j", e.id),
                e.id = i.incrementJourneyCounter(e.id),
                e = g(e, !1)),
                r || AWIN.Tracking.Sale || !e || (p = e,
                AWIN.Tracking.setCookie(n, JSON.stringify(p), p.expiration))
            } catch (e) {
                console.log(e)
            }
            var p
        }
        return d(),
        AWIN.Tracking.TCFPlugin && AWIN.Tracking.TCFPlugin.subscribeToTcData(d),
        document.addEventListener("AdvertiserConsentChanged", (function() {
            d()
        }
        )),
        {
            IDGenerator: i,
            UrlParameterExtractor: c,
            sendTouchpoint: o,
            run: d
        }
    }()
} catch (e) {
    AWIN.Tracking.sendDebugEvent('{"severity":"error","source":{"app":"AMT","category":"plugin"},"body":{"advertiserId":17652,"pluginName":"Awin Journey Path"}}', e)
}
try {
    AWIN.Tracking.ChromeAttribution = function() {
        var e = "https://www.wepowerconnections.com/ara/"
          , n = {
            convertObjectToQueryString: function(e) {
                return Object.keys(e).map((n => n + "=" + e[n])).join("&")
            },
            buildAwcFromGclidParameters: function(e, n) {
                if (null !== e && null !== n)
                    return "gclid_" + n + "_" + e
            },
            sanitizeQueryString: function(e) {
                for (var n = ["l", "tv", "tt", "pv", "cks"], r = e.split("?").slice(1).join("").split("&"), t = r.length - 1; t >= 0; t--)
                    ("undefined" === r[t].split("=")[1] || n.indexOf(r[t].split("=")[0]) > -1) && r.splice(t, 1);
                return r.join("&")
            },
            getRefererWithoutParams: function() {
                return encodeURIComponent(window.location.protocol + "//" + window.location.hostname)
            },
            getAWCCookiesAsString: function() {
                return AWIN.Tracking.cookiesWereSpecifiedByMerchant() ? escape(AWIN.Tracking.Sale.click) : escape(AWIN.Tracking.getCookiesAsString())
            },
            isARAAllowed: function() {
                return document.featurePolicy && document.featurePolicy.allowsFeature && document.featurePolicy.allowsFeature("attribution-reporting")
            }
        };
        function r(n, r) {
            if ("click" !== (n = n.toLowerCase()) && "transaction" !== n)
                throw new Error("Invalid event type");
            var t = document.createElement("img");
            t.setAttribute("attributionsrc", ""),
            t.setAttribute("src", e + n + "?" + r),
            AWIN.Tracking.hideElement(t),
            document.body.appendChild(t)
        }
        function t(e, t, a) {
            var i = {
                awc: e,
                a: t,
                l: a
            };
            r("click", n.convertObjectToQueryString(i) + AWIN.Tracking.Consent.getGdprQuery())
        }
        function a(e) {
            (n.isARAAllowed() || null != e && "" !== e) && r("transaction", n.sanitizeQueryString(AWIN.Tracking.buildSaleUrl()) + "&cks=" + e)
        }
        function i() {
            if (!AWIN.Tracking.Consent.getConsentIsRespected() || AWIN.Tracking.Consent.getConsent()) {
                var e = AWIN.Tracking._getAWCValue();
                if (n.isARAAllowed())
                    if (e) {
                        var r = n.getRefererWithoutParams();
                        t(e, AWIN.Tracking.iMerchantId, r)
                    } else {
                        var i = n.buildAwcFromGclidParameters(AWIN.Tracking._getGCLIDValue(), AWIN.Tracking._getAWaidValue());
                        if (i) {
                            r = n.getRefererWithoutParams();
                            t(i, AWIN.Tracking.iMerchantId, r)
                        }
                    }
                if (AWIN.Tracking.Sale)
                    if (AWIN.Tracking.StorageProvider && !AWIN.Tracking.cookiesWereSpecifiedByMerchant())
                        AWIN.Tracking.StorageProvider.get(AWIN.Tracking.getCookiesAsString(), (function(e) {
                            void 0 === e && (e = n.getAWCCookiesAsString()),
                            a(e)
                        }
                        ));
                    else
                        a(n.getAWCCookiesAsString())
            }
        }
        return i(),
        AWIN.Tracking.TCFPlugin && document.addEventListener("AwinTcfConsentChanged", (function(e) {
            i()
        }
        )),
        document.addEventListener("AdvertiserConsentChanged", (function() {
            i()
        }
        )),
        {
            run: i,
            UtilsModule: n
        }
    }()
} catch (e) {
    AWIN.Tracking.sendDebugEvent('{"severity":"error","source":{"app":"AMT","category":"plugin"},"body":{"advertiserId":17652,"pluginName":"Awin Chrome Attribution"}}', e)
}
try {
    AWIN.Tracking.Mainadv2 = AWIN.Tracking.Mainadv || {},
    AWIN.Tracking.Mainadv2.key = "ZX",
    AWIN.Tracking.Mainadv2.token = "ZX-Nike_BR",
    AWIN.Tracking.Mainadv2.pagetype = "generic",
    AWIN.Tracking.Sale ? AWIN.Tracking.Mainadv2.pagetype = "checkout" : document.location.href.match(/LandingPage\/masculino/i) || document.location.href.match(/LandingPage\/feminino/i) || "category" == google_tag_params.ecomm_pagetype ? AWIN.Tracking.Mainadv2.pagetype = "category" : "yes" == dataLayer[0].displayingProductDetails ? AWIN.Tracking.Mainadv2.pagetype = "product" : "yes" == dataLayer[0].displayingCart ? AWIN.Tracking.Mainadv2.pagetype = "basket" : "yes" == dataLayer[0].displayingHome && (AWIN.Tracking.Mainadv2.pagetype = "home")
} catch (e) {
    AWIN.Tracking.sendDebugEvent('{"severity":"error","source":{"app":"AMT","category":"plugin-config"},"body":{"advertiserId":17652,"pluginName":"Mainadv2","pluginId":165}}', e)
}
try {
    AWIN.Tracking.Mainadv2 = AWIN.Tracking.Mainadv2 || {},
    AWIN.Tracking.Mainadv2.url = AWIN.sProtocol + "www.mainadv.com/retargeting/live/zanox_rtg.aspx",
    function(e) {
        var n = e.pagetype;
        AWIN.Tracking.Sale ? n = "checkout" : AWIN.Tracking.Product && (n = "product"),
        AWIN.Tracking.Mainadv2.url += "?" + AWIN.Tracking.buildQueryString({
            Key: e.key,
            visitorIp: e.token,
            pageType: n
        }),
        AWIN.Tracking.frameAppend(AWIN.Tracking.Mainadv2.url)
    }(AWIN.Tracking.Mainadv2)
} catch (e) {
    AWIN.Tracking.sendDebugEvent('{"severity":"error","source":{"app":"AMT","category":"plugin"},"body":{"advertiserId":17652,"pluginName":"Mainadv2","pluginId":165}}', e)
}
try {
    AWIN.Tracking.Soreto = AWIN.Tracking.Soreto || {},
    AWIN.Tracking.Soreto.identifier = "17652"
} catch (e) {
    AWIN.Tracking.sendDebugEvent('{"severity":"error","source":{"app":"AMT","category":"plugin-config"},"body":{"advertiserId":17652,"pluginName":"Soreto","pluginId":231}}', e)
}
try {
    AWIN.Tracking.Soreto = AWIN.Tracking.Soreto || {},
    AWIN.Tracking.Soreto.url = AWIN.Tracking.Soreto.url || AWIN.sProtocol + "assets.soreto.com/scripts/soreto.min.js",
    function(e) {
        if (void 0 !== e.identifier) {
            var n = {
                Client: {},
                User: {},
                affiliate: "AWIN"
            };
            n.Client.id = AWIN.Tracking.Soreto.identifier,
            AWIN.Tracking.Sale ? (n.Order = {},
            n.Order.id = AWIN.Tracking.Sale.orderRef,
            n.Order.total = AWIN.Tracking.Sale.amount,
            n.Order.voucher = AWIN.Tracking.Sale.voucher,
            n.Order.currency = AWIN.Tracking.Sale.currency,
            n.Order.parts = AWIN.Tracking.Sale.parts,
            n.Order.channel = AWIN.Tracking.Sale.channel,
            n.Order.basket = function() {
                var e = AWIN.Tracking.fetchZxParam("products") || AWIN.Tracking.getBasketData();
                "string" == typeof e && (e = JSON.parse(e));
                for (var n = 0; n < e.length; n++)
                    e[n].id = void 0 !== e[n].identifier ? e[n].identifier : e[n].id,
                    delete e[n].identifier;
                return e
            }(),
            n.testMode = "1" === AWIN.Tracking.Sale.test,
            n.sourceTag = "CONFIRMATION_PAGE") : n.sourceTag = "DYNAMIC",
            window.SORETO = n,
            window.SORETO_SCRIPT_LOADED ? window.SoretoJS && SoretoJS.default.reInit() : (AWIN.Tracking.scriptAppend(e.url),
            window.SORETO_SCRIPT_LOADED = !0)
        }
    }(AWIN.Tracking.Soreto)
} catch (e) {
    AWIN.Tracking.sendDebugEvent('{"severity":"error","source":{"app":"AMT","category":"plugin"},"body":{"advertiserId":17652,"pluginName":"Soreto","pluginId":231}}', e)
}
"yes" == AWIN.Tracking.getQueryVarValue("awin_tntc", document.location.search.substring(1)) && (AWIN.enhancedTracking = !0),
AWIN.Tracking.StorageProvider ? AWIN.Tracking.StorageProvider.get(AWIN.Tracking.getCookiesAsString(), (function(e) {
    AWIN.Tracking.run(e)
}
)) : AWIN.Tracking.run(),
AWIN.Tracking.runAWCAnalyticsCheck();

