import classNames from "classnames";
import type { HTMLAttributes } from "react";
import style from "./dialog-header.module.css";

export type DialogHeaderProps =
	HTMLAttributes<HTMLElement>;

const DialogHeader = ({
	children,
	className,
	...props
}: DialogHeaderProps) => (
	<header
		className={classNames([style.header, className])}
		{...props}>
		{children}
	</header>
);

export default DialogHeader;
