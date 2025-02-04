import type { ReactNode } from "react";

export type DialogHeaderProps = Readonly<{
	children?: ReactNode;
}>;

const DialogHeader = ({
	children
}: DialogHeaderProps) => <header>{children}</header>;

export default DialogHeader;
