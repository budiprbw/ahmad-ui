! function(o, n, r, a) {
    "use strict";

    function e(t, e) {
        function i() {
            s.options.originalVideoW = s.options.$video[0].videoWidth, s.options.originalVideoH = s.options.$video[0].videoHeight, s.initialised || s.init()
        }
        var s = this;
        this.element = t, this.options = o.extend({}, h, e), this._defaults = h, this._name = l, this.options.$video = o(t), this.detectBrowser(), this.shimRequestAnimationFrame(), this.options.has3d = this.detect3d(), this.options.$videoWrap.css({
            position: "relative",
            overflow: "hidden",
            "z-index": "10"
        }), this.options.$video.css({
            position: "absolute",
            "z-index": "1"
        }), this.options.$video.on("canplay canplaythrough", i), 3 < this.options.$video[0].readyState && i()
    }
    var l = "backgroundVideo",
        h = {
            $videoWrap: o(".video-wrapper-inner"),
            $outerWrap: o(n),
            $window: o(n),
            minimumVideoWidth: 400,
            preventContextMenu: !1,
            parallax: !0,
            parallaxOptions: {
                effect: 1.5
            },
            pauseVideoOnViewLoss: !1
        };
    e.prototype = {
        init: function() {
            var t = this;
            this.initialised = !0, this.lastPosition = -1, this.ticking = !1, this.options.$window.resize(function() {
                t.positionObject()
            }), this.options.parallax && this.options.$window.on("scroll", function() {
                t.update()
            }), this.options.pauseVideoOnViewLoss && this.playPauseVideo(), this.options.preventContextMenu && this.options.$video.on("contextmenu", function() {
                return !1
            }), this.options.$window.trigger("resize")
        },
        requestTick: function() {
            this.ticking || (n.requestAnimationFrame(this.positionObject.bind(this)), this.ticking = !0)
        },
        update: function() {
            this.lastPosition = n.pageYOffset, this.requestTick()
        },
        detect3d: function() {
            var t, e, i = r.createElement("p"),
                s = {
                    WebkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    MSTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            for (t in r.body.insertBefore(i, r.body.lastChild), s) i.style[t] !== a && (i.style[t] = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)", e = n.getComputedStyle(i).getPropertyValue(s[t]));
            return i.parentNode.removeChild(i), e !== a && "none" !== e
        },
        detectBrowser: function() {
            var t = navigator.userAgent.toLowerCase(); - 1 < t.indexOf("chrome") || -1 < t.indexOf("safari") ? (this.options.browser = "webkit", this.options.browserPrexix = "-webkit-") : -1 < t.indexOf("firefox") ? (this.options.browser = "firefox", this.options.browserPrexix = "-moz-") : -1 !== t.indexOf("MSIE") || 0 < t.indexOf("Trident/") ? (this.options.browser = "ie", this.options.browserPrexix = "-ms-") : -1 < t.indexOf("Opera") && (this.options.browser = "opera", this.options.browserPrexix = "-o-")
        },
        scaleObject: function() {
            var t, e;
            return this.options.$videoWrap.width(this.options.$outerWrap.width()), this.options.$videoWrap.height(this.options.$outerWrap.height()), t = this.options.$window.width() / this.options.originalVideoW, (e = (e = this.options.$window.height() / this.options.originalVideoH) < t ? t : e) * this.options.originalVideoW < this.options.minimumVideoWidth && (e = this.options.minimumVideoWidth / this.options.originalVideoW), this.options.$video.width(e * this.options.originalVideoW), this.options.$video.height(e * this.options.originalVideoH), {
                xPos: -parseInt(this.options.$video.width() - this.options.$window.width()) / 2,
                yPos: parseInt(this.options.$video.height() - this.options.$window.height()) / 2
            }
        },
        positionObject: function() {
            var t = this,
                e = n.pageYOffset,
                i = this.scaleObject(this.options.$video, t.options.$videoWrap),
                s = i.xPos,
                i = i.yPos,
                i = this.options.parallax ? 0 <= e ? this.calculateYPos(i, e) : this.calculateYPos(i, 0) : -i;
            t.options.has3d ? (this.options.$video.css(t.options.browserPrexix + "transform3d", "translate3d(-" + s + "px, " + i + "px, 0)"), this.options.$video.css("transform", "translate3d(" + s + "px, " + i + "px, 0)")) : (this.options.$video.css(t.options.browserPrexix + "transform", "translate(-" + s + "px, " + i + "px)"), this.options.$video.css("transform", "translate(" + s + "px, " + i + "px)")), this.ticking = !1
        },
        calculateYPos: function(t, e) {
            return -((parseInt(this.options.$videoWrap.offset().top) - e) / this.options.parallaxOptions.effect + t)
        },
        disableParallax: function() {
            this.options.$window.unbind(".backgroundVideoParallax")
        },
        playPauseVideo: function() {
            var t = this;
            this.options.$window.on("scroll.backgroundVideoPlayPause", function() {
                t.options.$window.scrollTop() < t.options.$videoWrap.height() ? t.options.$video.get(0).play() : t.options.$video.get(0).pause()
            })
        },
        shimRequestAnimationFrame: function() {
            for (var o = 0, t = ["ms", "moz", "webkit", "o"], e = 0; e < t.length && !n.requestAnimationFrame; ++e) n.requestAnimationFrame = n[t[e] + "RequestAnimationFrame"], n.cancelAnimationFrame = n[t[e] + "CancelAnimationFrame"] || n[t[e] + "CancelRequestAnimationFrame"];
            n.requestAnimationFrame || (n.requestAnimationFrame = function(t) {
                var e = (new Date).getTime(),
                    i = Math.max(0, 16 - (e - o)),
                    s = n.setTimeout(function() {
                        t(e + i)
                    }, i);
                return o = e + i, s
            }), n.cancelAnimationFrame || (n.cancelAnimationFrame = function(t) {
                clearTimeout(t)
            })
        }
    }, o.fn[l] = function(t) {
        return this.each(function() {
            o.data(this, "plugin_" + l) || o.data(this, "plugin_" + l, new e(this, t))
        })
    }
}(jQuery, window, document),
function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.counterUp = e() : t.counterUp = e()
}(window, function() {
    return i = [function(t, e, i) {
        "use strict";
        i.r(e), i.d(e, "divideNumbers", function() {
            return l
        }), i.d(e, "hasComma", function() {
            return s
        }), i.d(e, "isFloat", function() {
            return o
        }), i.d(e, "decimalPlaces", function() {
            return n
        }), e.default = function(e) {
            var i, t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                s = t.action,
                o = t.duration,
                n = void 0 === o ? 1e3 : o,
                o = t.delay,
                r = void 0 === o ? 16 : o,
                t = t.lang,
                t = void 0 === t ? void 0 : t;
            "stop" !== (void 0 === s ? "start" : s) ? (a(e), /[0-9]/.test(e.innerHTML) && (i = l(e.innerHTML, {
                duration: n || e.getAttribute("data-duration"),
                lang: t || document.querySelector("html").getAttribute("lang") || void 0,
                delay: r || e.getAttribute("data-delay")
            }), e._countUpOrigInnerHTML = e.innerHTML, e.innerHTML = i[0], e.style.visibility = "visible", e.countUpTimeout = setTimeout(function t() {
                e.innerHTML = i.shift(), i.length ? (clearTimeout(e.countUpTimeout), e.countUpTimeout = setTimeout(t, r)) : e._countUpOrigInnerHTML = void 0
            }, r))) : a(e)
        };
        var a = function(t) {
                clearTimeout(t.countUpTimeout), t._countUpOrigInnerHTML && (t.innerHTML = t._countUpOrigInnerHTML, t._countUpOrigInnerHTML = void 0), t.style.visibility = ""
            },
            l = function(t) {
                for (var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, i = e.duration, s = e.delay, e = e.lang, o = void 0 === e ? void 0 : e, n = (void 0 === i ? 1e3 : i) / (void 0 === s ? 16 : s), r = t.toString().split(/(<[^>]+>|[0-9.][,.0-9]*[0-9]*)/), a = [], l = 0; l < n; l++) a.push("");
                for (var h = 0; h < r.length; h++)
                    if (/([0-9.][,.0-9]*[0-9]*)/.test(r[h]) && !/<[^>]+>/.test(r[h]))
                        for (var c = r[h], u = /[0-9]+,[0-9]+/.test(c), c = c.replace(/,/g, ""), d = /^[0-9]+\.[0-9]+$/.test(c), p = d ? (c.split(".")[1] || []).length : 0, m = a.length - 1, g = n; 1 <= g; g--) {
                            var f = parseInt(c / n * g, 10);
                            d && (f = parseFloat(c / n * g).toFixed(p), f = parseFloat(f).toLocaleString(o)), u && (f = f.toLocaleString(o)), a[m--] += f
                        } else
                            for (var y = 0; y < n; y++) a[y] += r[h];
                return a[a.length] = t.toString(), a
            },
            s = function(t) {
                return /[0-9]+,[0-9]+/.test(t)
            },
            o = function(t) {
                return /^[0-9]+\.[0-9]+$/.test(t)
            },
            n = function(t) {
                return o(t) ? (t.split(".")[1] || []).length : 0
            }
    }], s = {}, o.m = i, o.c = s, o.d = function(t, e, i) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }, o.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, o.t = function(e, t) {
        if (1 & t && (e = o(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (o.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var s in e) o.d(i, s, function(t) {
                return e[t]
            }.bind(null, s));
        return i
    }, o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return o.d(e, "a", e), e
    }, o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, o.p = "", o(o.s = 0);

    function o(t) {
        if (s[t]) return s[t].exports;
        var e = s[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return i[t].call(e.exports, e, e.exports, o), e.l = !0, e.exports
    }
    var i, s
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && "object" == typeof module.exports ? exports = t(require("jquery")) : t(jQuery)
}(function(e) {
    function i(t) {
        var e = 7.5625,
            i = 2.75;
        return t < 1 / i ? e * t * t : t < 2 / i ? e * (t -= 1.5 / i) * t + .75 : t < 2.5 / i ? e * (t -= 2.25 / i) * t + .9375 : e * (t -= 2.625 / i) * t + .984375
    }
    e.easing.jswing = e.easing.swing;
    var s = Math.pow,
        o = Math.sqrt,
        n = Math.sin,
        r = Math.cos,
        a = Math.PI,
        l = 1.70158,
        h = 1.525 * l,
        c = 2 * a / 3,
        u = 2 * a / 4.5;
    e.extend(e.easing, {
        def: "easeOutQuad",
        swing: function(t) {
            return e.easing[e.easing.def](t)
        },
        easeInQuad: function(t) {
            return t * t
        },
        easeOutQuad: function(t) {
            return 1 - (1 - t) * (1 - t)
        },
        easeInOutQuad: function(t) {
            return t < .5 ? 2 * t * t : 1 - s(-2 * t + 2, 2) / 2
        },
        easeInCubic: function(t) {
            return t * t * t
        },
        easeOutCubic: function(t) {
            return 1 - s(1 - t, 3)
        },
        easeInOutCubic: function(t) {
            return t < .5 ? 4 * t * t * t : 1 - s(-2 * t + 2, 3) / 2
        },
        easeInQuart: function(t) {
            return t * t * t * t
        },
        easeOutQuart: function(t) {
            return 1 - s(1 - t, 4)
        },
        easeInOutQuart: function(t) {
            return t < .5 ? 8 * t * t * t * t : 1 - s(-2 * t + 2, 4) / 2
        },
        easeInQuint: function(t) {
            return t * t * t * t * t
        },
        easeOutQuint: function(t) {
            return 1 - s(1 - t, 5)
        },
        easeInOutQuint: function(t) {
            return t < .5 ? 16 * t * t * t * t * t : 1 - s(-2 * t + 2, 5) / 2
        },
        easeInSine: function(t) {
            return 1 - r(t * a / 2)
        },
        easeOutSine: function(t) {
            return n(t * a / 2)
        },
        easeInOutSine: function(t) {
            return -(r(a * t) - 1) / 2
        },
        easeInExpo: function(t) {
            return 0 === t ? 0 : s(2, 10 * t - 10)
        },
        easeOutExpo: function(t) {
            return 1 === t ? 1 : 1 - s(2, -10 * t)
        },
        easeInOutExpo: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : t < .5 ? s(2, 20 * t - 10) / 2 : (2 - s(2, -20 * t + 10)) / 2
        },
        easeInCirc: function(t) {
            return 1 - o(1 - s(t, 2))
        },
        easeOutCirc: function(t) {
            return o(1 - s(t - 1, 2))
        },
        easeInOutCirc: function(t) {
            return t < .5 ? (1 - o(1 - s(2 * t, 2))) / 2 : (o(1 - s(-2 * t + 2, 2)) + 1) / 2
        },
        easeInElastic: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : -s(2, 10 * t - 10) * n((10 * t - 10.75) * c)
        },
        easeOutElastic: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : s(2, -10 * t) * n((10 * t - .75) * c) + 1
        },
        easeInOutElastic: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : t < .5 ? -(s(2, 20 * t - 10) * n((20 * t - 11.125) * u)) / 2 : s(2, -20 * t + 10) * n((20 * t - 11.125) * u) / 2 + 1
        },
        easeInBack: function(t) {
            return (1 + l) * t * t * t - l * t * t
        },
        easeOutBack: function(t) {
            return 1 + (1 + l) * s(t - 1, 3) + l * s(t - 1, 2)
        },
        easeInOutBack: function(t) {
            return t < .5 ? s(2 * t, 2) * (7.189819 * t - h) / 2 : (s(2 * t - 2, 2) * ((1 + h) * (2 * t - 2) + h) + 2) / 2
        },
        easeInBounce: function(t) {
            return 1 - i(1 - t)
        },
        easeOutBounce: i,
        easeInOutBounce: function(t) {
            return t < .5 ? (1 - i(1 - 2 * t)) / 2 : (1 + i(2 * t - 1)) / 2
        }
    })
}),
function(t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : t.Headhesive = e()
}(this, function() {
    "use strict";

    function t(i, s) {
        function o() {
            c = l(), h = null, a = i.apply(n, r), n = r = null
        }
        var n, r, a, l = Date.now || function() {
                return (new Date).getTime()
            },
            h = null,
            c = 0;
        return function() {
            var t = l(),
                e = s - (t - c);
            return n = this, r = arguments, e <= 0 ? (clearTimeout(h), h = null, c = t, a = i.apply(n, r), n = r = null) : h = h || setTimeout(o, e), a
        }
    }

    function e(t, e) {
        "querySelector" in document && "addEventListener" in window && (this.visible = !1, this.options = {
            offset: 300,
            offsetSide: "top",
            classes: {
                clone: "headhesive",
                stick: "headhesive--stick",
                unstick: "headhesive--unstick"
            },
            throttle: 250,
            onInit: function() {},
            onStick: function() {},
            onUnstick: function() {},
            onDestroy: function() {}
        }, this.elem = "string" == typeof t ? document.querySelector(t) : t, this.options = s(this.options, e), this.init())
    }
    var s = function(t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = "object" == typeof e[i] ? s(t[i], e[i]) : e[i]);
        return t
    };
    return e.prototype = {
        constructor: e,
        init: function() {
            if (this.clonedElem = this.elem.cloneNode(!0), this.clonedElem.className += " " + this.options.classes.clone, document.body.insertBefore(this.clonedElem, document.body.firstChild), "number" == typeof this.options.offset) this.scrollOffset = this.options.offset;
            else {
                if ("string" != typeof this.options.offset) throw new Error("Invalid offset: " + this.options.offset);
                this._setScrollOffset()
            }
            this._throttleUpdate = t(this.update.bind(this), this.options.throttle), this._throttleScrollOffset = t(this._setScrollOffset.bind(this), this.options.throttle), window.addEventListener("scroll", this._throttleUpdate, !1), window.addEventListener("resize", this._throttleScrollOffset, !1), this.options.onInit.call(this)
        },
        _setScrollOffset: function() {
            "string" == typeof this.options.offset && (this.scrollOffset = function(t, e) {
                for (var i = 0, s = t.offsetHeight; t;) i += t.offsetTop, t = t.offsetParent;
                return "bottom" === e && (i += s), i
            }(document.querySelector(this.options.offset), this.options.offsetSide))
        },
        destroy: function() {
            document.body.removeChild(this.clonedElem), window.removeEventListener("scroll", this._throttleUpdate), window.removeEventListener("resize", this._throttleScrollOffset), this.options.onDestroy.call(this)
        },
        stick: function() {
            this.visible || (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.stick, this.visible = !0, this.options.onStick.call(this))
        },
        unstick: function() {
            this.visible && (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.unstick, this.visible = !1, this.options.onUnstick.call(this))
        },
        update: function() {
            (void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop) > this.scrollOffset ? this.stick() : this.unstick()
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                t = i[t] = i[t] || [];
            return -1 == t.indexOf(e) && t.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0, this
        }
    }, e.off = function(t, e) {
        t = this._events && this._events[t];
        if (t && t.length) {
            e = t.indexOf(e);
            return -1 != e && t.splice(e, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var n = i[o];
                s && s[n] && (this.off(t, n), delete s[n]), n.apply(this, e)
            }
            return this
        }
    }, e.allOff = function() {
        delete this._events, delete this._onceEvents
    }, t
}),
function(e, i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.imagesLoaded = i(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function r(t, e, i) {
        if (!(this instanceof r)) return new r(t, e, i);
        var s, o = t;
        return (o = "string" == typeof t ? document.querySelectorAll(t) : o) ? (this.elements = (s = o, Array.isArray(s) ? s : "object" == typeof s && "number" == typeof s.length ? h.call(s) : [s]), this.options = n({}, this.options), "function" == typeof e ? i = e : n(this.options, e), i && this.on("always", i), this.getImages(), a && (this.jqDeferred = new a.Deferred), void setTimeout(this.check.bind(this))) : void l.error("Bad element for imagesLoaded " + (o || t))
    }

    function i(t) {
        this.img = t
    }

    function s(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    var a = e.jQuery,
        l = e.console,
        h = Array.prototype.slice;
    (r.prototype = Object.create(t.prototype)).options = {}, r.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, r.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && c[e]) {
            for (var i = t.querySelectorAll("img"), s = 0; s < i.length; s++) {
                var o = i[s];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background)
                for (var n = t.querySelectorAll(this.options.background), s = 0; s < n.length; s++) {
                    var r = n[s];
                    this.addElementBackgroundImages(r)
                }
        }
    };
    var c = {
        1: !0,
        9: !0,
        11: !0
    };
    return r.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, s = i.exec(e.backgroundImage); null !== s;) {
                var o = s && s[2];
                o && this.addBackground(o, t), s = i.exec(e.backgroundImage)
            }
    }, r.prototype.addImage = function(t) {
        t = new i(t);
        this.images.push(t)
    }, r.prototype.addBackground = function(t, e) {
        e = new s(t, e);
        this.images.push(e)
    }, r.prototype.check = function() {
        function e(t, e, i) {
            setTimeout(function() {
                s.progress(t, e, i)
            })
        }
        var s = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(t) {
            t.once("progress", e), t.check()
        }) : void this.complete()
    }, r.prototype.progress = function(t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, t, e)
    }, r.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred && (t = this.hasAnyBroken ? "reject" : "resolve", this.jqDeferred[t](this))
    }, (i.prototype = Object.create(t.prototype)).check = function() {
        return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, i.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }, i.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, i.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, i.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, i.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, (s.prototype = Object.create(i.prototype)).check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, (r.makeJQueryPlugin = function(t) {
        (t = t || e.jQuery) && ((a = t).fn.imagesLoaded = function(t, e) {
            return new r(this, t, e).jqDeferred.promise(a(this))
        })
    })(), r
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("jquery")) : e.jQueryBridget = i(e, e.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(l, h, c) {
        (c = c || e || t.jQuery) && (h.prototype.option || (h.prototype.option = function(t) {
            c.isPlainObject(t) && (this.options = c.extend(!0, this.options, t))
        }), c.fn[l] = function(t) {
            if ("string" != typeof t) return a = t, this.each(function(t, e) {
                var i = c.data(e, l);
                i ? (i.option(a), i._init()) : (i = new h(e, a), c.data(e, l, i))
            }), this;
            var s, o, n, r, a, e = u.call(arguments, 1);
            return o = e, r = "$()." + l + '("' + (s = t) + '")', (t = this).each(function(t, e) {
                var i = c.data(e, l);
                i ? (e = i[s]) && "_" != s.charAt(0) ? (i = e.apply(i, o), n = void 0 === n ? i : n) : d(r + " is not a valid method") : d(l + " not initialized. Cannot call methods, i.e. " + r)
            }), void 0 !== n ? n : t
        }, s(c))
    }

    function s(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var u = Array.prototype.slice,
        o = t.console,
        d = void 0 === o ? function() {} : function(t) {
            o.error(t)
        };
    return s(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                t = i[t] = i[t] || [];
            return -1 == t.indexOf(e) && t.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0, this
        }
    }, e.off = function(t, e) {
        t = this._events && this._events[t];
        if (t && t.length) {
            e = t.indexOf(e);
            return -1 != e && t.splice(e, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var n = i[o];
                s && s[n] && (this.off(t, n), delete s[n]), n.apply(this, e)
            }
            return this
        }
    }, e.allOff = function() {
        delete this._events, delete this._onceEvents
    }, t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function p(t) {
        var e = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(e) && e
    }

    function m(t) {
        t = getComputedStyle(t);
        return t || e("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), t
    }

    function g(t) {
        if (b || (b = !0, (d = document.createElement("div")).style.width = "200px", d.style.padding = "1px 2px 3px 4px", d.style.borderStyle = "solid", d.style.borderWidth = "1px 2px 3px 4px", d.style.boxSizing = "border-box", (u = document.body || document.documentElement).appendChild(d), c = m(d), f = 200 == Math.round(p(c.width)), g.isBoxSizeOuter = f, u.removeChild(d)), (t = "string" == typeof t ? document.querySelector(t) : t) && "object" == typeof t && t.nodeType) {
            var e = m(t);
            if ("none" == e.display) return function() {
                for (var t = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, e = 0; e < v; e++) t[y[e]] = 0;
                return t
            }();
            var i = {};
            i.width = t.offsetWidth, i.height = t.offsetHeight;
            for (var s = i.isBorderBox = "border-box" == e.boxSizing, o = 0; o < v; o++) {
                var n = y[o],
                    r = e[n],
                    r = parseFloat(r);
                i[n] = isNaN(r) ? 0 : r
            }
            var a = i.paddingLeft + i.paddingRight,
                l = i.paddingTop + i.paddingBottom,
                h = i.marginLeft + i.marginRight,
                c = i.marginTop + i.marginBottom,
                u = i.borderLeftWidth + i.borderRightWidth,
                d = i.borderTopWidth + i.borderBottomWidth,
                t = s && f,
                s = p(e.width);
            !1 !== s && (i.width = s + (t ? 0 : a + u));
            s = p(e.height);
            return !1 !== s && (i.height = s + (t ? 0 : l + d)), i.innerWidth = i.width - (a + u), i.innerHeight = i.height - (l + d), i.outerWidth = i.width + h, i.outerHeight = i.height + c, i
        }
        var d, u, c
    }
    var f, e = "undefined" == typeof console ? function() {} : function(t) {
            console.error(t)
        },
        y = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        v = y.length,
        b = !1;
    return g
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var i = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var s = e[i] + "MatchesSelector";
            if (t[s]) return s
        }
    }();
    return function(t, e) {
        return t[i](e)
    }
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("desandro-matches-selector")) : e.fizzyUIUtils = i(e, e.matchesSelector)
}(window, function(i, n) {
    var l = {
            extend: function(t, e) {
                for (var i in e) t[i] = e[i];
                return t
            },
            modulo: function(t, e) {
                return (t % e + e) % e
            }
        },
        e = Array.prototype.slice;
    l.makeArray = function(t) {
        return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? e.call(t) : [t]
    }, l.removeFrom = function(t, e) {
        e = t.indexOf(e); - 1 != e && t.splice(e, 1)
    }, l.getParent = function(t, e) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, n(t, e)) return t
    }, l.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, l.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, l.filterFindElements = function(t, s) {
        t = l.makeArray(t);
        var o = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement)
                if (s) {
                    n(t, s) && o.push(t);
                    for (var e = t.querySelectorAll(s), i = 0; i < e.length; i++) o.push(e[i])
                } else o.push(t)
        }), o
    }, l.debounceMethod = function(t, e, s) {
        s = s || 100;
        var o = t.prototype[e],
            n = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[n];
            clearTimeout(t);
            var e = arguments,
                i = this;
            this[n] = setTimeout(function() {
                o.apply(i, e), delete i[n]
            }, s)
        }
    }, l.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, l.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var h = i.console;
    return l.htmlInit = function(r, a) {
        l.docReady(function() {
            var t = l.toDashed(a),
                s = "data-" + t,
                e = document.querySelectorAll("[" + s + "]"),
                t = document.querySelectorAll(".js-" + t),
                t = l.makeArray(e).concat(l.makeArray(t)),
                o = s + "-options",
                n = i.jQuery;
            t.forEach(function(e) {
                var t = e.getAttribute(s) || e.getAttribute(o);
                try {
                    i = t && JSON.parse(t)
                } catch (t) {
                    return void(h && h.error("Error parsing " + s + " on " + e.className + ": " + t))
                }
                var i = new r(e, i);
                n && n.data(e, a, i)
            })
        })
    }, l
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";

    function i(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }
    var s = document.documentElement.style,
        o = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        n = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        r = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        } [o],
        a = {
            transform: n,
            transition: o,
            transitionDuration: o + "Duration",
            transitionProperty: o + "Property",
            transitionDelay: o + "Delay"
        },
        t = i.prototype = Object.create(t.prototype);
    t.constructor = i, t._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, t.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, t.getSize = function() {
        this.size = e(this.element)
    }, t.css = function(t) {
        var e, i = this.element.style;
        for (e in t) i[a[e] || e] = t[e]
    }, t.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            s = t[e ? "left" : "right"],
            o = t[i ? "top" : "bottom"],
            n = parseFloat(s),
            r = parseFloat(o),
            t = this.layout.size; - 1 != s.indexOf("%") && (n = n / 100 * t.width), -1 != o.indexOf("%") && (r = r / 100 * t.height), n = isNaN(n) ? 0 : n, r = isNaN(r) ? 0 : r, n -= e ? t.paddingLeft : t.paddingRight, r -= i ? t.paddingTop : t.paddingBottom, this.position.x = n, this.position.y = r
    }, t.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            s = this.layout._getOption("originTop"),
            o = i ? "right" : "left",
            n = this.position.x + t[i ? "paddingLeft" : "paddingRight"];
        e[i ? "left" : "right"] = this.getXValue(n), e[o] = "";
        o = s ? "bottom" : "top", t = this.position.y + t[s ? "paddingTop" : "paddingBottom"];
        e[s ? "top" : "bottom"] = this.getYValue(t), e[o] = "", this.css(e), this.emitEvent("layout", [this])
    }, t.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, t.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, t._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            s = this.position.y,
            o = t == this.position.x && e == this.position.y;
        this.setPosition(t, e), !o || this.isTransitioning ? ((o = {}).transform = this.getTranslate(t - i, e - s), this.transition({
            to: o,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })) : this.layoutPosition()
    }, t.getTranslate = function(t, e) {
        return "translate3d(" + (t = this.layout._getOption("originLeft") ? t : -t) + "px, " + (e = this.layout._getOption("originTop") ? e : -e) + "px, 0)"
    }, t.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, t.moveTo = t._transitionTo, t.setPosition = function(t, e) {
        this.position.x = parseFloat(t), this.position.y = parseFloat(e)
    }, t._nonTransition = function(t) {
        for (var e in this.css(t.to), t.isCleaning && this._removeStyles(t.to), t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, t.transition = function(t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
            var e, i = this._transn;
            for (e in t.onTransitionEnd) i.onEnd[e] = t.onTransitionEnd[e];
            for (e in t.to) i.ingProperties[e] = !0, t.isCleaning && (i.clean[e] = !0);
            t.from && (this.css(t.from), this.element.offsetHeight, 0), this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        } else this._nonTransition(t)
    };
    var l = "opacity," + n.replace(/([A-Z])/g, function(t) {
        return "-" + t.toLowerCase()
    });
    t.enableTransition = function() {
        var t;
        this.isTransitioning || (t = "number" == typeof(t = this.layout.options.transitionDuration) ? t + "ms" : t, this.css({
            transitionProperty: l,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0
        }), this.element.addEventListener(r, this, !1))
    }, t.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }, t.onotransitionend = function(t) {
        this.ontransitionend(t)
    };
    var h = {
        "-webkit-transform": "transform"
    };
    t.ontransitionend = function(t) {
        var e, i;
        t.target === this.element && (e = this._transn, i = h[t.propertyName] || t.propertyName, delete e.ingProperties[i], function(t) {
            for (var e in t) return;
            return 1
        }(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd && (e.onEnd[i].call(this), delete e.onEnd[i]), this.emitEvent("transitionEnd", [this]))
    }, t.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(r, this, !1), this.isTransitioning = !1
    }, t._removeStyles = function(t) {
        var e, i = {};
        for (e in t) i[e] = "";
        this.css(i)
    };
    var c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return t.removeTransitionStyles = function() {
        this.css(c)
    }, t.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, t.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, t.remove = function() {
        return o && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, t.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {};
        e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, t.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, t.getHideRevealTransitionEndProperty = function(t) {
        var e, t = this.layout.options[t];
        if (t.opacity) return "opacity";
        for (e in t) return e
    }, t.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {};
        e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, t.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, t.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, i
}),
function(o, n) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(t, e, i, s) {
        return n(o, t, e, i, s)
    }) : "object" == typeof module && module.exports ? module.exports = n(o, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : o.Outlayer = n(o, o.EvEmitter, o.getSize, o.fizzyUIUtils, o.Outlayer.Item)
}(window, function(t, e, o, s, n) {
    "use strict";

    function r(t, e) {
        var i = s.getQueryElement(t);
        i ? (this.element = i, h && (this.$element = h(this.element)), this.options = s.extend({}, this.constructor.defaults), this.option(e), e = ++c, this.element.outlayerGUID = e, (u[e] = this)._create(), this._getOption("initLayout") && this.layout()) : l && l.error("Bad element for " + this.constructor.namespace + ": " + (i || t))
    }

    function a(t) {
        function e() {
            t.apply(this, arguments)
        }
        return (e.prototype = Object.create(t.prototype)).constructor = e
    }

    function i() {}
    var l = t.console,
        h = t.jQuery,
        c = 0,
        u = {};
    r.namespace = "outlayer", r.Item = n, r.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var d = r.prototype;
    s.extend(d, e.prototype), d.option = function(t) {
        s.extend(this.options, t)
    }, d._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, d._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), s.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
    }, d.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, d._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, s = [], o = 0; o < e.length; o++) {
            var n = new i(e[o], this);
            s.push(n)
        }
        return s
    }, d._filterFindItemElements = function(t) {
        return s.filterFindElements(t, this.options.itemSelector)
    }, d.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }, d.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            t = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, t), this._isLayoutInited = !0
    }, d._init = d.layout, d._resetLayout = function() {
        this.getSize()
    }, d.getSize = function() {
        this.size = o(this.element)
    }, d._getMeasurement = function(t, e) {
        var i, s = this.options[t];
        s ? ("string" == typeof s ? i = this.element.querySelector(s) : s instanceof HTMLElement && (i = s), this[t] = i ? o(i)[e] : s) : this[t] = 0
    }, d.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, d._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }, d._layoutItems = function(t, i) {
        var s;
        this._emitCompleteOnItems("layout", t), t && t.length && (s = [], t.forEach(function(t) {
            var e = this._getItemLayoutPosition(t);
            e.item = t, e.isInstant = i || t.isLayoutInstant, s.push(e)
        }, this), this._processLayoutQueue(s))
    }, d._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, d._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, d.updateStagger = function() {
        var t = this.options.stagger;
        return null == t ? void(this.stagger = 0) : (this.stagger = function(t) {
            if ("number" == typeof t) return t;
            var t = (e = t.match(/(^\d*\.?\d*)(\w*)/)) && e[1],
                e = e && e[2];
            return t.length ? (t = parseFloat(t)) * (p[e] || 1) : 0
        }(t), this.stagger)
    }, d._positionItem = function(t, e, i, s, o) {
        s ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
    }, d._postLayout = function() {
        this.resizeContainer()
    }, d.resizeContainer = function() {
        var t;
        !this._getOption("resizeContainer") || (t = this._getContainerSize()) && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
    }, d._getContainerSize = i, d._setContainerMeasure = function(t, e) {
        var i;
        void 0 !== t && ((i = this.size).isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px")
    }, d._emitCompleteOnItems = function(e, t) {
        function i() {
            n.dispatchEvent(e + "Complete", null, [t])
        }

        function s() {
            ++o == r && i()
        }
        var o, n = this,
            r = t.length;
        t && r ? (o = 0, t.forEach(function(t) {
            t.once(e, s)
        })) : i()
    }, d.dispatchEvent = function(t, e, i) {
        var s = e ? [e].concat(i) : i;
        this.emitEvent(t, s), h && (this.$element = this.$element || h(this.element), e ? ((e = h.Event(e)).type = t, this.$element.trigger(e, i)) : this.$element.trigger(t, i))
    }, d.ignore = function(t) {
        t = this.getItem(t);
        t && (t.isIgnored = !0)
    }, d.unignore = function(t) {
        t = this.getItem(t);
        t && delete t.isIgnored
    }, d.stamp = function(t) {
        (t = this._find(t)) && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, d.unstamp = function(t) {
        (t = this._find(t)) && t.forEach(function(t) {
            s.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, d._find = function(t) {
        if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), s.makeArray(t)
    }, d._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, d._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, d._manageStamp = i, d._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            i = this._boundingRect,
            t = o(t);
        return {
            left: e.left - i.left - t.marginLeft,
            top: e.top - i.top - t.marginTop,
            right: i.right - e.right - t.marginRight,
            bottom: i.bottom - e.bottom - t.marginBottom
        }
    }, d.handleEvent = s.handleEvent, d.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, d.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, d.onresize = function() {
        this.resize()
    }, s.debounceMethod(r, "onresize", 100), d.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, d.needsResizeLayout = function() {
        var t = o(this.element);
        return this.size && t && t.innerWidth !== this.size.innerWidth
    }, d.addItems = function(t) {
        t = this._itemize(t);
        return t.length && (this.items = this.items.concat(t)), t
    }, d.appended = function(t) {
        t = this.addItems(t);
        t.length && (this.layoutItems(t, !0), this.reveal(t))
    }, d.prepended = function(t) {
        var e = this._itemize(t);
        e.length && (t = this.items.slice(0), this.items = e.concat(t), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(t))
    }, d.reveal = function(t) {
        var i;
        this._emitCompleteOnItems("reveal", t), t && t.length && (i = this.updateStagger(), t.forEach(function(t, e) {
            t.stagger(e * i), t.reveal()
        }))
    }, d.hide = function(t) {
        var i;
        this._emitCompleteOnItems("hide", t), t && t.length && (i = this.updateStagger(), t.forEach(function(t, e) {
            t.stagger(e * i), t.hide()
        }))
    }, d.revealItemElements = function(t) {
        t = this.getItems(t);
        this.reveal(t)
    }, d.hideItemElements = function(t) {
        t = this.getItems(t);
        this.hide(t)
    }, d.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, d.getItems = function(t) {
        t = s.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            t = this.getItem(t);
            t && e.push(t)
        }, this), e
    }, d.remove = function(t) {
        t = this.getItems(t);
        this._emitCompleteOnItems("remove", t), t && t.length && t.forEach(function(t) {
            t.remove(), s.removeFrom(this.items, t)
        }, this)
    }, d.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy()
        }), this.unbindResize();
        t = this.element.outlayerGUID;
        delete u[t], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
    }, r.data = function(t) {
        t = (t = s.getQueryElement(t)) && t.outlayerGUID;
        return t && u[t]
    }, r.create = function(t, e) {
        var i = a(r);
        return i.defaults = s.extend({}, r.defaults), s.extend(i.defaults, e), i.compatOptions = s.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = a(n), s.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
    };
    var p = {
        ms: 1,
        s: 1e3
    };
    return r.Item = n, r
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype),
        s = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++, s.call(this), this.sortData = {}
    }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t, e = this.layout.options.getSortData,
                i = this.layout._sorters;
            for (t in e) {
                var s = i[t];
                this.sortData[t] = s(this.element, this)
            }
        }
    };
    var o = i.destroy;
    return i.destroy = function() {
        o.apply(this, arguments), this.css({
            display: ""
        })
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(e, i) {
    "use strict";

    function s(t) {
        (this.isotope = t) && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }
    var o = s.prototype;
    return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function(t) {
        o[t] = function() {
            return i.prototype[t].apply(this.isotope, arguments)
        }
    }), o.needsVerticalResizeLayout = function() {
        var t = e(this.isotope.element);
        return this.isotope.size && t && t.innerHeight != this.isotope.size.innerHeight
    }, o._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, o.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }, o.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }, o.getSegmentSize = function(t, e) {
        var i = t + e,
            s = "outer" + e;
        this._getMeasurement(i, s), this[i] || (t = this.getFirstItemSize(), this[i] = t && t[s] || this.isotope.size["inner" + e])
    }, o.getFirstItemSize = function() {
        var t = this.isotope.filteredItems[0];
        return t && t.element && e(t.element)
    }, o.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, o.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size
    }, s.modes = {}, s.create = function(t, e) {
        function i() {
            s.apply(this, arguments)
        }
        return (i.prototype = Object.create(o)).constructor = i, e && (i.options = e), s.modes[i.prototype.namespace = t] = i
    }, s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, a) {
    var e = t.create("masonry");
    e.compatOptions.fitWidth = "isFitWidth";
    t = e.prototype;
    return t._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, t.measureColumns = function() {
        this.getContainerWidth(), this.columnWidth || (i = (e = this.items[0]) && e.element, this.columnWidth = i && a(i).outerWidth || this.containerWidth);
        var t = this.columnWidth += this.gutter,
            e = this.containerWidth + this.gutter,
            i = e / t,
            t = t - e % t,
            i = Math[t && t < 1 ? "round" : "floor"](i);
        this.cols = Math.max(i, 1)
    }, t.getContainerWidth = function() {
        var t = this._getOption("fitWidth") ? this.element.parentNode : this.element,
            t = a(t);
        this.containerWidth = t && t.innerWidth
    }, t._getItemLayoutPosition = function(t) {
        t.getSize();
        for (var e = t.size.outerWidth % this.columnWidth, i = Math[e && e < 1 ? "round" : "ceil"](t.size.outerWidth / this.columnWidth), i = Math.min(i, this.cols), s = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, t), e = {
                x: this.columnWidth * s.col,
                y: s.y
            }, o = s.y + t.size.outerHeight, n = i + s.col, r = s.col; r < n; r++) this.colYs[r] = o;
        return e
    }, t._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t),
            t = Math.min.apply(Math, e);
        return {
            col: e.indexOf(t),
            y: t
        }
    }, t._getTopColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, s = 0; s < i; s++) e[s] = this._getColGroupY(s, t);
        return e
    }, t._getColGroupY = function(t, e) {
        if (e < 2) return this.colYs[t];
        e = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, e)
    }, t._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols,
            i = 1 < t && i + t > this.cols ? 0 : i,
            e = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = e ? i + t : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }, t._manageStamp = function(t) {
        var e = a(t),
            i = this._getElementOffset(t),
            s = this._getOption("originLeft") ? i.left : i.right,
            t = s + e.outerWidth,
            s = Math.floor(s / this.columnWidth),
            s = Math.max(0, s),
            o = Math.floor(t / this.columnWidth);
        o -= t % this.columnWidth ? 0 : 1;
        for (var o = Math.min(this.cols - 1, o), n = (this._getOption("originTop") ? i.top : i.bottom) + e.outerHeight, r = s; r <= o; r++) this.colYs[r] = Math.max(n, this.colYs[r])
    }, t._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, t._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, t.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    "use strict";
    var i, t = t.create("masonry"),
        s = t.prototype,
        o = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for (i in e.prototype) o[i] || (s[i] = e.prototype[i]);
    var n = s.measureColumns;
    s.measureColumns = function() {
        this.items = this.isotope.filteredItems, n.call(this)
    };
    var r = s._getOption;
    return s._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : r.apply(this.isotope, arguments)
    }, t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        t = e.prototype;
    return t._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, t._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        i = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, i
    }, t._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
            horizontalAlignment: 0
        }),
        t = e.prototype;
    return t._resetLayout = function() {
        this.y = 0
    }, t._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        }
    }, t._getContainerSize = function() {
        return {
            height: this.y
        }
    }, e
}),
function(r, a) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function(t, e, i, s, o, n) {
        return a(r, t, e, i, s, o, n)
    }) : "object" == typeof module && module.exports ? module.exports = a(r, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : r.Isotope = a(r, r.Outlayer, r.getSize, r.matchesSelector, r.fizzyUIUtils, r.Isotope.Item, r.Isotope.LayoutMode)
}(window, function(t, i, e, s, n, o, r) {
    var a = t.jQuery,
        l = String.prototype.trim ? function(t) {
            return t.trim()
        } : function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        h = i.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    h.Item = o, h.LayoutMode = r;
    o = h.prototype;
    o._create = function() {
        for (var t in this.itemGUID = 0, this._sorters = {}, this._getSorters(), i.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"], r.modes) this._initLayoutMode(t)
    }, o.reloadItems = function() {
        this.itemGUID = 0, i.prototype.reloadItems.call(this)
    }, o._itemize = function() {
        for (var t = i.prototype._itemize.apply(this, arguments), e = 0; e < t.length; e++) t[e].id = this.itemGUID++;
        return this._updateItemsSortData(t), t
    }, o._initLayoutMode = function(t) {
        var e = r.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, o.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, o._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, o.arrange = function(t) {
        this.option(t), this._getIsInstant();
        t = this._filter(this.items);
        this.filteredItems = t.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [t]) : this._hideReveal(t), this._sort(), this._layout()
    }, o._init = o.arrange, o._hideReveal = function(t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, o._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            t = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = t
    }, o._bindArrangeComplete = function() {
        function t() {
            e && i && s && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
        }
        var e, i, s, o = this;
        this.once("layoutComplete", function() {
            e = !0, t()
        }), this.once("hideComplete", function() {
            i = !0, t()
        }), this.once("revealComplete", function() {
            s = !0, t()
        })
    }, o._filter = function(t) {
        for (var e = this.options.filter, i = [], s = [], o = [], n = this._getFilterTest(e = e || "*"), r = 0; r < t.length; r++) {
            var a, l = t[r];
            l.isIgnored || ((a = n(l)) && i.push(l), a && l.isHidden ? s.push(l) : a || l.isHidden || o.push(l))
        }
        return {
            matches: i,
            needReveal: s,
            needHide: o
        }
    }, o._getFilterTest = function(e) {
        return a && this.options.isJQueryFiltering ? function(t) {
            return a(t.element).is(e)
        } : "function" == typeof e ? function(t) {
            return e(t.element)
        } : function(t) {
            return s(t.element, e)
        }
    }, o.updateSortData = function(t) {
        t = t ? (t = n.makeArray(t), this.getItems(t)) : this.items;
        this._getSorters(), this._updateItemsSortData(t)
    }, o._getSorters = function() {
        var t, e = this.options.getSortData;
        for (t in e) {
            var i = e[t];
            this._sorters[t] = c(i)
        }
    }, o._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) t[i].updateSortData()
    };
    var c = function(t) {
        if ("string" != typeof t) return t;
        var e, i, s = l(t).split(" "),
            o = s[0],
            t = (t = o.match(/^\[(.+)\]$/)) && t[1],
            n = (i = o, (e = t) ? function(t) {
                return t.getAttribute(e)
            } : function(t) {
                t = t.querySelector(i);
                return t && t.textContent
            }),
            r = h.sortDataParsers[s[1]];
        return r ? function(t) {
            return t && r(n(t))
        } : function(t) {
            return t && n(t)
        }
    };
    h.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    }, o._sort = function() {
        var t, r, a;
        this.options.sortBy && (t = n.makeArray(this.options.sortBy), this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory)), r = this.sortHistory, a = this.options.sortAscending, this.filteredItems.sort(function(t, e) {
            for (var i = 0; i < r.length; i++) {
                var s = r[i],
                    o = t.sortData[s],
                    n = e.sortData[s];
                if (n < o || o < n) return (n < o ? 1 : -1) * ((void 0 !== a[s] ? a[s] : a) ? 1 : -1)
            }
            return 0
        }))
    }, o._getIsSameSortBy = function(t) {
        for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e]) return !1;
        return !0
    }, o._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, o._resetLayout = function() {
        i.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, o._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }, o._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }, o._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, o.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, o.appended = function(t) {
        t = this.addItems(t);
        t.length && (t = this._filterRevealAdded(t), this.filteredItems = this.filteredItems.concat(t))
    }, o.prepended = function(t) {
        var e = this._itemize(t);
        e.length && (this._resetLayout(), this._manageStamps(), t = this._filterRevealAdded(e), this.layoutItems(this.filteredItems), this.filteredItems = t.concat(this.filteredItems), this.items = e.concat(this.items))
    }, o._filterRevealAdded = function(t) {
        t = this._filter(t);
        return this.hide(t.needHide), this.reveal(t.matches), this.layoutItems(t.matches, !0), t.matches
    }, o.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            for (var i, s = e.length, o = 0; o < s; o++) i = e[o], this.element.appendChild(i.element);
            t = this._filter(e).matches;
            for (o = 0; o < s; o++) e[o].isLayoutInstant = !0;
            for (this.arrange(), o = 0; o < s; o++) delete e[o].isLayoutInstant;
            this.reveal(t)
        }
    };
    var u = o.remove;
    return o.remove = function(t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        u.call(this, t);
        for (var i = e && e.length, s = 0; i && s < i; s++) {
            var o = e[s];
            n.removeFrom(this.filteredItems, o)
        }
    }, o.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) this.items[t].sortData.random = Math.random();
        this.options.sortBy = "random", this._sort(), this._layout()
    }, o._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        e = t.apply(this, e);
        return this.options.transitionDuration = i, e
    }, o.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }, h
});
class DoubleCenterException {
    constructor() {
        window.console.error('iTooltip Error: positionX and positionY properties cannot be "center" at the same time.')
    }
}
class iTooltip {
    constructor(t = "*") {
        this.objects = document.querySelectorAll("*" !== t ? t : "*[title]")
    }
    init(t = {}) {
        if (this.settings = Object.assign({
                className: "tooltip",
                indentX: 10,
                indentY: 15,
                positionX: "right",
                positionY: "bottom"
            }, t), "center" === this.settings.positionX && "center" === this.settings.positionY) throw new DoubleCenterException;
        this.objects.forEach(t => {
            t.getAttribute("title") && (t.addEventListener("mouseenter", t => this.createTooltip(t)), t.addEventListener("mouseleave", t => this.removeTooltip(t)))
        })
    }
    createTooltip(t) {
        const e = t.target;
        this.tooltip = document.createElement("div"), this.tooltip.classList.add(this.settings.className), this.tooltip.innerHTML = e.getAttribute("title");
        var i = t.target.className.split(" ").find(t => t.startsWith("itooltip-"));
        i && this.tooltip.classList.add(i), this.tooltip.style.position = "absolute", this.changePosition(t), e.removeAttribute("title"), document.body.appendChild(this.tooltip), e.addEventListener("mousemove", t => this.changePosition(t))
    }
    removeTooltip(t) {
        t.target.setAttribute("title", this.tooltip.innerHTML), this.tooltip.remove()
    }
    changePosition(t) {
        var [e, i] = this.getSizeTooltip(), s = this.getEdges(t), o = window.pageYOffset || document.documentElement.scrollTop;
        let n = t.pageY,
            r;
        if (r = "right" === this.settings.positionX ? s.right <= e ? t.clientX - e - this.settings.indentX : t.clientX + this.settings.indentX : "left" === this.settings.positionX ? s.left <= e ? s.left + this.settings.indentX : t.clientX - e - this.settings.indentX : s.left <= Math.round(e / 2) ? t.clientX - s.left : t.clientX - Math.round(e / 2), "top" === this.settings.positionY) n = s.top <= i ? o + t.clientY + this.settings.indentY : t.pageY - i - this.settings.indentY;
        else if ("bottom" === this.settings.positionY) n = s.bottom < i && s.top > i + this.settings.indentY ? t.pageY - i - this.settings.indentY : o + t.clientY + this.settings.indentY;
        else {
            let t = Math.round(i / 2);
            s.bottom <= t && (t = Math.round(i - s.bottom)), s.top <= t && (t = s.top), n -= t
        }
        this.tooltip.style.top = `${n}px`, this.tooltip.style.left = `${r}px`
    }
    getSizeTooltip() {
        var t = this.tooltip.getBoundingClientRect();
        return [t.right - t.left, t.bottom - t.top]
    }
    getEdges(t) {
        var e = document.documentElement;
        return {
            left: t.clientX,
            right: e.clientWidth - t.clientX,
            top: t.clientY,
            bottom: e.clientHeight - t.clientY
        }
    }
}! function(a) {
    a.fn.hmbrgr = function(t) {
        function o(t) {
            a(t).data("clickable", !0).find("span").eq(0).css({
                top: i
            }), a(t).find("span").eq(1).css({
                top: r
            }), a(t).find("span").eq(2).css({
                top: s
            })
        }

        function e(s) {
            a(s).on("click", function(t) {
                var e, i;
                t.preventDefault(), a(this).data("clickable") && (a(this).data("clickable", !1), a(s).toggleClass("cross"), a(s).hasClass("cross") ? (a(i = s).find("span").css({
                    top: r
                }), setTimeout(function() {
                    a(i).addClass(n.animation).data("clickable", !0), a.isFunction(n.onOpen) && n.onOpen.call(this)
                }, n.speed)) : (a(e = s).removeClass(n.animation), setTimeout(function() {
                    o(e), a.isFunction(n.onClose) && n.onClose.call(this)
                }, n.speed)))
            })
        }
        var n = a.extend({
                width: 60,
                height: 50,
                speed: 200,
                barHeight: 8,
                barRadius: 0,
                barColor: "#ffffff",
                animation: "expand",
                onInit: null,
                onOpen: null,
                onClose: null
            }, t),
            i = 0,
            r = n.height / 2 - n.barHeight / 2,
            s = n.height - n.barHeight;
        return this.each(function() {
            (function(t) {
                a(t).css({
                    width: n.width,
                    height: n.height
                }).html("<span /><span /><span />").find("span").css({
                    position: "absolute",
                    width: "100%",
                    height: n.barHeight,
                    "border-radius": n.barRadius,
                    "background-color": n.barColor,
                    "transition-duration": n.speed + "ms"
                }), o(t), a.isFunction(n.onInit) && n.onInit.call(this)
            })(this), e(this)
        })
    }
}(jQuery),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
}(function(l) {
    var h, c, t = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        e = "onwheel" in window.document || 9 <= window.document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        u = Array.prototype.slice;
    if (l.event.fixHooks)
        for (var i = t.length; i;) l.event.fixHooks[t[--i]] = l.event.mouseHooks;
    var d = l.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var t = e.length; t;) this.addEventListener(e[--t], s, !1);
            else this.onmousewheel = s;
            l.data(this, "mousewheel-line-height", d.getLineHeight(this)), l.data(this, "mousewheel-page-height", d.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var t = e.length; t;) this.removeEventListener(e[--t], s, !1);
            else this.onmousewheel = null;
            l.removeData(this, "mousewheel-line-height"), l.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(t) {
            var e = l(t);
            return (t = e["offsetParent" in l.fn ? "offsetParent" : "parent"]()).length || (t = l("body")), parseInt(t.css("fontSize"), 10) || parseInt(e.css("fontSize"), 10) || 16
        },
        getPageHeight: function(t) {
            return l(t).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };

    function s(t) {
        var e, i = t || window.event,
            s = u.call(arguments, 1),
            o = 0,
            n = 0,
            r = 0,
            a = 0;
        if ((t = l.event.fix(i)).type = "mousewheel", "detail" in i && (r = -1 * i.detail), "wheelDelta" in i && (r = i.wheelDelta), "wheelDeltaY" in i && (r = i.wheelDeltaY), "wheelDeltaX" in i && (n = -1 * i.wheelDeltaX), "axis" in i && i.axis === i.HORIZONTAL_AXIS && (n = -1 * r, r = 0), o = 0 === r ? n : r, "deltaY" in i && (o = r = -1 * i.deltaY), "deltaX" in i && (n = i.deltaX, 0 === r && (o = -1 * n)), 0 !== r || 0 !== n) return 1 === i.deltaMode ? (o *= e = l.data(this, "mousewheel-line-height"), r *= e, n *= e) : 2 === i.deltaMode && (o *= e = l.data(this, "mousewheel-page-height"), r *= e, n *= e), a = Math.max(Math.abs(r), Math.abs(n)), (!c || a < c) && m(i, c = a) && (c /= 40), m(i, a) && (o /= 40, n /= 40, r /= 40), o = Math[1 <= o ? "floor" : "ceil"](o / c), n = Math[1 <= n ? "floor" : "ceil"](n / c), r = Math[1 <= r ? "floor" : "ceil"](r / c), d.settings.normalizeOffset && this.getBoundingClientRect && (a = this.getBoundingClientRect(), t.offsetX = t.clientX - a.left, t.offsetY = t.clientY - a.top), t.deltaX = n, t.deltaY = r, t.deltaFactor = c, t.deltaMode = 0, s.unshift(t, o, n, r), h && window.clearTimeout(h), h = window.setTimeout(p, 200), (l.event.dispatch || l.event.handle).apply(this, s)
    }

    function p() {
        c = null
    }

    function m(t, e) {
        return d.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 == 0
    }
    l.fn.extend({
        mousewheel: function(t) {
            return t ? this.on("mousewheel", t) : this.trigger("mousewheel")
        },
        unmousewheel: function(t) {
            return this.off("mousewheel", t)
        }
    })
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && "object" == typeof module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function($) {
    function initMouseDetection(t) {
        var n, r, e = ".smartmenus_mouse";
        mouseDetectionEnabled || t ? mouseDetectionEnabled && t && ($(document).off(e), mouseDetectionEnabled = !1) : (n = !0, r = null, (t = {
            mousemove: function(t) {
                var e, i, s, o = {
                    x: t.pageX,
                    y: t.pageY,
                    timeStamp: (new Date).getTime()
                };
                r && (e = Math.abs(r.x - o.x), i = Math.abs(r.y - o.y), (0 < e || 0 < i) && e <= 4 && i <= 4 && o.timeStamp - r.timeStamp <= 300 && (mouse = !0, n) && ((s = $(t.target).closest("a")).is("a") && $.each(menuTrees, function() {
                    return $.contains(this.$root[0], s[0]) ? (this.itemEnter({
                        currentTarget: s[0]
                    }), !1) : void 0
                }), n = !1)), r = o
            }
        })[touchEvents ? "touchstart" : "pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut"] = function(t) {
            isTouchEvent(t.originalEvent) && (mouse = !1)
        }, $(document).on(getEventsNS(t, e)), mouseDetectionEnabled = !0)
    }

    function isTouchEvent(t) {
        return !/^(4|mouse)$/.test(t.pointerType)
    }

    function getEventsNS(t, e) {
        e = e || "";
        var i, s = {};
        for (i in t) s[i.split(" ").join(e + " ") + e] = t[i];
        return s
    }
    var menuTrees = [],
        mouse = !1,
        touchEvents = "ontouchstart" in window,
        mouseDetectionEnabled = !1,
        requestAnimationFrame = window.requestAnimationFrame || function(t) {
            return setTimeout(t, 1e3 / 60)
        },
        cancelAnimationFrame = window.cancelAnimationFrame || function(t) {
            clearTimeout(t)
        },
        canAnimate = !!$.fn.animate;
    return $.SmartMenus = function(t, e) {
        this.$root = $(t), this.opts = e, this.rootId = "", this.accessIdPrefix = "", this.$subArrow = null, this.activatedItems = [], this.visibleSubMenus = [], this.showTimeout = 0, this.hideTimeout = 0, this.scrollTimeout = 0, this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.idInc = 0, this.$firstLink = null, this.$firstSub = null, this.disabled = !1, this.$disableOverlay = null, this.$touchScrollingSub = null, this.cssTransforms3d = "perspective" in t.style || "webkitPerspective" in t.style, this.wasCollapsible = !1, this.init()
    }, $.extend($.SmartMenus, {
        hideAll: function() {
            $.each(menuTrees, function() {
                this.menuHideAll()
            })
        },
        destroy: function() {
            for (; menuTrees.length;) menuTrees[0].destroy();
            initMouseDetection(!0)
        },
        prototype: {
            init: function(t) {
                var i, s, o, n = this;
                t || (menuTrees.push(this), this.rootId = ((new Date).getTime() + Math.random() + "").replace(/\D/g, ""), this.accessIdPrefix = "sm-" + this.rootId + "-", this.$root.hasClass("sm-rtl") && (this.opts.rightToLeftSubMenus = !0), t = ".smartmenus", this.$root.data("smartmenus", this).attr("data-smartmenus-id", this.rootId).dataSM("level", 1).on(getEventsNS({
                    "mouseover focusin": $.proxy(this.rootOver, this),
                    "mouseout focusout": $.proxy(this.rootOut, this),
                    keydown: $.proxy(this.rootKeyDown, this)
                }, ".smartmenus")).on(getEventsNS({
                    mouseenter: $.proxy(this.itemEnter, this),
                    mouseleave: $.proxy(this.itemLeave, this),
                    mousedown: $.proxy(this.itemDown, this),
                    focus: $.proxy(this.itemFocus, this),
                    blur: $.proxy(this.itemBlur, this),
                    click: $.proxy(this.itemClick, this)
                }, ".smartmenus"), "a"), t += this.rootId, this.opts.hideOnClick && $(document).on(getEventsNS({
                    touchstart: $.proxy(this.docTouchStart, this),
                    touchmove: $.proxy(this.docTouchMove, this),
                    touchend: $.proxy(this.docTouchEnd, this),
                    click: $.proxy(this.docClick, this)
                }, t)), $(window).on(getEventsNS({
                    "resize orientationchange": $.proxy(this.winResize, this)
                }, t)), this.opts.subIndicators && (this.$subArrow = $("<span/>").addClass("sub-arrow"), this.opts.subIndicatorsText && this.$subArrow.html(this.opts.subIndicatorsText)), initMouseDetection()), this.$firstSub = this.$root.find("ul").each(function() {
                    n.menuInit($(this))
                }).eq(0), this.$firstLink = this.$root.find("a").eq(0), this.opts.markCurrentItem && (i = /(index|default)\.[^#\?\/]*/i, s = window.location.href.replace(i, ""), o = s.replace(/#.*/, ""), this.$root.find("a:not(.mega-menu a)").each(function() {
                    var t = this.href.replace(i, ""),
                        e = $(this);
                    t != s && t != o || (e.addClass("current"), n.opts.markCurrentTree && e.parentsUntil("[data-smartmenus-id]", "ul").each(function() {
                        $(this).dataSM("parent-a").addClass("current")
                    }))
                })), this.wasCollapsible = this.isCollapsible()
            },
            destroy: function(t) {
                var e;
                t || (e = ".smartmenus", this.$root.removeData("smartmenus").removeAttr("data-smartmenus-id").removeDataSM("level").off(".smartmenus"), e += this.rootId, $(document).off(e), $(window).off(e), this.opts.subIndicators && (this.$subArrow = null)), this.menuHideAll();
                var i = this;
                this.$root.find("ul").each(function() {
                    var t = $(this);
                    t.dataSM("scroll-arrows") && t.dataSM("scroll-arrows").remove(), t.dataSM("shown-before") && ((i.opts.subMenusMinWidth || i.opts.subMenusMaxWidth) && t.css({
                        width: "",
                        minWidth: "",
                        maxWidth: ""
                    }).removeClass("sm-nowrap"), t.dataSM("scroll-arrows") && t.dataSM("scroll-arrows").remove(), t.css({
                        zIndex: "",
                        top: "",
                        left: "",
                        marginLeft: "",
                        marginTop: "",
                        display: ""
                    })), 0 == (t.attr("id") || "").indexOf(i.accessIdPrefix) && t.removeAttr("id")
                }).removeDataSM("in-mega").removeDataSM("shown-before").removeDataSM("scroll-arrows").removeDataSM("parent-a").removeDataSM("level").removeDataSM("beforefirstshowfired").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeAttr("aria-expanded"), this.$root.find("a.has-submenu").each(function() {
                    var t = $(this);
                    0 == t.attr("id").indexOf(i.accessIdPrefix) && t.removeAttr("id")
                }).removeClass("has-submenu").removeDataSM("sub").removeAttr("aria-haspopup").removeAttr("aria-controls").removeAttr("aria-expanded").closest("li").removeDataSM("sub"), this.opts.subIndicators && this.$root.find("span.sub-arrow").remove(), this.opts.markCurrentItem && this.$root.find("a.current").removeClass("current"), t || (this.$root = null, this.$firstLink = null, this.$firstSub = null, this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), menuTrees.splice($.inArray(this, menuTrees), 1))
            },
            disable: function(t) {
                this.disabled || (this.menuHideAll(), t || this.opts.isPopup || !this.$root.is(":visible") || (t = this.$root.offset(), this.$disableOverlay = $('<div class="sm-jquery-disable-overlay"/>').css({
                    position: "absolute",
                    top: t.top,
                    left: t.left,
                    width: this.$root.outerWidth(),
                    height: this.$root.outerHeight(),
                    zIndex: this.getStartZIndex(!0),
                    opacity: 0
                }).appendTo(document.body)), this.disabled = !0)
            },
            docClick: function(t) {
                return this.$touchScrollingSub ? void(this.$touchScrollingSub = null) : void((this.visibleSubMenus.length && !$.contains(this.$root[0], t.target) || $(t.target).closest("a").length) && this.menuHideAll())
            },
            docTouchEnd: function() {
                var t;
                this.lastTouch && (!this.visibleSubMenus.length || void 0 !== this.lastTouch.x2 && this.lastTouch.x1 != this.lastTouch.x2 || void 0 !== this.lastTouch.y2 && this.lastTouch.y1 != this.lastTouch.y2 || this.lastTouch.target && $.contains(this.$root[0], this.lastTouch.target) || (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), (t = this).hideTimeout = setTimeout(function() {
                    t.menuHideAll()
                }, 350)), this.lastTouch = null)
            },
            docTouchMove: function(t) {
                this.lastTouch && (t = t.originalEvent.touches[0], this.lastTouch.x2 = t.pageX, this.lastTouch.y2 = t.pageY)
            },
            docTouchStart: function(t) {
                t = t.originalEvent.touches[0];
                this.lastTouch = {
                    x1: t.pageX,
                    y1: t.pageY,
                    target: t.target
                }
            },
            enable: function() {
                this.disabled && (this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), this.disabled = !1)
            },
            getClosestMenu: function(t) {
                for (var e = $(t).closest("ul"); e.dataSM("in-mega");) e = e.parent().closest("ul");
                return e[0] || null
            },
            getHeight: function(t) {
                return this.getOffset(t, !0)
            },
            getOffset: function(t, e) {
                var i;
                "none" == t.css("display") && (i = {
                    position: t[0].style.position,
                    visibility: t[0].style.visibility
                }, t.css({
                    position: "absolute",
                    visibility: "hidden"
                }).show());
                var s = t[0].getBoundingClientRect && t[0].getBoundingClientRect(),
                    s = s && (e ? s.height || s.bottom - s.top : s.width || s.right - s.left);
                return s || 0 === s || (s = e ? t[0].offsetHeight : t[0].offsetWidth), i && t.hide().css(i), s
            },
            getStartZIndex: function(t) {
                var e = parseInt(this[t ? "$root" : "$firstSub"].css("z-index"));
                return !t && isNaN(e) && (e = parseInt(this.$root.css("z-index"))), isNaN(e) ? 1 : e
            },
            getTouchPoint: function(t) {
                return t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0] || t
            },
            getViewport: function(t) {
                var e = t ? "Height" : "Width",
                    t = document.documentElement["client" + e],
                    e = window["inner" + e];
                return t = e ? Math.min(t, e) : t
            },
            getViewportHeight: function() {
                return this.getViewport(!0)
            },
            getViewportWidth: function() {
                return this.getViewport()
            },
            getWidth: function(t) {
                return this.getOffset(t)
            },
            handleEvents: function() {
                return !this.disabled && this.isCSSOn()
            },
            handleItemEvents: function(t) {
                return this.handleEvents() && !this.isLinkInMegaMenu(t)
            },
            isCollapsible: function() {
                return "static" == this.$firstSub.css("position")
            },
            isCSSOn: function() {
                return "inline" != this.$firstLink.css("display")
            },
            isFixed: function() {
                var t = "fixed" == this.$root.css("position");
                return t || this.$root.parentsUntil("body").each(function() {
                    return "fixed" == $(this).css("position") ? !(t = !0) : void 0
                }), t
            },
            isLinkInMegaMenu: function(t) {
                return $(this.getClosestMenu(t[0])).hasClass("mega-menu")
            },
            isTouchMode: function() {
                return !mouse || this.opts.noMouseOver || this.isCollapsible()
            },
            itemActivate: function(t, e) {
                var i, s, o = t.closest("ul"),
                    n = o.dataSM("level");
                1 < n && (!this.activatedItems[n - 2] || this.activatedItems[n - 2][0] != o.dataSM("parent-a")[0]) && (i = this, $(o.parentsUntil("[data-smartmenus-id]", "ul").get().reverse()).add(o).each(function() {
                    i.itemActivate($(this).dataSM("parent-a"))
                })), this.isCollapsible() && !e || this.menuHideSubMenus(this.activatedItems[n - 1] && this.activatedItems[n - 1][0] == t[0] ? n : n - 1), this.activatedItems[n - 1] = t, !1 !== this.$root.triggerHandler("activate.smapi", t[0]) && (s = t.dataSM("sub")) && (this.isTouchMode() || !this.opts.showOnClick || this.clickActivated) && this.menuShow(s)
            },
            itemBlur: function(t) {
                t = $(t.currentTarget);
                this.handleItemEvents(t) && this.$root.triggerHandler("blur.smapi", t[0])
            },
            itemClick: function(t) {
                var e = $(t.currentTarget);
                if (this.handleItemEvents(e)) {
                    if (this.$touchScrollingSub && this.$touchScrollingSub[0] == e.closest("ul")[0]) return this.$touchScrollingSub = null, t.stopPropagation(), !1;
                    if (!1 === this.$root.triggerHandler("click.smapi", e[0])) return !1;
                    var i = e.dataSM("sub"),
                        s = !!i && 2 == i.dataSM("level");
                    if (i) {
                        var o = $(t.target).is(".sub-arrow"),
                            n = this.isCollapsible(),
                            r = /toggle$/.test(this.opts.collapsibleBehavior),
                            a = /link$/.test(this.opts.collapsibleBehavior),
                            t = /^accordion/.test(this.opts.collapsibleBehavior);
                        if (i.is(":visible")) {
                            if (!n && this.opts.showOnClick && s) return this.menuHide(i), this.clickActivated = !1, this.focusActivated = !1;
                            if (n && (r || o)) return this.itemActivate(e, t), this.menuHide(i), !1
                        } else if ((!a || !n || o) && (!n && this.opts.showOnClick && s && (this.clickActivated = !0), this.itemActivate(e, t), i.is(":visible"))) return !(this.focusActivated = !0)
                    }
                    return !(!n && this.opts.showOnClick && s || e.hasClass("disabled") || !1 === this.$root.triggerHandler("select.smapi", e[0])) && void 0
                }
            },
            itemDown: function(t) {
                t = $(t.currentTarget);
                this.handleItemEvents(t) && t.dataSM("mousedown", !0)
            },
            itemEnter: function(t) {
                var e, i = $(t.currentTarget);
                this.handleItemEvents(i) && (this.isTouchMode() || (this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0), (e = this).showTimeout = setTimeout(function() {
                    e.itemActivate(i)
                }, this.opts.showOnClick && 1 == i.closest("ul").dataSM("level") ? 1 : this.opts.showTimeout)), this.$root.triggerHandler("mouseenter.smapi", i[0]))
            },
            itemFocus: function(t) {
                t = $(t.currentTarget);
                this.handleItemEvents(t) && (!this.focusActivated || this.isTouchMode() && t.dataSM("mousedown") || this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0] == t[0] || this.itemActivate(t, !0), this.$root.triggerHandler("focus.smapi", t[0]))
            },
            itemLeave: function(t) {
                t = $(t.currentTarget);
                this.handleItemEvents(t) && (this.isTouchMode() || (t[0].blur(), this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0)), t.removeDataSM("mousedown"), this.$root.triggerHandler("mouseleave.smapi", t[0]))
            },
            menuHide: function(t) {
                var e;
                !1 !== this.$root.triggerHandler("beforehide.smapi", t[0]) && (canAnimate && t.stop(!0, !0), "none" != t.css("display")) && (e = function() {
                    t.css("z-index", "")
                }, this.isCollapsible() ? canAnimate && this.opts.collapsibleHideFunction ? this.opts.collapsibleHideFunction.call(this, t, e) : t.hide(this.opts.collapsibleHideDuration, e) : canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, t, e) : t.hide(this.opts.hideDuration, e), t.dataSM("scroll") && (this.menuScrollStop(t), t.css({
                    "touch-action": "",
                    "-ms-touch-action": "",
                    "-webkit-transform": "",
                    transform: ""
                }).off(".smartmenus_scroll").removeDataSM("scroll").dataSM("scroll-arrows").hide()), t.dataSM("parent-a").removeClass("highlighted").attr("aria-expanded", "false"), t.attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                }), e = t.dataSM("level"), this.activatedItems.splice(e - 1, 1), this.visibleSubMenus.splice($.inArray(t, this.visibleSubMenus), 1), this.$root.triggerHandler("hide.smapi", t[0]))
            },
            menuHideAll: function() {
                this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
                for (var t = this.opts.isPopup ? 1 : 0, e = this.visibleSubMenus.length - 1; t <= e; e--) this.menuHide(this.visibleSubMenus[e]);
                this.opts.isPopup && (canAnimate && this.$root.stop(!0, !0), this.$root.is(":visible") && (canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, this.$root) : this.$root.hide(this.opts.hideDuration))), this.activatedItems = [], this.visibleSubMenus = [], this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.$root.triggerHandler("hideAll.smapi")
            },
            menuHideSubMenus: function(t) {
                for (var e = this.activatedItems.length - 1; t <= e; e--) {
                    var i = this.activatedItems[e].dataSM("sub");
                    i && this.menuHide(i)
                }
            },
            menuInit: function(t) {
                if (!t.dataSM("in-mega")) {
                    t.hasClass("mega-menu") && t.find("ul").dataSM("in-mega", !0);
                    for (var e = 2, i = t[0];
                        (i = i.parentNode.parentNode) != this.$root[0];) e++;
                    var s = t.prevAll("a").eq(-1);
                    (s = !s.length ? t.prevAll().find("a").eq(-1) : s).addClass("has-submenu").dataSM("sub", t), t.dataSM("parent-a", s).dataSM("level", e).parent().dataSM("sub", t);
                    var o = s.attr("id") || this.accessIdPrefix + ++this.idInc,
                        n = t.attr("id") || this.accessIdPrefix + ++this.idInc;
                    s.attr({
                        id: o,
                        "aria-haspopup": "true",
                        "aria-controls": n,
                        "aria-expanded": "false"
                    }), t.attr({
                        id: n,
                        role: "group",
                        "aria-hidden": "true",
                        "aria-labelledby": o,
                        "aria-expanded": "false"
                    }), this.opts.subIndicators && s[this.opts.subIndicatorsPos](this.$subArrow.clone())
                }
            },
            menuPosition: function(e) {
                var t, i, s = e.dataSM("parent-a"),
                    o = s.closest("li"),
                    n = o.parent(),
                    r = e.dataSM("level"),
                    a = this.getWidth(e),
                    l = this.getHeight(e),
                    h = s.offset(),
                    c = h.left,
                    u = h.top,
                    d = this.getWidth(s),
                    p = this.getHeight(s),
                    m = $(window),
                    g = m.scrollLeft(),
                    f = m.scrollTop(),
                    h = this.getViewportWidth(),
                    s = this.getViewportHeight(),
                    m = n.parent().is("[data-sm-horizontal-sub]") || 2 == r && !n.hasClass("sm-vertical"),
                    n = this.opts.rightToLeftSubMenus && !o.is("[data-sm-reverse]") || !this.opts.rightToLeftSubMenus && o.is("[data-sm-reverse]"),
                    o = 2 == r ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX,
                    r = 2 == r ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY,
                    r = m ? (t = n ? d - a - o : o, this.opts.bottomToTopSubMenus ? -l - r : p + r) : (t = n ? o - a : d - o, this.opts.bottomToTopSubMenus ? p - r - l : r);
                this.opts.keepInViewport && (c = c + t, u = u + r, n && c < g ? t = m ? g - c + t : d - o : !n && g + h < c + a && (t = m ? g + h - a - c + t : o - a), m || (l < s && f + s < u + l ? r += f + s - l - u : (s <= l || u < f) && (r += f - u)), (m && (f + s + .49 < u + l || u < f) || !m && s + .49 < l) && (i = this, e.dataSM("scroll-arrows") || e.dataSM("scroll-arrows", $([$('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], $('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0]]).on({
                    mouseenter: function() {
                        e.dataSM("scroll").up = $(this).hasClass("scroll-up"), i.menuScroll(e)
                    },
                    mouseleave: function(t) {
                        i.menuScrollStop(e), i.menuScrollOut(e, t)
                    },
                    "mousewheel DOMMouseScroll": function(t) {
                        t.preventDefault()
                    }
                }).insertAfter(e)), s = ".smartmenus_scroll", e.dataSM("scroll", {
                    y: this.cssTransforms3d ? 0 : r - p,
                    step: 1,
                    itemH: p,
                    subH: l,
                    arrowDownH: this.getHeight(e.dataSM("scroll-arrows").eq(1))
                }).on(getEventsNS({
                    mouseover: function(t) {
                        i.menuScrollOver(e, t)
                    },
                    mouseout: function(t) {
                        i.menuScrollOut(e, t)
                    },
                    "mousewheel DOMMouseScroll": function(t) {
                        i.menuScrollMousewheel(e, t)
                    }
                }, s)).dataSM("scroll-arrows").css({
                    top: "auto",
                    left: "0",
                    marginLeft: t + (parseInt(e.css("border-left-width")) || 0),
                    width: a - (parseInt(e.css("border-left-width")) || 0) - (parseInt(e.css("border-right-width")) || 0),
                    zIndex: e.css("z-index")
                }).eq(m && this.opts.bottomToTopSubMenus ? 0 : 1).show(), this.isFixed() && ((m = {})[touchEvents ? "touchstart touchmove touchend" : "pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp"] = function(t) {
                    i.menuScrollTouch(e, t)
                }, e.css({
                    "touch-action": "none",
                    "-ms-touch-action": "none"
                }).on(getEventsNS(m, s))))), e.css({
                    top: "auto",
                    left: "0",
                    marginLeft: t,
                    marginTop: r - p
                })
            },
            menuScroll: function(t, e, i) {
                var s, o = t.dataSM("scroll"),
                    n = t.dataSM("scroll-arrows"),
                    r = o.up ? o.upEnd : o.downEnd;
                if (!e && o.momentum) {
                    if (o.momentum *= .92, (s = o.momentum) < .5) return void this.menuScrollStop(t)
                } else s = i || (e || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(o.step));
                var a, i = t.dataSM("level");
                this.activatedItems[i - 1] && this.activatedItems[i - 1].dataSM("sub") && this.activatedItems[i - 1].dataSM("sub").is(":visible") && this.menuHideSubMenus(i - 1), o.y = o.up && o.y >= r || !o.up && r >= o.y ? o.y : Math.abs(r - o.y) > s ? o.y + (o.up ? s : -s) : r, t.css(this.cssTransforms3d ? {
                    "-webkit-transform": "translate3d(0, " + o.y + "px, 0)",
                    transform: "translate3d(0, " + o.y + "px, 0)"
                } : {
                    marginTop: o.y
                }), mouse && (o.up && o.y > o.downEnd || !o.up && o.y < o.upEnd) && n.eq(o.up ? 1 : 0).show(), o.y == r ? (mouse && n.eq(o.up ? 0 : 1).hide(), this.menuScrollStop(t)) : e || (this.opts.scrollAccelerate && o.step < this.opts.scrollStep && (o.step += .2), (a = this).scrollTimeout = requestAnimationFrame(function() {
                    a.menuScroll(t)
                }))
            },
            menuScrollMousewheel: function(t, e) {
                var i;
                this.getClosestMenu(e.target) == t[0] && (i = 0 < ((e = e.originalEvent).wheelDelta || -e.detail), t.dataSM("scroll-arrows").eq(i ? 0 : 1).is(":visible") && (t.dataSM("scroll").up = i, this.menuScroll(t, !0))), e.preventDefault()
            },
            menuScrollOut: function(t, e) {
                mouse && (/^scroll-(up|down)/.test((e.relatedTarget || "").className) || (t[0] == e.relatedTarget || $.contains(t[0], e.relatedTarget)) && this.getClosestMenu(e.relatedTarget) == t[0] || t.dataSM("scroll-arrows").css("visibility", "hidden"))
            },
            menuScrollOver: function(t, e) {
                var i;
                mouse && !/^scroll-(up|down)/.test(e.target.className) && this.getClosestMenu(e.target) == t[0] && (this.menuScrollRefreshData(t), i = t.dataSM("scroll"), e = $(window).scrollTop() - t.dataSM("parent-a").offset().top - i.itemH, t.dataSM("scroll-arrows").eq(0).css("margin-top", e).end().eq(1).css("margin-top", e + this.getViewportHeight() - i.arrowDownH).end().css("visibility", "visible"))
            },
            menuScrollRefreshData: function(t) {
                var e = t.dataSM("scroll"),
                    i = $(window).scrollTop() - t.dataSM("parent-a").offset().top - e.itemH;
                this.cssTransforms3d && (i = -(parseFloat(t.css("margin-top")) - i)), $.extend(e, {
                    upEnd: i,
                    downEnd: i + this.getViewportHeight() - e.subH
                })
            },
            menuScrollStop: function(t) {
                return this.scrollTimeout ? (cancelAnimationFrame(this.scrollTimeout), this.scrollTimeout = 0, t.dataSM("scroll").step = 1, !0) : void 0
            },
            menuScrollTouch: function(t, e) {
                var i, s, o, n;
                isTouchEvent(e = e.originalEvent) && (i = this.getTouchPoint(e), this.getClosestMenu(i.target) == t[0] && (s = t.dataSM("scroll"), /(start|down)$/i.test(e.type) ? (this.menuScrollStop(t) ? (e.preventDefault(), this.$touchScrollingSub = t) : this.$touchScrollingSub = null, this.menuScrollRefreshData(t), $.extend(s, {
                    touchStartY: i.pageY,
                    touchStartTime: e.timeStamp
                })) : /move$/i.test(e.type) ? (void 0 !== (o = void 0 !== s.touchY ? s.touchY : s.touchStartY) && o != i.pageY && (this.$touchScrollingSub = t, n = i.pageY > o, void 0 !== s.up && s.up != n && $.extend(s, {
                    touchStartY: i.pageY,
                    touchStartTime: e.timeStamp
                }), $.extend(s, {
                    up: n,
                    touchY: i.pageY
                }), this.menuScroll(t, !0, Math.abs(i.pageY - o))), e.preventDefault()) : void 0 !== s.touchY && ((s.momentum = 15 * Math.pow(Math.abs(i.pageY - s.touchStartY) / (e.timeStamp - s.touchStartTime), 2)) && (this.menuScrollStop(t), this.menuScroll(t), e.preventDefault()), delete s.touchY)))
            },
            menuShow: function(t) {
                var e, i, s;
                !t.dataSM("beforefirstshowfired") && (t.dataSM("beforefirstshowfired", !0), !1 === this.$root.triggerHandler("beforefirstshow.smapi", t[0])) || !1 === this.$root.triggerHandler("beforeshow.smapi", t[0]) || (t.dataSM("shown-before", !0), canAnimate && t.stop(!0, !0), t.is(":visible")) || (e = t.dataSM("parent-a"), i = this.isCollapsible(), (this.opts.keepHighlighted || i) && e.addClass("highlighted"), i ? t.removeClass("sm-nowrap").css({
                    zIndex: "",
                    width: "auto",
                    minWidth: "",
                    maxWidth: "",
                    top: "",
                    left: "",
                    marginLeft: "",
                    marginTop: ""
                }) : (t.css("z-index", this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1), (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) && (t.css({
                    width: "auto",
                    minWidth: "",
                    maxWidth: ""
                }).addClass("sm-nowrap"), this.opts.subMenusMinWidth && t.css("min-width", this.opts.subMenusMinWidth), this.opts.subMenusMaxWidth) && (s = this.getWidth(t), t.css("max-width", this.opts.subMenusMaxWidth), s > this.getWidth(t) && t.removeClass("sm-nowrap").css("width", this.opts.subMenusMaxWidth)), this.menuPosition(t)), s = function() {
                    t.css("overflow", "")
                }, i ? canAnimate && this.opts.collapsibleShowFunction ? this.opts.collapsibleShowFunction.call(this, t, s) : t.show(this.opts.collapsibleShowDuration, s) : canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, t, s) : t.show(this.opts.showDuration, s), e.attr("aria-expanded", "true"), t.attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                }), this.visibleSubMenus.push(t), this.$root.triggerHandler("show.smapi", t[0]))
            },
            popupHide: function(t) {
                this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
                var e = this;
                this.hideTimeout = setTimeout(function() {
                    e.menuHideAll()
                }, t ? 1 : this.opts.hideTimeout)
            },
            popupShow: function(t, e) {
                var i;
                this.opts.isPopup ? (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), this.$root.dataSM("shown-before", !0), canAnimate && this.$root.stop(!0, !0), this.$root.is(":visible") || (this.$root.css({
                    left: t,
                    top: e
                }), i = this, e = function() {
                    i.$root.css("overflow", "")
                }, canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, this.$root, e) : this.$root.show(this.opts.showDuration, e), this.visibleSubMenus[0] = this.$root)) : alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.')
            },
            refresh: function() {
                this.destroy(!0), this.init(!0)
            },
            rootKeyDown: function(t) {
                if (this.handleEvents()) switch (t.keyCode) {
                    case 27:
                        var e = this.activatedItems[0];
                        e && (this.menuHideAll(), e[0].focus(), (i = e.dataSM("sub")) && this.menuHide(i));
                        break;
                    case 32:
                        var i, e = $(t.target);
                        e.is("a") && this.handleItemEvents(e) && (i = e.dataSM("sub")) && !i.is(":visible") && (this.itemClick({
                            currentTarget: t.target
                        }), t.preventDefault())
                }
            },
            rootOut: function(t) {
                var e;
                !this.handleEvents() || this.isTouchMode() || t.target == this.$root[0] || (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), this.opts.showOnClick && this.opts.hideOnClick) || ((e = this).hideTimeout = setTimeout(function() {
                    e.menuHideAll()
                }, this.opts.hideTimeout))
            },
            rootOver: function(t) {
                this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0)
            },
            winResize: function(t) {
                var e;
                this.handleEvents() ? "onorientationchange" in window && "orientationchange" != t.type || (e = this.isCollapsible(), this.wasCollapsible && e || (this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0].blur(), this.menuHideAll()), this.wasCollapsible = e) : this.$disableOverlay && (e = this.$root.offset(), this.$disableOverlay.css({
                    top: e.top,
                    left: e.left,
                    width: this.$root.outerWidth(),
                    height: this.$root.outerHeight()
                }))
            }
        }
    }), $.fn.dataSM = function(t, e) {
        return e ? this.data(t + "_smartmenus", e) : this.data(t + "_smartmenus")
    }, $.fn.removeDataSM = function(t) {
        return this.removeData(t + "_smartmenus")
    }, $.fn.smartmenus = function(options) {
        if ("string" != typeof options) return this.each(function() {
            var dataOpts = $(this).data("sm-options") || null;
            if (dataOpts && "object" != typeof dataOpts) try {
                dataOpts = eval("(" + dataOpts + ")")
            } catch (e) {
                dataOpts = null, alert('ERROR\n\nSmartMenus jQuery init:\nInvalid "data-sm-options" attribute value syntax.')
            }
            new $.SmartMenus(this, $.extend({}, $.fn.smartmenus.defaults, options, dataOpts))
        });
        var args = arguments,
            method = options;
        return Array.prototype.shift.call(args), this.each(function() {
            var t = $(this).data("smartmenus");
            t && t[method] && t[method].apply(t, args)
        })
    }, $.fn.smartmenus.defaults = {
        isPopup: !1,
        mainMenuSubOffsetX: 0,
        mainMenuSubOffsetY: 0,
        subMenusSubOffsetX: 0,
        subMenusSubOffsetY: 0,
        subMenusMinWidth: "10rem",
        subMenusMaxWidth: "25rem",
        subIndicators: !0,
        subIndicatorsPos: "append",
        subIndicatorsText: "",
        scrollStep: 30,
        scrollAccelerate: !0,
        showTimeout: 200,
        hideTimeout: 200,
        showDuration: 0,
        showFunction: null,
        hideDuration: 0,
        hideFunction: function(t, e) {
            t.fadeOut(200, e)
        },
        collapsibleShowDuration: 0,
        collapsibleShowFunction: function(t, e) {
            t.slideDown(200, e)
        },
        collapsibleHideDuration: 0,
        collapsibleHideFunction: function(t, e) {
            t.slideUp(200, e)
        },
        showOnClick: !1,
        hideOnClick: !0,
        noMouseOver: !1,
        keepInViewport: !0,
        keepHighlighted: !0,
        markCurrentItem: !1,
        markCurrentTree: !0,
        rightToLeftSubMenus: !1,
        bottomToTopSubMenus: !1,
        collapsibleBehavior: "link"
    }, $
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "smartmenus"], t) : "object" == typeof module && "object" == typeof module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(a) {
    return a.extend(a.SmartMenus.Bootstrap = {}, {
        keydownFix: !1,
        init: function() {
            var t = a("ul.navbar-nav:not([data-sm-skip])");
            t.each(function() {
                var e, t, i, s = a(this),
                    o = s.data("smartmenus");

                function n() {
                    s.find("a.current").each(function() {
                        var t = a(this);
                        (t.hasClass("dropdown-item") ? t : t.parent()).addClass("active")
                    }), s.find("a.has-submenu").each(function() {
                        var t = a(this);
                        t.is('[data-toggle="dropdown"]') && t.dataSM("bs-data-toggle-dropdown", !0).removeAttr("data-toggle"), !e && t.hasClass("dropdown-toggle") && t.dataSM("bs-dropdown-toggle", !0).removeClass("dropdown-toggle")
                    })
                }

                function r(t) {
                    var e = o.getViewportWidth();
                    e == i && !t || (o.isCollapsible() ? s.addClass("sm-collapsible") : s.removeClass("sm-collapsible"), i = e)
                }
                o || (e = s.is("[data-sm-skip-collapsible-behavior]"), t = s.hasClass("ml-auto") || 0 < s.prevAll(".mr-auto").length, s.smartmenus({
                    subMenusSubOffsetX: -8,
                    subMenusSubOffsetY: 0,
                    subIndicators: !e,
                    collapsibleShowFunction: null,
                    collapsibleHideFunction: null,
                    rightToLeftSubMenus: t,
                    bottomToTopSubMenus: 0 < s.closest(".fixed-bottom").length,
                    bootstrapHighlightClasses: ""
                }).on({
                    "show.smapi": function(t, e) {
                        var i = a(e),
                            e = i.dataSM("scroll-arrows");
                        e && e.css("background-color", i.css("background-color")), i.parent().addClass("show"), o.opts.keepHighlighted && 2 < i.dataSM("level") && i.prevAll("a").addClass(o.opts.bootstrapHighlightClasses)
                    },
                    "hide.smapi": function(t, e) {
                        e = a(e);
                        e.parent().removeClass("show"), o.opts.keepHighlighted && 2 < e.dataSM("level") && e.prevAll("a").removeClass(o.opts.bootstrapHighlightClasses)
                    }
                }), o = s.data("smartmenus"), n(), o.refresh = function() {
                    a.SmartMenus.prototype.refresh.call(this), n(), r(!0)
                }, o.destroy = function(t) {
                    s.find("a.current").each(function() {
                        var t = a(this);
                        (t.hasClass("active") ? t : t.parent()).removeClass("active")
                    }), s.find("a.has-submenu").each(function() {
                        var t = a(this);
                        t.dataSM("bs-dropdown-toggle") && t.addClass("dropdown-toggle").removeDataSM("bs-dropdown-toggle"), t.dataSM("bs-data-toggle-dropdown") && t.attr("data-toggle", "dropdown").removeDataSM("bs-data-toggle-dropdown")
                    }), a.SmartMenus.prototype.destroy.call(this, t)
                }, e && (o.opts.collapsibleBehavior = "toggle"), r(), a(window).on("resize.smartmenus" + o.rootId, r))
            }), t.length && !a.SmartMenus.Bootstrap.keydownFix && (a(document).off("keydown.bs.dropdown.data-api", ".dropdown-menu"), a.fn.dropdown && a.fn.dropdown.Constructor && "function" == typeof a.fn.dropdown.Constructor._dataApiKeydownHandler && a(document).on("keydown.bs.dropdown.data-api", ".dropdown-menu.show", a.fn.dropdown.Constructor._dataApiKeydownHandler), a.SmartMenus.Bootstrap.keydownFix = !0)
        }
    }), a(a.SmartMenus.Bootstrap.init), a
}),
function() {
    "use strict";

    function e(t) {
        if (!t) throw new Error("No options passed to Waypoint constructor");
        if (!t.element) throw new Error("No element option passed to Waypoint constructor");
        if (!t.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + i, this.options = e.Adapter.extend({}, e.defaults, t), this.element = this.options.element, this.adapter = new e.Adapter(this.element), this.callback = t.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = e.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = e.Context.findOrCreateByElement(this.options.context), e.offsetAliases[this.options.offset] && (this.options.offset = e.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), n[this.key] = this, i += 1
    }
    var i = 0,
        n = {};
    e.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, e.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, e.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete n[this.key]
    }, e.prototype.disable = function() {
        return this.enabled = !1, this
    }, e.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, e.prototype.next = function() {
        return this.group.next(this)
    }, e.prototype.previous = function() {
        return this.group.previous(this)
    }, e.invokeAll = function(t) {
        var e, i = [];
        for (e in n) i.push(n[e]);
        for (var s = 0, o = i.length; s < o; s++) i[s][t]()
    }, e.destroyAll = function() {
        e.invokeAll("destroy")
    }, e.disableAll = function() {
        e.invokeAll("disable")
    }, e.enableAll = function() {
        for (var t in e.Context.refreshAll(), n) n[t].enabled = !0;
        return this
    }, e.refreshAll = function() {
        e.Context.refreshAll()
    }, e.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, e.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, e.adapters = [], e.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, e.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = e
}(),
function() {
    "use strict";

    function e(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function i(t) {
        this.element = t, this.Adapter = p.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + s, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, s += 1, p.windowContext || (p.windowContext = !0, p.windowContext = new i(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var s = 0,
        o = {},
        p = window.Waypoint,
        t = window.onload;
    i.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, i.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical),
            i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key])
    }, i.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, p.requestAnimationFrame(t))
        })
    }, i.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            e.didScroll && !p.isTouch || (e.didScroll = !0, p.requestAnimationFrame(t))
        })
    }, i.prototype.handleResize = function() {
        p.Context.refreshAll()
    }, i.prototype.handleScroll = function() {
        var t, e, i = {},
            s = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (t in s) {
            var o, n = s[t],
                r = n.newScroll > n.oldScroll ? n.forward : n.backward;
            for (o in this.waypoints[t]) {
                var a, l, h = this.waypoints[t][o];
                null !== h.triggerPoint && (a = n.oldScroll < h.triggerPoint, l = n.newScroll >= h.triggerPoint, (a && l || !a && !l) && (h.queueTrigger(r), i[h.group.id] = h.group))
            }
        }
        for (e in i) i[e].flushTriggers();
        this.oldScroll = {
            x: s.horizontal.newScroll,
            y: s.vertical.newScroll
        }
    }, i.prototype.innerHeight = function() {
        return this.element == this.element.window ? p.viewportHeight() : this.adapter.innerHeight()
    }, i.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, i.prototype.innerWidth = function() {
        return this.element == this.element.window ? p.viewportWidth() : this.adapter.innerWidth()
    }, i.prototype.destroy = function() {
        var t, e = [];
        for (t in this.waypoints)
            for (var i in this.waypoints[t]) e.push(this.waypoints[t][i]);
        for (var s = 0, o = e.length; s < o; s++) e[s].destroy()
    }, i.prototype.refresh = function() {
        var t, e, i = this.element == this.element.window,
            s = i ? void 0 : this.adapter.offset(),
            o = {};
        for (e in this.handleScroll(), t = {
                horizontal: {
                    contextOffset: i ? 0 : s.left,
                    contextScroll: i ? 0 : this.oldScroll.x,
                    contextDimension: this.innerWidth(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left",
                    offsetProp: "left"
                },
                vertical: {
                    contextOffset: i ? 0 : s.top,
                    contextScroll: i ? 0 : this.oldScroll.y,
                    contextDimension: this.innerHeight(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up",
                    offsetProp: "top"
                }
            }) {
            var n, r = t[e];
            for (n in this.waypoints[e]) {
                var a, l = this.waypoints[e][n],
                    h = l.options.offset,
                    c = l.triggerPoint,
                    u = 0,
                    d = null == c;
                l.element !== l.element.window && (u = l.adapter.offset()[r.offsetProp]), "function" == typeof h ? h = h.apply(l) : "string" == typeof h && (h = parseFloat(h), -1 < l.options.offset.indexOf("%") && (h = Math.ceil(r.contextDimension * h / 100))), a = r.contextScroll - r.contextOffset, l.triggerPoint = Math.floor(u + a - h), a = c < r.oldScroll, h = l.triggerPoint >= r.oldScroll, c = !a && !h, !d && (a && h) ? (l.queueTrigger(r.backward), o[l.group.id] = l.group) : (!d && c || d && r.oldScroll >= l.triggerPoint) && (l.queueTrigger(r.forward), o[l.group.id] = l.group)
            }
        }
        return p.requestAnimationFrame(function() {
            for (var t in o) o[t].flushTriggers()
        }), this
    }, i.findOrCreateByElement = function(t) {
        return i.findByElement(t) || new i(t)
    }, i.refreshAll = function() {
        for (var t in o) o[t].refresh()
    }, i.findByElement = function(t) {
        return o[t.waypointContextKey]
    }, window.onload = function() {
        t && t(), i.refreshAll()
    }, p.requestAnimationFrame = function(t) {
        (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || e).call(window, t)
    }, p.Context = i
}(),
function() {
    "use strict";

    function n(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function r(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function e(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), i[this.axis][this.name] = this
    }
    var i = {
            vertical: {},
            horizontal: {}
        },
        s = window.Waypoint;
    e.prototype.add = function(t) {
        this.waypoints.push(t)
    }, e.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, e.prototype.flushTriggers = function() {
        for (var t in this.triggerQueues) {
            var e = this.triggerQueues[t];
            e.sort("up" === t || "left" === t ? r : n);
            for (var i = 0, s = e.length; i < s; i += 1) {
                var o = e[i];
                !o.options.continuous && i !== e.length - 1 || o.trigger([t])
            }
        }
        this.clearTriggerQueues()
    }, e.prototype.next = function(t) {
        this.waypoints.sort(n);
        t = s.Adapter.inArray(t, this.waypoints);
        return t === this.waypoints.length - 1 ? null : this.waypoints[t + 1]
    }, e.prototype.previous = function(t) {
        this.waypoints.sort(n);
        t = s.Adapter.inArray(t, this.waypoints);
        return t ? this.waypoints[t - 1] : null
    }, e.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, e.prototype.remove = function(t) {
        t = s.Adapter.inArray(t, this.waypoints); - 1 < t && this.waypoints.splice(t, 1)
    }, e.prototype.first = function() {
        return this.waypoints[0]
    }, e.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, e.findOrCreate = function(t) {
        return i[t.axis][t.name] || new e(t)
    }, s.Group = e
}(),
function() {
    "use strict";

    function i(t) {
        this.$element = s(t)
    }
    var s = window.jQuery,
        t = window.Waypoint;
    s.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(t, e) {
        i.prototype[e] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[e].apply(this.$element, t)
        }
    }), s.each(["extend", "inArray", "isEmptyObject"], function(t, e) {
        i[e] = s[e]
    }), t.adapters.push({
        name: "jquery",
        Adapter: i
    }), t.Adapter = i
}(),
function() {
    "use strict";

    function t(s) {
        return function() {
            var e = [],
                i = arguments[0];
            return s.isFunction(arguments[0]) && ((i = s.extend({}, arguments[1])).handler = arguments[0]), this.each(function() {
                var t = s.extend({}, i, {
                    element: this
                });
                "string" == typeof t.context && (t.context = s(this).closest(t.context)[0]), e.push(new o(t))
            }), e
        }
    }
    var o = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}(),
function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(t.jQuery)
}(this, function(d) {
    ! function() {
        "use strict";

        function e(t, e) {
            if (this.el = t, this.$el = d(t), this.s = d.extend({}, i, e), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = d(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(d(this.s.selector)) : this.$items = this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this
        }
        var i = {
            mode: "lg-slide",
            cssEasing: "ease",
            easing: "linear",
            speed: 600,
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 150,
            hideBarsDelay: 6e3,
            useLeft: !1,
            closable: !0,
            loop: !0,
            escKey: !0,
            keyPress: !0,
            controls: !0,
            slideEndAnimatoin: !0,
            hideControlOnEnd: !1,
            mousewheel: !0,
            getCaptionFromTitleOrAlt: !0,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: !1,
            preload: 1,
            showAfterLoad: !0,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: !1,
            iframeMaxWidth: "100%",
            download: !0,
            counter: !0,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: !0,
            enableDrag: !0,
            dynamic: !1,
            dynamicEl: [],
            galleryId: 1
        };
        e.prototype.init = function() {
            var t = this;
            t.s.preload > t.$items.length && (t.s.preload = t.$items.length);
            var e = window.location.hash;
            0 < e.indexOf("lg=" + this.s.galleryId) && (t.index = parseInt(e.split("&slide=")[1], 10), d("body").addClass("lg-from-hash"), d("body").hasClass("lg-on") || (setTimeout(function() {
                t.build(t.index)
            }), d("body").addClass("lg-on"))), t.s.dynamic ? (t.$el.trigger("onBeforeOpen.lg"), t.index = t.s.index || 0, d("body").hasClass("lg-on") || setTimeout(function() {
                t.build(t.index), d("body").addClass("lg-on")
            })) : t.$items.on("click.lgcustom", function(e) {
                try {
                    e.preventDefault(), e.preventDefault()
                } catch (t) {
                    e.returnValue = !1
                }
                t.$el.trigger("onBeforeOpen.lg"), t.index = t.s.index || t.$items.index(this), d("body").hasClass("lg-on") || (t.build(t.index), d("body").addClass("lg-on"))
            })
        }, e.prototype.build = function(t) {
            var e = this;
            e.structure(), d.each(d.fn.lightGallery.modules, function(t) {
                e.modules[t] = new d.fn.lightGallery.modules[t](e.el)
            }), e.slide(t, !1, !1, !1), e.s.keyPress && e.keyPress(), 1 < e.$items.length ? (e.arrow(), setTimeout(function() {
                e.enableDrag(), e.enableSwipe()
            }, 50), e.s.mousewheel && e.mousewheel()) : e.$slide.on("click.lg", function() {
                e.$el.trigger("onSlideClick.lg")
            }), e.counter(), e.closeGallery(), e.$el.trigger("onAfterOpen.lg"), e.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
                e.$outer.removeClass("lg-hide-items"), clearTimeout(e.hideBartimeout), e.hideBartimeout = setTimeout(function() {
                    e.$outer.addClass("lg-hide-items")
                }, e.s.hideBarsDelay)
            }), e.$outer.trigger("mousemove.lg")
        }, e.prototype.structure = function() {
            var t = "",
                e = "",
                i = 0,
                s = "",
                o = this;
            for (d("body").append('<div class="lg-backdrop"></div>'), d(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), i = 0; i < this.$items.length; i++) t += '<div class="lg-item"></div>';
            this.s.controls && 1 < this.$items.length && (e = '<div class="lg-actions"><button class="lg-prev lg-icon">' + this.s.prevHtml + '</button><button class="lg-next lg-icon">' + this.s.nextHtml + "</button></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (s = '<div class="lg-sub-html"></div>'), s = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + t + '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' + e + s + "</div></div>", d("body").append(s), this.$outer = d(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), o.setTop(), d(window).on("resize.lg orientationchange.lg", function() {
                setTimeout(function() {
                    o.setTop()
                }, 100)
            }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && 1 < this.$items.length && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss() && ((s = this.$outer.find(".lg-inner")).css("transition-timing-function", this.s.cssEasing), s.css("transition-duration", this.s.speed + "ms")), setTimeout(function() {
                d(".lg-backdrop").addClass("in")
            }), setTimeout(function() {
                o.$outer.addClass("lg-visible")
            }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = d(window).scrollTop()
        }, e.prototype.setTop = function() {
            var t, e, i;
            "100%" !== this.s.height && (e = ((t = d(window).height()) - parseInt(this.s.height, 10)) / 2, i = this.$outer.find(".lg"), t >= parseInt(this.s.height, 10) ? i.css("top", e + "px") : i.css("top", "0px"))
        }, e.prototype.doCss = function() {
            return !! function() {
                for (var t = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"], e = document.documentElement, i = 0, i = 0; i < t.length; i++)
                    if (t[i] in e.style) return 1
            }()
        }, e.prototype.isVideo = function(t, e) {
            var i = this.s.dynamic ? this.s.dynamicEl[e].html : this.$items.eq(e).attr("data-html");
            if (!t) return i ? {
                html5: !0
            } : (console.error("lightGallery :- data-src is not pvovided on slide item " + (e + 1) + ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"), !1);
            var s = t.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
                i = t.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                e = t.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                t = t.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
            return s ? {
                youtube: s
            } : i ? {
                vimeo: i
            } : e ? {
                dailymotion: e
            } : t ? {
                vk: t
            } : void 0
        }, e.prototype.counter = function() {
            this.s.counter && d(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>")
        }, e.prototype.addHtml = function(t) {
            var e, i, s, o = null;
            this.s.dynamic ? this.s.dynamicEl[t].subHtmlUrl ? e = this.s.dynamicEl[t].subHtmlUrl : o = this.s.dynamicEl[t].subHtml : (i = this.$items.eq(t)).attr("data-sub-html-url") ? e = i.attr("data-sub-html-url") : (o = i.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !o && (o = i.attr("title") || i.find("img").first().attr("alt"))), e || (null != o ? "." !== (s = o.substring(0, 1)) && "#" !== s || (o = (this.s.subHtmlSelectorRelative && !this.s.dynamic ? i.find(o) : d(o)).html()) : o = ""), ".lg-sub-html" === this.s.appendSubHtmlTo ? e ? this.$outer.find(this.s.appendSubHtmlTo).load(e) : this.$outer.find(this.s.appendSubHtmlTo).html(o) : e ? this.$slide.eq(t).load(e) : this.$slide.eq(t).append(o), null != o && ("" === o ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [t])
        }, e.prototype.preload = function(t) {
            for (var e = 1, i = 1, e = 1; e <= this.s.preload && !(e >= this.$items.length - t); e++) this.loadContent(t + e, !1, 0);
            for (i = 1; i <= this.s.preload && !(t - i < 0); i++) this.loadContent(t - i, !1, 0)
        }, e.prototype.loadContent = function(e, t, i) {
            var a, s, o, n, r = this,
                l = !1,
                h = function(t) {
                    for (var e = [], i = [], s = 0; s < t.length; s++) {
                        var o = t[s].split(" ");
                        "" === o[0] && o.splice(0, 1), i.push(o[0]), e.push(o[1])
                    }
                    for (var n = d(window).width(), r = 0; r < e.length; r++)
                        if (parseInt(e[r], 10) > n) {
                            a = i[r];
                            break
                        }
                },
                c = r.s.dynamic ? (r.s.dynamicEl[e].poster && (l = !0, s = r.s.dynamicEl[e].poster), n = r.s.dynamicEl[e].html, a = r.s.dynamicEl[e].src, r.s.dynamicEl[e].responsive && h(r.s.dynamicEl[e].responsive.split(",")), o = r.s.dynamicEl[e].srcset, r.s.dynamicEl[e].sizes) : (r.$items.eq(e).attr("data-poster") && (l = !0, s = r.$items.eq(e).attr("data-poster")), n = r.$items.eq(e).attr("data-html"), a = r.$items.eq(e).attr("href") || r.$items.eq(e).attr("data-src"), r.$items.eq(e).attr("data-responsive") && h(r.$items.eq(e).attr("data-responsive").split(",")), o = r.$items.eq(e).attr("data-srcset"), r.$items.eq(e).attr("data-sizes")),
                u = !1;
            r.s.dynamic ? r.s.dynamicEl[e].iframe && (u = !0) : "true" === r.$items.eq(e).attr("data-iframe") && (u = !0);
            h = r.isVideo(a, e);
            if (!r.$slide.eq(e).hasClass("lg-loaded")) {
                if (u ? r.$slide.eq(e).prepend('<div class="lg-video-cont lg-has-iframe" style="max-width:' + r.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + a + '"  allowfullscreen="true"></iframe></div></div>') : l ? (u = "", u = h && h.youtube ? "lg-has-youtube" : h && h.vimeo ? "lg-has-vimeo" : "lg-has-html5", r.$slide.eq(e).prepend('<div class="lg-video-cont ' + u + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + s + '" /></div></div>')) : h ? (r.$slide.eq(e).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), r.$el.trigger("hasVideo.lg", [e, a, n])) : r.$slide.eq(e).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + a + '" /></div>'), r.$el.trigger("onAferAppendSlide.lg", [e]), n = r.$slide.eq(e).find(".lg-object"), c && n.attr("sizes", c), o) {
                    n.attr("srcset", o);
                    try {
                        picturefill({
                            elements: [n[0]]
                        })
                    } catch (t) {
                        console.warn("lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.")
                    }
                }
                ".lg-sub-html" !== this.s.appendSubHtmlTo && r.addHtml(e), r.$slide.eq(e).addClass("lg-loaded")
            }
            r.$slide.eq(e).find(".lg-object").on("load.lg error.lg", function() {
                var t = 0;
                i && !d("body").hasClass("lg-from-hash") && (t = i), setTimeout(function() {
                    r.$slide.eq(e).addClass("lg-complete"), r.$el.trigger("onSlideItemLoad.lg", [e, i || 0])
                }, t)
            }), h && h.html5 && !l && r.$slide.eq(e).addClass("lg-complete"), !0 === t && (r.$slide.eq(e).hasClass("lg-complete") ? r.preload(e) : r.$slide.eq(e).find(".lg-object").on("load.lg error.lg", function() {
                r.preload(e)
            }))
        }, e.prototype.slide = function(t, e, i, s) {
            var o, n, r, a, l, h = this.$outer.find(".lg-current").index(),
                c = this;
            c.lGalleryOn && h === t || (o = this.$slide.length, n = c.lGalleryOn ? this.s.speed : 0, c.lgBusy || (this.s.download && ((r = c.s.dynamic ? !1 !== c.s.dynamicEl[t].downloadUrl && (c.s.dynamicEl[t].downloadUrl || c.s.dynamicEl[t].src) : "false" !== c.$items.eq(t).attr("data-download-url") && (c.$items.eq(t).attr("data-download-url") || c.$items.eq(t).attr("href") || c.$items.eq(t).attr("data-src"))) ? (d("#lg-download").attr("href", r), c.$outer.removeClass("lg-hide-download")) : c.$outer.addClass("lg-hide-download")), this.$el.trigger("onBeforeSlide.lg", [h, t, e, i]), c.lgBusy = !0, clearTimeout(c.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
                c.addHtml(t)
            }, n), this.arrowDisable(t), s || (t < h ? s = "prev" : h < t && (s = "next")), e ? (this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"), 2 < o ? (a = t - 1, l = t + 1, (0 === t && h === o - 1 || t === o - 1 && 0 === h) && (l = 0, a = o - 1)) : (a = 0, l = 1), "prev" === s ? c.$slide.eq(l).addClass("lg-next-slide") : c.$slide.eq(a).addClass("lg-prev-slide"), c.$slide.eq(t).addClass("lg-current")) : (c.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), "prev" === s ? (this.$slide.eq(t).addClass("lg-prev-slide"), this.$slide.eq(h).addClass("lg-next-slide")) : (this.$slide.eq(t).addClass("lg-next-slide"), this.$slide.eq(h).addClass("lg-prev-slide")), setTimeout(function() {
                c.$slide.removeClass("lg-current"), c.$slide.eq(t).addClass("lg-current"), c.$outer.removeClass("lg-no-trans")
            }, 50)), c.lGalleryOn ? (setTimeout(function() {
                c.loadContent(t, !0, 0)
            }, this.s.speed + 50), setTimeout(function() {
                c.lgBusy = !1, c.$el.trigger("onAfterSlide.lg", [h, t, e, i])
            }, this.s.speed)) : (c.loadContent(t, !0, c.s.backdropDuration), c.lgBusy = !1, c.$el.trigger("onAfterSlide.lg", [h, t, e, i])), c.lGalleryOn = !0, this.s.counter && d("#lg-counter-current").text(t + 1)), c.index = t)
        }, e.prototype.goToNextSlide = function(t) {
            var e = this,
                i = e.s.loop;
            t && e.$slide.length < 3 && (i = !1), e.lgBusy || (e.index + 1 < e.$slide.length ? (e.index++, e.$el.trigger("onBeforeNextSlide.lg", [e.index]), e.slide(e.index, t, !1, "next")) : i ? (e.index = 0, e.$el.trigger("onBeforeNextSlide.lg", [e.index]), e.slide(e.index, t, !1, "next")) : e.s.slideEndAnimatoin && !t && (e.$outer.addClass("lg-right-end"), setTimeout(function() {
                e.$outer.removeClass("lg-right-end")
            }, 400)))
        }, e.prototype.goToPrevSlide = function(t) {
            var e = this,
                i = e.s.loop;
            t && e.$slide.length < 3 && (i = !1), e.lgBusy || (0 < e.index ? (e.index--, e.$el.trigger("onBeforePrevSlide.lg", [e.index, t]), e.slide(e.index, t, !1, "prev")) : i ? (e.index = e.$items.length - 1, e.$el.trigger("onBeforePrevSlide.lg", [e.index, t]), e.slide(e.index, t, !1, "prev")) : e.s.slideEndAnimatoin && !t && (e.$outer.addClass("lg-left-end"), setTimeout(function() {
                e.$outer.removeClass("lg-left-end")
            }, 400)))
        }, e.prototype.keyPress = function() {
            var e = this;
            1 < this.$items.length && d(window).on("keyup.lg", function(t) {
                1 < e.$items.length && (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()), 39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()))
            }), d(window).on("keydown.lg", function(t) {
                !0 === e.s.escKey && 27 === t.keyCode && (t.preventDefault(), e.$outer.hasClass("lg-thumb-open") ? e.$outer.removeClass("lg-thumb-open") : e.destroy())
            })
        }, e.prototype.arrow = function() {
            var t = this;
            this.$outer.find(".lg-prev").on("click.lg", function() {
                t.goToPrevSlide()
            }), this.$outer.find(".lg-next").on("click.lg", function() {
                t.goToNextSlide()
            })
        }, e.prototype.arrowDisable = function(t) {
            !this.s.loop && this.s.hideControlOnEnd && (t + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), 0 < t ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
        }, e.prototype.setTranslate = function(t, e, i) {
            this.s.useLeft ? t.css("left", e) : t.css({
                transform: "translate3d(" + e + "px, " + i + "px, 0px)"
            })
        }, e.prototype.touchMove = function(t, e) {
            t = e - t;
            15 < Math.abs(t) && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), t, 0), this.setTranslate(d(".lg-prev-slide"), -this.$slide.eq(this.index).width() + t, 0), this.setTranslate(d(".lg-next-slide"), this.$slide.eq(this.index).width() + t, 0))
        }, e.prototype.touchEnd = function(t) {
            var e = this;
            "lg-slide" !== e.s.mode && e.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function() {
                e.$outer.removeClass("lg-dragging"), t < 0 && Math.abs(t) > e.s.swipeThreshold ? e.goToNextSlide(!0) : 0 < t && Math.abs(t) > e.s.swipeThreshold ? e.goToPrevSlide(!0) : Math.abs(t) < 5 && e.$el.trigger("onSlideClick.lg"), e.$slide.removeAttr("style")
            }), setTimeout(function() {
                e.$outer.hasClass("lg-dragging") || "lg-slide" === e.s.mode || e.$outer.removeClass("lg-slide")
            }, e.s.speed + 100)
        }, e.prototype.enableSwipe = function() {
            var e = this,
                i = 0,
                s = 0,
                o = !1;
            e.s.enableSwipe && e.doCss() && (e.$slide.on("touchstart.lg", function(t) {
                e.$outer.hasClass("lg-zoomed") || e.lgBusy || (t.preventDefault(), e.manageSwipeClass(), i = t.originalEvent.targetTouches[0].pageX)
            }), e.$slide.on("touchmove.lg", function(t) {
                e.$outer.hasClass("lg-zoomed") || (t.preventDefault(), s = t.originalEvent.targetTouches[0].pageX, e.touchMove(i, s), o = !0)
            }), e.$slide.on("touchend.lg", function() {
                e.$outer.hasClass("lg-zoomed") || (o ? (o = !1, e.touchEnd(s - i)) : e.$el.trigger("onSlideClick.lg"))
            }))
        }, e.prototype.enableDrag = function() {
            var e = this,
                i = 0,
                s = 0,
                o = !1,
                n = !1;
            e.s.enableDrag && e.doCss() && (e.$slide.on("mousedown.lg", function(t) {
                e.$outer.hasClass("lg-zoomed") || e.lgBusy || d(t.target).text().trim() || (t.preventDefault(), e.manageSwipeClass(), i = t.pageX, o = !0, e.$outer.scrollLeft += 1, --e.$outer.scrollLeft, e.$outer.removeClass("lg-grab").addClass("lg-grabbing"), e.$el.trigger("onDragstart.lg"))
            }), d(window).on("mousemove.lg", function(t) {
                o && (n = !0, s = t.pageX, e.touchMove(i, s), e.$el.trigger("onDragmove.lg"))
            }), d(window).on("mouseup.lg", function(t) {
                n ? (n = !1, e.touchEnd(s - i), e.$el.trigger("onDragend.lg")) : (d(t.target).hasClass("lg-object") || d(t.target).hasClass("lg-video-play")) && e.$el.trigger("onSlideClick.lg"), o && (o = !1, e.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
            }))
        }, e.prototype.manageSwipeClass = function() {
            var t = this.index + 1,
                e = this.index - 1;
            this.s.loop && 2 < this.$slide.length && (0 === this.index ? e = this.$slide.length - 1 : this.index === this.$slide.length - 1 && (t = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), -1 < e && this.$slide.eq(e).addClass("lg-prev-slide"), this.$slide.eq(t).addClass("lg-next-slide")
        }, e.prototype.mousewheel = function() {
            var e = this;
            e.$outer.on("mousewheel.lg", function(t) {
                t.deltaY && (0 < t.deltaY ? e.goToPrevSlide() : e.goToNextSlide(), t.preventDefault())
            })
        }, e.prototype.closeGallery = function() {
            var e = this,
                i = !1;
            this.$outer.find(".lg-close").on("click.lg", function() {
                e.destroy()
            }), e.s.closable && (e.$outer.on("mousedown.lg", function(t) {
                i = !!(d(t.target).is(".lg-outer") || d(t.target).is(".lg-item ") || d(t.target).is(".lg-img-wrap"))
            }), e.$outer.on("mousemove.lg", function() {
                i = !1
            }), e.$outer.on("mouseup.lg", function(t) {
                (d(t.target).is(".lg-outer") || d(t.target).is(".lg-item ") || d(t.target).is(".lg-img-wrap") && i) && (e.$outer.hasClass("lg-dragging") || e.destroy())
            }))
        }, e.prototype.destroy = function(t) {
            var e = this;
            t || (e.$el.trigger("onBeforeClose.lg"), d(window).scrollTop(e.prevScrollTop)), t && (e.s.dynamic || this.$items.off("click.lg click.lgcustom"), d.removeData(e.el, "lightGallery")), this.$el.off(".lg.tm"), d.each(d.fn.lightGallery.modules, function(t) {
                e.modules[t] && e.modules[t].destroy()
            }), this.lGalleryOn = !1, clearTimeout(e.hideBartimeout), this.hideBartimeout = !1, d(window).off(".lg"), d("body").removeClass("lg-on lg-from-hash"), e.$outer && e.$outer.removeClass("lg-visible"), d(".lg-backdrop").removeClass("in"), setTimeout(function() {
                e.$outer && e.$outer.remove(), d(".lg-backdrop").remove(), t || e.$el.trigger("onCloseAfter.lg")
            }, e.s.backdropDuration + 50)
        }, d.fn.lightGallery = function(t) {
            return this.each(function() {
                if (d.data(this, "lightGallery")) try {
                    d(this).data("lightGallery").init()
                } catch (t) {
                    console.error("lightGallery has not initiated properly")
                } else d.data(this, "lightGallery", new e(this, t))
            })
        }, d.fn.lightGallery.modules = {}
    }()
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(i) {
    ! function() {
        "use strict";

        function t(t) {
            return this.core = i(t).data("lightGallery"), this.$el = i(t), !(this.core.$items.length < 2) && (this.core.s = i.extend({}, e, this.core.s), this.interval = !1, this.fromAuto = !0, this.canceledOnTouch = !1, this.fourceAutoplayTemp = this.core.s.fourceAutoplay, this.core.doCss() || (this.core.s.progressBar = !1), this.init(), this)
        }
        var e = {
            autoplay: !1,
            pause: 5e3,
            progressBar: !0,
            fourceAutoplay: !1,
            autoplayControls: !0,
            appendAutoplayControlsTo: ".lg-toolbar"
        };
        t.prototype.init = function() {
            var t = this;
            t.core.s.autoplayControls && t.controls(), t.core.s.progressBar && t.core.$outer.find(".lg").append('<div class="lg-progress-bar"><div class="lg-progress"></div></div>'), t.progress(), t.core.s.autoplay && t.$el.one("onSlideItemLoad.lg.tm", function() {
                t.startlAuto()
            }), t.$el.on("onDragstart.lg.tm touchstart.lg.tm", function() {
                t.interval && (t.cancelAuto(), t.canceledOnTouch = !0)
            }), t.$el.on("onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm", function() {
                !t.interval && t.canceledOnTouch && (t.startlAuto(), t.canceledOnTouch = !1)
            })
        }, t.prototype.progress = function() {
            var t, e, i = this;
            i.$el.on("onBeforeSlide.lg.tm", function() {
                i.core.s.progressBar && i.fromAuto && (t = i.core.$outer.find(".lg-progress-bar"), e = i.core.$outer.find(".lg-progress"), i.interval && (e.removeAttr("style"), t.removeClass("lg-start"), setTimeout(function() {
                    e.css("transition", "width " + (i.core.s.speed + i.core.s.pause) + "ms ease 0s"), t.addClass("lg-start")
                }, 20))), i.fromAuto || i.core.s.fourceAutoplay || i.cancelAuto(), i.fromAuto = !1
            })
        }, t.prototype.controls = function() {
            var t = this;
            i(this.core.s.appendAutoplayControlsTo).append('<span class="lg-autoplay-button lg-icon"></span>'), t.core.$outer.find(".lg-autoplay-button").on("click.lg", function() {
                i(t.core.$outer).hasClass("lg-show-autoplay") ? (t.cancelAuto(), t.core.s.fourceAutoplay = !1) : t.interval || (t.startlAuto(), t.core.s.fourceAutoplay = t.fourceAutoplayTemp)
            })
        }, t.prototype.startlAuto = function() {
            var t = this;
            t.core.$outer.find(".lg-progress").css("transition", "width " + (t.core.s.speed + t.core.s.pause) + "ms ease 0s"), t.core.$outer.addClass("lg-show-autoplay"), t.core.$outer.find(".lg-progress-bar").addClass("lg-start"), t.interval = setInterval(function() {
                t.core.index + 1 < t.core.$items.length ? t.core.index++ : t.core.index = 0, t.fromAuto = !0, t.core.slide(t.core.index, !1, !1, "next")
            }, t.core.s.speed + t.core.s.pause)
        }, t.prototype.cancelAuto = function() {
            clearInterval(this.interval), this.interval = !1, this.core.$outer.find(".lg-progress").removeAttr("style"), this.core.$outer.removeClass("lg-show-autoplay"), this.core.$outer.find(".lg-progress-bar").removeClass("lg-start")
        }, t.prototype.destroy = function() {
            this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove()
        }, i.fn.lightGallery.modules.autoplay = t
    }()
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(t.jQuery)
}(this, function(s) {
    ! function() {
        "use strict";

        function e() {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
        }

        function t(t) {
            return this.core = s(t).data("lightGallery"), this.$el = s(t), this.core.s = s.extend({}, i, this.core.s), this.init(), this
        }
        var i = {
            fullScreen: !0
        };
        t.prototype.init = function() {
            this.core.s.fullScreen && (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) && (this.core.$outer.find(".lg-toolbar").append('<span class="lg-fullscreen lg-icon"></span>'), this.fullScreen())
        }, t.prototype.requestFullscreen = function() {
            var t = document.documentElement;
            t.requestFullscreen ? t.requestFullscreen() : t.msRequestFullscreen ? t.msRequestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen && t.webkitRequestFullscreen()
        }, t.prototype.exitFullscreen = function() {
            document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
        }, t.prototype.fullScreen = function() {
            var t = this;
            s(document).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function() {
                t.core.$outer.toggleClass("lg-fullscreen-on")
            }), this.core.$outer.find(".lg-fullscreen").on("click.lg", function() {
                e() ? t.exitFullscreen() : t.requestFullscreen()
            })
        }, t.prototype.destroy = function() {
            e() && this.exitFullscreen(), s(document).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg")
        }, s.fn.lightGallery.modules.fullscreen = t
    }()
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(r) {
    ! function() {
        "use strict";

        function t(t) {
            return this.core = r(t).data("lightGallery"), this.$el = r(t), this.core.s = r.extend({}, e, this.core.s), this.core.s.pager && 1 < this.core.$items.length && this.init(), this
        }
        var e = {
            pager: !1
        };
        t.prototype.init = function() {
            var s, t, e, i = this,
                o = "";
            if (i.core.$outer.find(".lg").append('<div class="lg-pager-outer"></div>'), i.core.s.dynamic)
                for (var n = 0; n < i.core.s.dynamicEl.length; n++) o += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + i.core.s.dynamicEl[n].thumb + '" /></div></span>';
            else i.core.$items.each(function() {
                i.core.s.exThumbImage ? o += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + r(this).attr(i.core.s.exThumbImage) + '" /></div></span>' : o += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + r(this).find("img").attr("src") + '" /></div></span>'
            });
            (t = i.core.$outer.find(".lg-pager-outer")).html(o), (s = i.core.$outer.find(".lg-pager-cont")).on("click.lg touchend.lg", function() {
                var t = r(this);
                i.core.index = t.index(), i.core.slide(i.core.index, !1, !0, !1)
            }), t.on("mouseover.lg", function() {
                clearTimeout(e), t.addClass("lg-pager-hover")
            }), t.on("mouseout.lg", function() {
                e = setTimeout(function() {
                    t.removeClass("lg-pager-hover")
                })
            }), i.core.$el.on("onBeforeSlide.lg.tm", function(t, e, i) {
                s.removeClass("lg-pager-active"), s.eq(i).addClass("lg-pager-active")
            })
        }, t.prototype.destroy = function() {}, r.fn.lightGallery.modules.pager = t
    }()
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(a) {
    ! function() {
        "use strict";

        function t(t) {
            return this.core = a(t).data("lightGallery"), this.core.s = a.extend({}, e, this.core.s), this.$el = a(t), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.core.s.animateThumb && (this.core.s.thumbHeight = "100%"), this.left = 0, this.init(), this
        }
        var e = {
            thumbnail: !0,
            animateThumb: !0,
            currentPagerPosition: "middle",
            thumbWidth: 100,
            thumbHeight: "80px",
            thumbContHeight: 100,
            thumbMargin: 5,
            exThumbImage: !1,
            showThumbByDefault: !0,
            toogleThumb: !0,
            pullCaptionUp: !0,
            enableThumbDrag: !0,
            enableThumbSwipe: !0,
            swipeThreshold: 50,
            loadYoutubeThumbnail: !0,
            youtubeThumbSize: 1,
            loadVimeoThumbnail: !0,
            vimeoThumbSize: "thumbnail_small",
            loadDailymotionThumbnail: !0
        };
        t.prototype.init = function() {
            var t = this;
            this.core.s.thumbnail && 1 < this.core.$items.length && (this.core.s.showThumbByDefault && setTimeout(function() {
                t.core.$outer.addClass("lg-thumb-open")
            }, 700), this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"), this.build(), this.core.s.animateThumb && this.core.doCss() ? (this.core.s.enableThumbDrag && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toogle(), this.thumbkeyPress())
        }, t.prototype.build = function() {
            function e(t, e, i) {
                var s, t = o.core.isVideo(t, i) || {},
                    i = "";
                t.youtube || t.vimeo || t.dailymotion ? t.youtube ? s = o.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + t.youtube[1] + "/" + o.core.s.youtubeThumbSize + ".jpg" : e : t.vimeo ? o.core.s.loadVimeoThumbnail ? (s = "//i.vimeocdn.com/video/error_" + r + ".jpg", i = t.vimeo[1]) : s = e : t.dailymotion && (s = o.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + t.dailymotion[1] : e) : s = e, n += '<div data-vimeo-id="' + i + '" class="lg-thumb-item" style="width:' + o.core.s.thumbWidth + "px; height: " + o.core.s.thumbHeight + "; margin-right: " + o.core.s.thumbMargin + 'px"><img src="' + s + '" /></div>', i = ""
            }
            var t, o = this,
                n = "",
                r = "";
            switch (this.core.s.vimeoThumbSize) {
                case "thumbnail_large":
                    r = "640";
                    break;
                case "thumbnail_medium":
                    r = "200x150";
                    break;
                case "thumbnail_small":
                    r = "100x75"
            }
            if (o.core.$outer.addClass("lg-has-thumb"), o.core.$outer.find(".lg").append('<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>'), o.$thumbOuter = o.core.$outer.find(".lg-thumb-outer"), o.thumbOuterWidth = o.$thumbOuter.width(), o.core.s.animateThumb && o.core.$outer.find(".lg-thumb").css({
                    width: o.thumbTotalWidth + "px",
                    position: "relative"
                }), this.core.s.animateThumb && o.$thumbOuter.css("height", o.core.s.thumbContHeight + "px"), o.core.s.dynamic)
                for (var i = 0; i < o.core.s.dynamicEl.length; i++) e(o.core.s.dynamicEl[i].src, o.core.s.dynamicEl[i].thumb, i);
            else o.core.$items.each(function(t) {
                o.core.s.exThumbImage ? e(a(this).attr("href") || a(this).attr("data-src"), a(this).attr(o.core.s.exThumbImage), t) : e(a(this).attr("href") || a(this).attr("data-src"), a(this).find("img").attr("src"), t)
            });
            o.core.$outer.find(".lg-thumb").html(n), (t = o.core.$outer.find(".lg-thumb-item")).each(function() {
                var e = a(this),
                    t = e.attr("data-vimeo-id");
                t && a.getJSON("//www.vimeo.com/api/v2/video/" + t + ".json?callback=?", {
                    format: "json"
                }, function(t) {
                    e.find("img").attr("src", t[0][o.core.s.vimeoThumbSize])
                })
            }), t.eq(o.core.index).addClass("active"), o.core.$el.on("onBeforeSlide.lg.tm", function() {
                t.removeClass("active"), t.eq(o.core.index).addClass("active")
            }), t.on("click.lg touchend.lg", function() {
                var t = a(this);
                setTimeout(function() {
                    (!o.thumbClickable || o.core.lgBusy) && o.core.doCss() || (o.core.index = t.index(), o.core.slide(o.core.index, !1, !0, !1))
                }, 50)
            }), o.core.$el.on("onBeforeSlide.lg.tm", function() {
                o.animateThumb(o.core.index)
            }), a(window).on("resize.lg.thumb orientationchange.lg.thumb", function() {
                setTimeout(function() {
                    o.animateThumb(o.core.index), o.thumbOuterWidth = o.$thumbOuter.width()
                }, 200)
            })
        }, t.prototype.setTranslate = function(t) {
            this.core.$outer.find(".lg-thumb").css({
                transform: "translate3d(-" + t + "px, 0px, 0px)"
            })
        }, t.prototype.animateThumb = function(t) {
            var e, i = this.core.$outer.find(".lg-thumb");
            if (this.core.s.animateThumb) {
                switch (this.core.s.currentPagerPosition) {
                    case "left":
                        e = 0;
                        break;
                    case "middle":
                        e = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                        break;
                    case "right":
                        e = this.thumbOuterWidth - this.core.s.thumbWidth
                }
                this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * t - 1 - e, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (i.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"), this.core.doCss() || i.animate({
                    left: -this.left + "px"
                }, this.core.s.speed)) : this.core.doCss() || i.css("left", -this.left + "px"), this.setTranslate(this.left)
            }
        }, t.prototype.enableThumbDrag = function() {
            var e = this,
                i = 0,
                s = 0,
                o = !1,
                n = !1,
                r = 0;
            e.$thumbOuter.addClass("lg-grab"), e.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(t) {
                e.thumbTotalWidth > e.thumbOuterWidth && (t.preventDefault(), i = t.pageX, o = !0, e.core.$outer.scrollLeft += 1, --e.core.$outer.scrollLeft, e.thumbClickable = !1, e.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))
            }), a(window).on("mousemove.lg.thumb", function(t) {
                o && (r = e.left, n = !0, s = t.pageX, e.$thumbOuter.addClass("lg-dragging"), (r = (r -= s - i) > e.thumbTotalWidth - e.thumbOuterWidth ? e.thumbTotalWidth - e.thumbOuterWidth : r) < 0 && (r = 0), e.setTranslate(r))
            }), a(window).on("mouseup.lg.thumb", function() {
                n ? (n = !1, e.$thumbOuter.removeClass("lg-dragging"), e.left = r, Math.abs(s - i) < e.core.s.swipeThreshold && (e.thumbClickable = !0)) : e.thumbClickable = !0, o && (o = !1, e.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))
            })
        }, t.prototype.enableThumbSwipe = function() {
            var e = this,
                i = 0,
                s = 0,
                o = !1,
                n = 0;
            e.core.$outer.find(".lg-thumb").on("touchstart.lg", function(t) {
                e.thumbTotalWidth > e.thumbOuterWidth && (t.preventDefault(), i = t.originalEvent.targetTouches[0].pageX, e.thumbClickable = !1)
            }), e.core.$outer.find(".lg-thumb").on("touchmove.lg", function(t) {
                e.thumbTotalWidth > e.thumbOuterWidth && (t.preventDefault(), s = t.originalEvent.targetTouches[0].pageX, o = !0, e.$thumbOuter.addClass("lg-dragging"), n = e.left, (n = (n -= s - i) > e.thumbTotalWidth - e.thumbOuterWidth ? e.thumbTotalWidth - e.thumbOuterWidth : n) < 0 && (n = 0), e.setTranslate(n))
            }), e.core.$outer.find(".lg-thumb").on("touchend.lg", function() {
                e.thumbTotalWidth > e.thumbOuterWidth && o ? (o = !1, e.$thumbOuter.removeClass("lg-dragging"), Math.abs(s - i) < e.core.s.swipeThreshold && (e.thumbClickable = !0), e.left = n) : e.thumbClickable = !0
            })
        }, t.prototype.toogle = function() {
            var t = this;
            t.core.s.toogleThumb && (t.core.$outer.addClass("lg-can-toggle"), t.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>'), t.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() {
                t.core.$outer.toggleClass("lg-thumb-open")
            }))
        }, t.prototype.thumbkeyPress = function() {
            var e = this;
            a(window).on("keydown.lg.thumb", function(t) {
                38 === t.keyCode ? (t.preventDefault(), e.core.$outer.addClass("lg-thumb-open")) : 40 === t.keyCode && (t.preventDefault(), e.core.$outer.removeClass("lg-thumb-open"))
            })
        }, t.prototype.destroy = function() {
            this.core.s.thumbnail && 1 < this.core.$items.length && (a(window).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"), this.$thumbOuter.remove(), this.core.$outer.removeClass("lg-has-thumb"))
        }, a.fn.lightGallery.modules.Thumbnail = t
    }()
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(t.jQuery)
}(this, function(l) {
    ! function() {
        "use strict";

        function t(t) {
            return this.core = l(t).data("lightGallery"), this.$el = l(t), this.core.s = l.extend({}, e, this.core.s), this.videoLoaded = !1, this.init(), this
        }
        var e = {
            videoMaxWidth: "855px",
            autoplayFirstVideo: !0,
            youtubePlayerParams: !1,
            vimeoPlayerParams: !1,
            dailymotionPlayerParams: !1,
            vkPlayerParams: !1,
            videojs: !1,
            videojsOptions: {}
        };
        t.prototype.init = function() {
            var s = this;
            s.core.$el.on("hasVideo.lg.tm", function(t, e, i, s) {
                var o = this;
                if (o.core.$slide.eq(e).find(".lg-video").append(o.loadVideo(i, "lg-object", !0, e, s)), s)
                    if (o.core.s.videojs) try {
                        videojs(o.core.$slide.eq(e).find(".lg-html5").get(0), o.core.s.videojsOptions, function() {
                            !o.videoLoaded && o.core.s.autoplayFirstVideo && this.play()
                        })
                    } catch (t) {
                        console.error("Make sure you have included videojs")
                    } else !o.videoLoaded && o.core.s.autoplayFirstVideo && o.core.$slide.eq(e).find(".lg-html5").get(0).play()
            }.bind(this)), s.core.$el.on("onAferAppendSlide.lg.tm", function(t, e) {
                (e = this.core.$slide.eq(e).find(".lg-video-cont")).hasClass("lg-has-iframe") || (e.css("max-width", this.core.s.videoMaxWidth), this.videoLoaded = !0)
            }.bind(this)), s.core.doCss() && 1 < s.core.$items.length && (s.core.s.enableSwipe || s.core.s.enableDrag) ? s.core.$el.on("onSlideClick.lg.tm", function() {
                var t = s.core.$slide.eq(s.core.index);
                s.loadVideoOnclick(t)
            }) : s.core.$slide.on("click.lg", function() {
                s.loadVideoOnclick(l(this))
            }), s.core.$el.on("onBeforeSlide.lg.tm", function(t, e, i) {
                var s = this,
                    o = (a = s.core.$slide.eq(e)).find(".lg-youtube").get(0),
                    n = a.find(".lg-vimeo").get(0),
                    r = a.find(".lg-dailymotion").get(0),
                    e = a.find(".lg-vk").get(0),
                    a = a.find(".lg-html5").get(0);
                if (o) o.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                else if (n) try {
                        $f(n).api("pause")
                    } catch (t) {
                        console.error("Make sure you have included froogaloop2 js")
                    } else if (r) r.contentWindow.postMessage("pause", "*");
                    else if (a)
                    if (s.core.s.videojs) try {
                        videojs(a).pause()
                    } catch (t) {
                        console.error("Make sure you have included videojs")
                    } else a.pause();
                e && l(e).attr("src", l(e).attr("src").replace("&autoplay", "&noplay")), e = s.core.s.dynamic ? s.core.s.dynamicEl[i].src : s.core.$items.eq(i).attr("href") || s.core.$items.eq(i).attr("data-src"), ((i = s.core.isVideo(e, i) || {}).youtube || i.vimeo || i.dailymotion || i.vk) && s.core.$outer.addClass("lg-hide-download")
            }.bind(this)), s.core.$el.on("onAfterSlide.lg.tm", function(t, e) {
                s.core.$slide.eq(e).removeClass("lg-video-playing")
            }), s.core.s.autoplayFirstVideo && s.core.$el.on("onAferAppendSlide.lg.tm", function(t, e) {
                var i;
                s.core.lGalleryOn || (i = s.core.$slide.eq(e), setTimeout(function() {
                    s.loadVideoOnclick(i)
                }, 100))
            })
        }, t.prototype.loadVideo = function(t, e, i, s, o) {
            var n = "",
                r = 1,
                a = "",
                s = this.core.isVideo(t, s) || {};
            return i && (r = !this.videoLoaded && this.core.s.autoplayFirstVideo ? 1 : 0), s.youtube ? (a = "?wmode=opaque&autoplay=" + r + "&enablejsapi=1", this.core.s.youtubePlayerParams && (a = a + "&" + l.param(this.core.s.youtubePlayerParams)), n = '<iframe class="lg-video-object lg-youtube ' + e + '" width="560" height="315" src="//www.youtube.com/embed/' + s.youtube[1] + a + '" frameborder="0" allowfullscreen></iframe>') : s.vimeo ? (a = "?autoplay=" + r + "&api=1", this.core.s.vimeoPlayerParams && (a = a + "&" + l.param(this.core.s.vimeoPlayerParams)), n = '<iframe class="lg-video-object lg-vimeo ' + e + '" width="560" height="315"  src="//player.vimeo.com/video/' + s.vimeo[1] + a + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>') : s.dailymotion ? (a = "?wmode=opaque&autoplay=" + r + "&api=postMessage", this.core.s.dailymotionPlayerParams && (a = a + "&" + l.param(this.core.s.dailymotionPlayerParams)), n = '<iframe class="lg-video-object lg-dailymotion ' + e + '" width="560" height="315" src="//www.dailymotion.com/embed/video/' + s.dailymotion[1] + a + '" frameborder="0" allowfullscreen></iframe>') : s.html5 ? n = o = "." === (i = o.substring(0, 1)) || "#" === i ? l(o).html() : o : s.vk && (a = "&autoplay=" + r, this.core.s.vkPlayerParams && (a = a + "&" + l.param(this.core.s.vkPlayerParams)), n = '<iframe class="lg-video-object lg-vk ' + e + '" width="560" height="315" src="//vk.com/video_ext.php?' + s.vk[1] + a + '" frameborder="0" allowfullscreen></iframe>'), n
        }, t.prototype.loadVideoOnclick = function(i) {
            var s = this;
            if (i.find(".lg-object").hasClass("lg-has-poster") && i.find(".lg-object").is(":visible"))
                if (i.hasClass("lg-has-video")) {
                    var t = i.find(".lg-youtube").get(0),
                        e = i.find(".lg-vimeo").get(0),
                        o = i.find(".lg-dailymotion").get(0),
                        n = i.find(".lg-html5").get(0);
                    if (t) t.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                    else if (e) try {
                            $f(e).api("play")
                        } catch (i) {
                            console.error("Make sure you have included froogaloop2 js")
                        } else if (o) o.contentWindow.postMessage("play", "*");
                        else if (n)
                        if (s.core.s.videojs) try {
                            videojs(n).play()
                        } catch (i) {
                            console.error("Make sure you have included videojs")
                        } else n.play();
                    i.addClass("lg-video-playing")
                } else {
                    i.addClass("lg-video-playing lg-has-video");
                    var r, o = function(t, e) {
                            if (i.find(".lg-video").append(s.loadVideo(t, "", !1, s.core.index, e)), e)
                                if (s.core.s.videojs) try {
                                    videojs(s.core.$slide.eq(s.core.index).find(".lg-html5").get(0), s.core.s.videojsOptions, function() {
                                        this.play()
                                    })
                                } catch (t) {
                                    console.error("Make sure you have included videojs")
                                } else s.core.$slide.eq(s.core.index).find(".lg-html5").get(0).play()
                        },
                        n = s.core.s.dynamic ? (r = s.core.s.dynamicEl[s.core.index].src, s.core.s.dynamicEl[s.core.index].html) : (r = s.core.$items.eq(s.core.index).attr("href") || s.core.$items.eq(s.core.index).attr("data-src"), s.core.$items.eq(s.core.index).attr("data-html"));
                    o(r, n);
                    n = i.find(".lg-object");
                    i.find(".lg-video").append(n), i.find(".lg-video-object").hasClass("lg-html5") || (i.removeClass("lg-complete"), i.find(".lg-video-object").on("load.lg error.lg", function() {
                        i.addClass("lg-complete")
                    }))
                }
        }, t.prototype.destroy = function() {
            this.videoLoaded = !1
        }, l.fn.lightGallery.modules.video = t
    }()
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(c) {
    ! function() {
        "use strict";

        function t(t) {
            return this.core = c(t).data("lightGallery"), this.core.s = c.extend({}, s, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = !1, this.pageX = c(window).width() / 2, this.pageY = c(window).height() / 2 + c(window).scrollTop()), this
        }
        var e, i, s = {
            scale: 1,
            zoom: !0,
            actualSize: !0,
            enableZoomAfter: 300,
            useLeftForZoom: (e = !1, i = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./), e = !!(i && parseInt(i[2], 10) < 54) || e)
        };
        t.prototype.init = function() {
            var n = this,
                t = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
            n.core.s.actualSize && (t += '<span id="lg-actual-size" class="lg-icon"></span>'), n.core.s.useLeftForZoom ? n.core.$outer.addClass("lg-use-left-for-zoom") : n.core.$outer.addClass("lg-use-transition-for-zoom"), this.core.$outer.find(".lg-toolbar").append(t), n.core.$el.on("onSlideItemLoad.lg.tm.zoom", function(t, e, i) {
                var s = n.core.s.enableZoomAfter + i;
                c("body").hasClass("lg-from-hash") && i ? s = 0 : c("body").removeClass("lg-from-hash"), n.zoomabletimeout = setTimeout(function() {
                    n.core.$slide.eq(e).addClass("lg-zoomable")
                }, s + 30)
            });

            function e(t) {
                var e = n.core.$outer.find(".lg-current .lg-image"),
                    i = (c(window).width() - e.prop("offsetWidth")) / 2,
                    s = (c(window).height() - e.prop("offsetHeight")) / 2 + c(window).scrollTop(),
                    i = (t - 1) * (n.pageX - i),
                    s = (t - 1) * (n.pageY - s);
                e.css("transform", "scale3d(" + t + ", " + t + ", 1)").attr("data-scale", t), (n.core.s.useLeftForZoom ? e.parent().css({
                    left: -i + "px",
                    top: -s + "px"
                }) : e.parent().css("transform", "translate3d(-" + i + "px, -" + s + "px, 0)")).attr("data-x", i).attr("data-y", s)
            }

            function r() {
                1 < a ? n.core.$outer.addClass("lg-zoomed") : n.resetZoom(), e(a = a < 1 ? 1 : a)
            }

            function s(t, e, i, s) {
                var o = e.prop("offsetWidth"),
                    e = n.core.s.dynamic ? n.core.s.dynamicEl[i].width || e[0].naturalWidth || o : n.core.$items.eq(i).attr("data-width") || e[0].naturalWidth || o;
                n.core.$outer.hasClass("lg-zoomed") ? a = 1 : o < e && (a = e / o || 2), s ? (n.pageX = c(window).width() / 2, n.pageY = c(window).height() / 2 + c(window).scrollTop()) : (n.pageX = t.pageX || t.originalEvent.targetTouches[0].pageX, n.pageY = t.pageY || t.originalEvent.targetTouches[0].pageY), r(), setTimeout(function() {
                    n.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                }, 10)
            }
            var a = 1,
                o = !1;
            n.core.$el.on("onAferAppendSlide.lg.tm.zoom", function(t, e) {
                var i = n.core.$slide.eq(e).find(".lg-image");
                i.on("dblclick", function(t) {
                    s(t, i, e)
                }), i.on("touchstart", function(t) {
                    o ? (clearTimeout(o), o = null, s(t, i, e)) : o = setTimeout(function() {
                        o = null
                    }, 300), t.preventDefault()
                })
            }), c(window).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function() {
                n.pageX = c(window).width() / 2, n.pageY = c(window).height() / 2 + c(window).scrollTop(), e(a)
            }), c("#lg-zoom-out").on("click.lg", function() {
                n.core.$outer.find(".lg-current .lg-image").length && (a -= n.core.s.scale, r())
            }), c("#lg-zoom-in").on("click.lg", function() {
                n.core.$outer.find(".lg-current .lg-image").length && (a += n.core.s.scale, r())
            }), c("#lg-actual-size").on("click.lg", function(t) {
                s(t, n.core.$slide.eq(n.core.index).find(".lg-image"), n.core.index, !0)
            }), n.core.$el.on("onBeforeSlide.lg.tm", function() {
                a = 1, n.resetZoom()
            }), n.zoomDrag(), n.zoomSwipe()
        }, t.prototype.resetZoom = function() {
            this.core.$outer.removeClass("lg-zoomed"), this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y"), this.core.$slide.find(".lg-image").removeAttr("style data-scale"), this.pageX = c(window).width() / 2, this.pageY = c(window).height() / 2 + c(window).scrollTop()
        }, t.prototype.zoomSwipe = function() {
            var s = this,
                o = {},
                n = {},
                r = !1,
                a = !1,
                l = !1;
            s.core.$slide.on("touchstart.lg", function(t) {
                var e;
                s.core.$outer.hasClass("lg-zoomed") && (e = s.core.$slide.eq(s.core.index).find(".lg-object"), l = e.prop("offsetHeight") * e.attr("data-scale") > s.core.$outer.find(".lg").height(), ((a = e.prop("offsetWidth") * e.attr("data-scale") > s.core.$outer.find(".lg").width()) || l) && (t.preventDefault(), o = {
                    x: t.originalEvent.targetTouches[0].pageX,
                    y: t.originalEvent.targetTouches[0].pageY
                }))
            }), s.core.$slide.on("touchmove.lg", function(t) {
                var e, i;
                s.core.$outer.hasClass("lg-zoomed") && (i = s.core.$slide.eq(s.core.index).find(".lg-img-wrap"), t.preventDefault(), r = !0, n = {
                    x: t.originalEvent.targetTouches[0].pageX,
                    y: t.originalEvent.targetTouches[0].pageY
                }, s.core.$outer.addClass("lg-zoom-dragging"), e = l ? -Math.abs(i.attr("data-y")) + (n.y - o.y) : -Math.abs(i.attr("data-y")), t = a ? -Math.abs(i.attr("data-x")) + (n.x - o.x) : -Math.abs(i.attr("data-x")), (15 < Math.abs(n.x - o.x) || 15 < Math.abs(n.y - o.y)) && (s.core.s.useLeftForZoom ? i.css({
                    left: t + "px",
                    top: e + "px"
                }) : i.css("transform", "translate3d(" + t + "px, " + e + "px, 0)")))
            }), s.core.$slide.on("touchend.lg", function() {
                s.core.$outer.hasClass("lg-zoomed") && r && (r = !1, s.core.$outer.removeClass("lg-zoom-dragging"), s.touchendZoom(o, n, a, l))
            })
        }, t.prototype.zoomDrag = function() {
            var s = this,
                o = {},
                n = {},
                r = !1,
                a = !1,
                l = !1,
                h = !1;
            s.core.$slide.on("mousedown.lg.zoom", function(t) {
                var e = s.core.$slide.eq(s.core.index).find(".lg-object");
                h = e.prop("offsetHeight") * e.attr("data-scale") > s.core.$outer.find(".lg").height(), l = e.prop("offsetWidth") * e.attr("data-scale") > s.core.$outer.find(".lg").width(), s.core.$outer.hasClass("lg-zoomed") && c(t.target).hasClass("lg-object") && (l || h) && (t.preventDefault(), o = {
                    x: t.pageX,
                    y: t.pageY
                }, r = !0, s.core.$outer.scrollLeft += 1, --s.core.$outer.scrollLeft, s.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"))
            }), c(window).on("mousemove.lg.zoom", function(t) {
                var e, i;
                r && (i = s.core.$slide.eq(s.core.index).find(".lg-img-wrap"), a = !0, n = {
                    x: t.pageX,
                    y: t.pageY
                }, s.core.$outer.addClass("lg-zoom-dragging"), e = h ? -Math.abs(i.attr("data-y")) + (n.y - o.y) : -Math.abs(i.attr("data-y")), t = l ? -Math.abs(i.attr("data-x")) + (n.x - o.x) : -Math.abs(i.attr("data-x")), s.core.s.useLeftForZoom ? i.css({
                    left: t + "px",
                    top: e + "px"
                }) : i.css("transform", "translate3d(" + t + "px, " + e + "px, 0)"))
            }), c(window).on("mouseup.lg.zoom", function(t) {
                r && (r = !1, s.core.$outer.removeClass("lg-zoom-dragging"), !a || o.x === n.x && o.y === n.y || (n = {
                    x: t.pageX,
                    y: t.pageY
                }, s.touchendZoom(o, n, l, h)), a = !1), s.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
            })
        }, t.prototype.touchendZoom = function(t, e, i, s) {
            var o = this,
                n = o.core.$slide.eq(o.core.index).find(".lg-img-wrap"),
                r = o.core.$slide.eq(o.core.index).find(".lg-object"),
                a = -Math.abs(n.attr("data-x")) + (e.x - t.x),
                l = -Math.abs(n.attr("data-y")) + (e.y - t.y),
                h = (o.core.$outer.find(".lg").height() - r.prop("offsetHeight")) / 2,
                c = Math.abs(r.prop("offsetHeight") * Math.abs(r.attr("data-scale")) - o.core.$outer.find(".lg").height() + h),
                u = (o.core.$outer.find(".lg").width() - r.prop("offsetWidth")) / 2,
                r = Math.abs(r.prop("offsetWidth") * Math.abs(r.attr("data-scale")) - o.core.$outer.find(".lg").width() + u);
            (15 < Math.abs(e.x - t.x) || 15 < Math.abs(e.y - t.y)) && (s && (l <= -c ? l = -c : -h <= l && (l = -h)), i && (a <= -r ? a = -r : -u <= a && (a = -u)), s ? n.attr("data-y", Math.abs(l)) : l = -Math.abs(n.attr("data-y")), i ? n.attr("data-x", Math.abs(a)) : a = -Math.abs(n.attr("data-x")), o.core.s.useLeftForZoom ? n.css({
                left: a + "px",
                top: l + "px"
            }) : n.css("transform", "translate3d(" + a + "px, " + l + "px, 0)"))
        }, t.prototype.destroy = function() {
            var t = this;
            t.core.$el.off(".lg.zoom"), c(window).off(".lg.zoom"), t.core.$slide.off(".lg.zoom"), t.core.$el.off(".lg.tm.zoom"), t.resetZoom(), clearTimeout(t.zoomabletimeout), t.zoomabletimeout = !1
        }, c.fn.lightGallery.modules.zoom = t
    }()
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(i) {
    ! function() {
        "use strict";

        function t(t) {
            return this.core = i(t).data("lightGallery"), this.core.s = i.extend({}, e, this.core.s), this.core.s.hash && (this.oldHash = window.location.hash, this.init()), this
        }
        var e = {
            hash: !0
        };
        t.prototype.init = function() {
            var e, s = this;
            s.core.$el.on("onAfterSlide.lg.tm", function(t, e, i) {
                history.replaceState ? history.replaceState(null, null, window.location.pathname + window.location.search + "#lg=" + s.core.s.galleryId + "&slide=" + i) : window.location.hash = "lg=" + s.core.s.galleryId + "&slide=" + i
            }), i(window).on("hashchange.lg.hash", function() {
                e = window.location.hash;
                var t = parseInt(e.split("&slide=")[1], 10); - 1 < e.indexOf("lg=" + s.core.s.galleryId) ? s.core.slide(t, !1, !1) : s.core.lGalleryOn && s.core.destroy()
            })
        }, t.prototype.destroy = function() {
            this.core.s.hash && (this.oldHash && this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0 ? history.replaceState ? history.replaceState(null, null, this.oldHash) : window.location.hash = this.oldHash : history.replaceState ? history.replaceState(null, document.title, window.location.pathname + window.location.search) : window.location.hash = "", this.core.$el.off(".lg.hash"))
        }, i.fn.lightGallery.modules.hash = t
    }()
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(o) {
    ! function() {
        "use strict";

        function t(t) {
            return this.core = o(t).data("lightGallery"), this.core.s = o.extend({}, e, this.core.s), this.core.s.share && this.init(), this
        }
        var e = {
            share: !0,
            facebook: !0,
            facebookDropdownText: "Facebook",
            twitter: !0,
            twitterDropdownText: "Twitter",
            googlePlus: !0,
            googlePlusDropdownText: "GooglePlus",
            pinterest: !0,
            pinterestDropdownText: "Pinterest"
        };
        t.prototype.init = function() {
            var s = this,
                t = '<span id="lg-share" class="lg-icon"><ul class="lg-dropdown" style="position: absolute;">';
            t += s.core.s.facebook ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.facebookDropdownText + "</span></a></li>" : "", t += s.core.s.twitter ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.twitterDropdownText + "</span></a></li>" : "", t += s.core.s.googlePlus ? '<li><a id="lg-share-googleplus" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.googlePlusDropdownText + "</span></a></li>" : "", t += s.core.s.pinterest ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.pinterestDropdownText + "</span></a></li>" : "", t += "</ul></span>", this.core.$outer.find(".lg-toolbar").append(t), this.core.$outer.find(".lg").append('<div id="lg-dropdown-overlay"></div>'), o("#lg-share").on("click.lg", function() {
                s.core.$outer.toggleClass("lg-dropdown-active")
            }), o("#lg-dropdown-overlay").on("click.lg", function() {
                s.core.$outer.removeClass("lg-dropdown-active")
            }), s.core.$el.on("onAfterSlide.lg.tm", function(t, e, i) {
                setTimeout(function() {
                    o("#lg-share-facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(s.getSahreProps(i, "facebookShareUrl") || window.location.href)), o("#lg-share-twitter").attr("href", "https://twitter.com/intent/tweet?text=" + s.getSahreProps(i, "tweetText") + "&url=" + encodeURIComponent(s.getSahreProps(i, "twitterShareUrl") || window.location.href)), o("#lg-share-googleplus").attr("href", "https://plus.google.com/share?url=" + encodeURIComponent(s.getSahreProps(i, "googleplusShareUrl") || window.location.href)), o("#lg-share-pinterest").attr("href", "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(s.getSahreProps(i, "pinterestShareUrl") || window.location.href) + "&media=" + encodeURIComponent(s.getSahreProps(i, "src")) + "&description=" + s.getSahreProps(i, "pinterestText"))
                }, 100)
            })
        }, t.prototype.getSahreProps = function(t, e) {
            var i;
            return this.core.s.dynamic ? this.core.s.dynamicEl[t][e] : (i = this.core.$items.eq(t).attr("href"), t = this.core.$items.eq(t).data(e), "src" === e && i || t)
        }, t.prototype.destroy = function() {}, o.fn.lightGallery.modules.share = t
    }()
}),
function(l, i, s, a) {
    function h(t, e) {
        this.settings = null, this.options = l.extend({}, h.Defaults, e), this.$element = l(t), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, l.each(["onResize", "onThrottledResize"], l.proxy(function(t, e) {
            this._handlers[e] = l.proxy(this[e], this)
        }, this)), l.each(h.Plugins, l.proxy(function(t, e) {
            this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
        }, this)), l.each(h.Workers, l.proxy(function(t, e) {
            this._pipe.push({
                filter: e.filter,
                run: l.proxy(e.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    h.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: i,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, h.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, h.Type = {
        Event: "event",
        State: "state"
    }, h.Plugins = {}, h.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = this.settings.margin || "",
                i = !this.settings.autoWidth,
                s = this.settings.rtl,
                e = {
                    width: "auto",
                    "margin-left": s ? e : "",
                    "margin-right": s ? "" : e
                };
            i || this.$stage.children().css(e), t.css = e
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                i = null,
                s = this._items.length,
                o = !this.settings.autoWidth,
                n = [];
            for (t.items = {
                    merge: !1,
                    width: e
                }; s--;) i = this._mergers[s], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = 1 < i || t.items.merge, n[s] = o ? e * i : this._items[s].width();
            this._widths = n
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var t = [],
                e = this._items,
                i = this.settings,
                s = Math.max(2 * i.items, 4),
                o = 2 * Math.ceil(e.length / 2),
                n = i.loop && e.length ? i.rewind ? s : Math.max(s, o) : 0,
                r = "",
                a = "";
            for (n /= 2; 0 < n;) t.push(this.normalize(t.length / 2, !0)), r += e[t[t.length - 1]][0].outerHTML, t.push(this.normalize(e.length - 1 - (t.length - 1) / 2, !0)), a = e[t[t.length - 1]][0].outerHTML + a, --n;
            this._clones = t, l(r).addClass("cloned").appendTo(this.$stage), l(a).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var t, e, i = this.settings.rtl ? 1 : -1, s = this._clones.length + this._items.length, o = -1, n = []; ++o < s;) t = n[o - 1] || 0, e = this._widths[this.relative(o)] + this.settings.margin, n.push(t + e * i);
            this._coordinates = n
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var t = this.settings.stagePadding,
                e = this._coordinates,
                t = {
                    width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                    "padding-left": t || "",
                    "padding-right": t || ""
                };
            this.$stage.css(t)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = this._coordinates.length,
                i = !this.settings.autoWidth,
                s = this.$stage.children();
            if (i && t.items.merge)
                for (; e--;) t.css.width = this._widths[this.relative(e)], s.eq(e).css(t.css);
            else i && (t.css.width = t.items.width, s.css(t.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            for (var t, e, i = this.settings.rtl ? 1 : -1, s = 2 * this.settings.stagePadding, o = this.coordinates(this.current()) + s, n = o + this.width() * i, r = [], a = 0, l = this._coordinates.length; a < l; a++) t = this._coordinates[a - 1] || 0, e = Math.abs(this._coordinates[a]) + s * i, (this.op(t, "<=", o) && this.op(t, ">", n) || this.op(e, "<", o) && this.op(e, ">", n)) && r.push(a);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + r.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
        }
    }], h.prototype.initializeStage = function() {
        this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = l("<" + this.settings.stageElement + ">", {
            class: this.settings.stageClass
        }).wrap(l("<div/>", {
            class: this.settings.stageOuterClass
        })), this.$element.append(this.$stage.parent()))
    }, h.prototype.initializeItems = function() {
        var t = this.$element.find(".owl-item");
        if (t.length) return this._items = t.get().map(function(t) {
            return l(t)
        }), this._mergers = this._items.map(function() {
            return 1
        }), void this.refresh();
        this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
    }, h.prototype.initialize = function() {
        var t, e;
        this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading") && (t = this.$element.find("img"), e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : a, e = this.$element.children(e).width(), t.length && e <= 0 && this.preloadAutoWidthImages(t)), this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, h.prototype.isVisible = function() {
        return !this.settings.checkVisibility || this.$element.is(":visible")
    }, h.prototype.setup = function() {
        var e = this.viewport(),
            t = this.options.responsive,
            i = -1,
            s = null;
        t ? (l.each(t, function(t) {
            t <= e && i < t && (i = Number(t))
        }), "function" == typeof(s = l.extend({}, this.options, t[i])).stagePadding && (s.stagePadding = s.stagePadding()), delete s.responsive, s.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i))) : s = l.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: s
            }
        }), this._breakpoint = i, this.settings = s, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, h.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, h.prototype.prepare = function(t) {
        var e = this.trigger("prepare", {
            content: t
        });
        return e.data || (e.data = l("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(t)), this.trigger("prepared", {
            content: e.data
        }), e.data
    }, h.prototype.update = function() {
        for (var t = 0, e = this._pipe.length, i = l.proxy(function(t) {
                return this[t]
            }, this._invalidated), s = {}; t < e;)(this._invalidated.all || 0 < l.grep(this._pipe[t].filter, i).length) && this._pipe[t].run(s), t++;
        this._invalidated = {}, this.is("valid") || this.enter("valid")
    }, h.prototype.width = function(t) {
        switch (t = t || h.Width.Default) {
            case h.Width.Inner:
            case h.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, h.prototype.refresh = function() {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, h.prototype.onThrottledResize = function() {
        i.clearTimeout(this.resizeTimer), this.resizeTimer = i.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, h.prototype.onResize = function() {
        return !!this._items.length && this._width !== this.$element.width() && !!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
    }, h.prototype.registerEventHandlers = function() {
        l.support.transition && this.$stage.on(l.support.transition.end + ".owl.core", l.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(i, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", l.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", l.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", l.proxy(this.onDragEnd, this)))
    }, h.prototype.onDragStart = function(t) {
        var e = null;
        3 !== t.which && (e = l.support.transform ? {
            x: (e = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === e.length ? 12 : 4],
            y: e[16 === e.length ? 13 : 5]
        } : (e = this.$stage.position(), {
            x: this.settings.rtl ? e.left + this.$stage.width() - this.width() + this.settings.margin : e.left,
            y: e.top
        }), this.is("animating") && (l.support.transform ? this.animate(e.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === t.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = l(t.target), this._drag.stage.start = e, this._drag.stage.current = e, this._drag.pointer = this.pointer(t), l(s).on("mouseup.owl.core touchend.owl.core", l.proxy(this.onDragEnd, this)), l(s).one("mousemove.owl.core touchmove.owl.core", l.proxy(function(t) {
            var e = this.difference(this._drag.pointer, this.pointer(t));
            l(s).on("mousemove.owl.core touchmove.owl.core", l.proxy(this.onDragMove, this)), Math.abs(e.x) < Math.abs(e.y) && this.is("valid") || (t.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, h.prototype.onDragMove = function(t) {
        var e, i = null,
            s = null,
            o = this.difference(this._drag.pointer, this.pointer(t)),
            n = this.difference(this._drag.stage.start, o);
        this.is("dragging") && (t.preventDefault(), this.settings.loop ? (i = this.coordinates(this.minimum()), s = this.coordinates(this.maximum() + 1) - i, n.x = ((n.x - i) % s + s) % s + i) : (i = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), s = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), e = this.settings.pullDrag ? -1 * o.x / 5 : 0, n.x = Math.max(Math.min(n.x, i + e), s + e)), this._drag.stage.current = n, this.animate(n.x))
    }, h.prototype.onDragEnd = function(t) {
        var e = this.difference(this._drag.pointer, this.pointer(t)),
            i = this._drag.stage.current,
            t = 0 < e.x ^ this.settings.rtl ? "left" : "right";
        l(s).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== e.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(i.x, 0 !== e.x ? t : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = t, (3 < Math.abs(e.x) || 300 < (new Date).getTime() - this._drag.time) && this._drag.target.one("click.owl.core", function() {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, h.prototype.closest = function(i, s) {
        var o = -1,
            n = this.width(),
            r = this.coordinates();
        return this.settings.freeDrag || l.each(r, l.proxy(function(t, e) {
            return "left" === s && e - 30 < i && i < e + 30 ? o = t : "right" === s && e - n - 30 < i && i < e - n + 30 ? o = t + 1 : this.op(i, "<", e) && this.op(i, ">", r[t + 1] !== a ? r[t + 1] : e - n) && (o = "left" === s ? t + 1 : t), -1 === o
        }, this)), this.settings.loop || (this.op(i, ">", r[this.minimum()]) ? o = i = this.minimum() : this.op(i, "<", r[this.maximum()]) && (o = i = this.maximum())), o
    }, h.prototype.animate = function(t) {
        var e = 0 < this.speed();
        this.is("animating") && this.onTransitionEnd(), e && (this.enter("animating"), this.trigger("translate")), l.support.transform3d && l.support.transition ? this.$stage.css({
            transform: "translate3d(" + t + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
        }) : e ? this.$stage.animate({
            left: t + "px"
        }, this.speed(), this.settings.fallbackEasing, l.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: t + "px"
        })
    }, h.prototype.is = function(t) {
        return this._states.current[t] && 0 < this._states.current[t]
    }, h.prototype.current = function(t) {
        return t === a ? this._current : 0 === this._items.length ? a : (t = this.normalize(t), this._current !== t && ((e = this.trigger("change", {
            property: {
                name: "position",
                value: t
            }
        })).data !== a && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
            property: {
                name: "position",
                value: this._current
            }
        })), this._current);
        var e
    }, h.prototype.invalidate = function(t) {
        return "string" === l.type(t) && (this._invalidated[t] = !0, this.is("valid") && this.leave("valid")), l.map(this._invalidated, function(t, e) {
            return e
        })
    }, h.prototype.reset = function(t) {
        (t = this.normalize(t)) !== a && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, h.prototype.normalize = function(t, e) {
        var i = this._items.length,
            e = e ? 0 : this._clones.length;
        return !this.isNumeric(t) || i < 1 ? t = a : (t < 0 || i + e <= t) && (t = ((t - e / 2) % i + i) % i + e / 2), t
    }, h.prototype.relative = function(t) {
        return t -= this._clones.length / 2, this.normalize(t, !0)
    }, h.prototype.maximum = function(t) {
        var e, i, s, o = this.settings,
            n = this._coordinates.length;
        if (o.loop) n = this._clones.length / 2 + this._items.length - 1;
        else if (o.autoWidth || o.merge) {
            if (e = this._items.length)
                for (i = this._items[--e].width(), s = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > s););
            n = e + 1
        } else n = o.center ? this._items.length - 1 : this._items.length - o.items;
        return t && (n -= this._clones.length / 2), Math.max(n, 0)
    }, h.prototype.minimum = function(t) {
        return t ? 0 : this._clones.length / 2
    }, h.prototype.items = function(t) {
        return t === a ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, h.prototype.mergers = function(t) {
        return t === a ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, h.prototype.clones = function(i) {
        function s(t) {
            return t % 2 == 0 ? o + t / 2 : e - (t + 1) / 2
        }
        var e = this._clones.length / 2,
            o = e + this._items.length;
        return i === a ? l.map(this._clones, function(t, e) {
            return s(e)
        }) : l.map(this._clones, function(t, e) {
            return t === i ? s(e) : null
        })
    }, h.prototype.speed = function(t) {
        return t !== a && (this._speed = t), this._speed
    }, h.prototype.coordinates = function(t) {
        var e, i = 1,
            s = t - 1;
        return t === a ? l.map(this._coordinates, l.proxy(function(t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (this.settings.rtl && (i = -1, s = t + 1), e = this._coordinates[t], e += (this.width() - e + (this._coordinates[s] || 0)) / 2 * i) : e = this._coordinates[s] || 0, Math.ceil(e))
    }, h.prototype.duration = function(t, e, i) {
        return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }, h.prototype.to = function(t, e) {
        var i, s = this.current(),
            o = t - this.relative(s),
            n = (0 < o) - (o < 0),
            r = this._items.length,
            a = this.minimum(),
            l = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(o) > r / 2 && (o += -1 * n * r), (i = (((t = s + o) - a) % r + r) % r + a) !== t && i - o <= l && 0 < i - o && this.reset(s = (t = i) - o)) : t = this.settings.rewind ? (t % (l += 1) + l) % l : Math.max(a, Math.min(l, t)), this.speed(this.duration(s, t, e)), this.current(t), this.isVisible() && this.update()
    }, h.prototype.next = function(t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, h.prototype.prev = function(t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, h.prototype.onTransitionEnd = function(t) {
        if (t !== a && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, h.prototype.viewport = function() {
        var t;
        return this.options.responsiveBaseElement !== i ? t = l(this.options.responsiveBaseElement).width() : i.innerWidth ? t = i.innerWidth : s.documentElement && s.documentElement.clientWidth ? t = s.documentElement.clientWidth : console.warn("Can not detect viewport width."), t
    }, h.prototype.replace = function(t) {
        this.$stage.empty(), this._items = [], t = t && (t instanceof jQuery ? t : l(t)), (t = this.settings.nestedItemSelector ? t.find("." + this.settings.nestedItemSelector) : t).filter(function() {
            return 1 === this.nodeType
        }).each(l.proxy(function(t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(+e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, h.prototype.add = function(t, e) {
        var i = this.relative(this._current);
        e = e === a ? this._items.length : this.normalize(e, !0), t = t instanceof jQuery ? t : l(t), this.trigger("add", {
            content: t,
            position: e
        }), t = this.prepare(t), 0 === this._items.length || e === this._items.length ? (0 === this._items.length && this.$stage.append(t), 0 !== this._items.length && this._items[e - 1].after(t), this._items.push(t), this._mergers.push(+t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, +t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[i] && this.reset(this._items[i].index()), this.invalidate("items"), this.trigger("added", {
            content: t,
            position: e
        })
    }, h.prototype.remove = function(t) {
        (t = this.normalize(t, !0)) !== a && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, h.prototype.preloadAutoWidthImages = function(t) {
        t.each(l.proxy(function(t, e) {
            this.enter("pre-loading"), e = l(e), l(new Image).one("load", l.proxy(function(t) {
                e.attr("src", t.target.src), e.css("opacity", 1), this.leave("pre-loading"), this.is("pre-loading") || this.is("initializing") || this.refresh()
            }, this)).attr("src", e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"))
        }, this))
    }, h.prototype.destroy = function() {
        for (var t in this.$element.off(".owl.core"), this.$stage.off(".owl.core"), l(s).off(".owl.core"), !1 !== this.settings.responsive && (i.clearTimeout(this.resizeTimer), this.off(i, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[t].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, h.prototype.op = function(t, e, i) {
        var s = this.settings.rtl;
        switch (e) {
            case "<":
                return s ? i < t : t < i;
            case ">":
                return s ? t < i : i < t;
            case ">=":
                return s ? t <= i : i <= t;
            case "<=":
                return s ? i <= t : t <= i
        }
    }, h.prototype.on = function(t, e, i, s) {
        t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
    }, h.prototype.off = function(t, e, i, s) {
        t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
    }, h.prototype.trigger = function(t, e, i, s, o) {
        var n = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            r = l.camelCase(l.grep(["on", t, i], function(t) {
                return t
            }).join("-").toLowerCase()),
            a = l.Event([t, "owl", i || "carousel"].join(".").toLowerCase(), l.extend({
                relatedTarget: this
            }, n, e));
        return this._supress[t] || (l.each(this._plugins, function(t, e) {
            e.onTrigger && e.onTrigger(a)
        }), this.register({
            type: h.Type.Event,
            name: t
        }), this.$element.trigger(a), this.settings && "function" == typeof this.settings[r] && this.settings[r].call(this, a)), a
    }, h.prototype.enter = function(t) {
        l.each([t].concat(this._states.tags[t] || []), l.proxy(function(t, e) {
            this._states.current[e] === a && (this._states.current[e] = 0), this._states.current[e]++
        }, this))
    }, h.prototype.leave = function(t) {
        l.each([t].concat(this._states.tags[t] || []), l.proxy(function(t, e) {
            this._states.current[e]--
        }, this))
    }, h.prototype.register = function(i) {
        var e;
        i.type === h.Type.Event ? (l.event.special[i.name] || (l.event.special[i.name] = {}), l.event.special[i.name].owl || (e = l.event.special[i.name]._default, l.event.special[i.name]._default = function(t) {
            return !e || !e.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && -1 < t.namespace.indexOf("owl") : e.apply(this, arguments)
        }, l.event.special[i.name].owl = !0)) : i.type === h.Type.State && (this._states.tags[i.name] ? this._states.tags[i.name] = this._states.tags[i.name].concat(i.tags) : this._states.tags[i.name] = i.tags, this._states.tags[i.name] = l.grep(this._states.tags[i.name], l.proxy(function(t, e) {
            return l.inArray(t, this._states.tags[i.name]) === e
        }, this)))
    }, h.prototype.suppress = function(t) {
        l.each(t, l.proxy(function(t, e) {
            this._supress[e] = !0
        }, this))
    }, h.prototype.release = function(t) {
        l.each(t, l.proxy(function(t, e) {
            delete this._supress[e]
        }, this))
    }, h.prototype.pointer = function(t) {
        var e = {
            x: null,
            y: null
        };
        return (t = (t = t.originalEvent || t || i.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (e.x = t.pageX, e.y = t.pageY) : (e.x = t.clientX, e.y = t.clientY), e
    }, h.prototype.isNumeric = function(t) {
        return !isNaN(parseFloat(t))
    }, h.prototype.difference = function(t, e) {
        return {
            x: t.x - e.x,
            y: t.y - e.y
        }
    }, l.fn.owlCarousel = function(e) {
        var s = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var t = l(this),
                i = t.data("owl.carousel");
            i || (i = new h(this, "object" == typeof e && e), t.data("owl.carousel", i), l.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(t, e) {
                i.register({
                    type: h.Type.Event,
                    name: e
                }), i.$element.on(e + ".owl.carousel.core", l.proxy(function(t) {
                    t.namespace && t.relatedTarget !== this && (this.suppress([e]), i[e].apply(this, [].slice.call(arguments, 1)), this.release([e]))
                }, i))
            })), "string" == typeof e && "_" !== e.charAt(0) && i[e].apply(i, s)
        })
    }, l.fn.owlCarousel.Constructor = h
}(window.Zepto || window.jQuery, window, document),
function(e, i) {
    var s = function(t) {
        this._core = t, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": e.proxy(function(t) {
                t.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = e.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    s.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, s.prototype.watch = function() {
        this._interval || (this._visible = this._core.isVisible(), this._interval = i.setInterval(e.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, s.prototype.refresh = function() {
        this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, s.prototype.destroy = function() {
        var t, e;
        for (t in i.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = s
}(window.Zepto || window.jQuery, window, document),
function(a, o) {
    var e = function(t) {
        this._core = t, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(t) {
                if (t.namespace && this._core.settings && this._core.settings.lazyLoad && (t.property && "position" == t.property.name || "initialized" == t.type)) {
                    var e = this._core.settings,
                        i = e.center && Math.ceil(e.items / 2) || e.items,
                        s = e.center && -1 * i || 0,
                        o = (t.property && void 0 !== t.property.value ? t.property.value : this._core.current()) + s,
                        n = this._core.clones().length,
                        r = a.proxy(function(t, e) {
                            this.load(e)
                        }, this);
                    for (0 < e.lazyLoadEager && (i += e.lazyLoadEager, e.loop && (o -= e.lazyLoadEager, i++)); s++ < i;) this.load(n / 2 + this._core.relative(o)), n && a.each(this._core.clones(this._core.relative(o)), r), o++
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1,
        lazyLoadEager: 0
    }, e.prototype.load = function(t) {
        var e = this._core.$stage.children().eq(t),
            t = e && e.find(".owl-lazy");
        !t || -1 < a.inArray(e.get(0), this._loaded) || (t.each(a.proxy(function(t, e) {
            var i = a(e),
                s = 1 < o.devicePixelRatio && i.attr("data-src-retina") || i.attr("data-src") || i.attr("data-srcset");
            this._core.trigger("load", {
                element: i,
                url: s
            }, "lazy"), i.is("img") ? i.one("load.owl.lazy", a.proxy(function() {
                i.css("opacity", 1), this._core.trigger("loaded", {
                    element: i,
                    url: s
                }, "lazy")
            }, this)).attr("src", s) : i.is("source") ? i.one("load.owl.lazy", a.proxy(function() {
                this._core.trigger("loaded", {
                    element: i,
                    url: s
                }, "lazy")
            }, this)).attr("srcset", s) : ((e = new Image).onload = a.proxy(function() {
                i.css({
                    "background-image": 'url("' + s + '")',
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: i,
                    url: s
                }, "lazy")
            }, this), e.src = s)
        }, this)), this._loaded.push(e.get(0)))
    }, e.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(o, i) {
    var s = function(t) {
        this._core = t, this._previousHeight = null, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": o.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": o.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && "position" === t.property.name && this.update()
            }, this),
            "loaded.owl.lazy": o.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = o.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
        var e = this;
        o(i).on("load", function() {
            e._core.settings.autoHeight && e.update()
        }), o(i).resize(function() {
            e._core.settings.autoHeight && (null != e._intervalId && clearTimeout(e._intervalId), e._intervalId = setTimeout(function() {
                e.update()
            }, 250))
        })
    };
    s.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, s.prototype.update = function() {
        var t = this._core._current,
            e = t + this._core.settings.items,
            i = this._core.settings.lazyLoad,
            t = this._core.$stage.children().toArray().slice(t, e),
            s = [],
            e = 0;
        o.each(t, function(t, e) {
            s.push(o(e).height())
        }), (e = Math.max.apply(null, s)) <= 1 && i && this._previousHeight && (e = this._previousHeight), this._previousHeight = e, this._core.$stage.parent().height(e).addClass(this._core.settings.autoHeightClass)
    }, s.prototype.destroy = function() {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, o.fn.owlCarousel.Constructor.Plugins.AutoHeight = s
}(window.Zepto || window.jQuery, window, document),
function(c, e) {
    var i = function(t) {
        this._core = t, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": c.proxy(function(t) {
                t.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": c.proxy(function(t) {
                t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
            }, this),
            "refreshed.owl.carousel": c.proxy(function(t) {
                t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": c.proxy(function(t) {
                t.namespace && "position" === t.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": c.proxy(function(t) {
                var e;
                !t.namespace || (e = c(t.content).find(".owl-video")).length && (e.css("display", "none"), this.fetch(e, c(t.content)))
            }, this)
        }, this._core.options = c.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", c.proxy(function(t) {
            this.play(t)
        }, this))
    };
    i.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, i.prototype.fetch = function(t, e) {
        var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
            s = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
            o = t.attr("data-width") || this._core.settings.videoWidth,
            n = t.attr("data-height") || this._core.settings.videoHeight,
            r = t.attr("href");
        if (!r) throw new Error("Missing video URL.");
        if (-1 < (s = r.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu")) i = "youtube";
        else if (-1 < s[3].indexOf("vimeo")) i = "vimeo";
        else {
            if (!(-1 < s[3].indexOf("vzaar"))) throw new Error("Video URL not supported.");
            i = "vzaar"
        }
        s = s[6], this._videos[r] = {
            type: i,
            id: s,
            width: o,
            height: n
        }, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
    }, i.prototype.thumbnail = function(e, t) {
        function i(t) {
            s = h.lazyLoad ? c("<div/>", {
                class: "owl-video-tn " + l,
                srcType: t
            }) : c("<div/>", {
                class: "owl-video-tn",
                style: "opacity:1;background-image:url(" + t + ")"
            }), e.after(s), e.after('<div class="owl-video-play-icon"></div>')
        }
        var s, o, n = t.width && t.height ? "width:" + t.width + "px;height:" + t.height + "px;" : "",
            r = e.find("img"),
            a = "src",
            l = "",
            h = this._core.settings;
        if (e.wrap(c("<div/>", {
                class: "owl-video-wrapper",
                style: n
            })), this._core.settings.lazyLoad && (a = "data-src", l = "owl-lazy"), r.length) return i(r.attr(a)), r.remove(), !1;
        "youtube" === t.type ? (o = "//img.youtube.com/vi/" + t.id + "/hqdefault.jpg", i(o)) : "vimeo" === t.type ? c.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + t.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                o = t[0].thumbnail_large, i(o)
            }
        }) : "vzaar" === t.type && c.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + t.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                o = t.framegrab_url, i(o)
            }
        })
    }, i.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, i.prototype.play = function(t) {
        var e = c(t.target).closest("." + this._core.settings.itemClass),
            i = this._videos[e.attr("data-video")],
            s = i.width || "100%",
            o = i.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), (t = c('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')).attr("height", o), t.attr("width", s), "youtube" === i.type ? t.attr("src", "//www.youtube.com/embed/" + i.id + "?autoplay=1&rel=0&v=" + i.id) : "vimeo" === i.type ? t.attr("src", "//player.vimeo.com/video/" + i.id + "?autoplay=1") : "vzaar" === i.type && t.attr("src", "//view.vzaar.com/" + i.id + "/player?autoplay=true"), c(t).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, i.prototype.isInFullScreen = function() {
        var t = e.fullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement;
        return t && c(t).parent().hasClass("owl-video-frame")
    }, i.prototype.destroy = function() {
        var t, e;
        for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, c.fn.owlCarousel.Constructor.Plugins.Video = i
}(window.Zepto || window.jQuery, (window, document)),
function(r) {
    var e = function(t) {
        this.core = t, this.core.options = r.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
            "change.owl.carousel": r.proxy(function(t) {
                t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": r.proxy(function(t) {
                t.namespace && (this.swapping = "translated" == t.type)
            }, this),
            "translate.owl.carousel": r.proxy(function(t) {
                t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function() {
        var t, e, i, s, o, n;
        1 === this.core.settings.items && r.support.animation && r.support.transition && (this.core.speed(0), e = r.proxy(this.clear, this), i = this.core.$stage.children().eq(this.previous), s = this.core.$stage.children().eq(this.next), o = this.core.settings.animateIn, n = this.core.settings.animateOut, this.core.current() !== this.previous && (n && (t = this.core.coordinates(this.previous) - this.core.coordinates(this.next), i.one(r.support.animation.end, e).css({
            left: t + "px"
        }).addClass("animated owl-animated-out").addClass(n)), o && s.one(r.support.animation.end, e).addClass("animated owl-animated-in").addClass(o)))
    }, e.prototype.clear = function(t) {
        r(t.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, e.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, r.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, (window, document)),
function(s, o, e) {
    var i = function(t) {
        this._core = t, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
            "changed.owl.carousel": s.proxy(function(t) {
                t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._paused && (this._time = 0)
            }, this),
            "initialized.owl.carousel": s.proxy(function(t) {
                t.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": s.proxy(function(t, e, i) {
                t.namespace && this.play(e, i)
            }, this),
            "stop.owl.autoplay": s.proxy(function(t) {
                t.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": s.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": s.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.owl.core": s.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.owl.core": s.proxy(function() {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = s.extend({}, i.Defaults, this._core.options)
    };
    i.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, i.prototype._next = function(t) {
        this._call = o.setTimeout(s.proxy(this._next, this, t), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || e.hidden || this._core.next(t || this._core.settings.autoplaySpeed)
    }, i.prototype.read = function() {
        return (new Date).getTime() - this._time
    }, i.prototype.play = function(t, e) {
        var i;
        this._core.is("rotating") || this._core.enter("rotating"), t = t || this._core.settings.autoplayTimeout, i = Math.min(this._time % (this._timeout || t), t), this._paused ? (this._time = this.read(), this._paused = !1) : o.clearTimeout(this._call), this._time += this.read() % t - i, this._timeout = t, this._call = o.setTimeout(s.proxy(this._next, this, e), t - i)
    }, i.prototype.stop = function() {
        this._core.is("rotating") && (this._time = 0, this._paused = !0, o.clearTimeout(this._call), this._core.leave("rotating"))
    }, i.prototype.pause = function() {
        this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, o.clearTimeout(this._call))
    }, i.prototype.destroy = function() {
        var t, e;
        for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, s.fn.owlCarousel.Constructor.Plugins.autoplay = i
}(window.Zepto || window.jQuery, window, document),
function(o) {
    "use strict";
    var e = function(t) {
        this._core = t, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": o.proxy(function(t) {
                t.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + o(t.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": o.proxy(function(t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": o.proxy(function(t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this),
            "changed.owl.carousel": o.proxy(function(t) {
                t.namespace && "position" == t.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": o.proxy(function(t) {
                t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": o.proxy(function(t) {
                t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = o.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
        navSpeed: !1,
        navElement: 'button type="button" role="presentation"',
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function() {
        var t, i = this._core.settings;
        for (t in this._controls.$relative = (i.navContainer ? o(i.navContainer) : o("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = o("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", o.proxy(function(t) {
                this.prev(i.navSpeed)
            }, this)), this._controls.$next = o("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", o.proxy(function(t) {
                this.next(i.navSpeed)
            }, this)), i.dotsData || (this._templates = [o('<button role="button">').addClass(i.dotClass).append(o("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? o(i.dotsContainer) : o("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", o.proxy(function(t) {
                var e = (o(t.target).parent().is(this._controls.$absolute) ? o(t.target) : o(t.target).parent()).index();
                t.preventDefault(), this.to(e, i.dotsSpeed)
            }, this)), this._overrides) this._core[t] = o.proxy(this[t], this)
    }, e.prototype.destroy = function() {
        var t, e, i, s, o = this._core.settings;
        for (t in this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) "$relative" === e && o.navContainer ? this._controls[e].html("") : this._controls[e].remove();
        for (s in this.overides) this._core[s] = this._overrides[s];
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, e.prototype.update = function() {
        var t, e, i = this._core.clones().length / 2,
            s = i + this._core.items().length,
            o = this._core.maximum(!0),
            n = this._core.settings,
            r = n.center || n.autoWidth || n.dotsData ? 1 : n.dotsEach || n.items;
        if ("page" !== n.slideBy && (n.slideBy = Math.min(n.slideBy, n.items)), n.dots || "page" == n.slideBy)
            for (this._pages = [], t = i, e = 0; t < s; t++) {
                if (r <= e || 0 === e) {
                    if (this._pages.push({
                            start: Math.min(o, t - i),
                            end: t - i + r - 1
                        }), Math.min(o, t - i) === o) break;
                    e = 0, 0
                }
                e += this._core.mergers(this._core.relative(t))
            }
    }, e.prototype.draw = function() {
        var t = this._core.settings,
            e = this._core.items().length <= t.items,
            i = this._core.relative(this._core.current()),
            s = t.loop || t.rewind;
        this._controls.$relative.toggleClass("disabled", !t.nav || e), t.nav && (this._controls.$previous.toggleClass("disabled", !s && i <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !s && i >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !t.dots || e), t.dots && (e = this._pages.length - this._controls.$absolute.children().length, t.dotsData && 0 != e ? this._controls.$absolute.html(this._templates.join("")) : 0 < e ? this._controls.$absolute.append(new Array(1 + e).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(o.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function(t) {
        var e = this._core.settings;
        t.page = {
            index: o.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: e && (e.center || e.autoWidth || e.dotsData ? 1 : e.dotsEach || e.items)
        }
    }, e.prototype.current = function() {
        var i = this._core.relative(this._core.current());
        return o.grep(this._pages, o.proxy(function(t, e) {
            return t.start <= i && t.end >= i
        }, this)).pop()
    }, e.prototype.getPosition = function(t) {
        var e, i, s = this._core.settings;
        return "page" == s.slideBy ? (e = o.inArray(this.current(), this._pages), i = this._pages.length, t ? ++e : --e, e = this._pages[(e % i + i) % i].start) : (e = this._core.relative(this._core.current()), i = this._core.items().length, t ? e += s.slideBy : e -= s.slideBy), e
    }, e.prototype.next = function(t) {
        o.proxy(this._overrides.to, this._core)(this.getPosition(!0), t)
    }, e.prototype.prev = function(t) {
        o.proxy(this._overrides.to, this._core)(this.getPosition(!1), t)
    }, e.prototype.to = function(t, e, i) {
        !i && this._pages.length ? (i = this._pages.length, o.proxy(this._overrides.to, this._core)(this._pages[(t % i + i) % i].start, e)) : o.proxy(this._overrides.to, this._core)(t, e)
    }, o.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, (window, document)),
function(s, o) {
    "use strict";
    var e = function(t) {
        this._core = t, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": s.proxy(function(t) {
                t.namespace && "URLHash" === this._core.settings.startPosition && s(o).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": s.proxy(function(t) {
                var e;
                !t.namespace || (e = s(t.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash")) && (this._hashes[e] = t.content)
            }, this),
            "changed.owl.carousel": s.proxy(function(t) {
                var i;
                t.namespace && "position" === t.property.name && (i = this._core.items(this._core.relative(this._core.current())), (t = s.map(this._hashes, function(t, e) {
                    return t === i ? e : null
                }).join()) && o.location.hash.slice(1) !== t && (o.location.hash = t))
            }, this)
        }, this._core.options = s.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), s(o).on("hashchange.owl.navigation", s.proxy(function(t) {
            var e = o.location.hash.substring(1),
                i = this._core.$stage.children(),
                e = this._hashes[e] && i.index(this._hashes[e]);
            void 0 !== e && e !== this._core.current() && this._core.to(this._core.relative(e), !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    }, e.prototype.destroy = function() {
        var t, e;
        for (t in s(o).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, s.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(o, n) {
    function e(t, i) {
        var s = !1,
            e = t.charAt(0).toUpperCase() + t.slice(1);
        return o.each((t + " " + a.join(e + " ") + e).split(" "), function(t, e) {
            if (r[e] !== n) return s = !i || e, !1
        }), s
    }

    function t(t) {
        return e(t, !0)
    }
    var r = o("<support>").get(0).style,
        a = "Webkit Moz O ms".split(" "),
        i = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        s = function() {
            return !!e("transform")
        },
        l = function() {
            return !!e("perspective")
        },
        h = function() {
            return !!e("animation")
        };
    ! function() {
        return !!e("transition")
    }() || (o.support.transition = new String(t("transition")), o.support.transition.end = i.transition.end[o.support.transition]), h() && (o.support.animation = new String(t("animation")), o.support.animation.end = i.animation.end[o.support.animation]), s() && (o.support.transform = new String(t("transform")), o.support.transform3d = l())
}(window.Zepto || window.jQuery, (window, void document)),
function(t) {
    var e, o, i, s = navigator.userAgent;

    function n() {
        for (var t = document.querySelectorAll("picture > img, img[srcset][sizes]"), e = 0; e < t.length; e++) ! function(t) {
            var e, i, s = t.parentNode;
            "PICTURE" === s.nodeName.toUpperCase() ? (e = o.cloneNode(), s.insertBefore(e, s.firstElementChild), setTimeout(function() {
                s.removeChild(e)
            })) : (!t._pfLastSize || t.offsetWidth > t._pfLastSize) && (t._pfLastSize = t.offsetWidth, i = t.sizes, t.sizes += ",100vw", setTimeout(function() {
                t.sizes = i
            }))
        }(t[e])
    }

    function r() {
        clearTimeout(e), e = setTimeout(n, 99)
    }

    function a() {
        r(), i && i.addListener && i.addListener(r)
    }
    t.HTMLPictureElement && /ecko/.test(s) && s.match(/rv\:(\d+)/) && RegExp.$1 < 45 && addEventListener("resize", (o = document.createElement("source"), i = t.matchMedia && matchMedia("(orientation: landscape)"), o.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", /^[c|i]|d$/.test(document.readyState || "") ? a() : document.addEventListener("DOMContentLoaded", a), r))
}(window),
function(t, n, h) {
    "use strict";

    function m(t) {
        return " " === t || "\t" === t || "\n" === t || "\f" === t || "\r" === t
    }

    function w(t, e) {
        return t.res - e.res
    }

    function x(t, e) {
        var i, s, o;
        if (t && e)
            for (o = I.parseSet(e), t = I.makeUrl(t), i = 0; i < o.length; i++)
                if (t === I.makeUrl(o[i].url)) {
                    s = o[i];
                    break
                } return s
    }

    function e(e, c) {
        function t(t) {
            var t = t.exec(e.substring(a));
            return t ? (t = t[0], a += t.length, t) : void 0
        }

        function i() {
            for (var t, e, i, s, o, n, r, a = !1, l = {}, h = 0; h < d.length; h++) s = (r = d[h])[r.length - 1], o = r.substring(0, r.length - 1), n = parseInt(o, 10), r = parseFloat(o), rt.test(o) && "w" === s ? ((t || e) && (a = !0), 0 === n ? a = !0 : t = n) : at.test(o) && "x" === s ? ((t || e || i) && (a = !0), r < 0 ? a = !0 : e = r) : rt.test(o) && "h" === s ? ((i || e) && (a = !0), 0 === n ? a = !0 : i = n) : a = !0;
            a || (l.url = u, t && (l.w = t), e && (l.d = e), i && (l.h = i), i || e || t || (l.d = 1), 1 === l.d && (c.has1x = !0), l.set = c, p.push(l))
        }
        for (var u, d, s, o, n, r = e.length, a = 0, p = [];;) {
            if (t(st), r <= a) return p;
            u = t(ot), d = [], "," === u.slice(-1) ? (u = u.replace(nt, ""), i()) : function() {
                for (t(it), s = "", o = "in descriptor";;) {
                    if (n = e.charAt(a), "in descriptor" === o)
                        if (m(n)) s && (d.push(s), s = "", o = "after descriptor");
                        else {
                            if ("," === n) return a += 1, s && d.push(s), i();
                            if ("(" === n) s += n, o = "in parens";
                            else {
                                if ("" === n) return s && d.push(s), i();
                                s += n
                            }
                        }
                    else if ("in parens" === o)
                        if (")" === n) s += n, o = "in descriptor";
                        else {
                            if ("" === n) return d.push(s), i();
                            s += n
                        }
                    else if ("after descriptor" === o && !m(n)) {
                        if ("" === n) return i();
                        o = "in descriptor", --a
                    }
                    a += 1
                }
            }()
        }
    }

    function i(t) {
        for (var e, i, s, o = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i, n = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i, r = function(t) {
                function e() {
                    o && (n.push(o), o = "")
                }

                function i() {
                    n[0] && (r.push(n), n = [])
                }
                for (var s, o = "", n = [], r = [], a = 0, l = 0, h = !1;;) {
                    if ("" === (s = t.charAt(l))) return e(), i(), r;
                    if (h) "*" !== s || "/" !== t[l + 1] ? l += 1 : (h = !1, l += 2, e());
                    else {
                        if (m(s)) {
                            if (t.charAt(l - 1) && m(t.charAt(l - 1)) || !o) {
                                l += 1;
                                continue
                            }
                            if (0 === a) {
                                e(), l += 1;
                                continue
                            }
                            s = " "
                        } else if ("(" === s) a += 1;
                        else if (")" === s) --a;
                        else {
                            if ("," === s) {
                                e(), i(), l += 1;
                                continue
                            }
                            if ("/" === s && "*" === t.charAt(l + 1)) {
                                h = !0, l += 2;
                                continue
                            }
                        }
                        o += s, l += 1
                    }
                }
            }(t), a = r.length, l = 0; l < a; l++)
            if (i = (e = r[l])[e.length - 1], s = i, o.test(s) && 0 <= parseFloat(s) || (n.test(s) || ("0" === s || "-0" === s || "+0" === s))) {
                if (i = i, e.pop(), 0 === e.length) return i;
                if (e = e.join(" "), I.matchesMedia(e)) return i
            } return "100vw"
    }
    n.createElement("picture");

    function s() {}

    function o(t, e, i, s) {
        t.addEventListener ? t.addEventListener(e, i, s || !1) : t.attachEvent && t.attachEvent("on" + e, i)
    }

    function $(t, e) {
        return t.w ? (t.cWidth = I.calcListLength(e || "100vw"), t.res = t.w / t.cWidth) : t.res = t.d, t
    }
    var r, c, a, l, u, d, p, g, f, y, v, b, T, _, S, C, k, A, E, M, I = {},
        O = !1,
        P = n.createElement("img"),
        z = P.getAttribute,
        j = P.setAttribute,
        L = P.removeAttribute,
        D = n.documentElement,
        q = {},
        N = {
            algorithm: ""
        },
        H = "data-pfsrc",
        F = H + "set",
        W = navigator.userAgent,
        R = /rident/.test(W) || /ecko/.test(W) && W.match(/rv\:(\d+)/) && 35 < RegExp.$1,
        B = "currentSrc",
        V = /\s+\+?\d+(e\d+)?w/,
        U = /(\([^)]+\))?\s*(.+)/,
        Y = t.picturefillCFG,
        Q = "font-size:100%!important;",
        G = !0,
        X = {},
        K = {},
        Z = t.devicePixelRatio,
        J = {
            px: 1,
            in: 96
        },
        tt = n.createElement("a"),
        et = !1,
        it = /^[ \t\n\r\u000c]+/,
        st = /^[, \t\n\r\u000c]+/,
        ot = /^[^ \t\n\r\u000c]+/,
        nt = /[,]+$/,
        rt = /^\d+$/,
        at = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
        W = function(e) {
            var i = {};
            return function(t) {
                return t in i || (i[t] = e(t)), i[t]
            }
        },
        lt = (l = /^([\d\.]+)(em|vw|px)$/, u = W(function(t) {
            return "return " + function() {
                for (var t = arguments, e = 0, i = t[0]; ++e in t;) i = i.replace(t[e], t[++e]);
                return i
            }((t || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"
        }), function(t, e) {
            var i;
            if (!(t in X))
                if (X[t] = !1, e && (i = t.match(l))) X[t] = i[1] * J[i[2]];
                else try {
                    X[t] = new Function("e", u(t))(J)
                } catch (t) {}
            return X[t]
        }),
        ht = function(t) {
            if (O) {
                var e, i, s, o = t || {};
                if (o.elements && 1 === o.elements.nodeType && ("IMG" === o.elements.nodeName.toUpperCase() ? o.elements = [o.elements] : (o.context = o.elements, o.elements = null)), s = (e = o.elements || I.qsa(o.context || n, o.reevaluate || o.reselect ? I.sel : I.selShort)).length) {
                    for (I.setupRun(o), et = !0, i = 0; i < s; i++) I.fillImg(e[i], o);
                    I.teardownRun(o)
                }
            }
        };

    function ct() {
        2 === C.width && (I.supSizes = !0), c = I.supSrcset && !I.supSizes, O = !0, setTimeout(ht)
    }
    t.console && console.warn, B in P || (B = "src"), q["image/jpeg"] = !0, q["image/gif"] = !0, q["image/png"] = !0, q["image/svg+xml"] = n.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), I.ns = ("pf" + (new Date).getTime()).substr(0, 9), I.supSrcset = "srcset" in P, I.supSizes = "sizes" in P, I.supPicture = !!t.HTMLPictureElement, I.supSrcset && I.supPicture && !I.supSizes && (k = n.createElement("img"), P.srcset = "data:,a", k.src = "data:,a", I.supSrcset = P.complete === k.complete, I.supPicture = I.supSrcset && I.supPicture), I.supSrcset && !I.supSizes ? (k = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", (C = n.createElement("img")).onload = ct, C.onerror = ct, C.setAttribute("sizes", "9px"), C.srcset = k + " 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 9w", C.src = k) : O = !0, I.selShort = "picture>img,img[srcset]", I.sel = I.selShort, I.cfg = N, I.DPR = Z || 1, I.u = J, I.types = q, I.setSize = s, I.makeUrl = W(function(t) {
        return tt.href = t, tt.href
    }), I.qsa = function(t, e) {
        return "querySelector" in t ? t.querySelectorAll(e) : []
    }, I.matchesMedia = function() {
        return t.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? I.matchesMedia = function(t) {
            return !t || matchMedia(t).matches
        } : I.matchesMedia = I.mMQ, I.matchesMedia.apply(this, arguments)
    }, I.mMQ = function(t) {
        return !t || lt(t)
    }, I.calcLength = function(t) {
        t = lt(t, !0) || !1;
        return t = t < 0 ? !1 : t
    }, I.supportsType = function(t) {
        return !t || q[t]
    }, I.parseSize = W(function(t) {
        t = (t || "").match(U);
        return {
            media: t && t[1],
            length: t && t[2]
        }
    }), I.parseSet = function(t) {
        return t.cands || (t.cands = e(t.srcset, t)), t.cands
    }, I.getEmValue = function() {
        var t, e, i, s;
        return !r && (t = n.body) && (e = n.createElement("div"), i = D.style.cssText, s = t.style.cssText, e.style.cssText = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)", D.style.cssText = Q, t.style.cssText = Q, t.appendChild(e), r = e.offsetWidth, t.removeChild(e), r = parseFloat(r, 10), D.style.cssText = i, t.style.cssText = s), r || 16
    }, I.calcListLength = function(t) {
        var e;
        return t in K && !N.uT || (e = I.calcLength(i(t)), K[t] = e || J.width), K[t]
    }, I.setRes = function(t) {
        if (t)
            for (var e, i = 0, s = (e = I.parseSet(t)).length; i < s; i++) $(e[i], t.sizes);
        return e
    }, I.setRes.res = $, I.applySetCandidate = function(t, e) {
        if (t.length) {
            var i, s, o, n, r, a, l = e[I.ns],
                h = I.DPR,
                c = l.curSrc || e[B],
                u = l.curCan || (v = e, b = c, u = t[0].set, (u = x(b, u = !u && b ? (u = v[I.ns].sets) && u[u.length - 1] : u)) && (b = I.makeUrl(b), v[I.ns].curSrc = b, (v[I.ns].curCan = u).res || $(u, u.set.sizes)), u);
            if (u && u.set === t[0].set && ((a = R && !e.complete && u.res - .1 > h) || (u.cached = !0, u.res >= h && (r = u))), !r)
                for (t.sort(w), r = t[(n = t.length) - 1], s = 0; s < n; s++)
                    if ((i = t[s]).res >= h) {
                        r = t[o = s - 1] && (a || c !== I.makeUrl(i.url)) && (d = t[o].res, p = i.res, m = h, g = t[o].cached, y = f = void 0, d = "saveData" === N.algorithm ? 2.7 < d ? m + 1 : (y = (p - m) * (f = Math.pow(d - .6, 1.5)), g && (y += .1 * f), d + y) : 1 < m ? Math.sqrt(d * p) : d, m < d) ? t[o] : i;
                        break
                    } r && (u = I.makeUrl(r.url), l.curSrc = u, l.curCan = r, u !== c && I.setSrc(e, r), I.setSize(e))
        }
        var d, p, m, g, f, y, v, b
    }, I.setSrc = function(t, e) {
        t.src = e.url, "image/svg+xml" === e.set.type && (e = t.style.width, t.style.width = t.offsetWidth + 1 + "px", t.offsetWidth + 1 && (t.style.width = e))
    }, I.getSet = function(t) {
        for (var e, i, s = !1, o = t[I.ns].sets, n = 0; n < o.length && !s; n++)
            if ((e = o[n]).srcset && I.matchesMedia(e.media) && (i = I.supportsType(e.type))) {
                s = e = "pending" === i ? i : e;
                break
            } return s
    }, I.parseSets = function(t, e, i) {
        var s, o, n, r, a = e && "PICTURE" === e.nodeName.toUpperCase(),
            l = t[I.ns];
        l.src !== h && !i.src || (l.src = z.call(t, "src"), l.src ? j.call(t, H, l.src) : L.call(t, H)), l.srcset !== h && !i.srcset && I.supSrcset && !t.srcset || (s = z.call(t, "srcset"), l.srcset = s, r = !0), l.sets = [], a && (l.pic = !0, function(t, e) {
            for (var i, s, o = t.getElementsByTagName("source"), n = 0, r = o.length; n < r; n++)(i = o[n])[I.ns] = !0, (s = i.getAttribute("srcset")) && e.push({
                srcset: s,
                media: i.getAttribute("media"),
                type: i.getAttribute("type"),
                sizes: i.getAttribute("sizes")
            })
        }(e, l.sets)), l.srcset ? (o = {
            srcset: l.srcset,
            sizes: z.call(t, "sizes")
        }, l.sets.push(o), (n = (c || l.src) && V.test(l.srcset || "")) || !l.src || x(l.src, o) || o.has1x || (o.srcset += ", " + l.src, o.cands.push({
            url: l.src,
            d: 1,
            set: o
        }))) : l.src && l.sets.push({
            srcset: l.src,
            sizes: null
        }), l.curCan = null, l.curSrc = h, l.supported = !(a || o && !I.supSrcset || n && !I.supSizes), r && I.supSrcset && !l.supported && (s ? (j.call(t, F, s), t.srcset = "") : L.call(t, F)), l.supported && !l.srcset && (!l.src && t.src || t.src !== I.makeUrl(l.src)) && (null === l.src ? t.removeAttribute("src") : t.src = l.src), l.parsed = !0
    }, I.fillImg = function(t, e) {
        var i, s = e.reselect || e.reevaluate;
        t[I.ns] || (t[I.ns] = {}), i = t[I.ns], !s && i.evaled === a || (i.parsed && !e.reevaluate || I.parseSets(t, t.parentNode, e), i.supported ? i.evaled = a : (e = t, i = I.getSet(e), t = !1, "pending" !== i && (t = a, i && (i = I.setRes(i), I.applySetCandidate(i, e))), e[I.ns].evaled = t))
    }, I.setupRun = function() {
        et && !G && Z === t.devicePixelRatio || (G = !1, Z = t.devicePixelRatio, X = {}, K = {}, I.DPR = Z || 1, J.width = Math.max(t.innerWidth || 0, D.clientWidth), J.height = Math.max(t.innerHeight || 0, D.clientHeight), J.vw = J.width / 100, J.vh = J.height / 100, a = [J.height, J.width, Z].join("-"), J.em = I.getEmValue(), J.rem = J.em)
    }, I.supPicture ? (ht = s, I.fillImg = s) : (b = t.attachEvent ? /d$|^c/ : /d$|^c|^i/, T = function() {
        var t = n.readyState || "";
        _ = setTimeout(T, "loading" === t ? 200 : 999), n.body && (I.fillImgs(), (d = d || b.test(t)) && clearTimeout(_))
    }, _ = setTimeout(T, n.body ? 9 : 99), S = D.clientHeight, o(t, "resize", (p = function() {
        G = Math.max(t.innerWidth || 0, D.clientWidth) !== J.width || D.clientHeight !== S, S = D.clientHeight, G && I.fillImgs()
    }, g = 99, v = function() {
        var t = new Date - y;
        t < g ? f = setTimeout(v, g - t) : (f = null, p())
    }, function() {
        y = new Date, f = f || setTimeout(v, g)
    })), o(n, "readystatechange", T)), I.picturefill = ht, I.fillImgs = ht, I.teardownRun = s, ht._ = I, t.picturefillCFG = {
        pf: I,
        push: function(t) {
            var e = t.shift();
            "function" == typeof I[e] ? I[e].apply(I, t) : (N[e] = t[0], et && I.fillImgs({
                reselect: !0
            }))
        }
    };
    for (; Y && Y.length;) t.picturefillCFG.push(Y.shift());
    t.picturefill = ht, "object" == typeof module && "object" == typeof module.exports ? module.exports = ht : "function" == typeof define && define.amd && define("picturefill", function() {
        return ht
    }), I.supPicture || (q["image/webp"] = (A = "image/webp", E = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==", (M = new t.Image).onerror = function() {
        q[A] = !1, ht()
    }, M.onload = function() {
        q[A] = 1 === M.width, ht()
    }, M.src = E, "pending"))
}(window, document), "object" == typeof navigator && function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("Plyr", e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Plyr = e()
    }(this, function() {
        "use strict";

        function n(t, e, i) {
            return e in t ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = i, t
        }

        function t(t, e) {
            for (var i = 0; i < e.length; i++) {
                var s = e[i];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s)
            }
        }

        function e(e, t) {
            var i, s = Object.keys(e);
            return Object.getOwnPropertySymbols && (i = Object.getOwnPropertySymbols(e), t && (i = i.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), s.push.apply(s, i)), s
        }

        function o(s) {
            for (var t = 1; t < arguments.length; t++) {
                var o = null != arguments[t] ? arguments[t] : {};
                t % 2 ? e(Object(o), !0).forEach(function(t) {
                    var e, i;
                    e = s, t = o[i = t], i in e ? Object.defineProperty(e, i, {
                        value: t,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[i] = t
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(o)) : e(Object(o)).forEach(function(t) {
                    Object.defineProperty(s, t, Object.getOwnPropertyDescriptor(o, t))
                })
            }
            return s
        }
        var r = {
            addCSS: !0,
            thumbWidth: 15,
            watch: !0
        };

        function i(t) {
            return null != t ? t.constructor : null
        }

        function s(t, e) {
            return !!(t && e && t instanceof e)
        }

        function a(t) {
            return i(t) === String
        }

        function l(t) {
            return Array.isArray(t)
        }

        function h(t) {
            return s(t, NodeList)
        }

        function c(t) {
            return s(t, Event)
        }
        var u = a,
            d = l,
            p = h,
            m = function(t) {
                return s(t, Element)
            },
            g = function(t) {
                return null == t || (a(t) || l(t) || h(t)) && !t.length || i(t) === Object && !Object.keys(t).length
            };
        var f, y, v = (y = [{
            key: "init",
            value: function() {
                b.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this)
            }
        }, {
            key: "destroy",
            value: function() {
                b.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null)
            }
        }, {
            key: "listeners",
            value: function(t) {
                var e = this,
                    i = t ? "addEventListener" : "removeEventListener";
                ["touchstart", "touchmove", "touchend"].forEach(function(t) {
                    e.element[i](t, function(t) {
                        return e.set(t)
                    }, !1)
                })
            }
        }, {
            key: "get",
            value: function(t) {
                if (!b.enabled || !c(t)) return null;
                var e = t.target,
                    i = t.changedTouches[0],
                    s = parseFloat(e.getAttribute("min")) || 0,
                    o = parseFloat(e.getAttribute("max")) || 100,
                    n = parseFloat(e.getAttribute("step")) || 1,
                    t = e.getBoundingClientRect(),
                    e = 100 / t.width * (this.config.thumbWidth / 2) / 100;
                return (t = 100 / t.width * (i.clientX - t.left)) < 0 ? t = 0 : 100 < t && (t = 100), t < 50 ? t -= (100 - 2 * t) * e : 50 < t && (t += 2 * (t - 50) * e), s + function(t, e) {
                    if (e < 1) {
                        i = (i = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)) ? Math.max(0, (i[1] ? i[1].length : 0) - (i[2] ? +i[2] : 0)) : 0;
                        return parseFloat(t.toFixed(i))
                    }
                    var i;
                    return Math.round(t / e) * e
                }(t / 100 * (o - s), n)
            }
        }, {
            key: "set",
            value: function(t) {
                var e;
                b.enabled && c(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), e = t.target, t = "touchend" === t.type ? "change" : "input", e && t && (t = new Event(t, {
                    bubbles: !0
                }), e.dispatchEvent(t)))
            }
        }], Zt = [{
            key: "setup",
            value: function(i) {
                var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                    t = null;
                if (g(i) || u(i) ? t = Array.from(document.querySelectorAll(u(i) ? i : 'input[type="range"]')) : m(i) ? t = [i] : p(i) ? t = Array.from(i) : d(i) && (t = i.filter(m)), g(t)) return null;
                var s = o({}, r, {}, e);
                return u(i) && s.watch && new MutationObserver(function(t) {
                    Array.from(t).forEach(function(t) {
                        Array.from(t.addedNodes).forEach(function(t) {
                            var e;
                            m(t) && function() {
                                return Array.from(document.querySelectorAll(e)).includes(this)
                            }.call(t, e = i) && new b(t, s)
                        })
                    })
                }).observe(document.body, {
                    childList: !0,
                    subtree: !0
                }), t.map(function(t) {
                    return new b(t, e)
                })
            }
        }, {
            key: "enabled",
            get: function() {
                return "ontouchstart" in document.documentElement
            }
        }], t((f = b).prototype, y), t(f, Zt), b);

        function b(t, e) {
            (function(t) {
                if (!(t instanceof b)) throw new TypeError("Cannot call a class as a function")
            })(this), m(t) ? this.element = t : u(t) && (this.element = document.querySelector(t)), m(this.element) && g(this.element.rangeTouch) && (this.config = o({}, r, {}, e), this.init())
        }
        const w = t => null != t ? t.constructor : null,
            x = (t, e) => Boolean(t && e && t instanceof e),
            $ = t => null == t,
            T = t => w(t) === Object,
            _ = t => w(t) === String,
            S = t => w(t) === Function,
            C = t => Array.isArray(t),
            k = t => x(t, NodeList),
            A = t => $(t) || (_(t) || C(t) || k(t)) && !t.length || T(t) && !Object.keys(t).length;
        var E = $,
            M = T,
            I = t => w(t) === Number && !Number.isNaN(t),
            O = _,
            P = t => w(t) === Boolean,
            z = S,
            j = C,
            L = k,
            D = t => null !== t && "object" == typeof t && 1 === t.nodeType && "object" == typeof t.style && "object" == typeof t.ownerDocument,
            q = t => x(t, Event),
            N = t => x(t, KeyboardEvent),
            H = t => x(t, TextTrack) || !$(t) && _(t.kind),
            F = t => {
                if (x(t, window.URL)) return !0;
                if (!_(t)) return !1;
                let e = t;
                t.startsWith("http://") && t.startsWith("https://") || (e = `http://${t}`);
                try {
                    return !A(new URL(e).hostname)
                } catch (t) {
                    return !1
                }
            },
            W = A;
        const R = (() => {
            const e = document.createElement("span"),
                t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                },
                i = Object.keys(t).find(t => void 0 !== e.style[t]);
            return !!O(i) && t[i]
        })();

        function B(t, e) {
            setTimeout(() => {
                try {
                    t.hidden = !0, t.offsetHeight, t.hidden = !1
                } catch (t) {}
            }, e)
        }
        const V = {
            isIE: Boolean(window.document.documentMode),
            isEdge: window.navigator.userAgent.includes("Edge"),
            isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
            isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
            isIos: "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints || /(iPad|iPhone|iPod)/gi.test(navigator.platform)
        };

        function U(t, e) {
            return e.split(".").reduce((t, e) => t && t[e], t)
        }

        function Y(e = {}, ...t) {
            if (!t.length) return e;
            const i = t.shift();
            return M(i) ? (Object.keys(i).forEach(t => {
                M(i[t]) ? (Object.keys(e).includes(t) || Object.assign(e, {
                    [t]: {}
                }), Y(e[t], i[t])) : Object.assign(e, {
                    [t]: i[t]
                })
            }), Y(e, ...t)) : e
        }

        function Q(t, n) {
            t = t.length ? t : [t];
            Array.from(t).reverse().forEach((t, e) => {
                const i = 0 < e ? n.cloneNode(!0) : n,
                    s = t.parentNode,
                    o = t.nextSibling;
                i.appendChild(t), o ? s.insertBefore(i, o) : s.appendChild(i)
            })
        }

        function G(i, t) {
            D(i) && !W(t) && Object.entries(t).filter(([, t]) => !E(t)).forEach(([t, e]) => i.setAttribute(t, e))
        }

        function X(t, e, i) {
            const s = document.createElement(t);
            return M(e) && G(s, e), O(i) && (s.innerText = i), s
        }

        function K(t, e, i, s) {
            D(e) && e.appendChild(X(t, i, s))
        }

        function Z(t) {
            L(t) || j(t) ? Array.from(t).forEach(Z) : D(t) && D(t.parentNode) && t.parentNode.removeChild(t)
        }

        function J(e) {
            if (D(e)) {
                let {
                    length: t
                } = e.childNodes;
                for (; 0 < t;) e.removeChild(e.lastChild), --t
            }
        }

        function tt(t, e) {
            return D(e) && D(e.parentNode) && D(t) ? (e.parentNode.replaceChild(t, e), t) : null
        }

        function et(t, e) {
            if (!O(t) || W(t)) return {};
            const r = {},
                a = Y({}, e);
            return t.split(",").forEach(t => {
                const e = t.trim(),
                    i = e.replace(".", ""),
                    s = e.replace(/[[\]]/g, "").split("="),
                    [o] = s,
                    n = 1 < s.length ? s[1].replace(/["']/g, "") : "";
                switch (e.charAt(0)) {
                    case ".":
                        O(a.class) ? r.class = `${a.class} ${i}` : r.class = i;
                        break;
                    case "#":
                        r.id = e.replace("#", "");
                        break;
                    case "[":
                        r[o] = n
                }
            }), Y(a, r)
        }

        function it(e, i) {
            if (D(e)) {
                let t = i;
                P(t) || (t = !e.hidden), e.hidden = t
            }
        }

        function st(e, i, s) {
            if (L(e)) return Array.from(e).map(t => st(t, i, s));
            if (D(e)) {
                let t = void 0 !== s ? s ? "add" : "remove" : "toggle";
                return e.classList[t](i), e.classList.contains(i)
            }
            return !1
        }

        function ot(t, e) {
            return D(t) && t.classList.contains(e)
        }

        function nt(t, e) {
            const {
                prototype: i
            } = Element;
            return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function() {
                return Array.from(document.querySelectorAll(e)).includes(this)
            }).call(t, e)
        }

        function rt(t) {
            return this.elements.container.querySelectorAll(t)
        }

        function at(t) {
            return this.elements.container.querySelector(t)
        }

        function lt(t = null, e = !1) {
            D(t) && (t.focus({
                preventScroll: !0
            }), e && st(t, this.config.classNames.tabFocus))
        }
        const ht = {
                "audio/ogg": "vorbis",
                "audio/wav": "1",
                "video/webm": "vp8, vorbis",
                "video/mp4": "avc1.42E01E, mp4a.40.2",
                "video/ogg": "theora"
            },
            ct = {
                audio: "canPlayType" in document.createElement("audio"),
                video: "canPlayType" in document.createElement("video"),
                check(t, e, i) {
                    i = V.isIPhone && i && ct.playsinline, e = ct[t] || "html5" !== e;
                    return {
                        api: e,
                        ui: e && ct.rangeInput && ("video" !== t || !V.isIPhone || i)
                    }
                },
                pip: !(V.isIPhone || !z(X("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || X("video").disablePictureInPicture)),
                airplay: z(window.WebKitPlaybackTargetAvailabilityEvent),
                playsinline: "playsInline" in document.createElement("video"),
                mime(t) {
                    if (W(t)) return !1;
                    var [e] = t.split("/");
                    let i = t;
                    if (!this.isHTML5 || e !== this.type) return !1;
                    Object.keys(ht).includes(i) && (i += `; codecs="${ht[t]}"`);
                    try {
                        return Boolean(i && this.media.canPlayType(i).replace(/no/, ""))
                    } catch (t) {
                        return !1
                    }
                },
                textTracks: "textTracks" in document.createElement("video"),
                rangeInput: (() => {
                    const t = document.createElement("input");
                    return (t.type = "range") === t.type
                })(),
                touch: "ontouchstart" in document.documentElement,
                transitions: !1 !== R,
                reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
            },
            ut = (() => {
                let t = !1;
                try {
                    var e = Object.defineProperty({}, "passive", {
                        get: () => (t = !0, null)
                    });
                    window.addEventListener("test", null, e), window.removeEventListener("test", null, e)
                } catch (t) {}
                return t
            })();

        function dt(i, t, s, o = !1, n = !0, r = !1) {
            if (i && "addEventListener" in i && !W(t) && z(s)) {
                const a = t.split(" ");
                let e = r;
                ut && (e = {
                    passive: n,
                    capture: r
                }), a.forEach(t => {
                    this && this.eventListeners && o && this.eventListeners.push({
                        element: i,
                        type: t,
                        callback: s,
                        options: e
                    }), i[o ? "addEventListener" : "removeEventListener"](t, s, e)
                })
            }
        }

        function pt(t, e = "", i, s = !0, o = !1) {
            dt.call(this, t, e, i, !0, s, o)
        }

        function mt(t, e = "", i, s = !0, o = !1) {
            dt.call(this, t, e, i, !1, s, o)
        }

        function gt(e, i = "", s, o = !0, n = !1) {
            const r = (...t) => {
                mt(e, i, r, o, n), s.apply(this, t)
            };
            dt.call(this, e, i, r, !0, o, n)
        }

        function ft(t, e = "", i = !1, s = {}) {
            D(t) && !W(e) && (s = new CustomEvent(e, {
                bubbles: i,
                detail: {
                    ...s,
                    plyr: this
                }
            }), t.dispatchEvent(s))
        }

        function yt(t) {
            var e;
            e = t, x(e, Promise) && S(e.then) && t.then(null, () => {})
        }

        function vt(i) {
            return j(i) ? i.filter((t, e) => i.indexOf(t) === e) : i
        }

        function bt(t, i) {
            return j(t) && t.length ? t.reduce((t, e) => Math.abs(e - i) < Math.abs(t - i) ? e : t) : null
        }

        function wt(t) {
            return !(!window || !window.CSS) && window.CSS.supports(t)
        }
        const xt = [
            [1, 1],
            [4, 3],
            [3, 4],
            [5, 4],
            [4, 5],
            [3, 2],
            [2, 3],
            [16, 10],
            [10, 16],
            [16, 9],
            [9, 16],
            [21, 9],
            [9, 21],
            [32, 9],
            [9, 32]
        ].reduce((t, [e, i]) => ({
            ...t,
            [e / i]: [e, i]
        }), {});

        function $t(t) {
            return (j(t) || O(t) && t.includes(":")) && (j(t) ? t : t.split(":")).map(Number).every(I)
        }

        function Tt(t) {
            if (!j(t) || !t.every(I)) return null;
            const [e, i] = t, s = (t, e) => 0 === e ? t : s(e, t % e), o = s(e, i);
            return [e / o, i / o]
        }

        function _t(t) {
            const e = t => $t(t) ? t.split(":").map(Number) : null;
            let i = e(t);
            if (null === i && (i = e(this.config.ratio)), null === i && !W(this.embed) && j(this.embed.ratio) && ({
                    ratio: i
                } = this.embed), null === i && this.isHTML5) {
                const {
                    videoWidth: t,
                    videoHeight: e
                } = this.media;
                i = [t, e]
            }
            return Tt(i)
        }

        function St(t) {
            if (!this.isVideo) return {};
            const {
                wrapper: e
            } = this.elements, i = _t.call(this, t);
            if (!j(i)) return {};
            var [s, o] = Tt(i), t = 100 / s * o;
            if (wt(`aspect-ratio: ${s}/${o}`) ? e.style.aspectRatio = `${s}/${o}` : e.style.paddingBottom = `${t}%`, this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
                const n = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
                    i = (n - t) / (n / 50);
                this.fullscreen.active ? e.style.paddingBottom = null : this.media.style.transform = `translateY(-${i}%)`
            } else this.isHTML5 && e.classList.add(this.config.classNames.videoFixedRatio);
            return {
                padding: t,
                ratio: i
            }
        }

        function Ct(t, e, i = .05) {
            var s = t / e,
                o = bt(Object.keys(xt), s);
            return Math.abs(o - s) <= i ? xt[o] : [t, e]
        }
        const kt = {
            getSources() {
                return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter(t => {
                    t = t.getAttribute("type");
                    return !!W(t) || ct.mime.call(this, t)
                }) : []
            },
            getQualityOptions() {
                return this.config.quality.forced ? this.config.quality.options : kt.getSources.call(this).map(t => Number(t.getAttribute("size"))).filter(Boolean)
            },
            setup() {
                if (this.isHTML5) {
                    const a = this;
                    a.options.speed = a.config.speed.options, W(this.config.ratio) || St.call(a), Object.defineProperty(a.media, "quality", {
                        get() {
                            const t = kt.getSources.call(a).find(t => t.getAttribute("src") === a.source);
                            return t && Number(t.getAttribute("size"))
                        },
                        set(e) {
                            if (a.quality !== e) {
                                if (a.config.quality.forced && z(a.config.quality.onChange)) a.config.quality.onChange(e);
                                else {
                                    const t = kt.getSources.call(a).find(t => Number(t.getAttribute("size")) === e);
                                    if (!t) return;
                                    const {
                                        currentTime: i,
                                        paused: s,
                                        preload: o,
                                        readyState: n,
                                        playbackRate: r
                                    } = a.media;
                                    a.media.src = t.getAttribute("src"), "none" === o && !n || (a.once("loadedmetadata", () => {
                                        a.speed = r, a.currentTime = i, s || yt(a.play())
                                    }), a.media.load())
                                }
                                ft.call(a, a.media, "qualitychange", !1, {
                                    quality: e
                                })
                            }
                        }
                    })
                }
            },
            cancelRequests() {
                this.isHTML5 && (Z(kt.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"))
            }
        };

        function At(t, ...i) {
            return W(t) ? t : t.toString().replace(/{(\d+)}/g, (t, e) => i[e].toString())
        }
        const Et = (t = "", e = "", i = "") => t.replace(new RegExp(e.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString()),
            Mt = (t = "") => t.toString().replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());

        function It(t) {
            const e = document.createElement("div");
            return e.appendChild(t), e.innerHTML
        }
        const Ot = {
                pip: "PIP",
                airplay: "AirPlay",
                html5: "HTML5",
                vimeo: "Vimeo",
                youtube: "YouTube"
            },
            Pt = {
                get(t = "", e = {}) {
                    if (W(t) || W(e)) return "";
                    let i = U(e.i18n, t);
                    if (W(i)) return Object.keys(Ot).includes(t) ? Ot[t] : "";
                    e = {
                        "{seektime}": e.seekTime,
                        "{title}": e.title
                    };
                    return Object.entries(e).forEach(([t, e]) => {
                        i = Et(i, t, e)
                    }), i
                }
            };
        class zt {
            constructor(t) {
                n(this, "get", t => {
                    if (!zt.supported || !this.enabled) return null;
                    var e = window.localStorage.getItem(this.key);
                    if (W(e)) return null;
                    e = JSON.parse(e);
                    return O(t) && t.length ? e[t] : e
                }), n(this, "set", e => {
                    if (zt.supported && this.enabled && M(e)) {
                        let t = this.get();
                        W(t) && (t = {}), Y(t, e), window.localStorage.setItem(this.key, JSON.stringify(t))
                    }
                }), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key
            }
            static get supported() {
                try {
                    if (!("localStorage" in window)) return !1;
                    var t = "___test";
                    return window.localStorage.setItem(t, t), window.localStorage.removeItem(t), !0
                } catch (t) {
                    return !1
                }
            }
        }

        function jt(t, s = "text") {
            return new Promise((e, i) => {
                try {
                    const i = new XMLHttpRequest;
                    if (!("withCredentials" in i)) return;
                    i.addEventListener("load", () => {
                        if ("text" === s) try {
                            e(JSON.parse(i.responseText))
                        } catch (t) {
                            e(i.responseText)
                        } else e(i.response)
                    }), i.addEventListener("error", () => {
                        throw new Error(i.status)
                    }), i.open("GET", t, !0), i.responseType = s, i.send()
                } catch (t) {
                    i(t)
                }
            })
        }

        function Lt(t, e) {
            if (O(t)) {
                const i = O(e);
                const s = () => null !== document.getElementById(e),
                    o = (t, e) => {
                        t.innerHTML = e, i && s() || document.body.insertAdjacentElement("afterbegin", t)
                    };
                if (!i || !s()) {
                    const s = zt.supported,
                        n = document.createElement("div");
                    if (n.setAttribute("hidden", ""), i && n.setAttribute("id", e), s) {
                        const t = window.localStorage.getItem(`cache-${e}`);
                        if (null !== t) {
                            const e = JSON.parse(t);
                            o(n, e.content)
                        }
                    }
                    jt(t).then(t => {
                        W(t) || (s && window.localStorage.setItem(`cache-${e}`, JSON.stringify({
                            content: t
                        })), o(n, t))
                    }).catch(() => {})
                }
            }
        }
        const Dt = t => Math.trunc(t / 60 / 60 % 60, 10);

        function qt(t = 0, e = !1, i = !1) {
            if (!I(t)) return qt(void 0, e, i);
            var s = t => `0${t}`.slice(-2);
            let o = Dt(t);
            var n = Math.trunc(t / 60 % 60, 10),
                r = Math.trunc(t % 60, 10);
            return o = e || 0 < o ? `${o}:` : "", `${i&&0<t?"-":""}${o}${s(n)}:${s(r)}`
        }
        const Nt = {
            getIconUrl() {
                var t = new URL(this.config.iconUrl, window.location).host !== window.location.host || V.isIE && !window.svg4everybody;
                return {
                    url: this.config.iconUrl,
                    cors: t
                }
            },
            findElements() {
                try {
                    return this.elements.controls = at.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
                        play: rt.call(this, this.config.selectors.buttons.play),
                        pause: at.call(this, this.config.selectors.buttons.pause),
                        restart: at.call(this, this.config.selectors.buttons.restart),
                        rewind: at.call(this, this.config.selectors.buttons.rewind),
                        fastForward: at.call(this, this.config.selectors.buttons.fastForward),
                        mute: at.call(this, this.config.selectors.buttons.mute),
                        pip: at.call(this, this.config.selectors.buttons.pip),
                        airplay: at.call(this, this.config.selectors.buttons.airplay),
                        settings: at.call(this, this.config.selectors.buttons.settings),
                        captions: at.call(this, this.config.selectors.buttons.captions),
                        fullscreen: at.call(this, this.config.selectors.buttons.fullscreen)
                    }, this.elements.progress = at.call(this, this.config.selectors.progress), this.elements.inputs = {
                        seek: at.call(this, this.config.selectors.inputs.seek),
                        volume: at.call(this, this.config.selectors.inputs.volume)
                    }, this.elements.display = {
                        buffer: at.call(this, this.config.selectors.display.buffer),
                        currentTime: at.call(this, this.config.selectors.display.currentTime),
                        duration: at.call(this, this.config.selectors.display.duration)
                    }, D(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(`.${this.config.classNames.tooltip}`)), !0
                } catch (t) {
                    return this.debug.warn("It looks like there is a problem with your custom controls HTML", t), this.toggleNativeControls(!0), !1
                }
            },
            createIcon(t, e) {
                const i = "http://www.w3.org/2000/svg",
                    s = Nt.getIconUrl.call(this),
                    o = `${s.cors?"":s.url}#${this.config.iconPrefix}`,
                    n = document.createElementNS(i, "svg");
                G(n, Y(e, {
                    "aria-hidden": "true",
                    focusable: "false"
                }));
                const r = document.createElementNS(i, "use"),
                    a = `${o}-${t}`;
                return "href" in r && r.setAttributeNS("http://www.w3.org/1999/xlink", "href", a), r.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a), n.appendChild(r), n
            },
            createLabel(t, e = {}) {
                t = Pt.get(t, this.config);
                return X("span", {
                    ...e,
                    class: [e.class, this.config.classNames.hidden].filter(Boolean).join(" ")
                }, t)
            },
            createBadge(t) {
                if (W(t)) return null;
                const e = X("span", {
                    class: this.config.classNames.menu.value
                });
                return e.appendChild(X("span", {
                    class: this.config.classNames.menu.badge
                }, t)), e
            },
            createButton(t, e) {
                const i = Y({}, e);
                let s = function(t = "") {
                    let e = t.toString();
                    return e = function(t = "") {
                        t = t.toString(), t = Et(t, "-", " ");
                        return t = Et(t, "_", " "), t = Mt(t), Et(t, " ", "")
                    }(e), e.charAt(0).toLowerCase() + e.slice(1)
                }(t);
                const o = {
                    element: "button",
                    toggle: !1,
                    label: null,
                    icon: null,
                    labelPressed: null,
                    iconPressed: null
                };
                switch (["element", "icon", "label"].forEach(t => {
                        Object.keys(i).includes(t) && (o[t] = i[t], delete i[t])
                    }), "button" !== o.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some(t => t === this.config.classNames.control) || Y(i, {
                        class: `${i.class} ${this.config.classNames.control}`
                    }) : i.class = this.config.classNames.control, t) {
                    case "play":
                        o.toggle = !0, o.label = "play", o.labelPressed = "pause", o.icon = "play", o.iconPressed = "pause";
                        break;
                    case "mute":
                        o.toggle = !0, o.label = "mute", o.labelPressed = "unmute", o.icon = "volume", o.iconPressed = "muted";
                        break;
                    case "captions":
                        o.toggle = !0, o.label = "enableCaptions", o.labelPressed = "disableCaptions", o.icon = "captions-off", o.iconPressed = "captions-on";
                        break;
                    case "fullscreen":
                        o.toggle = !0, o.label = "enterFullscreen", o.labelPressed = "exitFullscreen", o.icon = "enter-fullscreen", o.iconPressed = "exit-fullscreen";
                        break;
                    case "play-large":
                        i.class += ` ${this.config.classNames.control}--overlaid`, s = "play", o.label = "play", o.icon = "play";
                        break;
                    default:
                        W(o.label) && (o.label = s), W(o.icon) && (o.icon = t)
                }
                const n = X(o.element);
                return o.toggle ? (n.appendChild(Nt.createIcon.call(this, o.iconPressed, {
                    class: "icon--pressed"
                })), n.appendChild(Nt.createIcon.call(this, o.icon, {
                    class: "icon--not-pressed"
                })), n.appendChild(Nt.createLabel.call(this, o.labelPressed, {
                    class: "label--pressed"
                })), n.appendChild(Nt.createLabel.call(this, o.label, {
                    class: "label--not-pressed"
                }))) : (n.appendChild(Nt.createIcon.call(this, o.icon)), n.appendChild(Nt.createLabel.call(this, o.label))), Y(i, et(this.config.selectors.buttons[s], i)), G(n, i), "play" === s ? (j(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(n)) : this.elements.buttons[s] = n, n
            },
            createRange(t, e) {
                e = X("input", Y(et(this.config.selectors.inputs[t]), {
                    type: "range",
                    min: 0,
                    max: 100,
                    step: .01,
                    value: 0,
                    autocomplete: "off",
                    role: "slider",
                    "aria-label": Pt.get(t, this.config),
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    "aria-valuenow": 0
                }, e));
                return this.elements.inputs[t] = e, Nt.updateRangeFill.call(this, e), v.setup(e), e
            },
            createProgress(t, e) {
                const i = X("progress", Y(et(this.config.selectors.display[t]), {
                    min: 0,
                    max: 100,
                    value: 0,
                    role: "progressbar",
                    "aria-hidden": !0
                }, e));
                if ("volume" !== t) {
                    i.appendChild(X("span", null, "0"));
                    const e = {
                            played: "played",
                            buffer: "buffered"
                        } [t],
                        s = e ? Pt.get(e, this.config) : "";
                    i.innerText = `% ${s.toLowerCase()}`
                }
                return this.elements.display[t] = i, i
            },
            createTime(t, e) {
                e = et(this.config.selectors.display[t], e), e = X("div", Y(e, {
                    class: `${e.class||""} ${this.config.classNames.display.time} `.trim(),
                    "aria-label": Pt.get(t, this.config)
                }), "00:00");
                return this.elements.display[t] = e
            },
            bindMenuItemShortcuts(s, t) {
                pt.call(this, s, "keydown keyup", e => {
                    if ([32, 38, 39, 40].includes(e.which) && (e.preventDefault(), e.stopPropagation(), "keydown" !== e.type)) {
                        var i = nt(s, '[role="menuitemradio"]');
                        if (!i && [32, 39].includes(e.which)) Nt.showMenuPanel.call(this, t, !0);
                        else {
                            let t;
                            32 !== e.which && (40 === e.which || i && 39 === e.which ? (t = s.nextElementSibling, D(t) || (t = s.parentNode.firstElementChild)) : (t = s.previousElementSibling, D(t) || (t = s.parentNode.lastElementChild)), lt.call(this, t, !0))
                        }
                    }
                }, !1), pt.call(this, s, "keyup", t => {
                    13 === t.which && Nt.focusFirstMenuItem.call(this, null, !0)
                })
            },
            createMenuItem({
                value: e,
                list: t,
                type: i,
                title: s,
                badge: o = null,
                checked: n = !1
            }) {
                const r = et(this.config.selectors.inputs[i]),
                    a = X("button", Y(r, {
                        type: "button",
                        role: "menuitemradio",
                        class: `${this.config.classNames.control} ${r.class||""}`.trim(),
                        "aria-checked": n,
                        value: e
                    })),
                    l = X("span");
                l.innerHTML = s, D(o) && l.appendChild(o), a.appendChild(l), Object.defineProperty(a, "checked", {
                    enumerable: !0,
                    get: () => "true" === a.getAttribute("aria-checked"),
                    set(t) {
                        t && Array.from(a.parentNode.children).filter(t => nt(t, '[role="menuitemradio"]')).forEach(t => t.setAttribute("aria-checked", "false")), a.setAttribute("aria-checked", t ? "true" : "false")
                    }
                }), this.listeners.bind(a, "click keyup", t => {
                    if (!N(t) || 32 === t.which) {
                        switch (t.preventDefault(), t.stopPropagation(), a.checked = !0, i) {
                            case "language":
                                this.currentTrack = Number(e);
                                break;
                            case "quality":
                                this.quality = e;
                                break;
                            case "speed":
                                this.speed = parseFloat(e)
                        }
                        Nt.showMenuPanel.call(this, "home", N(t))
                    }
                }, i, !1), Nt.bindMenuItemShortcuts.call(this, a, i), t.appendChild(a)
            },
            formatTime(t = 0, e = !1) {
                return I(t) ? qt(t, 0 < Dt(this.duration), e) : t
            },
            updateTimeDisplay(t = null, e = 0, i = !1) {
                D(t) && I(e) && (t.innerText = Nt.formatTime(e, i))
            },
            updateVolume() {
                this.supported.ui && (D(this.elements.inputs.volume) && Nt.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), D(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume))
            },
            setRange(t, e = 0) {
                D(t) && (t.value = e, Nt.updateRangeFill.call(this, t))
            },
            updateProgress(t) {
                if (this.supported.ui && q(t)) {
                    var e, i, s, o = (t, e) => {
                        const i = I(e) ? e : 0,
                            s = D(t) ? t : this.elements.display.buffer;
                        if (D(s)) {
                            s.value = i;
                            const t = s.getElementsByTagName("span")[0];
                            D(t) && (t.childNodes[0].nodeValue = i)
                        }
                    };
                    if (t) switch (t.type) {
                        case "timeupdate":
                        case "seeking":
                        case "seeked":
                            i = this.currentTime, s = this.duration, e = 0 === i || 0 === s || Number.isNaN(i) || Number.isNaN(s) ? 0 : (i / s * 100).toFixed(2), "timeupdate" === t.type && Nt.setRange.call(this, this.elements.inputs.seek, e);
                            break;
                        case "playing":
                        case "progress":
                            o(this.elements.display.buffer, 100 * this.buffered)
                    }
                }
            },
            updateRangeFill(t) {
                const e = q(t) ? t.target : t;
                if (D(e) && "range" === e.getAttribute("type")) {
                    if (nt(e, this.config.selectors.inputs.seek)) {
                        e.setAttribute("aria-valuenow", this.currentTime);
                        const t = Nt.formatTime(this.currentTime),
                            i = Nt.formatTime(this.duration),
                            s = Pt.get("seekLabel", this.config);
                        e.setAttribute("aria-valuetext", s.replace("{currentTime}", t).replace("{duration}", i))
                    } else if (nt(e, this.config.selectors.inputs.volume)) {
                        const t = 100 * e.value;
                        e.setAttribute("aria-valuenow", t), e.setAttribute("aria-valuetext", `${t.toFixed(1)}%`)
                    } else e.setAttribute("aria-valuenow", e.value);
                    V.isWebkit && e.style.setProperty("--value", e.value / e.max * 100 + "%")
                }
            },
            updateSeekTooltip(e) {
                if (this.config.tooltips.seek && D(this.elements.inputs.seek) && D(this.elements.display.seekTooltip) && 0 !== this.duration) {
                    const s = `${this.config.classNames.tooltip}--visible`,
                        o = t => st(this.elements.display.seekTooltip, s, t);
                    if (this.touch) o(!1);
                    else {
                        let t = 0;
                        var i = this.elements.progress.getBoundingClientRect();
                        if (q(e)) t = 100 / i.width * (e.pageX - i.left);
                        else {
                            if (!ot(this.elements.display.seekTooltip, s)) return;
                            t = parseFloat(this.elements.display.seekTooltip.style.left, 10)
                        }
                        t < 0 ? t = 0 : 100 < t && (t = 100), Nt.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * t), this.elements.display.seekTooltip.style.left = `${t}%`, q(e) && ["mouseenter", "mouseleave"].includes(e.type) && o("mouseenter" === e.type)
                    }
                }
            },
            timeUpdate(t) {
                var e = !D(this.elements.display.duration) && this.config.invertTime;
                Nt.updateTimeDisplay.call(this, this.elements.display.currentTime, e ? this.duration - this.currentTime : this.currentTime, e), t && "timeupdate" === t.type && this.media.seeking || Nt.updateProgress.call(this, t)
            },
            durationUpdate() {
                if (this.supported.ui && (this.config.invertTime || !this.currentTime)) {
                    if (this.duration >= 2 ** 32) return it(this.elements.display.currentTime, !0), void it(this.elements.progress, !0);
                    D(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
                    var t = D(this.elements.display.duration);
                    !t && this.config.displayDuration && this.paused && Nt.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), t && Nt.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), Nt.updateSeekTooltip.call(this)
                }
            },
            toggleMenuButton(t, e) {
                it(this.elements.settings.buttons[t], !e)
            },
            updateSetting(t, e, i) {
                const s = this.elements.settings.panels[t];
                let o = null,
                    n = e;
                if ("captions" === t) o = this.currentTrack;
                else {
                    if (o = W(i) ? this[t] : i, W(o) && (o = this.config[t].default), !W(this.options[t]) && !this.options[t].includes(o)) return void this.debug.warn(`Unsupported value of '${o}' for ${t}`);
                    if (!this.config[t].options.includes(o)) return void this.debug.warn(`Disabled value of '${o}' for ${t}`)
                }
                if (D(n) || (n = s && s.querySelector('[role="menu"]')), D(n)) {
                    this.elements.settings.buttons[t].querySelector(`.${this.config.classNames.menu.value}`).innerHTML = Nt.getLabel.call(this, t, o);
                    const r = n && n.querySelector(`[value="${o}"]`);
                    D(r) && (r.checked = !0)
                }
            },
            getLabel(t, e) {
                switch (t) {
                    case "speed":
                        return 1 === e ? Pt.get("normal", this.config) : `${e}&times;`;
                    case "quality":
                        if (I(e)) {
                            const t = Pt.get(`qualityLabel.${e}`, this.config);
                            return t.length ? t : `${e}p`
                        }
                        return Mt(e);
                    case "captions":
                        return Wt.getLabel.call(this);
                    default:
                        return null
                }
            },
            setQualityMenu(t) {
                if (D(this.elements.settings.panels.quality)) {
                    const e = "quality",
                        i = this.elements.settings.panels.quality.querySelector('[role="menu"]');
                    j(t) && (this.options.quality = vt(t).filter(t => this.config.quality.options.includes(t)));
                    t = !W(this.options.quality) && 1 < this.options.quality.length;
                    if (Nt.toggleMenuButton.call(this, e, t), J(i), Nt.checkMenu.call(this), t) {
                        const s = t => {
                            t = Pt.get(`qualityBadge.${t}`, this.config);
                            return t.length ? Nt.createBadge.call(this, t) : null
                        };
                        this.options.quality.sort((t, e) => {
                            const i = this.config.quality.options;
                            return i.indexOf(t) > i.indexOf(e) ? 1 : -1
                        }).forEach(t => {
                            Nt.createMenuItem.call(this, {
                                value: t,
                                list: i,
                                type: e,
                                title: Nt.getLabel.call(this, "quality", t),
                                badge: s(t)
                            })
                        }), Nt.updateSetting.call(this, e, i)
                    }
                }
            },
            setCaptionsMenu() {
                if (D(this.elements.settings.panels.captions)) {
                    const t = "captions",
                        i = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
                        e = Wt.getTracks.call(this),
                        s = Boolean(e.length);
                    if (Nt.toggleMenuButton.call(this, t, s), J(i), Nt.checkMenu.call(this), s) {
                        const o = e.map((t, e) => ({
                            value: e,
                            checked: this.captions.toggled && this.currentTrack === e,
                            title: Wt.getLabel.call(this, t),
                            badge: t.language && Nt.createBadge.call(this, t.language.toUpperCase()),
                            list: i,
                            type: "language"
                        }));
                        o.unshift({
                            value: -1,
                            checked: !this.captions.toggled,
                            title: Pt.get("disabled", this.config),
                            list: i,
                            type: "language"
                        }), o.forEach(Nt.createMenuItem.bind(this)), Nt.updateSetting.call(this, t, i)
                    }
                }
            },
            setSpeedMenu() {
                if (D(this.elements.settings.panels.speed)) {
                    const e = "speed",
                        i = this.elements.settings.panels.speed.querySelector('[role="menu"]');
                    this.options.speed = this.options.speed.filter(t => t >= this.minimumSpeed && t <= this.maximumSpeed);
                    var t = !W(this.options.speed) && 1 < this.options.speed.length;
                    Nt.toggleMenuButton.call(this, e, t), J(i), Nt.checkMenu.call(this), t && (this.options.speed.forEach(t => {
                        Nt.createMenuItem.call(this, {
                            value: t,
                            list: i,
                            type: e,
                            title: Nt.getLabel.call(this, "speed", t)
                        })
                    }), Nt.updateSetting.call(this, e, i))
                }
            },
            checkMenu() {
                var {
                    buttons: t
                } = this.elements.settings, t = !W(t) && Object.values(t).some(t => !t.hidden);
                it(this.elements.settings.menu, !t)
            },
            focusFirstMenuItem(e, i = !1) {
                if (!this.elements.settings.popup.hidden) {
                    let t = e;
                    D(t) || (t = Object.values(this.elements.settings.panels).find(t => !t.hidden));
                    e = t.querySelector('[role^="menuitem"]');
                    lt.call(this, e, i)
                }
            },
            toggleMenu(e) {
                const {
                    popup: i
                } = this.elements.settings, s = this.elements.buttons.settings;
                if (D(i) && D(s)) {
                    const {
                        hidden: o
                    } = i;
                    let t = o;
                    if (P(e)) t = e;
                    else if (N(e) && 27 === e.which) t = !1;
                    else if (q(e)) {
                        const o = z(e.composedPath) ? e.composedPath()[0] : e.target,
                            n = i.contains(o);
                        if (n || !n && e.target !== s && t) return
                    }
                    s.setAttribute("aria-expanded", t), it(i, !t), st(this.elements.container, this.config.classNames.menu.open, t), t && N(e) ? Nt.focusFirstMenuItem.call(this, null, !0) : t || o || lt.call(this, s, N(e))
                }
            },
            getMenuSize(t) {
                const e = t.cloneNode(!0);
                e.style.position = "absolute", e.style.opacity = 0, e.removeAttribute("hidden"), t.parentNode.appendChild(e);
                var i = e.scrollWidth,
                    t = e.scrollHeight;
                return Z(e), {
                    width: i,
                    height: t
                }
            },
            showMenuPanel(t = "", e = !1) {
                t = this.elements.container.querySelector(`#plyr-settings-${this.id}-${t}`);
                if (D(t)) {
                    const i = t.parentNode,
                        s = Array.from(i.children).find(t => !t.hidden);
                    if (ct.transitions && !ct.reducedMotion) {
                        i.style.width = `${s.scrollWidth}px`, i.style.height = `${s.scrollHeight}px`;
                        const o = Nt.getMenuSize.call(this, t),
                            e = t => {
                                t.target === i && ["width", "height"].includes(t.propertyName) && (i.style.width = "", i.style.height = "", mt.call(this, i, R, e))
                            };
                        pt.call(this, i, R, e), i.style.width = `${o.width}px`, i.style.height = `${o.height}px`
                    }
                    it(s, !0), it(t, !1), Nt.focusFirstMenuItem.call(this, t, e)
                }
            },
            setDownloadUrl() {
                const t = this.elements.buttons.download;
                D(t) && t.setAttribute("href", this.download)
            },
            create(a) {
                const {
                    bindMenuItemShortcuts: l,
                    createButton: i,
                    createProgress: t,
                    createRange: s,
                    createTime: h,
                    setQualityMenu: e,
                    setSpeedMenu: o,
                    showMenuPanel: c
                } = Nt;
                this.elements.controls = null, j(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
                const n = X("div", et(this.config.selectors.controls.wrapper));
                this.elements.controls = n;
                const u = {
                    class: "plyr__controls__item"
                };
                return vt(j(this.config.controls) ? this.config.controls : []).forEach(e => {
                    if ("restart" === e && n.appendChild(i.call(this, "restart", u)), "rewind" === e && n.appendChild(i.call(this, "rewind", u)), "play" === e && n.appendChild(i.call(this, "play", u)), "fast-forward" === e && n.appendChild(i.call(this, "fast-forward", u)), "progress" === e) {
                        const l = X("div", {
                                class: `${u.class} plyr__progress__container`
                            }),
                            i = X("div", et(this.config.selectors.progress));
                        if (i.appendChild(s.call(this, "seek", {
                                id: `plyr-seek-${a.id}`
                            })), i.appendChild(t.call(this, "buffer")), this.config.tooltips.seek) {
                            const a = X("span", {
                                class: this.config.classNames.tooltip
                            }, "00:00");
                            i.appendChild(a), this.elements.display.seekTooltip = a
                        }
                        this.elements.progress = i, l.appendChild(this.elements.progress), n.appendChild(l)
                    }
                    if ("current-time" === e && n.appendChild(h.call(this, "currentTime", u)), "duration" === e && n.appendChild(h.call(this, "duration", u)), "mute" === e || "volume" === e) {
                        let {
                            volume: t
                        } = this.elements;
                        if (D(t) && n.contains(t) || (t = X("div", Y({}, u, {
                                class: `${u.class} plyr__volume`.trim()
                            })), this.elements.volume = t, n.appendChild(t)), "mute" === e && t.appendChild(i.call(this, "mute")), "volume" === e && !V.isIos) {
                            const i = {
                                max: 1,
                                step: .05,
                                value: this.config.volume
                            };
                            t.appendChild(s.call(this, "volume", Y(i, {
                                id: `plyr-volume-${a.id}`
                            })))
                        }
                    }
                    if ("captions" === e && n.appendChild(i.call(this, "captions", u)), "settings" === e && !W(this.config.settings)) {
                        const t = X("div", Y({}, u, {
                            class: `${u.class} plyr__menu`.trim(),
                            hidden: ""
                        }));
                        t.appendChild(i.call(this, "settings", {
                            "aria-haspopup": !0,
                            "aria-controls": `plyr-settings-${a.id}`,
                            "aria-expanded": !1
                        }));
                        const s = X("div", {
                                class: "plyr__menu__container",
                                id: `plyr-settings-${a.id}`,
                                hidden: ""
                            }),
                            h = X("div"),
                            e = X("div", {
                                id: `plyr-settings-${a.id}-home`
                            }),
                            r = X("div", {
                                role: "menu"
                            });
                        e.appendChild(r), h.appendChild(e), this.elements.settings.panels.home = e, this.config.settings.forEach(t => {
                            const e = X("button", Y(et(this.config.selectors.buttons.settings), {
                                type: "button",
                                class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
                                role: "menuitem",
                                "aria-haspopup": !0,
                                hidden: ""
                            }));
                            l.call(this, e, t), pt.call(this, e, "click", () => {
                                c.call(this, t, !1)
                            });
                            const i = X("span", null, Pt.get(t, this.config)),
                                s = X("span", {
                                    class: this.config.classNames.menu.value
                                });
                            s.innerHTML = a[t], i.appendChild(s), e.appendChild(i), r.appendChild(e);
                            const o = X("div", {
                                    id: `plyr-settings-${a.id}-${t}`,
                                    hidden: ""
                                }),
                                n = X("button", {
                                    type: "button",
                                    class: `${this.config.classNames.control} ${this.config.classNames.control}--back`
                                });
                            n.appendChild(X("span", {
                                "aria-hidden": !0
                            }, Pt.get(t, this.config))), n.appendChild(X("span", {
                                class: this.config.classNames.hidden
                            }, Pt.get("menuBack", this.config))), pt.call(this, o, "keydown", t => {
                                37 === t.which && (t.preventDefault(), t.stopPropagation(), c.call(this, "home", !0))
                            }, !1), pt.call(this, n, "click", () => {
                                c.call(this, "home", !1)
                            }), o.appendChild(n), o.appendChild(X("div", {
                                role: "menu"
                            })), h.appendChild(o), this.elements.settings.buttons[t] = e, this.elements.settings.panels[t] = o
                        }), s.appendChild(h), t.appendChild(s), n.appendChild(t), this.elements.settings.popup = s, this.elements.settings.menu = t
                    }
                    if ("pip" === e && ct.pip && n.appendChild(i.call(this, "pip", u)), "airplay" === e && ct.airplay && n.appendChild(i.call(this, "airplay", u)), "download" === e) {
                        const a = Y({}, u, {
                            element: "a",
                            href: this.download,
                            target: "_blank"
                        });
                        this.isHTML5 && (a.download = "");
                        const {
                            download: l
                        } = this.config.urls;
                        !F(l) && this.isEmbed && Y(a, {
                            icon: `logo-${this.provider}`,
                            label: this.provider
                        }), n.appendChild(i.call(this, "download", a))
                    }
                    "fullscreen" === e && n.appendChild(i.call(this, "fullscreen", u))
                }), this.isHTML5 && e.call(this, kt.getQualityOptions.call(this)), o.call(this), n
            },
            inject() {
                if (this.config.loadSprite) {
                    const e = Nt.getIconUrl.call(this);
                    e.cors && Lt(e.url, "sprite-plyr")
                }
                this.id = Math.floor(1e4 * Math.random());
                let e = null;
                this.elements.controls = null;
                const t = {
                    id: this.id,
                    seektime: this.config.seekTime,
                    title: this.config.title
                };
                let i = !0;
                z(this.config.controls) && (this.config.controls = this.config.controls.call(this, t)), this.config.controls || (this.config.controls = []), D(this.config.controls) || O(this.config.controls) ? e = this.config.controls : (e = Nt.create.call(this, {
                    id: this.id,
                    seektime: this.config.seekTime,
                    speed: this.speed,
                    quality: this.quality,
                    captions: Wt.getLabel.call(this)
                }), i = !1);
                let s;
                if (i && O(this.config.controls) && (e = (() => {
                        let i = e;
                        return Object.entries(t).forEach(([t, e]) => {
                            i = Et(i, `{${t}}`, e)
                        }), i
                    })()), O(this.config.selectors.controls.container) && (s = document.querySelector(this.config.selectors.controls.container)), D(s) || (s = this.elements.container), s[D(e) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", e), D(this.elements.controls) || Nt.findElements.call(this), !W(this.elements.buttons)) {
                    const e = e => {
                        const i = this.config.classNames.controlPressed;
                        Object.defineProperty(e, "pressed", {
                            enumerable: !0,
                            get: () => ot(e, i),
                            set(t = !1) {
                                st(e, i, t)
                            }
                        })
                    };
                    Object.values(this.elements.buttons).filter(Boolean).forEach(t => {
                        j(t) || L(t) ? Array.from(t).filter(Boolean).forEach(e) : e(t)
                    })
                }
                if (V.isEdge && B(s), this.config.tooltips.controls) {
                    const {
                        classNames: e,
                        selectors: t
                    } = this.config, i = `${t.controls.wrapper} ${t.labels} .${e.hidden}`, s = rt.call(this, i);
                    Array.from(s).forEach(t => {
                        st(t, this.config.classNames.hidden, !1), st(t, this.config.classNames.tooltip, !0)
                    })
                }
            }
        };

        function Ht(t, e = !0) {
            let i = t;
            if (e) {
                const t = document.createElement("a");
                t.href = i, i = t.href
            }
            try {
                return new URL(i)
            } catch (t) {
                return null
            }
        }

        function Ft(t) {
            const i = new URLSearchParams;
            return M(t) && Object.entries(t).forEach(([t, e]) => {
                i.set(t, e)
            }), i
        }
        const Wt = {
                setup() {
                    if (this.supported.ui)
                        if (!this.isVideo || this.isYouTube || this.isHTML5 && !ct.textTracks) j(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && Nt.setCaptionsMenu.call(this);
                        else {
                            var i;
                            if (D(this.elements.captions) || (this.elements.captions = X("div", et(this.config.selectors.captions)), i = this.elements.captions, s = this.elements.wrapper, D(i) && D(s) && s.parentNode.insertBefore(i, s.nextSibling)), V.isIE && window.URL) {
                                const i = this.media.querySelectorAll("track");
                                Array.from(i).forEach(e => {
                                    var t = e.getAttribute("src"),
                                        i = Ht(t);
                                    null !== i && i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && jt(t, "blob").then(t => {
                                        e.setAttribute("src", window.URL.createObjectURL(t))
                                    }).catch(() => {
                                        Z(e)
                                    })
                                })
                            }
                            var s = vt((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(t => t.split("-")[0]));
                            let t = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
                            "auto" === t && ([t] = s);
                            let e = this.storage.get("captions");
                            if (P(e) || ({
                                    active: e
                                } = this.config.captions), Object.assign(this.captions, {
                                    toggled: !1,
                                    active: e,
                                    language: t,
                                    languages: s
                                }), this.isHTML5) {
                                const i = this.config.captions.update ? "addtrack removetrack" : "removetrack";
                                pt.call(this, this.media.textTracks, i, Wt.update.bind(this))
                            }
                            setTimeout(Wt.update.bind(this), 0)
                        }
                },
                update() {
                    const t = Wt.getTracks.call(this, !0),
                        {
                            active: e,
                            language: i,
                            meta: s,
                            currentTrackNode: o
                        } = this.captions,
                        n = Boolean(t.find(t => t.language === i));
                    this.isHTML5 && this.isVideo && t.filter(t => !s.get(t)).forEach(t => {
                        this.debug.log("Track added", t), s.set(t, {
                            default: "showing" === t.mode
                        }), "showing" === t.mode && (t.mode = "hidden"), pt.call(this, t, "cuechange", () => Wt.updateCues.call(this))
                    }), (n && this.language !== i || !t.includes(o)) && (Wt.setLanguage.call(this, i), Wt.toggle.call(this, e && n)), st(this.elements.container, this.config.classNames.captions.enabled, !W(t)), j(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && Nt.setCaptionsMenu.call(this)
                },
                toggle(t, e = !0) {
                    if (this.supported.ui) {
                        const {
                            toggled: i
                        } = this.captions, s = this.config.classNames.captions.active, o = E(t) ? !i : t;
                        if (o !== i) {
                            if (e || (this.captions.active = o, this.storage.set({
                                    captions: o
                                })), !this.language && o && !e) {
                                const t = Wt.getTracks.call(this),
                                    e = Wt.findTrack.call(this, [this.captions.language, ...this.captions.languages], !0);
                                return this.captions.language = e.language, void Wt.set.call(this, t.indexOf(e))
                            }
                            this.elements.buttons.captions && (this.elements.buttons.captions.pressed = o), st(this.elements.container, s, o), this.captions.toggled = o, Nt.updateSetting.call(this, "captions"), ft.call(this, this.media, o ? "captionsenabled" : "captionsdisabled")
                        }
                        setTimeout(() => {
                            o && this.captions.toggled && (this.captions.currentTrackNode.mode = "hidden")
                        })
                    }
                },
                set(t, e = !0) {
                    var i, s = Wt.getTracks.call(this); - 1 !== t ? I(t) ? t in s ? (this.captions.currentTrack !== t && ({
                        language: s
                    } = (i = s[this.captions.currentTrack = t]) || {}, this.captions.currentTrackNode = i, Nt.updateSetting.call(this, "captions"), e || (this.captions.language = s, this.storage.set({
                        language: s
                    })), this.isVimeo && this.embed.enableTextTrack(s), ft.call(this, this.media, "languagechange")), Wt.toggle.call(this, !0, e), this.isHTML5 && this.isVideo && Wt.updateCues.call(this)) : this.debug.warn("Track not found", t) : this.debug.warn("Invalid caption argument", t) : Wt.toggle.call(this, !1, e)
                },
                setLanguage(t, e = !0) {
                    if (O(t)) {
                        var i = t.toLowerCase();
                        this.captions.language = i;
                        const s = Wt.getTracks.call(this),
                            o = Wt.findTrack.call(this, [i]);
                        Wt.set.call(this, s.indexOf(o), e)
                    } else this.debug.warn("Invalid language argument", t)
                },
                getTracks(e = !1) {
                    return Array.from((this.media || {}).textTracks || []).filter(t => !this.isHTML5 || e || this.captions.meta.has(t)).filter(t => ["captions", "subtitles"].includes(t.kind))
                },
                findTrack(t, e = !1) {
                    const i = Wt.getTracks.call(this),
                        s = t => Number((this.captions.meta.get(t) || {}).default),
                        o = Array.from(i).sort((t, e) => s(e) - s(t));
                    let n;
                    return t.every(e => (n = o.find(t => t.language === e), !n)), n || (e ? o[0] : void 0)
                },
                getCurrentTrack() {
                    return Wt.getTracks.call(this)[this.currentTrack]
                },
                getLabel(t) {
                    let e = t;
                    return !H(e) && ct.textTracks && this.captions.toggled && (e = Wt.getCurrentTrack.call(this)), H(e) ? W(e.label) ? W(e.language) ? Pt.get("enabled", this.config) : t.language.toUpperCase() : e.label : Pt.get("disabled", this.config)
                },
                updateCues(e) {
                    if (this.supported.ui)
                        if (D(this.elements.captions))
                            if (E(e) || Array.isArray(e)) {
                                let t = e;
                                if (!t) {
                                    const e = Wt.getCurrentTrack.call(this);
                                    t = Array.from((e || {}).activeCues || []).map(t => t.getCueAsHTML()).map(It)
                                }
                                var i = t.map(t => t.trim()).join("\n");
                                if (i !== this.elements.captions.innerHTML) {
                                    J(this.elements.captions);
                                    const e = X("span", et(this.config.selectors.caption));
                                    e.innerHTML = i, this.elements.captions.appendChild(e), ft.call(this, this.media, "cuechange")
                                }
                            } else this.debug.warn("updateCues: Invalid input", e);
                    else this.debug.warn("No captions element to render to")
                }
            },
            Rt = {
                enabled: !0,
                title: "",
                debug: !1,
                autoplay: !1,
                autopause: !0,
                playsinline: !0,
                seekTime: 10,
                volume: 1,
                muted: !1,
                duration: null,
                displayDuration: !0,
                invertTime: !0,
                toggleInvert: !0,
                ratio: null,
                clickToPlay: !0,
                hideControls: !0,
                resetOnEnd: !1,
                disableContextMenu: !0,
                loadSprite: !0,
                iconPrefix: "plyr",
                iconUrl: "https://cdn.plyr.io/3.6.8/plyr.svg",
                blankVideo: "https://cdn.plyr.io/static/blank.mp4",
                quality: {
                    default: 576,
                    options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
                    forced: !1,
                    onChange: null
                },
                loop: {
                    active: !1
                },
                speed: {
                    selected: 1,
                    options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
                },
                keyboard: {
                    focused: !0,
                    global: !1
                },
                tooltips: {
                    controls: !1,
                    seek: !0
                },
                captions: {
                    active: !1,
                    language: "auto",
                    update: !1
                },
                fullscreen: {
                    enabled: !0,
                    fallback: !0,
                    iosNative: !1
                },
                storage: {
                    enabled: !0,
                    key: "plyr"
                },
                controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
                settings: ["captions", "quality", "speed"],
                i18n: {
                    restart: "Restart",
                    rewind: "Rewind {seektime}s",
                    play: "Play",
                    pause: "Pause",
                    fastForward: "Forward {seektime}s",
                    seek: "Seek",
                    seekLabel: "{currentTime} of {duration}",
                    played: "Played",
                    buffered: "Buffered",
                    currentTime: "Current time",
                    duration: "Duration",
                    volume: "Volume",
                    mute: "Mute",
                    unmute: "Unmute",
                    enableCaptions: "Enable captions",
                    disableCaptions: "Disable captions",
                    download: "Download",
                    enterFullscreen: "Enter fullscreen",
                    exitFullscreen: "Exit fullscreen",
                    frameTitle: "Player for {title}",
                    captions: "Captions",
                    settings: "Settings",
                    pip: "PIP",
                    menuBack: "Go back to previous menu",
                    speed: "Speed",
                    normal: "Normal",
                    quality: "Quality",
                    loop: "Loop",
                    start: "Start",
                    end: "End",
                    all: "All",
                    reset: "Reset",
                    disabled: "Disabled",
                    enabled: "Enabled",
                    advertisement: "Ad",
                    qualityBadge: {
                        2160: "4K",
                        1440: "HD",
                        1080: "HD",
                        720: "HD",
                        576: "SD",
                        480: "SD"
                    }
                },
                urls: {
                    download: null,
                    vimeo: {
                        sdk: "https://player.vimeo.com/api/player.js",
                        iframe: "https://player.vimeo.com/video/{0}?{1}",
                        api: "https://vimeo.com/api/oembed.json?url={0}"
                    },
                    youtube: {
                        sdk: "https://www.youtube.com/iframe_api",
                        api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
                    },
                    googleIMA: {
                        sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
                    }
                },
                listeners: {
                    seek: null,
                    play: null,
                    pause: null,
                    restart: null,
                    rewind: null,
                    fastForward: null,
                    mute: null,
                    volume: null,
                    captions: null,
                    download: null,
                    fullscreen: null,
                    pip: null,
                    airplay: null,
                    speed: null,
                    quality: null,
                    loop: null,
                    language: null
                },
                events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
                selectors: {
                    editable: "input, textarea, select, [contenteditable]",
                    container: ".plyr",
                    controls: {
                        container: null,
                        wrapper: ".plyr__controls"
                    },
                    labels: "[data-plyr]",
                    buttons: {
                        play: '[data-plyr="play"]',
                        pause: '[data-plyr="pause"]',
                        restart: '[data-plyr="restart"]',
                        rewind: '[data-plyr="rewind"]',
                        fastForward: '[data-plyr="fast-forward"]',
                        mute: '[data-plyr="mute"]',
                        captions: '[data-plyr="captions"]',
                        download: '[data-plyr="download"]',
                        fullscreen: '[data-plyr="fullscreen"]',
                        pip: '[data-plyr="pip"]',
                        airplay: '[data-plyr="airplay"]',
                        settings: '[data-plyr="settings"]',
                        loop: '[data-plyr="loop"]'
                    },
                    inputs: {
                        seek: '[data-plyr="seek"]',
                        volume: '[data-plyr="volume"]',
                        speed: '[data-plyr="speed"]',
                        language: '[data-plyr="language"]',
                        quality: '[data-plyr="quality"]'
                    },
                    display: {
                        currentTime: ".plyr__time--current",
                        duration: ".plyr__time--duration",
                        buffer: ".plyr__progress__buffer",
                        loop: ".plyr__progress__loop",
                        volume: ".plyr__volume--display"
                    },
                    progress: ".plyr__progress",
                    captions: ".plyr__captions",
                    caption: ".plyr__caption"
                },
                classNames: {
                    type: "plyr--{0}",
                    provider: "plyr--{0}",
                    video: "plyr__video-wrapper",
                    embed: "plyr__video-embed",
                    videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
                    embedContainer: "plyr__video-embed__container",
                    poster: "plyr__poster",
                    posterEnabled: "plyr__poster-enabled",
                    ads: "plyr__ads",
                    control: "plyr__control",
                    controlPressed: "plyr__control--pressed",
                    playing: "plyr--playing",
                    paused: "plyr--paused",
                    stopped: "plyr--stopped",
                    loading: "plyr--loading",
                    hover: "plyr--hover",
                    tooltip: "plyr__tooltip",
                    cues: "plyr__cues",
                    hidden: "plyr__sr-only",
                    hideControls: "plyr--hide-controls",
                    isIos: "plyr--is-ios",
                    isTouch: "plyr--is-touch",
                    uiSupported: "plyr--full-ui",
                    noTransition: "plyr--no-transition",
                    display: {
                        time: "plyr__time"
                    },
                    menu: {
                        value: "plyr__menu__value",
                        badge: "plyr__badge",
                        open: "plyr--menu-open"
                    },
                    captions: {
                        enabled: "plyr--captions-enabled",
                        active: "plyr--captions-active"
                    },
                    fullscreen: {
                        enabled: "plyr--fullscreen-enabled",
                        fallback: "plyr--fullscreen-fallback"
                    },
                    pip: {
                        supported: "plyr--pip-supported",
                        active: "plyr--pip-active"
                    },
                    airplay: {
                        supported: "plyr--airplay-supported",
                        active: "plyr--airplay-active"
                    },
                    tabFocus: "plyr__tab-focus",
                    previewThumbnails: {
                        thumbContainer: "plyr__preview-thumb",
                        thumbContainerShown: "plyr__preview-thumb--is-shown",
                        imageContainer: "plyr__preview-thumb__image-container",
                        timeContainer: "plyr__preview-thumb__time-container",
                        scrubbingContainer: "plyr__preview-scrubbing",
                        scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
                    }
                },
                attributes: {
                    embed: {
                        provider: "data-plyr-provider",
                        id: "data-plyr-embed-id"
                    }
                },
                ads: {
                    enabled: !1,
                    publisherId: "",
                    tagUrl: ""
                },
                previewThumbnails: {
                    enabled: !1,
                    src: ""
                },
                vimeo: {
                    byline: !1,
                    portrait: !1,
                    title: !1,
                    speed: !0,
                    transparent: !1,
                    customControls: !0,
                    referrerPolicy: null,
                    premium: !1
                },
                youtube: {
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    customControls: !0,
                    noCookie: !1
                }
            },
            Bt = "picture-in-picture",
            Vt = {
                html5: "html5",
                youtube: "youtube",
                vimeo: "vimeo"
            },
            Ut = () => {};
        class Yt {
            constructor(t = !1) {
                this.enabled = window.console && t, this.enabled && this.log("Debugging enabled")
            }
            get log() {
                return this.enabled ? Function.prototype.bind.call(console.log, console) : Ut
            }
            get warn() {
                return this.enabled ? Function.prototype.bind.call(console.warn, console) : Ut
            }
            get error() {
                return this.enabled ? Function.prototype.bind.call(console.error, console) : Ut
            }
        }
        class Qt {
            constructor(t) {
                n(this, "onChange", () => {
                    if (this.enabled) {
                        const e = this.player.elements.buttons.fullscreen;
                        D(e) && (e.pressed = this.active);
                        var t = this.target === this.player.media ? this.target : this.player.elements.container;
                        ft.call(this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", !0)
                    }
                }), n(this, "toggleFallback", (e = !1) => {
                    if (e ? this.scrollPosition = {
                            x: window.scrollX || 0,
                            y: window.scrollY || 0
                        } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", st(this.target, this.player.config.classNames.fullscreen.fallback, e), V.isIos) {
                        let t = document.head.querySelector('meta[name="viewport"]');
                        const s = "viewport-fit=cover";
                        t || (t = document.createElement("meta"), t.setAttribute("name", "viewport"));
                        var i = O(t.content) && t.content.includes(s);
                        e ? (this.cleanupViewport = !i, i || (t.content += `,${s}`)) : this.cleanupViewport && (t.content = t.content.split(",").filter(t => t.trim() !== s).join(","))
                    }
                    this.onChange()
                }), n(this, "trapFocus", t => {
                    if (!V.isIos && this.active && "Tab" === t.key && 9 === t.keyCode) {
                        const e = document.activeElement,
                            i = rt.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
                            [s] = i,
                            o = i[i.length - 1];
                        e !== o || t.shiftKey ? e === s && t.shiftKey && (o.focus(), t.preventDefault()) : (s.focus(), t.preventDefault())
                    }
                }), n(this, "update", () => {
                    var t;
                    this.enabled ? (t = this.forceFallback ? "Fallback (forced)" : Qt.native ? "Native" : "Fallback", this.player.debug.log(`${t} fullscreen enabled`)) : this.player.debug.log("Fullscreen not supported and fallback disabled"), st(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled)
                }), n(this, "enter", () => {
                    this.enabled && (V.isIos && this.player.config.fullscreen.iosNative ? this.player.isVimeo ? this.player.embed.requestFullscreen() : this.target.webkitEnterFullscreen() : !Qt.native || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? W(this.prefix) || this.target[`${this.prefix}Request${this.property}`]() : this.target.requestFullscreen({
                        navigationUI: "hide"
                    }))
                }), n(this, "exit", () => {
                    var t;
                    this.enabled && (V.isIos && this.player.config.fullscreen.iosNative ? (this.target.webkitExitFullscreen(), yt(this.player.play())) : !Qt.native || this.forceFallback ? this.toggleFallback(!1) : this.prefix ? W(this.prefix) || (t = "moz" === this.prefix ? "Cancel" : "Exit", document[`${this.prefix}${t}${this.property}`]()) : (document.cancelFullScreen || document.exitFullscreen).call(document))
                }), n(this, "toggle", () => {
                    this.active ? this.exit() : this.enter()
                }), this.player = t, this.prefix = Qt.prefix, this.property = Qt.property, this.scrollPosition = {
                    x: 0,
                    y: 0
                }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && function(t, e) {
                    const {
                        prototype: i
                    } = Element;
                    return (i.closest || function() {
                        let t = this;
                        do {
                            if (nt.matches(t, e)) return t
                        } while (t = t.parentElement || t.parentNode, null !== t && 1 === t.nodeType);
                        return null
                    }).call(t, e)
                }(this.player.elements.container, t.config.fullscreen.container), pt.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : `${this.prefix}fullscreenchange`, () => {
                    this.onChange()
                }), pt.call(this.player, this.player.elements.container, "dblclick", t => {
                    D(this.player.elements.controls) && this.player.elements.controls.contains(t.target) || this.player.listeners.proxy(t, this.toggle, "fullscreen")
                }), pt.call(this, this.player.elements.container, "keydown", t => this.trapFocus(t)), this.update()
            }
            static get native() {
                return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
            }
            get usingNative() {
                return Qt.native && !this.forceFallback
            }
            static get prefix() {
                if (z(document.exitFullscreen)) return "";
                let e = "";
                return ["webkit", "moz", "ms"].some(t => !(!z(document[`${t}ExitFullscreen`]) && !z(document[`${t}CancelFullScreen`]) || (e = t, 0))), e
            }
            static get property() {
                return "moz" === this.prefix ? "FullScreen" : "Fullscreen"
            }
            get enabled() {
                return (Qt.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo
            }
            get active() {
                if (!this.enabled) return !1;
                if (!Qt.native || this.forceFallback) return ot(this.target, this.player.config.classNames.fullscreen.fallback);
                var t = this.prefix ? document[`${this.prefix}${this.property}Element`] : document.fullscreenElement;
                return t && t.shadowRoot ? t === this.target.getRootNode().host : t === this.target
            }
            get target() {
                return V.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container
            }
        }

        function Gt(o, n = 1) {
            return new Promise((t, e) => {
                const i = new Image,
                    s = () => {
                        delete i.onload, delete i.onerror, (i.naturalWidth >= n ? t : e)(i)
                    };
                Object.assign(i, {
                    onload: s,
                    onerror: s,
                    src: o
                })
            })
        }
        const Xt = {
            addStyleHook() {
                st(this.elements.container, this.config.selectors.container.replace(".", ""), !0), st(this.elements.container, this.config.classNames.uiSupported, this.supported.ui)
            },
            toggleNativeControls(t = !1) {
                t && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls")
            },
            build() {
                if (this.listeners.media(), !this.supported.ui) return this.debug.warn(`Basic support only for ${this.provider} ${this.type}`), void Xt.toggleNativeControls.call(this, !0);
                D(this.elements.controls) || (Nt.inject.call(this), this.listeners.controls()), Xt.toggleNativeControls.call(this), this.isHTML5 && Wt.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, Nt.updateVolume.call(this), Nt.timeUpdate.call(this), Xt.checkPlaying.call(this), st(this.elements.container, this.config.classNames.pip.supported, ct.pip && this.isHTML5 && this.isVideo), st(this.elements.container, this.config.classNames.airplay.supported, ct.airplay && this.isHTML5), st(this.elements.container, this.config.classNames.isIos, V.isIos), st(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(() => {
                    ft.call(this, this.media, "ready")
                }, 0), Xt.setTitle.call(this), this.poster && Xt.setPoster.call(this, this.poster, !1).catch(() => {}), this.config.duration && Nt.durationUpdate.call(this)
            },
            setTitle() {
                let e = Pt.get("play", this.config);
                if (O(this.config.title) && !W(this.config.title) && (e += `, ${this.config.title}`), Array.from(this.elements.buttons.play || []).forEach(t => {
                        t.setAttribute("aria-label", e)
                    }), this.isEmbed) {
                    const e = at.call(this, "iframe");
                    if (D(e)) {
                        const t = W(this.config.title) ? "video" : this.config.title,
                            i = Pt.get("frameTitle", this.config);
                        e.setAttribute("title", i.replace("{title}", t))
                    }
                }
            },
            togglePoster(t) {
                st(this.elements.container, this.config.classNames.posterEnabled, t)
            },
            setPoster(e, t = !0) {
                return t && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), function() {
                    return new Promise(t => this.ready ? setTimeout(t, 0) : pt.call(this, this.elements.container, "ready", t)).then(() => {})
                }.call(this).then(() => Gt(e)).catch(t => {
                    throw e === this.poster && Xt.togglePoster.call(this, !1), t
                }).then(() => {
                    if (e !== this.poster) throw new Error("setPoster cancelled by later call to setPoster")
                }).then(() => (Object.assign(this.elements.poster.style, {
                    backgroundImage: `url('${e}')`,
                    backgroundSize: ""
                }), Xt.togglePoster.call(this, !0), e)))
            },
            checkPlaying(t) {
                st(this.elements.container, this.config.classNames.playing, this.playing), st(this.elements.container, this.config.classNames.paused, this.paused), st(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(t => {
                    Object.assign(t, {
                        pressed: this.playing
                    }), t.setAttribute("aria-label", Pt.get(this.playing ? "pause" : "play", this.config))
                }), q(t) && "timeupdate" === t.type || Xt.toggleControls.call(this)
            },
            checkLoading(t) {
                this.loading = ["stalled", "waiting"].includes(t.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(() => {
                    st(this.elements.container, this.config.classNames.loading, this.loading), Xt.toggleControls.call(this)
                }, this.loading ? 250 : 0)
            },
            toggleControls(t) {
                var e, {
                    controls: i
                } = this.elements;
                i && this.config.hideControls && (e = this.touch && this.lastSeekTime + 2e3 > Date.now(), this.toggleControls(Boolean(t || this.loading || this.paused || i.pressed || i.hover || e)))
            },
            migrateStyles() {
                Object.values({
                    ...this.media.style
                }).filter(t => !W(t) && O(t) && t.startsWith("--plyr")).forEach(t => {
                    this.elements.container.style.setProperty(t, this.media.style.getPropertyValue(t)), this.media.style.removeProperty(t)
                }), W(this.media.style) && this.media.removeAttribute("style")
            }
        };
        class Kt {
            constructor(t) {
                n(this, "firstTouch", () => {
                    const {
                        player: t
                    } = this, {
                        elements: e
                    } = t;
                    t.touch = !0, st(e.container, t.config.classNames.isTouch, !0)
                }), n(this, "setTabFocus", t => {
                    const {
                        player: e
                    } = this, {
                        elements: i
                    } = e;
                    var s;
                    clearTimeout(this.focusTimer), "keydown" === t.type && 9 !== t.which || ("keydown" === t.type && (this.lastKeyDown = t.timeStamp), s = t.timeStamp - this.lastKeyDown <= 20, "focus" === t.type && !s || (s = e.config.classNames.tabFocus, st(rt.call(e, `.${s}`), s, !1), "focusout" !== t.type && (this.focusTimer = setTimeout(() => {
                        var t = document.activeElement;
                        i.container.contains(t) && st(document.activeElement, e.config.classNames.tabFocus, !0)
                    }, 10))))
                }), n(this, "global", (t = !0) => {
                    var {
                        player: e
                    } = this;
                    e.config.keyboard.global && dt.call(e, window, "keydown keyup", this.handleKey, t, !1), dt.call(e, document.body, "click", this.toggleMenu, t), gt.call(e, document.body, "touchstart", this.firstTouch), dt.call(e, document.body, "keydown focus blur focusout", this.setTabFocus, t, !1, !0)
                }), n(this, "container", () => {
                    const {
                        player: a
                    } = this, {
                        config: t,
                        elements: l,
                        timers: s
                    } = a;
                    !t.keyboard.global && t.keyboard.focused && pt.call(a, l.container, "keydown keyup", this.handleKey, !1), pt.call(a, l.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", t => {
                        const {
                            controls: e
                        } = l;
                        e && "enterfullscreen" === t.type && (e.pressed = !1, e.hover = !1);
                        let i = 0;
                        ["touchstart", "touchmove", "mousemove"].includes(t.type) && (Xt.toggleControls.call(a, !0), i = a.touch ? 3e3 : 2e3), clearTimeout(s.controls), s.controls = setTimeout(() => Xt.toggleControls.call(a, !1), i)
                    });
                    const i = () => {
                            if (a.isVimeo && !a.config.vimeo.premium) {
                                const i = l.wrapper,
                                    {
                                        active: s
                                    } = a.fullscreen,
                                    [o, n] = _t.call(a),
                                    r = wt(`aspect-ratio: ${o} / ${n}`);
                                var t, e;
                                s ? ([e, t] = [Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)], e = o / n < e / t, r ? (i.style.width = e ? "auto" : "100%", i.style.height = e ? "100%" : "auto") : (i.style.maxWidth = e ? t / n * o + "px" : null, i.style.margin = e ? "0 auto" : null)) : r ? (i.style.width = null, i.style.height = null) : (i.style.maxWidth = null, i.style.margin = null)
                            }
                        },
                        o = () => {
                            clearTimeout(s.resized), s.resized = setTimeout(i, 50)
                        };
                    pt.call(a, l.container, "enterfullscreen exitfullscreen", t => {
                        var {
                            target: e
                        } = a.fullscreen;
                        e === l.container && (!a.isEmbed && W(a.config.ratio) || (i(), ("enterfullscreen" === t.type ? pt : mt).call(a, window, "resize", o)))
                    })
                }), n(this, "media", () => {
                    const {
                        player: i
                    } = this, {
                        elements: s
                    } = i;
                    if (pt.call(i, i.media, "timeupdate seeking seeked", t => Nt.timeUpdate.call(i, t)), pt.call(i, i.media, "durationchange loadeddata loadedmetadata", t => Nt.durationUpdate.call(i, t)), pt.call(i, i.media, "ended", () => {
                            i.isHTML5 && i.isVideo && i.config.resetOnEnd && (i.restart(), i.pause())
                        }), pt.call(i, i.media, "progress playing seeking seeked", t => Nt.updateProgress.call(i, t)), pt.call(i, i.media, "volumechange", t => Nt.updateVolume.call(i, t)), pt.call(i, i.media, "playing play pause ended emptied timeupdate", t => Xt.checkPlaying.call(i, t)), pt.call(i, i.media, "waiting canplay seeked playing", t => Xt.checkLoading.call(i, t)), i.supported.ui && i.config.clickToPlay && !i.isAudio) {
                        const e = at.call(i, `.${i.config.classNames.video}`);
                        if (!D(e)) return;
                        pt.call(i, s.container, "click", t => {
                            ([s.container, e].includes(t.target) || e.contains(t.target)) && (i.touch && i.config.hideControls || (i.ended ? (this.proxy(t, i.restart, "restart"), this.proxy(t, () => {
                                yt(i.play())
                            }, "play")) : this.proxy(t, () => {
                                yt(i.togglePlay())
                            }, "play")))
                        })
                    }
                    i.supported.ui && i.config.disableContextMenu && pt.call(i, s.wrapper, "contextmenu", t => {
                        t.preventDefault()
                    }, !1), pt.call(i, i.media, "volumechange", () => {
                        i.storage.set({
                            volume: i.volume,
                            muted: i.muted
                        })
                    }), pt.call(i, i.media, "ratechange", () => {
                        Nt.updateSetting.call(i, "speed"), i.storage.set({
                            speed: i.speed
                        })
                    }), pt.call(i, i.media, "qualitychange", t => {
                        Nt.updateSetting.call(i, "quality", null, t.detail.quality)
                    }), pt.call(i, i.media, "ready qualitychange", () => {
                        Nt.setDownloadUrl.call(i)
                    });
                    const e = i.config.events.concat(["keyup", "keydown"]).join(" ");
                    pt.call(i, i.media, e, t => {
                        let {
                            detail: e = {}
                        } = t;
                        "error" === t.type && (e = i.media.error), ft.call(i, s.container, t.type, !0, e)
                    })
                }), n(this, "proxy", (t, e, i) => {
                    const {
                        player: s
                    } = this, o = s.config.listeners[i];
                    let n = !0;
                    z(o) && (n = o.call(s, t)), !1 !== n && z(e) && e.call(s, t)
                }), n(this, "bind", (t, e, i, s, o = !0) => {
                    var {
                        player: n
                    } = this, r = n.config.listeners[s], r = z(r);
                    pt.call(n, t, e, t => this.proxy(t, i, s), o && !r)
                }), n(this, "controls", () => {
                    const {
                        player: r
                    } = this, {
                        elements: s
                    } = r, e = V.isIE ? "change" : "input";
                    if (s.buttons.play && Array.from(s.buttons.play).forEach(t => {
                            this.bind(t, "click", () => {
                                yt(r.togglePlay())
                            }, "play")
                        }), this.bind(s.buttons.restart, "click", r.restart, "restart"), this.bind(s.buttons.rewind, "click", () => {
                            r.lastSeekTime = Date.now(), r.rewind()
                        }, "rewind"), this.bind(s.buttons.fastForward, "click", () => {
                            r.lastSeekTime = Date.now(), r.forward()
                        }, "fastForward"), this.bind(s.buttons.mute, "click", () => {
                            r.muted = !r.muted
                        }, "mute"), this.bind(s.buttons.captions, "click", () => r.toggleCaptions()), this.bind(s.buttons.download, "click", () => {
                            ft.call(r, r.media, "download")
                        }, "download"), this.bind(s.buttons.fullscreen, "click", () => {
                            r.fullscreen.toggle()
                        }, "fullscreen"), this.bind(s.buttons.pip, "click", () => {
                            r.pip = "toggle"
                        }, "pip"), this.bind(s.buttons.airplay, "click", r.airplay, "airplay"), this.bind(s.buttons.settings, "click", t => {
                            t.stopPropagation(), t.preventDefault(), Nt.toggleMenu.call(r, t)
                        }, null, !1), this.bind(s.buttons.settings, "keyup", t => {
                            var e = t.which;
                            [13, 32].includes(e) && (13 !== e ? (t.preventDefault(), t.stopPropagation(), Nt.toggleMenu.call(r, t)) : Nt.focusFirstMenuItem.call(r, null, !0))
                        }, null, !1), this.bind(s.settings.menu, "keydown", t => {
                            27 === t.which && Nt.toggleMenu.call(r, t)
                        }), this.bind(s.inputs.seek, "mousedown mousemove", t => {
                            var e = s.progress.getBoundingClientRect(),
                                e = 100 / e.width * (t.pageX - e.left);
                            t.currentTarget.setAttribute("seek-value", e)
                        }), this.bind(s.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", t => {
                            const e = t.currentTarget,
                                i = t.keyCode || t.which,
                                s = "play-on-seeked";
                            var o;
                            N(t) && 39 !== i && 37 !== i || (r.lastSeekTime = Date.now(), o = e.hasAttribute(s), t = ["mouseup", "touchend", "keyup"].includes(t.type), o && t ? (e.removeAttribute(s), yt(r.play())) : !t && r.playing && (e.setAttribute(s, ""), r.pause()))
                        }), V.isIos) {
                        const s = rt.call(r, 'input[type="range"]');
                        Array.from(s).forEach(t => this.bind(t, e, t => B(t.target)))
                    }
                    this.bind(s.inputs.seek, e, t => {
                        const e = t.currentTarget;
                        let i = e.getAttribute("seek-value");
                        W(i) && (i = e.value), e.removeAttribute("seek-value"), r.currentTime = i / e.max * r.duration
                    }, "seek"), this.bind(s.progress, "mouseenter mouseleave mousemove", t => Nt.updateSeekTooltip.call(r, t)), this.bind(s.progress, "mousemove touchmove", t => {
                        const {
                            previewThumbnails: e
                        } = r;
                        e && e.loaded && e.startMove(t)
                    }), this.bind(s.progress, "mouseleave touchend click", () => {
                        const {
                            previewThumbnails: t
                        } = r;
                        t && t.loaded && t.endMove(!1, !0)
                    }), this.bind(s.progress, "mousedown touchstart", t => {
                        const {
                            previewThumbnails: e
                        } = r;
                        e && e.loaded && e.startScrubbing(t)
                    }), this.bind(s.progress, "mouseup touchend", t => {
                        const {
                            previewThumbnails: e
                        } = r;
                        e && e.loaded && e.endScrubbing(t)
                    }), V.isWebkit && Array.from(rt.call(r, 'input[type="range"]')).forEach(t => {
                        this.bind(t, "input", t => Nt.updateRangeFill.call(r, t.target))
                    }), r.config.toggleInvert && !D(s.display.duration) && this.bind(s.display.currentTime, "click", () => {
                        0 !== r.currentTime && (r.config.invertTime = !r.config.invertTime, Nt.timeUpdate.call(r))
                    }), this.bind(s.inputs.volume, e, t => {
                        r.volume = t.target.value
                    }, "volume"), this.bind(s.controls, "mouseenter mouseleave", t => {
                        s.controls.hover = !r.touch && "mouseenter" === t.type
                    }), s.fullscreen && Array.from(s.fullscreen.children).filter(t => !t.contains(s.container)).forEach(t => {
                        this.bind(t, "mouseenter mouseleave", t => {
                            s.controls.hover = !r.touch && "mouseenter" === t.type
                        })
                    }), this.bind(s.controls, "mousedown mouseup touchstart touchend touchcancel", t => {
                        s.controls.pressed = ["mousedown", "touchstart"].includes(t.type)
                    }), this.bind(s.controls, "focusin", () => {
                        const {
                            config: t,
                            timers: e
                        } = r;
                        st(s.controls, t.classNames.noTransition, !0), Xt.toggleControls.call(r, !0), setTimeout(() => {
                            st(s.controls, t.classNames.noTransition, !1)
                        }, 0);
                        var i = this.touch ? 3e3 : 4e3;
                        clearTimeout(e.controls), e.controls = setTimeout(() => Xt.toggleControls.call(r, !1), i)
                    }), this.bind(s.inputs.volume, "wheel", t => {
                        const e = t.webkitDirectionInvertedFromDevice,
                            [i, s] = [t.deltaX, -t.deltaY].map(t => e ? -t : t),
                            o = Math.sign(Math.abs(i) > Math.abs(s) ? i : s);
                        r.increaseVolume(o / 50);
                        var {
                            volume: n
                        } = r.media;
                        (1 === o && n < 1 || -1 === o && 0 < n) && t.preventDefault()
                    }, "volume", !1)
                }), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this)
            }
            handleKey(t) {
                const {
                    player: e
                } = this, {
                    elements: i
                } = e, s = t.keyCode || t.which, o = "keydown" === t.type, n = o && s === this.lastKey;
                if (!(t.altKey || t.ctrlKey || t.metaKey || t.shiftKey) && I(s))
                    if (o) {
                        const o = document.activeElement;
                        if (D(o)) {
                            const {
                                editable: s
                            } = e.config.selectors, {
                                seek: n
                            } = i.inputs;
                            if (o !== n && nt(o, s)) return;
                            if (32 === t.which && nt(o, 'button, [role^="menuitem"]')) return
                        }
                        switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(s) && (t.preventDefault(), t.stopPropagation()), s) {
                            case 48:
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                                n || (e.currentTime = e.duration / 10 * (s - 48));
                                break;
                            case 32:
                            case 75:
                                n || yt(e.togglePlay());
                                break;
                            case 38:
                                e.increaseVolume(.1);
                                break;
                            case 40:
                                e.decreaseVolume(.1);
                                break;
                            case 77:
                                n || (e.muted = !e.muted);
                                break;
                            case 39:
                                e.forward();
                                break;
                            case 37:
                                e.rewind();
                                break;
                            case 70:
                                e.fullscreen.toggle();
                                break;
                            case 67:
                                n || e.toggleCaptions();
                                break;
                            case 76:
                                e.loop = !e.loop
                        }
                        27 === s && !e.fullscreen.usingNative && e.fullscreen.active && e.fullscreen.toggle(), this.lastKey = s
                    } else this.lastKey = null
            }
            toggleMenu(t) {
                Nt.toggleMenu.call(this.player, t)
            }
        }
        var Zt, Jt = (0, function() {
            var p = function() {},
                r = {},
                l = {},
                h = {};

            function a(t, e) {
                if (t) {
                    var i = h[t];
                    if (l[t] = e, i)
                        for (; i.length;) i[0](t, e), i.splice(0, 1)
                }
            }

            function c(t, e) {
                t.call && (t = {
                    success: t
                }), e.length ? (t.error || p)(e) : (t.success || p)(t)
            }

            function u(t, s, e) {
                for (var o = (t = t.push ? t : [t]).length, i = o, n = [], r = function(t, e, i) {
                        if ("e" == e && n.push(t), "b" == e) {
                            if (!i) return;
                            n.push(t)
                        }--o || s(n)
                    }, a = 0; a < i; a++) ! function i(s, o, n, r) {
                    var a, l, t = document,
                        e = n.async,
                        h = (n.numRetries || 0) + 1,
                        c = n.before || p,
                        u = s.replace(/[\?|#].*$/, ""),
                        d = s.replace(/^(css|img)!/, "");
                    r = r || 0, /(^css!|\.css$)/.test(u) ? ((l = t.createElement("link")).rel = "stylesheet", l.href = d, (a = "hideFocus" in l) && l.relList && (a = 0, l.rel = "preload", l.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(u) ? (l = t.createElement("img")).src = d : ((l = t.createElement("script")).src = s, l.async = void 0 === e || e), l.onload = l.onerror = l.onbeforeload = function(t) {
                        var e = t.type[0];
                        if (a) try {
                            l.sheet.cssText.length || (e = "e")
                        } catch (t) {
                            18 != t.code && (e = "e")
                        }
                        if ("e" == e) {
                            if ((r += 1) < h) return i(s, o, n, r)
                        } else if ("preload" == l.rel && "style" == l.as) return l.rel = "stylesheet";
                        o(s, e, t.defaultPrevented)
                    }, !1 !== c(s, l) && t.head.appendChild(l)
                }(t[a], r, e)
            }

            function i(t, e, i) {
                var s, o;
                if (e && e.trim && (s = e), o = (s ? i : e) || {}, s) {
                    if (s in r) throw "LoadJS";
                    r[s] = !0
                }

                function n(e, i) {
                    u(t, function(t) {
                        c(o, t), e && c({
                            success: e,
                            error: i
                        }, t), a(s, t)
                    }, o)
                }
                if (o.returnPromise) return new Promise(n);
                n()
            }
            return i.ready = function(t, e) {
                return function(t, i) {
                    t = t.push ? t : [t];
                    for (var e, s, o = [], n = t.length, r = n, a = function(t, e) {
                            e.length && o.push(t), --r || i(o)
                        }; n--;) e = t[n], (s = l[e]) ? a(e, s) : (h[e] = h[e] || []).push(a)
                }(t, function(t) {
                    c(e, t)
                }), i
            }, i.done = function(t) {
                a(t, [])
            }, i.reset = function() {
                r = {}, l = {}, h = {}
            }, i.isDefined = function(t) {
                return t in r
            }, i
        }());

        function te(i) {
            return new Promise((t, e) => {
                Jt(i, {
                    success: t,
                    error: e
                })
            })
        }

        function ee(t) {
            t && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === t && (this.media.paused = !t, ft.call(this, this.media, t ? "play" : "pause"))
        }
        const ie = {
            setup() {
                const e = this;
                st(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, St.call(e), M(window.Vimeo) ? ie.ready.call(e) : te(e.config.urls.vimeo.sdk).then(() => {
                    ie.ready.call(e)
                }).catch(t => {
                    e.debug.warn("Vimeo SDK (player.js) failed to load", t)
                })
            },
            ready() {
                const r = this,
                    t = r.config.vimeo,
                    {
                        premium: e,
                        referrerPolicy: i,
                        ...s
                    } = t;
                e && Object.assign(s, {
                    controls: !1,
                    sidedock: !1
                });
                var o = Ft({
                    loop: r.config.loop.active,
                    autoplay: r.autoplay,
                    muted: r.muted,
                    gesture: "media",
                    playsinline: !this.config.fullscreen.iosNative,
                    ...s
                });
                let n = r.media.getAttribute("src");
                W(n) && (n = r.media.getAttribute(r.config.attributes.embed.id));
                var a, a = W(a = n) ? null : !I(Number(a)) && a.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : a;
                const l = X("iframe"),
                    h = At(r.config.urls.vimeo.iframe, a, o);
                if (l.setAttribute("src", h), l.setAttribute("allowfullscreen", ""), l.setAttribute("allow", ["autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope"].join("; ")), W(i) || l.setAttribute("referrerPolicy", i), e || !t.customControls) l.setAttribute("data-poster", r.poster), r.media = tt(l, r.media);
                else {
                    const t = X("div", {
                        class: r.config.classNames.embedContainer,
                        "data-poster": r.poster
                    });
                    t.appendChild(l), r.media = tt(t, r.media)
                }
                t.customControls || jt(At(r.config.urls.vimeo.api, h)).then(t => {
                    !W(t) && t.thumbnail_url && Xt.setPoster.call(r, t.thumbnail_url).catch(() => {})
                }), r.embed = new window.Vimeo.Player(l, {
                    autopause: r.config.autopause,
                    muted: r.muted
                }), r.media.paused = !0, r.media.currentTime = 0, r.supported.ui && r.embed.disableTextTrack(), r.media.play = () => (ee.call(r, !0), r.embed.play()), r.media.pause = () => (ee.call(r, !1), r.embed.pause()), r.media.stop = () => {
                    r.pause(), r.currentTime = 0
                };
                let {
                    currentTime: c
                } = r.media;
                Object.defineProperty(r.media, "currentTime", {
                    get: () => c,
                    set(t) {
                        const {
                            embed: e,
                            media: i,
                            paused: s,
                            volume: o
                        } = r, n = s && !e.hasPlayed;
                        i.seeking = !0, ft.call(r, i, "seeking"), Promise.resolve(n && e.setVolume(0)).then(() => e.setCurrentTime(t)).then(() => n && e.pause()).then(() => n && e.setVolume(o)).catch(() => {})
                    }
                });
                let u = r.config.speed.selected;
                Object.defineProperty(r.media, "playbackRate", {
                    get: () => u,
                    set(t) {
                        r.embed.setPlaybackRate(t).then(() => {
                            u = t, ft.call(r, r.media, "ratechange")
                        }).catch(() => {
                            r.options.speed = [1]
                        })
                    }
                });
                let {
                    volume: d
                } = r.config;
                Object.defineProperty(r.media, "volume", {
                    get: () => d,
                    set(t) {
                        r.embed.setVolume(t).then(() => {
                            d = t, ft.call(r, r.media, "volumechange")
                        })
                    }
                });
                let {
                    muted: p
                } = r.config;
                Object.defineProperty(r.media, "muted", {
                    get: () => p,
                    set(t) {
                        const e = !!P(t) && t;
                        r.embed.setVolume(e ? 0 : r.config.volume).then(() => {
                            p = e, ft.call(r, r.media, "volumechange")
                        })
                    }
                });
                let m, {
                    loop: g
                } = r.config;
                Object.defineProperty(r.media, "loop", {
                    get: () => g,
                    set(t) {
                        const e = P(t) ? t : r.config.loop.active;
                        r.embed.setLoop(e).then(() => {
                            g = e
                        })
                    }
                }), r.embed.getVideoUrl().then(t => {
                    m = t, Nt.setDownloadUrl.call(r)
                }).catch(t => {
                    this.debug.warn(t)
                }), Object.defineProperty(r.media, "currentSrc", {
                    get: () => m
                }), Object.defineProperty(r.media, "ended", {
                    get: () => r.currentTime === r.duration
                }), Promise.all([r.embed.getVideoWidth(), r.embed.getVideoHeight()]).then(t => {
                    var [e, t] = t;
                    r.embed.ratio = Ct(e, t), St.call(this)
                }), r.embed.setAutopause(r.config.autopause).then(t => {
                    r.config.autopause = t
                }), r.embed.getVideoTitle().then(t => {
                    r.config.title = t, Xt.setTitle.call(this)
                }), r.embed.getCurrentTime().then(t => {
                    c = t, ft.call(r, r.media, "timeupdate")
                }), r.embed.getDuration().then(t => {
                    r.media.duration = t, ft.call(r, r.media, "durationchange")
                }), r.embed.getTextTracks().then(t => {
                    r.media.textTracks = t, Wt.setup.call(r)
                }), r.embed.on("cuechange", ({
                    cues: t = []
                }) => {
                    t = t.map(t => function(t) {
                        const e = document.createDocumentFragment(),
                            i = document.createElement("div");
                        return e.appendChild(i), i.innerHTML = t, e.firstChild.innerText
                    }(t.text));
                    Wt.updateCues.call(r, t)
                }), r.embed.on("loaded", () => {
                    r.embed.getPaused().then(t => {
                        ee.call(r, !t), t || ft.call(r, r.media, "playing")
                    }), D(r.embed.element) && r.supported.ui && r.embed.element.setAttribute("tabindex", -1)
                }), r.embed.on("bufferstart", () => {
                    ft.call(r, r.media, "waiting")
                }), r.embed.on("bufferend", () => {
                    ft.call(r, r.media, "playing")
                }), r.embed.on("play", () => {
                    ee.call(r, !0), ft.call(r, r.media, "playing")
                }), r.embed.on("pause", () => {
                    ee.call(r, !1)
                }), r.embed.on("timeupdate", t => {
                    r.media.seeking = !1, c = t.seconds, ft.call(r, r.media, "timeupdate")
                }), r.embed.on("progress", t => {
                    r.media.buffered = t.percent, ft.call(r, r.media, "progress"), 1 === parseInt(t.percent, 10) && ft.call(r, r.media, "canplaythrough"), r.embed.getDuration().then(t => {
                        t !== r.media.duration && (r.media.duration = t, ft.call(r, r.media, "durationchange"))
                    })
                }), r.embed.on("seeked", () => {
                    r.media.seeking = !1, ft.call(r, r.media, "seeked")
                }), r.embed.on("ended", () => {
                    r.media.paused = !0, ft.call(r, r.media, "ended")
                }), r.embed.on("error", t => {
                    r.media.error = t, ft.call(r, r.media, "error")
                }), t.customControls && setTimeout(() => Xt.build.call(r), 0)
            }
        };

        function se(t) {
            t && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === t && (this.media.paused = !t, ft.call(this, this.media, t ? "play" : "pause"))
        }
        const oe = {
                setup() {
                    if (st(this.elements.wrapper, this.config.classNames.embed, !0), M(window.YT) && z(window.YT.Player)) oe.ready.call(this);
                    else {
                        const t = window.onYouTubeIframeAPIReady;
                        window.onYouTubeIframeAPIReady = () => {
                            z(t) && t(), oe.ready.call(this)
                        }, te(this.config.urls.youtube.sdk).catch(t => {
                            this.debug.warn("YouTube API failed to load", t)
                        })
                    }
                },
                getTitle(t) {
                    jt(At(this.config.urls.youtube.api, t)).then(t => {
                        var e, i;
                        M(t) && ({
                            title: e,
                            height: i,
                            width: t
                        } = t, this.config.title = e, Xt.setTitle.call(this), this.embed.ratio = Ct(t, i)), St.call(this)
                    }).catch(() => {
                        St.call(this)
                    })
                },
                ready() {
                    const n = this,
                        r = n.config.youtube,
                        t = n.media && n.media.getAttribute("id");
                    if (W(t) || !t.startsWith("youtube-")) {
                        let t = n.media.getAttribute("src");
                        W(t) && (t = n.media.getAttribute(this.config.attributes.embed.id));
                        const a = W(e = t) ? null : e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : e;
                        var e = X("div", {
                            id: `${n.provider}-${Math.floor(1e4*Math.random())}`,
                            "data-poster": r.customControls ? n.poster : void 0
                        });
                        if (n.media = tt(e, n.media), r.customControls) {
                            const r = t => `https://i.ytimg.com/vi/${a}/${t}default.jpg`;
                            Gt(r("maxres"), 121).catch(() => Gt(r("sd"), 121)).catch(() => Gt(r("hq"))).then(t => Xt.setPoster.call(n, t.src)).then(t => {
                                t.includes("maxres") || (n.elements.poster.style.backgroundSize = "cover")
                            }).catch(() => {})
                        }
                        n.embed = new window.YT.Player(n.media, {
                            videoId: a,
                            host: r.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0,
                            playerVars: Y({}, {
                                autoplay: n.config.autoplay ? 1 : 0,
                                hl: n.config.hl,
                                controls: n.supported.ui && r.customControls ? 0 : 1,
                                disablekb: 1,
                                playsinline: n.config.fullscreen.iosNative ? 0 : 1,
                                cc_load_policy: n.captions.active ? 1 : 0,
                                cc_lang_pref: n.config.captions.language,
                                widget_referrer: window ? window.location.href : null
                            }, r),
                            events: {
                                onError(t) {
                                    var e;
                                    n.media.error || (t = {
                                        2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                                        5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                                        100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                                        101: "The owner of the requested video does not allow it to be played in embedded players.",
                                        150: "The owner of the requested video does not allow it to be played in embedded players."
                                    } [e = t.data] || "An unknown error occured", n.media.error = {
                                        code: e,
                                        message: t
                                    }, ft.call(n, n.media, "error"))
                                },
                                onPlaybackRateChange(t) {
                                    const e = t.target;
                                    n.media.playbackRate = e.getPlaybackRate(), ft.call(n, n.media, "ratechange")
                                },
                                onReady(t) {
                                    if (!z(n.media.play)) {
                                        const s = t.target;
                                        oe.getTitle.call(n, a), n.media.play = () => {
                                            se.call(n, !0), s.playVideo()
                                        }, n.media.pause = () => {
                                            se.call(n, !1), s.pauseVideo()
                                        }, n.media.stop = () => {
                                            s.stopVideo()
                                        }, n.media.duration = s.getDuration(), n.media.paused = !0, n.media.currentTime = 0, Object.defineProperty(n.media, "currentTime", {
                                            get: () => Number(s.getCurrentTime()),
                                            set(t) {
                                                n.paused && !n.embed.hasPlayed && n.embed.mute(), n.media.seeking = !0, ft.call(n, n.media, "seeking"), s.seekTo(t)
                                            }
                                        }), Object.defineProperty(n.media, "playbackRate", {
                                            get: () => s.getPlaybackRate(),
                                            set(t) {
                                                s.setPlaybackRate(t)
                                            }
                                        });
                                        let {
                                            volume: e
                                        } = n.config;
                                        Object.defineProperty(n.media, "volume", {
                                            get: () => e,
                                            set(t) {
                                                e = t, s.setVolume(100 * e), ft.call(n, n.media, "volumechange")
                                            }
                                        });
                                        let {
                                            muted: i
                                        } = n.config;
                                        Object.defineProperty(n.media, "muted", {
                                            get: () => i,
                                            set(t) {
                                                t = P(t) ? t : i;
                                                i = t, s[t ? "mute" : "unMute"](), s.setVolume(100 * e), ft.call(n, n.media, "volumechange")
                                            }
                                        }), Object.defineProperty(n.media, "currentSrc", {
                                            get: () => s.getVideoUrl()
                                        }), Object.defineProperty(n.media, "ended", {
                                            get: () => n.currentTime === n.duration
                                        });
                                        const o = s.getAvailablePlaybackRates();
                                        n.options.speed = o.filter(t => n.config.speed.options.includes(t)), n.supported.ui && r.customControls && n.media.setAttribute("tabindex", -1), ft.call(n, n.media, "timeupdate"), ft.call(n, n.media, "durationchange"), clearInterval(n.timers.buffering), n.timers.buffering = setInterval(() => {
                                            n.media.buffered = s.getVideoLoadedFraction(), (null === n.media.lastBuffered || n.media.lastBuffered < n.media.buffered) && ft.call(n, n.media, "progress"), n.media.lastBuffered = n.media.buffered, 1 === n.media.buffered && (clearInterval(n.timers.buffering), ft.call(n, n.media, "canplaythrough"))
                                        }, 200), r.customControls && setTimeout(() => Xt.build.call(n), 50)
                                    }
                                },
                                onStateChange(t) {
                                    const e = t.target;
                                    switch (clearInterval(n.timers.playing), n.media.seeking && [1, 2].includes(t.data) && (n.media.seeking = !1, ft.call(n, n.media, "seeked")), t.data) {
                                        case -1:
                                            ft.call(n, n.media, "timeupdate"), n.media.buffered = e.getVideoLoadedFraction(), ft.call(n, n.media, "progress");
                                            break;
                                        case 0:
                                            se.call(n, !1), n.media.loop ? (e.stopVideo(), e.playVideo()) : ft.call(n, n.media, "ended");
                                            break;
                                        case 1:
                                            r.customControls && !n.config.autoplay && n.media.paused && !n.embed.hasPlayed ? n.media.pause() : (se.call(n, !0), ft.call(n, n.media, "playing"), n.timers.playing = setInterval(() => {
                                                ft.call(n, n.media, "timeupdate")
                                            }, 50), n.media.duration !== e.getDuration() && (n.media.duration = e.getDuration(), ft.call(n, n.media, "durationchange")));
                                            break;
                                        case 2:
                                            n.muted || n.embed.unMute(), se.call(n, !1);
                                            break;
                                        case 3:
                                            ft.call(n, n.media, "waiting")
                                    }
                                    ft.call(n, n.elements.container, "statechange", !1, {
                                        code: t.data
                                    })
                                }
                            }
                        })
                    }
                }
            },
            ne = {
                setup() {
                    this.media ? (st(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), st(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && st(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = X("div", {
                        class: this.config.classNames.video
                    }), Q(this.media, this.elements.wrapper), this.elements.poster = X("div", {
                        class: this.config.classNames.poster
                    }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? kt.setup.call(this) : this.isYouTube ? oe.setup.call(this) : this.isVimeo && ie.setup.call(this)) : this.debug.warn("No media element found!")
                }
            };
        class re {
            constructor(t) {
                n(this, "load", () => {
                    this.enabled && (M(window.google) && M(window.google.ima) ? this.ready() : te(this.player.config.urls.googleIMA.sdk).then(() => {
                        this.ready()
                    }).catch(() => {
                        this.trigger("error", new Error("Google IMA SDK failed to load"))
                    }))
                }), n(this, "ready", () => {
                    this.enabled || (this.manager && this.manager.destroy(), this.elements.displayContainer && this.elements.displayContainer.destroy(), this.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(() => {
                        this.clearSafetyTimer("onAdsManagerLoaded()")
                    }), this.listeners(), this.setupIMA()
                }), n(this, "setupIMA", () => {
                    this.elements.container = X("div", {
                        class: this.player.config.classNames.ads
                    }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, t => this.onAdsManagerLoaded(t), !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, t => this.onAdError(t), !1), this.requestAds()
                }), n(this, "requestAds", () => {
                    var {
                        container: t
                    } = this.player.elements;
                    try {
                        const e = new google.ima.AdsRequest;
                        e.adTagUrl = this.tagUrl, e.linearAdSlotWidth = t.offsetWidth, e.linearAdSlotHeight = t.offsetHeight, e.nonLinearAdSlotWidth = t.offsetWidth, e.nonLinearAdSlotHeight = t.offsetHeight, e.forceNonLinearFullSlot = !1, e.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(e)
                    } catch (t) {
                        this.onAdError(t)
                    }
                }), n(this, "pollCountdown", (t = !1) => t ? void(this.countdownTimer = setInterval(() => {
                    var t = qt(Math.max(this.manager.getRemainingTime(), 0)),
                        t = `${Pt.get("advertisement",this.player.config)} - ${t}`;
                    this.elements.container.setAttribute("data-badge-text", t)
                }, 100)) : (clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text"))), n(this, "onAdsManagerLoaded", t => {
                    if (this.enabled) {
                        const e = new google.ima.AdsRenderingSettings;
                        e.restoreCustomPlaybackStateOnAdBreakComplete = !0, e.enablePreloading = !0, this.manager = t.getAdsManager(this.player, e), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, t => this.onAdError(t)), Object.keys(google.ima.AdEvent.Type).forEach(t => {
                            this.manager.addEventListener(google.ima.AdEvent.Type[t], t => this.onAdEvent(t))
                        }), this.trigger("loaded")
                    }
                }), n(this, "addCuePoints", () => {
                    W(this.cuePoints) || this.cuePoints.forEach(t => {
                        if (0 !== t && -1 !== t && t < this.player.duration) {
                            const e = this.player.elements.progress;
                            if (D(e)) {
                                const i = 100 / this.player.duration * t,
                                    s = X("span", {
                                        class: this.player.config.classNames.cues
                                    });
                                s.style.left = `${i.toString()}%`, e.appendChild(s)
                            }
                        }
                    })
                }), n(this, "onAdEvent", t => {
                    const {
                        container: e
                    } = this.player.elements, i = t.getAd(), s = t.getAdData();
                    switch (o = t.type, ft.call(this.player, this.player.media, `ads${o.replace(/_/g,"").toLowerCase()}`), t.type) {
                        case google.ima.AdEvent.Type.LOADED:
                            this.trigger("loaded"), this.pollCountdown(!0), i.isLinear() || (i.width = e.offsetWidth, i.height = e.offsetHeight);
                            break;
                        case google.ima.AdEvent.Type.STARTED:
                            this.manager.setVolume(this.player.volume);
                            break;
                        case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                            this.player.ended ? this.loadAds() : this.loader.contentComplete();
                            break;
                        case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                            this.pauseContent();
                            break;
                        case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                            this.pollCountdown(), this.resumeContent();
                            break;
                        case google.ima.AdEvent.Type.LOG:
                            s.adError && this.player.debug.warn(`Non-fatal ad error: ${s.adError.getMessage()}`)
                    }
                    var o
                }), n(this, "onAdError", t => {
                    this.cancel(), this.player.debug.warn("Ads error", t)
                }), n(this, "listeners", () => {
                    const {
                        container: t
                    } = this.player.elements;
                    let s;
                    this.player.on("canplay", () => {
                        this.addCuePoints()
                    }), this.player.on("ended", () => {
                        this.loader.contentComplete()
                    }), this.player.on("timeupdate", () => {
                        s = this.player.currentTime
                    }), this.player.on("seeked", () => {
                        const i = this.player.currentTime;
                        W(this.cuePoints) || this.cuePoints.forEach((t, e) => {
                            s < t && t < i && (this.manager.discardAdBreak(), this.cuePoints.splice(e, 1))
                        })
                    }), window.addEventListener("resize", () => {
                        this.manager && this.manager.resize(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL)
                    })
                }), n(this, "play", () => {
                    const {
                        container: t
                    } = this.player.elements;
                    this.managerPromise || this.resumeContent(), this.managerPromise.then(() => {
                        this.manager.setVolume(this.player.volume), this.elements.displayContainer.initialize();
                        try {
                            this.initialized || (this.manager.init(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL), this.manager.start()), this.initialized = !0
                        } catch (t) {
                            this.onAdError(t)
                        }
                    }).catch(() => {})
                }), n(this, "resumeContent", () => {
                    this.elements.container.style.zIndex = "", this.playing = !1, yt(this.player.media.play())
                }), n(this, "pauseContent", () => {
                    this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause()
                }), n(this, "cancel", () => {
                    this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds()
                }), n(this, "loadAds", () => {
                    this.managerPromise.then(() => {
                        this.manager && this.manager.destroy(), this.managerPromise = new Promise(t => {
                            this.on("loaded", t), this.player.debug.log(this.manager)
                        }), this.initialized = !1, this.requestAds()
                    }).catch(() => {})
                }), n(this, "trigger", (t, ...e) => {
                    const i = this.events[t];
                    j(i) && i.forEach(t => {
                        z(t) && t.apply(this, e)
                    })
                }), n(this, "on", (t, e) => (j(this.events[t]) || (this.events[t] = []), this.events[t].push(e), this)), n(this, "startSafetyTimer", (t, e) => {
                    this.player.debug.log(`Safety timer invoked from: ${e}`), this.safetyTimer = setTimeout(() => {
                        this.cancel(), this.clearSafetyTimer("startSafetyTimer()")
                    }, t)
                }), n(this, "clearSafetyTimer", t => {
                    E(this.safetyTimer) || (this.player.debug.log(`Safety timer cleared from: ${t}`), clearTimeout(this.safetyTimer), this.safetyTimer = null)
                }), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
                    container: null,
                    displayContainer: null
                }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise((t, e) => {
                    this.on("loaded", t), this.on("error", e)
                }), this.load()
            }
            get enabled() {
                var {
                    config: t
                } = this;
                return this.player.isHTML5 && this.player.isVideo && t.enabled && (!W(t.publisherId) || F(t.tagUrl))
            }
            get tagUrl() {
                var {
                    config: t
                } = this;
                return F(t.tagUrl) ? t.tagUrl : `https://go.aniview.com/api/adserver6/vast/?${Ft({AV_PUBLISHERID:"58c25bb0073ef448b1087ad6",AV_CHANNELID:"5a0458dc28a06145e4519d21",AV_URL:window.location.hostname,cb:Date.now(),AV_WIDTH:640,AV_HEIGHT:480,AV_CDIM2:t.publisherId})}`
            }
        }
        const ae = (t, e) => {
            const i = {};
            return t > e.width / e.height ? (i.width = e.width, i.height = 1 / t * e.width) : (i.height = e.height, i.width = t * e.height), i
        };
        class le {
            constructor(t) {
                n(this, "load", () => {
                    this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(() => {
                        this.enabled && (this.render(), this.determineContainerAutoSizing(), this.loaded = !0)
                    })
                }), n(this, "getThumbnails", () => new Promise(t => {
                    const {
                        src: e
                    } = this.player.config.previewThumbnails;
                    if (W(e)) throw new Error("Missing previewThumbnails.src config attribute");
                    const i = () => {
                        this.thumbnails.sort((t, e) => t.height - e.height), this.player.debug.log("Preview thumbnails", this.thumbnails), t()
                    };
                    if (z(e)) e(t => {
                        this.thumbnails = t, i()
                    });
                    else {
                        const t = (O(e) ? [e] : e).map(t => this.getThumbnail(t));
                        Promise.all(t).then(i)
                    }
                })), n(this, "getThumbnail", o => new Promise(s => {
                    jt(o).then(t => {
                        const e = {
                            frames: (t => {
                                const e = [];
                                return t.split(/\r\n\r\n|\n\n|\r\r/).forEach(t => {
                                    const i = {};
                                    t.split(/\r\n|\n|\r/).forEach(t => {
                                        if (I(i.startTime)) {
                                            if (!W(t.trim()) && W(i.text)) {
                                                const e = t.trim().split("#xywh=");
                                                [i.text] = e, e[1] && ([i.x, i.y, i.w, i.h] = e[1].split(","))
                                            }
                                        } else {
                                            t = t.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
                                            t && (i.startTime = 60 * Number(t[1] || 0) * 60 + 60 * Number(t[2]) + Number(t[3]) + Number(`0.${t[4]}`), i.endTime = 60 * Number(t[6] || 0) * 60 + 60 * Number(t[7]) + Number(t[8]) + Number(`0.${t[9]}`))
                                        }
                                    }), i.text && e.push(i)
                                }), e
                            })(t),
                            height: null,
                            urlPrefix: ""
                        };
                        e.frames[0].text.startsWith("/") || e.frames[0].text.startsWith("http://") || e.frames[0].text.startsWith("https://") || (e.urlPrefix = o.substring(0, o.lastIndexOf("/") + 1));
                        const i = new Image;
                        i.onload = () => {
                            e.height = i.naturalHeight, e.width = i.naturalWidth, this.thumbnails.push(e), s()
                        }, i.src = e.urlPrefix + e.frames[0].text
                    })
                })), n(this, "startMove", t => {
                    var e;
                    this.loaded && q(t) && ["touchmove", "mousemove"].includes(t.type) && this.player.media.duration && ("touchmove" === t.type ? this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100) : (e = 100 / (e = this.player.elements.progress.getBoundingClientRect()).width * (t.pageX - e.left), this.seekTime = this.player.media.duration * (e / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = t.pageX, this.elements.thumb.time.innerText = qt(this.seekTime)), this.showImageAtCurrentTime())
                }), n(this, "endMove", () => {
                    this.toggleThumbContainer(!1, !0)
                }), n(this, "startScrubbing", t => {
                    !E(t.button) && !1 !== t.button && 0 !== t.button || (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()))
                }), n(this, "endScrubbing", () => {
                    this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : gt.call(this.player, this.player.media, "timeupdate", () => {
                        this.mouseDown || this.toggleScrubbingContainer(!1)
                    })
                }), n(this, "listeners", () => {
                    this.player.on("play", () => {
                        this.toggleThumbContainer(!1, !0)
                    }), this.player.on("seeked", () => {
                        this.toggleThumbContainer(!1)
                    }), this.player.on("timeupdate", () => {
                        this.lastTime = this.player.media.currentTime
                    })
                }), n(this, "render", () => {
                    this.elements.thumb.container = X("div", {
                        class: this.player.config.classNames.previewThumbnails.thumbContainer
                    }), this.elements.thumb.imageContainer = X("div", {
                        class: this.player.config.classNames.previewThumbnails.imageContainer
                    }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
                    const t = X("div", {
                        class: this.player.config.classNames.previewThumbnails.timeContainer
                    });
                    this.elements.thumb.time = X("span", {}, "00:00"), t.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(t), D(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = X("div", {
                        class: this.player.config.classNames.previewThumbnails.scrubbingContainer
                    }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container)
                }), n(this, "destroy", () => {
                    this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove()
                }), n(this, "showImageAtCurrentTime", () => {
                    this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
                    const i = this.thumbnails[0].frames.findIndex(t => this.seekTime >= t.startTime && this.seekTime <= t.endTime),
                        t = 0 <= i;
                    let s = 0;
                    this.mouseDown || this.toggleThumbContainer(t), t && (this.thumbnails.forEach((t, e) => {
                        this.loadedImages.includes(t.frames[i].text) && (s = e)
                    }), i !== this.showingThumb && (this.showingThumb = i, this.loadImage(s)))
                }), n(this, "loadImage", (t = 0) => {
                    const e = this.showingThumb,
                        i = this.thumbnails[t],
                        {
                            urlPrefix: s
                        } = i,
                        o = i.frames[e],
                        n = i.frames[e].text,
                        r = s + n;
                    if (this.currentImageElement && this.currentImageElement.dataset.filename === n) this.showImage(this.currentImageElement, o, t, e, n, !1), this.currentImageElement.dataset.index = e, this.removeOldImages(this.currentImageElement);
                    else {
                        this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
                        const i = new Image;
                        i.src = r, i.dataset.index = e, i.dataset.filename = n, this.showingThumbFilename = n, this.player.debug.log(`Loading image: ${r}`), i.onload = () => this.showImage(i, o, t, e, n, !0), this.loadingImage = i, this.removeOldImages(i)
                    }
                }), n(this, "showImage", (t, e, i, s, o, n = !0) => {
                    this.player.debug.log(`Showing thumb: ${o}. num: ${s}. qual: ${i}. newimg: ${n}`), this.setImageSizeAndOffset(t, e), n && (this.currentImageContainer.appendChild(t), this.currentImageElement = t, this.loadedImages.includes(o) || this.loadedImages.push(o)), this.preloadNearby(s, !0).then(this.preloadNearby(s, !1)).then(this.getHigherQuality(i, t, e, o))
                }), n(this, "removeOldImages", i => {
                    Array.from(this.currentImageContainer.children).forEach(t => {
                        if ("img" === t.tagName.toLowerCase()) {
                            var e = this.usingSprites ? 500 : 1e3;
                            if (t.dataset.index !== i.dataset.index && !t.dataset.deleting) {
                                t.dataset.deleting = !0;
                                const {
                                    currentImageContainer: i
                                } = this;
                                setTimeout(() => {
                                    i.removeChild(t), this.player.debug.log(`Removing thumb: ${t.dataset.filename}`)
                                }, e)
                            }
                        }
                    })
                }), n(this, "preloadNearby", (e, i = !0) => new Promise(n => {
                    setTimeout(() => {
                        const o = this.thumbnails[0].frames[e].text;
                        if (this.showingThumbFilename === o) {
                            let t;
                            t = i ? this.thumbnails[0].frames.slice(e) : this.thumbnails[0].frames.slice(0, e).reverse();
                            let s = !1;
                            t.forEach(t => {
                                const e = t.text;
                                if (e !== o && !this.loadedImages.includes(e)) {
                                    s = !0, this.player.debug.log(`Preloading thumb filename: ${e}`);
                                    const {
                                        urlPrefix: t
                                    } = this.thumbnails[0], o = t + e, i = new Image;
                                    i.src = o, i.onload = () => {
                                        this.player.debug.log(`Preloaded thumb filename: ${e}`), this.loadedImages.includes(e) || this.loadedImages.push(e), n()
                                    }
                                }
                            }), s || n()
                        }
                    }, 300)
                })), n(this, "getHigherQuality", (e, i, s, o) => {
                    if (e < this.thumbnails.length - 1) {
                        let t = i.naturalHeight;
                        this.usingSprites && (t = s.h), t < this.thumbContainerHeight && setTimeout(() => {
                            this.showingThumbFilename === o && (this.player.debug.log(`Showing higher quality thumb for: ${o}`), this.loadImage(e + 1))
                        }, 300)
                    }
                }), n(this, "toggleThumbContainer", (t = !1, e = !1) => {
                    var i = this.player.config.classNames.previewThumbnails.thumbContainerShown;
                    this.elements.thumb.container.classList.toggle(i, t), !t && e && (this.showingThumb = null, this.showingThumbFilename = null)
                }), n(this, "toggleScrubbingContainer", (t = !1) => {
                    var e = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
                    this.elements.scrubbing.container.classList.toggle(e, t), t || (this.showingThumb = null, this.showingThumbFilename = null)
                }), n(this, "determineContainerAutoSizing", () => {
                    (20 < this.elements.thumb.imageContainer.clientHeight || 20 < this.elements.thumb.imageContainer.clientWidth) && (this.sizeSpecifiedInCSS = !0)
                }), n(this, "setThumbContainerSizeAndPos", () => {
                    var t, e;
                    this.sizeSpecifiedInCSS ? 20 < this.elements.thumb.imageContainer.clientHeight && this.elements.thumb.imageContainer.clientWidth < 20 ? (t = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio), this.elements.thumb.imageContainer.style.width = `${t}px`) : this.elements.thumb.imageContainer.clientHeight < 20 && 20 < this.elements.thumb.imageContainer.clientWidth && (e = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio), this.elements.thumb.imageContainer.style.height = `${e}px`) : (e = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio), this.elements.thumb.imageContainer.style.height = `${this.thumbContainerHeight}px`, this.elements.thumb.imageContainer.style.width = `${e}px`), this.setThumbContainerPos()
                }), n(this, "setThumbContainerPos", () => {
                    const t = this.player.elements.progress.getBoundingClientRect(),
                        e = this.player.elements.container.getBoundingClientRect(),
                        {
                            container: i
                        } = this.elements.thumb,
                        s = e.left - t.left + 10,
                        o = e.right - t.left - i.clientWidth - 10;
                    let n = this.mousePosX - t.left - i.clientWidth / 2;
                    n < s && (n = s), n > o && (n = o), i.style.left = `${n}px`
                }), n(this, "setScrubbingContainerSize", () => {
                    var {
                        width: t,
                        height: e
                    } = ae(this.thumbAspectRatio, {
                        width: this.player.media.clientWidth,
                        height: this.player.media.clientHeight
                    });
                    this.elements.scrubbing.container.style.width = `${t}px`, this.elements.scrubbing.container.style.height = `${e}px`
                }), n(this, "setImageSizeAndOffset", (t, e) => {
                    var i;
                    this.usingSprites && (i = this.thumbContainerHeight / e.h, t.style.height = t.naturalHeight * i + "px", t.style.width = t.naturalWidth * i + "px", t.style.left = `-${e.x*i}px`, t.style.top = `-${e.y*i}px`)
                }), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
                    thumb: {},
                    scrubbing: {}
                }, this.load()
            }
            get enabled() {
                return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled
            }
            get currentImageContainer() {
                return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer
            }
            get usingSprites() {
                return Object.keys(this.thumbnails[0].frames[0]).includes("w")
            }
            get thumbAspectRatio() {
                return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height
            }
            get thumbContainerHeight() {
                if (this.mouseDown) {
                    var {
                        height: t
                    } = ae(this.thumbAspectRatio, {
                        width: this.player.media.clientWidth,
                        height: this.player.media.clientHeight
                    });
                    return t
                }
                return this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4)
            }
            get currentImageElement() {
                return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement
            }
            set currentImageElement(t) {
                this.mouseDown ? this.currentScrubbingImageElement = t : this.currentThumbnailImageElement = t
            }
        }
        const he = {
            insertElements(e, t) {
                O(t) ? K(e, this.media, {
                    src: t
                }) : j(t) && t.forEach(t => {
                    K(e, this.media, t)
                })
            },
            change(n) {
                U(n, "sources.length") ? (kt.cancelRequests.call(this), this.destroy.call(this, () => {
                    this.options.quality = [], Z(this.media), this.media = null, D(this.elements.container) && this.elements.container.removeAttribute("class");
                    var {
                        sources: t,
                        type: e
                    } = n, [{
                        provider: i = Vt.html5,
                        src: s
                    }] = t, o = "html5" === i ? e : "div", s = "html5" === i ? {} : {
                        src: s
                    };
                    Object.assign(this, {
                        provider: i,
                        type: e,
                        supported: ct.check(e, i, this.config.playsinline),
                        media: X(o, s)
                    }), this.elements.container.appendChild(this.media), P(n.autoplay) && (this.config.autoplay = n.autoplay), this.isHTML5 && (this.config.crossorigin && this.media.setAttribute("crossorigin", ""), this.config.autoplay && this.media.setAttribute("autoplay", ""), W(n.poster) || (this.poster = n.poster), this.config.loop.active && this.media.setAttribute("loop", ""), this.config.muted && this.media.setAttribute("muted", ""), this.config.playsinline && this.media.setAttribute("playsinline", "")), Xt.addStyleHook.call(this), this.isHTML5 && he.insertElements.call(this, "source", t), this.config.title = n.title, ne.setup.call(this), this.isHTML5 && Object.keys(n).includes("tracks") && he.insertElements.call(this, "track", n.tracks), (this.isHTML5 || this.isEmbed && !this.supported.ui) && Xt.build.call(this), this.isHTML5 && this.media.load(), W(n.previewThumbnails) || (Object.assign(this.config.previewThumbnails, n.previewThumbnails), this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), this.config.previewThumbnails.enabled && (this.previewThumbnails = new le(this))), this.fullscreen.update()
                }, !0)) : this.debug.warn("Invalid source format")
            }
        };
        class ce {
            constructor(t, e) {
                if (n(this, "play", () => z(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(() => this.ads.play()).catch(() => yt(this.media.play())), this.media.play()) : null), n(this, "pause", () => this.playing && z(this.media.pause) ? this.media.pause() : null), n(this, "togglePlay", t => (P(t) ? t : !this.playing) ? this.play() : this.pause()), n(this, "stop", () => {
                        this.isHTML5 ? (this.pause(), this.restart()) : z(this.media.stop) && this.media.stop()
                    }), n(this, "restart", () => {
                        this.currentTime = 0
                    }), n(this, "rewind", t => {
                        this.currentTime -= I(t) ? t : this.config.seekTime
                    }), n(this, "forward", t => {
                        this.currentTime += I(t) ? t : this.config.seekTime
                    }), n(this, "increaseVolume", t => {
                        var e = this.media.muted ? 0 : this.volume;
                        this.volume = e + (I(t) ? t : 0)
                    }), n(this, "decreaseVolume", t => {
                        this.increaseVolume(-t)
                    }), n(this, "airplay", () => {
                        ct.airplay && this.media.webkitShowPlaybackTargetPicker()
                    }), n(this, "toggleControls", t => {
                        if (!this.supported.ui || this.isAudio) return !1;
                        var e = ot(this.elements.container, this.config.classNames.hideControls),
                            t = st(this.elements.container, this.config.classNames.hideControls, void 0 === t ? void 0 : !t);
                        if (t && j(this.config.controls) && this.config.controls.includes("settings") && !W(this.config.settings) && Nt.toggleMenu.call(this, !1), t !== e) {
                            const i = t ? "controlshidden" : "controlsshown";
                            ft.call(this, this.media, i)
                        }
                        return !t
                    }), n(this, "on", (t, e) => {
                        pt.call(this, this.elements.container, t, e)
                    }), n(this, "once", (t, e) => {
                        gt.call(this, this.elements.container, t, e)
                    }), n(this, "off", (t, e) => {
                        mt(this.elements.container, t, e)
                    }), n(this, "destroy", (t, e = !1) => {
                        var i;
                        this.ready && (i = () => {
                            document.body.style.overflow = "", this.embed = null, e ? (Object.keys(this.elements).length && (Z(this.elements.buttons.play), Z(this.elements.captions), Z(this.elements.controls), Z(this.elements.wrapper), this.elements.buttons.play = null, this.elements.captions = null, this.elements.controls = null, this.elements.wrapper = null), z(t) && t()) : (function() {
                                this && this.eventListeners && (this.eventListeners.forEach(t => {
                                    const {
                                        element: e,
                                        type: i,
                                        callback: s,
                                        options: o
                                    } = t;
                                    e.removeEventListener(i, s, o)
                                }), this.eventListeners = [])
                            }.call(this), kt.cancelRequests.call(this), tt(this.elements.original, this.elements.container), ft.call(this, this.elements.original, "destroyed", !0), z(t) && t.call(this.elements.original), this.ready = !1, setTimeout(() => {
                                this.elements = null, this.media = null
                            }, 200))
                        }, this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (Xt.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && z(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200)))
                    }), n(this, "supports", t => ct.mime.call(this, t)), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = ct.touch, this.media = t, O(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || L(this.media) || j(this.media)) && (this.media = this.media[0]), this.config = Y({}, Rt, ce.defaults, e || {}, (() => {
                        try {
                            return JSON.parse(this.media.getAttribute("data-plyr-config"))
                        } catch (t) {
                            return {}
                        }
                    })()), this.elements = {
                        container: null,
                        fullscreen: null,
                        captions: null,
                        buttons: {},
                        display: {},
                        progress: {},
                        inputs: {},
                        settings: {
                            popup: null,
                            menu: null,
                            panels: {},
                            buttons: {}
                        }
                    }, this.captions = {
                        active: null,
                        currentTrack: -1,
                        meta: new WeakMap
                    }, this.fullscreen = {
                        active: !1
                    }, this.options = {
                        speed: [],
                        quality: []
                    }, this.debug = new Yt(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", ct), !E(this.media) && D(this.media))
                    if (this.media.plyr) this.debug.warn("Target already setup");
                    else if (this.config.enabled)
                    if (ct.check().api) {
                        const o = this.media.cloneNode(!0);
                        o.autoplay = !1, this.elements.original = o;
                        var i, s = this.media.tagName.toLowerCase();
                        let t = null,
                            e = null;
                        switch (s) {
                            case "div":
                                if (t = this.media.querySelector("iframe"), D(t)) {
                                    if (e = Ht(t.getAttribute("src")), this.provider = (i = e.toString(), /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(i) ? Vt.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(i) ? Vt.vimeo : null), this.elements.container = this.media, this.media = t, this.elements.container.className = "", e.search.length) {
                                        const n = ["1", "true"];
                                        n.includes(e.searchParams.get("autoplay")) && (this.config.autoplay = !0), n.includes(e.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = n.includes(e.searchParams.get("playsinline")), this.config.youtube.hl = e.searchParams.get("hl")) : this.config.playsinline = !0
                                    }
                                } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
                                if (W(this.provider) || !Object.values(Vt).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
                                this.type = "video";
                                break;
                            case "video":
                            case "audio":
                                this.type = s, this.provider = Vt.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
                                break;
                            default:
                                return void this.debug.error("Setup failed: unsupported type")
                        }
                        this.supported = ct.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new Kt(this), this.storage = new zt(this), this.media.plyr = this, D(this.elements.container) || (this.elements.container = X("div", {
                            tabindex: 0
                        }), Q(this.media, this.elements.container)), Xt.migrateStyles.call(this), Xt.addStyleHook.call(this), ne.setup.call(this), this.config.debug && pt.call(this, this.elements.container, this.config.events.join(" "), t => {
                            this.debug.log(`event: ${t.type}`)
                        }), this.fullscreen = new Qt(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && Xt.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new re(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", () => yt(this.play())), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new le(this))) : this.debug.error("Setup failed: no support")
                    } else this.debug.error("Setup failed: no support");
                else this.debug.error("Setup failed: disabled by config");
                else this.debug.error("Setup failed: no suitable element passed")
            }
            get isHTML5() {
                return this.provider === Vt.html5
            }
            get isEmbed() {
                return this.isYouTube || this.isVimeo
            }
            get isYouTube() {
                return this.provider === Vt.youtube
            }
            get isVimeo() {
                return this.provider === Vt.vimeo
            }
            get isVideo() {
                return "video" === this.type
            }
            get isAudio() {
                return "audio" === this.type
            }
            get playing() {
                return Boolean(this.ready && !this.paused && !this.ended)
            }
            get paused() {
                return Boolean(this.media.paused)
            }
            get stopped() {
                return Boolean(this.paused && 0 === this.currentTime)
            }
            get ended() {
                return Boolean(this.media.ended)
            }
            set currentTime(t) {
                var e;
                this.duration && (e = I(t) && 0 < t, this.media.currentTime = e ? Math.min(t, this.duration) : 0, this.debug.log(`Seeking to ${this.currentTime} seconds`))
            }
            get currentTime() {
                return Number(this.media.currentTime)
            }
            get buffered() {
                const {
                    buffered: t
                } = this.media;
                return I(t) ? t : t && t.length && 0 < this.duration ? t.end(0) / this.duration : 0
            }
            get seeking() {
                return Boolean(this.media.seeking)
            }
            get duration() {
                var t = parseFloat(this.config.duration),
                    e = (this.media || {}).duration,
                    e = I(e) && e !== 1 / 0 ? e : 0;
                return t || e
            }
            set volume(t) {
                let e = t;
                O(e) && (e = Number(e)), I(e) || (e = this.storage.get("volume")), I(e) || ({
                    volume: e
                } = this.config), 1 < e && (e = 1), e < 0 && (e = 0), this.config.volume = e, this.media.volume = e, !W(t) && this.muted && 0 < e && (this.muted = !1)
            }
            get volume() {
                return Number(this.media.volume)
            }
            set muted(t) {
                let e = t;
                P(e) || (e = this.storage.get("muted")), P(e) || (e = this.config.muted), this.config.muted = e, this.media.muted = e
            }
            get muted() {
                return Boolean(this.media.muted)
            }
            get hasAudio() {
                return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)
            }
            set speed(t) {
                let e = null;
                I(t) && (e = t), I(e) || (e = this.storage.get("speed")), I(e) || (e = this.config.speed.selected);
                var {
                    minimumSpeed: i,
                    maximumSpeed: s
                } = this;
                e = ([t = 0, i = 0, s = 255] = [e, i, s], Math.min(Math.max(t, i), s)), this.config.speed.selected = e, setTimeout(() => {
                    this.media.playbackRate = e
                }, 0)
            }
            get speed() {
                return Number(this.media.playbackRate)
            }
            get minimumSpeed() {
                return this.isYouTube ? Math.min(...this.options.speed) : this.isVimeo ? .5 : .0625
            }
            get maximumSpeed() {
                return this.isYouTube ? Math.max(...this.options.speed) : this.isVimeo ? 2 : 16
            }
            set quality(i) {
                const s = this.config.quality,
                    o = this.options.quality;
                if (o.length) {
                    let t = [!W(i) && Number(i), this.storage.get("quality"), s.selected, s.default].find(I),
                        e = !0;
                    if (!o.includes(t)) {
                        const i = bt(o, t);
                        this.debug.warn(`Unsupported quality option: ${t}, using ${i} instead`), t = i, e = !1
                    }
                    s.selected = t, this.media.quality = t, e && this.storage.set({
                        quality: t
                    })
                }
            }
            get quality() {
                return this.media.quality
            }
            set loop(t) {
                t = P(t) ? t : this.config.loop.active;
                this.config.loop.active = t, this.media.loop = t
            }
            get loop() {
                return Boolean(this.media.loop)
            }
            set source(t) {
                he.change.call(this, t)
            }
            get source() {
                return this.media.currentSrc
            }
            get download() {
                var {
                    download: t
                } = this.config.urls;
                return F(t) ? t : this.source
            }
            set download(t) {
                F(t) && (this.config.urls.download = t, Nt.setDownloadUrl.call(this))
            }
            set poster(t) {
                this.isVideo ? Xt.setPoster.call(this, t, !1).catch(() => {}) : this.debug.warn("Poster can only be set for video")
            }
            get poster() {
                return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null
            }
            get ratio() {
                if (!this.isVideo) return null;
                const t = Tt(_t.call(this));
                return j(t) ? t.join(":") : t
            }
            set ratio(t) {
                this.isVideo ? O(t) && $t(t) ? (this.config.ratio = Tt(t), St.call(this)) : this.debug.error(`Invalid aspect ratio specified (${t})`) : this.debug.warn("Aspect ratio can only be set for video")
            }
            set autoplay(t) {
                t = P(t) ? t : this.config.autoplay;
                this.config.autoplay = t
            }
            get autoplay() {
                return Boolean(this.config.autoplay)
            }
            toggleCaptions(t) {
                Wt.toggle.call(this, t, !1)
            }
            set currentTrack(t) {
                Wt.set.call(this, t, !1)
            }
            get currentTrack() {
                var {
                    toggled: t,
                    currentTrack: e
                } = this.captions;
                return t ? e : -1
            }
            set language(t) {
                Wt.setLanguage.call(this, t, !1)
            }
            get language() {
                return (Wt.getCurrentTrack.call(this) || {}).language
            }
            set pip(t) {
                ct.pip && (t = P(t) ? t : !this.pip, z(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? Bt : "inline"), z(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture()))
            }
            get pip() {
                return ct.pip ? W(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === Bt : null
            }
            static supported(t, e, i) {
                return ct.check(t, e, i)
            }
            static loadSprite(t, e) {
                return Lt(t, e)
            }
            static setup(t, e = {}) {
                let i = null;
                return O(t) ? i = Array.from(document.querySelectorAll(t)) : L(t) ? i = Array.from(t) : j(t) && (i = t.filter(D)), W(i) ? null : i.map(t => new ce(t, e))
            }
        }
        return ce.defaults = (Zt = Rt, JSON.parse(JSON.stringify(Zt))), ce
    }),
    function(t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).ProgressBar = t()
    }(function() {
        return function s(o, n, r) {
            function a(i, t) {
                if (!n[i]) {
                    if (!o[i]) {
                        var e = "function" == typeof require && require;
                        if (!t && e) return e(i, !0);
                        if (l) return l(i, !0);
                        e = new Error("Cannot find module '" + i + "'");
                        throw e.code = "MODULE_NOT_FOUND", e
                    }
                    e = n[i] = {
                        exports: {}
                    };
                    o[i][0].call(e.exports, function(t) {
                        var e = o[i][1][t];
                        return a(e || t)
                    }, e, e.exports, s, o, n, r)
                }
                return n[i].exports
            }
            for (var l = "function" == typeof require && require, t = 0; t < r.length; t++) a(r[t]);
            return a
        }({
            1: [function(t, _, S) {
                ! function() {
                    var h, r, a, n, l, c, s, u, e, d, p, v = this || Function("return this")(),
                        m = function() {
                            "use strict";

                            function o() {}

                            function n(t, e) {
                                for (var i in t) Object.hasOwnProperty.call(t, i) && e(i)
                            }

                            function r(e, i) {
                                return n(i, function(t) {
                                    e[t] = i[t]
                                }), e
                            }

                            function a(e, i) {
                                n(i, function(t) {
                                    void 0 === e[t] && (e[t] = i[t])
                                })
                            }

                            function u(t, e, i, s, o, n, r) {
                                var a, l, h = t < n ? 0 : (t - n) / o;
                                for (a in e) e.hasOwnProperty(a) && (l = r[a], l = "function" == typeof l ? l : p[l], e[a] = c(i[a], s[a], l, h));
                                return e
                            }

                            function c(t, e, i, s) {
                                return t + (e - t) * i(s)
                            }

                            function d(e, i) {
                                var s = t.prototype.filter,
                                    o = e._filterArgs;
                                n(s, function(t) {
                                    void 0 !== s[t][i] && s[t][i].apply(e, o)
                                })
                            }

                            function l(t, e, i, s, o, n, r, a, l, h, c) {
                                f = e + i + s, m = Math.min(c || y(), f), g = f <= m, f = s - (f - m), t.isPlaying() && (g ? (l(r, t._attachment, f), t.stop(!0)) : (t._scheduleId = h(t._timeoutHandler, 1e3 / 60), d(t, "beforeTween"), m < e + i ? u(1, o, n, r, 1, 1, a) : u(m, o, n, r, s, e + i, a), d(t, "afterTween"), l(o, t._attachment, f)))
                            }

                            function h(t, e) {
                                var i = {},
                                    s = typeof e;
                                return n(t, "string" == s || "function" == s ? function(t) {
                                    i[t] = e
                                } : function(t) {
                                    i[t] || (i[t] = e[t] || "linear")
                                }), i
                            }

                            function t(t, e) {
                                this._currentState = t || {}, this._configured = !1, this._scheduleFunction = i, void 0 !== e && this.setConfig(e)
                            }
                            var p, m, g, f, e = Date.now || function() {
                                    return +new Date
                                },
                                y = "undefined" != typeof SHIFTY_DEBUG_NOW ? SHIFTY_DEBUG_NOW : e,
                                i = "undefined" != typeof window && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame) || setTimeout;
                            return t.prototype.tween = function(t) {
                                return this._isTweening ? this : (void 0 === t && this._configured || this.setConfig(t), this._timestamp = y(), this._start(this.get(), this._attachment), this.resume())
                            }, t.prototype.setConfig = function(t) {
                                t = t || {}, this._configured = !0, this._attachment = t.attachment, this._pausedAtTime = null, this._scheduleId = null, this._delay = t.delay || 0, this._start = t.start || o, this._step = t.step || o, this._finish = t.finish || o, this._duration = t.duration || 500, this._currentState = r({}, t.from) || this.get(), this._originalState = this.get(), this._targetState = r({}, t.to) || this.get();
                                var e = this;
                                this._timeoutHandler = function() {
                                    l(e, e._timestamp, e._delay, e._duration, e._currentState, e._originalState, e._targetState, e._easing, e._step, e._scheduleFunction)
                                };
                                var i = this._currentState,
                                    s = this._targetState;
                                return a(s, i), this._easing = h(i, t.easing || "linear"), this._filterArgs = [i, this._originalState, s, this._easing], d(this, "tweenCreated"), this
                            }, t.prototype.get = function() {
                                return r({}, this._currentState)
                            }, t.prototype.set = function(t) {
                                this._currentState = t
                            }, t.prototype.pause = function() {
                                return this._pausedAtTime = y(), this._isPaused = !0, this
                            }, t.prototype.resume = function() {
                                return this._isPaused && (this._timestamp += y() - this._pausedAtTime), this._isPaused = !1, this._isTweening = !0, this._timeoutHandler(), this
                            }, t.prototype.seek = function(t) {
                                t = Math.max(t, 0);
                                var e = y();
                                return this._timestamp + t === 0 || (this._timestamp = e - t, this.isPlaying() || (this._isTweening = !0, this._isPaused = !1, l(this, this._timestamp, this._delay, this._duration, this._currentState, this._originalState, this._targetState, this._easing, this._step, this._scheduleFunction, e), this.pause())), this
                            }, t.prototype.stop = function(t) {
                                return this._isTweening = !1, this._isPaused = !1, this._timeoutHandler = o, (v.cancelAnimationFrame || v.webkitCancelAnimationFrame || v.oCancelAnimationFrame || v.msCancelAnimationFrame || v.mozCancelRequestAnimationFrame || v.clearTimeout)(this._scheduleId), t && (d(this, "beforeTween"), u(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing), d(this, "afterTween"), d(this, "afterTweenEnd"), this._finish.call(this, this._currentState, this._attachment)), this
                            }, t.prototype.isPlaying = function() {
                                return this._isTweening && !this._isPaused
                            }, t.prototype.setScheduleFunction = function(t) {
                                this._scheduleFunction = t
                            }, t.prototype.dispose = function() {
                                for (var t in this) this.hasOwnProperty(t) && delete this[t]
                            }, t.prototype.filter = {}, p = t.prototype.formula = {
                                linear: function(t) {
                                    return t
                                }
                            }, r(t, {
                                now: y,
                                each: n,
                                tweenProps: u,
                                tweenProp: c,
                                applyFilter: d,
                                shallowCopy: r,
                                defaults: a,
                                composeEasingObject: h
                            }), "function" == typeof SHIFTY_DEBUG_NOW && (v.timeoutHandler = l), "object" == typeof S ? _.exports = t : void 0 === v.Tweenable && (v.Tweenable = t), t
                        }();

                    function o(i) {
                        h.each(i, function(t) {
                            var e = i[t];
                            "string" == typeof e && e.match(s) && (i[t] = f(s, e, g))
                        })
                    }

                    function g(t) {
                        3 === (t = (t = t).replace(/#/, "")).length && (t = (t = t.split(""))[0] + t[0] + t[1] + t[1] + t[2] + t[2]), e[0] = i(t.substr(0, 2)), e[1] = i(t.substr(2, 2)), e[2] = i(t.substr(4, 2)), t = e;
                        return "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")"
                    }

                    function i(t) {
                        return parseInt(t, 16)
                    }

                    function f(t, e, i) {
                        var s = e.match(t),
                            o = e.replace(t, u);
                        if (s)
                            for (var n, r = s.length, a = 0; a < r; a++) n = s.shift(), o = o.replace(u, i(n));
                        return o
                    }

                    function y(t) {
                        for (var e = t.match(n), i = e.length, s = t.match(c)[0], o = 0; o < i; o++) s += parseInt(e[o], 10) + ",";
                        return s.slice(0, -1) + ")"
                    }

                    function b(o) {
                        var n = {};
                        return h.each(o, function(t) {
                            var e, i, s = o[t];
                            "string" == typeof s && (e = $(s), n[t] = {
                                formatString: ((s = (i = s).match(a)) ? 1 !== s.length && !i[0].match(r) || s.unshift("") : s = ["", ""], s.join(u)),
                                chunkNames: function(t, e) {
                                    for (var i = [], s = t.length, o = 0; o < s; o++) i.push("_" + e + "_" + o);
                                    return i
                                }(e, t)
                            })
                        }), n
                    }

                    function w(o, n) {
                        h.each(n, function(t) {
                            for (var e = $(o[t]), i = e.length, s = 0; s < i; s++) o[n[t].chunkNames[s]] = +e[s];
                            delete o[t]
                        })
                    }

                    function x(s, o) {
                        h.each(o, function(t) {
                            s[t];
                            var e = function(t, e) {
                                    d.length = 0;
                                    for (var i = e.length, s = 0; s < i; s++) d.push(t[e[s]]);
                                    return d
                                }(function(t, e) {
                                    for (var i, s = {}, o = e.length, n = 0; n < o; n++) i = e[n], s[i] = t[i], delete t[i];
                                    return s
                                }(s, o[t].chunkNames), o[t].chunkNames),
                                i = function(t, e) {
                                    for (var i = t, s = e.length, o = 0; o < s; o++) i = i.replace(u, +e[o].toFixed(4));
                                    return i
                                }(o[t].formatString, e);
                            s[t] = f(l, i, y)
                        })
                    }

                    function $(t) {
                        return t.match(n)
                    }

                    function T(t, e, i, s, o, n) {
                        function l(t) {
                            return ((c * t + u) * t + d) * t
                        }

                        function h(t) {
                            return 0 <= t ? t : 0 - t
                        }
                        var r, c = 0,
                            u = 0,
                            d = 0,
                            a = 0,
                            p = 0,
                            m = 0,
                            c = 1 - (d = 3 * e) - (u = 3 * (s - e) - d),
                            a = 1 - (m = 3 * i) - (p = 3 * (o - i) - m);
                        return r = function(t, e) {
                            var i, s, o, n, r, a;
                            for (o = t, a = 0; a < 8; a++) {
                                if (h(n = l(o) - t) < e) return o;
                                if (h(r = function(t) {
                                        return (3 * c * t + 2 * u) * t + d
                                    }(o)) < 1e-6) break;
                                o -= n / r
                            }
                            if (s = 1, (i = 0) > (o = t)) return i;
                            if (s < o) return s;
                            for (; i < s;) {
                                if (h((n = l(o)) - t) < e) return o;
                                n < t ? i = o : s = o, o = .5 * (s - i) + i
                            }
                            return o
                        }(t, r = 1 / (200 * n)), ((a * r + p) * r + m) * r
                    }
                    m.shallowCopy(m.prototype.formula, {
                        easeInQuad: function(t) {
                            return Math.pow(t, 2)
                        },
                        easeOutQuad: function(t) {
                            return -(Math.pow(t - 1, 2) - 1)
                        },
                        easeInOutQuad: function(t) {
                            return (t /= .5) < 1 ? .5 * Math.pow(t, 2) : -.5 * ((t -= 2) * t - 2)
                        },
                        easeInCubic: function(t) {
                            return Math.pow(t, 3)
                        },
                        easeOutCubic: function(t) {
                            return Math.pow(t - 1, 3) + 1
                        },
                        easeInOutCubic: function(t) {
                            return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2)
                        },
                        easeInQuart: function(t) {
                            return Math.pow(t, 4)
                        },
                        easeOutQuart: function(t) {
                            return -(Math.pow(t - 1, 4) - 1)
                        },
                        easeInOutQuart: function(t) {
                            return (t /= .5) < 1 ? .5 * Math.pow(t, 4) : -.5 * ((t -= 2) * Math.pow(t, 3) - 2)
                        },
                        easeInQuint: function(t) {
                            return Math.pow(t, 5)
                        },
                        easeOutQuint: function(t) {
                            return Math.pow(t - 1, 5) + 1
                        },
                        easeInOutQuint: function(t) {
                            return (t /= .5) < 1 ? .5 * Math.pow(t, 5) : .5 * (Math.pow(t - 2, 5) + 2)
                        },
                        easeInSine: function(t) {
                            return 1 - Math.cos(t * (Math.PI / 2))
                        },
                        easeOutSine: function(t) {
                            return Math.sin(t * (Math.PI / 2))
                        },
                        easeInOutSine: function(t) {
                            return -.5 * (Math.cos(Math.PI * t) - 1)
                        },
                        easeInExpo: function(t) {
                            return 0 === t ? 0 : Math.pow(2, 10 * (t - 1))
                        },
                        easeOutExpo: function(t) {
                            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
                        },
                        easeInOutExpo: function(t) {
                            return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t))
                        },
                        easeInCirc: function(t) {
                            return -(Math.sqrt(1 - t * t) - 1)
                        },
                        easeOutCirc: function(t) {
                            return Math.sqrt(1 - Math.pow(t - 1, 2))
                        },
                        easeInOutCirc: function(t) {
                            return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                        },
                        easeOutBounce: function(t) {
                            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                        },
                        easeInBack: function(t) {
                            return t * t * (2.70158 * t - 1.70158)
                        },
                        easeOutBack: function(t) {
                            return --t * t * (2.70158 * t + 1.70158) + 1
                        },
                        easeInOutBack: function(t) {
                            var e = 1.70158;
                            return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
                        },
                        elastic: function(t) {
                            return -1 * Math.pow(4, -8 * t) * Math.sin((6 * t - 1) * (2 * Math.PI) / 2) + 1
                        },
                        swingFromTo: function(t) {
                            var e = 1.70158;
                            return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
                        },
                        swingFrom: function(t) {
                            return t * t * (2.70158 * t - 1.70158)
                        },
                        swingTo: function(t) {
                            return --t * t * (2.70158 * t + 1.70158) + 1
                        },
                        bounce: function(t) {
                            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                        },
                        bouncePast: function(t) {
                            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 2 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 2 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 2 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                        },
                        easeFromTo: function(t) {
                            return (t /= .5) < 1 ? .5 * Math.pow(t, 4) : -.5 * ((t -= 2) * Math.pow(t, 3) - 2)
                        },
                        easeFrom: function(t) {
                            return Math.pow(t, 4)
                        },
                        easeTo: function(t) {
                            return Math.pow(t, .25)
                        }
                    }), m.setBezierFunction = function(t, e, i, s, o) {
                        var n, r, a, l, h = (n = e, r = i, a = s, l = o, function(t) {
                            return T(t, n, r, a, l, 1)
                        });
                        return h.displayName = t, h.x1 = e, h.y1 = i, h.x2 = s, h.y2 = o, m.prototype.formula[t] = h
                    }, m.unsetBezierFunction = function(t) {
                        delete m.prototype.formula[t]
                    }, (p = new m)._filterArgs = [], m.interpolate = function(t, e, i, s, o) {
                        var n = m.shallowCopy({}, t),
                            r = o || 0,
                            o = m.composeEasingObject(t, s || "linear");
                        p.set({});
                        s = p._filterArgs;
                        s.length = 0, s[0] = n, s[1] = t, s[2] = e, s[3] = o, m.applyFilter(p, "tweenCreated"), m.applyFilter(p, "beforeTween");
                        o = m.tweenProps(i, n, t, e, 1, r, o);
                        return m.applyFilter(p, "afterTween"), o
                    }, h = m, r = /(\d|\-|\.)/, a = /([^\-0-9\.]+)/g, n = /[0-9.\-]+/g, l = new RegExp("rgb\\(" + n.source + /,\s*/.source + n.source + /,\s*/.source + n.source + "\\)", "g"), c = /^.*\(/, s = /#([0-9]|[a-f]){3,6}/gi, u = "VAL", e = [], d = [], h.prototype.filter.token = {
                        tweenCreated: function(t, e, i, s) {
                            o(t), o(e), o(i), this._tokenData = b(t)
                        },
                        beforeTween: function(t, e, i, s) {
                            var a, l;
                            a = s, l = this._tokenData, h.each(l, function(t) {
                                var e = l[t].chunkNames,
                                    i = e.length,
                                    s = a[t];
                                if ("string" == typeof s)
                                    for (var o = s.split(" "), n = o[o.length - 1], r = 0; r < i; r++) a[e[r]] = o[r] || n;
                                else
                                    for (r = 0; r < i; r++) a[e[r]] = s;
                                delete a[t]
                            }), w(t, this._tokenData), w(e, this._tokenData), w(i, this._tokenData)
                        },
                        afterTween: function(t, e, i, s) {
                            var r, a;
                            x(t, this._tokenData), x(e, this._tokenData), x(i, this._tokenData), r = s, a = this._tokenData, h.each(a, function(t) {
                                var e = a[t].chunkNames,
                                    i = e.length,
                                    s = r[e[0]];
                                if ("string" == typeof s) {
                                    for (var o = "", n = 0; n < i; n++) o += " " + r[e[n]], delete r[e[n]];
                                    r[t] = o.substr(1)
                                } else r[t] = s
                            })
                        }
                    }
                }.call(null)
            }, {}],
            2: [function(t, e, i) {
                var s = t("./shape"),
                    o = t("./utils"),
                    t = function(t, e) {
                        this._pathTemplate = "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}", this.containerAspectRatio = 1, s.apply(this, arguments)
                    };
                ((t.prototype = new s).constructor = t).prototype._pathString = function(t) {
                    var e = t.strokeWidth,
                        e = 50 - (e = t.trailWidth && t.trailWidth > t.strokeWidth ? t.trailWidth : e) / 2;
                    return o.render(this._pathTemplate, {
                        radius: e,
                        "2radius": 2 * e
                    })
                }, t.prototype._trailString = function(t) {
                    return this._pathString(t)
                }, e.exports = t
            }, {
                "./shape": 7,
                "./utils": 8
            }],
            3: [function(t, e, i) {
                var s = t("./shape"),
                    o = t("./utils"),
                    t = function(t, e) {
                        this._pathTemplate = "M 0,{center} L 100,{center}", s.apply(this, arguments)
                    };
                ((t.prototype = new s).constructor = t).prototype._initializeSvg = function(t, e) {
                    t.setAttribute("viewBox", "0 0 100 " + e.strokeWidth), t.setAttribute("preserveAspectRatio", "none")
                }, t.prototype._pathString = function(t) {
                    return o.render(this._pathTemplate, {
                        center: t.strokeWidth / 2
                    })
                }, t.prototype._trailString = function(t) {
                    return this._pathString(t)
                }, e.exports = t
            }, {
                "./shape": 7,
                "./utils": 8
            }],
            4: [function(t, e, i) {
                e.exports = {
                    Line: t("./line"),
                    Circle: t("./circle"),
                    SemiCircle: t("./semicircle"),
                    Path: t("./path"),
                    Shape: t("./shape"),
                    utils: t("./utils")
                }
            }, {
                "./circle": 2,
                "./line": 3,
                "./path": 5,
                "./semicircle": 6,
                "./shape": 7,
                "./utils": 8
            }],
            5: [function(t, e, i) {
                var a = t("shifty"),
                    l = t("./utils"),
                    s = {
                        easeIn: "easeInCubic",
                        easeOut: "easeOutCubic",
                        easeInOut: "easeInOutCubic"
                    },
                    t = function t(e, i) {
                        if (!(this instanceof t)) throw new Error("Constructor was called without new keyword");
                        i = l.extend({
                            duration: 800,
                            easing: "linear",
                            from: {},
                            to: {},
                            step: function() {}
                        }, i), e = l.isString(e) ? document.querySelector(e) : e, this.path = e, this._opts = i, this._tweenable = null;
                        i = this.path.getTotalLength();
                        this.path.style.strokeDasharray = i + " " + i, this.set(0)
                    };
                t.prototype.value = function() {
                    var t = this._getComputedDashOffset(),
                        e = this.path.getTotalLength();
                    return parseFloat((1 - t / e).toFixed(6), 10)
                }, t.prototype.set = function(t) {
                    this.stop(), this.path.style.strokeDashoffset = this._progressToOffset(t);
                    var e, i = this._opts.step;
                    l.isFunction(i) && (e = this._easing(this._opts.easing), i(this._calculateTo(t, e), this._opts.shape || this, this._opts.attachment))
                }, t.prototype.stop = function() {
                    this._stopTween(), this.path.style.strokeDashoffset = this._getComputedDashOffset()
                }, t.prototype.animate = function(t, i, e) {
                    i = i || {}, l.isFunction(i) && (e = i, i = {});
                    var s = l.extend({}, i),
                        o = l.extend({}, this._opts);
                    i = l.extend(o, i);
                    var n = this._easing(i.easing),
                        o = this._resolveFromAndTo(t, n, s);
                    this.stop(), this.path.getBoundingClientRect();
                    var s = this._getComputedDashOffset(),
                        t = this._progressToOffset(t),
                        r = this;
                    this._tweenable = new a, this._tweenable.tween({
                        from: l.extend({
                            offset: s
                        }, o.from),
                        to: l.extend({
                            offset: t
                        }, o.to),
                        duration: i.duration,
                        easing: n,
                        step: function(t) {
                            r.path.style.strokeDashoffset = t.offset;
                            var e = i.shape || r;
                            i.step(t, e, i.attachment)
                        },
                        finish: function(t) {
                            l.isFunction(e) && e()
                        }
                    })
                }, t.prototype._getComputedDashOffset = function() {
                    var t = window.getComputedStyle(this.path, null);
                    return parseFloat(t.getPropertyValue("stroke-dashoffset"), 10)
                }, t.prototype._progressToOffset = function(t) {
                    var e = this.path.getTotalLength();
                    return e - t * e
                }, t.prototype._resolveFromAndTo = function(t, e, i) {
                    return i.from && i.to ? {
                        from: i.from,
                        to: i.to
                    } : {
                        from: this._calculateFrom(e),
                        to: this._calculateTo(t, e)
                    }
                }, t.prototype._calculateFrom = function(t) {
                    return a.interpolate(this._opts.from, this._opts.to, this.value(), t)
                }, t.prototype._calculateTo = function(t, e) {
                    return a.interpolate(this._opts.from, this._opts.to, t, e)
                }, t.prototype._stopTween = function() {
                    null !== this._tweenable && (this._tweenable.stop(), this._tweenable = null)
                }, t.prototype._easing = function(t) {
                    return s.hasOwnProperty(t) ? s[t] : t
                }, e.exports = t
            }, {
                "./utils": 8,
                shifty: 1
            }],
            6: [function(t, e, i) {
                var s = t("./shape"),
                    o = t("./circle"),
                    n = t("./utils"),
                    t = function(t, e) {
                        this._pathTemplate = "M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0", this.containerAspectRatio = 2, s.apply(this, arguments)
                    };
                ((t.prototype = new s).constructor = t).prototype._initializeSvg = function(t, e) {
                    t.setAttribute("viewBox", "0 0 100 50")
                }, t.prototype._initializeTextContainer = function(t, e, i) {
                    t.text.style && (i.style.top = "auto", i.style.bottom = "0", t.text.alignToBottom ? n.setStyle(i, "transform", "translate(-50%, 0)") : n.setStyle(i, "transform", "translate(-50%, 50%)"))
                }, t.prototype._pathString = o.prototype._pathString, t.prototype._trailString = o.prototype._trailString, e.exports = t
            }, {
                "./circle": 2,
                "./shape": 7,
                "./utils": 8
            }],
            7: [function(t, e, i) {
                var n = t("./path"),
                    r = t("./utils"),
                    s = "Object is destroyed",
                    t = function t(e, i) {
                        if (!(this instanceof t)) throw new Error("Constructor was called without new keyword");
                        if (0 !== arguments.length) {
                            this._opts = r.extend({
                                color: "#555",
                                strokeWidth: 1,
                                trailColor: null,
                                trailWidth: null,
                                fill: null,
                                text: {
                                    style: {
                                        color: null,
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        padding: 0,
                                        margin: 0,
                                        transform: {
                                            prefix: !0,
                                            value: "translate(-50%, -50%)"
                                        }
                                    },
                                    autoStyleContainer: !0,
                                    alignToBottom: !0,
                                    value: null,
                                    className: "progressbar-text"
                                },
                                svgStyle: {
                                    display: "block",
                                    width: "100%"
                                },
                                warnings: !1
                            }, i, !0), r.isObject(i) && void 0 !== i.svgStyle && (this._opts.svgStyle = i.svgStyle), r.isObject(i) && r.isObject(i.text) && void 0 !== i.text.style && (this._opts.text.style = i.text.style);
                            var s = this._createSvgView(this._opts),
                                o = r.isString(e) ? document.querySelector(e) : e;
                            if (!o) throw new Error("Container does not exist: " + e);
                            this._container = o, this._container.appendChild(s.svg), this._opts.warnings && this._warnContainerAspectRatio(this._container), this._opts.svgStyle && r.setStyles(s.svg, this._opts.svgStyle), this.svg = s.svg, this.path = s.path, this.trail = s.trail, this.text = null;
                            o = r.extend({
                                attachment: void 0,
                                shape: this
                            }, this._opts);
                            this._progressPath = new n(s.path, o), r.isObject(this._opts.text) && null !== this._opts.text.value && this.setText(this._opts.text.value)
                        }
                    };
                t.prototype.animate = function(t, e, i) {
                    if (null === this._progressPath) throw new Error(s);
                    this._progressPath.animate(t, e, i)
                }, t.prototype.stop = function() {
                    if (null === this._progressPath) throw new Error(s);
                    void 0 !== this._progressPath && this._progressPath.stop()
                }, t.prototype.destroy = function() {
                    if (null === this._progressPath) throw new Error(s);
                    this.stop(), this.svg.parentNode.removeChild(this.svg), this.svg = null, this.path = null, this.trail = null, (this._progressPath = null) !== this.text && (this.text.parentNode.removeChild(this.text), this.text = null)
                }, t.prototype.set = function(t) {
                    if (null === this._progressPath) throw new Error(s);
                    this._progressPath.set(t)
                }, t.prototype.value = function() {
                    if (null === this._progressPath) throw new Error(s);
                    return void 0 === this._progressPath ? 0 : this._progressPath.value()
                }, t.prototype.setText = function(t) {
                    if (null === this._progressPath) throw new Error(s);
                    null === this.text && (this.text = this._createTextContainer(this._opts, this._container), this._container.appendChild(this.text)), r.isObject(t) ? (r.removeChildren(this.text), this.text.appendChild(t)) : this.text.innerHTML = t
                }, t.prototype._createSvgView = function(t) {
                    var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    this._initializeSvg(e, t);
                    var i = null;
                    (t.trailColor || t.trailWidth) && (i = this._createTrail(t), e.appendChild(i));
                    t = this._createPath(t);
                    return e.appendChild(t), {
                        svg: e,
                        path: t,
                        trail: i
                    }
                }, t.prototype._initializeSvg = function(t, e) {
                    t.setAttribute("viewBox", "0 0 100 100")
                }, t.prototype._createPath = function(t) {
                    var e = this._pathString(t);
                    return this._createPathElement(e, t)
                }, t.prototype._createTrail = function(t) {
                    var e = this._trailString(t),
                        t = r.extend({}, t);
                    return t.trailColor || (t.trailColor = "#eee"), t.trailWidth || (t.trailWidth = t.strokeWidth), t.color = t.trailColor, t.strokeWidth = t.trailWidth, t.fill = null, this._createPathElement(e, t)
                }, t.prototype._createPathElement = function(t, e) {
                    var i = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    return i.setAttribute("d", t), i.setAttribute("stroke", e.color), i.setAttribute("stroke-width", e.strokeWidth), e.fill ? i.setAttribute("fill", e.fill) : i.setAttribute("fill-opacity", "0"), i
                }, t.prototype._createTextContainer = function(t, e) {
                    var i = document.createElement("div");
                    i.className = t.text.className;
                    var s = t.text.style;
                    return s && (t.text.autoStyleContainer && (e.style.position = "relative"), r.setStyles(i, s), s.color || (i.style.color = t.color)), this._initializeTextContainer(t, e, i), i
                }, t.prototype._initializeTextContainer = function(t, e, i) {}, t.prototype._pathString = function(t) {
                    throw new Error("Override this function for each progress bar")
                }, t.prototype._trailString = function(t) {
                    throw new Error("Override this function for each progress bar")
                }, t.prototype._warnContainerAspectRatio = function(t) {
                    var e, i, s;
                    this.containerAspectRatio && (e = window.getComputedStyle(t, null), i = parseFloat(e.getPropertyValue("width"), 10), s = parseFloat(e.getPropertyValue("height"), 10), r.floatEquals(this.containerAspectRatio, i / s) || (console.warn("Incorrect aspect ratio of container", "#" + t.id, "detected:", e.getPropertyValue("width") + "(width)", "/", e.getPropertyValue("height") + "(height)", "=", i / s), console.warn("Aspect ratio of should be", this.containerAspectRatio)))
                }, e.exports = t
            }, {
                "./path": 5,
                "./utils": 8
            }],
            8: [function(t, e, i) {
                function s(t, e, i) {
                    for (var s = t.style, o = 0; o < r.length; ++o) s[r[o] + n(e)] = i;
                    s[e] = i
                }

                function n(t) {
                    return t.charAt(0).toUpperCase() + t.slice(1)
                }

                function a(t) {
                    return "[object Array]" !== Object.prototype.toString.call(t) && ("object" == typeof t && !!t)
                }

                function o(t, e) {
                    for (var i in t) t.hasOwnProperty(i) && e(t[i], i)
                }
                var r = "Webkit Moz O ms".split(" ");
                e.exports = {
                    extend: function t(e, i, s) {
                        for (var o in e = e || {}, s = s || !1, i = i || {}) {
                            var n, r;
                            i.hasOwnProperty(o) && (n = e[o], r = i[o], s && a(n) && a(r) ? e[o] = t(n, r, s) : e[o] = r)
                        }
                        return e
                    },
                    render: function(t, e) {
                        var i, s, o, n = t;
                        for (i in e) e.hasOwnProperty(i) && (s = e[i], o = new RegExp("\\{" + i + "\\}", "g"), n = n.replace(o, s));
                        return n
                    },
                    setStyle: s,
                    setStyles: function(i, t) {
                        o(t, function(t, e) {
                            null != t && (a(t) && !0 === t.prefix ? s(i, e, t.value) : i.style[e] = t)
                        })
                    },
                    capitalize: n,
                    isString: function(t) {
                        return "string" == typeof t || t instanceof String
                    },
                    isFunction: function(t) {
                        return "function" == typeof t
                    },
                    isObject: a,
                    forEachObject: o,
                    floatEquals: function(t, e) {
                        return Math.abs(t - e) < .001
                    },
                    removeChildren: function(t) {
                        for (; t.firstChild;) t.removeChild(t.firstChild)
                    }
                }
            }, {}]
        }, {}, [4])(4)
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.Rellax = e()
    }("undefined" != typeof window ? window : global, function() {
        var u = function(t, e) {
            var T = Object.create(u.prototype),
                n = 0,
                _ = 0,
                r = 0,
                S = 0,
                C = [],
                k = !0,
                i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(t) {
                    return setTimeout(t, 1e3 / 60)
                },
                s = null,
                o = !1;
            try {
                var a = Object.defineProperty({}, "passive", {
                    get: function() {
                        o = !0
                    }
                });
                window.addEventListener("testPassive", null, a), window.removeEventListener("testPassive", null, a)
            } catch (t) {}
            var l = window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout,
                h = window.transformProp || function() {
                    var t = document.createElement("div");
                    if (null === t.style.transform) {
                        var e, i = ["Webkit", "Moz", "ms"];
                        for (e in i)
                            if (void 0 !== t.style[i[e] + "Transform"]) return i[e] + "Transform"
                    }
                    return "transform"
                }();
            if (T.options = {
                    speed: -2,
                    verticalSpeed: null,
                    horizontalSpeed: null,
                    breakpoints: [576, 768, 1201],
                    center: !1,
                    wrapper: null,
                    relativeToWrapper: !1,
                    round: !0,
                    vertical: !0,
                    horizontal: !1,
                    verticalScrollAxis: "y",
                    horizontalScrollAxis: "x",
                    callback: function() {}
                }, e && Object.keys(e).forEach(function(t) {
                    T.options[t] = e[t]
                }), e && e.breakpoints && function() {
                    if (3 === T.options.breakpoints.length && Array.isArray(T.options.breakpoints)) {
                        var e, i = !0,
                            s = !0;
                        if (T.options.breakpoints.forEach(function(t) {
                                "number" != typeof t && (s = !1), null !== e && t < e && (i = !1), e = t
                            }), i && s) return
                    }
                    T.options.breakpoints = [576, 768, 1201], console.warn("Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted")
                }(), 0 < (a = "string" == typeof(t = t || ".rellax") ? document.querySelectorAll(t) : [t]).length) {
                if (T.elems = a, T.options.wrapper && !T.options.wrapper.nodeType) {
                    if (!(a = document.querySelector(T.options.wrapper))) return void console.warn("Rellax: The wrapper you're trying to use doesn't exist.");
                    T.options.wrapper = a
                }
                var A, E = function() {
                        for (var t = 0; t < C.length; t++) T.elems[t].style.cssText = C[t].style;
                        for (C = [], _ = window.innerHeight, S = window.innerWidth, t = T.options.breakpoints, A = S < t[0] ? "xs" : S >= t[0] && S < t[1] ? "sm" : S >= t[1] && S < t[2] ? "md" : "lg", M(), t = 0; t < T.elems.length; t++) {
                            var e = void 0,
                                i = T.elems[t],
                                s = i.getAttribute("data-rellax-percentage"),
                                o = i.getAttribute("data-rellax-speed"),
                                n = i.getAttribute("data-rellax-xs-speed"),
                                r = i.getAttribute("data-rellax-mobile-speed"),
                                a = i.getAttribute("data-rellax-tablet-speed"),
                                l = i.getAttribute("data-rellax-desktop-speed"),
                                h = i.getAttribute("data-rellax-vertical-speed"),
                                c = i.getAttribute("data-rellax-horizontal-speed"),
                                u = i.getAttribute("data-rellax-vertical-scroll-axis"),
                                d = i.getAttribute("data-rellax-horizontal-scroll-axis"),
                                p = i.getAttribute("data-rellax-zindex") || 0,
                                m = i.getAttribute("data-rellax-min"),
                                g = i.getAttribute("data-rellax-max"),
                                f = i.getAttribute("data-rellax-min-x"),
                                y = i.getAttribute("data-rellax-max-x"),
                                v = i.getAttribute("data-rellax-min-y"),
                                b = i.getAttribute("data-rellax-max-y"),
                                w = !0;
                            n || r || a || l ? e = {
                                xs: n,
                                sm: r,
                                md: a,
                                lg: l
                            } : w = !1, n = T.options.wrapper ? T.options.wrapper.scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop, T.options.relativeToWrapper && (n = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) - T.options.wrapper.offsetTop);
                            var x = T.options.vertical && (s || T.options.center) ? n : 0,
                                $ = T.options.horizontal && (s || T.options.center) ? T.options.wrapper ? T.options.wrapper.scrollLeft : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft : 0,
                                n = x + i.getBoundingClientRect().top,
                                r = i.clientHeight || i.offsetHeight || i.scrollHeight,
                                a = $ + i.getBoundingClientRect().left,
                                l = i.clientWidth || i.offsetWidth || i.scrollWidth,
                                x = s || (x - n + _) / (r + _),
                                s = s || ($ - a + S) / (l + S);
                            T.options.center && (x = s = .5), e = w && null !== e[A] ? Number(e[A]) : o || T.options.speed, h = h || T.options.verticalSpeed, c = c || T.options.horizontalSpeed, u = u || T.options.verticalScrollAxis, d = d || T.options.horizontalScrollAxis, o = I(s, x, e, h, c), i = i.style.cssText, w = "", (s = /transform\s*:/i.exec(i)) && (w = (s = (w = i.slice(s.index)).indexOf(";")) ? " " + w.slice(11, s).replace(/\s/g, "") : " " + w.slice(11).replace(/\s/g, "")), C.push({
                                baseX: o.x,
                                baseY: o.y,
                                top: n,
                                left: a,
                                height: r,
                                width: l,
                                speed: e,
                                verticalSpeed: h,
                                horizontalSpeed: c,
                                verticalScrollAxis: u,
                                horizontalScrollAxis: d,
                                style: i,
                                transform: w,
                                zindex: p,
                                min: m,
                                max: g,
                                minX: f,
                                maxX: y,
                                minY: v,
                                maxY: b
                            })
                        }
                        P(), k && (window.addEventListener("resize", E), k = !1, O())
                    },
                    M = function() {
                        var t = n,
                            e = r;
                        return n = T.options.wrapper ? T.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset, r = T.options.wrapper ? T.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset, !!(t != (n = T.options.relativeToWrapper ? ((document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset) - T.options.wrapper.offsetTop : n) && T.options.vertical || e != r && T.options.horizontal)
                    },
                    I = function(t, e, i, s, o) {
                        var n = {};
                        return t = 100 * (o || i) * (1 - t), e = 100 * (s || i) * (1 - e), n.x = T.options.round ? Math.round(t) : Math.round(100 * t) / 100, n.y = T.options.round ? Math.round(e) : Math.round(100 * e) / 100, n
                    },
                    c = function() {
                        window.removeEventListener("resize", c), window.removeEventListener("orientationchange", c), (T.options.wrapper || window).removeEventListener("scroll", c), (T.options.wrapper || document).removeEventListener("touchmove", c), s = i(O)
                    },
                    O = function() {
                        M() && !1 === k ? (P(), s = i(O)) : (s = null, window.addEventListener("resize", c), window.addEventListener("orientationchange", c), (T.options.wrapper || window).addEventListener("scroll", c, !!o && {
                            passive: !0
                        }), (T.options.wrapper || document).addEventListener("touchmove", c, !!o && {
                            passive: !0
                        }))
                    },
                    P = function() {
                        for (var t = 0; t < T.elems.length; t++) {
                            var e = C[t].verticalScrollAxis.toLowerCase(),
                                i = C[t].horizontalScrollAxis.toLowerCase(),
                                s = -1 != e.indexOf("x") ? n : 0,
                                e = -1 != e.indexOf("y") ? n : 0,
                                o = -1 != i.indexOf("x") ? r : 0,
                                i = -1 != i.indexOf("y") ? r : 0;
                            i = (s = I((s + o - C[t].left + S) / (C[t].width + S), (e + i - C[t].top + _) / (C[t].height + _), C[t].speed, C[t].verticalSpeed, C[t].horizontalSpeed)).y - C[t].baseY, e = s.x - C[t].baseX, null !== C[t].min && (T.options.vertical && !T.options.horizontal && (i = i <= C[t].min ? C[t].min : i), T.options.horizontal && !T.options.vertical && (e = e <= C[t].min ? C[t].min : e)), null != C[t].minY && (i = i <= C[t].minY ? C[t].minY : i), null != C[t].minX && (e = e <= C[t].minX ? C[t].minX : e), null !== C[t].max && (T.options.vertical && !T.options.horizontal && (i = i >= C[t].max ? C[t].max : i), T.options.horizontal && !T.options.vertical && (e = e >= C[t].max ? C[t].max : e)), null != C[t].maxY && (i = i >= C[t].maxY ? C[t].maxY : i), null != C[t].maxX && (e = e >= C[t].maxX ? C[t].maxX : e), T.elems[t].style[h] = "translate3d(" + (T.options.horizontal ? e : "0") + "px," + (T.options.vertical ? i : "0") + "px," + C[t].zindex + "px) " + C[t].transform
                        }
                        T.options.callback(s)
                    };
                return T.destroy = function() {
                    for (var t = 0; t < T.elems.length; t++) T.elems[t].style.cssText = C[t].style;
                    k || (window.removeEventListener("resize", E), k = !0), l(s), s = null
                }, E(), T.refresh = E, T
            }
            console.warn("Rellax: The elements you're trying to select don't exist.")
        };
        return u
    });
var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.arrayIteratorImpl = function(t) {
    var e = 0;
    return function() {
        return e < t.length ? {
            done: !1,
            value: t[e++]
        } : {
            done: !0
        }
    }
}, $jscomp.arrayIterator = function(t) {
    return {
        next: $jscomp.arrayIteratorImpl(t)
    }
}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.SIMPLE_FROUND_POLYFILL = !1, $jscomp.ISOLATE_POLYFILLS = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(t, e, i) {
    return t == Array.prototype || t == Object.prototype || (t[e] = i.value), t
}, $jscomp.getGlobal = function(t) {
    t = ["object" == typeof globalThis && globalThis, t, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var e = 0; e < t.length; ++e) {
        var i = t[e];
        if (i && i.Math == Math) return i
    }
    throw Error("Cannot find global object")
}, $jscomp.global = $jscomp.getGlobal(this), $jscomp.IS_SYMBOL_NATIVE = "function" == typeof Symbol && "symbol" == typeof Symbol("x"), $jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE, $jscomp.polyfills = {}, $jscomp.propertyToPolyfillSymbol = {}, $jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(t, e) {
    var i = $jscomp.propertyToPolyfillSymbol[e];
    return null != i && void 0 !== (i = t[i]) ? i : t[e]
};
$jscomp.polyfill = function(t, e, i, s) {
    e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(t, e, i, s) : $jscomp.polyfillUnisolated(t, e, i, s))
}, $jscomp.polyfillUnisolated = function(t, e, i, s) {
    for (i = $jscomp.global, t = t.split("."), s = 0; s < t.length - 1; s++) {
        var o = t[s];
        o in i || (i[o] = {}), i = i[o]
    }(e = e(s = i[t = t[t.length - 1]])) != s && null != e && $jscomp.defineProperty(i, t, {
        configurable: !0,
        writable: !0,
        value: e
    })
}, $jscomp.polyfillIsolated = function(t, e, i, s) {
    var o = t.split(".");
    t = 1 === o.length, s = o[0], s = !t && s in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var n = 0; n < o.length - 1; n++) {
        var r = o[n];
        r in s || (s[r] = {}), s = s[r]
    }
    o = o[o.length - 1], null != (e = e(i = $jscomp.IS_SYMBOL_NATIVE && "es6" === i ? s[o] : null)) && (t ? $jscomp.defineProperty($jscomp.polyfills, o, {
        configurable: !0,
        writable: !0,
        value: e
    }) : e !== i && ($jscomp.propertyToPolyfillSymbol[o] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(o) : $jscomp.POLYFILL_PREFIX + o, o = $jscomp.propertyToPolyfillSymbol[o], $jscomp.defineProperty(s, o, {
        configurable: !0,
        writable: !0,
        value: e
    })))
}, $jscomp.initSymbol = function() {}, $jscomp.polyfill("Symbol", function(t) {
    if (t) return t;

    function e(t, e) {
        this.$jscomp$symbol$id_ = t, $jscomp.defineProperty(this, "description", {
            configurable: !0,
            writable: !0,
            value: e
        })
    }
    e.prototype.toString = function() {
        return this.$jscomp$symbol$id_
    };
    var i = 0,
        s = function(t) {
            if (this instanceof s) throw new TypeError("Symbol is not a constructor");
            return new e("jscomp_symbol_" + (t || "") + "_" + i++, t)
        };
    return s
}, "es6", "es3"), $jscomp.initSymbolIterator = function() {}, $jscomp.polyfill("Symbol.iterator", function(t) {
    if (t) return t;
    t = Symbol("Symbol.iterator");
    for (var e = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), i = 0; i < e.length; i++) {
        var s = $jscomp.global[e[i]];
        "function" == typeof s && "function" != typeof s.prototype[t] && $jscomp.defineProperty(s.prototype, t, {
            configurable: !0,
            writable: !0,
            value: function() {
                return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
            }
        })
    }
    return t
}, "es6", "es3"), $jscomp.initSymbolAsyncIterator = function() {}, $jscomp.iteratorPrototype = function(t) {
    return (t = {
        next: t
    })[Symbol.iterator] = function() {
        return this
    }, t
}, $jscomp.iteratorFromArray = function(e, i) {
    e instanceof String && (e += "");
    var s = 0,
        o = {
            next: function() {
                if (s < e.length) {
                    var t = s++;
                    return {
                        value: i(t, e[t]),
                        done: !1
                    }
                }
                return o.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                }, o.next()
            }
        };
    return o[Symbol.iterator] = function() {
        return o
    }, o
}, $jscomp.polyfill("Array.prototype.keys", function(t) {
    return t || function() {
        return $jscomp.iteratorFromArray(this, function(t) {
            return t
        })
    }
}, "es6", "es3");
var scrollCue = function() {
    var n, o, r, a = {},
        s = 0,
        l = !0,
        h = !0,
        c = !1,
        e = !1,
        i = {
            duration: 600,
            interval: -.7,
            percentage: .75,
            enable: !0,
            docSlider: !1,
            pageChangeReset: !1
        },
        a = {
            setEvents: function(t) {
                function e() {
                    l && (requestAnimationFrame(function() {
                        l = !0, h && (a.setQuery(), a.runQuery())
                    }), l = !1)
                }
                if (h && !t && window.addEventListener("load", a.runQuery), window.addEventListener("scroll", e), c) {
                    t = docSlider.getElements().pages;
                    for (var i = 0; i < t.length; i++) t[i].addEventListener("scroll", function(t) {
                        return docSlider.getCurrentIndex() + "" === (t = t.target.getAttribute("data-ds-index")) && void(docSlider._getWheelEnable() && e())
                    })
                }
                window.addEventListener("resize", function() {
                    0 < s && clearTimeout(s), s = setTimeout(function() {
                        h && (a.searchElements(), a.setQuery(), a.runQuery())
                    }, 200)
                })
            },
            setOptions: function(e, i) {
                var s = {};
                if (void 0 !== e) return Object.keys(e).forEach(function(t) {
                    "[object Object]" === Object.prototype.toString.call(e[t]) ? s[t] = a.setOptions(e[t], i[t]) : (s[t] = e[t], void 0 !== i && void 0 !== i[t] && (s[t] = i[t]))
                }), s
            },
            searchElements: function() {
                n = [];
                for (var t = document.querySelectorAll("[data-cues]:not([data-disabled])"), e = 0; e < t.length; e++) {
                    for (var i = t[e], s = 0; s < i.children.length; s++) {
                        var o = i.children[s];
                        a.setAttrPtoC(o, "data-cue", i, "data-cues", ""), a.setAttrPtoC(o, "data-duration", i, "data-duration", !1), a.setAttrPtoC(o, "data-interval", i, "data-interval", !1), a.setAttrPtoC(o, "data-sort", i, "data-sort", !1), a.setAttrPtoC(o, "data-addClass", i, "data-addClass", !1), a.setAttrPtoC(o, "data-group", i, "data-group", !1), a.setAttrPtoC(o, "data-delay", i, "data-delay", !1)
                    }
                    i.setAttribute("data-disabled", "true")
                }
                for (t = document.querySelectorAll('[data-cue]:not([data-show="true"])'), e = 0; e < t.length; e++) i = t[e], n.push({
                    elm: i,
                    cue: a.getAttr(i, "data-cue", "fadeIn"),
                    duration: Number(a.getAttr(i, "data-duration", r.duration)),
                    interval: Number(a.getAttr(i, "data-interval", r.interval)),
                    order: a.getOrderNumber(i),
                    sort: a.getAttr(i, "data-sort", null),
                    addClass: a.getAttr(i, "data-addClass", null),
                    group: a.getAttr(i, "data-group", null),
                    delay: Number(a.getAttr(i, "data-delay", 0))
                });
                if (c)
                    for (t = docSlider.getElements().pages.length, e = 0; e < t; e++)
                        for (i = document.querySelectorAll('[data-ds-index="' + e + '"] [data-cue]:not([data-scpage])'), s = 0; s < i.length; s++) i[s].setAttribute("data-scpage", e)
            },
            sortElements: function() {
                for (var t = arguments[0], n = [].slice.call(arguments).slice(1), e = {
                        $jscomp$loop$prop$i$4: 0
                    }; e.$jscomp$loop$prop$i$4 < n.length;
                    (e = {
                        $jscomp$loop$prop$i$4: e.$jscomp$loop$prop$i$4
                    }).$jscomp$loop$prop$i$4++) t.sort(function(o) {
                    return function(t, e) {
                        var i = void 0 === n[o.$jscomp$loop$prop$i$4][1] || n[o.$jscomp$loop$prop$i$4][1],
                            s = n[o.$jscomp$loop$prop$i$4][0];
                        return t[s] > e[s] ? i ? 1 : -1 : t[s] < e[s] ? i ? -1 : 1 : 0
                    }
                }(e))
            },
            randElements: function(t) {
                for (var e = t.length - 1; 0 < e; e--) {
                    var i = Math.floor(Math.random() * (e + 1)),
                        s = t[e];
                    t[e] = t[i], t[i] = s
                }
                return t
            },
            setDurationValue: function(t, e, i) {
                return void 0 === e ? t : (e = e.duration, (t = -1 === (i + "").indexOf(".") ? t + e + i : t + e + e * i) < 0 ? 0 : t)
            },
            getOrderNumber: function(t) {
                return t.hasAttribute("data-order") ? 0 <= (t = Number(t.getAttribute("data-order"))) ? t : Math.pow(2, 53) - 1 + t : Math.pow(2, 52) - 1
            },
            setAttrPtoC: function(t, e, i, s, o) {
                i.hasAttribute(s) ? t.hasAttribute(e) || t.setAttribute(e, i.getAttribute(s)) : !1 !== o && t.setAttribute(e, o)
            },
            getAttr: function(t, e, i) {
                return t.hasAttribute(e) ? t.getAttribute(e) : i
            },
            getOffsetTop: function(t) {
                return t.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop)
            },
            setClassNames: function(t, e) {
                if (e) {
                    e = e.split(" ");
                    for (var i = 0; i < e.length; i++) t.classList.add(e[i])
                }
            },
            setQuery: function() {
                o = {};
                for (var t = 0; t < n.length; t++) {
                    var e = n[t],
                        i = e.group || "$" + a.getOffsetTop(e.elm);
                    if (!e.elm.hasAttribute("data-show")) {
                        if (c) {
                            var s = e.elm.getAttribute("data-scpage");
                            if (s !== docSlider.getCurrentIndex() + "" && null !== s) continue
                        }
                        void 0 === o[i] && (o[i] = []), o[i].push(e)
                    }
                }
            },
            runQuery: function() {
                for (var t = Object.keys(o), e = {}, i = 0; i < t.length; e = {
                        $jscomp$loop$prop$elms$6: e.$jscomp$loop$prop$elms$6,
                        $jscomp$loop$prop$interval$7: e.$jscomp$loop$prop$interval$7
                    }, i++)
                    if (e.$jscomp$loop$prop$elms$6 = o[t[i]], a.isElementIn(e.$jscomp$loop$prop$elms$6[0].elm)) {
                        "reverse" === e.$jscomp$loop$prop$elms$6[0].sort ? e.$jscomp$loop$prop$elms$6.reverse() : "random" === e.$jscomp$loop$prop$elms$6[0].sort && a.randElements(e.$jscomp$loop$prop$elms$6), a.sortElements(e.$jscomp$loop$prop$elms$6, ["order"]);
                        for (var s = e.$jscomp$loop$prop$interval$7 = 0; s < e.$jscomp$loop$prop$elms$6.length; s++) ! function(e) {
                            return function(t) {
                                e.$jscomp$loop$prop$elms$6[t].elm.setAttribute("data-show", "true"), a.setClassNames(e.$jscomp$loop$prop$elms$6[t].elm, e.$jscomp$loop$prop$elms$6[t].addClass), e.$jscomp$loop$prop$interval$7 = a.setDurationValue(e.$jscomp$loop$prop$interval$7, e.$jscomp$loop$prop$elms$6[t - 1], e.$jscomp$loop$prop$elms$6[t].interval), e.$jscomp$loop$prop$elms$6[t].elm.style.animationName = e.$jscomp$loop$prop$elms$6[t].cue, e.$jscomp$loop$prop$elms$6[t].elm.style.animationDuration = e.$jscomp$loop$prop$elms$6[t].duration + "ms", e.$jscomp$loop$prop$elms$6[t].elm.style.animationTimingFunction = "ease", e.$jscomp$loop$prop$elms$6[t].elm.style.animationDelay = e.$jscomp$loop$prop$interval$7 + e.$jscomp$loop$prop$elms$6[t].delay + "ms", e.$jscomp$loop$prop$elms$6[t].elm.style.animationDirection = "normal", e.$jscomp$loop$prop$elms$6[t].elm.style.animationFillMode = "both"
                            }
                        }(e)(s);
                        delete o[t[i]]
                    }
            },
            isElementIn: function(t) {
                var e = t.hasAttribute("data-scpage") ? a.isScrollEndWithDocSlider : a.isScrollEnd;
                return window.pageYOffset > a.getOffsetTop(t) - window.innerHeight * r.percentage || e()
            },
            isScrollEnd: function() {
                var t = window.document.documentElement;
                return (window.document.body.scrollTop || t.scrollTop) >= t.scrollHeight - t.clientHeight
            },
            isScrollEndWithDocSlider: function() {
                var t = docSlider.getCurrentPage();
                return t.scrollTop >= t.scrollHeight - t.clientHeight
            }
        };
    return {
        init: function(t) {
            r = a.setOptions(i, t), h = r.enable, c = r.docSlider, e = r.pageChangeReset, c || (a.setEvents(), a.searchElements(), a.setQuery())
        },
        update: function() {
            h && (a.searchElements(), a.setQuery(), a.runQuery())
        },
        enable: function(t) {
            h = void 0 === t ? !h : t, scrollCue.update()
        },
        _hasDocSlider: function() {
            return c
        },
        _hasPageChangeReset: function() {
            return e
        },
        _initWithDocSlider: function(t) {
            a.setEvents(t), a.searchElements(), a.setQuery()
        },
        _updateWithDocSlider: function() {
            h && (a.setQuery(), a.runQuery())
        },
        _searchElements: function() {
            a.searchElements()
        }
    }
}();

function TyperSetup() {
    typers = {}, elements = document.getElementsByClassName("typer");
    for (var t = 0; i = elements[t++];) typers[i.id] = new Typer(i);
    elements = document.getElementsByClassName("typer-stop");
    for (t = 0; i = elements[t++];) {
        var e = typers[i.dataset.owner];
        i.onclick = function() {
            e.stop()
        }
    }
    elements = document.getElementsByClassName("typer-start");
    for (t = 0; i = elements[t++];) {
        e = typers[i.dataset.owner];
        i.onclick = function() {
            e.start()
        }
    }
    elements2 = document.getElementsByClassName("cursor");
    for (var i, t = 0; i = elements2[t++];) {
        var s = new Cursor(i);
        s.owner.cursor = s, console.log(s.owner.cursor)
    }
}! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function($) {
    var ShowMoreItems = window.ShowMoreItems || {},
        ShowMoreItems = function(t, e) {
            $(t).addClass("showMoreItemsList");
            var i = {
                    nowNum: 1,
                    startNum: 1,
                    afterNum: 1,
                    original: !1,
                    moreText: "Show more",
                    noMoreText: "No more",
                    backMoreText: "Reset",
                    responsive: "",
                    after: function() {}
                },
                s = $(t).data("showMoreItems") || {};
            this.defaults = $.extend({}, i, e, s), this.options = $.extend({}, i, e, s), this.registerBreakpoints(t), this.init(t)
        };
    ShowMoreItems.prototype.init = function(t) {
        return this.sum = $(t).children().length, this.runData(t, this), !1
    }, ShowMoreItems.prototype.runData = function(i, s) {
        var o = this;
        o.goOut = !1, $(i).children().hide(), $(i).next(".button-box").remove(), o.nowNum = s.options.nowNum - 1, o.goNum = o.nowNum + s.options.startNum, o.sum <= s.options.startNum && (o.goNum = o.sum, o.goOut = !0);
        for (var t = o.nowNum; t < o.goNum; t++) $(i).children().eq(t).show(), o.nowNum += 1;
        o.goOut || $(i).after('<div class="button-box text-center mt-10"><button class="btn rounded-pill btn-soft-ash addListData">' + s.options.moreText + "</button></div>"), $(i).next().on("click", ".addListData", function(t) {
            o.goNum = o.nowNum + s.options.afterNum, o.sum <= o.goNum && (o.goNum = o.sum, o.goOut = !0);
            for (var e = o.nowNum; e < o.goNum; e++) $(i).children().eq(e).show(), o.nowNum += 1;
            o.goOut && s.options.original ? $(this).text(s.options.backMoreText).addClass("original") : o.goOut && $(this).text(s.options.noMoreText).addClass("d-none"), s.options.after()
        }), $(i).next().on("click", ".original", function(t) {
            return $(this).removeClass("original"), o.reflesh($(this)), !1
        })
    }, ShowMoreItems.prototype.reflesh = function(t) {
        thisE = t.parent().prev(), t.remove(), this.registerBreakpoints(t), this.init(thisE)
    }, ShowMoreItems.prototype.registerBreakpoints = function(t) {
        var i = this;
        i.options.responsive && (ResponsiveArr = i.options.responsive, ResponsiveArr = ResponsiveArr.sort(function(t, e) {
            return t.breakpoint > e.breakpoint ? -1 : 1
        }), i.options.responsive = ResponsiveArr, i.Oindex = -1, i.Owidth = $(window).width(), $.each(i.options.responsive, function(t, e) {
            $(window).width() <= e.breakpoint && (i.Oindex = t, e = e.settings, i.options = $.extend({}, i.options, e))
        }), $(window).resize(function() {
            return run = !1, $(window).width() < i.Owidth && (i.Owidth = $(window).width(), $.each(i.options.responsive, function(t, e) {
                if (i.Owidth <= e.breakpoint && i.Oindex < t) return i.Oindex = t, e = e.settings, i.options = $.extend({}, i.options, i.defaults), i.options = $.extend({}, i.options, e), run = !0, i.Oindex
            })), $(window).width() > i.Owidth && (i.Owidth = $(window).width(), $.each(ResponsiveArr, function(t, e) {
                if (i.Owidth > e.breakpoint && i.Oindex > t - 1) return i.Oindex = t - 1, run = (-1 != i.Oindex ? (e = ResponsiveArr[t - 1].settings, i.options = $.extend({}, i.options, i.defaults), i.options = $.extend({}, i.options, e)) : i.options = $.extend({}, i.options, i.defaults), !0), i.Oindex
            })), 1 == run && i.runData(t, i), !1
        }))
    }, $.fn.showMoreItems = function() {
        for (var t, e = arguments[0], i = Array.prototype.slice.call(arguments, 1), s = this.length, o = 0; o < s; o++)
            if ("object" == typeof e || void 0 === e ? this[o].showMoreItems = new ShowMoreItems(this[o], e) : t = this[o].showMoreItems[e].apply(this[o].showMoreItems, i), void 0 !== t) return t;
        return this
    }, $(function() {
        var settings;
        $('[data-showMoreItems="true"]').length && (selecter = $('[data-showMoreItems="true"]'), "true" == selecter.attr("data-showMoreItems") && (settings = {
            nowNum: 1,
            getView: 0,
            startNum: 1,
            afterNum: 1,
            original: !1,
            moreText: "Show more",
            noMoreText: "No more",
            backMoreText: "Reset",
            responsive: "",
            after: function() {}
        }, selecter.attr("data-nowNum") && (settings.nowNum = parseInt(selecter.attr("data-nowNum"))), selecter.attr("data-startNum") && (settings.startNum = parseInt(selecter.attr("data-startNum"))), selecter.attr("data-afterNum") && (settings.afterNum = parseInt(selecter.attr("data-afterNum"))), selecter.attr("data-original") && (settings.original = Boolean(selecter.attr("data-original"))), selecter.attr("data-moreText") && (settings.moreText = selecter.attr("data-moreText")), selecter.attr("data-noMoreText") && (settings.noMoreText = selecter.attr("data-noMoreText")), selecter.attr("data-backMoreText") && (settings.backMoreText = selecter.attr("data-backMoreText")), selecter.attr("data-responsive") && (settings.responsive = eval(selecter.attr("data-responsive")))), $('[data-showMoreItems="true"]').showMoreItems(settings))
    })
}),
function(a, h) {
    var e, o, c = "createElement",
        v = "getElementsByTagName",
        b = "length",
        w = "style",
        l = "title",
        g = "undefined",
        x = "setAttribute",
        $ = "getAttribute",
        T = null,
        f = "__svgInject",
        _ = "--inject-",
        y = new RegExp(_ + "\\d+", "g"),
        S = "LOAD_FAIL",
        i = "SVG_NOT_SUPPORTED",
        C = "SVG_INVALID",
        u = ["src", "alt", "onload", "onerror"],
        k = h[c]("a"),
        A = typeof SVGRect != g,
        d = {
            useCache: !0,
            copyAttributes: !0,
            makeIdsUnique: !0
        },
        E = {
            clipPath: ["clip-path"],
            "color-profile": T,
            cursor: T,
            filter: T,
            linearGradient: ["fill", "stroke"],
            marker: ["marker", "marker-end", "marker-mid", "marker-start"],
            mask: T,
            pattern: ["fill", "stroke"],
            radialGradient: ["fill", "stroke"]
        },
        n = 1,
        p = 2,
        M = 1;

    function I(t) {
        return (e = e || new XMLSerializer).serializeToString(t)
    }

    function O(t, e) {
        var i, s, o, n = _ + M++,
            r = /url\("?#([a-zA-Z][\w:.-]*)"?\)/g,
            a = t.querySelectorAll("[id]"),
            l = e ? [] : T,
            h = {},
            c = [],
            u = !1;
        if (a[b]) {
            for (y = 0; y < a[b]; y++)(s = a[y].localName) in E && (h[s] = 1);
            for (s in h)(E[s] || [s]).forEach(function(t) {
                c.indexOf(t) < 0 && c.push(t)
            });
            c[b] && c.push(w);
            for (var d, p, m, g = t[v]("*"), f = t, y = -1; f != T;) {
                if (f.localName == w)(m = (p = f.textContent) && p.replace(r, function(t, e) {
                    return l && (l[e] = 1), "url(#" + e + n + ")"
                })) !== p && (f.textContent = m);
                else if (f.hasAttributes()) {
                    for (o = 0; o < c[b]; o++) d = c[o], (m = (p = f[$](d)) && p.replace(r, function(t, e) {
                        return l && (l[e] = 1), "url(#" + e + n + ")"
                    })) !== p && f[x](d, m);
                    ["xlink:href", "href"].forEach(function(t) {
                        var e = f[$](t);
                        /^\s*#/.test(e) && (e = e.trim(), f[x](t, e + n), l && (l[e.substring(1)] = 1))
                    })
                }
                f = g[++y]
            }
            for (y = 0; y < a[b]; y++) i = a[y], l && !l[i.id] || (i.id += n, u = !0)
        }
        return u
    }

    function P(t, e, i, s) {
        var o;
        e ? (e[x]("data-inject-url", i), (o = t.parentNode) && (s.copyAttributes && function(t, e) {
            for (var i, s = t.attributes, o = 0; o < s[b]; o++) {
                var n, r, a = (r = s[o]).name; - 1 == u.indexOf(a) && (i = r.value, a == l ? ((r = e.firstElementChild) && r.localName.toLowerCase() == l ? n = r : (n = h[c + "NS"]("http://www.w3.org/2000/svg", l), e.insertBefore(n, r)), n.textContent = i) : e[x](a, i))
            }
        }(t, e), e = (i = s.beforeInject) && i(t, e) || e, o.replaceChild(e, t), t[f] = n, L(t), (o = s.afterInject) && o(t, e))) : D(t, s)
    }

    function z() {
        for (var t = {}, e = arguments, i = 0; i < e[b]; i++) {
            var s, o = e[i];
            for (s in o) o.hasOwnProperty(s) && (t[s] = o[s])
        }
        return t
    }

    function j(t, e) {
        if (e) {
            try {
                i = t, s = (o = o || new DOMParser).parseFromString(i, "text/xml")
            } catch (t) {
                return T
            }
            return s[v]("parsererror")[b] ? T : s.documentElement
        }
        var i, s = h.createElement("div");
        return s.innerHTML = t, s.firstElementChild
    }

    function L(t) {
        t.removeAttribute("onload")
    }

    function s(t) {
        console.error("SVGInject: " + t)
    }

    function r(t, e, i) {
        t[f] = p, i.onFail ? i.onFail(t, e) : s(e)
    }

    function D(t, e) {
        L(t), r(t, C, e)
    }

    function q(t, e) {
        L(t), r(t, i, e)
    }

    function N(t, e) {
        r(t, S, e)
    }

    function H(t) {
        t.onload = T, t.onerror = T
    }

    function F() {
        s("no img element")
    }
    var t = function t(e, i) {
        var s, o, n = z(d, i),
            m = {};

        function r(r, a) {
            a = z(n, a);

            function t(e) {
                function t() {
                    var t = a.onAllFinish;
                    t && t(), e && e()
                }
                if (r && typeof r[b] != g) {
                    var i = 0,
                        s = r[b];
                    if (0 == s) t();
                    else {
                        function o() {
                            ++i == s && t()
                        }
                        for (var n = 0; n < s; n++) l(r[n], a, o)
                    }
                } else l(r, a, t)
            }
            return typeof Promise == g ? t() : new Promise(t)
        }

        function l(n, r, t) {
            if (n) {
                var e = n[f];
                if (e) Array.isArray(e) ? e.push(t) : t();
                else {
                    if (H(n), !A) return q(n, r), t(), 0;
                    e = r.beforeLoad, e = e && e(n) || n[$]("src");
                    if (!e) return "" === e && N(n, r), t(), 0;
                    var i = [];
                    n[f] = i;

                    function a() {
                        t(), i.forEach(function(t) {
                            t()
                        })
                    }

                    function l(e) {
                        c && (m[h].forEach(function(t) {
                            t(e)
                        }), m[h] = e)
                    }
                    var h = (k.href = e, k.href),
                        c = r.useCache,
                        u = r.makeIdsUnique;
                    if (c) {
                        e = function(t) {
                            var e, i, s, o;
                            t === S ? N(n, r) : t === C ? D(n, r) : (i = t[0], s = t[1], o = t[2], u && (i === T ? (i = O(e = j(s, !1), !1), t[0] = i, t[2] = i && I(e)) : i && (s = o.replace(y, _ + M++))), e = e || j(s, !1), P(n, e, h, r)), a()
                        };
                        if (typeof(s = m[h]) != g) return s.isCallbackQueue ? s.push(e) : e(s), 0;
                        (s = []).isCallbackQueue = !0, m[h] = s
                    }
                    o = function(t, e) {
                        var i, s, o = t instanceof Document ? t.documentElement : j(e, !0),
                            t = r.afterLoad;
                        !t || (s = t(o, e) || o) && (e = (i = "string" == typeof s) ? s : I(o), o = i ? j(s, !0) : s), o instanceof SVGElement ? (i = T, u && (i = O(o, !1)), c && (s = i && I(o), l([i, e, s])), P(n, o, h, r)) : (D(n, r), l(C)), a()
                    }, d = function() {
                        N(n, r), l(S), a()
                    }, (s = h) && ((p = new XMLHttpRequest).onreadystatechange = function() {
                        var t;
                        4 == p.readyState && (200 == (t = p.status) ? o(p.responseXML, p.responseText.trim()) : (400 <= t || 0 == t) && d())
                    }, p.open("GET", s, !0), p.send())
                }
            } else F();
            var s, o, d, p
        }
        return A && (s = 'img[onload^="' + e + '("]{visibility:hidden;}', (o = h[v]("head")[0]) && ((i = h[c](w)).type = "text/css", i.appendChild(h.createTextNode(s)), o.appendChild(i))), r.setOptions = function(t) {
            n = z(n, t)
        }, r.create = t, r.err = function(t, e) {
            t ? t[f] != p && (H(t), A ? (L(t), N(t, n)) : q(t, n), e && (L(t), t.src = e)) : F()
        }, a[e] = r
    }("SVGInject");
    "object" == typeof module && "object" == typeof module.exports && (module.exports = t)
}(window, document);
var Typer = function(t) {
    console.log("constructor called");
    var e = (this.element = t).dataset.delim || ",",
        i = t.dataset.words || "override these,sample typing";
    this.words = i.split(e).filter(function(t) {
        return t
    }), this.delay = t.dataset.delay || 200, this.deleteDelay = t.dataset.deleteDelay || 800, this.progress = {
        word: 0,
        char: 0,
        building: !0,
        atWordEnd: !1
    }, this.typing = !0;
    t = t.dataset.colors || "";
    this.colors = t.split(","), this.element.style.color = this.colors[0], this.colorIndex = 0, this.doTyping()
};
Typer.prototype.start = function() {
    this.typing || (this.typing = !0, this.doTyping())
}, Typer.prototype.stop = function() {
    this.typing = !1
}, Typer.prototype.doTyping = function() {
    var t, e = this.element,
        i = this.progress,
        s = i.word,
        o = i.char,
        o = this.words[s][o];
    i.atWordEnd = !1, this.cursor && (this.cursor.element.style.opacity = "1", this.cursor.on = !0, clearInterval(this.cursor.interval), t = this.cursor, this.cursor.interval = setInterval(function() {
        t.updateBlinkState()
    }, 400)), i.building ? (e.innerHTML += o, i.char += 1, i.char == this.words[s].length && (i.building = !1, i.atWordEnd = !0)) : (e.innerHTML = e.innerHTML.slice(0, -1), this.element.innerHTML || (i.building = !0, i.word = (i.word + 1) % this.words.length, i.char = 0, this.colorIndex = (this.colorIndex + 1) % this.colors.length, this.element.style.color = this.colors[this.colorIndex]));
    var n = this;
    setTimeout(function() {
        n.typing && n.doTyping()
    }, i.atWordEnd ? this.deleteDelay : this.delay)
};
var Cursor = function(t) {
    this.element = t, this.cursorDisplay = t.dataset.cursorDisplay || "|", this.owner = typers[t.dataset.owner] || "", t.innerHTML = this.cursorDisplay, this.on = !0, t.style.transition = "all 0.1s";
    var e = this;
    this.interval = setInterval(function() {
        e.updateBlinkState()
    }, 400)
};
Cursor.prototype.updateBlinkState = function() {
        this.on ? (this.element.style.opacity = "0", this.on = !1) : (this.element.style.opacity = "1", this.on = !0)
    }, TyperSetup(),
    function(r) {
        "use strict";

        function a(t) {
            return t.is('[type="checkbox"]') ? t.prop("checked") : t.is('[type="radio"]') ? !!r('[name="' + t.attr("name") + '"]:checked').length : t.is("select[multiple]") ? (t.val() || []).length : t.val()
        }

        function e(s) {
            return this.each(function() {
                var t = r(this),
                    e = r.extend({}, o.DEFAULTS, t.data(), "object" == typeof s && s),
                    i = t.data("bs.validator");
                !i && "destroy" == s || (i || t.data("bs.validator", i = new o(this, e)), "string" == typeof s && i[s]())
            })
        }
        var o = function(t, e) {
            this.options = e, this.validators = r.extend({}, o.VALIDATORS, e.custom), this.$element = r(t), this.$btn = r('button[type="submit"], input[type="submit"]').filter('[form="' + this.$element.attr("id") + '"]').add(this.$element.find('input[type="submit"], button[type="submit"]')), this.update(), this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator", r.proxy(this.onInput, this)), this.$element.on("submit.bs.validator", r.proxy(this.onSubmit, this)), this.$element.on("reset.bs.validator", r.proxy(this.reset, this)), this.$element.find("[data-match]").each(function() {
                var t = r(this),
                    e = t.attr("data-match");
                r(e).on("input.bs.validator", function() {
                    a(t) && t.trigger("input.bs.validator")
                })
            }), this.$inputs.filter(function() {
                return a(r(this)) && !r(this).closest(".has-error").length
            }).trigger("focusout"), this.$element.attr("novalidate", !0)
        };
        o.VERSION = "0.11.9", o.INPUT_SELECTOR = ':input:not([type="hidden"], [type="submit"], [type="reset"], button)', o.FOCUS_OFFSET = 20, o.DEFAULTS = {
            delay: 500,
            html: !1,
            disable: !0,
            focus: !0,
            custom: {},
            errors: {
                match: "Does not match",
                minlength: "Not long enough"
            },
            feedback: {
                success: "glyphicon-ok",
                error: "glyphicon-remove"
            }
        }, o.VALIDATORS = {
            native: function(t) {
                t = t[0];
                return t.checkValidity ? !t.checkValidity() && !t.validity.valid && (t.validationMessage || "error!") : void 0
            },
            match: function(t) {
                var e = t.attr("data-match");
                return t.val() !== r(e).val() && o.DEFAULTS.errors.match
            },
            minlength: function(t) {
                var e = t.attr("data-minlength");
                return t.val().length < e && o.DEFAULTS.errors.minlength
            }
        }, o.prototype.update = function() {
            var t = this;
            return this.$inputs = this.$element.find(o.INPUT_SELECTOR).add(this.$element.find('[data-validate="true"]')).not(this.$element.find('[data-validate="false"]').each(function() {
                t.clearErrors(r(this))
            })), this.toggleSubmit(), this
        }, o.prototype.onInput = function(t) {
            var e = this,
                i = r(t.target),
                t = "focusout" !== t.type;
            this.$inputs.is(i) && this.validateInput(i, t).done(function() {
                e.toggleSubmit()
            })
        }, o.prototype.validateInput = function(e, i) {
            var s = (a(e), e.data("bs.validator.errors"));
            e.is('[type="radio"]') && (e = this.$element.find('input[name="' + e.attr("name") + '"]'));
            var o = r.Event("validate.bs.validator", {
                relatedTarget: e[0]
            });
            if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                var n = this;
                return this.runValidators(e).done(function(t) {
                    e.data("bs.validator.errors", t), t.length ? i ? n.defer(e, n.showErrors) : n.showErrors(e) : n.clearErrors(e), s && t.toString() === s.toString() || (o = t.length ? r.Event("invalid.bs.validator", {
                        relatedTarget: e[0],
                        detail: t
                    }) : r.Event("valid.bs.validator", {
                        relatedTarget: e[0],
                        detail: s
                    }), n.$element.trigger(o)), n.toggleSubmit(), n.$element.trigger(r.Event("validated.bs.validator", {
                        relatedTarget: e[0]
                    }))
                })
            }
        }, o.prototype.runValidators = function(s) {
            function o(t) {
                return s.attr("data-" + t + "-error") || ((t = s[0].validity).typeMismatch ? s.attr("data-type-error") : t.patternMismatch ? s.attr("data-pattern-error") : t.stepMismatch ? s.attr("data-step-error") : t.rangeOverflow ? s.attr("data-max-error") : t.rangeUnderflow ? s.attr("data-min-error") : t.valueMissing ? s.attr("data-required-error") : null) || s.attr("data-error")
            }
            var n = [],
                e = r.Deferred();
            return s.data("bs.validator.deferred") && s.data("bs.validator.deferred").reject(), s.data("bs.validator.deferred", e), r.each(this.validators, r.proxy(function(t, e) {
                var i = null;
                !a(s) && !s.attr("required") || void 0 === s.attr("data-" + t) && "native" != t || !(i = e.call(this, s)) || (i = o(t) || i, ~n.indexOf(i) || n.push(i))
            }, this)), !n.length && a(s) && s.attr("data-remote") ? this.defer(s, function() {
                var t = {};
                t[s.attr("name")] = a(s), r.get(s.attr("data-remote"), t).fail(function(t, e, i) {
                    n.push(o("remote") || i)
                }).always(function() {
                    e.resolve(n)
                })
            }) : e.resolve(n), e.promise()
        }, o.prototype.validate = function() {
            var t = this;
            return r.when(this.$inputs.map(function() {
                return t.validateInput(r(this), !1)
            })).then(function() {
                t.toggleSubmit(), t.focusError()
            }), this
        }, o.prototype.focusError = function() {
            var t;
            !this.options.focus || 0 !== (t = this.$element.find(".has-error :input:first")).length && (r("html, body").animate({
                scrollTop: t.offset().top - o.FOCUS_OFFSET
            }, 250), t.focus())
        }, o.prototype.showErrors = function(t) {
            var e = this.options.html ? "html" : "text",
                i = t.data("bs.validator.errors"),
                s = t.closest(".form-label-group"),
                o = s.find(".help-block.with-errors"),
                t = s.find(".form-control-feedback");
            i.length && (i = r("<ul/>").addClass("list-unstyled mb-0").append(r.map(i, function(t) {
                return r("<li/>")[e](t)
            })), void 0 === o.data("bs.validator.originalContent") && o.data("bs.validator.originalContent", o.html()), o.empty().append(i), s.addClass("has-error has-danger"), s.hasClass("has-feedback") && t.removeClass(this.options.feedback.success) && t.addClass(this.options.feedback.error) && s.removeClass("has-success"))
        }, o.prototype.clearErrors = function(t) {
            var e = t.closest(".form-label-group"),
                i = e.find(".help-block.with-errors"),
                s = e.find(".form-control-feedback");
            i.html(i.data("bs.validator.originalContent")), e.removeClass("has-error has-danger has-success"), e.hasClass("has-feedback") && s.removeClass(this.options.feedback.error) && s.removeClass(this.options.feedback.success) && a(t) && s.addClass(this.options.feedback.success) && e.addClass("has-success")
        }, o.prototype.hasErrors = function() {
            return !!this.$inputs.filter(function() {
                return !!(r(this).data("bs.validator.errors") || []).length
            }).length
        }, o.prototype.isIncomplete = function() {
            return !!this.$inputs.filter("[required]").filter(function() {
                var t = a(r(this));
                return !("string" == typeof t ? r.trim(t) : t)
            }).length
        }, o.prototype.onSubmit = function(t) {
            this.validate(), (this.isIncomplete() || this.hasErrors()) && t.preventDefault()
        }, o.prototype.toggleSubmit = function() {
            this.options.disable && this.$btn.toggleClass("disabled", this.isIncomplete() || this.hasErrors())
        }, o.prototype.defer = function(t, e) {
            return e = r.proxy(e, this, t), this.options.delay ? (window.clearTimeout(t.data("bs.validator.timeout")), void t.data("bs.validator.timeout", window.setTimeout(e, this.options.delay))) : e()
        }, o.prototype.reset = function() {
            return this.$element.find(".form-control-feedback").removeClass(this.options.feedback.error).removeClass(this.options.feedback.success), this.$inputs.removeData(["bs.validator.errors", "bs.validator.deferred"]).each(function() {
                var t = r(this),
                    e = t.data("bs.validator.timeout");
                window.clearTimeout(e) && t.removeData("bs.validator.timeout")
            }), this.$element.find(".help-block.with-errors").each(function() {
                var t = r(this),
                    e = t.data("bs.validator.originalContent");
                t.removeData("bs.validator.originalContent").html(e)
            }), this.$btn.removeClass("disabled"), this.$element.find(".has-error, .has-danger, .has-success").removeClass("has-error has-danger has-success"), this
        }, o.prototype.destroy = function() {
            return this.reset(), this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"), this.$inputs.off(".bs.validator"), this.options = null, this.validators = null, this.$element = null, this.$btn = null, this.$inputs = null, this
        };
        var t = r.fn.validator;
        r.fn.validator = e, r.fn.validator.Constructor = o, r.fn.validator.noConflict = function() {
            return r.fn.validator = t, this
        }, r(window).on("load", function() {
            r('form[data-toggle="validator"]').each(function() {
                var t = r(this);
                e.call(t, t.data())
            })
        })
    }(jQuery);