import { FilterBase, FilterChooseOption, FilterType } from '.'

export interface FilterChoose extends FilterBase {
	id: string
	name: string
	type: FilterType.OPTION
	allowAll?: boolean
	options: FilterChooseOption[]
}
