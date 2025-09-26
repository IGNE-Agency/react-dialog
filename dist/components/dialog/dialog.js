import { jsx as f } from "react/jsx-runtime";
import n from "classnames";
import { createPortal as l } from "react-dom";
import { useAttachListeners as u } from "../../lib/use-dialog.js";
import '../../assets/dialog.css';const i = "_dialog_cq83n_1", p = {
  dialog: i
}, q = ({
  children: o,
  dialog: e,
  className: a,
  root: t,
  ignoreBackdropClick: m,
  onClick: r,
  ...c
}) => (u(e), e.isOpen ? l(
  // biome-ignore lint/a11y/useKeyWithClickEvents: not relevant, because of `useAttachListeners`
  /* @__PURE__ */ f(
    "dialog",
    {
      ref: e.ref,
      className: n([p.dialog, a]),
      onClick: (s) => {
        !m && s.target === e.ref.current && e.close(), r == null || r(s);
      },
      ...c,
      children: o
    }
  ),
  (typeof t == "string" ? document.querySelector(t) : t) ?? document.body
) : null);
export {
  q as default
};
