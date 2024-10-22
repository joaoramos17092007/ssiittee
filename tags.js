( (v, y) => {
    var o, t = v.PMTagObject || "pm", _ = (v[t] || (v[t] = {}),
    v[t]), s = (_.initialized || (_.err = [],
    _.qs = {},
    _.tp = {},
    _.initialized = !1,
    _.fired = !1,
    _.hashId = !1),
    (new Date).getTime()), i = 63072e6, h = 18e5, b = {
        data: {
            hash: function(t) {
                var e, r, i = 0;
                if ("string" == typeof t && 0 !== t.length)
                    for (e = 0,
                    r = t.length; e < r; e++)
                        i = (i << 5) - i + t.charCodeAt(e),
                        i |= 0;
                return i
            },
            normalize: function(t) {
                if (!(t.length < 6 || t.indexOf("@") < 1))
                    return t.toString().trim().toLowerCase()
            },
            normalizeCPF: function(t) {
                return t.replace(/\D/g, "")
            },
            sha256: function(t) {
                return o.codec.hex.fromBits(o.hash.sha256.hash(t))
            },
            validateCPF: function(t) {
                var e, r = 0;
                if (11 !== (t = t.replace(/\D/g, "")).length || /^(\d)\1{10}$/.test(t))
                    return !1;
                for (var i = 1; i <= 9; i++)
                    r += parseInt(t.substring(i - 1, i)) * (11 - i);
                if ((e = 10 !== (e = 10 * r % 11) && 11 !== e ? e : 0) !== parseInt(t.substring(9, 10)))
                    return !1;
                for (r = 0,
                i = 1; i <= 10; i++)
                    r += parseInt(t.substring(i - 1, i)) * (12 - i);
                return (e = 10 !== (e = 10 * r % 11) && 11 !== e ? e : 0) === parseInt(t.substring(10, 11))
            }
        },
        log: {
            error: function(t, e) {
                var r = b.request.createQueryString();
                _.err.push(t),
                b.request.batch(r)
            }
        },
        identity: {
            client: function(t, e) {
                t && e && i < s - e && (e = t = null);
                var r = t || b.storage.getItem("_pm_id");
                return !(r = r && r.toString().match(/^0+(?!\.|$)|[^0-9]+/) ? null : r) || t ? (e && e < s && (i -= s - e),
                r = t || b.identity.unique_id(),
                b.storage.setItem("_pm_id", r, i)) : _.rv = 1,
                r
            },
            getTracker: function() {
                return _.cd || b.identity.init(),
                "_rt=" + _.cid + "-" + _.sid + "-" + (s + 0)
            },
            setIdentity: function(t) {
                t = t.split("-");
                t.length && 2 < t.length && (_.cid = b.identity.client(t[0], t[2]),
                _.sid = b.identity.session(t[1], t[2]))
            },
            init: function() {
                var t;
                v && v.location && v.location.href && ((t = /[^\w]_rt=([^&#]+)/gi.exec(v.location.href)) && t[1] ? this.setIdentity(t[1]) : v.sessionStorage && (t = v.sessionStorage.getItem("_rt")) && (this.setIdentity(t),
                v.sessionStorage.removeItem("_rt"))),
                _.cid || (_.cid = b.identity.client()),
                _.sid || (_.sid = b.identity.session()),
                _.pvw || (_.pvw = b.identity.pageview()),
                _.cd = function() {
                    return b.identity.getTracker()
                }
            },
            pageview: function() {
                if (_ && _.pvw)
                    return _.pvw;
                var t = ["x", "x", "x", "x", "x", "x", "x", "x", "-", "x", "x", "x", "x", "-", "4", "x", "x", "x", "-", "y", "x", "x", "x", "-", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]
                  , e = 0
                  , r = 0
                  , i = ""
                  , n = _.sid;
                n && "undefined" !== n || (_.sid = b.identity.session(),
                n = _.sid);
                for (var a = s.toString(16).substr(-8) + Math.abs(b.data.hash(y.location.href)).toString(16) + parseInt(n).toString(16) + "00000000000000"; e < 36; )
                    "y" === t[e] ? i += "a" : "x" === t[e] ? (i += a[r],
                    r++) : i += t[e],
                    e++;
                return _.pvw = i
            },
            session: function(t, e) {
                t && e && h < s - e && (e = t = null);
                e = t || b.storage.getItem("_pm_sid");
                return (e = e && e.toString().match(/^0+(?!\.|$)|[^0-9]+/) ? null : e) && !t || (e = t || b.identity.unique_id()),
                b.storage.setItem("_pm_sid", e, h),
                e
            },
            unique_id: function() {
                return (Math.floor(1e17 * Math.random()) + "" + +new Date).substr(-18)
            }
        },
        request: {
            batch: function(t) {
                var e, r = b.request.createQueryString(), i = 0;
                for (e in t)
                    !t.hasOwnProperty(e) || _.tp.hasOwnProperty(e) && _.tp[e] === t[e] || ("mv" === e && t.hasOwnProperty("mk") && (_.qs.mk = t.mk,
                    r.mk = t.mk,
                    i++),
                    _.qs[e] = t[e],
                    r[e] = t[e],
                    i++);
                _.fired && 0 !== i && b.request.send(r)
            },
            createQueryString: function() {
                return {
                    aid: _.aid || null,
                    cid: _.cid || b.identity.client(),
                    sid: _.sid || b.identity.session(),
                    pvw: _.pvw || b.identity.pageview(),
                    v: "1.19.0"
                }
            },
            send: function(t) {
                var e = new XMLHttpRequest;
                if (e) {
                    if (e.onreadystatechange = function() {
                        4 === e.readyState && e.status
                    }
                    ,
                    _.err.length) {
                        var r = {};
                        if (t.hasOwnProperty("add"))
                            try {
                                r = JSON.parse(t.add)
                            } catch (t) {}
                        r.err = _.err,
                        t.add = JSON.stringify(r)
                    }
                    var i, n = [];
                    for (i in t)
                        t.hasOwnProperty(i) && t[i] && (_.tp[i] = t[i],
                        n.push(i + "=" + encodeURIComponent(t[i])));
                    e.withCredentials = !0,
                    e.open("GET", "https://df.pmweb.com.br/push/?" + n.join("&")),
                    e.send(null),
                    _.fired = !0
                } else
                    b.log.error("Could not initialize XMLHttpRequest", null)
            }
        },
        storage: {
            setItem: function(t, e, r) {
                var i, n, r = new Date(s + r), r = encodeURIComponent(t) + "=" + encodeURIComponent(e) + "; expires=" + r.toUTCString() + "; path=/";
                !v.hasOwnProperty("location") || null === v.location || 1 === (i = (n = v.location.host).split(".")).length ? y.cookie = r : (i.shift(),
                i = "." + i.join("."),
                y.cookie = r + "; domain=" + encodeURIComponent(i),
                null !== b.storage.getItem(t) && b.storage.getItem(t) === e || (y.cookie = r + "; domain=" + encodeURIComponent("." + n)))
            },
            getItem: function(t) {
                t = "(?:(?:^|.*;\\s*)" + encodeURIComponent(t) + "\\s*\\=\\s*([^;]*).*$)|^.*$";
                return decodeURIComponent(y.cookie.replace(new RegExp(t), "$1"))
            }
        }
    }, w = {
        action: function(t) {
            var e = {}
              , r = ["view", "click", "detail", "cart", "remove", "checkout", "purchase"];
            if ("object" != typeof t) {
                var i = t + "";
                i = (i = i.replace(/([-_A-Za-z]+):/g, '"$1":')).replace(/[,\s]+([}\]])/g, "$1");
                try {
                    t = JSON.parse(i)
                } catch (t) {
                    b.log.error("unable to decode object", t)
                }
                if ("object" != typeof t)
                    return
            }
            var n, a = 0;
            try {
                for (var o in t)
                    if (t.hasOwnProperty(o)) {
                        if ("match" === o) {
                            if (t.match.hasOwnProperty("email") && t.match.email) {
                                var s = b.data.normalize(t.match.email.toString());
                                if (!s)
                                    continue;
                                var c = b.data.sha256(s);
                                if (!c)
                                    continue;
                                e.mk = "sha256",
                                e.mv = c
                            } else if (t.match.hasOwnProperty("sha256") && t.match.sha256 && "bf43b7377d6c42a1c71df141089a31c8e094d0e7f5d825e2290754490b110887" !== t.match.sha256)
                                e.mk = "sha256",
                                e.mv = t.match.sha256;
                            else if (t.match.hasOwnProperty("md5") && t.match.md5)
                                e.mk = "md5",
                                e.mv = t.match.md5;
                            else if (t.match.hasOwnProperty("riid") && t.match.riid)
                                e.mk = "riid",
                                e.mv = t.match.riid;
                            else if (t.match.hasOwnProperty("sfid") && t.match.sfid)
                                e.mk = "sfid",
                                e.mv = t.match.sfid;
                            else {
                                if (!t.match.hasOwnProperty("customer_id") || !t.match.customer_id || "0" === t.match.customer_id)
                                    continue;
                                var u = t.match.customer_id;
                                if (_.hashId && b.data.validateCPF(t.match.customer_id)) {
                                    var h = b.data.normalizeCPF(t.match.customer_id.toString());
                                    if (!h)
                                        continue;
                                    if (!(h = b.data.sha256(h)))
                                        continue;
                                    u = h
                                }
                                e.mk = "customer_id",
                                e.mv = u
                            }
                            b.storage.setItem("_pm_m", e.mk[0] + e.mv, 2592e6),
                            a++
                        }
                        if ("add" === o) {
                            var d = JSON.stringify(t.add);
                            if ("{}" === d || "[]" === d || "[{}]" === d || '""' === d || "null" === d)
                                continue;
                            e.add = d,
                            a++
                        }
                        if ("category" === o && (t.category.hasOwnProperty("id") && t.category.id && (e.ci = t.category.id.toString(),
                        a++),
                        t.category.hasOwnProperty("name")) && t.category.name && (e.cn = t.category.name.toString(),
                        a++),
                        "transaction" === o && "undefined" !== (n = w.transaction(t[o])) && (e[o] = JSON.stringify(n),
                        a++),
                        0 <= r.indexOf(o)) {
                            var f, m = [];
                            if (t[o]instanceof Array)
                                for (var l in t[o])
                                    t[o].hasOwnProperty(l) && (f = w.product(t[o][l])) && "undefined" !== f.id && m.push(f);
                            else
                                m.push(w.product(t[o]));
                            m.length && (e[o] = JSON.stringify(m),
                            a++)
                        }
                    }
            } catch (t) {}
            if (a) {
                if (_.tp && _.tp.url && v.location && v.location.href && _.tp.url !== v.location.href) {
                    var g, p = this.browser(v, y);
                    for (g in p)
                        g && p.hasOwnProperty(g) && (e[g] = p[g]);
                    _.tp.mk && _.tp.mv && (e.mk = _.tp.mk,
                    e.mv = _.tp.mv)
                }
                b.request.batch(e)
            }
        },
        browser: function(t, e) {
            var r = {};
            return t.screen && t.screen.width && t.screen.height && (r.rs = t.screen.width + "x" + t.screen.height),
            e.title && (r.tt = e.title),
            t.outerWidth && t.outerHeight && (r.ws = t.outerWidth + "x" + t.outerHeight),
            e.charSet && (r.cs = e.charSet),
            t.navigator && t.navigator.oscpu && (r.os = t.navigator.oscpu),
            t.navigator && t.navigator.userAgent && (r.ua = t.navigator.userAgent),
            e.referrer && (r.rf = e.referrer),
            t.location && t.location.href && (r.url = t.location.href),
            r
        },
        product: function(t) {
            var e = ["name", "id", "add", "price", "brand", "category", "variant", "list", "quantity", "sku", "size", "position"];
            if ("object" == typeof t) {
                var r, i = {};
                for (r in e)
                    if (t.hasOwnProperty(e[r])) {
                        var n, a = e[r];
                        try {
                            if ("undefined" === t[a] || "" === t[a] || null === t[a] || "null" === t[a])
                                continue;
                            "add" === a ? i[a] = JSON.stringify(t[a]) : "price" === a ? (n = parseFloat(t[a]),
                            isNaN(n) || (i[a] = n)) : "quantity" === a || "position" === a ? (n = parseInt(t[a]),
                            isNaN(n) || (i[a] = n)) : i[a] = String(t[a])
                        } catch (t) {}
                    }
                if (i.hasOwnProperty("id"))
                    return i
            }
        },
        queue: function(t) {
            t.push = function(t) {
                t = void 0 !== t[0] ? t[0] : t;
                w.action(t)
            }
            ;
            var u = b.request.createQueryString();
            t.forEach(function(t) {
                if (t.length)
                    if ("init" === t[0] && (_.aid || t[1])) {
                        if (!_.initialized) {
                            _.aid || (_.aid = t[1]),
                            u.aid = _.aid;
                            var e, r = b.storage.getItem("_pm_m"), i = (r && r.length && (c = r[0],
                            r = r.substr(1),
                            "c" === c ? (u.mk = "customer_id",
                            u.mv = r) : "s" === c ? (u.mk = "sha256",
                            u.mv = r) : "m" === c ? (u.mk = "md5",
                            u.mv = r) : "r" === c ? (u.mk = "riid",
                            u.mv = r) : "e" === c && (u.mk = "sfid",
                            u.mv = r)),
                            w.browser(v, y) || {});
                            for (e in i)
                                i.hasOwnProperty(e) && (u[e] = i[e]);
                            _.rv && (u.rv = 1);
                            var n, a = w.utms(v.location.href) || {};
                            for (n in a)
                                if (a.hasOwnProperty(n))
                                    switch (n) {
                                    case "responsys":
                                        var o = a[n].toString().match(/([0-9,]+)_?(\d+)?_?(20\d{6})?_?(.*)/);
                                        if (!o)
                                            continue;
                                        o[1] && (u.mk = "riid",
                                        u.mv = o[1].replace(",", ""),
                                        b.storage.setItem("_pm_m", u.mk[0] + u.mv, 2592e6),
                                        b.storage.setItem("_pm_riid", u.mv, 62208e6)),
                                        o[2] && (u.rl = o[2]),
                                        o[3] && (u.sd = o[3]),
                                        o[4] && (u.sg = o[4]);
                                        break;
                                    case "sfmc":
                                        o = a[n].toString().match(/(\d+)_?([0-9A-Za-z]+)?_?(.*)/);
                                        if (!o)
                                            continue;
                                        o[1] && (u.ji = o[1]),
                                        o[2] && (u.mk = "sfid",
                                        u.mv = o[2],
                                        b.storage.setItem("_pm_m", "e" + u.mv, 2592e6),
                                        b.storage.setItem("_pm_sfid", u.mv, 62208e6)),
                                        o[3] && (u.sg = o[3]);
                                        break;
                                    case "source":
                                        u.us = a[n];
                                        break;
                                    case "medium":
                                        u.um = a[n];
                                        break;
                                    case "campaign":
                                        u.uc = a[n]
                                    }
                            (a.source || a.medium || a.campaign) && (c = a.source || "",
                            r = a.medium || "",
                            s = a.campaign || "",
                            b.storage.setItem("_pm_u", c + "|" + r + "|" + s, h));
                            var s, c = b.storage.getItem("_pm_u"), r = (c && 2 < c.length && (r = "" + b.data.hash(c) + _.sid,
                            u.sid = r.replace(/[^0-9]/, "").substr(0, 18),
                            _.sid = u.sid,
                            u.us && u.um && u.uc || 3 === (s = c.split("|")).length && (u.us = s[0],
                            u.um = s[1],
                            u.uc = s[2])),
                            _.initialized = !0,
                            Math.floor(100 * Math.random() + 150));
                            window.setTimeout(function() {
                                b.request.send(_.qs)
                            }, r),
                            b.request.batch(u)
                        }
                    } else
                        w.action(t[0])
            })
        },
        transaction: function(t) {
            var e = ["id", "add", "affiliation", "revenue", "tax", "shipping", "coupon"];
            if ("object" == typeof t) {
                var r, i = {};
                for (r in e)
                    if (t.hasOwnProperty(e[r])) {
                        var n, a = e[r];
                        try {
                            if ("undefined" === t[a] || "" === t[a] || null === t[a] || "null" === t[a])
                                continue;
                            "revenue" === a || "tax" === a || "shipping" === a ? (n = parseFloat(t[a]),
                            isNaN(n) || (i[a] = n)) : i[a] = "add" === a ? JSON.stringify(t[a]) : String(t[a])
                        } catch (t) {}
                    }
                if (i.hasOwnProperty("id"))
                    return i
            }
        },
        utms: function(t) {
            for (var e, r = /[^\w](?:utm_(source|medium|campaign|responsys|sfmc))=([^&#]+)/gi, i = {}, n = function(t) {
                return decodeURIComponent(t.replace(/\+/g, " "))
            }; null !== (e = r.exec(t)); )
                i[n(e[1])] = n(e[2]);
            return i
        }
    };
    _.fillFromDataLayer = function(t, e) {
        if (t && t.length) {
            var r, i = {};
            for (r in e)
                "string" == typeof e[r] && (i[e[r]] = null);
            for (var n = v.dataLayer.length, a = 0; a < n; a++)
                if (null !== t[a])
                    for (var o in e)
                        if (t[a].hasOwnProperty(e[o])) {
                            var s = e[o];
                            if (void 0 !== t[a][s])
                                if (i[s] && "object" == typeof i[s] && "object" == typeof t[a][s])
                                    for (var c in t[a][s])
                                        t[a][s][c] && (i[s][c] = t[a][s][c]);
                                else
                                    i[s] = t[a][s]
                        }
            return i
        }
    }
    ,
    _ ? ((o = {
        hash: {
            sha256: function(t) {
                t ? (this._h = t._h.slice(0),
                this._buffer = t._buffer.slice(0),
                this._length = t._length) : this.reset()
            }
        },
        codec: {
            hex: {
                fromBits: function(t) {
                    for (var e = "", r = 0; r < t.length; r++)
                        e += (0xf00000000000 + (0 | t[r])).toString(16).substr(4);
                    return e.substr(0, o.bitArray.bitLength(t) / 4)
                }
            },
            utf8String: {
                toBits: function(t) {
                    t = unescape(encodeURIComponent(t));
                    for (var e = [], r = 0, i = 0; i < t.length; i++)
                        r = r << 8 | t.charCodeAt(i),
                        3 == (3 & i) && (e.push(r),
                        r = 0);
                    return 3 & i && e.push(o.bitArray.partial(8 * (3 & i), r)),
                    e
                }
            }
        },
        bitArray: {
            concat: function(t, e) {
                var r, i;
                return 0 === t.length || 0 === e.length || 32 === (i = o.bitArray.getPartial(r = t[t.length - 1])) ? t.concat(e) : o.bitArray._shiftRight(e, i, 0 | r, t.slice(0, t.length - 1))
            },
            bitLength: function(t) {
                var e = t.length;
                return 0 === e ? 0 : (t = t[e - 1],
                32 * (e - 1) + o.bitArray.getPartial(t))
            },
            partial: function(t, e, r) {
                return 32 === t ? e : (r ? 0 | e : e << 32 - t) + 1099511627776 * t
            },
            getPartial: function(t) {
                return Math.round(t / 1099511627776) || 32
            },
            _shiftRight: function(t, e, r, i) {
                var n, a;
                for (void 0 === i && (i = []); 32 <= e; e -= 32)
                    i.push(r),
                    r = 0;
                if (0 === e)
                    return i.concat(t);
                for (n = 0; n < t.length; n++)
                    i.push(r | t[n] >>> e),
                    r = t[n] << 32 - e;
                return a = t.length ? t[t.length - 1] : 0,
                a = o.bitArray.getPartial(a),
                i.push(o.bitArray.partial(e + a & 31, 32 < e + a ? r : i.pop(), 1)),
                i
            }
        }
    }).hash.sha256.hash = function(t) {
        return (new o.hash.sha256).update(t).finalize()
    }
    ,
    o.hash.sha256.prototype = {
        blockSize: 512,
        reset: function() {
            return this._h = this._init.slice(0),
            this._buffer = [],
            this._length = 0,
            this
        },
        update: function(t) {
            "string" == typeof t && (t = o.codec.utf8String.toBits(t));
            for (var e = this._buffer = o.bitArray.concat(this._buffer, t), r = this._length, i = this._length = r + o.bitArray.bitLength(t), n = 512 + r & -512; n <= i; n += 512)
                this._block(e.splice(0, 16));
            return this
        },
        finalize: function() {
            for (var t = this._buffer, e = this._h, r = (t = o.bitArray.concat(t, [o.bitArray.partial(1, 1)])).length + 2; 15 & r; r++)
                t.push(0);
            for (t.push(Math.floor(this._length / 4294967296)),
            t.push(0 | this._length); t.length; )
                this._block(t.splice(0, 16));
            return this.reset(),
            e
        },
        _init: [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
        _key: [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
        _block: function(t) {
            for (var e, r, i = t.slice(0), t = this._h, n = this._key, a = t[0], o = t[1], s = t[2], c = t[3], u = t[4], h = t[5], d = t[6], f = t[7], m = 0; m < 64; m++)
                e = (e = m < 16 ? i[m] : (e = i[m + 1 & 15],
                r = i[m + 14 & 15],
                i[15 & m] = (e >>> 7 ^ e >>> 18 ^ e >>> 3 ^ e << 25 ^ e << 14) + (r >>> 17 ^ r >>> 19 ^ r >>> 10 ^ r << 15 ^ r << 13) + i[15 & m] + i[m + 9 & 15] | 0)) + f + (u >>> 6 ^ u >>> 11 ^ u >>> 25 ^ u << 26 ^ u << 21 ^ u << 7) + (d ^ u & (h ^ d)) + n[m],
                f = d,
                d = h,
                h = u,
                u = c + e | 0,
                c = s,
                s = o,
                a = e + ((o = a) & s ^ c & (o ^ s)) + (o >>> 2 ^ o >>> 13 ^ o >>> 22 ^ o << 30 ^ o << 19 ^ o << 10) | 0;
            t[0] = t[0] + a | 0,
            t[1] = t[1] + o | 0,
            t[2] = t[2] + s | 0,
            t[3] = t[3] + c | 0,
            t[4] = t[4] + u | 0,
            t[5] = t[5] + h | 0,
            t[6] = t[6] + d | 0,
            t[7] = t[7] + f | 0
        }
    },
    b.identity.init(),
    _.q ? w.queue(_.q) : b.log.error("queue not found", null)) : b.log.error("object not created")
}
)(window, document);
( () => {
    var e, o, a, t, i, n = {
        261: function(t, e) {
            e.aid = "PM-TL8J9VF",
            e.debug = 0,
            e.entry = "./src/index.ts",
            e.dlTries = 20
        }
    }, r = {};
    function c(t) {
        var e = r[t];
        return void 0 !== e || (e = r[t] = {
            exports: {}
        },
        n[t](e, e.exports, c)),
        e.exports
    }
    function u(t) {
        (0 === a.debug || 1 !== a.debug && 2 === a.debug) && pm(t)
    }
    function s(t) {
        return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        )(t)
    }
    function d(a, n) {
        var t, i, r, e = a();
        "object" === s(e) && e.condition || null != e && 1 == e ? (t = "",
        "object" === s(e) && (t = e.valueParam),
        n(t)) : (i = setInterval(function() {
            var t, e = a();
            ("object" === s(e) && e.condition || null != e && 1 == e) && (t = "",
            "object" === s(e) && (t = e.valueParam),
            clearInterval(i),
            clearTimeout(r),
            n(t))
        }, 300),
        r = setTimeout(function() {
            clearInterval(i)
        }, 1e4))
    }
    function l(t, e) {
        var a = t || []
          , n = a.push;
        a.push = function() {
            var t = [].slice.call(arguments, 0);
            try {
                t.length && t[0].hasOwnProperty("event") && e(t[0])
            } catch (t) {}
            return n.apply(a, t)
        }
    }
    function f(i) {
        d(function() {
            return null != i.verify()
        }, function() {
            for (var t in i.pages) {
                var e, a, n = i.pages[t].callback;
                t === i.verify() && void 0 === n || "All" === t && void 0 === n ? (a = {},
                "function" == typeof (e = i.pages[t]).obj ? a[e.event] = e.obj() : a[e.event] = e.obj,
                u(a)) : (t === i.verify() && "function" == typeof n || "All" === t && "function" == typeof n) && i.pages[t].callback(u, t)
            }
        })
    }
    function m() {
        var t = window.chaordic_meta
          , e = window.chaordic
          , a = void 0
          , e = (e && (a = e.window.nikeDataLayer),
        window.dataLayer)
          , n = window.location.pathname
          , i = "";
        return t ? ("product" == t.page ? i = "Produto" : "category" == t.page || "subcategory" == t.page ? i = "Categoria" : "checkout" == t.page ? i = "Checkout" : "transaction" == t.page && (i = "Confirmacao"),
        i) : a ? ("product" == t.page ? i = "Produto" : "category" == t.page || "subcategory" == t.page ? i = "Categoria" : "checkout" == t.page ? i = "Checkout" : "transaction" == t.page ? i = "Confirmacao" : "/carrinho" == n && (i = "Carrinho"),
        i) : e ? window.current_page : i
    }
    function p(t) {
        var e = window.chaordic_meta.categories.slice(-1).pop()
          , a = e.id
          , n = e.name;
        d(function() {
            if (a && n)
                return {
                    condition: !0
                }
        }, function() {
            t({
                category: {
                    id: a,
                    name: n
                }
            })
        })
    }
    function h(e, t) {
        var a, n, i, r, o, c, u = window.chaordic;
        u.window.nikeDataLayer && window.chaordic_meta && (u = u.window.nikeDataLayer,
        a = $(".variacoes-cores-selecionada a img")[0],
        n = u.productInfo.productNikeId.replace("-", ""),
        i = u.productInfo.name,
        r = u.productInfo.subDepartment,
        o = parseFloat(u.productInfo.salePrice),
        c = a ? a.attributes.title.value : "",
        d(function() {
            if (i && r && o && n)
                return {
                    condition: !0
                }
        }, function() {
            e({
                detail: {
                    name: i,
                    category: r,
                    brand: "Nike",
                    price: o,
                    variant: c,
                    id: n,
                    quantity: 1,
                    position: 1
                }
            })
        }),
        l(window.dataLayer, function(t) {
            "productAddedToCart" == t.event && e({
                cart: [{
                    name: i,
                    category: r,
                    brand: "Nike",
                    price: o,
                    variant: c,
                    id: n,
                    quantity: 1,
                    position: 1
                }]
            })
        }))
    }
    function g(t) {
        var e = window.chaordic;
        e.window.nikeDataLayer && window.chaordic_meta && (e = y(e.window.nikeDataLayer.checkoutInfo)).length && t({
            checkout: e
        })
    }
    function y(t) {
        var e = [];
        if (t && 0 !== t.items.length)
            for (var a in t.items) {
                a = {
                    name: (a = t.items[a]).product.name,
                    id: a.product.productNikeId.match(/(.+)-/)[1],
                    category: a.product.subDepartment,
                    price: a.product.salePrice,
                    brand: "Nike",
                    quantity: parseFloat(a.quantity),
                    position: 1
                };
                e.push(a)
            }
        return e
    }
    function w(t) {
        var e, a = window.chaordic;
        a.window.nikeDataLayer && window.chaordic_meta && (a = a.window.nikeDataLayer.checkoutInfo) && (e = y(a)).length && a.orderId && t({
            purschase: e,
            transaction: {
                id: a.orderId,
                shipping: a.shippingTotal,
                coupon: a.coupon || "",
                revenue: a.grandTotal
            }
        })
    }
    function b(t) {
        var e = window.location
          , a = e.pathname;
        null != (e = e.href.match(/tipodeproduto:(\w+)/)) && t({
            category: {
                name: e[1]
            }
        }),
        null != (e = a.match(/\/(\w+)$/)) && t({
            category: {
                name: e[1]
            }
        })
    }
    function v(e, t) {
        var a = window.dataLayer
          , n = pm.fillFromDataLayer(a, ["ecommerce"]);
        n && (n = n.ecommerce,
        n = i([n.items[0]], ["item_name as name", "item_category as category", "item_id as id", "item_variant as variant", "item_brand as brand", "price", "quantity"])[0],
        e({
            detail: n
        })),
        l(a, function(t) {
            "add_to_cart" === t.event && (t = t.ecommerce,
            t = i([t.items[0]], ["item_name as name", "item_category as category", "item_id as id", "item_variant as variant", "item_brand as brand", "price", "quantity"])[0],
            e({
                cart: t
            }))
        })
    }
    function _(e, t) {
        var a = window.dataLayer;
        d(function() {
            var t = pm.fillFromDataLayer(a, ["user"])
              , t = t.user && t.user.email;
            return {
                condition: !!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t),
                valueParam: t
            }
        }, function(t) {
            pm.hashId = !0,
            e({
                match: {
                    email: t
                }
            })
        })
    }
    function k(n) {
        d(function() {
            if (window.dataLayer) {
                var t = window.dataLayer.filter(function(t) {
                    if ("purchase" === t.event && t.transactionId && t.ecommerce && t.ecommerce.items.length)
                        return t
                })
                  , t = t[t.length - 1];
                if (t.transactionId && t.ecommerce && t.ecommerce.items)
                    return {
                        condition: !0,
                        valueParam: t
                    }
            }
        }, function(t) {
            var e = t.ecommerce.items.map(function(t) {
                return i([t], ["item_name as name", "item_category as category", "item_id as id", "item_variant as variant", "item_brand as brand", "price", "quantity"])[0]
            })
              , a = {
                id: t.transactionId,
                revenue: t.transactionTotal,
                affiliation: t.transactionAffiliation,
                tax: t.transactionTax,
                shipping: t.transactionShipping
            };
            d(function() {
                return e.length
            }, function() {
                n({
                    purchase: e,
                    transaction: a
                })
            })
        })
    }
    function L(t) {
        var e = window.dataLayer
          , e = pm.fillFromDataLayer(e, ["ecommerce"]);
        e && t({
            cart: e.ecommerce.items.map(function(t) {
                return i([t], ["item_name as name", "item_category as category", "item_id as id", "item_variant as variant", "item_brand as brand", "price", "quantity"])[0]
            })
        })
    }
    function C(t) {
        var n, e = window.chaordic.window.nikeDataLayer;
        pm.fillFromDataLayer(window.dataLayer, ["ecommerce"]),
        e && (e = e.checkoutInfo,
        n = [],
        e.items.map(function(t) {
            var e = i([t.product], ["name", "subDepartment as category", "productNikeId as id", "salePrice as price"])[0]
              , a = {};
            a.name = e.name,
            a.price = e.price,
            a.id = e.id.replace("-", ""),
            a.position = 1,
            a.category = e.category,
            a.quantity = t.quantity,
            a.brand = "Nike",
            n.push(a)
        }),
        t({
            cart: n
        }))
    }
    function A() {
        var i, r = {
            verify: m,
            pages: {
                Categoria: {
                    callback: p
                },
                Produto: {
                    callback: h
                },
                Carrinho: {
                    callback: C
                },
                Checkout: {
                    callback: g
                },
                Confirmacao: {
                    callback: w
                },
                CategoriaNew: {
                    callback: b
                },
                ProdutoNew: {
                    callback: v
                },
                CarrinhoNew: {
                    callback: L
                },
                ConfirmacaoNew: {
                    callback: k
                },
                All: {
                    callback: _
                }
            },
            structHtml: [{
                page: "CategoriaNew",
                elementSelector: '[data-testid="filters-and-products"]'
            }, {
                page: "ProdutoNew",
                elementSelector: '[data-testid="product-sizes"]'
            }, {
                page: "CarrinhoNew",
                elementSelector: '[class^="SummaryCart"]'
            }, {
                page: "CheckoutNew",
                elementSelector: '[data-testid="payment-step"]'
            }, {
                page: "ConfirmacaoNew",
                elementSelector: '[class^="OrderConfirmstyled"]'
            }]
        }, o = "";
        window.location.href,
        new MutationObserver(function() {
            var e, a, t, n;
            i = window.location.href,
            o != i && (o = i,
            e = f,
            a = r,
            t = window.chaordic,
            n = void 0,
            t && (n = t.window.nikeDataLayer),
            t = window.dataLayer,
            n ? e(a) : t && d(function() {
                var e;
                return {
                    condition: a.structHtml.map(function(t) {
                        return 0 < document.querySelectorAll(t.elementSelector).length && (e = t.page,
                        !0)
                    }).includes(!0),
                    valueParam: e
                }
            }, function(t) {
                window.current_page = t,
                e(a)
            }))
        }
        ).observe(document.body, {
            childList: !0,
            subtree: !0
        })
    }
    e = c(261),
    (o = {
        hash: {
            sha256: function(t) {
                t ? (this._h = t._h.slice(0),
                this._buffer = t._buffer.slice(0),
                this._length = t._length) : this.reset()
            }
        },
        codec: {
            hex: {
                fromBits: function(t) {
                    for (var e = "", a = 0; a < t.length; a++)
                        e += (0xf00000000000 + (0 | t[a])).toString(16).substr(4);
                    return e.substr(0, o.bitArray.bitLength(t) / 4)
                }
            },
            utf8String: {
                toBits: function(t) {
                    t = unescape(encodeURIComponent(t));
                    for (var e = [], a = 0, n = 0; n < t.length; n++)
                        a = a << 8 | t.charCodeAt(n),
                        3 == (3 & n) && (e.push(a),
                        a = 0);
                    return 3 & n && e.push(o.bitArray.partial(8 * (3 & n), a)),
                    e
                }
            }
        },
        bitArray: {
            concat: function(t, e) {
                var a, n;
                return 0 === t.length || 0 === e.length || 32 === (n = o.bitArray.getPartial(a = t[t.length - 1])) ? t.concat(e) : o.bitArray._shiftRight(e, n, 0 | a, t.slice(0, t.length - 1))
            },
            bitLength: function(t) {
                var e = t.length;
                return 0 === e ? 0 : (t = t[e - 1],
                32 * (e - 1) + o.bitArray.getPartial(t))
            },
            partial: function(t, e, a) {
                return 32 === t ? e : (a ? 0 | e : e << 32 - t) + 1099511627776 * t
            },
            getPartial: function(t) {
                return Math.round(t / 1099511627776) || 32
            },
            _shiftRight: function(t, e, a, n) {
                var i, r;
                for (void 0 === n && (n = []); 32 <= e; e -= 32)
                    n.push(a),
                    a = 0;
                if (0 === e)
                    return n.concat(t);
                for (i = 0; i < t.length; i++)
                    n.push(a | t[i] >>> e),
                    a = t[i] << 32 - e;
                return r = t.length ? t[t.length - 1] : 0,
                r = o.bitArray.getPartial(r),
                n.push(o.bitArray.partial(e + r & 31, 32 < e + r ? a : n.pop(), 1)),
                n
            }
        }
    }).hash.sha256.hash = function(t) {
        return (new o.hash.sha256).update(t).finalize()
    }
    ,
    o.hash.sha256.prototype = {
        blockSize: 512,
        reset: function() {
            return this._h = this._init.slice(0),
            this._buffer = [],
            this._length = 0,
            this
        },
        update: function(t) {
            "string" == typeof t && (t = o.codec.utf8String.toBits(t));
            for (var e = this._buffer = o.bitArray.concat(this._buffer, t), a = this._length, n = this._length = a + o.bitArray.bitLength(t), i = 512 + a & -512; i <= n; i += 512)
                this._block(e.splice(0, 16));
            return this
        },
        finalize: function() {
            for (var t = this._buffer, e = this._h, a = (t = o.bitArray.concat(t, [o.bitArray.partial(1, 1)])).length + 2; 15 & a; a++)
                t.push(0);
            for (t.push(Math.floor(this._length / 4294967296)),
            t.push(0 | this._length); t.length; )
                this._block(t.splice(0, 16));
            return this.reset(),
            e
        },
        _init: [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
        _key: [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
        _block: function(t) {
            for (var e, a, n = t.slice(0), t = this._h, i = this._key, r = t[0], o = t[1], c = t[2], u = t[3], s = t[4], d = t[5], l = t[6], f = t[7], m = 0; m < 64; m++)
                e = (e = m < 16 ? n[m] : (e = n[m + 1 & 15],
                a = n[m + 14 & 15],
                n[15 & m] = (e >>> 7 ^ e >>> 18 ^ e >>> 3 ^ e << 25 ^ e << 14) + (a >>> 17 ^ a >>> 19 ^ a >>> 10 ^ a << 15 ^ a << 13) + n[15 & m] + n[m + 9 & 15] | 0)) + f + (s >>> 6 ^ s >>> 11 ^ s >>> 25 ^ s << 26 ^ s << 21 ^ s << 7) + (l ^ s & (d ^ l)) + i[m],
                f = l,
                l = d,
                d = s,
                s = u + e | 0,
                u = c,
                c = o,
                r = e + ((o = r) & c ^ u & (o ^ c)) + (o >>> 2 ^ o >>> 13 ^ o >>> 22 ^ o << 30 ^ o << 19 ^ o << 10) | 0;
            t[0] = t[0] + r | 0,
            t[1] = t[1] + o | 0,
            t[2] = t[2] + c | 0,
            t[3] = t[3] + u | 0,
            t[4] = t[4] + s | 0,
            t[5] = t[5] + d | 0,
            t[6] = t[6] + l | 0,
            t[7] = t[7] + f | 0
        }
    },
    a = c(261),
    i = function(t, r) {
        return t.map(function(t) {
            var e, a = {};
            for (e in r) {
                var n = r[e]
                  , i = t[(n = n.includes(" as ") ? n.split(" as ") : [n, n])[0]];
                a[n[1]] = null != i ? i : ""
            }
            return a
        })
    }
    ,
    t = function() {
        var t = e.aid;
        window.pm && window.pm.aid && window.pm.aid === t && A()
    }
    ,
    "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", t) : t()
}
)();
