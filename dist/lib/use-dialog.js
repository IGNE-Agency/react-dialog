import { useState as v, useRef as i, useCallback as o, useEffect as a } from "react";
import { flushSync as h } from "react-dom";
const E = (e) => {
  const [t, s] = v(
    (e == null ? void 0 : e.defaultOpen) ?? !1
  ), r = i(null), u = i(
    Promise.withResolvers()
  ), c = o(() => {
    var n;
    return h(() => {
      s(!0);
    }), (n = r.current) == null || n.showModal(), u.current.promise;
  }, []), l = o((n) => {
    var f;
    (f = r.current) == null || f.close(), s(!1), u.current.resolve(n), setTimeout(() => {
      u.current = Promise.withResolvers();
    });
  }, []), m = o(
    (n) => t ? l(n) : c(),
    [l, c, t]
  );
  return a(() => {
    e != null && e.defaultOpen && c();
  }, [c]), {
    open: c,
    close: l,
    toggle: m,
    ref: r,
    isOpen: t
  };
}, L = (e) => {
  a(() => {
    var s;
    const t = () => {
      e.close();
    };
    return (s = e.ref.current) == null || s.addEventListener(
      "cancel",
      t
    ), () => {
      var r;
      (r = e.ref.current) == null || r.removeEventListener(
        "cancel",
        t
      );
    };
  }, [e]);
};
export {
  L as useAttachListeners,
  E as useDialog
};
