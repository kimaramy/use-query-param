import { useState as m, useEffect as S, useCallback as w } from "react";
const Q = (e) => e == null, P = (e = !1) => {
  if (!window)
    throw new ReferenceError("'window' is undefined.");
  const [r, t] = m(
    window.location.search.slice(1)
  ), s = (n, a = null) => {
    const o = !Q(a) && !e;
    window.history[o ? "pushState" : "replaceState"](
      a,
      "",
      `${window.location.pathname}${n.length > 0 ? `?${n}` : n}`
    );
  }, c = () => {
    t(window.location.search.slice(1));
  };
  return S(() => (window.addEventListener("popstate", c), () => {
    window.removeEventListener("popstate", c);
  }), []), [r, s];
}, y = { isShallow: !1 }, f = (e) => {
  var o;
  const [r, t] = P(
    (o = e == null ? void 0 : e.isShallow) != null ? o : y.isShallow
  ), s = w(
    (l) => new URLSearchParams(
      l
    ).toString(),
    []
  ), n = w((l) => {
    const i = {}, u = new URLSearchParams(l).entries();
    for (const [d, h] of u)
      i[d] = h;
    return i;
  }, [])(r), a = w(
    (l) => {
      const i = JSON.parse(JSON.stringify(l)), u = Object.keys(i).length > 0;
      t(
        s(i),
        u ? i : null
      ), window.dispatchEvent(new Event("popstate"));
    },
    [t]
  );
  return S(() => {
    t(r);
  }, [r]), [n, a];
}, p = (e, r, t) => {
  var a;
  const [s, c] = f({
    isShallow: (a = t == null ? void 0 : t.isShallow) != null ? a : y.isShallow
  }), n = (o) => {
    c({ ...s, [e]: o });
  };
  return [
    r ? r(s[e]) : s[e],
    n
  ];
};
export {
  p as useQueryParam,
  f as useQueryParams,
  P as useQueryString
};
