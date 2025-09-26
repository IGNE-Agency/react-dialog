import { useState as w, useRef as m, useCallback as f, useEffect as v } from "react";
import { flushSync as O } from "react-dom";
const E = (e) => {
  const [c, u] = w(
    e != null && e.defaultOpen ? "open" : "closed"
  ), t = c === "open", d = !t, r = m(null), i = m(Promise.withResolvers()), l = f(async () => {
    var n, s;
    return O(() => {
      u("open");
    }), (n = r.current) == null || n.showModal(), await ((s = e == null ? void 0 : e.onOpen) == null ? void 0 : s.call(e)), i.current.promise;
  }, []), a = f(async (n) => {
    var s, o;
    u("closed"), (s = r.current) == null || s.close(), await ((o = e == null ? void 0 : e.onClose) == null ? void 0 : o.call(e, n)), i.current.resolve(n), setTimeout(() => {
      i.current = Promise.withResolvers();
    });
  }, []), h = f(
    (n) => t ? a(n) : l(),
    [a, l, t]
  );
  return v(() => {
    e != null && e.defaultOpen && l();
  }, [l]), {
    open: l,
    close: a,
    toggle: h,
    ref: r,
    isOpen: t,
    isClosed: d,
    state: c
  };
}, L = (e) => {
  v(() => {
    var u;
    const c = () => {
      e.close();
    };
    return (u = e.ref.current) == null || u.addEventListener("cancel", c), () => {
      var t;
      (t = e.ref.current) == null || t.removeEventListener("cancel", c);
    };
  }, [e]);
};
export {
  L as useAttachListeners,
  E as useDialog
};
