import CloseButton from './CloseButton'
import Modal from './Modal'

interface ConfirmationModalProps extends React.ComponentPropsWithoutRef<'div'> {
	isOpen: boolean
	header: string
	applyText: string
	rejectText: string
	onModalClose: () => void
	onApply?: () => void
	onReject?: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	className = '',
	isOpen,
	header,
	applyText,
	rejectText,
	onModalClose,
	onApply,
	onReject,
	...rest
}) => {
	const onApplyButtonClick = () => {
		onApply && onApply()
		onModalClose && onModalClose()
	}

	const onRejectButtonClick = () => {
		onReject && onReject()
		onModalClose && onModalClose()
	}

	return (
		<Modal
			isOpen={isOpen}
			onClickOutside={onModalClose}
		>
			<div
				className={`rounded-2xl p-8 relative bg-primary ${className}`}
				{...rest}
			>
				<div className="relative mb-6">
					<CloseButton
						onClick={onModalClose}
						className="size-5 absolute top-1/2 transform -translate-y-1/2 right-0"
					/>

					<h2 className="text-[40px] font-medium text-center">{header}</h2>
				</div>

				<div className="mt-30 flex gap-8 w-full justify-center  font-semibold">
					<button
						onClick={onRejectButtonClick}
						className="h-16 w-70 border-2 bg-transparent border-light-gray rounded-2xl"
					>
						{rejectText}
					</button>
					<button
						onClick={onApplyButtonClick}
						className="h-16 w-70 bg-brand rounded-2xl text-primary block"
					>
						{applyText}
					</button>
				</div>
			</div>
		</Modal>
	)
}

ConfirmationModal.displayName = 'ConfirmationModal'
export default ConfirmationModal
