import { RefObject } from 'react';
type PromiseOr<T> = T | Promise<T>;
export type UseDialogParams<T> = Readonly<{
    defaultOpen?: boolean;
    allowEscape?: boolean;
    onOpen?: () => PromiseOr<void>;
    onClose?: (value?: T) => PromiseOr<void>;
}>;
export type DialogState = "open" | "closed";
export type UseDialogReturn<T> = Readonly<{
    open: () => PromiseOr<T | void>;
    close: (value?: T) => void;
    toggle: (value?: T) => PromiseOr<T | void>;
    ref: RefObject<HTMLDialogElement>;
    isOpen: boolean;
    isClosed: boolean;
    state: DialogState;
}>;
export declare const useDialog: <T>(props?: UseDialogParams<T>) => UseDialogReturn<T>;
export declare const useAttachListeners: <T>(dialog: UseDialogReturn<T>) => void;
export {};
