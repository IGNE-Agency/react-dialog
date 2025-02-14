import classNames from "classnames";
import type { HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import {
	type UseDialogReturn,
	useAttachListeners
} from "../../lib/use-dialog";
import style from "./dialog.module.css";

export type DialogProps<T> = Readonly<{
	dialog: UseDialogReturn<T>;
	root?: Element | DocumentFragment | string;
	ignoreBackdropClick?: boolean;
}> &
	HTMLAttributes<HTMLDialogElement>;

const Dialog = <T,>({
	children,
	dialog,
	className,
	root,
	ignoreBackdropClick,
	onClick,
	...props
}: DialogProps<T>) => {
	useAttachListeners(dialog);

	return !dialog.isOpen
		? null
		: createPortal(
				<dialog
					ref={dialog.ref}
					className={classNames([
						style.dialog,
						className
					])}
					onClick={e => {
						if (
							!ignoreBackdropClick &&
							e.target === dialog.ref.current
						) {
							dialog.close();
						}
						onClick?.(e);
					}}
					{...props}>
					{children}
				</dialog>,
				(typeof root === "string"
					? document.querySelector(root)
					: root) ?? document.body
		  );
};

export default Dialog;
