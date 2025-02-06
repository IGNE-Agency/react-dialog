import { ReactNode } from 'react';
import { UseDialogReturn } from '../../lib/use-dialog';
export type DialogProps = Readonly<{
    dialog: UseDialogReturn;
    children?: ReactNode;
    className?: string;
    root?: Element | DocumentFragment;
}>;
declare const Dialog: ({ children, dialog, className, root }: DialogProps) => import('react').ReactPortal | null;
export default Dialog;
