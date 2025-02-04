import type { ReactNode } from "react";

export type DialogFooterProps = Readonly<{
	children?: ReactNode;
	className?: string;
}>;

const DialogFooter = ({
	children,
	className
}: DialogFooterProps) => (
	<footer className={className}>{children}</footer>
);

export default DialogFooter;
