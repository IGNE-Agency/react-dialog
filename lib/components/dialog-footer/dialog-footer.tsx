import classNames from "classnames";
import type { ReactNode } from "react";
import style from "./dialog-footer.module.css";

export type DialogFooterProps = Readonly<{
	children?: ReactNode;
	className?: string;
}>;

const DialogFooter = ({
	children,
	className
}: DialogFooterProps) => (
	<footer
		className={classNames([style.footer, className])}>
		{children}
	</footer>
);

export default DialogFooter;
