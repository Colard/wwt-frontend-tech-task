interface CloseButtonProps
	extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
	onClick?: () => void
}

const CloseButton: React.FC<CloseButtonProps> = ({
	className = '',
	onClick,
	...rest
}) => {
	return (
		<div
			aria-label="close"
			tabIndex={0}
			className={`cursor-pointer ${className}`}
			onClick={onClick}
		>
			<div
				className={`relative size-full`}
				{...rest}
			>
				<span className="absolute h-0.5 w-full bg-secondary transform rotate-45 top-1/2 rounded-full"></span>
				<span className="absolute h-0.5 w-full bg-secondary transform -rotate-45 top-1/2 rounded-full"></span>
			</div>
		</div>
	)
}

CloseButton.displayName = 'CloseButton'
export default CloseButton
