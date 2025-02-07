import { useState as d, useRef as a, useCallback as f, useEffect as m } from "react";
import { flushSync as h } from "react-dom";
const w = (t) => {
  const [s, c] = d(
    (t == null ? void 0 : t.defaultOpen) ?? !1
  ), n = a(null), o = a(Promise.withResolvers()), l = f(() => {
    var e;
    return h(() => {
      c(!0);
    }), (e = n.current) == null || e.showModal(), o.current.promise;
  }, []), u = f((e) => {
    var r;
    (r = n.current) == null || r.close(), c(!1), o.current.resolve(e), o.current = Promise.withResolvers();
  }, []), v = f(
    (e) => {
      s ? u(e) : l();
    },
    [u, l, s]
  );
  return m(() => {
    t != null && t.defaultOpen && l();
  }, []), m(() => {
    var r;
    const e = () => {
      c(!1);
    };
    return (r = n.current) == null || r.addEventListener("close", e), () => {
      var i;
      (i = n.current) == null || i.removeEventListener(
        "close",
        e
      );
    };
  }, [s]), { open: l, close: u, toggle: v, ref: n, isOpen: s };
};
export {
  w as useDialog
};
