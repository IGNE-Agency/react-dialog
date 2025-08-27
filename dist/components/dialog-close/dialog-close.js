import { jsx as a } from "react/jsx-runtime";
import m from "classnames";
import '../../assets/dialog-close.css';const r = "_dialogClose_19r7v_1", d = {
  dialogClose: r
}, p = ({
  dialog: s,
  onClick: o,
  children: t,
  className: e
}) => /* @__PURE__ */ a(
  "button",
  {
    type: "button",
    className: m([
      d.dialogClose,
      e
    ]),
    onClick: (l) => {
      s.close(), o == null || o(l);
    },
    children: t
  }
);
export {
  p as default
};
