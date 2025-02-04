import classNames from "classnames";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import type { UseDialogReturn } from "../../lib/use-dialog";
import style from "./dialog.module.css";

export type DialogProps = Readonly<{
	dialog: UseDialogReturn;
	children?: ReactNode;
	className?: string;
	root: Element | DocumentFragment;
}>;

const Dialog = ({
	children,
	dialog,
	className,
	root
}: DialogProps) =>
	!dialog.isOpen
		? null
		: createPortal(
				<dialog
					ref={dialog.ref}
					className={classNames([
						style.dialog,
						className
					])}>
					{children}
				</dialog>,
				root
		  );

export default Dialog;
