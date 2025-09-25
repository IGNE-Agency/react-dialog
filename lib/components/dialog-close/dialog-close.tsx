import classNames from "classnames";
import type { HTMLAttributes } from "react";
import type { UseDialogReturn } from "../../lib/use-dialog";
import style from "./dialog-close.module.css";

export type DialogCloseProps<T> = Readonly<{
	dialog: UseDialogReturn<T>;
}> &
	HTMLAttributes<HTMLButtonElement>;

const DialogClose = <T,>({
	dialog,
	onClick,
	children,
	className
}: DialogCloseProps<T>) => (
	<button
		type="button"
		className={classNames([
			style.dialogClose,
			className
		])}
		onClick={e => {
			dialog.close();
			onClick?.(e);
		}}>
		{children}
	</button>
);

export default DialogClose;
