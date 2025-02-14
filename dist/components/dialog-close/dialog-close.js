import { jsx as a } from "react/jsx-runtime";
import m from "classnames";
import '../../assets/dialog-close.css';const d = "_dialogClose_q31z7_1", g = {
  dialogClose: d
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
      g.dialogClose,
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
