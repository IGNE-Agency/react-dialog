import { jsx as t } from "react/jsx-runtime";
import l from "classnames";
import { createPortal as s } from "react-dom";
import '../../assets/dialog.css';const i = "_dialog_7oa77_1", m = {
  dialog: i
}, n = ({
  children: a,
  dialog: o,
  className: e,
  root: r
}) => o.isOpen ? s(
  /* @__PURE__ */ t(
    "dialog",
    {
      ref: o.ref,
      className: l([
        m.dialog,
        e
      ]),
      children: a
    }
  ),
  // biome-ignore lint/style/noNonNullAssertion: #root should always be defined
  r ?? document.querySelector("#root")
) : null;
export {
  n as default
};
