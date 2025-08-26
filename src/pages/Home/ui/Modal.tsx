import { forwardRef, useImperativeHandle, useRef } from 'react'

interface ModalProps extends React.ComponentPropsWithoutRef<'dialog'> {}

export interface ModalHandle {
	open: () => void
	close: () => void
}

const Modal = forwardRef<ModalHandle, ModalProps>(
	({ className = '', children, ...rest }, ref) => {
		const dialogRef = useRef<HTMLDialogElement>(null)

		useImperativeHandle(ref, () => ({
			open: () => dialogRef.current?.showModal(),
			close: () => dialogRef.current?.close()
		}))

		const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
			if (e.target === dialogRef.current) {
				dialogRef.current?.close()
			}
		}

		return (
			<dialog
				onClick={handleClickOutside}
				ref={dialogRef}
				className={`backdrop:backdrop-blur-xl p-20 box-border bg-transparent max-w-screen max-h-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen outline-none [&:not([open])]:hidden ${className}`}
				{...rest}
			>
				{children}
			</dialog>
		)
	}
)

Modal.displayName = 'Modal'
export default Modal
