import {
	type RefObject,
	useCallback,
	useEffect,
	useRef,
	useState
} from "react";
import { flushSync } from "react-dom";

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

export const useDialog = <T>(
	props?: UseDialogParams
): UseDialogReturn<T> => {
	const [isOpen, setIsOpen] = useState(
		props?.defaultOpen ?? false
	);
	const ref = useRef<HTMLDialogElement>(null);
	const resolver = useRef(Promise.withResolvers());

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
		resolver.current = Promise.withResolvers();
	}, []);

	const toggle = useCallback(
		(value?: T) => {
			if (isOpen) {
				close(value);
			} else {
				open();
			}
		},
		[close, open, isOpen]
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Should not react to any changes in `defaultOpen`.
	useEffect(() => {
		if (props?.defaultOpen) {
			open();
		}
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Should update on `isOpen`, or React won't update.
	useEffect(() => {
		const listener = () => {
			setIsOpen(false);
		};

		ref.current?.addEventListener("close", listener);

		return () => {
			ref.current?.removeEventListener(
				"close",
				listener
			);
		};
	}, [isOpen]);

	return { open, close, toggle, ref, isOpen };
};
