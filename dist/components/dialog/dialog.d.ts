import { ReactNode } from 'react';
import { UseDialogReturn } from '../../lib/use-dialog';
export type DialogProps<T> = Readonly<{
    dialog: UseDialogReturn<T>;
    children?: ReactNode;
    className?: string;
    root?: Element | DocumentFragment;
}>;
declare const Dialog: <T>({ children, dialog, className, root }: DialogProps<T>) => import('react').ReactPortal | null;
export default Dialog;
