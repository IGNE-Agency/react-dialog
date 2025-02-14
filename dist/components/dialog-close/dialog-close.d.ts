import { HTMLAttributes } from 'react';
import { UseDialogReturn } from '../../lib/use-dialog';
type DialogCloseProps<T> = Readonly<{
    dialog: UseDialogReturn<T>;
}> & HTMLAttributes<HTMLButtonElement>;
declare const DialogClose: <T>({ dialog, onClick, children, className }: DialogCloseProps<T>) => import("react/jsx-runtime").JSX.Element;
export default DialogClose;
