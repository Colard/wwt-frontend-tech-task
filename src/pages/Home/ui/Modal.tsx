import { useEffect, useRef } from 'react'

interface ModalProps extends React.ComponentPropsWithoutRef<'dialog'> {
	isOpen: boolean
	onClickOutside: () => void
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClickOutside,
	children,
	className,
	...rest
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		if (!dialogRef.current) {
			return
		}

		if (isOpen && !dialogRef.current.open) {
			dialogRef.current.showModal()
		}

		if (!isOpen && dialogRef.current.open) {
			dialogRef.current.close()
		}
	}, [isOpen])

	const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) {
			onClickOutside()
		}
	}

	return (
		<dialog
			ref={dialogRef}
			onClick={handleClickOutside}
			className={`backdrop:backdrop-blur-xl p-20 box-border bg-transparent max-w-screen max-h-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen outline-none [&:not([open])]:hidden ${className}`}
			{...rest}
		>
			{children}
		</dialog>
	)
}

Modal.displayName = 'Modal'
export default Modal
