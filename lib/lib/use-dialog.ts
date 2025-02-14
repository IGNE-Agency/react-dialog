import {
	type RefObject,
	useCallback,
	useEffect,
	useRef,
	useState
} from "react";
import { flushSync } from "react-dom";

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

export const useDialog = <T>(
	props?: UseDialogParams
): UseDialogReturn<T> => {
	const [isOpen, setIsOpen] = useState(
		props?.defaultOpen ?? false
	);
	const ref = useRef<HTMLDialogElement>(null);
	const resolver = useRef(
		Promise.withResolvers<T | undefined>()
	);

	const open = useCallback(() => {
		flushSync(() => {
			setIsOpen(true);
		});

		ref.current?.showModal();

		return resolver.current.promise;
	}, []);

	const close = useCallback((value?: T) => {
		ref.current?.close();
		setIsOpen(false);

		resolver.current.resolve(value);

		// Ensure promise in only reset on new event loop tick
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
		[close, open, isOpen]
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Should not react to any changes in `props.defaultOpen`.
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
		isOpen
	};
};

export const useAttachListeners = <T>(
	dialog: UseDialogReturn<T>
) => {
	useEffect(() => {
		const listener = () => {
			dialog.close();
		};

		dialog.ref.current?.addEventListener(
			"cancel",
			listener
		);

		return () => {
			dialog.ref.current?.removeEventListener(
				"cancel",
				listener
			);
		};
	}, [dialog]);
};
