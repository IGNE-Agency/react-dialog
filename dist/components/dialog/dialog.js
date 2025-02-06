import { jsx as a } from "react/jsx-runtime";
import l from "classnames";
import { createPortal as s } from "react-dom";
import '../../assets/dialog.css';const m = "_dialog_1mce7_1", c = {
  dialog: m
}, n = ({
  children: e,
  dialog: o,
  className: r,
  root: t
}) => o.isOpen ? s(
  /* @__PURE__ */ a(
    "dialog",
    {
      ref: o.ref,
      className: l([
        c.dialog,
        r
      ]),
      children: e
    }
  ),
  // biome-ignore lint/style/noNonNullAssertion: #root should always be defined
  t ?? document.querySelector("#root")
) : null;
export {
  n as default
};
