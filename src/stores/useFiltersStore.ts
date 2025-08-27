import useFilterState from '@hooks/useFilterState'
import { FilterType } from '@shared/api/types/Filter'
import { SearchRequestOptions } from '@shared/api/types/SearchRequest/SearchRequestFilter'
import { create } from 'zustand'

type Options = ReturnType<typeof useFilterState>['selected']

interface FiltersState {
	filters: SearchRequestOptions[]
	setFilters: (filters: Options) => void
	reset: () => void
}

export const transformOptionsToGlobalFilters = (
	options: Options
): SearchRequestOptions[] => {
	if (!options) {
		return []
	}

	const result: SearchRequestOptions[] = []
	for (const option in options) {
		result.push({
			type: FilterType.OPTION,
			optionsIds: [...options[option]],
			id: option
		})
	}
	return result
}

const useFiltersStore = create<FiltersState>(set => ({
	filters: [],
	setFilters: (filters: Options) =>
		set({ filters: transformOptionsToGlobalFilters(filters) }),
	reset: () => set({ filters: [] })
}))

export default useFiltersStore
