(async function() {
    const a = "rtbhEvents"
      , b = "__rtbh."
      , c = ["uid", "sid", "aid", "eid"]
      , d = [...c, "lid"]
      , e = 31536000000
      , f = [];
    if (Array.isArray(window.rtbhEvents) || (window.rtbhEvents = []),
    window.rtbhEvents.length && !window.rtbhEvents.push.prototype)
        try {
            function g(a) {
                return !!a && new Date(a) < new Date
            }
            function h() {
                return new Date(new Date().getTime() + e).toISOString()
            }
            function i(a, b="ams") {
                return null === a ? void 0 : function(c, e, f=null) {
                    try {
                        const g = e.filter(a => !d.includes(a.eventType) && "init" !== a.eventType);
                        return k(`https://${b}.creativecdn.com/tags/v2?type=json`, {
                            method: "POST",
                            mode: "cors",
                            credentials: "include",
                            referrerPolicy: "no-referrer-when-downgrade",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            redirect: "follow",
                            body: JSON.stringify({
                                ...j(a, f),
                                tags: [...g, ...z]
                            })
                        }, c)
                    } catch (a) {}
                }
            }
            function j(a, b=null) {
                const c = document.referrer ? document.referrer : "";
                return {
                    v: "v0.1.9",
                    sr: c,
                    su: location.href,
                    th: b ? b : a
                }
            }
            async function k(a, b, c, d) {
                try {
                    const e = "function" == typeof c ? c : () => {}
                      , f = await fetch(a, b)
                      , g = f.status;
                    if (200 <= g && 300 > g)
                        return e(d ? await f.json() : await f.text(), f)
                } catch (a) {}
            }
            function l(a) {
                try {
                    return JSON.parse(a)
                } catch (a) {
                    return null
                }
            }
            function m() {
                const b = window[a].filter(a => a.eventType && "init" === a.eventType)[0];
                return b || null
            }
            function n(a=null) {
                return a && a.value ? a.value : null
            }
            function o(a=null) {
                return a && a.dc && ["ams", "us", "phx", "sin", "ash", "asia"].includes(a.dc) ? a.dc : "ams"
            }
            function p(a) {
                if (x) {
                    const b = a || [];
                    for (const a of b)
                        a()
                }
            }
            function q(a) {
                try {
                    const b = JSON.parse(a)
                      , c = Array.isArray(b) ? b : [];
                    for (const a of c)
                        if (a && a.url && a.type)
                            if ("img" === (a.type + "").toLowerCase()) {
                                const b = new Image;
                                b.src = a.url,
                                b.setAttribute("width", "1"),
                                b.setAttribute("height", "1"),
                                b.setAttribute("scrolling", "no"),
                                b.setAttribute("frameBorder", "0"),
                                b.setAttribute("style", "display:none"),
                                document.body.appendChild(b)
                            } else if ("iframe" === (a.type + "").toLowerCase()) {
                                const b = document.createElement("iframe");
                                b.onload = () => {
                                    setTimeout( () => b.parentNode?.removeChild(b), 3e4)
                                }
                                ,
                                b.setAttribute("width", "1"),
                                b.setAttribute("height", "1"),
                                b.setAttribute("scrolling", "no"),
                                b.setAttribute("frameBorder", "0"),
                                b.setAttribute("style", "display:none"),
                                b.setAttribute("src", a.url),
                                document.body.appendChild(b)
                            }
                } catch (a) {}
            }
            function r(a, b) {
                try {
                    const c = s(a, b)
                      , d = Object.keys(c);
                    for (const a of d)
                        y(q, c[a], a)
                } catch (a) {}
            }
            function s(a, b) {
                try {
                    return a.reduce( (a, c) => {
                        const d = c.hash ? c.hash : b;
                        return (a[d] = a[d] || []).push(c),
                        a
                    }
                    , {})
                } catch (a) {}
            }
            const t = new RegExp(`^(${d.join("|")})$`)
              , u = function() {
                function a(a, b, c, d) {
                    const e = d && "" !== d ? ";domain=" + encodeURIComponent(d) : ""
                      , f = c && "" !== c ? ";expires=" + new Date(new Date().getTime() + c).toUTCString() : "";
                    document.cookie = a + "=" + encodeURIComponent(b) + f + ";path=/" + e + ";SameSite=None;Secure"
                }
                function c(a) {
                    const b = window.document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]*)\\s*(;|$)");
                    return b ? decodeURIComponent(b[2]) : null
                }
                function e(a, b) {
                    window.localStorage.setItem(a, b)
                }
                function f(a) {
                    return window.localStorage.getItem(a)
                }
                function g(a, b) {
                    window.sessionStorage.setItem(a, b)
                }
                function h(a) {
                    return window.sessionStorage.getItem(a)
                }
                return {
                    getAllStorages: a => {
                        const b = h(a);
                        return b ? b : c(a) || f(a)
                    }
                    ,
                    setAllStorages: (b, c, d, f) => {
                        b && c && (a(b, c, d, f),
                        e(b, c),
                        g(b, c))
                    }
                    ,
                    getStorageTags: () => {
                        const a = [];
                        for (const c of d) {
                            const d = u.getAllStorages(b + c)
                              , e = l(d);
                            e && e.eventType && a.push(e)
                        }
                        return a
                    }
                    ,
                    removeFromBaseStorages: a => {
                        window.localStorage.removeItem(a),
                        window.sessionStorage.removeItem(a)
                    }
                }
            }();
            let v = m()
              , w = o(v)
              , x = n(v)
              , y = i(x, w);
            p(f);
            for (const c of d) {
                const d = b + c
                  , f = u.getAllStorages(`__rtbhouse.${c}`)
                  , g = u.getAllStorages(d)
                  , h = window[a].find(a => a.eventType === c && a.id);
                if (h && u.setAllStorages(d, JSON.stringify(h), e),
                !g && f && !f.includes("eventType")) {
                    u.setAllStorages(b + c, JSON.stringify({
                        eventType: c,
                        id: f
                    }), e)
                }
            }
            let z = u.getStorageTags();
            for (const a of z) {
                if (a && !a.expiryDate) {
                    u.setAllStorages(b + a.eventType, JSON.stringify({
                        ...a,
                        expiryDate: h()
                    }), e);
                    continue
                }
                if (c.includes(a?.eventType) && g(a?.expiryDate)) {
                    const c = b + a.eventType;
                    u.removeFromBaseStorages(c)
                }
            }
            const A = b + "lid"
              , B = u.getAllStorages(A)
              , C = function(a) {
                if (a) {
                    const b = l(a);
                    return g(b?.expiryDate)
                }
                return !1
            }(B);
            if (!B || C)
                u.setAllStorages(A, JSON.stringify({
                    eventType: "lid",
                    id: function() {
                        var a = Math.floor;
                        let b = "";
                        for (let c = 0; 20 > c; c++)
                            b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(a(Math.random() * 62));
                        return b
                    }(),
                    expiryDate: h()
                }), e);
            else {
                const a = l(B);
                a?.expiryDate && u.setAllStorages(A, JSON.stringify({
                    ...a,
                    expiryDate: h()
                }), e)
            }
            z = u.getStorageTags(),
            r(window[a], x),
            window[a].push = function() {
                try {
                    const a = Array.prototype.slice.call(arguments).filter(a => (t.test((a || {}).eventType + "") && u.setAllStorages(b + a.eventType, JSON.stringify({
                        ...a,
                        expiryDate: h()
                    }), e),
                    !0));
                    return z = u.getStorageTags(),
                    null === x && (v = m(),
                    w = o(v),
                    x = n(v),
                    y = i(x, w),
                    p(f)),
                    Array.prototype.push.apply(this, arguments),
                    r(a, x),
                    !0
                } catch (a) {}
            }
        } catch (a) {}
}
)();
