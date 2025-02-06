import { useState as d, useRef as m, useCallback as f, useEffect as a } from "react";
import { flushSync as O } from "react-dom";
const E = (t) => {
  const [l, c] = d(
    (t == null ? void 0 : t.defaultOpen) ?? !1
  ), n = m(null), s = f(() => {
    var e;
    O(() => {
      c(!0);
    }), (e = n.current) == null || e.showModal();
  }, []), u = f(() => {
    var e;
    (e = n.current) == null || e.close(), c(!1);
  }, []), i = f(() => {
    l ? u() : s();
  }, [u, s, l]);
  return a(() => {
    t != null && t.defaultOpen && s();
  }, []), a(() => {
    var r;
    const e = () => {
      c(!1);
    };
    return (r = n.current) == null || r.addEventListener("close", e), () => {
      var o;
      (o = n.current) == null || o.removeEventListener(
        "close",
        e
      );
    };
  }, [l]), { open: s, close: u, toggle: i, ref: n, isOpen: l };
};
export {
  E as useDialog
};
