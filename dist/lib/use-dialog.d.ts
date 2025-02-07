import { RefObject } from 'react';
export type UseDialogParams = Readonly<{
    defaultOpen?: boolean;
}>;
export type UseDialogReturn<T> = Readonly<{
    open: () => void;
    close: () => void | Promise<T>;
    toggle: () => void;
    ref: RefObject<HTMLDialogElement>;
    isOpen: boolean;
}>;
export declare const useDialog: <T>(props?: UseDialogParams) => UseDialogReturn<T>;
