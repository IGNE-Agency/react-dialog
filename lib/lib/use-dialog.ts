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

export type UseDialogReturn = Readonly<{
	open: () => void;
	close: () => void;
	toggle: () => void;
	ref: RefObject<HTMLDialogElement>;
	isOpen: boolean;
}>;

export const useDialog = (
	props?: UseDialogParams
): UseDialogReturn => {
	const [isOpen, setIsOpen] = useState(
		props?.defaultOpen ?? false
	);
	const ref = useRef<HTMLDialogElement>(null);

	const open = useCallback(() => {
		flushSync(() => {
			setIsOpen(true);
		});
		ref.current?.showModal();
	}, []);

	const close = useCallback(() => {
		ref.current?.close();
		setIsOpen(false);
	}, []);

	const toggle = useCallback(() => {
		if (isOpen) {
			close();
		} else {
			open();
		}
	}, [close, open, isOpen]);

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
