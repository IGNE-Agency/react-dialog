import { useState as v, useRef as a, useCallback as l, useEffect as f } from "react";
import { flushSync as d } from "react-dom";
const O = (e) => {
  const [t, i] = v(
    e?.defaultOpen ? "open" : "closed"
  ), s = t === "open", m = !s, o = a(null), c = a(
    Promise.withResolvers()
  ), n = l(async () => (d(() => {
    i("open");
  }), o.current?.showModal(), await e?.onOpen?.(), c.current.promise), []), u = l(async (r) => {
    i("closed"), o.current?.close(), await e?.onClose?.(r), c.current.resolve(r), setTimeout(() => {
      c.current = Promise.withResolvers();
    });
  }, []), p = l(
    (r) => s ? u(r) : n(),
    [u, n, s]
  );
  return f(() => {
    e?.defaultOpen && n();
  }, [n]), {
    open: n,
    close: u,
    toggle: p,
    ref: o,
    isOpen: s,
    isClosed: m,
    state: t
  };
}, y = (e) => {
  f(() => {
    const t = () => {
      e.close();
    };
    return e.ref.current?.addEventListener(
      "cancel",
      t
    ), () => {
      e.ref.current?.removeEventListener(
        "cancel",
        t
      );
    };
  }, [e]);
};
export {
  y as useAttachListeners,
  O as useDialog
};
