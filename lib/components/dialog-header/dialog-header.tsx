import classNames from "classnames";
import type { ReactNode } from "react";
import style from "./dialog-header.module.css";

export type DialogHeaderProps = Readonly<{
	children?: ReactNode;
	className?: string;
}>;

const DialogHeader = ({
	children,
	className
}: DialogHeaderProps) => (
	<header
		className={classNames([style.header, className])}>
		{children}
	</header>
);

export default DialogHeader;
