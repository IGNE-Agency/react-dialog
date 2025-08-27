import { useState as w, useRef as o, useCallback as r, useEffect as d } from "react";
import { flushSync as O } from "react-dom";
const E = (e) => {
  const [c, u] = w(
    e != null && e.defaultOpen ? "open" : "closed"
  ), t = c === "open", v = !t, i = o(null), s = o(
    Promise.withResolvers()
  ), l = r(async () => {
    var n, a;
    return (n = i.current) == null || n.showModal(), await ((a = e == null ? void 0 : e.onOpen) == null ? void 0 : a.call(e)), O(() => {
      u("open");
    }), s.current.promise;
  }, []), f = r(async (n) => {
    var a, m;
    (a = i.current) == null || a.close(), await ((m = e == null ? void 0 : e.onClose) == null ? void 0 : m.call(e, n)), u("closed"), s.current.resolve(n), setTimeout(() => {
      s.current = Promise.withResolvers();
    });
  }, []), h = r(
    (n) => t ? f(n) : l(),
    [f, l, t]
  );
  return d(() => {
    e != null && e.defaultOpen && l();
  }, [l, e == null ? void 0 : e.defaultOpen]), {
    open: l,
    close: f,
    toggle: h,
    ref: i,
    isOpen: t,
    isClosed: v,
    state: c
  };
}, L = (e) => {
  d(() => {
    var u;
    const c = () => {
      e.close();
    };
    return (u = e.ref.current) == null || u.addEventListener(
      "cancel",
      c
    ), () => {
      var t;
      (t = e.ref.current) == null || t.removeEventListener(
        "cancel",
        c
      );
    };
  }, [e]);
};
export {
  L as useAttachListeners,
  E as useDialog
};
