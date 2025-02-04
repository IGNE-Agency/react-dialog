import type { ReactNode } from "react";

export type DialogContentProps = Readonly<{
	children?: ReactNode;
	className?: string;
}>;

const DialogContent = ({
	children,
	className
}: DialogContentProps) => (
	<div className={className}>{children}</div>
);

export default DialogContent;
