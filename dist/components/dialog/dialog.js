import { jsx as c } from "react/jsx-runtime";
import u from "classnames";
import { createPortal as l } from "react-dom";
import { useAttachListeners as n } from "../../lib/use-dialog.js";
import '../../assets/dialog.css';const i = "_dialog_yuba7_1", p = {
  dialog: i
}, b = ({
  children: o,
  dialog: e,
  className: a,
  root: t,
  ignoreBackdropClick: m,
  onClick: r,
  ...f
}) => (n(e), e.isOpen ? l(
  /* @__PURE__ */ c(
    "dialog",
    {
      ref: e.ref,
      className: u([
        p.dialog,
        a
      ]),
      onClick: (s) => {
        !m && s.target === e.ref.current && e.close(), r == null || r(s);
      },
      ...f,
      children: o
    }
  ),
  (typeof t == "string" ? document.querySelector(t) : t) ?? document.body
) : null);
export {
  b as default
};
