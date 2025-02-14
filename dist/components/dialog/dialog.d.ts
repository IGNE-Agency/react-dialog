import { HTMLAttributes } from 'react';
import { UseDialogReturn } from '../../lib/use-dialog';
export type DialogProps<T> = Readonly<{
    dialog: UseDialogReturn<T>;
    root?: Element | DocumentFragment | string;
    ignoreBackdropClick?: boolean;
}> & HTMLAttributes<HTMLDialogElement>;
declare const Dialog: <T>({ children, dialog, className, root, ignoreBackdropClick, onClick, ...props }: DialogProps<T>) => import('react').ReactPortal | null;
export default Dialog;
