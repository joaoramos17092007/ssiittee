'use strict';
var k = function(a) {
    function b(c) {
        return a.next(c)
    }
    function e(c) {
        return a.throw(c)
    }
    return new Promise(function(c, d) {
        function f(h) {
            h.done ? c(h.value) : Promise.resolve(h.value).then(b, e).then(f, d)
        }
        f(a.next())
    }
    )
};
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var m = this || self;
var u, v;
a: {
    for (var x = ["CLOSURE_FLAGS"], B = m, C = 0; C < x.length; C++)
        if (B = B[x[C]],
        B == null) {
            v = null;
            break a
        }
    v = B
}
var G = v && v[610401301];
u = G != null ? G : !1;
var H;
const I = m.navigator;
H = I ? I.userAgentData || null : null;
function J(a) {
    return u ? H ? H.brands.some( ({brand: b}) => b && b.indexOf(a) != -1) : !1 : !1
}
function K(a) {
    var b;
    a: {
        const e = m.navigator;
        if (e) {
            const c = e.userAgent;
            if (c) {
                b = c;
                break a
            }
        }
        b = ""
    }
    return b.indexOf(a) != -1
}
;function L() {
    return u ? !!H && H.brands.length > 0 : !1
}
function O() {
    return L() ? J("Chromium") : (K("Chrome") || K("CriOS")) && !(L() ? 0 : K("Edge")) || K("Silk")
}
;!K("Android") || O();
O();
!K("Safari") || O() || (L() ? 0 : K("Coast")) || (L() ? 0 : K("Opera")) || (L() ? 0 : K("Edge")) || (L() ? J("Microsoft Edge") : K("Edg/")) || L() && J("Opera");
/*

 Copyright 2020 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
function P(a) {
    const b = [];
    let e = 0;
    for (let c = 0; c < a.length; c++) {
        const d = a.charCodeAt(c);
        b[e++] = d
    }
    new Uint8Array(b)
}
;/*

 Copyright 2022 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
Q(1, 0);
Q(2, 16);
Q(2, 18);
Q(2, 1);
Q(2, 3);
Q(2, 1);
Q(2, 2);
P("KEM");
P("HPKE");
P("HPKE-v1");
function Q(a, b) {
    const e = new Uint8Array(a);
    for (let c = 0; c < a; c++)
        e[c] = b >> 8 * (a - c - 1) & 255
}
;const R = /^[0-9A-Fa-f]{64}$/;
function S(a) {
    try {
        return (new TextEncoder).encode(a)
    } catch (b) {
        const e = [];
        for (let c = 0; c < a.length; c++) {
            let d = a.charCodeAt(c);
            d < 128 ? e.push(d) : d < 2048 ? e.push(192 | d >> 6, 128 | d & 63) : d < 55296 || d >= 57344 ? e.push(224 | d >> 12, 128 | d >> 6 & 63, 128 | d & 63) : (d = 65536 + ((d & 1023) << 10 | a.charCodeAt(++c) & 1023),
            e.push(240 | d >> 18, 128 | d >> 12 & 63, 128 | d >> 6 & 63, 128 | d & 63))
        }
        return new Uint8Array(e)
    }
}
function T(a, b) {
    if (a === "" || a === "e0")
        return Promise.resolve(a);
    let e;
    if ((e = b.crypto) == null ? 0 : e.subtle) {
        if (R.test(a))
            return Promise.resolve(a);
        try {
            const c = S(a);
            return b.crypto.subtle.digest("SHA-256", c).then(d => {
                const f = Array.from(new Uint8Array(d)).map(h => String.fromCharCode(h)).join("");
                return b.btoa(f).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
            }
            ).catch( () => "e2")
        } catch (c) {
            return Promise.resolve("e2")
        }
    } else
        return Promise.resolve("e1")
}
;/*
 jQuery (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license.
*/
var V = /\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/
  , W = function(a) {
    var b;
    if (!(b = !a)) {
        var e;
        if (a == null)
            e = String(a);
        else {
            var c = V.exec(Object.prototype.toString.call(Object(a)));
            e = c ? c[1].toLowerCase() : "object"
        }
        b = e != "object"
    }
    if (b || a.nodeType || a == a.window)
        return !1;
    try {
        if (a.constructor && !Object.prototype.hasOwnProperty.call(Object(a), "constructor") && !Object.prototype.hasOwnProperty.call(Object(a.constructor.prototype), "isPrototypeOf"))
            return !1
    } catch (f) {
        return !1
    }
    for (var d in a)
        ;
    return d === void 0 || Object.prototype.hasOwnProperty.call(Object(a), d)
};
var aa = function(a, b) {
    b = a.g + b;
    let e = b.indexOf("\n\n");
    for (; e !== -1; ) {
        var c;
        a: {
            const [p,r] = b.substring(0, e).split("\n");
            if (p.indexOf("event: message") === 0 && r.indexOf("data: ") === 0)
                try {
                    c = JSON.parse(r.substring(r.indexOf(":") + 1));
                    break a
                } catch (q) {}
            c = void 0
        }
        var d = a
          , f = c;
        if (f) {
            var h = f.send_pixel
              , D = f.options
              , y = d.h;
            if (h) {
                var z = h || [];
                if (Array.isArray(z)) {
                    var A = W(D) ? D : {};
                    for (const p of z)
                        y(p, A)
                }
            }
            var E = f.create_iframe
              , w = f.options
              , g = d.i;
            if (E && g) {
                var l = E || [];
                if (Array.isArray(l)) {
                    var n = W(w) ? w : {};
                    for (const p of l)
                        g(p, n)
                }
            }
        }
        b = b.substring(e + 2);
        e = b.indexOf("\n\n")
    }
    a.g = b
}
  , ba = class {
    constructor(a) {
        this.h = a;
        this.g = ""
    }
}
;
var ca = {
    m: 0,
    o: 1,
    0: "GET",
    1: "POST"
};
var ea = function(a, b) {
    return k(function*() {
        if (!b.url)
            return {
                failureType: 9,
                command: 0,
                data: "url required."
            };
        const e = yield X(a, b);
        if ("failureType"in e)
            return e;
        yield da(a, e, b);
        return e
    }())
}
  , fa = function(a, b, e, c) {
    k(function*() {
        let d;
        const f = b.commandType
          , h = b.params;
        switch (f) {
        case 0:
            d = yield ea(a, h);
            break;
        default:
            d = {
                failureType: 8,
                command: f,
                data: `Command with type ${f} unknown.`
            }
        }
        "failureType"in d ? c(d) : e(d)
    }())
}
  , X = function(a, b) {
    return k(function*() {
        function e(g) {
            return k(function*() {
                const [l,n] = g.split("|");
                let[p,r] = l.split(".")
                  , q = r
                  , t = D[p];
                t || (t = l,
                q = "");
                const N = F => k(function*() {
                    try {
                        return yield E(n)(F)
                    } catch (M) {
                        throw new Y(M.message);
                    }
                }());
                if (!q) {
                    if (typeof t === "string")
                        return yield N(t);
                    const F = t
                      , M = Object.keys(F).map(U => k(function*() {
                        const ha = yield N(F[U]);
                        return `${U}=${ha}`
                    }()));
                    return (yield Promise.all(M)).join("&")
                }
                return typeof t === "object" && t[q] ? yield N(t[q]) : g
            }())
        }
        function c(g) {
            return k(function*() {
                let l, n = "";
                for (; g.match(A) && n !== g; ) {
                    n = g;
                    l = g.matchAll(A);
                    const p = [...l].map(q => e(q[1]))
                      , r = yield Promise.all(p);
                    r.length !== 0 && (g = g.replace(A, q => r.shift() || q))
                }
                return g
            }())
        }
        let {url: d, body: f} = b;
        const {attributionReporting: h, templates: D, processResponse: y, method: z=0} = b
          , A = RegExp("\\${([^${}]*?)}", "g")
          , E = g => {
            if (g == null)
                return n => k(function*() {
                    return n
                }());
            const l = a.h[g];
            if (l == null)
                throw Error(`Unknown filter: ${g}`);
            return n => k(function*() {
                return yield l(n, b)
            }())
        }
        ;
        try {
            d = yield c(d),
            f = f ? yield c(f) : void 0
        } catch (g) {
            return {
                failureType: 9,
                command: 0,
                data: `Failed to inject template values: ${g}`
            }
        }
        const w = {
            method: ca[z],
            credentials: "include",
            body: z === 1 ? f : void 0,
            keepalive: !0,
            redirect: "follow"
        };
        y || (w.mode = "no-cors");
        h && (w.attributionReporting = {
            eventSourceEligible: !1,
            triggerEligible: !0
        });
        try {
            const g = yield a.g.fetch(d, w);
            return y && !g.ok ? {
                failureType: 9,
                command: 0,
                data: "Fetch failed"
            } : {
                data: y ? yield g.text() : d
            }
        } catch (g) {
            return {
                failureType: 9,
                command: 0,
                data: `Fetch failed: ${g}`
            }
        }
    }())
}
  , da = function(a, b, e) {
    return k(function*() {
        if (e.processResponse) {
            var c = [];
            aa(new ba( (d, f) => {
                c.push(X(a, {
                    url: d,
                    method: 0,
                    templates: e.templates,
                    processResponse: !1,
                    attributionReporting: f.attribution_reporting
                }))
            }
            ), b.data);
            return Promise.all(c)
        }
    }())
}
  , ia = class {
    constructor(a) {
        this.g = a;
        this.h = {
            sha256: b => {
                const e = this;
                return k(function*() {
                    return yield T(b, e.g)
                }())
            }
            ,
            encode: b => k(function*() {
                return encodeURIComponent(b)
            }()),
            encrypt: () => k(function*() {
                throw new Y("Encryption not supported.");
            }())
        }
    }
}
;
class Y extends Error {
    constructor(a) {
        super(a)
    }
}
;var ja = function(a, b, e) {
    a.g[b] == null && (a.g[b] = 0,
    a.h[b] = e,
    a.i++);
    a.g[b]++;
    return {
        targetId: a.id,
        clientCount: a.i,
        totalLifeMs: Math.round(e - a.l),
        heartbeatCount: a.g[b],
        clientLifeMs: Math.round(e - a.h[b])
    }
};
class ka {
    constructor(a) {
        this.l = a;
        this.g = {};
        this.h = {};
        this.i = 0;
        this.id = String(Math.floor(Number.MAX_SAFE_INTEGER * Math.random()))
    }
}
function Z(a) {
    return a.performance && a.performance.now() || Date.now()
}
var la = function(a, b) {
    class e {
        constructor(c, d) {
            this.h = c;
            this.g = d;
            this.i = new ka(Z(d))
        }
        j(c, d) {
            const f = c.clientId;
            if (c.type === 0)
                c.stats = ja(this.i, f, Z(this.g)),
                d(c);
            else if (c.type === 1)
                try {
                    this.h(c.command, h => {
                        c.result = h;
                        d(c)
                    }
                    , h => {
                        c.failure = h;
                        d(c)
                    }
                    )
                } catch (h) {
                    c.failure = {
                        failureType: 11,
                        data: h.toString()
                    },
                    d(c)
                }
        }
    }
    return new e(a,b)
};
(function(a) {
    a.g.addEventListener("install", () => {
        a.g.skipWaiting()
    }
    );
    a.g.addEventListener("activate", b => {
        b.waitUntil(a.g.clients.claim())
    }
    );
    a.g.addEventListener("message", b => {
        const e = b.source;
        if (e) {
            var c = b.data
              , d = new Promise(f => {
                a.h.j(c, h => {
                    e.postMessage(h);
                    f(void 0)
                }
                )
            }
            );
            b.waitUntil(d)
        }
    }
    )
}
)(new class {
    constructor(a) {
        this.g = a;
        const b = new ia(a);
        this.h = la( (e, c, d) => {
            fa(b, e, c, d)
        }
        , a)
    }
}
(self));
