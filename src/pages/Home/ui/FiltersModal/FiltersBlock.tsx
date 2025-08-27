import { FilterChoose, FilterChooseOption } from '@/shared/api/types/Filter'

import { Option } from '../../../../hooks/useFilterState'

interface FiltersBlockProps
	extends Omit<React.ComponentPropsWithoutRef<'section'>, 'children'> {
	varint: FilterChoose
	selectedIds: FilterChooseOption['id'][]
	onToggleOption?: (e: Option) => void
}

const FiltersBlock: React.FC<FiltersBlockProps> = ({
	className = '',
	varint,
	onToggleOption,
	selectedIds,
	...rest
}) => {
	const handleSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
		onToggleOption?.({ option: e.target.value, categoryId: varint.id })
	}

	return (
		<section
			className={` ${className}`}
			{...rest}
		>
			<h3 className="font-medium text-2xl mb-6">{varint.name}</h3>
			<div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
				{varint.options.map(option => (
					<label
						className="text-nowrap place-self-start inline-flex items-center gap-3 w-auto"
						key={option.id}
					>
						<input
							checked={selectedIds?.includes(option.id) ?? false}
							type="checkbox"
							value={option.id}
							onChange={handleSelectOption}
							className="size-5 ring-secondary ring-2 rounded-xs outline-0 appearance-none cursor-pointer  checked:appearance-auto  checked:ring-0"
						/>
						<span>{option.name}</span>
					</label>
				))}
			</div>
		</section>
	)
}

export default FiltersBlock
