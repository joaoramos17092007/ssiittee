!function(e) {
    function t(r) {
        if (n[r])
            return n[r].exports;
        var i = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(i.exports, i, i.exports, t),
        i.loaded = !0,
        i.exports
    }
    var n = {};
    return t.m = e,
    t.c = n,
    t.p = "",
    t(0)
}([function(e, t, n) {
    function r() {
        n(35),
        n(36).isTesting || (n(9).main(),
        n(14).main(),
        n(13).main(),
        n(15).main())
    }
    r()
}
, function(e, t, n) {
    var r = n(3)
      , i = n(17)
      , o = n(20);
    e.exports = {
        observe: o.observe,
        domReady: i.domReady,
        addEventListener: i.addEventListener,
        on: i.addEventListener,
        wrap: r.wrap,
        never: r.never,
        isTrue: r.isTrue,
        empty: r.empty,
        and: r.and,
        fireAfter: r.fireAfter,
        fireEvery: r.fireEvery,
        identity: r.identity
    }
}
, function(e, t, n) {
    for (var r = n(3), i = "DataLayer", o = i.split("."), a = window || {}, u = 0; u < o.length; u++)
        "undefined" == typeof a[o[u]] && (a[o[u]] = {}),
        a = a[o[u]];
    var s = typeof a.loaded;
    switch (s) {
    case "undefined":
        a.loaded = r.identity();
        break;
    case "boolean":
        var c = !a.loaded;
        a.loaded = r.identity(),
        c && a.loaded();
        break;
    default:
        a.loaded = r.identity(),
        a.loaded()
    }
    a.loaded.triggers(function() {
        a.__meta && console.log("Dl Loaded")
    }),
    e.exports = a
}
, function(e, t, n) {
    function r(e, t) {
        var n = this;
        n.sigId = h(),
        n.fireCount = 0,
        n.triggerCount = 0,
        n.noFire = !1,
        n.out = {},
        n.tag = "",
        n.threshold = {
            lower: 0,
            upper: 1 / 0
        },
        n.filters = {
            threshold: function() {
                return !(n.fireCount >= n.threshold.upper || n.triggerCount <= n.threshold.lower)
            }
        },
        n.dependency = {},
        n.lastFire = {
            date: null,
            value: null
        },
        n.errorSignal = !1,
        e || (e = function() {}
        );
        var r = function() {
            n.triggerCount++;
            var r;
            try {
                r = e.apply(t || this, arguments)
            } catch (i) {
                throw n.errorSignal && n.errorSignal(i),
                i
            }
            for (var o in n.filters)
                if (n.filters.hasOwnProperty(o)) {
                    var a = n.filters[o](r);
                    if (!a)
                        return r
                }
            if (n.lastFire.date = new Date,
            n.lastFire.value = r,
            n.fireCount++,
            !n.noFire)
                for (var u in n.out)
                    n.out.hasOwnProperty(u) && n.out[u].signalRun(n.sigId, r);
            return r
        };
        return r.tag = function() {
            return n.tag
        }
        ,
        r.setTag = function(e) {
            n.tag = e
        }
        ,
        r.error = function() {
            return n.errorSignal || (n.errorSignal = d()),
            n.errorSignal
        }
        ,
        r.suspendFiring = function() {
            n.noFire = !0
        }
        ,
        r.resumeFiring = function() {
            n.noFire = !1
        }
        ,
        r.hasFired = function() {
            return n.fireCount > 0
        }
        ,
        r.lastFiring = function() {
            return n.lastFire
        }
        ,
        r.setLastFiring = function(e) {
            return n.lastFire.date = e.date,
            n.lastFire.value = e.value,
            r
        }
        ,
        r.addDependency = function(e, t) {
            e instanceof Array || (e = [e]);
            for (var i, o = [], a = 0; i = e[a]; a++)
                i = s(i),
                o.push(i.getID()),
                n.dependency[i.getID()] || (r.triggeredBy(i),
                n.dependency[i.getID()] = i);
            return r.filter(function() {
                for (var e, r = 0; e = o[r]; r++) {
                    var i = n.dependency[e].lastFiring()
                      , a = null !== i && null !== i.date;
                    if (!a || t && !t(i.value))
                        return !1
                }
                return !0
            }),
            r
        }
        ,
        r.signalRun = function(e, t) {
            r.apply(n, [t])
        }
        ,
        r.wrapped = !0,
        r.resetFired = function(e) {
            return n.fireCount = e || 0,
            r
        }
        ,
        r.getID = function() {
            return n.sigId
        }
        ,
        r.limit = function(e) {
            return n.threshold.upper = e,
            r
        }
        ,
        r.minTriggers = function(e) {
            return n.threshold.lower = e,
            r
        }
        ,
        r.filter = function(e) {
            return e = s(e),
            n.filters[e.getID()] = e,
            r
        }
        ,
        r.removeFilter = function(e) {
            return e = s(e),
            delete n.filters[e.getID()],
            r
        }
        ,
        r.removeTrigger = function(e) {
            return e = s(e),
            delete n.out[e.getID()],
            e
        }
        ,
        r.triggers = function(e) {
            return e = s(e),
            n.out[e.getID()] = e,
            e
        }
        ,
        r.triggeredBy = function(e) {
            return e = s(e),
            e.triggers(r),
            e
        }
        ,
        r.swapFunction = function(t) {
            return e = t,
            r
        }
        ,
        r.func = function() {
            return e
        }
        ,
        r.setScope = function(e) {
            t = e
        }
        ,
        r.bindCallback = function(e) {
            r.triggers(function() {
                Array.prototype.unshift.apply(arguments, [null]),
                e.apply(null, arguments)
            }),
            r.error().triggers(e)
        }
        ,
        r.asPromise = function() {
            return new Promise(function(e, t) {
                r.triggers(e),
                r.error().triggers(t)
            }
            )
        }
        ,
        r
    }
    function i(e, t) {
        var n = d();
        n.addDependency(e, t),
        n();
        var r = d();
        return r(),
        n.triggers(function() {
            r.setLastFiring({
                date: null,
                value: null
            })
        }),
        r.filter(function() {
            return !n.hasFired()
        }),
        r
    }
    function o(e, t, n) {
        for (var r = f(), i = [], o = 0; o < e.length; o++)
            i.push(s(e[o], n));
        r.addDependency(e, t);
        var a = s(function() {
            for (var e, t = {}, n = 0; e = i[n]; n++)
                t = p(e.lastFiring().value, t);
            return t
        });
        return a.triggeredBy(r),
        a
    }
    function a(e, t, n) {
        var r = t ? s(t, n) : f();
        return setTimeout(r, e),
        r
    }
    function u(e, t, n) {
        var r = t ? s(t, n) : f()
          , i = setInterval(r, e);
        return r.stop = function() {
            clearInterval(i)
        }
        ,
        r
    }
    function s(e, t) {
        if ("undefined" == typeof e && (e = function() {}
        ),
        e.wrapped)
            return e;
        var n = w(m, e);
        if (n > -1)
            return y[n];
        var i = new r(e,t);
        return m.push(e),
        y.push(i),
        i
    }
    function c(e, t) {
        var n = d();
        return n.triggers(s(e, t)),
        n
    }
    function f() {
        return s(function() {})
    }
    function d() {
        return s(function(e) {
            return e
        })
    }
    function l(e) {
        return s(function() {
            return e
        })
    }
    for (var p = n(19), g = [], v = 0; v < 256; v++)
        g[v] = (v + 256).toString(16).substr(1);
    var h = function() {
        for (var e, t = "", n = 0; n < 16; n++)
            0 === (3 & n) && (e = 4294967296 * Math.random()),
            t += g[e >>> ((3 & n) << 3) & 255];
        return t
    }
      , m = []
      , y = []
      , w = function(e, t, n) {
        if (Array.prototype.indexOf)
            return e.indexOf(t, n);
        for (var r = n || 0, i = e.length; r < i; r++)
            if (e[r] === t)
                return r;
        return -1
    }
      , x = function(e, t) {
        var n = s(e, t);
        return n.filter(function(e) {
            return !!e
        }),
        n
    };
    e.exports = {
        wrap: s,
        never: i,
        isTrue: x,
        empty: f,
        and: o,
        fireAfter: a,
        fireEvery: u,
        identity: d,
        constant: l,
        isolate: c
    }
}
, function(e, t, n) {
    var r = {
        always: n(26),
        event: n(29),
        cmp_ready: n(28)
    };
    r.run = function(e, t, i, o) {
        var a = {};
        for (var u in r)
            r.hasOwnProperty(u) && (a[u] = r[u]);
        for (u in t)
            t.hasOwnProperty(u) && !a.hasOwnProperty(u) && (a[u] = t[u]);
        n(3);
        n(32)(e, a, i, o)
    }
    ,
    e.exports = r
}
, function(e, t) {
    e.exports.isValid = function() {
        try {
            var e = Math.random().toString().split(".")[1]
              , t = "rm_storage_test_" + e
              , n = ""
              , r = window.localStorage;
            if (void 0 !== r && void 0 !== r.setItem && void 0 !== r.getItem && void 0 !== r.removeItem && "function" == typeof r.setItem && "function" == typeof r.removeItem && "function" == typeof r.getItem)
                return r.setItem(t, e),
                n = r.getItem(t),
                r.removeItem(t),
                n === e
        } catch (i) {
            return !1
        }
        return !1
    }
}
, function(e, t, n) {
    function r() {
        i.publisher = i.publisher || {};
        var e = "*PUBLISHER_ID*";
        return "undefined" == typeof i.publisher.sid && (i.publisher.sid = isNaN(e) ? null : e),
        i.publisher
    }
    var i = n(2);
    e.exports.get = r
}
, function(e, t) {
    e.exports = function(e, t, n, r, i) {
        var o, a, u = t || "img", s = r || !0, c = n || {}, f = "head" === i || "body" === i ? i : "body", d = document.createElement(u), l = document.getElementsByTagName(f)[0] || document.getElementsByTagName("head")[0], p = "http://", g = "https://";
        if (!e)
            return !1;
        if ("img" !== u && "iframe" !== u && "script" !== u)
            return !1;
        "script" === u ? d.type = c.type || "text/javascript" : "iframe" === u ? d.setAttribute("style", "display: none;") : "img" === u && (d.setAttribute("height", "1px"),
        d.setAttribute("width", "1px"),
        d.setAttribute("style", "display: none;"),
        d.setAttribute("alt", "")),
        "boolean" == typeof s && s && (document.location.protocol.indexOf("s") > -1 ? (o = p,
        a = g) : (o = g,
        a = p),
        e = e.replace(o, a)),
        e.indexOf("?") !== -1 && e.indexOf("#") !== -1 || (e += "?");
        for (var v in c)
            c.hasOwnProperty(v) && (e += v + "=" + encodeURIComponent(c[v]) + "&");
        "?" !== e[e.length - 1] && "&" !== e[e.length - 1] || (e = e.slice(0, -1)),
        d.setAttribute("src", e),
        l.appendChild(d)
    }
}
, function(e, t) {
    e.exports.gen = function() {
        var e, t, n = "";
        for (e = 0; e < 32; e++)
            t = 16 * Math.random() | 0,
            8 != e && 12 != e && 16 != e && 20 != e || (n += "-"),
            n += (12 == e ? 4 : 16 == e ? 3 & t | 8 : t).toString(16);
        return n
    }
}
, function(e, t, n) {
    function r(e, t) {
        var n = {
            d: 864e5,
            h: 36e5,
            m: 6e4,
            s: 1e3
        }
          , r = e * (n[t] || 0);
        return (new Date).getTime() + r
    }
    function i() {
        var e = "";
        if ("fpc" === y)
            e = d.get(w);
        else if (f.isValid()) {
            var t = (localStorage.getItem(w) || "").split(":");
            2 === t.length && !isNaN(Number(t[1])) && Number(t[1]) >= (new Date).getTime() && (e = t[0])
        }
        return isNaN(Number(e)) ? 0 : Number(e)
    }
    function o() {
        var e = function(e) {
            try {
                return JSON.parse(v)
            } catch (t) {
                return [{}]
            }
        };
        v = e(v);
        for (var t = function(e) {
            if (e = isNaN(Number(e)) ? 0 : Number(e),
            0 === e)
                return null;
            for (var t = 0; t < v.length; t++)
                if (v[t].i === e)
                    return v[t];
            return null
        }, n = document.location.search.substring(1).split("&"), i = "", o = 0; o < n.length; o++) {
            var a = n[o].split("=");
            if (a[0] === l) {
                i = n[o];
                break
            }
        }
        if ("" === i || i.indexOf("=") === -1 || i.indexOf("=") === i.length)
            return 0;
        var u = {}
          , s = decodeURIComponent(i.split("=")[1]).split(p);
        for (o = 0; o < s.length; o++) {
            var c = s[o].split(g);
            u[c[0]] = 2 === c.length ? c[1] : ""
        }
        var h = t(u.tsid);
        if (null === h)
            return 0;
        var x = r(h.xp, h.xu);
        return "fpc" === y ? d.set(w, h.i.toString(), m, new Date(x)) : f.isValid() && localStorage.setItem(w, h.i + ":" + x),
        h.i || 0
    }
    function a() {
        var e = 0;
        c && c.consent && c.consent.gdpr && c.consent.gdpr.productConsents && c.consent.gdpr.productConsents.cadTrk && (e = o() || i());
        var n = "cti" + h.toString();
        void 0 === window[n] ? window[n] = {
            env: {
                tsid: e
            }
        } : void 0 === window[n].env ? window[n].env = {
            tsid: e
        } : window[n].env.tsid = e,
        t.instance = window[n],
        t.events.pvLogged = x,
        void 0 !== c && void 0 !== c.Sale && void 0 !== c.Sale.Basket && void 0 !== c.Sale.Basket.Ready ? window.setTimeout(function() {
            x(),
            b(c)
        }, 100) : window.setTimeout(function() {
            x()
        }, 100)
    }
    var u = {}
      , s = n(1);
    t.events = {
        run: s.identity()
    };
    var c = n(2)
      , f = n(5)
      , d = n(16)
      , l = "rmatt"
      , p = "|"
      , g = ":"
      , v = '[{"t":1,"i":1088063,"xp":31,"xu":"d"},{"t":3,"i":1088064,"xp":31,"xu":"d"},{"t":7,"i":1088065,"xp":31,"xu":"d"},{"t":10,"i":1088066,"xp":31,"xu":"d"},{"t":8,"i":1088067,"xp":31,"xu":"d"},{"t":9,"i":1088068,"xp":31,"xu":"d"},{"t":4,"i":1088069,"xp":31,"xu":"d"},{"t":2,"i":1088070,"xp":31,"xu":"d"},{"t":6,"i":1088071,"xp":31,"xu":"d"},{"t":5,"i":1088072,"xp":31,"xu":"d"},{"t":3,"i":1113697,"xp":31,"xu":"d"}]'
      , h = 119288
      , m = ""
      , y = "fpls"
      , w = "__rmts"
      , x = s.wrap(function() {
        return !0
    })
      , b = s.wrap(function(e) {});
    s.observe(c, "Sale.Basket.Ready").triggers(function() {
        b(c)
    }),
    e.exports.runTracking = a,
    t.events.logDLSale = b;
    var S = s.wrap(a);
    S.triggers(t.events.run),
    t.events.error = S.error,
    t.main = function() {
        n(4).run([{
            cmp_ready: {}
        }], u, S, {
            name: "tracking",
            version: "1.0",
            id: -2
        })
    }
}
, function(e, t) {
    "use strict";
    function n(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    e.exports = function(e, t, i, o) {
        t = t || "&",
        i = i || "=";
        var a = {};
        if ("string" != typeof e || 0 === e.length)
            return a;
        var u = /\+/g;
        e = e.split(t);
        var s = 1e3;
        o && "number" == typeof o.maxKeys && (s = o.maxKeys);
        var c = e.length;
        s > 0 && c > s && (c = s);
        for (var f = 0; f < c; ++f) {
            var d, l, p, g, v = e[f].replace(u, "%20"), h = v.indexOf(i);
            h >= 0 ? (d = v.substr(0, h),
            l = v.substr(h + 1)) : (d = v,
            l = ""),
            p = decodeURIComponent(d),
            g = decodeURIComponent(l),
            n(a, p) ? r(a[p]) ? a[p].push(g) : a[p] = [a[p], g] : a[p] = g
        }
        return a
    }
    ;
    var r = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
}
, function(e, t) {
    "use strict";
    function n(e, t) {
        if (e.map)
            return e.map(t);
        for (var n = [], r = 0; r < e.length; r++)
            n.push(t(e[r], r));
        return n
    }
    var r = function(e) {
        switch (typeof e) {
        case "string":
            return e;
        case "boolean":
            return e ? "true" : "false";
        case "number":
            return isFinite(e) ? e : "";
        default:
            return ""
        }
    };
    e.exports = function(e, t, a, u) {
        return t = t || "&",
        a = a || "=",
        null === e && (e = void 0),
        "object" == typeof e ? n(o(e), function(o) {
            var u = encodeURIComponent(r(o)) + a;
            return i(e[o]) ? n(e[o], function(e) {
                return u + encodeURIComponent(r(e))
            }).join(t) : u + encodeURIComponent(r(e[o]))
        }).join(t) : u ? encodeURIComponent(r(u)) + a + encodeURIComponent(r(e)) : ""
    }
    ;
    var i = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
      , o = Object.keys || function(e) {
        var t = [];
        for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
        return t
    }
}
, function(e, t, n) {
    "use strict";
    t.decode = t.parse = n(10),
    t.encode = t.stringify = n(11)
}
, function(e, t, n) {
    function r(e) {
        var t = "40168"
          , n = document.createElement("script");
        n.src = "https://tag.dotz.com.br/api/assets/js/libs/dotzcaptureclient_2.0.3.js",
        document.body.appendChild(n),
        n.addEventListener("load", function() {
            if (window.CallDotzTagAPI) {
                for (var e = a.Sale.Basket.orderid, n = a.Sale.Basket.lineitems, r = 0, i = 0; i < n.length; i++)
                    r += Number(n[i].unitPrice) * Number(n[i].quantity);
                CallDotzTagAPI(t, r, e)
            }
        })
    }
    var i = {}
      , o = n(1);
    t.events = {
        run: o.identity()
    },
    i.tracking = n(9);
    var a = n(2)
      , u = o.wrap(r);
    u.triggers(t.events.run),
    t.events.error = u.error,
    t.main = function() {
        n(4).run([{
            always: !0,
            event: [{
                library: "tracking",
                event: "logDLSale"
            }]
        }], i, u, {
            name: "Publisher Tag: Dotz Conversion",
            version: "1.0",
            id: 18502
        })
    }
}
, function(e, t, n) {
    function r(e) {
        var t = window.rakutenDataLayerName || "DataLayer"
          , r = window[t] && window[t].Sale && window[t].Sale.Basket ? window[t].Sale.Basket : {};
        if (r.orderid && r.conversionType)
            return !1;
        var i = !1
          , o = n(7)
          , a = i
          , u = i
          , s = i;
        (a || u || s) && o("https://tag.dotz.com.br/api/assets/js/libs/dotzcaptureclient_2.0.3.js", "script")
    }
    var i = {}
      , o = n(1);
    t.events = {
        run: o.identity()
    };
    var a = o.wrap(r);
    a.triggers(t.events.run),
    t.events.error = a.error,
    t.main = function() {
        n(4).run([{
            always: !0
        }], i, a, {
            name: "Publisher Tag: Dotz Non-Conversion",
            version: "1.0",
            id: 18463
        })
    }
}
, function(e, t, n) {
    function r(e) {
        !function() {
            var e = null
              , t = e
              , n = "rmStore"
              , r = "/"
              , i = "rmStoreGateway"
              , o = !1
              , a = e
              , u = e
              , s = e
              , c = e
              , f = e
              , d = e
              , l = e
              , p = e
              , g = e
              , v = e
              , h = e
              , m = e
              , y = function(e) {
                e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var t = new RegExp("[\\?&]" + e + "=([^&#]*)","i")
                  , n = t.exec(document.location.search + document.location.hash);
                return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
            }
              , w = function(e) {
                return e += "",
                1 === e.length && (e = "0" + e),
                e
            }
              , x = function(e) {
                var t = w(e.getUTCDate())
                  , n = w(e.getUTCMonth() + 1)
                  , r = "" + e.getUTCFullYear()
                  , i = w(e.getUTCHours())
                  , o = w(e.getUTCMinutes());
                return r + n + t + "_" + i + o
            }
              , b = !0;
            g = g ? g : y("ranSiteID") || null,
            v = !v && g ? x(new Date) : v,
            h = h ? h : y("ranU1") || null;
            var S = ["com.au", "gov.uk", "co.uk", "co.nz", "co.jp", "com.br", "com.mx", "ne.jp", "net.au", "com", "org", "edu", "gov", "net", "ca", "de", "jp", "fr", "au", "us", "br", "ru", "ch", "it", "nl", "se", "no", "es", "mil", "asia"]
              , C = function(e, t, n) {
                for (var r = e + "=", i = new RegExp(e + "[0-9]+=.*"), o = document.cookie.split(";"), a = "", u = [], s = "", c = 0; c < o.length; c++) {
                    for (var f = o[c]; " " == f.charAt(0); )
                        f = f.substring(1, f.length);
                    if (t && n && 0 == f.indexOf(e + n + "=")) {
                        var d = e + (n + "") + "=";
                        d = d.length,
                        s = f.substring(d, f.length)
                    }
                    if (t && 0 == f.indexOf(e) && i.test(f)) {
                        f = f.split("=");
                        f.shift().replace(e, "");
                        f = f.join("="),
                        u.push(f)
                    }
                    0 == f.indexOf(r) && (a = f.substring(r.length, f.length))
                }
                return s || u[0] && u || a || ""
            }
              , O = !1
              , I = !1
              , T = function() {
                if (O)
                    return I;
                try {
                    var e = Math.random().toString().split(".")[1]
                      , t = "rm_storage_test_" + e
                      , n = ""
                      , r = window.localStorage;
                    if (void 0 !== r && void 0 !== r.setItem && void 0 !== r.getItem && void 0 !== r.removeItem && "function" == typeof r.setItem && "function" == typeof r.removeItem && "function" == typeof r.getItem)
                        return r.setItem(t, e),
                        n = r.getItem(t),
                        r.removeItem(t),
                        O = !0,
                        I = n === e
                } catch (i) {
                    return O = !0,
                    I = !1,
                    !1
                }
                return O = !0,
                I = !1,
                !1
            }
              , k = function(e) {
                return T() ? window.localStorage.getItem(e) : ""
            }
              , E = function(e) {
                try {
                    return JSON.parse(e)
                } catch (t) {
                    return !1
                }
            }
              , P = function(e, t) {
                return e.slice(-t.length) != t && (e += t),
                e
            }
              , N = function(e) {
                var t = {}
                  , n = o ? "" : C(i, !0, a);
                if (n.length && "string" == typeof n)
                    for (var r = n[0].split("|"), u = {}, s = 0; s < r.length; s++)
                        r.hasOwnProperty(s) && "undefined" != typeof r[s] && "" !== r[s] && null !== r && r[s].split(":")[1] && (u[r[s].split(":")[0]] = r[s].split(":")[1],
                        b = !1);
                if (n.length && "object" == typeof n) {
                    var c = "";
                    if (1 == n.length) {
                        c = n[0];
                        for (var r = n[0].split("|"), u = {}, s = 0; s < r.length; s++)
                            r.hasOwnProperty(s) && "undefined" != typeof r[s] && "" !== r[s] && null !== r && r[s].split(":")[1] && (u[r[s].split(":")[0]] = r[s].split(":")[1],
                            b = !1)
                    } else {
                        for (var f = {}, d = 0; d < n.length; d++) {
                            for (var r = n[d].split("|"), u = {}, s = 0; s < r.length; s++)
                                r.hasOwnProperty(s) && "undefined" != typeof r[s] && "" !== r[s] && null !== r && r[s].split(":")[1] && (u[r[s].split(":")[0]] = r[s].split(":")[1],
                                b = !1);
                            f.ald && u.ald ? Number(f.ald.replace("_", "")) < Number(u.ald.replace("_", "")) && (f = u) : f = u
                        }
                        for (var s in f)
                            f.hasOwnProperty(s) && (c += s + ":" + f[s] + "|");
                        c = c.slice(0, c.length - 1)
                    }
                    n = c
                }
                var l = C(e) + "|" + n;
                "|" == l.slice(-1) && (l = l.slice(0, l.length - 1));
                var p = k(e);
                if (!l && p) {
                    var g = E(p);
                    if (g) {
                        var v = document.location.pathname;
                        for (var h in g)
                            if (g.hasOwnProperty(h) && P(v, "/").match(P(h, "/"))) {
                                l = g[h];
                                break
                            }
                    }
                }
                if (l) {
                    for (; l !== decodeURIComponent(l); )
                        l = decodeURIComponent(l);
                    for (var r = l.split("|"), s = 0; s < r.length; s++)
                        r.hasOwnProperty(s) && "undefined" != typeof r[s] && "" !== r[s] && null !== r && (t[r[s].split(":")[0]] = r[s].split(":")[1])
                }
                return t
            }
              , D = function(e, t, n, r, i) {
                var o = new Date;
                o.setTime(o.getTime() + 24 * i * 60 * 60 * 1e3),
                i = o.toUTCString(),
                t = t || N(e) || {},
                n = n || "",
                r = r || "/";
                var a = "";
                for (var u in t)
                    t.hasOwnProperty(u) && "undefined" != typeof t[u] && "" !== t[u] && null !== t && (a += u + ":" + t[u] + "|");
                if (a = a.slice(0, -1),
                a || (o = new Date,
                o.setTime(o.getTime() + -864e5),
                i = o.toUTCString()),
                document.cookie = e + "=" + a + "; expires=" + i + "; path=" + r + "; domain=" + n + ";",
                T() && window.JSON && window.JSON.stringify && window.JSON.parse && ("." + document.domain).match(n || ".") && 0 === P(window.location.pathname, "/").indexOf(P(r, "/"))) {
                    var s = window.localStorage.getItem(e);
                    s && (rmLocalStorageObj = E(s),
                    rmLocalStorageObj && (s = rmLocalStorageObj)),
                    s = s || {},
                    s[r] = a;
                    var c = !1;
                    for (var u in s)
                        s.hasOwnProperty(u) && "" === s[u] ? delete s[u] : c = !0;
                    c ? window.localStorage.setItem(e, JSON.stringify(s)) : window.localStorage.removeItem(e)
                }
            }
              , R = function(e) {
                var t = ".+." + e + "$";
                return !!document.domain.match(t)
            };
            if (t)
                "string" == typeof t && "." !== t[0] && (t = "." + t);
            else
                for (var _ = 0; _ < S.length; _++)
                    if (R(S[_])) {
                        t = document.domain.split("." + S[_])[0],
                        t = "." + t.split(".")[t.split(".").length - 1] + "." + S[_];
                        break
                    }
            var j = N(n);
            j.amid = a || j.amid,
            j.atm = u || j.atm,
            j.adr = s || j.adr,
            j.acs = c || j.acs,
            j.arto = f || j.arto,
            j.artp = d || j.artp,
            j.artd = l || j.artd,
            j.atr = p || j.atr,
            j.ald = v && b ? v : j.ald,
            j.atrv = g && b ? g : j.atrv,
            j.acv = m || j.acv,
            j.u1 = h || j.u1,
            D(n, j, t, r, 30)
        }()
    }
    var i = {}
      , o = n(1);
    t.events = {
        run: o.identity()
    };
    var a = o.wrap(r);
    a.triggers(t.events.run),
    t.events.error = a.error,
    t.main = function() {
        n(4).run([{
            always: !0
        }], i, a, {
            name: "RAN_40168 ITP2.3 Cookie Set",
            version: "1.0",
            id: 19189
        })
    }
}
, function(e, t) {
    e.exports.get = function(e) {
        for (var t = e + "=", n = document.cookie.split(";"), r = 0; r < n.length; r++) {
            var i = n[r].trim();
            if (i.indexOf(t) > -1 && n[r].length > t.length)
                return n[r].slice(1 + t.length)
        }
        return ""
    }
    ,
    e.exports.set = function(e, t, n, r) {
        var i = new Date((new Date).getTime() + 2592e6);
        r instanceof Date && (i = r),
        ck = e + "=" + t + "; SameSite=lax; path=/; ",
        n && "" !== n && (ck += "domain=" + n + ";"),
        "https:" === document.location.protocol && (ck += "Secure; "),
        ck += "expires=" + i.toUTCString(),
        document.cookie = ck
    }
}
, function(e, t, n) {
    function r(e, t, n) {
        var r = o.wrap(n);
        return document.addEventListener ? e.addEventListener(t, n, !1) : document.attachEvent && e.attachEvent("on" + t, n),
        r
    }
    function i(e, t, n) {
        return n = o.wrap(n),
        document.removeEventListener ? e.removeEventListener(t, n) : document.detachEvent && e.detachEvent(t, n),
        n
    }
    var o = n(3)
      , a = "complete" === document.readyState
      , u = o.wrap(function() {
        return a
    }).filter(function() {
        return a
    });
    if (a)
        u();
    else {
        var s = o.wrap(function(e) {
            return ("readystatechange" !== e.type || "complete" === document.readyState) && (a = !0,
            i(document, "DOMContentLoaded", u),
            i(document, "readystatechange", u),
            i(window, "load", u),
            !0)
        }).limit(1).filter(o.identity());
        s.triggers(u),
        r(document, "DOMContentLoaded", s),
        r(document, "readystatechange", s),
        r(window, "load", s)
    }
    e.exports = {
        addEventListener: r,
        removeEventListener: i,
        domReady: u
    }
}
, function(e, t, n) {
    function r() {
        if (u.geo)
            return u.geo;
        var e = "BR"
          , t = "BRPR";
        u.geo = {},
        "*USE" != e.slice(0, 4) ? (u.geo.country = e,
        u.geo.region = 0 == t.indexOf("*USE") ? null : t) : (u.geo.country = null,
        u.geo.region = null);
        var n = []
          , r = [].concat(navigator.languages || []);
        r.push(navigator.userLanguage || navigator.language || "");
        for (var i = 0; i < r.length; i++) {
            var o = r[i].split("-");
            o.length > 1 && (o = o.splice(1).join("-"),
            o.indexOf(";") < 0 && n.push(o.toUpperCase()))
        }
        return u.geo.languageLocales = n,
        u.geo
    }
    function i() {
        delete u.geo
    }
    function o(e, t, n, r, i) {
        if (!e)
            return "boolean" == typeof r || null === r ? r : null;
        for (var o = 0; o < n.length; o++) {
            var a = n[o];
            if (a) {
                if ("string" == typeof a && ("" + e).toUpperCase() == a)
                    return !0;
                if ("string" != typeof a && a[0] == ("" + e).toUpperCase()) {
                    if (!t)
                        return "boolean" == typeof i || null === i ? i : null;
                    for (var u = a[1], s = 0; s < u.length; s++) {
                        var c = u[s];
                        if (c == ("" + t).toUpperCase())
                            return !0
                    }
                }
            }
        }
        return !1
    }
    function a() {
        if (!u.geo || !u.geo.policies) {
            var e = r()
              , t = {
                gdpr: !1,
                ccpa: !1,
                lgpd: !1
            };
            if (e.country)
                t = {
                    gdpr: o(e.country, e.region, s, !1),
                    ccpa: o(e.country, e.region, c, !1, !1),
                    lgpd: o(e.country, e.region, f, !1, !1)
                };
            else if (e.languageLocales)
                for (var n = 0; n < e.languageLocales.length && (t.gdpr = o(e.languageLocales[n], "", s, !1),
                !t.gdpr); n++)
                    ;
            u.geo.policies = t
        }
        return u.geo.policies
    }
    var u = n(2);
    e.exports.get = r,
    e.exports.reset = i;
    var s = ["DE", "UK", "GB", "FR", "IT", "ES", "ES_TRADNL", "PL", "NL", "RO", "BE", "CZ", "SE", "CH", "HU", "EL", "GR", "PT", "AT", "OE", "DK", "FI", "NO", "SK", "IE", "BG", "HR", "LT", "LV", "SI", "EE", "CY", "LU", "MT", "IS", "LI", "150", "039", "151", "154", "155"]
      , c = [["US", ["CA", "USCA"]]]
      , f = ["BR"];
    e.exports.checkIfPolicyApplies = o,
    e.exports.policies = a
}
, function(e, t) {
    e.exports = function(e, t, n) {
        if (null === e)
            return t;
        if (null === t)
            return e;
        var r = n ? JSON.parse(JSON.stringify(e)) : e
          , i = n ? JSON.parse(JSON.stringify(t)) : t;
        for (var o in r)
            r.hasOwnProperty(o) && !i.hasOwnProperty[o] && (i[o] = r[o]);
        return i
    }
}
, function(e, t, n) {
    function r(e, t) {
        var n = c.indexOf(e);
        if (n !== -1)
            return f[n][t]
    }
    function i(e, t, n) {
        var r = c.indexOf(e);
        r == -1 && (r = c.push(e) - 1),
        f[r] || (f[r] = {}),
        f[r][t] = n
    }
    function o(e, t) {
        var n = s.wrap(function() {
            return e[t]
        });
        if (n.internal = s.wrap(function(r) {
            return n.rebindSubs(e[t], r),
            r
        }),
        n.internal.triggers(n),
        n.internal.lastFiring = "",
        n.internal.filter(function(e) {
            var t = n.internal.lastFiring === e;
            return n.internal.lastFiring = e,
            !t
        }),
        n.internal.setTag(t + "-" + (10 * Math.random()).toFixed(2)),
        n.swapObject = function(t) {
            e = t
        }
        ,
        n.subfields = {},
        n.rebindSubs = function(e, t) {
            if ("object" != typeof e)
                return void (n.subfields = {});
            var r = {};
            for (var i in e)
                e.hasOwnProperty(i) && (r[i] = !0);
            for (var i in n.subfields)
                n.subfields.hasOwnProperty(i) && (r[i] = !0);
            for (var i in r)
                r.hasOwnProperty(i) && n.addSub(i, t)
        }
        ,
        n.addSub = function(r, i) {
            var u = e && "undefined" != typeof e[t] ? e[t] : null
              , s = n.subfields[r] = n.subfields[r] || new o(u,r);
            return s.swapObject(u),
            s.internal.removeTrigger(n.internal),
            a(u, r, s, i),
            s.internal.triggers(n.internal),
            s
        }
        ,
        null !== e && "undefined" != typeof e[t] && "object" == typeof e[t])
            for (var r in e[t])
                e[t].hasOwnProperty(r) && n.addSub(r);
        return n
    }
    function a(e, t, n, a) {
        var u = r(e, t);
        if ("undefined" != typeof u && null != u)
            return u;
        if (n = n || new o(e,t),
        null === e)
            return n;
        var c = e[t]
          , f = typeof e[t]
          , d = function() {
            var e = !!Object.defineProperty;
            try {
                e && Object.defineProperty({}, "a", {
                    get: function() {}
                })
            } catch (t) {
                e = !1
            }
            return e
        };
        if (Object.defineProperty && d())
            Object.defineProperty(e, t, {
                get: function() {
                    return c
                },
                set: function(e) {
                    var r = {
                        type: "update",
                        name: t
                    };
                    "undefined" === f && (r.type = "add"),
                    e !== c && (c = e,
                    n.internal(n.internal.tag() + "_" + (10 * Math.random()).toFixed(2)))
                },
                configurable: !0
            });
        else {
            var l = s.fireEvery(50, function() {
                var n = e[t]
                  , r = {
                    type: "unchanged",
                    name: t
                };
                return "undefined" == typeof n && "undefined" !== f ? r.type = "deleted" : n !== c && (r.type = "update"),
                c = n,
                f = typeof n,
                r
            }).filter(function(e) {
                return "unchanged" !== e.type
            });
            l.triggers(n.internal),
            n.stop = l.stop
        }
        return "undefined" !== f && a !== n.internal.tag() && (a = a || n.internal.tag() + "_" + (10 * Math.random()).toFixed(2),
        n.internal.lastFiring !== a && n.internal(a)),
        i(e, t, n),
        n
    }
    function u(e, t) {
        if ("string" == typeof e && (e = window[e]),
        "undefined" == typeof e)
            throw "Object doesn't exist";
        for (var n = t.split("."), r = a(e, n[0], null), i = 1; i < n.length; i++)
            r = r.addSub(n[i]);
        return r
    }
    var s = n(3)
      , c = []
      , f = [];
    e.exports.observe = u
}
, function(e, t, n) {
    var r = {
        attr_sid: "119288",
        aff_mid: "39887"
    }
      , i = !1;
    if (i) {
        var o = n(6).get();
        !r.aff_sid && o.sid && (r.aff_sid = o.sid)
    }
    e.exports.get = function() {
        return r
    }
    ,
    e.exports.set = function(e) {
        r = e
    }
    ,
    e.exports.getQsp = function() {
        var e = "";
        for (var t in r)
            r.hasOwnProperty(t) && (e = e + t + ":" + r[t] + "|");
        return e.length > 2 ? e.slice(0, -1) : e
    }
    ,
    e.exports.getCid = function(e) {
        return "undefined" !== r[e] ? r[e] : ""
    }
}
, function(e, t, n) {
    function r(e, t) {
        return ("https://consent.linksynergy.com/consent/v1/p?rmch=cs&tp=ccpa&rmids=" + t + "&ccpa=" + e).toLowerCase()
    }
    function i(e) {
        function t(e) {
            if ("string" == typeof e)
                switch (e.toLowerCase()) {
                case "y":
                    return !0;
                case "n":
                    return !1
                }
            return null
        }
        var n = {
            uspString: e,
            version: null,
            notice: null,
            dns: null,
            lspa: null,
            inScope: null
        };
        return c(e) && (n.version = Number(e[0]),
        n.notice = t(e[1]),
        n.dns = t(e[2]),
        n.lspa = t(e[3]),
        "1---" == e ? n.inScope = !1 : n.inScope = !0),
        n
    }
    function o(e) {
        d.consent = d.consent || {},
        d.consent.ccpa = e
    }
    function a() {
        "use strict";
        var e, t = {}, n = "__rmccpa";
        return window.JSON && f.isValid() && (e = window.localStorage.getItem(n) || "",
        "" !== e && (t = JSON.parse(e),
        t.expired = !1,
        t.expire < (new Date).getTime() && (t.expired = !0))),
        t
    }
    function u(e) {
        if (!window.JSON || !f.isValid())
            return !0;
        var t = "__rmccpa"
          , n = a();
        return !(!n.expired && n.uspString == e) && (n = i(e),
        n.expire = (new Date).getTime() + 864e5,
        localStorage.setItem(t, JSON.stringify(n)),
        o(n),
        !0)
    }
    function s(e, t, n) {
        "use strict";
        n() ? t(!0) : e < 1 ? t(!1) : window.setTimeout(function() {
            s(e - 1, t, n)
        }, 100)
    }
    function c(e) {
        if ("string" != typeof e || "" === e)
            return !1;
        var t = /^1+[ynYN\-]{3}$/;
        return t.test(e)
    }
    var f = n(5)
      , d = n(2);
    e.exports.getUrl = r,
    e.exports.explodeUspStringData = i,
    e.exports.getFromStore = a,
    e.exports.isDiff = u,
    e.exports.waitForReady = s,
    e.exports.isValid = c
}
, function(e, t) {
    e.exports.getSignal = function() {
        var e = "1"
          , t = "Y"
          , n = "N"
          , r = "-";
        return e + t.toUpperCase() + n.toUpperCase() + r.toUpperCase()
    }
    ,
    e.exports.isReady = function() {
        return !0
    }
}
, function(e, t, n) {
    function r(e) {
        "use strict";
        var t = function() {
            return e && e.cmpIsGdpr ? "gdpr" : ""
        }
          , n = []
          , r = D.policies();
        return Object.keys(r).forEach(function(e) {
            r[e] && "ccpa" !== e && n.push(e)
        }),
        0 === n.length ? t() || "" : n[0]
    }
    function i(e) {
        var t = [];
        return Object.keys(e).forEach(function(n) {
            t.push(e[n])
        }),
        t
    }
    function o(e, t, n) {
        "use strict";
        n() ? t(!0) : e < 1 ? t(!1) : window.setTimeout(function() {
            o(e - 1, t, n)
        }, 100)
    }
    function a(e, t, n) {
        "use strict";
        switch (f(e),
        e.version.toString()) {
        case "1":
            return u(e, t, n);
        case "2":
            return s(e, t, n)
        }
    }
    function u(e, t, n) {
        "use strict";
        var r = !0;
        if (!e.consentSought && "" !== e.scope)
            return r;
        if ("" === e.scope)
            return !0;
        var i = function(e, t) {
            var n = t.length;
            return e.allPurposeConsents && t.forEach(function(t) {
                e.allPurposeConsents.indexOf(t) > -1 && (n -= 1)
            }),
            0 === n
        }
          , o = !0;
        return n || (n = U.vendorIds),
        n && n.length > 0 && e.allVendorConsents && n.forEach(function(t) {
            if (e.allVendorConsents.indexOf(t) === -1)
                return void (o = !1)
        }),
        o && t && t.length > 0 && (o = !1,
        t.forEach(function(t) {
            if (0 === t.length || i(e, t))
                return void (o = !0)
        })),
        o
    }
    function s(e, t, n) {
        var r = !0;
        if (!e.consentSought && "" !== e.scope)
            return r;
        if ("" === e.scope)
            return !0;
        var i = function(e, t) {
            var n = t.length;
            return e.allPurposeConsents && t.forEach(function(t) {
                e.allPurposeConsents.indexOf(t) > -1 && (n -= 1)
            }),
            0 === n
        }
          , o = !0;
        return n || (n = F.vendorIds),
        n && n.length > 0 && e.allVendorConsents && n.forEach(function(t) {
            if (e.allVendorConsents.indexOf(t) === -1)
                return void (o = !1)
        }),
        o && t && t.length > 0 && (o = !1,
        t.forEach(function(t) {
            if (0 === t.length || i(e, t))
                return void (o = !0)
        })),
        o
    }
    function c() {
        "use strict";
        if (!P.isValid())
            return !1;
        var e = window.localStorage.getItem("__rmco_cs") || "";
        return "true" === e
    }
    function f(e) {
        e.version && "0" !== e.version || (e.version = "2")
    }
    function d(e, t) {
        "use strict";
        f(e),
        e.scope = r(e);
        var n, i = "1" === e.version.toString() ? U : F, o = i.prodPids, u = i.vendorIds, s = function(e) {
            var t = [];
            return e.forEach(function(e) {
                t.push(parseInt(e))
            }),
            t
        };
        if (e.consentSought || (e.consentSought = c()),
        e.sourceDomain = document.location.hostname,
        e.rmPurposeConsents = [],
        e.rmVendorConsents = [],
        e.id = N.gen(),
        1 !== e.execStatus)
            return t && (Object.keys(e).forEach(function(n) {
                "execStatus" !== n && (t[n] = e[n])
            }),
            e = t),
            n = a(e),
            void (e.productConsents = {
                ranTrkInt: n,
                ranTrkExt: n,
                ranAut: n,
                ranCGE: n,
                rtbRet: n,
                rtbPro: n,
                cadTrk: n,
                dspTrk: n
            });
        if (e.consentSought) {
            var d = !1;
            e.allVendorConsents && e.allVendorConsents.length > 0 && (e.allVendorConsents = s(e.allVendorConsents),
            i.vendorIds.forEach(function(t) {
                e.allVendorConsents.indexOf(t) > -1 && e.rmVendorConsents.push(t)
            }),
            d = 0 === e.rmVendorConsents.length),
            !d && e.allPurposeConsents && e.allPurposeConsents.length > 0 && (e.allPurposeConsents = s(e.allPurposeConsents),
            i.purposeIds.forEach(function(t) {
                e.allPurposeConsents.indexOf(t) > -1 && e.rmPurposeConsents.push(t)
            }))
        }
        e.productConsents = {
            ranTrkInt: a(e, o.ranTrkInt, u),
            ranTrkExt: a(e, o.ranTrkExt, u),
            ranAut: a(e, o.ranAut, u),
            ranCGE: a(e, o.ranCGE, u),
            rtbRet: a(e, o.rtbRet, u),
            rtbPro: a(e, o.rtbPro, u),
            cadTrk: a(e, o.cadTrk, u),
            dspTrk: a(e, o.dspTrk, u)
        }
    }
    function l(e) {
        var t = 18e5
          , n = 6048e5
          , r = 2592e6;
        return !e || isNaN(Number(e)) || Number(e) < 2 ? t : 2 === Number(e) ? n : r
    }
    function p(e) {
        "use strict";
        if (window.JSON && P.isValid()) {
            var t = "__rmco";
            e.expired || (e.maxAge = (new Date).getTime() + l(e.scnt)),
            delete e.expired,
            window.localStorage.setItem(t, JSON.stringify(e)),
            e.consentSought && window.localStorage.setItem(t + "_cs", "true")
        }
    }
    function g(e) {
        "use strict";
        e || (e = 1);
        var t, n = "__rmco", r = {};
        return window.JSON && P.isValid() && (t = window.localStorage.getItem(n) || "",
        "" !== t ? (r = JSON.parse(t),
        r.expired = !1,
        e = 4 === r.execStatus ? 3 : 1,
        (!r.maxAge || r.maxAge < (new Date).getTime() || r.maxAge > (new Date).getTime() + l(r.scnt)) && (r.expired = !0)) : e = 3),
        c() && (r.consentSought = !0),
        r
    }
    function v() {}
    function h(e) {
        "use strict";
        f(e);
        var t, n = [], r = ["linksynergy", "nxtck", "mediaforge", "jrs5"], i = "/consent/v" + ("1" === e.version.toString() ? "1" : "3") + "/p", o = "?rmch=cs&domain=" + e.sourceDomain || "", a = e.consentSought || !1, u = e.scope || "", s = function(e, t, n) {
            return e + "&" + t + "=" + n
        };
        if (o = s(o, "sought", a.toString()),
        a || (r = [r[0]]),
        "" === u && (e.isGdpr || e.cmpIsGdpr) && (u = "gdpr"),
        "" === u)
            return [];
        o = s(o, "tp", u);
        var c = "";
        if (e.purp1 && (c = e.purp1.toString().toLowerCase(),
        ["cn", "li", "sp"].indexOf(c) > -1 && (o = s(o, "p1", c))),
        e.pubCountryCode && "sp" === c) {
            var d = e.pubCountryCode ? e.pubCountryCode.toString().toLowerCase() : "";
            o = 2 === d.length ? s(o, "pcc", d) : s(o, "pcc", "--")
        }
        e.channelIds && Object.keys(e.channelIds).forEach(function(t) {
            o = s(o, t, e.channelIds[t])
        }),
        e.updated > 0 && (t = (new Date).getTime(),
        e.updated < t && t - e.updated < 31536e6 && (o = s(o, "granted_date", new Date(e.updated).toISOString()))),
        e.source && "" !== e.source && (o = s(o, "is_global", ("global" === e.source).toString())),
        e.rmPurposeConsents && (o = s(o, "purposes", e.rmPurposeConsents.join(","))),
        e.rmVendorConsents && (o = s(o, "vendors", e.rmVendorConsents.join(","))),
        e.location && (o = s(o, "location", e.location)),
        e.id && "" !== e.id && (o = s(o, "ext_id", e.id));
        var l = A ? "https://consent-dev." : "https://consent.";
        return r.forEach(function(e) {
            n.push(l + e + ".com" + i + o)
        }),
        n
    }
    function m(e) {
        "use strict";
        var t = "https:";
        return "http:" === e.slice(0, 5) ? e = t + e.slice(5) : "//" === e.slice(0, 2) && (e = t + e),
        e
    }
    function y() {
        var e = g();
        void 0 === e.scnt || isNaN(Number(e.scnt)) ? e.scnt = 0 : e.scnt = Number(e.scnt) + 1,
        p(e)
    }
    function w(e, t) {
        "use strict";
        var n, r, i = function() {
            window[_].csu -= 1,
            E("ail")
        }, a = [], u = e.scope || "";
        "" !== u && [1, 2, 4].indexOf(e.execStatus || 0) > -1 ? (r = h(e),
        y(),
        window[_] || (window[_] = {}),
        window[_].csu = r.length,
        r.forEach(function(e) {
            n = new Image,
            n.onload = i,
            n.setAttribute("src", m(e)),
            a.push(a)
        }),
        o(15, t, function() {
            return 0 === window[_].csu
        })) : t()
    }
    function x(e) {
        "use strict";
        var t, n, r = function() {
            this.onload && (E("sil"),
            this.onload = null)
        }, i = [], o = e.scope || "";
        "" !== o && [1, 2, 4].indexOf(e.execStatus || 0) > -1 && (n = h(e),
        y(),
        n.forEach(function(e) {
            t = new Image,
            t.onload = r,
            t.setAttribute("src", m(e)),
            i.push(i)
        }))
    }
    function b(e, t) {
        "use strict";
        var n;
        if (!e && !t)
            return !0;
        if (!e || !t)
            return !1;
        if (e instanceof Array && t instanceof Array) {
            if (e.length !== t.length)
                return !1;
            for (n = 0; n < e.length; n += 1)
                if (!b(e[n], t[n]))
                    return !1;
            return !0
        }
        return "object" == typeof e && "object" == typeof t ? b(Object.keys(e), Object.keys(t)) && b(i(e), i(t)) : e.toString() === t.toString()
    }
    function S(e, t) {
        "use strict";
        return !(!e && !t) && (!e || !t || 0 === Object.keys(e).length || 0 === Object.keys(t).length || ((e.expired || !1) !== (t.expired || !1) || (!b(e.allPurposeConsents, t.allPurposeConsents) || (!b(e.allVendorConsents, t.allVendorConsents) || (!b(e.channelIds, t.channelIds) || ((e.source || "") !== (t.source || "") || ((e.sourceDomain || "") !== (t.sourceDomain || "") || ((e.consentSought || "") !== (t.consentSought || "") || (e.scope || "") !== (t.scope || "")))))))))
    }
    function C(e, t) {
        "use strict";
        E("ccs");
        var n = function(e, t) {
            return !(2 !== t.execStatus || "" !== (t.scope || "") || !(0 === Object.keys(e).length || [1, 2].indexOf(e.execStatus) > -1 && e.expired)) || (4 === e.execStatus && 4 !== t.execStatus || S(e, t))
        }
          , r = g();
        return [2, 4].indexOf(e.execStatus) > -1 ? r && r.expired && 1 === r.execStatus ? (e = JSON.parse(JSON.stringify(r)),
        e.execStatus = 6) : e.consentSought = !1 : r && r.consentSought && (e.consentSought = r.consentSought),
        r && r.scnt && (e.scnt = r.scnt),
        n(r, e) ? (r.expired || (e.scnt = 0),
        p(e),
        t ? w(e, t) : window.setTimeout(function() {
            x(e)
        }, 0)) : e.id = r.id,
        e
    }
    function O(e, t, n) {
        "use strict";
        if (P.isValid()) {
            f(e);
            var r = n()
              , i = function() {
                E("cch"),
                V.execute(e, function(e) {
                    d(e),
                    e = C(e),
                    window[_].defcb && t && "function" == typeof t && t(e)
                }, !0, null)
            }
              , o = function(e) {
                return (!V.isBlocking || "function" != typeof V.isBlocking || !V.isBlocking()) && (!e || 0 === Object.keys(e).length || e.expired || 1 !== e.execStatus)
            };
            o(r) && i(),
            V.onChange(i)
        }
    }
    function I(e) {
        var t = {
            channelIds: e,
            scope: r(null)
        }
          , n = a(t);
        return t.productConsents = {
            ranTrkInt: n,
            ranTrkExt: n,
            ranAut: n,
            ranCGE: n,
            rtbRet: n,
            rtbPro: n,
            cadTrk: n,
            dspTrk: n
        },
        t
    }
    function T(e, t, n) {
        "use strict";
        E("ctr");
        var r, i = 0 === Object.keys(g() || {}).length;
        V.isBlocking && "function" == typeof V.isBlocking && V.isBlocking() ? (E("ctd"),
        window[_].defcb = !0,
        O(e, t, g)) : (r = "sync" === n || i ? function(n) {
            d(n),
            n = C(n, function() {
                t(n),
                O(e, t, g)
            })
        }
        : function(n) {
            d(n),
            n = C(n),
            t(n),
            O(e, t, g)
        }
        ,
        V.execute(e, r, !1, function() {
            window[_].defcb = !0,
            O(e, t, g)
        }))
    }
    function k(e, t, n) {
        "use strict";
        o(1e4, function(r) {
            r && O(e, t, n)
        }, V.isReady)
    }
    function E(e) {
        "use strict";
        window[_] || (window[_] = {}),
        window[_].perf || (window[_].perf = []);
        var t, n, r = window[_].perf, o = (new Date).getTime();
        r.length > 0 && !isNaN(o) && (n = i(r[0])[0],
        isNaN(n) || (o -= n)),
        t = {},
        t[e] = o,
        r.push(t)
    }
    var P = n(5)
      , N = n(8)
      , D = n(18)
      , R = {
        attr_sid: "119288",
        aff_mid: "39887"
    }
      , _ = "___RMCMPW"
      , j = !1
      , A = !1;
    if (j) {
        var L = n(6).get();
        !R.aff_sid && L.sid && (R.aff_sid = L.sid)
    }
    t.getScope = r;
    var U = {
        vendorIds: [60],
        purposeIds: [1, 2, 3, 4, 5],
        prodPids: {
            ranTrkInt: [[1, 3], [1, 4], [1, 5]],
            ranTrkExt: [],
            ranAut: [[1, 2, 5], [1, 3]],
            ranCGE: [[1, 2, 5], [1, 3]],
            rtbRet: [[1, 2, 5], [1, 3]],
            rtbPro: [[1, 2, 5], [1, 3]],
            cadTrk: [[1, 3], [1, 4], [1, 5]],
            dspTrk: [[1]]
        }
    };
    t.RMATTRIBS = U;
    var F = {
        vendorIds: [60],
        purposeIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        prodPids: {
            ranTrkInt: [[1]],
            ranTrkExt: [],
            ranAut: [[1]],
            ranCGE: [[1]],
            rtbRet: [[1, 2, 3, 4, 7, 9, 10]],
            rtbPro: [[1, 2, 3, 4, 7, 9, 10]],
            cadTrk: [[1, 7, 10]],
            dspTrk: [[1, 2, 3, 4, 7, 9, 10]]
        }
    };
    t.RMATTRIBS2 = F,
    t.objectValues = i,
    t.hasConsent = a,
    t.decorate = d,
    t.getSyncUrl = h,
    t.fmtproto = m;
    var V = n(25);
    t.areEq = b,
    t.isConsentDiff = S,
    t.run = function(e) {
        "use strict";
        try {
            E("cws");
            var t, n = 0;
            V && V.getCfg && "function" == typeof V.getCfg && (t = V.getCfg(),
            t.cmet || E("cxl-cfg"),
            n = isNaN(parseInt(t.orp, 10)) ? 0 : parseInt(t.orp, 10));
            var r, i = "async";
            e.cids || (e.cids = R),
            e.cids.consentSync && (i = e.cids.consentSync,
            delete e.cids.consentSync),
            r = function(t) {
                E("fci"),
                window[_].status = 1,
                e.cb(t),
                v()
            }
            ;
            var a = I(e.cids)
              , u = 1
              , s = g(u)
              , c = document.location.search.indexOf("_stctdbg=1") > -1 ? 50 : 15;
            c *= u || 1,
            o(c, function(t) {
                t ? 0 === n ? T(a, r, i) : window.setTimeout(function() {
                    T(a, r, i)
                }, n) : (E("ctt"),
                s ? (s.execStatus = s.expired ? 6 : 5,
                r(s)) : (a.execStatus = 4,
                d(a, s),
                a = C(a),
                r(a)),
                k(a, e.cb, g))
            }, V.isReady)
        } catch (f) {
            window.console && console.log("RMCMPW ex:" + f)
        }
    }
}
, function(e, t) {
    e.exports.getCfg = function() {
        "use strict";
        return {
            id: "dummy",
            cmet: !1
        }
    }
    ,
    e.exports.onChange = function(e) {
        "use strict"
    }
    ,
    e.exports.isReady = function() {
        "use strict";
        return !0
    }
    ,
    e.exports.isBlocking = function() {
        "use strict";
        return !1
    }
    ,
    e.exports.execute = function(e, t) {
        "use strict";
        e.execStatus = 1,
        e.consentSought = !1,
        e.version = "2",
        t(e)
    }
}
, function(e, t, n) {
    var r = n(1)
      , i = r.wrap(function() {
        return {}
    });
    e.exports = {
        match: function() {
            return i
        }
    }
}
, function(e, t, n) {
    function r(e, t) {
        u[e] && u[e](t)
    }
    function i(e, t) {
        u[e] || (u[e] = a.identity()),
        u[e].triggers(t)
    }
    function o(e, t) {
        u[e] && u[e].removeTrigger(t)
    }
    var a = n(1)
      , u = {};
    e.exports = {
        publish: r,
        subscribe: i,
        unsubscribe: o
    }
}
, function(e, t, n) {
    var r = n(24)
      , i = n(1)
      , o = n(2)
      , a = n(22)
      , u = i.wrap(function(e) {
        o.consent = o.consent || {},
        o.consent.gdpr = e;
        var t = a.getFromStore();
        return t.uspString && (o.consent.ccpa = t),
        e
    });
    u.filter(function(e) {
        var t = u.lastFiring.value;
        return r.isConsentDiff(t, e)
    });
    var s = i.identity();
    s.addDependency(u),
    r.run({
        cb: u
    }),
    e.exports.match = function(e, t) {
        var n = i.wrap(function(e) {
            return e || (e = s.lastFiring().value),
            e
        });
        return n.addDependency(s),
        n
    }
}
, function(e, t, n) {
    var r = n(1);
    e.exports.match = function(e, t) {
        for (var n, i = r.identity(), o = 0; n = e[o]; o++) {
            var a = t[n.library].events[n.event];
            if ("undefined" == typeof a)
                throw n.library + " doesn't export event " + n.event;
            i.addDependency(a)
        }
        return i
    }
}
, function(e, t, n) {
    function r(e, t, n, o) {
        n = i.wrap(n);
        var a = []
          , u = i.empty()
          , s = i.identity();
        s.triggers(n);
        for (var c in e)
            if (e.hasOwnProperty(c)) {
                var f;
                if ("never" === c) {
                    f = i.identity();
                    var d = i.never(f);
                    s.addDependency(d),
                    n.addDependency(d),
                    r(e[c], t, f, !0)
                } else if ("or" === c) {
                    f = i.identity();
                    var l = e[c];
                    for (var p in l)
                        if (l[p].hasOwnProperty(p)) {
                            var g = t[p].match(l[p], t, f);
                            g.filter(function(e) {
                                return e !== !1
                            }),
                            g.triggers(f)
                        }
                    f.filter(function(e) {
                        return e !== !1
                    }),
                    a.push(f)
                } else
                    f = t[c].match(e[c], t),
                    f.filter(function(e) {
                        return e !== !1
                    }),
                    a.push(f);
                u.triggers(f)
            }
        if (a.length > 0) {
            var v = i.and(a);
            v.triggers(s)
        }
        return o && u(),
        u
    }
    var i = n(1);
    e.exports = r
}
, function(e, t) {
    function n(e) {
        for (var t = e + "=", n = document.cookie.split(";"), r = 0; r < n.length; r++) {
            for (var i = n[r]; " " == i.charAt(0); )
                i = i.substring(1, i.length);
            if (0 == i.indexOf(t))
                return i.substring(t.length, i.length)
        }
        return null
    }
    function r(e, t, n, r, i) {
        var o = e + "=" + escape(t) + ";";
        n && (n instanceof Date ? isNaN(n.getTime()) && (n = new Date) : n = new Date((new Date).getTime() + 1e3 * parseInt(n) * 60 * 60 * 24),
        o += "expires=" + n.toGMTString() + ";"),
        r && (o += "path=" + r + ";"),
        i && (o += "domain=" + i + ";"),
        document.cookie = o
    }
    function i(e, t, i) {
        n(e) && r(e, "", -1, t, i)
    }
    e.exports = {
        get: n,
        set: r,
        del: i
    }
}
, function(e, t, n) {
    function r(e, t, n, r) {
        var u = o.identity();
        "undefined" != typeof r.limit ? r.limit > 0 && u.limit(r.limit) : u.limit(1),
        n = o.wrap(n),
        u.triggers(n),
        u.triggers(function() {
            a.publish("Tag.Trigger", r)
        }),
        n.triggers(function() {
            a.publish("Tag.Run", r)
        }),
        n.error().triggers(function(e) {
            var t = {
                name: r.name,
                error: e
            };
            a.publish("Tag.Error", t)
        });
        for (var s = o.identity(), c = 0; c < e.length; c++)
            s.triggers(i(e[c], t, u));
        try {
            s()
        } catch (f) {}
        return u
    }
    var i = n(30)
      , o = n(1)
      , a = n(27);
    e.exports = r
}
, function(e, t, n) {
    var r = n(34)
      , i = n(31)
      , o = n(1);
    e.exports = function() {
        var e = r.match({
            query: {
                _stctdbg: "0"
            }
        }, {});
        e.filter(function(e) {
            return e !== !1
        }),
        e.triggers(function() {
            i.del("_stctdbg")
        }),
        e();
        var t = r.match({
            query: {
                _stctdbg: "1"
            }
        }, {});
        t.filter(function(e) {
            return e !== !1
        });
        var n = o.wrap(function() {
            return i.get("_stctdbg")
        });
        n.filter(function(e) {
            return null !== e
        });
        var a = o.identity();
        t.triggers(a),
        n.triggers(a),
        a.limit(1);
        var u = !1
          , s = o.wrap(function() {
            u = !0,
            i.set("_stctdbg", "true");
            var e = document.createElement("script");
            e.type = "text/javascript",
            e.src = "//cdn.rmtag.com/q.119288.ct.js",
            document.getElementsByTagName("head")[0].appendChild(e)
        });
        return s.addDependency(a),
        t(),
        n(),
        u
    }
}
, function(e, t, n) {
    function r(e, t) {
        function n(e, t, n) {
            function r(e, t) {
                var n = new RegExp(e.match,"ig");
                return !!n.test(t) && ("undefined" == typeof e.variable || (i[e.variable] = t,
                i))
            }
            var i = {};
            if ("undefined" == typeof e.position || null === e.position)
                for (var o = 0; o < t.length; o++) {
                    var a = t[o]
                      , u = new RegExp(e.match,"ig");
                    if (u.test(a))
                        return "undefined" != typeof e.variable && (i[e.variable] = a,
                        i.position = o),
                        i
                }
            if ("string" == typeof e.position)
                switch (e.position) {
                case "protocol":
                    var s = e.match;
                    if (":" != s.substring(s.length - 1) && (s += ":"),
                    s === n.protocol)
                        return "undefined" == typeof e.variable || (i[e.variable] = n.protocol,
                        i);
                    break;
                case "end":
                    var c = new RegExp(e.match,"ig")
                      , f = t.length - 1;
                    return !!c.test(t[f]) && ("undefined" == typeof e.variable || (i[e.variable] = t[f],
                    i.position = f,
                    i));
                case "path":
                    return r(e, n.pathname);
                case "domain":
                    return r(e, n.hostname);
                default:
                    return !1
                }
            if (e.position > t.length)
                return !1;
            e.position < 0 && (e.position = t.length - 1 + e.position);
            var d = new RegExp(e.match || ".*","ig");
            return d.test(t[e.position]) ? "undefined" == typeof e.variable || (i[e.variable] = t[e.position],
            i.position = e.position,
            i) : "undefined" != typeof e["default"] && (i[e.variable] = e["default"],
            i.position = e.position,
            i)
        }
        function r() {
            if (null === e)
                return !0;
            var r = "undefined" != typeof t["*url*"] ? t["*url*"] : document.location
              , o = (r.protocol,
            r.pathname)
              , a = o.split("/")
              , u = (r.hostname,
            i.decode(r.search));
            for (var s in u)
                u.hasOwnProperty(s) && "?" === s[0] && (u[s.substring(1)] = u[s],
                delete u[s]);
            if ("undefined" != typeof e.wholeurl) {
                var c = new RegExp(e.wholeurl,"ig");
                if (!c.test(r.href))
                    return !1
            }
            var f = {
                WholeQueryString: u
            };
            if ("undefined" != typeof e.pos) {
                for (var d = [], l = 0; l < e.pos.length; l++) {
                    var p = n(e.pos[l], a, r);
                    if (!p)
                        return !1;
                    p !== !0 && d.push(p)
                }
                d.length > 0 && (f.PositionMatches = d)
            }
            if ("undefined" != typeof e.query) {
                f.QueryStringMatches = {};
                for (var g in e.query)
                    if (e.query.hasOwnProperty(g)) {
                        var v = e.query[g]
                          , h = ("function" == typeof v.match ? null : v.match) || ("string" == typeof v ? v : null)
                          , m = new RegExp(h,"ig");
                        if ("undefined" == typeof u[g] || null === u[g])
                            return !1;
                        var y = g;
                        if ("undefined" != typeof v.variable && null !== v.variable && (y = v.variable),
                        m.test(u[g]) || null === h)
                            f.QueryStringMatches[y] = u[g];
                        else {
                            if ("undefined" == typeof v["default"])
                                return !1;
                            f.QueryStringMatches[y] = v["default"]
                        }
                    }
            }
            return f
        }
        return o.wrap(r)
    }
    var i = n(12)
      , o = n(1);
    e.exports = {
        match: r
    }
}
, function(e, t, n) {
    var r = n(8)
      , i = n(2);
    i.shared || (i.shared = {}),
    i.shared.evguid = r.gen()
}
, function(e, t, n) {
    t.isTesting = !!n(33)()
}
]);
