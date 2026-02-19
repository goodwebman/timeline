import { useState } from 'react'
import CountUp from 'react-countup'

import type { TimelinePeriod } from '../../../../../../widget/time-line/model/types'
import { getClasses } from './styles/get-classes'

type CarouselMobileProps = {
	items: TimelinePeriod[]
	activeIndex: number
	setActiveIndex: (i: number) => void
	show: boolean
}

export const CarouselMobile = ({
	items,
	activeIndex,
	show,
}: CarouselMobileProps) => {
	const {
		cnRoot,
		cnLabel,
		cnCenter,
		cnCenterStartYear,
		cnCenterEndYear,
		cnBr,
	} = getClasses({ active: false })
	const activeItem = items[activeIndex]

	const [startYear, setStartYear] = useState(activeItem.start)
	const [endYear, setEndYear] = useState(activeItem.end)

	return (
		<div className={cnRoot}>
			<div className={cnCenter}>
				<CountUp
					className={cnCenterStartYear}
					start={startYear}
					end={activeItem.start}
					duration={0.5}
					useEasing
					separator=''
					onEnd={() => setStartYear(activeItem.start)}
				/>
				<CountUp
					className={cnCenterEndYear}
					start={endYear}
					end={activeItem.end}
					duration={0.5}
					useEasing
					separator=''
					onEnd={() => setEndYear(activeItem.end)}
				/>
			</div>
			<div
				style={{
					opacity: show ? 1 : 0,
					transition: 'opacity 0.5s ease-in-out',
				}}
			>
				<p className={cnLabel}>{activeItem.title}</p>
				<div className={cnBr} />
			</div>
		</div>
	)
}

CarouselMobile.displayName = 'CarouselMobile'
