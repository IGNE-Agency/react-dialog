import { RefObject } from 'react';
export type UseDialogParams = Readonly<{
    defaultOpen?: boolean;
}>;
export type UseDialogReturn = Readonly<{
    open: () => void;
    close: () => void;
    toggle: () => void;
    ref: RefObject<HTMLDialogElement>;
    isOpen: boolean;
}>;
export declare const useDialog: (props?: UseDialogParams) => UseDialogReturn;
