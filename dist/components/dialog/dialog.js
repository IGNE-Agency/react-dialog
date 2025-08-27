import { jsx as m } from "react/jsx-runtime";
import n from "classnames";
import { createPortal as i } from "react-dom";
import { useAttachListeners as f } from "../../lib/use-dialog.js";
import '../../assets/dialog.css';const u = "_dialog_yuba7_1", p = {
  dialog: u
}, b = ({
  children: o,
  dialog: e,
  className: s,
  root: t,
  ignoreBackdropClick: a,
  onClick: c,
  ...l
}) => (f(e), e.isOpen ? i(
  /* @__PURE__ */ m(
    "dialog",
    {
      ref: e.ref,
      className: n([
        p.dialog,
        s
      ]),
      onClick: (r) => {
        !a && r.target === e.ref.current && e.close(), c?.(r);
      },
      ...l,
      children: o
    }
  ),
  (typeof t == "string" ? document.querySelector(t) : t) ?? document.body
) : null);
export {
  b as default
};
