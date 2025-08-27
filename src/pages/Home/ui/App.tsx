import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import useFiltersStore from '@stores/useFiltersStore'

import FiltersModal from './FiltersModal'

export const App = () => {
	const { t } = useTranslation('filter')

	const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
	const openModal = () => setIsFiltersModalOpen(true)
	const closeModal = () => setIsFiltersModalOpen(false)
	const { filters } = useFiltersStore()
	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-6xl  mb-12">WinWinTravel frontend test task</h1>

			<button
				onClick={openModal}
				className="rounded-full border-1 text-2xl border-black px-8 py-3 bg-transparent hover:bg-black hover:text-white transition-colors cursor-pointer"
			>
				{t('openFilters')}
			</button>
			<FiltersModal
				isOpen={isFiltersModalOpen}
				onClose={closeModal}
			/>

			<p className="mt-5 text-2xl font-black">{t('globlState')}</p>
			<textarea
				className="min-w-[80%] h-full resize-none border-light-gray border-1 mt-5 m-1 py-1 px-5"
				disabled
				value={JSON.stringify(filters, null, 2)}
			></textarea>
		</section>
	)
}
