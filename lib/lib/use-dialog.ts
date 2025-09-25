import {
	type RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { flushSync } from "react-dom";

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
	ref: RefObject<HTMLDialogElement | null>;
	isOpen: boolean;
	isClosed: boolean;
	state: DialogState;
}>;

export const useDialog = <T>(
	props?: UseDialogParams<T>,
): UseDialogReturn<T> => {
	const [state, setState] = useState<DialogState>(
		props?.defaultOpen ? "open" : "closed",
	);
	const isOpen = state === "open";
	const isClosed = !isOpen;
	const ref = useRef<HTMLDialogElement>(null);
	const resolver = useRef(Promise.withResolvers<T | undefined>());

	// biome-ignore lint/correctness/useExhaustiveDependencies: temp workaround
	const open = useCallback(async () => {
		// Flush React state update before running
		// `showModal` to prevent weird issues.
		// This shouldn't break anything but
		// it does. Don't change this unless
		// you know what you're doing :)
		flushSync(() => {
			setState("open");
		});
		ref.current?.showModal();

		await props?.onOpen?.();

		return resolver.current.promise;
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: temp workaround
	const close = useCallback(async (value?: T) => {
		setState("closed");
		ref.current?.close();
		await props?.onClose?.(value);
		resolver.current.resolve(value);

		// Ensure promise is only reset on new event loop tick
		setTimeout(() => {
			resolver.current = Promise.withResolvers();
		});
	}, []);

	const toggle = useCallback(
		(value?: T) => {
			if (isOpen) {
				return close(value);
			}
			return open();
		},
		[close, open, isOpen],
	);

	// TODO: Look into this, not sure if we need it.
	// biome-ignore lint/correctness/useExhaustiveDependencies: really only update on open
	useEffect(() => {
		if (props?.defaultOpen) {
			open();
		}
	}, [open]);

	return {
		open,
		close,
		toggle,
		ref,
		isOpen,
		isClosed,
		state,
	};
};

export const useAttachListeners = <T>(dialog: UseDialogReturn<T>) => {
	useEffect(() => {
		const listener = () => {
			dialog.close();
		};

		dialog.ref.current?.addEventListener("cancel", listener);

		return () => {
			dialog.ref.current?.removeEventListener("cancel", listener);
		};
	}, [dialog]);
};
