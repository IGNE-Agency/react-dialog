import classNames from "classnames";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import type { UseDialogReturn } from "../../lib/use-dialog";
import style from "./dialog.module.css";

export type DialogProps<T> = Readonly<{
	dialog: UseDialogReturn<T>;
	children?: ReactNode;
	className?: string;
	root?: Element | DocumentFragment;
}>;

const Dialog = <T,>({
	children,
	dialog,
	className,
	root
}: DialogProps<T>) =>
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
				// biome-ignore lint/style/noNonNullAssertion: #root should always be defined
				root ?? document.querySelector("#root")!
		  );

export default Dialog;
