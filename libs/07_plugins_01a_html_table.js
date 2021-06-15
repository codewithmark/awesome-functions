! function(n, t, e, r) {
    n.fn.tableToJSON = function(t) {
        var e = {
            ignoreColumns: [],
            onlyColumns: null,
            ignoreHiddenRows: !0,
            ignoreEmptyRows: !1,
            headings: null,
            allowHTML: !1,
            includeRowId: !1,
            textDataOverride: "data-override",
            textExtractor: null
        };
        t = jQuery.extend(e, t);
        var o = function(n) {
                return n !== r && null !== n
            },
            i = function(n) {
                return o(t.onlyColumns) ? -1 === jQuery.inArray(n, t.onlyColumns) : -1 !== jQuery.inArray(n, t.ignoreColumns)
            },
            u = function(n, t) {
                var e = {},
                    r = 0;
                return jQuery.each(t, function(t, i) {
                    r < n.length && o(i) && (e[n[r]] = i, r++)
                }), e
            },
            a = function(e, r, o) {
                var i = n(r),
                    u = t.textExtractor,
                    a = i.attr(t.textDataOverride);
                return null === u || o ? jQuery.trim(a || (t.allowHTML ? i.html() : r.textContent || i.text()) || "") : n.isFunction(u) ? n.trim(a || u(e, i)) : "object" == typeof u && jQuery.isFunction(u[e]) ? jQuery.trim(a || u[e](e, i)) : n.trim(a || (t.allowHTML ? i.html() : r.textContent || i.text()) || "")
            },
            l = function(e, r) {
                var o = [],
                    i = t.includeRowId,
                    u = "boolean" == typeof i ? i : "string" == typeof i,
                    l = "string" == typeof i == !0 ? i : "rowId";
                return u && "undefined" == typeof n(e).attr("id") && o.push(l), n(e).children("td,th").each(function(n, t) {
                    o.push(a(n, t, r))
                }), o
            },
            f = function(n) {
                var e = n.find("tr:first").first();
                return o(t.headings) ? t.headings : l(e, !0)
            },
            d = function(e, r) {
                var l, f, d, s, c, h, g, y = [],
                    p = 0,
                    m = [];
                return e.children("tbody,*").children("tr").each(function(e, r) {
                    if (e > 0 || o(t.headings)) {
                        var i = t.includeRowId,
                            u = "boolean" == typeof i ? i : "string" == typeof i;
                        h = n(r);
                        var m = h.find("td").length === h.find("td:empty").length;
                        !h.is(":visible") && t.ignoreHiddenRows || m && t.ignoreEmptyRows || h.data("ignore") && "false" !== h.data("ignore") || (p = 0, y[e] || (y[e] = []), u && (p += 1, "undefined" != typeof h.attr("id") ? y[e].push(h.attr("id")) : y[e].push("")), h.children().each(function() {
                            for (g = n(this); y[e][p];) p++;
                            if (g.filter("[rowspan]").length)
                                for (d = parseInt(g.attr("rowspan"), 10) - 1, c = a(p, g), l = 1; d >= l; l++) y[e + l] || (y[e + l] = []), y[e + l][p] = c;
                            if (g.filter("[colspan]").length)
                                for (d = parseInt(g.attr("colspan"), 10) - 1, c = a(p, g), l = 1; d >= l; l++)
                                    if (g.filter("[rowspan]").length)
                                        for (s = parseInt(g.attr("rowspan"), 10), f = 0; s > f; f++) y[e + f][p + l] = c;
                                    else y[e][p + l] = c;
                            c = y[e][p] || a(p, g), o(c) && (y[e][p] = c), p++
                        }))
                    }
                }), jQuery.each(y, function(e, a) {
                    if (o(a)) {
                        var l = o(t.onlyColumns) || t.ignoreColumns.length ? n.grep(a, function(n, t) {
                                return !i(t)
                            }) : a,
                            f = o(t.headings) ? r : n.grep(r, function(n, t) {
                                return !i(t)
                            });
                        c = u(f, l), m[m.length] = c
                    }
                }), m
            },
            s = f(this);
        return d(this, s)
    }
}(jQuery, window, document);