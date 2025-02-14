import { RefObject } from 'react';
type PromiseOr<T> = T | Promise<T>;
export type UseDialogParams = Readonly<{
    defaultOpen?: boolean;
    allowEscape?: boolean;
}>;
export type UseDialogReturn<T> = Readonly<{
    open: () => PromiseOr<T | void>;
    close: (value?: T) => void;
    toggle: (value?: T) => PromiseOr<T | void>;
    ref: RefObject<HTMLDialogElement>;
    isOpen: boolean;
}>;
export declare const useDialog: <T>(props?: UseDialogParams) => UseDialogReturn<T>;
export declare const useAttachListeners: <T>(dialog: UseDialogReturn<T>) => void;
export {};
