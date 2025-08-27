import { useCallback, useState } from 'react'

import { SearchRequestOptions } from '@shared/api/types/SearchRequest/SearchRequestFilter'
import { produce } from 'immer'

export type Option = {
	categoryId: SearchRequestOptions['id']
	option: SearchRequestOptions['optionsIds'][0]
}

export type SelectedOptions = Record<
	SearchRequestOptions['id'],
	SearchRequestOptions['optionsIds']
>

const useFilterState = (initial: SelectedOptions = {}) => {
	const [selected, setSelected] = useState<SelectedOptions>(initial)

	const toggle = useCallback((el: Option) => {
		setSelected(prev =>
			produce(prev, draft => {
				if (!draft[el.categoryId]) {
					draft[el.categoryId] = [el.option]
					return
				}

				if (!draft[el.categoryId].includes(el.option)) {
					draft[el.categoryId].push(el.option)
					return
				}

				draft[el.categoryId] = draft[el.categoryId].filter(
					id => id !== el.option
				)

				if (draft[el.categoryId].length === 0) {
					delete draft[el.categoryId]
				}
			})
		)
	}, [])

	const clear = useCallback(() => setSelected({}), [])

	const setFilters = useCallback(
		(options: SelectedOptions) => setSelected(options),
		[]
	)

	return { selected, toggle, setFilters, clear }
}

export default useFilterState
