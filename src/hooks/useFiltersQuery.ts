import { FilterChoose } from '@shared/api/types/Filter/FilterVariants'
import { useQuery } from '@tanstack/react-query'

const useFiltersQuery = () => {
	const fetchLocalProducts = async () => {
		const res = await fetch('/temp/filterData.json')
		return res.json()
	}

	const { data } = useQuery<{ filterItems: FilterChoose[] }>({
		queryKey: ['filters'],
		queryFn: fetchLocalProducts
	})

	return data?.filterItems
}

export default useFiltersQuery
