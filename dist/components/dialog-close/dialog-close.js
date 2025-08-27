import { jsx as a } from "react/jsx-runtime";
import i from "classnames";
import '../../assets/dialog-close.css';const c = "_dialogClose_19r7v_1", m = {
  dialogClose: c
}, C = ({
  dialog: o,
  onClick: s,
  children: l,
  className: t
}) => /* @__PURE__ */ a(
  "button",
  {
    type: "button",
    className: i([
      m.dialogClose,
      t
    ]),
    onClick: (e) => {
      o.close(), s?.(e);
    },
    children: l
  }
);
export {
  C as default
};
