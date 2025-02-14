import classNames from "classnames";
import type { HTMLAttributes } from "react";
import style from "./dialog-footer.module.css";

export type DialogFooterProps =
	HTMLAttributes<HTMLElement>;

const DialogFooter = ({
	children,
	className,
	...props
}: DialogFooterProps) => (
	<footer
		className={classNames([style.footer, className])}
		{...props}>
		{children}
	</footer>
);

export default DialogFooter;
