import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Fragment } from 'react/jsx-runtime'

import useFiltersQuery from '@hooks/useFiltersQuery'
import { SearchRequestOptions } from '@shared/api/types/SearchRequest/SearchRequestFilter'

import useFiltersStore from '@stores/useFiltersStore'

import useFilterState, {
	SelectedOptions
} from '../../../../hooks/useFilterState'
import CloseButton from '../CloseButton'
import ConfirmationModal from '../ConfirmationModal'
import Modal from '../Modal'
import FiltersBlock from './FiltersBlock'

const oldFiltersToOptions = (
	oldFilters: SearchRequestOptions[]
): SelectedOptions => {
	return oldFilters.reduce((acc, filter) => {
		acc[filter.id] = filter.optionsIds
		return acc
	}, {} as SelectedOptions)
}

interface FiltersModalProps
	extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
	isOpen: boolean
	onClose?: () => void
}

const FiltersModal: React.FC<FiltersModalProps> = ({
	className = '',
	isOpen,
	onClose,
	...rest
}) => {
	const { t } = useTranslation('filter')
	const filters = useFiltersQuery()
	const [isApplying, setIsApplying] = useState(false)
	const { selected, toggle, clear, setFilters } = useFilterState()
	const { filters: oldFilters, setFilters: setGlobalFilters } =
		useFiltersStore()

	const handleClose = () => {
		onClose && onClose()
	}

	const openConfirmation = () => {
		setIsApplying(true)
	}

	const closeConfirmation = () => {
		setIsApplying(false)
	}

	const onApply = () => {
		setIsApplying(false)
		setGlobalFilters(selected)
		onClose && onClose()
	}

	const onReject = () => {
		setIsApplying(false)
		setFilters(oldFiltersToOptions(oldFilters))
		onClose && onClose()
	}

	return (
		<Modal
			isOpen={isOpen}
			onClickOutside={handleClose}
		>
			<div
				className={`rounded-2xl py-10 px-8 relative bg-primary ${className}`}
				{...rest}
			>
				<div className="relative mb-6">
					<CloseButton
						onClick={handleClose}
						className="size-5 absolute top-1/2 transform -translate-y-1/2 right-0"
					/>

					<h2 className="text-[40px] font-medium text-center">{t('filter')}</h2>
				</div>
				<div className="flex flex-col gap-8">
					{filters?.map(varint => (
						<Fragment key={varint.id}>
							<hr className="border-1 border-light-gray" />
							<FiltersBlock
								selectedIds={selected[varint.id]}
								onToggleOption={toggle}
								varint={varint}
							/>
						</Fragment>
					))}
					<hr className="border-1 border-light-gray" />
				</div>

				<div className="relative mt-8">
					<button
						onClick={openConfirmation}
						className="mb-2 h-16 w-46 bg-brand rounded-2xl text-primary mx-auto block font-semibold"
					>
						{t('apply')}
					</button>

					<button
						onClick={clear}
						className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-transparent font-semibold underline underline-offset-3 text-blue cursor-pointer"
					>
						{t('reset')}
					</button>
				</div>
			</div>

			<ConfirmationModal
				isOpen={isApplying}
				onModalClose={closeConfirmation}
				onApply={onApply}
				onReject={onReject}
				header={t('filtersConfirm')}
				applyText={t('filtersApply')}
				rejectText={t('filtersReject')}
			/>
		</Modal>
	)
}

FiltersModal.displayName = 'FiltersModal'
export default FiltersModal
