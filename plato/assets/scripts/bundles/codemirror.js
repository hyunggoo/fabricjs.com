window.CodeMirror = function() {
    "use strict";
    function t(i, o) {
        if (!(this instanceof t)) return new t(i, o);
        this.options = o = o || {};
        for (var a in ti) !o.hasOwnProperty(a) && ti.hasOwnProperty(a) && (o[a] = ti[a]);
        h(o);
        var u = this.display = e(i);
        u.wrapper.CodeMirror = this, l(this), o.autofocus && !$r && J(this), this.view = n(new An([ new Mn([ yn("", null, q(u)) ]) ])), 
        this.nextOpId = 0, r(this), s(this), o.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), 
        this.setValue(o.value || ""), Er && setTimeout(or(Q, this, !0), 20), this.view.history = jn(), 
        ee(this);
        var c;
        try {
            c = document.activeElement == u.input;
        } catch (f) {}
        c || o.autofocus && !$r ? setTimeout(or(me, this), 20) : ye(this), Y(this, function() {
            for (var t in Jr) Jr.propertyIsEnumerable(t) && Jr[t](this, o[t], ei);
            for (var e = 0; oi.length > e; ++e) oi[e](this);
        })();
    }
    function e(t) {
        var e = {}, n = e.input = lr("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none;");
        n.setAttribute("wrap", "off"), n.setAttribute("autocorrect", "off"), n.setAttribute("autocapitalize", "off"), 
        e.inputDiv = lr("div", [ n ], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), 
        e.scrollbarH = lr("div", [ lr("div", null, null, "height: 1px") ], "CodeMirror-hscrollbar"), 
        e.scrollbarV = lr("div", [ lr("div", null, null, "width: 1px") ], "CodeMirror-vscrollbar"), 
        e.scrollbarFiller = lr("div", null, "CodeMirror-scrollbar-filler"), e.lineDiv = lr("div"), 
        e.selectionDiv = lr("div", null, null, "position: relative; z-index: 1"), e.cursor = lr("pre", " ", "CodeMirror-cursor"), 
        e.otherCursor = lr("pre", " ", "CodeMirror-cursor CodeMirror-secondarycursor"), 
        e.measure = lr("div", null, "CodeMirror-measure"), e.lineSpace = lr("div", [ e.measure, e.selectionDiv, e.lineDiv, e.cursor, e.otherCursor ], null, "position: relative; outline: none"), 
        e.mover = lr("div", [ lr("div", [ e.lineSpace ], "CodeMirror-lines") ], null, "position: relative"), 
        e.sizer = lr("div", [ e.mover ], "CodeMirror-sizer"), e.heightForcer = lr("div", " ", null, "position: absolute; height: " + ci + "px"), 
        e.gutters = lr("div", null, "CodeMirror-gutters"), e.lineGutter = null;
        var r = lr("div", [ e.sizer, e.heightForcer, e.gutters ], null, "position: relative; min-height: 100%");
        return e.scroller = lr("div", [ r ], "CodeMirror-scroll"), e.scroller.setAttribute("tabIndex", "-1"), 
        e.wrapper = lr("div", [ e.inputDiv, e.scrollbarH, e.scrollbarV, e.scrollbarFiller, e.scroller ], "CodeMirror"), 
        Br && (e.gutters.style.zIndex = -1, e.scroller.style.paddingRight = 0), t.appendChild ? t.appendChild(e.wrapper) : t(e.wrapper), 
        qr && (n.style.width = "0px"), Hr || (e.scroller.draggable = !0), zr ? (e.inputDiv.style.height = "1px", 
        e.inputDiv.style.position = "absolute") : Br && (e.scrollbarH.style.minWidth = e.scrollbarV.style.minWidth = "18px"), 
        e.viewOffset = e.showingFrom = e.showingTo = e.lastSizeC = 0, e.lineNumWidth = e.lineNumInnerWidth = e.lineNumChars = null, 
        e.prevInput = "", e.alignWidgets = !1, e.pollingFast = !1, e.poll = new Qn(), e.draggingText = !1, 
        e.cachedCharWidth = e.cachedTextHeight = null, e.measureLineCache = [], e.measureLineCachePos = 0, 
        e.inaccurateSelection = !1, e.pasteIncoming = !1, e;
    }
    function n(t) {
        var e = {
            line: 0,
            ch: 0
        };
        return {
            doc: t,
            frontier: 0,
            highlight: new Qn(),
            sel: {
                from: e,
                to: e,
                head: e,
                anchor: e,
                shift: !1,
                extend: !1
            },
            scrollTop: 0,
            scrollLeft: 0,
            overwrite: !1,
            focused: !1,
            maxLine: En(t, 0),
            maxLineLength: 0,
            maxLineChanged: !1,
            suppressEdits: !1,
            goalColumn: null,
            cantEdit: !1,
            keyMaps: []
        };
    }
    function r(e) {
        var n = e.view.doc;
        e.view.mode = t.getMode(e.options, e.options.mode), n.iter(0, n.size, function(t) {
            t.stateAfter = null;
        }), e.view.frontier = 0, N(e, 100);
    }
    function i(t) {
        var e = t.view.doc, n = q(t.display);
        if (t.options.lineWrapping) {
            t.display.wrapper.className += " CodeMirror-wrap";
            var r = t.display.scroller.clientWidth / $(t.display) - 3;
            e.iter(0, e.size, function(t) {
                if (0 != t.height) {
                    var e = Math.ceil(t.text.length / r) || 1;
                    1 != e && Bn(t, e * n);
                }
            }), t.display.sizer.style.minWidth = "";
        } else t.display.wrapper.className = t.display.wrapper.className.replace(" CodeMirror-wrap", ""), 
        c(t.view), e.iter(0, e.size, function(t) {
            0 != t.height && Bn(t, n);
        });
        U(t, 0, e.size), j(t), setTimeout(function() {
            f(t.display, t.view.doc.height);
        }, 100);
    }
    function o(t) {
        var e = ai[t.options.keyMap].style;
        t.display.wrapper.className = t.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (e ? " cm-keymap-" + e : "");
    }
    function s(t) {
        t.display.wrapper.className = t.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + t.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), 
        j(t);
    }
    function a(t) {
        l(t), y(t, !0);
    }
    function l(t) {
        var e = t.display.gutters, n = t.options.gutters;
        ur(e);
        for (var r = 0; n.length > r; ++r) {
            var i = n[r], o = e.appendChild(lr("div", null, "CodeMirror-gutter " + i));
            "CodeMirror-linenumbers" == i && (t.display.lineGutter = o, o.style.width = (t.display.lineNumWidth || 1) + "px");
        }
        e.style.display = r ? "" : "none";
    }
    function u(t, e) {
        if (0 == e.height) return 0;
        for (var n, r = e.text.length, i = e; n = ln(i); ) {
            var o = n.find();
            i = En(t, o.from.line), r += o.from.ch - o.to.ch;
        }
        for (i = e; n = un(i); ) {
            var o = n.find();
            r -= i.text.length - o.from.ch, i = En(t, o.to.line), r += i.text.length - o.to.ch;
        }
        return r;
    }
    function c(t) {
        t.maxLine = En(t.doc, 0), t.maxLineLength = u(t.doc, t.maxLine), t.maxLineChanged = !0, 
        t.doc.iter(1, t.doc.size, function(e) {
            var n = u(t.doc, e);
            n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e);
        });
    }
    function h(t) {
        for (var e = !1, n = 0; t.gutters.length > n; ++n) "CodeMirror-linenumbers" == t.gutters[n] && (t.lineNumbers ? e = !0 : t.gutters.splice(n--, 1));
        !e && t.lineNumbers && t.gutters.push("CodeMirror-linenumbers");
    }
    function f(t, e) {
        var n = e + 2 * B(t);
        t.sizer.style.minHeight = t.heightForcer.style.top = n + "px";
        var r = Math.max(n, t.scroller.scrollHeight), i = t.scroller.scrollWidth > t.scroller.clientWidth, o = r > t.scroller.clientHeight;
        o ? (t.scrollbarV.style.display = "block", t.scrollbarV.style.bottom = i ? fr(t.measure) + "px" : "0", 
        t.scrollbarV.firstChild.style.height = r - t.scroller.clientHeight + t.scrollbarV.clientHeight + "px") : t.scrollbarV.style.display = "", 
        i ? (t.scrollbarH.style.display = "block", t.scrollbarH.style.right = o ? fr(t.measure) + "px" : "0", 
        t.scrollbarH.firstChild.style.width = t.scroller.scrollWidth - t.scroller.clientWidth + t.scrollbarH.clientWidth + "px") : t.scrollbarH.style.display = "", 
        i && o ? (t.scrollbarFiller.style.display = "block", t.scrollbarFiller.style.height = t.scrollbarFiller.style.width = fr(t.measure) + "px") : t.scrollbarFiller.style.display = "", 
        Wr && 0 === fr(t.measure) && (t.scrollbarV.style.minWidth = t.scrollbarH.style.minHeight = Pr ? "18px" : "12px");
    }
    function p(t, e, n) {
        var r = t.scroller.scrollTop, i = t.wrapper.clientHeight;
        "number" == typeof n ? r = n : n && (r = n.top, i = n.bottom - n.top), r = Math.floor(r - B(t));
        var o = Math.ceil(r + i);
        return {
            from: Hn(e, r),
            to: Hn(e, o)
        };
    }
    function d(t) {
        var e = t.display;
        if (e.alignWidgets || e.gutters.firstChild) {
            for (var n = m(e) - e.scroller.scrollLeft + t.view.scrollLeft, r = e.gutters.offsetWidth, i = n + "px", o = e.lineDiv.firstChild; o; o = o.nextSibling) if (o.alignable) for (var s = 0, a = o.alignable; a.length > s; ++s) a[s].style.left = i;
            e.gutters.style.left = n + r + "px";
        }
    }
    function g(t) {
        if (!t.options.lineNumbers) return !1;
        var e = t.view.doc, n = v(t.options, e.size - 1), r = t.display;
        if (n.length != r.lineNumChars) {
            var i = r.measure.appendChild(lr("div", [ lr("div", n) ], "CodeMirror-linenumber CodeMirror-gutter-elt")), o = i.firstChild.offsetWidth, s = i.offsetWidth - o;
            return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - s), 
            r.lineNumWidth = r.lineNumInnerWidth + s, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1, 
            r.lineGutter.style.width = r.lineNumWidth + "px", !0;
        }
        return !1;
    }
    function v(t, e) {
        return t.lineNumberFormatter(e + t.firstLineNumber) + "";
    }
    function m(t) {
        return t.scroller.getBoundingClientRect().left - t.sizer.getBoundingClientRect().left;
    }
    function y(t, e, n) {
        var r = t.display.showingFrom, i = t.display.showingTo, o = x(t, e, n);
        return o && (Kn(t, t, "update", t), (t.display.showingFrom != r || t.display.showingTo != i) && Kn(t, t, "viewportChange", t, t.display.showingFrom, t.display.showingTo)), 
        _(t), f(t.display, t.view.doc.height), o;
    }
    function x(t, e, n) {
        var r = t.display, i = t.view.doc;
        if (!r.wrapper.clientWidth) return r.showingFrom = r.showingTo = r.viewOffset = 0, 
        void 0;
        var o = p(r, i, n);
        if (!(e !== !0 && 0 == e.length && o.from > r.showingFrom && o.to < r.showingTo)) {
            if (e && g(t) && (e = !0), r.sizer.style.marginLeft = r.scrollbarH.style.left = r.gutters.offsetWidth + "px", 
            e !== !0 && Yr) for (var s = 0; e.length > s; ++s) for (var a, l = e[s]; a = ln(En(i, l.from)); ) {
                var u = a.find().from.line;
                l.diff && (l.diff -= l.from - u), l.from = u;
            }
            var c = e === !0 ? 0 : 1/0;
            if (t.options.lineNumbers && e && e !== !0) for (var s = 0; e.length > s; ++s) if (e[s].diff) {
                c = e[s].from;
                break;
            }
            var u = Math.max(o.from - t.options.viewportMargin, 0), h = Math.min(i.size, o.to + t.options.viewportMargin);
            if (u > r.showingFrom && 20 > u - r.showingFrom && (u = r.showingFrom), r.showingTo > h && 20 > r.showingTo - h && (h = Math.min(i.size, r.showingTo)), 
            Yr) for (u = Dn(cn(i, En(i, u))); i.size > h && hn(En(i, h)); ) ++h;
            for (var f = e === !0 ? [] : b([ {
                from: r.showingFrom,
                to: r.showingTo
            } ], e), d = 0, s = 0; f.length > s; ++s) {
                var v = f[s];
                u > v.from && (v.from = u), v.to > h && (v.to = h), v.from >= v.to ? f.splice(s--, 1) : d += v.to - v.from;
            }
            if (d != h - u || u != r.showingFrom || h != r.showingTo) {
                f.sort(function(t, e) {
                    return t.from - e.from;
                }), .7 * (h - u) > d && (r.lineDiv.style.display = "none"), C(t, u, h, f, c), r.lineDiv.style.display = "";
                var m = u != r.showingFrom || h != r.showingTo || r.lastSizeC != r.wrapper.clientHeight;
                m && (r.lastSizeC = r.wrapper.clientHeight), r.showingFrom = u, r.showingTo = h, 
                N(t, 100);
                for (var y, x = r.lineDiv.offsetTop, w = r.lineDiv.firstChild; w; w = w.nextSibling) if (w.lineObj) {
                    if (Br) {
                        var k = w.offsetTop + w.offsetHeight;
                        y = k - x, x = k;
                    } else {
                        var _ = w.getBoundingClientRect();
                        y = _.bottom - _.top;
                    }
                    var S = w.lineObj.height - y;
                    2 > y && (y = q(r)), (S > .001 || -.001 > S) && Bn(w.lineObj, y);
                }
                return r.viewOffset = Fn(t, En(i, u)), r.mover.style.top = r.viewOffset + "px", 
                !0;
            }
        }
    }
    function b(t, e) {
        for (var n = 0, r = e.length || 0; r > n; ++n) {
            for (var i = e[n], o = [], s = i.diff || 0, a = 0, l = t.length; l > a; ++a) {
                var u = t[a];
                i.to <= u.from && i.diff ? o.push({
                    from: u.from + s,
                    to: u.to + s
                }) : i.to <= u.from || i.from >= u.to ? o.push(u) : (i.from > u.from && o.push({
                    from: u.from,
                    to: i.from
                }), i.to < u.to && o.push({
                    from: i.to + s,
                    to: u.to + s
                }));
            }
            t = o;
        }
        return t;
    }
    function w(t) {
        for (var e = t.display, n = {}, r = {}, i = e.gutters.firstChild, o = 0; i; i = i.nextSibling, 
        ++o) n[t.options.gutters[o]] = i.offsetLeft, r[t.options.gutters[o]] = i.offsetWidth;
        return {
            fixedPos: m(e),
            gutterTotalWidth: e.gutters.offsetWidth,
            gutterLeft: n,
            gutterWidth: r,
            wrapperWidth: e.wrapper.clientWidth
        };
    }
    function C(t, e, n, r, i) {
        function o(e) {
            var n = e.nextSibling;
            return Hr && Vr && t.display.currentWheelTarget == e ? (e.style.display = "none", 
            e.lineObj = null) : u.removeChild(e), n;
        }
        var s = w(t), a = t.display, l = t.options.lineNumbers;
        r.length || Er || Hr && t.display.currentWheelTarget || ur(a.lineDiv);
        var u = a.lineDiv, c = u.firstChild, h = r.shift(), f = e;
        for (t.view.doc.iter(e, n, function(e) {
            if (h && h.to == f && (h = r.shift()), hn(e)) 0 != e.height && Bn(e, 0); else if (h && f >= h.from && h.to > f) {
                for (;c.lineObj != e; ) c = o(c);
                l && f >= i && c.lineNumber && hr(c.lineNumber, v(t.options, f)), c = c.nextSibling;
            } else {
                var n = k(t, e, f, s);
                u.insertBefore(n, c), n.lineObj = e;
            }
            ++f;
        }); c; ) c = o(c);
    }
    function k(t, e, n, r) {
        var i = _n(t, e), o = e.gutterMarkers, s = t.display;
        if (!(t.options.lineNumbers || o || e.bgClass || e.wrapClass || e.widgets && e.widgets.length)) return i;
        var a = lr("div", null, e.wrapClass, "position: relative");
        if (t.options.lineNumbers || o) {
            var l = a.appendChild(lr("div", null, null, "position: absolute; left: " + r.fixedPos + "px"));
            if (a.alignable = [ l ], !t.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (a.lineNumber = l.appendChild(lr("div", v(t.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + s.lineNumInnerWidth + "px"))), 
            o) for (var u = 0; t.options.gutters.length > u; ++u) {
                var c = t.options.gutters[u], h = o.hasOwnProperty(c) && o[c];
                h && l.appendChild(lr("div", [ h ], "CodeMirror-gutter-elt", "left: " + r.gutterLeft[c] + "px; width: " + r.gutterWidth[c] + "px"));
            }
        }
        if (e.bgClass && a.appendChild(lr("div", " ", e.bgClass + " CodeMirror-linebackground")), 
        a.appendChild(i), e.widgets) for (var f = 0, p = e.widgets; p.length > f; ++f) {
            var d = p[f], g = lr("div", [ d.node ], "CodeMirror-linewidget");
            if (g.widget = d, d.noHScroll) {
                (a.alignable || (a.alignable = [])).push(g);
                var m = r.wrapperWidth;
                g.style.left = r.fixedPos + "px", d.coverGutter || (m -= r.gutterTotalWidth, g.style.paddingLeft = r.gutterTotalWidth + "px"), 
                g.style.width = m + "px";
            }
            d.coverGutter && (g.style.zIndex = 5, g.style.position = "relative", d.noHScroll || (g.style.marginLeft = -r.gutterTotalWidth + "px")), 
            d.above ? a.insertBefore(g, t.options.lineNumbers && 0 != e.height ? l : i) : a.appendChild(g);
        }
        return Br && (a.style.zIndex = 2), a;
    }
    function _(t) {
        var e = t.display, n = Se(t.view.sel.from, t.view.sel.to);
        n || t.options.showCursorWhenSelecting ? S(t) : e.cursor.style.display = e.otherCursor.style.display = "none", 
        n ? e.selectionDiv.style.display = "none" : T(t);
        var r = W(t, t.view.sel.head, "div"), i = e.wrapper.getBoundingClientRect(), o = e.lineDiv.getBoundingClientRect();
        e.inputDiv.style.top = Math.max(0, Math.min(e.wrapper.clientHeight - 10, r.top + o.top - i.top)) + "px", 
        e.inputDiv.style.left = Math.max(0, Math.min(e.wrapper.clientWidth - 10, r.left + o.left - i.left)) + "px";
    }
    function S(t) {
        var e = t.display, n = W(t, t.view.sel.head, "div");
        e.cursor.style.left = n.left + "px", e.cursor.style.top = n.top + "px", e.cursor.style.height = Math.max(0, n.bottom - n.top) * t.options.cursorHeight + "px", 
        e.cursor.style.display = "", n.other ? (e.otherCursor.style.display = "", e.otherCursor.style.left = n.other.left + "px", 
        e.otherCursor.style.top = n.other.top + "px", e.otherCursor.style.height = .85 * (n.other.bottom - n.other.top) + "px") : e.otherCursor.style.display = "none";
    }
    function T(t) {
        function e(t, e, n, r) {
            0 > e && (e = 0), s.appendChild(lr("div", null, "CodeMirror-selected", "position: absolute; left: " + t + "px; top: " + e + "px; width: " + (null == n ? a - t : n) + "px; height: " + (r - e) + "px"));
        }
        function n(n, r, o, s) {
            function u(e) {
                return z(t, {
                    line: n,
                    ch: e
                }, "div", c);
            }
            var c = En(i, n), h = c.text.length, f = s ? 1/0 : -1/0;
            return dr(On(c), r || 0, null == o ? h : o, function(t, n, i) {
                var c = u("rtl" == i ? n - 1 : t), p = u("rtl" == i ? t : n - 1), d = c.left, g = p.right;
                p.top - c.top > 3 && (e(d, c.top, null, c.bottom), d = l, c.bottom < p.top && e(d, c.bottom, null, p.top)), 
                null == o && n == h && (g = a), null == r && 0 == t && (d = l), f = s ? Math.min(p.top, f) : Math.max(p.bottom, f), 
                l + 1 > d && (d = l), e(d, p.top, g - d, p.bottom);
            }), f;
        }
        var r = t.display, i = t.view.doc, o = t.view.sel, s = document.createDocumentFragment(), a = r.lineSpace.offsetWidth, l = D(t.display);
        if (o.from.line == o.to.line) n(o.from.line, o.from.ch, o.to.ch); else {
            for (var u, c, h = En(i, o.from.line), f = h, p = [ o.from.line, o.from.ch ]; u = un(f); ) {
                var d = u.find();
                if (p.push(d.from.ch, d.to.line, d.to.ch), d.to.line == o.to.line) {
                    p.push(o.to.ch), c = !0;
                    break;
                }
                f = En(i, d.to.line);
            }
            if (c) for (var g = 0; p.length > g; g += 3) n(p[g], p[g + 1], p[g + 2]); else {
                var v, m, y = En(i, o.to.line);
                v = o.from.ch ? n(o.from.line, o.from.ch, null, !1) : Fn(t, h) - r.viewOffset, m = o.to.ch ? n(o.to.line, ln(y) ? null : 0, o.to.ch, !0) : Fn(t, y) - r.viewOffset, 
                m > v && e(l, v, null, m);
            }
        }
        cr(r.selectionDiv, s), r.selectionDiv.style.display = "";
    }
    function L(t) {
        var e = t.display;
        clearInterval(e.blinker);
        var n = !0;
        e.cursor.style.visibility = e.otherCursor.style.visibility = "", e.blinker = setInterval(function() {
            e.cursor.offsetHeight && (e.cursor.style.visibility = e.otherCursor.style.visibility = (n = !n) ? "" : "hidden");
        }, t.options.cursorBlinkRate);
    }
    function N(t, e) {
        t.view.frontier < t.display.showingTo && t.view.highlight.set(e, or(M, t));
    }
    function M(t) {
        var e = t.view, n = e.doc;
        if (!(e.frontier >= t.display.showingTo)) {
            var r, i = +new Date() + t.options.workTime, o = Ve(e.mode, E(t, e.frontier)), s = [];
            n.iter(e.frontier, Math.min(n.size, t.display.showingTo + 500), function(n) {
                return e.frontier >= t.display.showingFrom ? (wn(t, n, o) && e.frontier >= t.display.showingFrom && (r && r.end == e.frontier ? r.end++ : s.push(r = {
                    start: e.frontier,
                    end: e.frontier + 1
                })), n.stateAfter = Ve(e.mode, o)) : (Cn(t, n, o), n.stateAfter = 0 == e.frontier % 5 ? Ve(e.mode, o) : null), 
                ++e.frontier, +new Date() > i ? (N(t, t.options.workDelay), !0) : void 0;
            }), s.length && Y(t, function() {
                for (var t = 0; s.length > t; ++t) U(this, s[t].start, s[t].end);
            })();
        }
    }
    function A(t, e) {
        for (var n, r, i = t.view.doc, o = e, s = e - 100; o > s; --o) {
            if (0 == o) return 0;
            var a = En(i, o - 1);
            if (a.stateAfter) return o;
            var l = Jn(a.text, null, t.options.tabSize);
            (null == r || n > l) && (r = o - 1, n = l);
        }
        return r;
    }
    function E(t, e) {
        var n = t.view, r = A(t, e), i = r && En(n.doc, r - 1).stateAfter;
        return i = i ? Ve(n.mode, i) : Xe(n.mode), n.doc.iter(r, e, function(o) {
            Cn(t, o, i);
            var s = r == e - 1 || 0 == r % 5 || r >= n.showingFrom && n.showingTo > r;
            o.stateAfter = s ? Ve(n.mode, i) : null, ++r;
        }), i;
    }
    function B(t) {
        return t.lineSpace.offsetTop;
    }
    function D(t) {
        var e = cr(t.measure, lr("pre")).appendChild(lr("span", "x"));
        return e.offsetLeft;
    }
    function H(t, e, n, r) {
        for (var r = r || F(t, e), i = -1, o = n; ;o += i) {
            var s = r[o];
            if (s) break;
            0 > i && 0 == o && (i = 1);
        }
        return {
            left: n > o ? s.right : s.left,
            right: o > n ? s.left : s.right,
            top: s.top,
            bottom: s.bottom
        };
    }
    function F(t, e) {
        for (var n = t.display, r = t.display.measureLineCache, i = 0; r.length > i; ++i) {
            var o = r[i];
            if (o.text == e.text && o.markedSpans == e.markedSpans && n.scroller.clientWidth == o.width) return o.measure;
        }
        var s = O(t, e), o = {
            text: e.text,
            width: n.scroller.clientWidth,
            markedSpans: e.markedSpans,
            measure: s
        };
        return 16 == r.length ? r[++n.measureLineCachePos % 16] = o : r.push(o), s;
    }
    function O(t, e) {
        var n = t.display, r = ir(e.text.length), i = _n(t, e, r);
        if (Er && !Br && !t.options.lineWrapping && i.childNodes.length > 100) {
            for (var o = document.createDocumentFragment(), s = 10, a = i.childNodes.length, l = 0, u = Math.ceil(a / s); u > l; ++l) {
                for (var c = lr("div", null, null, "display: inline-block"), h = 0; s > h && a; ++h) c.appendChild(i.firstChild), 
                --a;
                o.appendChild(c);
            }
            i.appendChild(o);
        }
        cr(n.measure, i);
        for (var f, p = n.lineDiv.getBoundingClientRect(), d = [], g = ir(e.text.length), v = i.offsetHeight, l = 0; r.length > l; ++l) if (f = r[l]) {
            for (var m = f.getBoundingClientRect(), y = Math.max(0, m.top - p.top), x = Math.min(m.bottom - p.top, v), h = 0; d.length > h; h += 2) {
                var b = d[h], w = d[h + 1];
                if (!(b > x || y > w) && (y >= b && w >= x || b >= y && x >= w || Math.min(x, w) - Math.max(y, b) >= x - y >> 1)) {
                    d[h] = Math.min(y, b), d[h + 1] = Math.max(x, w);
                    break;
                }
            }
            h == d.length && d.push(y, x), g[l] = {
                left: m.left - p.left,
                right: m.right - p.left,
                top: h
            };
        }
        for (var f, l = 0; g.length > l; ++l) if (f = g[l]) {
            var C = f.top;
            f.top = d[C], f.bottom = d[C + 1];
        }
        return g;
    }
    function j(t) {
        t.display.measureLineCache.length = t.display.measureLineCachePos = 0, t.display.cachedCharWidth = t.display.cachedTextHeight = null, 
        t.view.maxLineChanged = !0;
    }
    function I(t, e, n, r) {
        if (e.widgets) for (var i = 0; e.widgets.length > i; ++i) if (e.widgets[i].above) {
            var o = e.widgets[i].node.offsetHeight;
            n.top += o, n.bottom += o;
        }
        if ("line" == r) return n;
        r || (r = "local");
        var s = Fn(t, e);
        if ("local" != r && (s -= t.display.viewOffset), "page" == r) {
            var a = t.display.lineSpace.getBoundingClientRect();
            s += a.top + (window.pageYOffset || (document.documentElement || document.body).scrollTop);
            var l = a.left + (window.pageXOffset || (document.documentElement || document.body).scrollLeft);
            n.left += l, n.right += l;
        }
        return n.top += s, n.bottom += s, n;
    }
    function z(t, e, n, r) {
        return r || (r = En(t.view.doc, e.line)), I(t, r, H(t, r, e.ch), n);
    }
    function W(t, e, n, r, i) {
        function o(e, o) {
            var s = H(t, r, e, i);
            return o ? s.left = s.right : s.right = s.left, I(t, r, s, n);
        }
        r = r || En(t.view.doc, e.line), i || (i = F(t, r));
        var s = On(r), a = e.ch;
        if (!s) return o(a);
        for (var l, u, c = s[0].level, h = 0; s.length > h; ++h) {
            var f, p, d = s[h], g = d.level % 2;
            if (a > d.from && d.to > a) return o(a, g);
            var v = g ? d.to : d.from, m = g ? d.from : d.to;
            if (v == a) p = h && d.level < (f = s[h - 1]).level ? o(f.level % 2 ? f.from : f.to - 1, !0) : o(g && d.from != d.to ? a - 1 : a), 
            g == c ? l = p : u = p; else if (m == a) {
                var f = s.length - 1 > h && s[h + 1];
                if (!g && f && f.from == f.to) continue;
                p = f && d.level < f.level ? o(f.level % 2 ? f.to - 1 : f.from) : o(g ? a : a - 1, !0), 
                g == c ? l = p : u = p;
            }
        }
        return c && !a && (u = o(s[0].to - 1)), l ? (u && (l.other = u), l) : u;
    }
    function P(t, e, n) {
        var r = t.view.doc;
        if (n += t.display.viewOffset, 0 > n) return {
            line: 0,
            ch: 0,
            outside: !0
        };
        var i = Hn(r, n);
        if (i >= r.size) return {
            line: r.size - 1,
            ch: En(r, r.size - 1).text.length
        };
        for (0 > e && (e = 0); ;) {
            var o = En(r, i), s = R(t, o, i, e, n), a = un(o);
            if (!a || s.ch != yr(o)) return s;
            i = a.find().to.line;
        }
    }
    function R(t, e, n, r, i) {
        function o(r) {
            var i = W(t, {
                line: n,
                ch: r
            }, "line", e, u);
            return a = !0, s > i.bottom ? Math.max(0, i.left - l) : i.top > s ? i.left + l : (a = !1, 
            i.left);
        }
        var s = i - Fn(t, e), a = !1, l = t.display.wrapper.clientWidth, u = F(t, e), c = On(e), h = e.text.length, f = mr(e), p = yr(e), d = D(t.display), g = o(p);
        if (r > g) return {
            line: n,
            ch: p,
            outside: a
        };
        for (;;) {
            if (c ? p == f || p == wr(e, f, 1) : 1 >= p - f) {
                for (var v = g - r > r - d, m = v ? f : p; di.test(e.text.charAt(m)); ) ++m;
                return {
                    line: n,
                    ch: m,
                    after: v,
                    outside: a
                };
            }
            var y = Math.ceil(h / 2), x = f + y;
            if (c) {
                x = f;
                for (var b = 0; y > b; ++b) x = wr(e, x, 1);
            }
            var w = o(x);
            w > r ? (p = x, g = w, a && (g += 1e3), h -= y) : (f = x, d = w, h = y);
        }
    }
    function q(t) {
        if (null != t.cachedTextHeight) return t.cachedTextHeight;
        if (null == kr) {
            kr = lr("pre");
            for (var e = 0; 49 > e; ++e) kr.appendChild(document.createTextNode("x")), kr.appendChild(lr("br"));
            kr.appendChild(document.createTextNode("x"));
        }
        cr(t.measure, kr);
        var n = kr.offsetHeight / 50;
        return n > 3 && (t.cachedTextHeight = n), ur(t.measure), n || 1;
    }
    function $(t) {
        if (null != t.cachedCharWidth) return t.cachedCharWidth;
        var e = lr("span", "x"), n = lr("pre", [ e ]);
        cr(t.measure, n);
        var r = e.offsetWidth;
        return r > 2 && (t.cachedCharWidth = r), r || 10;
    }
    function V(t) {
        t.curOp ? ++t.curOp.depth : t.curOp = {
            depth: 1,
            changes: [],
            delayedCallbacks: [],
            updateInput: null,
            userSelChange: null,
            textChanged: null,
            selectionChanged: !1,
            updateMaxLine: !1,
            id: ++t.nextOpId
        };
    }
    function X(t) {
        var e = t.curOp;
        if (!--e.depth) {
            t.curOp = null;
            var n = t.view, r = t.display;
            if (e.updateMaxLine && c(n), n.maxLineChanged && !t.options.lineWrapping) {
                var i = H(t, n.maxLine, n.maxLine.text.length).right;
                r.sizer.style.minWidth = i + 3 + ci + "px", n.maxLineChanged = !1;
            }
            var o, s;
            if (e.selectionChanged) {
                var a = W(t, n.sel.head);
                o = Ie(t, a.left, a.top, a.left, a.bottom);
            }
            (e.changes.length || o && null != o.scrollTop) && (s = y(t, e.changes, o && o.scrollTop)), 
            !s && e.selectionChanged && _(t), o && Fe(t), e.selectionChanged && L(t), n.focused && e.updateInput && Q(t, e.userSelChange), 
            e.textChanged && Gn(t, "change", t, e.textChanged), e.selectionChanged && Gn(t, "cursorActivity", t);
            for (var l = 0; e.delayedCallbacks.length > l; ++l) e.delayedCallbacks[l](t);
        }
    }
    function Y(t, e) {
        return function() {
            var n = t || this;
            V(n);
            try {
                var r = e.apply(n, arguments);
            } finally {
                X(n);
            }
            return r;
        };
    }
    function U(t, e, n, r) {
        t.curOp.changes.push({
            from: e,
            to: n,
            diff: r
        });
    }
    function G(t) {
        t.view.pollingFast || t.display.poll.set(t.options.pollInterval, function() {
            Z(t), t.view.focused && G(t);
        });
    }
    function K(t) {
        function e() {
            var r = Z(t);
            r || n ? (t.display.pollingFast = !1, G(t)) : (n = !0, t.display.poll.set(60, e));
        }
        var n = !1;
        t.display.pollingFast = !0, t.display.poll.set(20, e);
    }
    function Z(t) {
        var e = t.display.input, n = t.display.prevInput, r = t.view, i = r.sel;
        if (!r.focused || bi(e) || te(t)) return !1;
        var o = e.value;
        if (o == n && Se(i.from, i.to)) return !1;
        V(t), r.sel.shift = !1;
        for (var s = 0, a = Math.min(n.length, o.length); a > s && n[s] == o[s]; ) ++s;
        var l = i.from, u = i.to;
        n.length > s ? l = {
            line: l.line,
            ch: l.ch - (n.length - s)
        } : r.overwrite && Se(l, u) && !t.display.pasteIncoming && (u = {
            line: u.line,
            ch: Math.min(En(t.view.doc, u.line).text.length, u.ch + (o.length - s))
        });
        var c = t.curOp.updateInput;
        return be(t, l, u, xi(o.slice(s)), "end", t.display.pasteIncoming ? "paste" : "input", {
            from: l,
            to: u
        }), t.curOp.updateInput = c, o.length > 1e3 ? e.value = t.display.prevInput = "" : t.display.prevInput = o, 
        X(t), t.display.pasteIncoming = !1, !0;
    }
    function Q(t, e) {
        var n, r, i = t.view;
        Se(i.sel.from, i.sel.to) ? e && (t.display.prevInput = t.display.input.value = "") : (t.display.prevInput = "", 
        n = wi && (i.sel.to.line - i.sel.from.line > 100 || (r = t.getSelection()).length > 1e3), 
        t.display.input.value = n ? "-" : r || t.getSelection(), i.focused && nr(t.display.input)), 
        t.display.inaccurateSelection = n;
    }
    function J(t) {
        "nocursor" == t.options.readOnly || !Er && document.activeElement == t.display.input || t.display.input.focus();
    }
    function te(t) {
        return t.options.readOnly || t.view.cantEdit;
    }
    function ee(t) {
        function e() {
            t.view.focused && setTimeout(or(J, t), 0);
        }
        function n(e) {
            t.options.onDragEvent && t.options.onDragEvent(t, Wn(e)) || qn(e);
        }
        function r() {
            i.inaccurateSelection && (i.prevInput = "", i.inaccurateSelection = !1, i.input.value = t.getSelection(), 
            nr(i.input));
        }
        var i = t.display;
        Yn(i.scroller, "mousedown", Y(t, ie)), Yn(i.scroller, "dblclick", Y(t, Pn)), Yn(i.lineSpace, "selectstart", function(t) {
            ne(i, t) || Pn(t);
        }), Ar || Yn(i.scroller, "contextmenu", function(e) {
            xe(t, e);
        }), Yn(i.scroller, "scroll", function() {
            le(t, i.scroller.scrollTop), ue(t, i.scroller.scrollLeft, !0), Gn(t, "scroll", t);
        }), Yn(i.scrollbarV, "scroll", function() {
            le(t, i.scrollbarV.scrollTop);
        }), Yn(i.scrollbarH, "scroll", function() {
            ue(t, i.scrollbarH.scrollLeft);
        }), Yn(i.scroller, "mousewheel", function(e) {
            ce(t, e);
        }), Yn(i.scroller, "DOMMouseScroll", function(e) {
            ce(t, e);
        }), Yn(i.scrollbarH, "mousedown", e), Yn(i.scrollbarV, "mousedown", e), Yn(i.wrapper, "scroll", function() {
            i.wrapper.scrollTop = i.wrapper.scrollLeft = 0;
        }), Yn(window, "resize", function o() {
            i.cachedCharWidth = i.cachedTextHeight = null, j(t), i.wrapper.parentNode ? y(t, !0) : Un(window, "resize", o);
        }), Yn(i.input, "keyup", Y(t, function(e) {
            t.options.onKeyEvent && t.options.onKeyEvent(t, Wn(e)) || 16 == Xn(e, "keyCode") && (t.view.sel.shift = !1);
        })), Yn(i.input, "input", or(K, t)), Yn(i.input, "keydown", Y(t, ge)), Yn(i.input, "keypress", Y(t, ve)), 
        Yn(i.input, "focus", or(me, t)), Yn(i.input, "blur", or(ye, t)), t.options.dragDrop && (Yn(i.scroller, "dragstart", function(e) {
            ae(t, e);
        }), Yn(i.scroller, "dragenter", n), Yn(i.scroller, "dragover", n), Yn(i.scroller, "drop", Y(t, oe))), 
        Yn(i.scroller, "paste", function() {
            J(t), K(t);
        }), Yn(i.input, "paste", function() {
            i.pasteIncoming = !0, K(t);
        }), Yn(i.input, "cut", r), Yn(i.input, "copy", r), zr && Yn(i.sizer, "mouseup", function() {
            document.activeElement == i.input && i.input.blur(), J(t);
        });
    }
    function ne(t, e) {
        for (var n = $n(e); n != t.wrapper; n = n.parentNode) if (/\bCodeMirror-(?:line)?widget\b/.test(n.className) || n.parentNode == t.sizer && n != t.mover) return !0;
    }
    function re(t, e, n) {
        var r = t.display;
        if (!n) {
            var i = $n(e);
            if (i == r.scrollbarH || i == r.scrollbarH.firstChild || i == r.scrollbarV || i == r.scrollbarV.firstChild || i == r.scrollbarFiller) return null;
        }
        var o, s, a = r.lineSpace.getBoundingClientRect();
        try {
            o = e.clientX, s = e.clientY;
        } catch (e) {
            return null;
        }
        return P(t, o - a.left, s - a.top);
    }
    function ie(t) {
        function e(t) {
            if ("single" == h) return Ee(i, Me(l, u), t), void 0;
            if (v = Me(l, v), m = Me(l, m), "double" == h) {
                var e = Re(En(l, t.line).text, t);
                Te(t, v) ? Ee(i, e.from, m) : Ee(i, v, e.to);
            } else "triple" == h && (Te(t, v) ? Ee(i, m, Me(l, {
                line: t.line,
                ch: 0
            })) : Ee(i, v, Me(l, {
                line: t.line + 1,
                ch: 0
            })));
        }
        function n(t) {
            var r = ++x, a = re(i, t, !0);
            if (a) if (Se(a, d)) {
                var u = t.clientY < y.top ? -20 : t.clientY > y.bottom ? 20 : 0;
                u && setTimeout(Y(i, function() {
                    x == r && (o.scroller.scrollTop += u, n(t));
                }), 50);
            } else {
                s.focused || me(i), d = a, e(a);
                var c = p(o, l);
                (a.line >= c.to || a.line < c.from) && setTimeout(Y(i, function() {
                    x == r && n(t);
                }), 150);
            }
        }
        function r(t) {
            x = 1/0;
            var n = re(i, t);
            n && e(n), Pn(t), J(i), Un(document, "mousemove", b), Un(document, "mouseup", w);
        }
        var i = this, o = i.display, s = i.view, a = s.sel, l = s.doc;
        if (a.shift = Xn(t, "shiftKey"), ne(o, t)) return Hr || (o.scroller.draggable = !1, 
        setTimeout(function() {
            o.scroller.draggable = !0;
        }, 100)), void 0;
        if (!se(i, t)) {
            var u = re(i, t);
            switch (Vn(t)) {
              case 3:
                return Ar && xe.call(i, i, t), void 0;

              case 2:
                return u && Ee(i, u), setTimeout(or(J, i), 20), Pn(t), void 0;
            }
            if (!u) return $n(t) == o.scroller && Pn(t), void 0;
            s.focused || me(i);
            var c = +new Date(), h = "single";
            if (Sr && Sr.time > c - 400 && Se(Sr.pos, u)) h = "triple", Pn(t), setTimeout(or(J, i), 20), 
            qe(i, u.line); else if (_r && _r.time > c - 400 && Se(_r.pos, u)) {
                h = "double", Sr = {
                    time: c,
                    pos: u
                }, Pn(t);
                var f = Re(En(l, u.line).text, u);
                Ee(i, f.from, f.to);
            } else _r = {
                time: c,
                pos: u
            };
            var d = u;
            if (i.options.dragDrop && gi && !te(i) && !Se(a.from, a.to) && !Te(u, a.from) && !Te(a.to, u) && "single" == h) {
                var g = Y(i, function(e) {
                    Hr && (o.scroller.draggable = !1), s.draggingText = !1, Un(document, "mouseup", g), 
                    Un(o.scroller, "drop", g), 10 > Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) && (Pn(e), 
                    Ee(i, u), J(i));
                });
                return Hr && (o.scroller.draggable = !0), s.draggingText = g, o.scroller.dragDrop && o.scroller.dragDrop(), 
                Yn(document, "mouseup", g), Yn(o.scroller, "drop", g), void 0;
            }
            Pn(t), "single" == h && Ee(i, Me(l, u));
            var v = a.from, m = a.to, y = o.wrapper.getBoundingClientRect(), x = 0, b = Y(i, function(t) {
                Er || Vn(t) ? n(t) : r(t);
            }), w = Y(i, r);
            Yn(document, "mousemove", b), Yn(document, "mouseup", w);
        }
    }
    function oe(t) {
        var e = this;
        if (!e.options.onDragEvent || !e.options.onDragEvent(e, Wn(t))) {
            Pn(t);
            var n = re(e, t, !0), r = t.dataTransfer.files;
            if (n && !te(e)) if (r && r.length && window.FileReader && window.File) for (var i = r.length, o = Array(i), s = 0, a = function(t, r) {
                var a = new FileReader();
                a.onload = function() {
                    o[r] = a.result, ++s == i && (n = Me(e.view.doc, n), Y(e, function() {
                        var t = _e(e, o.join(""), n, n, "paste");
                        Be(e, n, t);
                    })());
                }, a.readAsText(t);
            }, l = 0; i > l; ++l) a(r[l], l); else {
                if (e.view.draggingText && !Te(n, e.view.sel.from) && !Te(e.view.sel.to, n)) return e.view.draggingText(t), 
                Er && setTimeout(or(J, e), 50), void 0;
                try {
                    var o = t.dataTransfer.getData("Text");
                    if (o) {
                        var u = e.view.sel.from, c = e.view.sel.to;
                        Be(e, n, n), e.view.draggingText && _e(e, "", u, c, "paste"), e.replaceSelection(o, null, "paste"), 
                        J(e), me(e);
                    }
                } catch (t) {}
            }
        }
    }
    function se(t, e) {
        var n = t.display;
        try {
            var r = e.clientX, i = e.clientY;
        } catch (e) {
            return !1;
        }
        if (r >= Math.floor(n.gutters.getBoundingClientRect().right)) return !1;
        if (Pn(e), !Zn(t, "gutterClick")) return !0;
        var o = n.lineDiv.getBoundingClientRect();
        if (i > o.bottom) return !0;
        i -= o.top - n.viewOffset;
        for (var s = 0; t.options.gutters.length > s; ++s) {
            var a = n.gutters.childNodes[s];
            if (a && a.getBoundingClientRect().right >= r) {
                var l = Hn(t.view.doc, i), u = t.options.gutters[s];
                Kn(t, t, "gutterClick", t, l, u, e);
                break;
            }
        }
        return !0;
    }
    function ae(t, e) {
        var n = t.getSelection();
        e.dataTransfer.setData("Text", n), e.dataTransfer.setDragImage && !Ir && e.dataTransfer.setDragImage(lr("img"), 0, 0);
    }
    function le(t, e) {
        2 > Math.abs(t.view.scrollTop - e) || (t.view.scrollTop = e, Ar || y(t, [], e), 
        t.display.scroller.scrollTop != e && (t.display.scroller.scrollTop = e), t.display.scrollbarV.scrollTop != e && (t.display.scrollbarV.scrollTop = e), 
        Ar && y(t, []));
    }
    function ue(t, e, n) {
        (n ? e == t.view.scrollLeft : 2 > Math.abs(t.view.scrollLeft - e)) || (t.view.scrollLeft = e, 
        d(t), t.display.scroller.scrollLeft != e && (t.display.scroller.scrollLeft = e), 
        t.display.scrollbarH.scrollLeft != e && (t.display.scrollbarH.scrollLeft = e));
    }
    function ce(t, e) {
        var n = e.wheelDeltaX, r = e.wheelDeltaY;
        if (null == n && e.detail && e.axis == e.HORIZONTAL_AXIS && (n = e.detail), null == r && e.detail && e.axis == e.VERTICAL_AXIS ? r = e.detail : null == r && (r = e.wheelDelta), 
        r && Vr && Hr) for (var i = e.target; i != o; i = i.parentNode) if (i.lineObj) {
            t.display.currentWheelTarget = i;
            break;
        }
        var o = t.display.scroller;
        if (n && !Ar && !jr && null != Gr) return r && le(t, Math.max(0, Math.min(o.scrollTop + r * Gr, o.scrollHeight - o.clientHeight))), 
        ue(t, Math.max(0, Math.min(o.scrollLeft + n * Gr, o.scrollWidth - o.clientWidth))), 
        Pn(e), Nr = null, void 0;
        if (r && null != Gr) {
            var s = r * Gr, a = t.view.scrollTop, l = a + t.display.wrapper.clientHeight;
            0 > s ? a = Math.max(0, a + s - 50) : l = Math.min(t.view.doc.height, l + s + 50), 
            y(t, [], {
                top: a,
                bottom: l
            });
        }
        20 > Ur && (null == Nr ? (Nr = o.scrollLeft, Mr = o.scrollTop, Tr = n, Lr = r, setTimeout(function() {
            if (null != Nr) {
                var t = o.scrollLeft - Nr, e = o.scrollTop - Mr, n = e && Lr && e / Lr || t && Tr && t / Tr;
                Nr = Mr = null, n && (Gr = (Gr * Ur + n) / (Ur + 1), ++Ur);
            }
        }, 200)) : (Tr += n, Lr += r));
    }
    function he(t, e, n) {
        if ("string" == typeof e && (e = si[e], !e)) return !1;
        t.display.pollingFast && Z(t) && (t.display.pollingFast = !1);
        var r = t.view, i = r.sel.shift;
        try {
            te(t) && (r.suppressEdits = !0), n && (r.sel.shift = !1), e(t);
        } catch (o) {
            if (o != hi) throw o;
            return !1;
        } finally {
            r.sel.shift = i, r.suppressEdits = !1;
        }
        return !0;
    }
    function fe(t) {
        var e = t.view.keyMaps.slice(0);
        return e.push(t.options.keyMap), t.options.extraKeys && e.unshift(t.options.extraKeys), 
        e;
    }
    function pe(t, e) {
        function n() {
            l = !0;
        }
        var r = Ye(t.options.keyMap), i = r.auto;
        clearTimeout(Kr), i && !Ge(e) && (Kr = setTimeout(function() {
            Ye(t.options.keyMap) == r && (t.options.keyMap = i.call ? i.call(null, t) : i);
        }, 50));
        var o = Ci[Xn(e, "keyCode")], s = !1, a = Vr && (jr || Fr);
        if (null == o || e.altGraphKey) return !1;
        Xn(e, "altKey") && (o = "Alt-" + o), Xn(e, a ? "metaKey" : "ctrlKey") && (o = "Ctrl-" + o), 
        Xn(e, a ? "ctrlKey" : "metaKey") && (o = "Cmd-" + o);
        var l = !1, u = fe(t);
        return s = Xn(e, "shiftKey") ? Ue("Shift-" + o, u, function(e) {
            return he(t, e, !0);
        }, n) || Ue(o, u, function(e) {
            return "string" == typeof e && /^go[A-Z]/.test(e) ? he(t, e) : void 0;
        }, n) : Ue(o, u, function(e) {
            return he(t, e);
        }, n), l && (s = !1), s && (Pn(e), L(t), Dr && (e.oldKeyCode = e.keyCode, e.keyCode = 0)), 
        s;
    }
    function de(t, e, n) {
        var r = Ue("'" + n + "'", fe(t), function(e) {
            return he(t, e, !0);
        });
        return r && (Pn(e), L(t)), r;
    }
    function ge(t) {
        var e = this;
        if (e.view.focused || me(e), Er && 27 == t.keyCode && (t.returnValue = !1), !e.options.onKeyEvent || !e.options.onKeyEvent(e, Wn(t))) {
            var n = Xn(t, "keyCode");
            e.view.sel.shift = 16 == n || Xn(t, "shiftKey");
            var r = pe(e, t);
            jr && (Qr = r ? n : null, r || 88 != n || wi || !Xn(t, Vr ? "metaKey" : "ctrlKey") || e.replaceSelection(""));
        }
    }
    function ve(t) {
        var e = this;
        if (!e.options.onKeyEvent || !e.options.onKeyEvent(e, Wn(t))) {
            var n = Xn(t, "keyCode"), r = Xn(t, "charCode");
            if (jr && n == Qr) return Qr = null, Pn(t), void 0;
            if (!(jr && (!t.which || 10 > t.which) || zr) || !pe(e, t)) {
                var i = String.fromCharCode(null == r ? n : r);
                this.options.electricChars && this.view.mode.electricChars && this.options.smartIndent && !te(this) && this.view.mode.electricChars.indexOf(i) > -1 && setTimeout(Y(e, function() {
                    ze(e, e.view.sel.to.line, "smart");
                }), 75), de(e, t, i) || K(e);
            }
        }
    }
    function me(t) {
        "nocursor" != t.options.readOnly && (t.view.focused || (Gn(t, "focus", t), t.view.focused = !0, 
        -1 == t.display.scroller.className.search(/\bCodeMirror-focused\b/) && (t.display.scroller.className += " CodeMirror-focused"), 
        Q(t, !0)), G(t), L(t));
    }
    function ye(t) {
        t.view.focused && (Gn(t, "blur", t), t.view.focused = !1, t.display.scroller.className = t.display.scroller.className.replace(" CodeMirror-focused", "")), 
        clearInterval(t.display.blinker), setTimeout(function() {
            t.view.focused || (t.view.sel.shift = !1);
        }, 150);
    }
    function xe(t, e) {
        function n() {
            if (r.inputDiv.style.position = "relative", r.input.style.cssText = a, Dr && (r.scrollbarV.scrollTop = r.scroller.scrollTop = s), 
            G(t), null != r.input.selectionStart) {
                clearTimeout(Zr);
                var e = r.input.value = " " + (Se(i.from, i.to) ? "" : r.input.value), n = 0;
                r.prevInput = " ", r.input.selectionStart = 1, r.input.selectionEnd = e.length, 
                Zr = setTimeout(function o() {
                    " " == r.prevInput && 0 == r.input.selectionStart ? Y(t, si.selectAll)(t) : 10 > n++ ? Zr = setTimeout(o, 500) : Q(t);
                }, 200);
            }
        }
        var r = t.display, i = t.view.sel, o = re(t, e), s = r.scroller.scrollTop;
        if (o && !jr) {
            (Se(i.from, i.to) || Te(o, i.from) || !Te(o, i.to)) && Y(t, Be)(t, o, o);
            var a = r.input.style.cssText;
            r.inputDiv.style.position = "absolute", r.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: white; outline: none;" + "border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", 
            J(t), Q(t, !0), Se(i.from, i.to) && (r.input.value = r.prevInput = " "), Ar ? (qn(e), 
            Yn(window, "mouseup", function l() {
                Un(window, "mouseup", l), setTimeout(n, 20);
            })) : setTimeout(n, 50);
        }
    }
    function be(t, e, n, r, i, o) {
        var s = Xr && sn(t.view.doc, e, n);
        if (!s) return we(t, e, n, r, i, o);
        for (var a = s.length - 1; a >= 1; --a) we(t, s[a].from, s[a].to, [ "" ], o);
        return s.length ? we(t, s[0].from, s[0].to, r, i, o) : void 0;
    }
    function we(t, e, n, r, i, o) {
        if (!t.view.suppressEdits) {
            var s = t.view, a = s.doc, l = [];
            a.iter(e.line, n.line + 1, function(t) {
                l.push(gn(t.text, t.markedSpans));
            });
            var u = s.sel.from, c = s.sel.to, h = on(dn(l[0]), dn(er(l)), e.ch, n.ch, r), f = ke(t, e, n, h, i, o);
            return s.history && In(t, e.line, r.length, l, o, u, c, s.sel.from, s.sel.to), f;
        }
    }
    function Ce(t, e) {
        var n = t.view.doc, r = t.view.history, i = ("undo" == e ? r.done : r.undone).pop();
        if (i) {
            for (var o = {
                events: [],
                fromBefore: i.fromAfter,
                toBefore: i.toAfter,
                fromAfter: i.fromBefore,
                toAfter: i.toBefore
            }, s = i.events.length - 1; s >= 0; s -= 1) {
                r.dirtyCounter += "undo" == e ? -1 : 1;
                var a = i.events[s], l = [], u = a.start + a.added;
                n.iter(a.start, u, function(t) {
                    l.push(gn(t.text, t.markedSpans));
                }), o.events.push({
                    start: a.start,
                    added: a.old.length,
                    old: l
                });
                var c = s ? null : {
                    from: i.fromBefore,
                    to: i.toBefore
                };
                ke(t, {
                    line: a.start,
                    ch: 0
                }, {
                    line: u - 1,
                    ch: En(n, u - 1).text.length
                }, a.old, c, e);
            }
            ("undo" == e ? r.undone : r.done).push(o);
        }
    }
    function ke(t, e, n, r, i, o) {
        var s = t.view, a = s.doc, l = t.display;
        if (!s.suppressEdits) {
            var c = n.line - e.line, h = En(a, e.line), f = En(a, n.line), p = !1, d = e.line;
            t.options.lineWrapping || (d = Dn(cn(a, h)), a.iter(d, n.line + 1, function(t) {
                return u(a, t) == s.maxLineLength ? (p = !0, !0) : void 0;
            }));
            var g = er(r), v = q(l);
            if (0 == e.ch && 0 == n.ch && "" == pn(g)) {
                for (var m = [], y = 0, x = r.length - 1; x > y; ++y) m.push(yn(pn(r[y]), dn(r[y]), v));
                xn(t, f, f.text, dn(g)), c && a.remove(e.line, c, t), m.length && a.insert(e.line, m);
            } else if (h == f) if (1 == r.length) xn(t, h, h.text.slice(0, e.ch) + pn(r[0]) + h.text.slice(n.ch), dn(r[0])); else {
                for (var m = [], y = 1, x = r.length - 1; x > y; ++y) m.push(yn(pn(r[y]), dn(r[y]), v));
                m.push(yn(pn(g) + h.text.slice(n.ch), dn(g), v)), xn(t, h, h.text.slice(0, e.ch) + pn(r[0]), dn(r[0])), 
                a.insert(e.line + 1, m);
            } else if (1 == r.length) xn(t, h, h.text.slice(0, e.ch) + pn(r[0]) + f.text.slice(n.ch), dn(r[0])), 
            a.remove(e.line + 1, c, t); else {
                var m = [];
                xn(t, h, h.text.slice(0, e.ch) + pn(r[0]), dn(r[0])), xn(t, f, pn(g) + f.text.slice(n.ch), dn(g));
                for (var y = 1, x = r.length - 1; x > y; ++y) m.push(yn(pn(r[y]), dn(r[y]), v));
                c > 1 && a.remove(e.line + 1, c - 1, t), a.insert(e.line + 1, m);
            }
            if (t.options.lineWrapping) {
                var b = Math.max(5, l.scroller.clientWidth / $(l) - 3);
                a.iter(e.line, e.line + r.length, function(t) {
                    if (0 != t.height) {
                        var e = (Math.ceil(t.text.length / b) || 1) * v;
                        e != t.height && Bn(t, e);
                    }
                });
            } else a.iter(d, e.line + r.length, function(t) {
                var e = u(a, t);
                e > s.maxLineLength && (s.maxLine = t, s.maxLineLength = e, s.maxLineChanged = !0, 
                p = !1);
            }), p && (t.curOp.updateMaxLine = !0);
            s.frontier = Math.min(s.frontier, e.line), N(t, 400);
            var w = r.length - c - 1;
            if (U(t, e.line, n.line + 1, w), Zn(t, "change")) {
                for (var y = 0; r.length > y; ++y) "string" != typeof r[y] && (r[y] = r[y].text);
                var C = {
                    from: e,
                    to: n,
                    text: r,
                    origin: o
                };
                if (t.curOp.textChanged) {
                    for (var k = t.curOp.textChanged; k.next; k = k.next) ;
                    k.next = C;
                } else t.curOp.textChanged = C;
            }
            var _, S, T = {
                line: e.line + r.length - 1,
                ch: pn(g).length + (1 == r.length ? e.ch : 0)
            };
            if (i && "string" != typeof i) i.from ? (_ = i.from, S = i.to) : _ = S = i; else if ("end" == i) _ = S = T; else if ("start" == i) _ = S = e; else if ("around" == i) _ = e, 
            S = T; else {
                var L = function(t) {
                    if (Te(t, e)) return t;
                    if (!Te(n, t)) return T;
                    var r = t.line + w, i = t.ch;
                    return t.line == n.line && (i += pn(g).length - (n.ch - (n.line == e.line ? e.ch : 0))), 
                    {
                        line: r,
                        ch: i
                    };
                };
                _ = L(s.sel.from), S = L(s.sel.to);
            }
            return Be(t, _, S, null, !0), T;
        }
    }
    function _e(t, e, n, r, i) {
        if (r || (r = n), Te(r, n)) {
            var o = r;
            r = n, n = o;
        }
        return be(t, n, r, xi(e), null, i);
    }
    function Se(t, e) {
        return t.line == e.line && t.ch == e.ch;
    }
    function Te(t, e) {
        return t.line < e.line || t.line == e.line && t.ch < e.ch;
    }
    function Le(t) {
        return {
            line: t.line,
            ch: t.ch
        };
    }
    function Ne(t, e) {
        return Math.max(0, Math.min(e, t.size - 1));
    }
    function Me(t, e) {
        if (0 > e.line) return {
            line: 0,
            ch: 0
        };
        if (e.line >= t.size) return {
            line: t.size - 1,
            ch: En(t, t.size - 1).text.length
        };
        var n = e.ch, r = En(t, e.line).text.length;
        return null == n || n > r ? {
            line: e.line,
            ch: r
        } : 0 > n ? {
            line: e.line,
            ch: 0
        } : e;
    }
    function Ae(t, e) {
        return e >= 0 && t.size > e;
    }
    function Ee(t, e, n, r) {
        var i = t.view.sel;
        if (i.shift || i.extend) {
            var o = i.anchor;
            if (n) {
                var s = Te(e, o);
                s != Te(n, o) ? (o = e, e = n) : s != Te(e, n) && (e = n);
            }
            Be(t, o, e, r);
        } else Be(t, e, n || e, r);
        t.curOp.userSelChange = !0;
    }
    function Be(t, e, n, r, i) {
        t.view.goalColumn = null;
        var o = t.view.sel;
        if ((i || !Se(e, o.anchor)) && (e = He(t, e, r, "push" != i)), (i || !Se(n, o.head)) && (n = He(t, n, r, "push" != i)), 
        !Se(o.anchor, e) || !Se(o.head, n)) {
            o.anchor = e, o.head = n;
            var s = Te(n, e);
            o.from = s ? n : e, o.to = s ? e : n, t.curOp.updateInput = !0, t.curOp.selectionChanged = !0;
        }
    }
    function De(t) {
        Be(t, t.view.sel.from, t.view.sel.to, null, "push");
    }
    function He(t, e, n, r) {
        var i = t.view.doc, o = !1, s = e, a = n || 1;
        t.view.cantEdit = !1;
        t: for (;;) {
            var l, u = En(i, s.line);
            if (u.markedSpans) {
                for (var c = 0; u.markedSpans.length > c; ++c) {
                    var h = u.markedSpans[c], f = h.marker;
                    if ((null == h.from || (f.inclusiveLeft ? h.from <= s.ch : h.from < s.ch)) && (null == h.to || (f.inclusiveRight ? h.to >= s.ch : h.to > s.ch))) {
                        if (r && f.clearOnEnter) {
                            (l || (l = [])).push(f);
                            continue;
                        }
                        if (!f.atomic) continue;
                        var p = f.find()[0 > a ? "from" : "to"];
                        if (Se(p, s) && (p.ch += a, 0 > p.ch ? p = p.line ? Me(i, {
                            line: p.line - 1
                        }) : null : p.ch > u.text.length && (p = p.line < i.size - 1 ? {
                            line: p.line + 1,
                            ch: 0
                        } : null), !p)) {
                            if (o) return r ? (t.view.cantEdit = !0, {
                                line: 0,
                                ch: 0
                            }) : He(t, e, n, !0);
                            o = !0, p = e, a = -a;
                        }
                        s = p;
                        continue t;
                    }
                }
                if (l) for (var c = 0; l.length > c; ++c) l[c].clear();
            }
            return s;
        }
    }
    function Fe(t) {
        var e = t.view, n = Oe(t, e.sel.head);
        if (e.focused) {
            var r = t.display, i = r.sizer.getBoundingClientRect(), o = null;
            if (0 > n.top + i.top ? o = !0 : n.bottom + i.top > (window.innerHeight || document.documentElement.clientHeight) && (o = !1), 
            null != o && !Rr) {
                var s = "none" == r.cursor.style.display;
                s && (r.cursor.style.display = "", r.cursor.style.left = n.left + "px", r.cursor.style.top = n.top - r.viewOffset + "px"), 
                r.cursor.scrollIntoView(o), s && (r.cursor.style.display = "none");
            }
        }
    }
    function Oe(t, e) {
        for (;;) {
            var n = !1, r = W(t, e), i = Ie(t, r.left, r.top, r.left, r.bottom), o = t.view.scrollTop, s = t.view.scrollLeft;
            if (null != i.scrollTop && (le(t, i.scrollTop), Math.abs(t.view.scrollTop - o) > 1 && (n = !0)), 
            null != i.scrollLeft && (ue(t, i.scrollLeft), Math.abs(t.view.scrollLeft - s) > 1 && (n = !0)), 
            !n) return r;
        }
    }
    function je(t, e, n, r, i) {
        var o = Ie(t, e, n, r, i);
        null != o.scrollTop && le(t, o.scrollTop), null != o.scrollLeft && ue(t, o.scrollLeft);
    }
    function Ie(t, e, n, r, i) {
        var o = t.display, s = B(o);
        n += s, i += s;
        var a = o.scroller.clientHeight - ci, l = o.scroller.scrollTop, u = {}, c = t.view.doc.height + 2 * s, h = s + 10 > n, f = i + s > c - 10;
        l > n ? u.scrollTop = h ? 0 : Math.max(0, n) : i > l + a && (u.scrollTop = (f ? c : i) - a);
        var p = o.scroller.clientWidth - ci, d = o.scroller.scrollLeft;
        e += o.gutters.offsetWidth, r += o.gutters.offsetWidth;
        var g = o.gutters.offsetWidth, v = g + 10 > e;
        return d + g > e || v ? (v && (e = 0), u.scrollLeft = Math.max(0, e - 10 - g)) : r > p + d - 3 && (u.scrollLeft = r + 10 - p), 
        u;
    }
    function ze(t, e, n, r) {
        var i = t.view.doc;
        if (n || (n = "add"), "smart" == n) if (t.view.mode.indent) var o = E(t, e); else n = "prev";
        var s, a = t.options.tabSize, l = En(i, e), u = Jn(l.text, null, a), c = l.text.match(/^\s*/)[0];
        if ("smart" == n && (s = t.view.mode.indent(o, l.text.slice(c.length), l.text), 
        s == hi)) {
            if (!r) return;
            n = "prev";
        }
        "prev" == n ? s = e ? Jn(En(i, e - 1).text, null, a) : 0 : "add" == n ? s = u + t.options.indentUnit : "subtract" == n && (s = u - t.options.indentUnit), 
        s = Math.max(0, s);
        var h = "", f = 0;
        if (t.options.indentWithTabs) for (var p = Math.floor(s / a); p; --p) f += a, h += "	";
        s > f && (h += tr(s - f)), h != c && _e(t, h, {
            line: e,
            ch: 0
        }, {
            line: e,
            ch: c.length
        }, "input"), l.stateAfter = null;
    }
    function We(t, e, n) {
        var r = e, i = e, o = t.view.doc;
        return "number" == typeof e ? i = En(o, Ne(o, e)) : r = Dn(e), null == r ? null : n(i, r) ? (U(t, r, r + 1), 
        i) : null;
    }
    function Pe(t, e, n, r) {
        function i() {
            var t = l + e;
            return 0 > t || t == s.size ? !1 : (l = t, c = En(s, t));
        }
        function o(t) {
            var n = (r ? wr : Cr)(c, u, e, !0);
            if (null == n) {
                if (t || !i()) return !1;
                u = r ? (0 > e ? yr : mr)(c) : 0 > e ? c.text.length : 0;
            } else u = n;
            return !0;
        }
        var s = t.view.doc, a = t.view.sel.head, l = a.line, u = a.ch, c = En(s, l);
        if ("char" == n) o(); else if ("column" == n) o(!0); else if ("word" == n) for (var h = !1; !(0 > e) || o(); ) {
            if (sr(c.text.charAt(u))) h = !0; else if (h) {
                0 > e && (e = 1, o());
                break;
            }
            if (e > 0 && !o()) break;
        }
        return He(t, {
            line: l,
            ch: u
        }, e, !0);
    }
    function Re(t, e) {
        var n = e.ch, r = e.ch;
        if (t) {
            e.after === !1 || r == t.length ? --n : ++r;
            for (var i = t.charAt(n), o = sr(i) ? sr : /\s/.test(i) ? function(t) {
                return /\s/.test(t);
            } : function(t) {
                return !/\s/.test(t) && !sr(t);
            }; n > 0 && o(t.charAt(n - 1)); ) --n;
            for (;t.length > r && o(t.charAt(r)); ) ++r;
        }
        return {
            from: {
                line: e.line,
                ch: n
            },
            to: {
                line: e.line,
                ch: r
            }
        };
    }
    function qe(t, e) {
        Ee(t, {
            line: e,
            ch: 0
        }, Me(t.view.doc, {
            line: e + 1,
            ch: 0
        }));
    }
    function $e(e, n, r, i) {
        t.defaults[e] = n, r && (Jr[e] = i ? function(t, e, n) {
            n != ei && r(t, e, n);
        } : r);
    }
    function Ve(t, e) {
        if (e === !0) return e;
        if (t.copyState) return t.copyState(e);
        var n = {};
        for (var r in e) {
            var i = e[r];
            i instanceof Array && (i = i.concat([])), n[r] = i;
        }
        return n;
    }
    function Xe(t, e, n) {
        return t.startState ? t.startState(e, n) : !0;
    }
    function Ye(t) {
        return "string" == typeof t ? ai[t] : t;
    }
    function Ue(t, e, n, r) {
        function i(e) {
            e = Ye(e);
            var o = e[t];
            if (o === !1) return r && r(), !0;
            if (null != o && n(o)) return !0;
            if (e.nofallthrough) return r && r(), !0;
            var s = e.fallthrough;
            if (null == s) return !1;
            if ("[object Array]" != Object.prototype.toString.call(s)) return i(s);
            for (var a = 0, l = s.length; l > a; ++a) if (i(s[a])) return !0;
            return !1;
        }
        for (var o = 0; e.length > o; ++o) if (i(e[o])) return !0;
    }
    function Ge(t) {
        var e = Ci[Xn(t, "keyCode")];
        return "Ctrl" == e || "Alt" == e || "Shift" == e || "Mod" == e;
    }
    function Ke(t, e) {
        this.pos = this.start = 0, this.string = t, this.tabSize = e || 8;
    }
    function Ze(t, e) {
        this.lines = [], this.type = e, this.cm = t;
    }
    function Qe(t, e, n, r, i) {
        var o = t.view.doc, s = new Ze(t, i);
        if ("range" == i && !Te(e, n)) return s;
        if (r) for (var a in r) r.hasOwnProperty(a) && (s[a] = r[a]);
        s.replacedWith && (s.collapsed = !0, s.replacedWith = lr("span", [ s.replacedWith ], "CodeMirror-widget")), 
        s.collapsed && (Yr = !0);
        var l, u, c = e.line, h = 0;
        if (o.iter(c, n.line + 1, function(t) {
            var r = {
                from: null,
                to: null,
                marker: s
            };
            h += t.text.length, c == e.line && (r.from = e.ch, h -= e.ch), c == n.line && (r.to = n.ch, 
            h -= t.text.length - n.ch), s.collapsed && (c == n.line && (u = an(t, n.ch)), c == e.line ? l = an(t, e.ch) : Bn(t, 0)), 
            en(t, r), s.collapsed && c == e.line && hn(t) && Bn(t, 0), ++c;
        }), s.readOnly && (Xr = !0, (t.view.history.done.length || t.view.history.undone.length) && t.clearHistory()), 
        s.collapsed) {
            if (l != u) throw Error("Inserting collapsed marker overlapping an existing one");
            s.size = h, s.atomic = !0;
        }
        return (s.className || s.startStyle || s.endStyle || s.collapsed) && U(t, e.line, n.line + 1), 
        s.atomic && De(t), s;
    }
    function Je(t, e) {
        if (t) for (var n = 0; t.length > n; ++n) {
            var r = t[n];
            if (r.marker == e) return r;
        }
    }
    function tn(t, e) {
        for (var n, r = 0; t.length > r; ++r) t[r] != e && (n || (n = [])).push(t[r]);
        return n;
    }
    function en(t, e) {
        t.markedSpans = t.markedSpans ? t.markedSpans.concat([ e ]) : [ e ], e.marker.lines.push(t);
    }
    function nn(t, e) {
        if (t) for (var n, r = 0; t.length > r; ++r) {
            var i = t[r], o = i.marker, s = null == i.from || (o.inclusiveLeft ? e >= i.from : e > i.from);
            if (s || "bookmark" == o.type && i.from == e) {
                var a = null == i.to || (o.inclusiveRight ? i.to >= e : i.to > e);
                (n || (n = [])).push({
                    from: i.from,
                    to: a ? null : i.to,
                    marker: o
                });
            }
        }
        return n;
    }
    function rn(t, e, n) {
        if (t) for (var r, i = 0; t.length > i; ++i) {
            var o = t[i], s = o.marker, a = null == o.to || (s.inclusiveRight ? o.to >= n : o.to > n);
            if (a || "bookmark" == s.type && o.from == n && o.from != e) {
                var l = null == o.from || (s.inclusiveLeft ? n >= o.from : n > o.from);
                (r || (r = [])).push({
                    from: l ? null : o.from - n,
                    to: null == o.to ? null : o.to - n,
                    marker: s
                });
            }
        }
        return r;
    }
    function on(t, e, n, r, i) {
        if (!t && !e) return i;
        var o = nn(t, n), s = rn(e, n, r), a = 1 == i.length, l = er(i).length + (a ? n : 0);
        if (o) for (var u = 0; o.length > u; ++u) {
            var c = o[u];
            if (null == c.to) {
                var h = Je(s, c.marker);
                h ? a && (c.to = null == h.to ? null : h.to + l) : c.to = n;
            }
        }
        if (s) for (var u = 0; s.length > u; ++u) {
            var c = s[u];
            if (null != c.to && (c.to += l), null == c.from) {
                var h = Je(o, c.marker);
                h || (c.from = l, a && (o || (o = [])).push(c));
            } else c.from += l, a && (o || (o = [])).push(c);
        }
        var f = [ gn(i[0], o) ];
        if (!a) {
            var p, d = i.length - 2;
            if (d > 0 && o) for (var u = 0; o.length > u; ++u) null == o[u].to && (p || (p = [])).push({
                from: null,
                to: null,
                marker: o[u].marker
            });
            for (var u = 0; d > u; ++u) f.push(gn(i[u + 1], p));
            f.push(gn(er(i), s));
        }
        return f;
    }
    function sn(t, e, n) {
        var r = null;
        if (t.iter(e.line, n.line + 1, function(t) {
            if (t.markedSpans) for (var e = 0; t.markedSpans.length > e; ++e) {
                var n = t.markedSpans[e].marker;
                !n.readOnly || r && -1 != rr(r, n) || (r || (r = [])).push(n);
            }
        }), !r) return null;
        for (var i = [ {
            from: e,
            to: n
        } ], o = 0; r.length > o; ++o) for (var s = r[o].find(), a = 0; i.length > a; ++a) {
            var l = i[a];
            if (Te(s.from, l.to) && !Te(s.to, l.from)) {
                var u = [ a, 1 ];
                Te(l.from, s.from) && u.push({
                    from: l.from,
                    to: s.from
                }), Te(s.to, l.to) && u.push({
                    from: s.to,
                    to: l.to
                }), i.splice.apply(i, u), a += u.length - 1;
            }
        }
        return i;
    }
    function an(t, e) {
        var n, r = Yr && t.markedSpans;
        if (r) for (var i, o = 0; r.length > o; ++o) i = r[o], i.marker.collapsed && (null == i.from || e > i.from) && (null == i.to || i.to > e) && (!n || n.width < i.marker.width) && (n = i.marker);
        return n;
    }
    function ln(t) {
        return an(t, -1);
    }
    function un(t) {
        return an(t, t.text.length + 1);
    }
    function cn(t, e) {
        for (var n; n = ln(e); ) e = En(t, n.find().from.line);
        return e;
    }
    function hn(t) {
        var e = Yr && t.markedSpans;
        if (e) for (var n, r = 0; e.length > r; ++r) if (n = e[r], n.marker.collapsed) {
            if (null == n.from) return !0;
            if (0 == n.from && n.marker.inclusiveLeft && fn(t, n)) return !0;
        }
    }
    function fn(t, e) {
        if (null == e.to || e.marker.inclusiveRight && e.to == t.text.length) return !0;
        for (var n, r = 0; t.markedSpans.length > r; ++r) if (n = t.markedSpans[r], n.marker.collapsed && n.from == e.to && (n.marker.inclusiveLeft || e.marker.inclusiveRight) && fn(t, n)) return !0;
    }
    function pn(t) {
        return "string" == typeof t ? t : t.text;
    }
    function dn(t) {
        if ("string" == typeof t) return null;
        for (var e = t.markedSpans, n = null, r = 0; e.length > r; ++r) e[r].marker.explicitlyCleared ? n || (n = e.slice(0, r)) : n && n.push(e[r]);
        return n ? n.length ? n : null : e;
    }
    function gn(t, e) {
        return e ? {
            text: t,
            markedSpans: e
        } : t;
    }
    function vn(t) {
        var e = t.markedSpans;
        if (e) {
            for (var n = 0; e.length > n; ++n) {
                var r = e[n].marker.lines, i = rr(r, t);
                r.splice(i, 1);
            }
            t.markedSpans = null;
        }
    }
    function mn(t, e) {
        if (e) {
            for (var n = 0; e.length > n; ++n) e[n].marker.lines.push(t);
            t.markedSpans = e;
        }
    }
    function yn(t, e, n) {
        var r = {
            text: t,
            height: n
        };
        return mn(r, e), hn(r) && (r.height = 0), r;
    }
    function xn(t, e, n, r) {
        e.text = n, e.stateAfter = e.styles = null, null != e.order && (e.order = null), 
        vn(e), mn(e, r), hn(e) ? e.height = 0 : e.height || (e.height = q(t.display)), Kn(t, e, "change");
    }
    function bn(t) {
        t.parent = null, vn(t);
    }
    function wn(t, e, n) {
        var r = t.view.mode, i = t.options.flattenSpans, o = !e.styles, s = 0, a = "", l = null, u = new Ke(e.text, t.options.tabSize), c = e.styles || (e.styles = []);
        for ("" == e.text && r.blankLine && r.blankLine(n); !u.eol(); ) {
            var h = r.token(u, n), f = u.current();
            if (u.start = u.pos, i && l == h ? a += f : (a && (o = o || s >= c.length || a != c[s] || l != c[s + 1], 
            c[s++] = a, c[s++] = l), a = f, l = h), u.pos > 5e3) break;
        }
        return a && (o = o || s >= c.length || a != c[s] || l != c[s + 1], c[s++] = a, c[s++] = l), 
        u.pos > 5e3 && (c[s++] = e.text.slice(u.pos), c[s++] = null), s != c.length && (c.length = s, 
        o = !0), o;
    }
    function Cn(t, e, n) {
        var r = t.view.mode, i = new Ke(e.text, t.options.tabSize);
        for ("" == e.text && r.blankLine && r.blankLine(n); !i.eol() && 5e3 >= i.pos; ) r.token(i, n), 
        i.start = i.pos;
    }
    function kn(t) {
        return t ? li[t] || (li[t] = "cm-" + t.replace(/ +/g, " cm-")) : null;
    }
    function _n(t, e, n) {
        for (var r, i, o, s = e, a = !0; r = ln(s); ) a = !1, s = En(t.view.doc, r.find().from.line), 
        i || (i = s);
        var l = {
            pre: lr("pre"),
            col: 0,
            pos: 0,
            display: !n,
            measure: null,
            addedOne: !1,
            cm: t
        };
        s.textClass && (l.pre.className = s.textClass);
        do {
            s.styles || wn(t, s, s.stateAfter = E(t, Dn(s))), l.measure = s == e && n, l.pos = 0, 
            l.addToken = l.measure ? Tn : Sn, n && o && s != e && !l.addedOne && (n[0] = l.pre.appendChild(pr(t.display.measure)), 
            l.addedOne = !0);
            var u = Nn(s, l);
            o = s == i, u && (s = En(t.view.doc, u.to.line), a = !1);
        } while (u);
        return n && !l.addedOne && (n[0] = l.pre.appendChild(a ? lr("span", " ") : pr(t.display.measure))), 
        l.pre.firstChild || hn(e) || l.pre.appendChild(document.createTextNode(" ")), l.pre;
    }
    function Sn(t, e, n, r, i) {
        if (e) {
            if (ui.test(e)) for (var o = document.createDocumentFragment(), s = 0; ;) {
                ui.lastIndex = s;
                var a = ui.exec(e), l = a ? a.index - s : e.length - s;
                if (l && (o.appendChild(document.createTextNode(e.slice(s, s + l))), t.col += l), 
                !a) break;
                if (s += l + 1, "	" == a[0]) {
                    var u = t.cm.options.tabSize, c = u - t.col % u;
                    o.appendChild(lr("span", tr(c), "cm-tab")), t.col += c;
                } else {
                    var h = lr("span", "•", "cm-invalidchar");
                    h.title = "\\u" + a[0].charCodeAt(0).toString(16), o.appendChild(h), t.col += 1;
                }
            } else {
                t.col += e.length;
                var o = document.createTextNode(e);
            }
            if (n || r || i || t.measure) {
                var f = n || "";
                return r && (f += r), i && (f += i), t.pre.appendChild(lr("span", [ o ], f));
            }
            t.pre.appendChild(o);
        }
    }
    function Tn(t, e, n, r, i) {
        for (var o = 0; e.length > o; ++o) o && e.length - 1 > o && t.cm.options.lineWrapping && vi.test(e.slice(o - 1, o + 1)) && t.pre.appendChild(lr("wbr")), 
        t.measure[t.pos++] = Sn(t, e.charAt(o), n, 0 == o && r, o == e.length - 1 && i);
        e.length && (t.addedOne = !0);
    }
    function Ln(t, e, n) {
        n && (t.display || (n = n.cloneNode(!0)), t.pre.appendChild(n), t.measure && e && (t.measure[t.pos] = n, 
        t.addedOne = !0)), t.pos += e;
    }
    function Nn(t, e) {
        var n = t.styles, r = t.markedSpans;
        if (r) for (var i, o, s, a, l, u = t.text, c = u.length, h = 0, f = 0, p = "", d = 0; ;) {
            if (d == h) {
                o = s = a = "", l = null, d = 1/0;
                for (var g = null, v = 0; r.length > v; ++v) {
                    var m = r[v], y = m.marker;
                    h >= m.from && (null == m.to || m.to > h) ? (null != m.to && d > m.to && (d = m.to, 
                    s = ""), y.className && (o += " " + y.className), y.startStyle && m.from == h && (a += " " + y.startStyle), 
                    y.endStyle && m.to == d && (s += " " + y.endStyle), y.collapsed && (!l || l.marker.width < y.width) && (l = m)) : m.from > h && d > m.from && (d = m.from), 
                    "bookmark" == y.type && m.from == h && y.replacedWith && (g = y.replacedWith);
                }
                if (l && (l.from || 0) == h && (Ln(e, (null == l.to ? c : l.to) - h, null != l.from && l.marker.replacedWith), 
                null == l.to)) return l.marker.find();
                g && !l && Ln(e, 0, g);
            }
            if (h >= c) break;
            for (var x = Math.min(c, d); ;) {
                if (p) {
                    var b = h + p.length;
                    if (!l) {
                        var w = b > x ? p.slice(0, x - h) : p;
                        e.addToken(e, w, i + o, a, h + w.length == d ? s : "");
                    }
                    if (b >= x) {
                        p = p.slice(x - h), h = x;
                        break;
                    }
                    h = b, a = "";
                }
                p = n[f++], i = kn(n[f++]);
            }
        } else for (var f = 0; n.length > f; f += 2) e.addToken(e, n[f], kn(n[f + 1]));
    }
    function Mn(t) {
        this.lines = t, this.parent = null;
        for (var e = 0, n = t.length, r = 0; n > e; ++e) t[e].parent = this, r += t[e].height;
        this.height = r;
    }
    function An(t) {
        this.children = t;
        for (var e = 0, n = 0, r = 0, i = t.length; i > r; ++r) {
            var o = t[r];
            e += o.chunkSize(), n += o.height, o.parent = this;
        }
        this.size = e, this.height = n, this.parent = null;
    }
    function En(t, e) {
        for (;!t.lines; ) for (var n = 0; ;++n) {
            var r = t.children[n], i = r.chunkSize();
            if (i > e) {
                t = r;
                break;
            }
            e -= i;
        }
        return t.lines[e];
    }
    function Bn(t, e) {
        for (var n = e - t.height, r = t; r; r = r.parent) r.height += n;
    }
    function Dn(t) {
        if (null == t.parent) return null;
        for (var e = t.parent, n = rr(e.lines, t), r = e.parent; r; e = r, r = r.parent) for (var i = 0; r.children[i] != e; ++i) n += r.children[i].chunkSize();
        return n;
    }
    function Hn(t, e) {
        var n = 0;
        t: do {
            for (var r = 0, i = t.children.length; i > r; ++r) {
                var o = t.children[r], s = o.height;
                if (s > e) {
                    t = o;
                    continue t;
                }
                e -= s, n += o.chunkSize();
            }
            return n;
        } while (!t.lines);
        for (var r = 0, i = t.lines.length; i > r; ++r) {
            var a = t.lines[r], l = a.height;
            if (l > e) break;
            e -= l;
        }
        return n + r;
    }
    function Fn(t, e) {
        e = cn(t.view.doc, e);
        for (var n = 0, r = e.parent, i = 0; r.lines.length > i; ++i) {
            var o = r.lines[i];
            if (o == e) break;
            n += o.height;
        }
        for (var s = r.parent; s; r = s, s = r.parent) for (var i = 0; s.children.length > i; ++i) {
            var a = s.children[i];
            if (a == r) break;
            n += a.height;
        }
        return n;
    }
    function On(t) {
        var e = t.order;
        return null == e && (e = t.order = ki(t.text)), e;
    }
    function jn() {
        return {
            done: [],
            undone: [],
            lastTime: 0,
            lastOp: null,
            lastOrigin: null,
            dirtyCounter: 0
        };
    }
    function In(t, e, n, r, i, o, s, a, l) {
        var u = t.view.history;
        u.undone.length = 0;
        var c = +new Date(), h = er(u.done);
        if (h && (u.lastOp == t.curOp.id || u.lastOrigin == i && ("input" == i || "delete" == i) && u.lastTime > c - 600)) {
            var f = er(h.events);
            if (f.start > e + r.length || e > f.start + f.added) h.events.push({
                start: e,
                added: n,
                old: r
            }); else {
                for (var p = Math.max(0, f.start - e), d = Math.max(0, e + r.length - (f.start + f.added)), g = p; g > 0; --g) f.old.unshift(r[g - 1]);
                for (var g = d; g > 0; --g) f.old.push(r[r.length - g]);
                p && (f.start = e), f.added += n - (r.length - p - d);
            }
            h.fromAfter = a, h.toAfter = l;
        } else {
            for (h = {
                events: [ {
                    start: e,
                    added: n,
                    old: r
                } ],
                fromBefore: o,
                toBefore: s,
                fromAfter: a,
                toAfter: l
            }, u.done.push(h); u.done.length > t.options.undoDepth; ) u.done.shift();
            0 > u.dirtyCounter ? u.dirtyCounter = 0/0 : u.dirtyCounter++;
        }
        u.lastTime = c, u.lastOp = t.curOp.id, u.lastOrigin = i;
    }
    function zn() {
        qn(this);
    }
    function Wn(t) {
        return t.stop || (t.stop = zn), t;
    }
    function Pn(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1;
    }
    function Rn(t) {
        t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
    }
    function qn(t) {
        Pn(t), Rn(t);
    }
    function $n(t) {
        return t.target || t.srcElement;
    }
    function Vn(t) {
        var e = t.which;
        return null == e && (1 & t.button ? e = 1 : 2 & t.button ? e = 3 : 4 & t.button && (e = 2)), 
        Vr && t.ctrlKey && 1 == e && (e = 3), e;
    }
    function Xn(t, e) {
        var n = t.override && t.override.hasOwnProperty(e);
        return n ? t.override[e] : t[e];
    }
    function Yn(t, e, n) {
        if (t.addEventListener) t.addEventListener(e, n, !1); else if (t.attachEvent) t.attachEvent("on" + e, n); else {
            var r = t._handlers || (t._handlers = {}), i = r[e] || (r[e] = []);
            i.push(n);
        }
    }
    function Un(t, e, n) {
        if (t.removeEventListener) t.removeEventListener(e, n, !1); else if (t.detachEvent) t.detachEvent("on" + e, n); else {
            var r = t._handlers && t._handlers[e];
            if (!r) return;
            for (var i = 0; r.length > i; ++i) if (r[i] == n) {
                r.splice(i, 1);
                break;
            }
        }
    }
    function Gn(t, e) {
        var n = t._handlers && t._handlers[e];
        if (n) for (var r = Array.prototype.slice.call(arguments, 2), i = 0; n.length > i; ++i) n[i].apply(null, r);
    }
    function Kn(t, e, n) {
        function r(t) {
            return function() {
                t.apply(null, o);
            };
        }
        var i = e._handlers && e._handlers[n];
        if (i) for (var o = Array.prototype.slice.call(arguments, 3), s = t.curOp && t.curOp.delayedCallbacks, a = 0; i.length > a; ++a) s ? s.push(r(i[a])) : i[a].apply(null, o);
    }
    function Zn(t, e) {
        var n = t._handlers && t._handlers[e];
        return n && n.length > 0;
    }
    function Qn() {
        this.id = null;
    }
    function Jn(t, e, n) {
        null == e && (e = t.search(/[^\s\u00a0]/), -1 == e && (e = t.length));
        for (var r = 0, i = 0; e > r; ++r) "	" == t.charAt(r) ? i += n - i % n : ++i;
        return i;
    }
    function tr(t) {
        for (;t >= fi.length; ) fi.push(er(fi) + " ");
        return fi[t];
    }
    function er(t) {
        return t[t.length - 1];
    }
    function nr(t) {
        qr ? (t.selectionStart = 0, t.selectionEnd = t.value.length) : t.select();
    }
    function rr(t, e) {
        if (t.indexOf) return t.indexOf(e);
        for (var n = 0, r = t.length; r > n; ++n) if (t[n] == e) return n;
        return -1;
    }
    function ir(t) {
        for (var e = [], n = 0; t > n; ++n) e.push(void 0);
        return e;
    }
    function or(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return function() {
            return t.apply(null, e);
        };
    }
    function sr(t) {
        return /\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || pi.test(t));
    }
    function ar(t) {
        var e = 0;
        for (var n in t) t.hasOwnProperty(n) && t[n] && ++e;
        return !e;
    }
    function lr(t, e, n, r) {
        var i = document.createElement(t);
        if (n && (i.className = n), r && (i.style.cssText = r), "string" == typeof e) hr(i, e); else if (e) for (var o = 0; e.length > o; ++o) i.appendChild(e[o]);
        return i;
    }
    function ur(t) {
        return t.innerHTML = "", t;
    }
    function cr(t, e) {
        return ur(t).appendChild(e);
    }
    function hr(t, e) {
        Dr ? (t.innerHTML = "", t.appendChild(document.createTextNode(e))) : t.textContent = e;
    }
    function fr(t) {
        if (null != mi) return mi;
        var e = lr("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
        return cr(t, e), e.offsetWidth && (mi = e.offsetHeight - e.clientHeight), mi || 0;
    }
    function pr(t) {
        if (null == yi) {
            var e = lr("span", "​");
            cr(t, lr("span", [ e, document.createTextNode("x") ])), 0 != t.firstChild.offsetHeight && (yi = 1 >= e.offsetWidth && e.offsetHeight > 2 && !Br);
        }
        return yi ? lr("span", "​") : lr("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
    }
    function dr(t, e, n, r) {
        if (!t) return r(e, n, "ltr");
        for (var i = 0; t.length > i; ++i) {
            var o = t[i];
            n > o.from && o.to > e && r(Math.max(o.from, e), Math.min(o.to, n), 1 == o.level ? "rtl" : "ltr");
        }
    }
    function gr(t) {
        return t.level % 2 ? t.to : t.from;
    }
    function vr(t) {
        return t.level % 2 ? t.from : t.to;
    }
    function mr(t) {
        var e = On(t);
        return e ? gr(e[0]) : 0;
    }
    function yr(t) {
        var e = On(t);
        return e ? vr(er(e)) : t.text.length;
    }
    function xr(t, e) {
        var n = En(t.view.doc, e), r = cn(t.view.doc, n);
        r != n && (e = Dn(r));
        var i = On(r), o = i ? i[0].level % 2 ? yr(r) : mr(r) : 0;
        return {
            line: e,
            ch: o
        };
    }
    function br(t, e) {
        for (var n, r; n = un(r = En(t.view.doc, e)); ) e = n.find().to.line;
        var i = On(r), o = i ? i[0].level % 2 ? mr(r) : yr(r) : r.text.length;
        return {
            line: e,
            ch: o
        };
    }
    function wr(t, e, n, r) {
        var i = On(t);
        if (!i) return Cr(t, e, n, r);
        for (var o = r ? function(e, n) {
            do e += n; while (e > 0 && di.test(t.text.charAt(e)));
            return e;
        } : function(t, e) {
            return t + e;
        }, s = i[0].level, a = 0; i.length > a; ++a) {
            var l = i[a], u = l.level % 2 == s;
            if (e > l.from && l.to > e || u && (l.from == e || l.to == e)) break;
        }
        for (var c = o(e, l.level % 2 ? -n : n); null != c; ) if (l.level % 2 == s) {
            if (!(l.from > c || c > l.to)) break;
            l = i[a += n], c = l && (n > 0 == l.level % 2 ? o(l.to, -1) : o(l.from, 1));
        } else if (c == gr(l)) l = i[--a], c = l && vr(l); else {
            if (c != vr(l)) break;
            l = i[++a], c = l && gr(l);
        }
        return 0 > c || c > t.text.length ? null : c;
    }
    function Cr(t, e, n, r) {
        var i = e + n;
        if (r) for (;i > 0 && di.test(t.text.charAt(i)); ) i += n;
        return 0 > i || i > t.text.length ? null : i;
    }
    var kr, _r, Sr, Tr, Lr, Nr, Mr, Ar = /gecko\/\d/i.test(navigator.userAgent), Er = /MSIE \d/.test(navigator.userAgent), Br = /MSIE [1-7]\b/.test(navigator.userAgent), Dr = /MSIE [1-8]\b/.test(navigator.userAgent), Hr = /WebKit\//.test(navigator.userAgent), Fr = Hr && /Qt\/\d+\.\d+/.test(navigator.userAgent), Or = /Chrome\//.test(navigator.userAgent), jr = /Opera\//.test(navigator.userAgent), Ir = /Apple Computer/.test(navigator.vendor), zr = /KHTML\//.test(navigator.userAgent), Wr = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent), Pr = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent), Rr = /PhantomJS/.test(navigator.userAgent), qr = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent), $r = qr || /Android|webOS|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent), Vr = qr || /Mac/.test(navigator.platform), Xr = !1, Yr = !1, Ur = 0, Gr = null;
    Er ? Gr = -.53 : Ar ? Gr = 15 : Or ? Gr = -.7 : Ir && (Gr = -1 / 3);
    var Kr, Zr, Qr = null;
    t.prototype = {
        getValue: function(t) {
            var e = [], n = this.view.doc;
            return n.iter(0, n.size, function(t) {
                e.push(t.text);
            }), e.join(t || "\n");
        },
        setValue: Y(null, function(t) {
            var e = this.view.doc, n = {
                line: 0,
                ch: 0
            }, r = En(e, e.size - 1).text.length;
            we(this, n, {
                line: e.size - 1,
                ch: r
            }, xi(t), n, n, "setValue");
        }),
        getSelection: function(t) {
            return this.getRange(this.view.sel.from, this.view.sel.to, t);
        },
        replaceSelection: Y(null, function(t, e, n) {
            var r = this.view.sel;
            be(this, r.from, r.to, xi(t), e || "around", n);
        }),
        focus: function() {
            window.focus(), J(this), me(this), K(this);
        },
        setOption: function(t, e) {
            var n = this.options, r = n[t];
            (n[t] != e || "mode" == t) && (n[t] = e, Jr.hasOwnProperty(t) && Y(this, Jr[t])(this, e, r));
        },
        getOption: function(t) {
            return this.options[t];
        },
        getMode: function() {
            return this.view.mode;
        },
        addKeyMap: function(t) {
            this.view.keyMaps.push(t);
        },
        removeKeyMap: function(t) {
            for (var e = this.view.keyMaps, n = 0; e.length > n; ++n) if (("string" == typeof t ? e[n].name : e[n]) == t) return e.splice(n, 1), 
            !0;
        },
        undo: Y(null, function() {
            Ce(this, "undo");
        }),
        redo: Y(null, function() {
            Ce(this, "redo");
        }),
        indentLine: Y(null, function(t, e, n) {
            "string" != typeof e && (e = null == e ? this.options.smartIndent ? "smart" : "prev" : e ? "add" : "subtract"), 
            Ae(this.view.doc, t) && ze(this, t, e, n);
        }),
        indentSelection: Y(null, function(t) {
            var e = this.view.sel;
            if (Se(e.from, e.to)) return ze(this, e.from.line, t);
            for (var n = e.to.line - (e.to.ch ? 0 : 1), r = e.from.line; n >= r; ++r) ze(this, r, t);
        }),
        historySize: function() {
            var t = this.view.history;
            return {
                undo: t.done.length,
                redo: t.undone.length
            };
        },
        clearHistory: function() {
            this.view.history = jn();
        },
        markClean: function() {
            this.view.history.dirtyCounter = 0, this.view.history.lastOp = this.view.history.lastOrigin = null;
        },
        isClean: function() {
            return 0 == this.view.history.dirtyCounter;
        },
        getHistory: function() {
            function t(t) {
                for (var e, n = 0, r = []; t.length > n; ++n) {
                    var i = t[n];
                    r.push({
                        events: e = [],
                        fromBefore: i.fromBefore,
                        toBefore: i.toBefore,
                        fromAfter: i.fromAfter,
                        toAfter: i.toAfter
                    });
                    for (var o = 0, s = i.events; s.length > o; ++o) {
                        var a = [], l = s[o];
                        e.push({
                            start: l.start,
                            added: l.added,
                            old: a
                        });
                        for (var u = 0; l.old.length > u; ++u) a.push(pn(l.old[u]));
                    }
                }
                return r;
            }
            var e = this.view.history;
            return {
                done: t(e.done),
                undone: t(e.undone)
            };
        },
        setHistory: function(t) {
            var e = this.view.history = jn();
            e.done = t.done, e.undone = t.undone;
        },
        getTokenAt: function(t) {
            var e = this.view.doc;
            t = Me(e, t);
            for (var n = E(this, t.line), r = this.view.mode, i = En(e, t.line), o = new Ke(i.text, this.options.tabSize); o.pos < t.ch && !o.eol(); ) {
                o.start = o.pos;
                var s = r.token(o, n);
            }
            return {
                start: o.start,
                end: o.pos,
                string: o.current(),
                className: s || null,
                type: s || null,
                state: n
            };
        },
        getStateAfter: function(t) {
            var e = this.view.doc;
            return t = Ne(e, null == t ? e.size - 1 : t), E(this, t + 1);
        },
        cursorCoords: function(t, e) {
            var n, r = this.view.sel;
            return n = null == t ? r.head : "object" == typeof t ? Me(this.view.doc, t) : t ? r.from : r.to, 
            W(this, n, e || "page");
        },
        charCoords: function(t, e) {
            return z(this, Me(this.view.doc, t), e || "page");
        },
        coordsChar: function(t) {
            var e = this.display.lineSpace.getBoundingClientRect();
            return P(this, t.left - e.left, t.top - e.top);
        },
        defaultTextHeight: function() {
            return q(this.display);
        },
        markText: Y(null, function(t, e, n) {
            return Qe(this, Me(this.view.doc, t), Me(this.view.doc, e), n, "range");
        }),
        setBookmark: Y(null, function(t, e) {
            return t = Me(this.view.doc, t), Qe(this, t, t, e ? {
                replacedWith: e
            } : {}, "bookmark");
        }),
        findMarksAt: function(t) {
            var e = this.view.doc;
            t = Me(e, t);
            var n = [], r = En(e, t.line).markedSpans;
            if (r) for (var i = 0; r.length > i; ++i) {
                var o = r[i];
                (null == o.from || o.from <= t.ch) && (null == o.to || o.to >= t.ch) && n.push(o.marker);
            }
            return n;
        },
        setGutterMarker: Y(null, function(t, e, n) {
            return We(this, t, function(t) {
                var r = t.gutterMarkers || (t.gutterMarkers = {});
                return r[e] = n, !n && ar(r) && (t.gutterMarkers = null), !0;
            });
        }),
        clearGutter: Y(null, function(t) {
            var e = 0, n = this, r = n.view.doc;
            r.iter(0, r.size, function(r) {
                r.gutterMarkers && r.gutterMarkers[t] && (r.gutterMarkers[t] = null, U(n, e, e + 1), 
                ar(r.gutterMarkers) && (r.gutterMarkers = null)), ++e;
            });
        }),
        addLineClass: Y(null, function(t, e, n) {
            return We(this, t, function(t) {
                var r = "text" == e ? "textClass" : "background" == e ? "bgClass" : "wrapClass";
                if (t[r]) {
                    if (RegExp("\\b" + n + "\\b").test(t[r])) return !1;
                    t[r] += " " + n;
                } else t[r] = n;
                return !0;
            });
        }),
        removeLineClass: Y(null, function(t, e, n) {
            return We(this, t, function(t) {
                var r = "text" == e ? "textClass" : "background" == e ? "bgClass" : "wrapClass", i = t[r];
                if (!i) return !1;
                if (null == n) t[r] = null; else {
                    var o = i.replace(RegExp("^" + n + "\\b\\s*|\\s*\\b" + n + "\\b"), "");
                    if (o == i) return !1;
                    t[r] = o || null;
                }
                return !0;
            });
        }),
        addLineWidget: Y(null, function(t, e, n) {
            var r = n || {};
            return r.node = e, r.noHScroll && (this.display.alignWidgets = !0), We(this, t, function(t) {
                return (t.widgets || (t.widgets = [])).push(r), r.line = t, !0;
            }), r;
        }),
        removeLineWidget: Y(null, function(t) {
            var e = t.line.widgets, n = Dn(t.line);
            if (null != n) {
                for (var r = 0; e.length > r; ++r) e[r] == t && e.splice(r--, 1);
                U(this, n, n + 1);
            }
        }),
        lineInfo: function(t) {
            if ("number" == typeof t) {
                if (!Ae(this.view.doc, t)) return null;
                var e = t;
                if (t = En(this.view.doc, t), !t) return null;
            } else {
                var e = Dn(t);
                if (null == e) return null;
            }
            return {
                line: e,
                handle: t,
                text: t.text,
                gutterMarkers: t.gutterMarkers,
                textClass: t.textClass,
                bgClass: t.bgClass,
                wrapClass: t.wrapClass,
                widgets: t.widgets
            };
        },
        getViewport: function() {
            return {
                from: this.display.showingFrom,
                to: this.display.showingTo
            };
        },
        addWidget: function(t, e, n, r, i) {
            var o = this.display;
            t = W(this, Me(this.view.doc, t));
            var s = t.top, a = t.left;
            if (e.style.position = "absolute", o.sizer.appendChild(e), "over" == r) s = t.top; else if ("near" == r) {
                var l = Math.max(o.wrapper.clientHeight, this.view.doc.height), u = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                t.bottom + e.offsetHeight > l && t.top > e.offsetHeight && (s = t.top - e.offsetHeight), 
                a + e.offsetWidth > u && (a = u - e.offsetWidth);
            }
            e.style.top = s + B(o) + "px", e.style.left = e.style.right = "", "right" == i ? (a = o.sizer.clientWidth - e.offsetWidth, 
            e.style.right = "0px") : ("left" == i ? a = 0 : "middle" == i && (a = (o.sizer.clientWidth - e.offsetWidth) / 2), 
            e.style.left = a + "px"), n && je(this, a, s, a + e.offsetWidth, s + e.offsetHeight);
        },
        lineCount: function() {
            return this.view.doc.size;
        },
        clipPos: function(t) {
            return Me(this.view.doc, t);
        },
        getCursor: function(t) {
            var e, n = this.view.sel;
            return e = null == t || "head" == t ? n.head : "anchor" == t ? n.anchor : "end" == t || t === !1 ? n.to : n.from, 
            Le(e);
        },
        somethingSelected: function() {
            return !Se(this.view.sel.from, this.view.sel.to);
        },
        setCursor: Y(null, function(t, e, n) {
            var r = Me(this.view.doc, "number" == typeof t ? {
                line: t,
                ch: e || 0
            } : t);
            n ? Ee(this, r) : Be(this, r, r);
        }),
        setSelection: Y(null, function(t, e) {
            var n = this.view.doc;
            Be(this, Me(n, t), Me(n, e || t));
        }),
        extendSelection: Y(null, function(t, e) {
            var n = this.view.doc;
            Ee(this, Me(n, t), e && Me(n, e));
        }),
        setExtending: function(t) {
            this.view.sel.extend = t;
        },
        getLine: function(t) {
            var e = this.getLineHandle(t);
            return e && e.text;
        },
        getLineHandle: function(t) {
            var e = this.view.doc;
            return Ae(e, t) ? En(e, t) : void 0;
        },
        getLineNumber: function(t) {
            return Dn(t);
        },
        setLine: Y(null, function(t, e) {
            Ae(this.view.doc, t) && _e(this, e, {
                line: t,
                ch: 0
            }, {
                line: t,
                ch: En(this.view.doc, t).text.length
            });
        }),
        removeLine: Y(null, function(t) {
            Ae(this.view.doc, t) && _e(this, "", {
                line: t,
                ch: 0
            }, Me(this.view.doc, {
                line: t + 1,
                ch: 0
            }));
        }),
        replaceRange: Y(null, function(t, e, n) {
            var r = this.view.doc;
            return e = Me(r, e), n = n ? Me(r, n) : e, _e(this, t, e, n);
        }),
        getRange: function(t, e, n) {
            var r = this.view.doc;
            t = Me(r, t), e = Me(r, e);
            var i = t.line, o = e.line;
            if (i == o) return En(r, i).text.slice(t.ch, e.ch);
            var s = [ En(r, i).text.slice(t.ch) ];
            return r.iter(i + 1, o, function(t) {
                s.push(t.text);
            }), s.push(En(r, o).text.slice(0, e.ch)), s.join(n || "\n");
        },
        triggerOnKeyDown: Y(null, ge),
        execCommand: function(t) {
            return si[t](this);
        },
        moveH: Y(null, function(t, e) {
            var n = this.view.sel, r = 0 > t ? n.from : n.to;
            (n.shift || n.extend || Se(n.from, n.to)) && (r = Pe(this, t, e, !0)), Ee(this, r, r, t);
        }),
        deleteH: Y(null, function(t, e) {
            var n = this.view.sel;
            Se(n.from, n.to) ? _e(this, "", n.from, Pe(this, t, e, !1), "delete") : _e(this, "", n.from, n.to, "delete"), 
            this.curOp.userSelChange = !0;
        }),
        moveV: Y(null, function(t, e) {
            var n, r = this.view, i = r.doc, o = this.display, s = r.sel.head, a = W(this, s, "div"), l = a.left;
            if (null != r.goalColumn && (l = r.goalColumn), "page" == e) {
                var u = Math.min(o.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
                n = a.top + t * u;
            } else "line" == e && (n = t > 0 ? a.bottom + 3 : a.top - 3);
            do {
                var c = P(this, l, n);
                n += 5 * t;
            } while (c.outside && (0 > t ? n > 0 : i.height > n));
            "page" == e && (o.scrollbarV.scrollTop += z(this, c, "div").top - a.top), Ee(this, c, c, t), 
            r.goalColumn = l;
        }),
        toggleOverwrite: function() {
            (this.view.overwrite = !this.view.overwrite) ? this.display.cursor.className += " CodeMirror-overwrite" : this.display.cursor.className = this.display.cursor.className.replace(" CodeMirror-overwrite", "");
        },
        posFromIndex: function(t) {
            var e, n = 0, r = this.view.doc;
            return r.iter(0, r.size, function(r) {
                var i = r.text.length + 1;
                return i > t ? (e = t, !0) : (t -= i, ++n, void 0);
            }), Me(r, {
                line: n,
                ch: e
            });
        },
        indexFromPos: function(t) {
            if (0 > t.line || 0 > t.ch) return 0;
            var e = t.ch;
            return this.view.doc.iter(0, t.line, function(t) {
                e += t.text.length + 1;
            }), e;
        },
        scrollTo: function(t, e) {
            null != t && (this.display.scrollbarH.scrollLeft = this.display.scroller.scrollLeft = t), 
            null != e && (this.display.scrollbarV.scrollTop = this.display.scroller.scrollTop = e), 
            y(this, []);
        },
        getScrollInfo: function() {
            var t = this.display.scroller, e = ci;
            return {
                left: t.scrollLeft,
                top: t.scrollTop,
                height: t.scrollHeight - e,
                width: t.scrollWidth - e,
                clientHeight: t.clientHeight - e,
                clientWidth: t.clientWidth - e
            };
        },
        scrollIntoView: function(t) {
            "number" == typeof t && (t = {
                line: t,
                ch: 0
            }), t = t ? Me(this.view.doc, t) : this.view.sel.head, Oe(this, t);
        },
        setSize: function(t, e) {
            function n(t) {
                return "number" == typeof t || /^\d+$/.test(t + "") ? t + "px" : t;
            }
            null != t && (this.display.wrapper.style.width = n(t)), null != e && (this.display.wrapper.style.height = n(e)), 
            this.refresh();
        },
        on: function(t, e) {
            Yn(this, t, e);
        },
        off: function(t, e) {
            Un(this, t, e);
        },
        operation: function(t) {
            return Y(this, t)();
        },
        refresh: function() {
            j(this), this.display.scroller.scrollHeight > this.view.scrollTop && (this.display.scrollbarV.scrollTop = this.display.scroller.scrollTop = this.view.scrollTop), 
            y(this, !0);
        },
        getInputField: function() {
            return this.display.input;
        },
        getWrapperElement: function() {
            return this.display.wrapper;
        },
        getScrollerElement: function() {
            return this.display.scroller;
        },
        getGutterElement: function() {
            return this.display.gutters;
        }
    };
    var Jr = t.optionHandlers = {}, ti = t.defaults = {}, ei = t.Init = {
        toString: function() {
            return "CodeMirror.Init";
        }
    };
    $e("value", "", function(t, e) {
        t.setValue(e);
    }, !0), $e("mode", null, r, !0), $e("indentUnit", 2, r, !0), $e("indentWithTabs", !1), 
    $e("smartIndent", !0), $e("tabSize", 4, function(t) {
        r(t), j(t), y(t, !0);
    }, !0), $e("electricChars", !0), $e("theme", "default", function(t) {
        s(t), a(t);
    }, !0), $e("keyMap", "default", o), $e("extraKeys", null), $e("onKeyEvent", null), 
    $e("onDragEvent", null), $e("lineWrapping", !1, i, !0), $e("gutters", [], function(t) {
        h(t.options), a(t);
    }, !0), $e("lineNumbers", !1, function(t) {
        h(t.options), a(t);
    }, !0), $e("firstLineNumber", 1, a, !0), $e("lineNumberFormatter", function(t) {
        return t;
    }, a, !0), $e("showCursorWhenSelecting", !1, _, !0), $e("readOnly", !1, function(t, e) {
        "nocursor" == e ? (ye(t), t.display.input.blur()) : e || Q(t, !0);
    }), $e("dragDrop", !0), $e("cursorBlinkRate", 530), $e("cursorHeight", 1), $e("workTime", 100), 
    $e("workDelay", 100), $e("flattenSpans", !0), $e("pollInterval", 100), $e("undoDepth", 40), 
    $e("viewportMargin", 10, function(t) {
        t.refresh();
    }, !0), $e("tabindex", null, function(t, e) {
        t.display.input.tabIndex = e || "";
    }), $e("autofocus", null);
    var ni = t.modes = {}, ri = t.mimeModes = {};
    t.defineMode = function(e, n) {
        if (t.defaults.mode || "null" == e || (t.defaults.mode = e), arguments.length > 2) {
            n.dependencies = [];
            for (var r = 2; arguments.length > r; ++r) n.dependencies.push(arguments[r]);
        }
        ni[e] = n;
    }, t.defineMIME = function(t, e) {
        ri[t] = e;
    }, t.resolveMode = function(e) {
        if ("string" == typeof e && ri.hasOwnProperty(e)) e = ri[e]; else if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return t.resolveMode("application/xml");
        return "string" == typeof e ? {
            name: e
        } : e || {
            name: "null"
        };
    }, t.getMode = function(e, n) {
        var n = t.resolveMode(n), r = ni[n.name];
        if (!r) return t.getMode(e, "text/plain");
        var i = r(e, n);
        if (ii.hasOwnProperty(n.name)) {
            var o = ii[n.name];
            for (var s in o) o.hasOwnProperty(s) && (i.hasOwnProperty(s) && (i["_" + s] = i[s]), 
            i[s] = o[s]);
        }
        return i.name = n.name, i;
    }, t.defineMode("null", function() {
        return {
            token: function(t) {
                t.skipToEnd();
            }
        };
    }), t.defineMIME("text/plain", "null");
    var ii = t.modeExtensions = {};
    t.extendMode = function(t, e) {
        var n = ii.hasOwnProperty(t) ? ii[t] : ii[t] = {};
        for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
    }, t.defineExtension = function(e, n) {
        t.prototype[e] = n;
    }, t.defineOption = $e;
    var oi = [];
    t.defineInitHook = function(t) {
        oi.push(t);
    }, t.copyState = Ve, t.startState = Xe, t.innerMode = function(t, e) {
        for (;t.innerMode; ) {
            var n = t.innerMode(e);
            e = n.state, t = n.mode;
        }
        return n || {
            mode: t,
            state: e
        };
    };
    var si = t.commands = {
        selectAll: function(t) {
            t.setSelection({
                line: 0,
                ch: 0
            }, {
                line: t.lineCount() - 1
            });
        },
        killLine: function(t) {
            var e = t.getCursor(!0), n = t.getCursor(!1), r = !Se(e, n);
            r || t.getLine(e.line).length != e.ch ? t.replaceRange("", e, r ? n : {
                line: e.line
            }, "delete") : t.replaceRange("", e, {
                line: e.line + 1,
                ch: 0
            }, "delete");
        },
        deleteLine: function(t) {
            var e = t.getCursor().line;
            t.replaceRange("", {
                line: e,
                ch: 0
            }, {
                line: e
            }, "delete");
        },
        undo: function(t) {
            t.undo();
        },
        redo: function(t) {
            t.redo();
        },
        goDocStart: function(t) {
            t.extendSelection({
                line: 0,
                ch: 0
            });
        },
        goDocEnd: function(t) {
            t.extendSelection({
                line: t.lineCount() - 1
            });
        },
        goLineStart: function(t) {
            t.extendSelection(xr(t, t.getCursor().line));
        },
        goLineStartSmart: function(t) {
            var e = t.getCursor(), n = xr(t, e.line), r = t.getLineHandle(n.line), i = On(r);
            if (i && 0 != i[0].level) t.extendSelection(n); else {
                var o = Math.max(0, r.text.search(/\S/)), s = e.line == n.line && o >= e.ch && e.ch;
                t.extendSelection({
                    line: n.line,
                    ch: s ? 0 : o
                });
            }
        },
        goLineEnd: function(t) {
            t.extendSelection(br(t, t.getCursor().line));
        },
        goLineUp: function(t) {
            t.moveV(-1, "line");
        },
        goLineDown: function(t) {
            t.moveV(1, "line");
        },
        goPageUp: function(t) {
            t.moveV(-1, "page");
        },
        goPageDown: function(t) {
            t.moveV(1, "page");
        },
        goCharLeft: function(t) {
            t.moveH(-1, "char");
        },
        goCharRight: function(t) {
            t.moveH(1, "char");
        },
        goColumnLeft: function(t) {
            t.moveH(-1, "column");
        },
        goColumnRight: function(t) {
            t.moveH(1, "column");
        },
        goWordLeft: function(t) {
            t.moveH(-1, "word");
        },
        goWordRight: function(t) {
            t.moveH(1, "word");
        },
        delCharBefore: function(t) {
            t.deleteH(-1, "char");
        },
        delCharAfter: function(t) {
            t.deleteH(1, "char");
        },
        delWordBefore: function(t) {
            t.deleteH(-1, "word");
        },
        delWordAfter: function(t) {
            t.deleteH(1, "word");
        },
        indentAuto: function(t) {
            t.indentSelection("smart");
        },
        indentMore: function(t) {
            t.indentSelection("add");
        },
        indentLess: function(t) {
            t.indentSelection("subtract");
        },
        insertTab: function(t) {
            t.replaceSelection("	", "end", "input");
        },
        defaultTab: function(t) {
            t.somethingSelected() ? t.indentSelection("add") : t.replaceSelection("	", "end", "input");
        },
        transposeChars: function(t) {
            var e = t.getCursor(), n = t.getLine(e.line);
            e.ch > 0 && e.ch < n.length - 1 && t.replaceRange(n.charAt(e.ch) + n.charAt(e.ch - 1), {
                line: e.line,
                ch: e.ch - 1
            }, {
                line: e.line,
                ch: e.ch + 1
            });
        },
        newlineAndIndent: function(t) {
            Y(t, function() {
                t.replaceSelection("\n", "end", "input"), t.indentLine(t.getCursor().line, null, !0);
            })();
        },
        toggleOverwrite: function(t) {
            t.toggleOverwrite();
        }
    }, ai = t.keyMap = {};
    ai.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite"
    }, ai.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Alt-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goWordLeft",
        "Ctrl-Right": "goWordRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delWordBefore",
        "Ctrl-Delete": "delWordAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        fallthrough: "basic"
    }, ai.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goWordLeft",
        "Alt-Right": "goWordRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-Alt-Backspace": "delWordAfter",
        "Alt-Delete": "delWordAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        fallthrough: [ "basic", "emacsy" ]
    }, ai["default"] = Vr ? ai.macDefault : ai.pcDefault, ai.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    }, t.isModifierKey = Ge, t.fromTextArea = function(e, n) {
        function r() {
            e.value = u.getValue();
        }
        if (n || (n = {}), n.value = e.value, !n.tabindex && e.tabindex && (n.tabindex = e.tabindex), 
        null == n.autofocus) {
            var i = document.body;
            try {
                i = document.activeElement;
            } catch (o) {}
            n.autofocus = i == e || null != e.getAttribute("autofocus") && i == document.body;
        }
        if (e.form) {
            Yn(e.form, "submit", r);
            var s = e.form, a = s.submit;
            try {
                s.submit = function l() {
                    r(), s.submit = a, s.submit(), s.submit = l;
                };
            } catch (o) {}
        }
        e.style.display = "none";
        var u = t(function(t) {
            e.parentNode.insertBefore(t, e.nextSibling);
        }, n);
        return u.save = r, u.getTextArea = function() {
            return e;
        }, u.toTextArea = function() {
            r(), e.parentNode.removeChild(u.getWrapperElement()), e.style.display = "", e.form && (Un(e.form, "submit", r), 
            "function" == typeof e.form.submit && (e.form.submit = a));
        }, u;
    }, Ke.prototype = {
        eol: function() {
            return this.pos >= this.string.length;
        },
        sol: function() {
            return 0 == this.pos;
        },
        peek: function() {
            return this.string.charAt(this.pos) || void 0;
        },
        next: function() {
            return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0;
        },
        eat: function(t) {
            var e = this.string.charAt(this.pos);
            if ("string" == typeof t) var n = e == t; else var n = e && (t.test ? t.test(e) : t(e));
            return n ? (++this.pos, e) : void 0;
        },
        eatWhile: function(t) {
            for (var e = this.pos; this.eat(t); ) ;
            return this.pos > e;
        },
        eatSpace: function() {
            for (var t = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); ) ++this.pos;
            return this.pos > t;
        },
        skipToEnd: function() {
            this.pos = this.string.length;
        },
        skipTo: function(t) {
            var e = this.string.indexOf(t, this.pos);
            return e > -1 ? (this.pos = e, !0) : void 0;
        },
        backUp: function(t) {
            this.pos -= t;
        },
        column: function() {
            return Jn(this.string, this.start, this.tabSize);
        },
        indentation: function() {
            return Jn(this.string, null, this.tabSize);
        },
        match: function(t, e, n) {
            if ("string" != typeof t) {
                var r = this.string.slice(this.pos).match(t);
                return r && r.index > 0 ? null : (r && e !== !1 && (this.pos += r[0].length), r);
            }
            var i = function(t) {
                return n ? t.toLowerCase() : t;
            };
            return i(this.string).indexOf(i(t), this.pos) == this.pos ? (e !== !1 && (this.pos += t.length), 
            !0) : void 0;
        },
        current: function() {
            return this.string.slice(this.start, this.pos);
        }
    }, t.StringStream = Ke, Ze.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            V(this.cm);
            for (var t = null, e = null, n = 0; this.lines.length > n; ++n) {
                var r = this.lines[n], i = Je(r.markedSpans, this);
                null != i.to && (e = Dn(r)), r.markedSpans = tn(r.markedSpans, i), null != i.from ? t = Dn(r) : this.collapsed && !hn(r) && Bn(r, q(this.cm.display));
            }
            null != t && U(this.cm, t, e + 1), this.lines.length = 0, this.explicitlyCleared = !0, 
            this.collapsed && this.cm.view.cantEdit && (this.cm.view.cantEdit = !1, De(this.cm)), 
            X(this.cm), Kn(this.cm, this, "clear");
        }
    }, Ze.prototype.find = function() {
        for (var t, e, n = 0; this.lines.length > n; ++n) {
            var r = this.lines[n], i = Je(r.markedSpans, this);
            if (null != i.from || null != i.to) {
                var o = Dn(r);
                null != i.from && (t = {
                    line: o,
                    ch: i.from
                }), null != i.to && (e = {
                    line: o,
                    ch: i.to
                });
            }
        }
        return "bookmark" == this.type ? t : t && {
            from: t,
            to: e
        };
    }, window.lineIsHidden = hn;
    var li = {}, ui = /[\t\u0000-\u0019\u200b\u2028\u2029\uFEFF]/g;
    Mn.prototype = {
        chunkSize: function() {
            return this.lines.length;
        },
        remove: function(t, e, n) {
            for (var r = t, i = t + e; i > r; ++r) {
                var o = this.lines[r];
                this.height -= o.height, bn(o), Kn(n, o, "delete");
            }
            this.lines.splice(t, e);
        },
        collapse: function(t) {
            t.splice.apply(t, [ t.length, 0 ].concat(this.lines));
        },
        insertHeight: function(t, e, n) {
            this.height += n, this.lines = this.lines.slice(0, t).concat(e).concat(this.lines.slice(t));
            for (var r = 0, i = e.length; i > r; ++r) e[r].parent = this;
        },
        iterN: function(t, e, n) {
            for (var r = t + e; r > t; ++t) if (n(this.lines[t])) return !0;
        }
    }, An.prototype = {
        chunkSize: function() {
            return this.size;
        },
        remove: function(t, e, n) {
            this.size -= e;
            for (var r = 0; this.children.length > r; ++r) {
                var i = this.children[r], o = i.chunkSize();
                if (o > t) {
                    var s = Math.min(e, o - t), a = i.height;
                    if (i.remove(t, s, n), this.height -= a - i.height, o == s && (this.children.splice(r--, 1), 
                    i.parent = null), 0 == (e -= s)) break;
                    t = 0;
                } else t -= o;
            }
            if (25 > this.size - e) {
                var l = [];
                this.collapse(l), this.children = [ new Mn(l) ], this.children[0].parent = this;
            }
        },
        collapse: function(t) {
            for (var e = 0, n = this.children.length; n > e; ++e) this.children[e].collapse(t);
        },
        insert: function(t, e) {
            for (var n = 0, r = 0, i = e.length; i > r; ++r) n += e[r].height;
            this.insertHeight(t, e, n);
        },
        insertHeight: function(t, e, n) {
            this.size += e.length, this.height += n;
            for (var r = 0, i = this.children.length; i > r; ++r) {
                var o = this.children[r], s = o.chunkSize();
                if (s >= t) {
                    if (o.insertHeight(t, e, n), o.lines && o.lines.length > 50) {
                        for (;o.lines.length > 50; ) {
                            var a = o.lines.splice(o.lines.length - 25, 25), l = new Mn(a);
                            o.height -= l.height, this.children.splice(r + 1, 0, l), l.parent = this;
                        }
                        this.maybeSpill();
                    }
                    break;
                }
                t -= s;
            }
        },
        maybeSpill: function() {
            if (!(10 >= this.children.length)) {
                var t = this;
                do {
                    var e = t.children.splice(t.children.length - 5, 5), n = new An(e);
                    if (t.parent) {
                        t.size -= n.size, t.height -= n.height;
                        var r = rr(t.parent.children, t);
                        t.parent.children.splice(r + 1, 0, n);
                    } else {
                        var i = new An(t.children);
                        i.parent = t, t.children = [ i, n ], t = i;
                    }
                    n.parent = t.parent;
                } while (t.children.length > 10);
                t.parent.maybeSpill();
            }
        },
        iter: function(t, e, n) {
            this.iterN(t, e - t, n);
        },
        iterN: function(t, e, n) {
            for (var r = 0, i = this.children.length; i > r; ++r) {
                var o = this.children[r], s = o.chunkSize();
                if (s > t) {
                    var a = Math.min(e, s - t);
                    if (o.iterN(t, a, n)) return !0;
                    if (0 == (e -= a)) break;
                    t = 0;
                } else t -= s;
            }
        }
    }, t.e_stop = qn, t.e_preventDefault = Pn, t.e_stopPropagation = Rn, t.on = Yn, 
    t.off = Un, t.signal = Gn;
    var ci = 30, hi = t.Pass = {
        toString: function() {
            return "CodeMirror.Pass";
        }
    };
    Qn.prototype = {
        set: function(t, e) {
            clearTimeout(this.id), this.id = setTimeout(e, t);
        }
    }, t.countColumn = Jn;
    var fi = [ "" ], pi = /[\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc]/, di = /[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\uA66F\uA670-\uA672\uA674-\uA67D\uA69F]/, gi = function() {
        if (Dr) return !1;
        var t = lr("div");
        return "draggable" in t || "dragDrop" in t;
    }(), vi = /^$/;
    Ar ? vi = /$'/ : Ir ? vi = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/ : Or && (vi = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/);
    var mi, yi, xi = 3 != "\n\nb".split(/\n/).length ? function(t) {
        for (var e = 0, n = [], r = t.length; r >= e; ) {
            var i = t.indexOf("\n", e);
            -1 == i && (i = t.length);
            var o = t.slice(e, "\r" == t.charAt(i - 1) ? i - 1 : i), s = o.indexOf("\r");
            -1 != s ? (n.push(o.slice(0, s)), e += s + 1) : (n.push(o), e = i + 1);
        }
        return n;
    } : function(t) {
        return t.split(/\r\n?|\n/);
    };
    t.splitLines = xi;
    var bi = window.getSelection ? function(t) {
        try {
            return t.selectionStart != t.selectionEnd;
        } catch (e) {
            return !1;
        }
    } : function(t) {
        try {
            var e = t.ownerDocument.selection.createRange();
        } catch (n) {}
        return e && e.parentElement() == t ? 0 != e.compareEndPoints("StartToEnd", e) : !1;
    }, wi = function() {
        var t = lr("div");
        return "oncopy" in t ? !0 : (t.setAttribute("oncopy", "return;"), "function" == typeof t.oncopy);
    }(), Ci = {
        3: "Enter",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        109: "-",
        107: "=",
        127: "Delete",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        63276: "PageUp",
        63277: "PageDown",
        63275: "End",
        63273: "Home",
        63234: "Left",
        63232: "Up",
        63235: "Right",
        63233: "Down",
        63302: "Insert",
        63272: "Delete"
    };
    t.keyNames = Ci, function() {
        for (var t = 0; 10 > t; t++) Ci[t + 48] = t + "";
        for (var t = 65; 90 >= t; t++) Ci[t] = String.fromCharCode(t);
        for (var t = 1; 12 >= t; t++) Ci[t + 111] = Ci[t + 63235] = "F" + t;
    }();
    var ki = function() {
        function t(t) {
            return 255 >= t ? e.charAt(t) : t >= 1424 && 1524 >= t ? "R" : t >= 1536 && 1791 >= t ? n.charAt(t - 1536) : t >= 1792 && 2220 >= t ? "r" : "L";
        }
        var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLL", n = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmmrrrrrrrrrrrrrrrrrr", r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, i = /[stwN]/, o = /[LRr]/, s = /[Lb1n]/, a = /[1n]/;
        return function(e) {
            if (!r.test(e)) return !1;
            for (var n, l = e.length, u = [], c = null, h = 0; l > h; ++h) u.push(n = t(e.charCodeAt(h))), 
            null == c && ("L" == n ? c = "L" : ("R" == n || "r" == n) && (c = "R"));
            null == c && (c = "L");
            for (var h = 0, f = c; l > h; ++h) {
                var n = u[h];
                "m" == n ? u[h] = f : f = n;
            }
            for (var h = 0, p = c; l > h; ++h) {
                var n = u[h];
                "1" == n && "r" == p ? u[h] = "n" : o.test(n) && (p = n, "r" == n && (u[h] = "R"));
            }
            for (var h = 1, f = u[0]; l - 1 > h; ++h) {
                var n = u[h];
                "+" == n && "1" == f && "1" == u[h + 1] ? u[h] = "1" : "," != n || f != u[h + 1] || "1" != f && "n" != f || (u[h] = f), 
                f = n;
            }
            for (var h = 0; l > h; ++h) {
                var n = u[h];
                if ("," == n) u[h] = "N"; else if ("%" == n) {
                    for (var d = h + 1; l > d && "%" == u[d]; ++d) ;
                    for (var g = h && "!" == u[h - 1] || l - 1 > d && "1" == u[d] ? "1" : "N", v = h; d > v; ++v) u[v] = g;
                    h = d - 1;
                }
            }
            for (var h = 0, p = c; l > h; ++h) {
                var n = u[h];
                "L" == p && "1" == n ? u[h] = "L" : o.test(n) && (p = n);
            }
            for (var h = 0; l > h; ++h) if (i.test(u[h])) {
                for (var d = h + 1; l > d && i.test(u[d]); ++d) ;
                for (var m = "L" == (h ? u[h - 1] : c), y = "L" == (l - 1 > d ? u[d] : c), g = m || y ? "L" : "R", v = h; d > v; ++v) u[v] = g;
                h = d - 1;
            }
            for (var x, b = [], h = 0; l > h; ) if (s.test(u[h])) {
                var w = h;
                for (++h; l > h && s.test(u[h]); ++h) ;
                b.push({
                    from: w,
                    to: h,
                    level: 0
                });
            } else {
                var C = h, k = b.length;
                for (++h; l > h && "L" != u[h]; ++h) ;
                for (var v = C; h > v; ) if (a.test(u[v])) {
                    v > C && b.splice(k, 0, {
                        from: C,
                        to: v,
                        level: 1
                    });
                    var _ = v;
                    for (++v; h > v && a.test(u[v]); ++v) ;
                    b.splice(k, 0, {
                        from: _,
                        to: v,
                        level: 2
                    }), C = v;
                } else ++v;
                h > C && b.splice(k, 0, {
                    from: C,
                    to: h,
                    level: 1
                });
            }
            return 1 == b[0].level && (x = e.match(/^\s+/)) && (b[0].from = x[0].length, b.unshift({
                from: 0,
                to: x[0].length,
                level: 0
            })), 1 == er(b).level && (x = e.match(/\s+$/)) && (er(b).to -= x[0].length, b.push({
                from: l - x[0].length,
                to: l,
                level: 0
            })), b[0].level != er(b).level && b.push({
                from: l,
                to: l,
                level: b[0].level
            }), b;
        };
    }();
    return t.version = "3.0", t;
}(), CodeMirror.defineMode("javascript", function(t, e) {
    function n(t, e, n) {
        return e.tokenize = n, n(t, e);
    }
    function r(t, e) {
        for (var n, r = !1; null != (n = t.next()); ) {
            if (n == e && !r) return !1;
            r = !r && "\\" == n;
        }
        return r;
    }
    function i(t, e, n) {
        return I = t, z = n, e;
    }
    function o(t, e) {
        var o = t.next();
        if ('"' == o || "'" == o) return n(t, e, s(o));
        if (/[\[\]{}\(\),;\:\.]/.test(o)) return i(o);
        if ("0" == o && t.eat(/x/i)) return t.eatWhile(/[\da-f]/i), i("number", "number");
        if (/\d/.test(o) || "-" == o && t.eat(/\d/)) return t.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), 
        i("number", "number");
        if ("/" == o) return t.eat("*") ? n(t, e, a) : t.eat("/") ? (t.skipToEnd(), i("comment", "comment")) : "operator" == e.lastType || "keyword c" == e.lastType || /^[\[{}\(,;:]$/.test(e.lastType) ? (r(t, "/"), 
        t.eatWhile(/[gimy]/), i("regexp", "string-2")) : (t.eatWhile($), i("operator", null, t.current()));
        if ("#" == o) return t.skipToEnd(), i("error", "error");
        if ($.test(o)) return t.eatWhile($), i("operator", null, t.current());
        t.eatWhile(/[\w\$_]/);
        var l = t.current(), u = q.propertyIsEnumerable(l) && q[l];
        return u && "." != e.lastType ? i(u.type, u.style, l) : i("variable", "variable", l);
    }
    function s(t) {
        return function(e, n) {
            return r(e, t) || (n.tokenize = o), i("string", "string");
        };
    }
    function a(t, e) {
        for (var n, r = !1; n = t.next(); ) {
            if ("/" == n && r) {
                e.tokenize = o;
                break;
            }
            r = "*" == n;
        }
        return i("comment", "comment");
    }
    function l(t, e, n, r, i, o) {
        this.indented = t, this.column = e, this.type = n, this.prev = i, this.info = o, 
        null != r && (this.align = r);
    }
    function u(t, e) {
        for (var n = t.localVars; n; n = n.next) if (n.name == e) return !0;
    }
    function c(t, e, n, r, i) {
        var o = t.cc;
        for (X.state = t, X.stream = i, X.marked = null, X.cc = o, t.lexical.hasOwnProperty("align") || (t.lexical.align = !0); ;) {
            var s = o.length ? o.pop() : P ? b : x;
            if (s(n, r)) {
                for (;o.length && o[o.length - 1].lex; ) o.pop()();
                return X.marked ? X.marked : "variable" == n && u(t, r) ? "variable-2" : e;
            }
        }
    }
    function h() {
        for (var t = arguments.length - 1; t >= 0; t--) X.cc.push(arguments[t]);
    }
    function f() {
        return h.apply(null, arguments), !0;
    }
    function p(t) {
        var e = X.state;
        if (e.context) {
            X.marked = "def";
            for (var n = e.localVars; n; n = n.next) if (n.name == t) return;
            e.localVars = {
                name: t,
                next: e.localVars
            };
        }
    }
    function d() {
        X.state.context = {
            prev: X.state.context,
            vars: X.state.localVars
        }, X.state.localVars = Y;
    }
    function g() {
        X.state.localVars = X.state.context.vars, X.state.context = X.state.context.prev;
    }
    function v(t, e) {
        var n = function() {
            var n = X.state;
            n.lexical = new l(n.indented, X.stream.column(), t, null, n.lexical, e);
        };
        return n.lex = !0, n;
    }
    function m() {
        var t = X.state;
        t.lexical.prev && (")" == t.lexical.type && (t.indented = t.lexical.indented), t.lexical = t.lexical.prev);
    }
    function y(t) {
        return function(e) {
            return e == t ? f() : ";" == t ? h() : f(arguments.callee);
        };
    }
    function x(t) {
        return "var" == t ? f(v("vardef"), A, y(";"), m) : "keyword a" == t ? f(v("form"), b, x, m) : "keyword b" == t ? f(v("form"), x, m) : "{" == t ? f(v("}"), L, m) : ";" == t ? f() : "function" == t ? f(O) : "for" == t ? f(v("form"), y("("), v(")"), B, y(")"), m, x, m) : "variable" == t ? f(v("stat"), k) : "switch" == t ? f(v("form"), b, v("}", "switch"), y("{"), L, m, m) : "case" == t ? f(b, y(":")) : "default" == t ? f(y(":")) : "catch" == t ? f(v("form"), d, y("("), j, y(")"), x, m, g) : h(v("stat"), b, y(";"), m);
    }
    function b(t) {
        return V.hasOwnProperty(t) ? f(C) : "function" == t ? f(O) : "keyword c" == t ? f(w) : "(" == t ? f(v(")"), w, y(")"), m, C) : "operator" == t ? f(b) : "[" == t ? f(v("]"), T(b, "]"), m, C) : "{" == t ? f(v("}"), T(S, "}"), m, C) : f();
    }
    function w(t) {
        return t.match(/[;\}\)\],]/) ? h() : h(b);
    }
    function C(t, e) {
        if ("operator" == t && /\+\+|--/.test(e)) return f(C);
        if ("operator" == t && "?" == e) return f(b, y(":"), b);
        if (";" != t) return "(" == t ? f(v(")"), T(b, ")"), m, C) : "." == t ? f(_, C) : "[" == t ? f(v("]"), b, y("]"), m, C) : void 0;
    }
    function k(t) {
        return ":" == t ? f(m, x) : h(C, y(";"), m);
    }
    function _(t) {
        return "variable" == t ? (X.marked = "property", f()) : void 0;
    }
    function S(t) {
        return "variable" == t && (X.marked = "property"), V.hasOwnProperty(t) ? f(y(":"), b) : void 0;
    }
    function T(t, e) {
        function n(r) {
            return "," == r ? f(t, n) : r == e ? f() : f(y(e));
        }
        return function(r) {
            return r == e ? f() : h(t, n);
        };
    }
    function L(t) {
        return "}" == t ? f() : h(x, L);
    }
    function N(t) {
        return ":" == t ? f(M) : h();
    }
    function M(t) {
        return "variable" == t ? (X.marked = "variable-3", f()) : h();
    }
    function A(t, e) {
        return "variable" == t ? (p(e), R ? f(N, E) : f(E)) : h();
    }
    function E(t, e) {
        return "=" == e ? f(b, E) : "," == t ? f(A) : void 0;
    }
    function B(t) {
        return "var" == t ? f(A, y(";"), H) : ";" == t ? f(H) : "variable" == t ? f(D) : f(H);
    }
    function D(t, e) {
        return "in" == e ? f(b) : f(C, H);
    }
    function H(t, e) {
        return ";" == t ? f(F) : "in" == e ? f(b) : f(b, y(";"), F);
    }
    function F(t) {
        ")" != t && f(b);
    }
    function O(t, e) {
        return "variable" == t ? (p(e), f(O)) : "(" == t ? f(v(")"), d, T(j, ")"), m, x, g) : void 0;
    }
    function j(t, e) {
        return "variable" == t ? (p(e), R ? f(N) : f()) : void 0;
    }
    var I, z, W = t.indentUnit, P = e.json, R = e.typescript, q = function() {
        function t(t) {
            return {
                type: t,
                style: "keyword"
            };
        }
        var e = t("keyword a"), n = t("keyword b"), r = t("keyword c"), i = t("operator"), o = {
            type: "atom",
            style: "atom"
        }, s = {
            "if": e,
            "while": e,
            "with": e,
            "else": n,
            "do": n,
            "try": n,
            "finally": n,
            "return": r,
            "break": r,
            "continue": r,
            "new": r,
            "delete": r,
            "throw": r,
            "var": t("var"),
            "const": t("var"),
            let: t("var"),
            "function": t("function"),
            "catch": t("catch"),
            "for": t("for"),
            "switch": t("switch"),
            "case": t("case"),
            "default": t("default"),
            "in": i,
            "typeof": i,
            "instanceof": i,
            "true": o,
            "false": o,
            "null": o,
            undefined: o,
            NaN: o,
            Infinity: o
        };
        if (R) {
            var a = {
                type: "variable",
                style: "variable-3"
            }, l = {
                "interface": t("interface"),
                "class": t("class"),
                "extends": t("extends"),
                constructor: t("constructor"),
                "public": t("public"),
                "private": t("private"),
                "protected": t("protected"),
                "static": t("static"),
                "super": t("super"),
                string: a,
                number: a,
                bool: a,
                any: a
            };
            for (var u in l) s[u] = l[u];
        }
        return s;
    }(), $ = /[+\-*&%=<>!?|]/, V = {
        atom: !0,
        number: !0,
        variable: !0,
        string: !0,
        regexp: !0
    }, X = {
        state: null,
        column: null,
        marked: null,
        cc: null
    }, Y = {
        name: "this",
        next: {
            name: "arguments"
        }
    };
    return m.lex = !0, {
        startState: function(t) {
            return {
                tokenize: o,
                lastType: null,
                cc: [],
                lexical: new l((t || 0) - W, 0, "block", !1),
                localVars: e.localVars,
                context: e.localVars && {
                    vars: e.localVars
                },
                indented: 0
            };
        },
        token: function(t, e) {
            if (t.sol() && (e.lexical.hasOwnProperty("align") || (e.lexical.align = !1), e.indented = t.indentation()), 
            t.eatSpace()) return null;
            var n = e.tokenize(t, e);
            return "comment" == I ? n : (e.lastType = I, c(e, n, I, z, t));
        },
        indent: function(t, e) {
            if (t.tokenize == a) return CodeMirror.Pass;
            if (t.tokenize != o) return 0;
            var n = e && e.charAt(0), r = t.lexical;
            "stat" == r.type && "}" == n && (r = r.prev);
            var i = r.type, s = n == i;
            return "vardef" == i ? r.indented + ("operator" == t.lastType || "," == t.lastType ? 4 : 0) : "form" == i && "{" == n ? r.indented : "form" == i ? r.indented + W : "stat" == i ? r.indented + ("operator" == t.lastType || "," == t.lastType ? W : 0) : "switch" != r.info || s ? r.align ? r.column + (s ? 0 : 1) : r.indented + (s ? 0 : W) : r.indented + (/^(?:case|default)\b/.test(e) ? W : 2 * W);
        },
        electricChars: ":{}",
        jsonMode: P
    };
}), CodeMirror.defineMIME("text/javascript", "javascript"), CodeMirror.defineMIME("application/json", {
    name: "javascript",
    json: !0
}), CodeMirror.defineMIME("text/typescript", {
    name: "javascript",
    typescript: !0
}), CodeMirror.defineMIME("application/typescript", {
    name: "javascript",
    typescript: !0
}), function() {
    function t(t, e, n, r) {
        if (this.atOccurrence = !1, this.cm = t, null == r && "string" == typeof e && (r = !1), 
        n = n ? t.clipPos(n) : {
            line: 0,
            ch: 0
        }, this.pos = {
            from: n,
            to: n
        }, "string" != typeof e) e.global || (e = RegExp(e.source, e.ignoreCase ? "ig" : "g")), 
        this.matches = function(n, r) {
            if (n) {
                e.lastIndex = 0;
                for (var i = t.getLine(r.line).slice(0, r.ch), o = e.exec(i), s = 0; o; ) {
                    s += o.index + 1, i = i.slice(s), e.lastIndex = 0;
                    var a = e.exec(i);
                    if (!a) break;
                    o = a;
                }
                s--;
            } else {
                e.lastIndex = r.ch;
                var i = t.getLine(r.line), o = e.exec(i), s = o && o.index;
            }
            return o ? {
                from: {
                    line: r.line,
                    ch: s
                },
                to: {
                    line: r.line,
                    ch: s + o[0].length
                },
                match: o
            } : void 0;
        }; else {
            r && (e = e.toLowerCase());
            var i = r ? function(t) {
                return t.toLowerCase();
            } : function(t) {
                return t;
            }, o = e.split("\n");
            this.matches = 1 == o.length ? function(n, r) {
                var o, s = i(t.getLine(r.line)), a = e.length;
                return (n ? r.ch >= a && -1 != (o = s.lastIndexOf(e, r.ch - a)) : -1 != (o = s.indexOf(e, r.ch))) ? {
                    from: {
                        line: r.line,
                        ch: o
                    },
                    to: {
                        line: r.line,
                        ch: o + a
                    }
                } : void 0;
            } : function(e, n) {
                var r = n.line, s = e ? o.length - 1 : 0, a = o[s], l = i(t.getLine(r)), u = e ? l.indexOf(a) + a.length : l.lastIndexOf(a);
                if (!(e ? u >= n.ch || u != a.length : n.ch >= u || u != l.length - a.length)) for (;;) {
                    if (e ? !r : r == t.lineCount() - 1) return;
                    if (l = i(t.getLine(r += e ? -1 : 1)), a = o[e ? --s : ++s], !(s > 0 && o.length - 1 > s)) {
                        var c = e ? l.lastIndexOf(a) : l.indexOf(a) + a.length;
                        if (e ? c != l.length - a.length : c != a.length) return;
                        var h = {
                            line: n.line,
                            ch: u
                        }, f = {
                            line: r,
                            ch: c
                        };
                        return {
                            from: e ? f : h,
                            to: e ? h : f
                        };
                    }
                    if (l != a) return;
                }
            };
        }
    }
    t.prototype = {
        findNext: function() {
            return this.find(!1);
        },
        findPrevious: function() {
            return this.find(!0);
        },
        find: function(t) {
            function e(t) {
                var e = {
                    line: t,
                    ch: 0
                };
                return n.pos = {
                    from: e,
                    to: e
                }, n.atOccurrence = !1, !1;
            }
            for (var n = this, r = this.cm.clipPos(t ? this.pos.from : this.pos.to); ;) {
                if (this.pos = this.matches(t, r)) return this.atOccurrence = !0, this.pos.match || !0;
                if (t) {
                    if (!r.line) return e(0);
                    r = {
                        line: r.line - 1,
                        ch: this.cm.getLine(r.line - 1).length
                    };
                } else {
                    var i = this.cm.lineCount();
                    if (r.line == i - 1) return e(i);
                    r = {
                        line: r.line + 1,
                        ch: 0
                    };
                }
            }
        },
        from: function() {
            return this.atOccurrence ? this.pos.from : void 0;
        },
        to: function() {
            return this.atOccurrence ? this.pos.to : void 0;
        },
        replace: function(t) {
            var e = this;
            this.atOccurrence && (e.pos.to = this.cm.replaceRange(t, e.pos.from, e.pos.to));
        }
    }, CodeMirror.defineExtension("getSearchCursor", function(e, n, r) {
        return new t(this, e, n, r);
    });
}();