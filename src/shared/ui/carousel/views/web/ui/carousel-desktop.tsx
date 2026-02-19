import { useRef, useState, type Dispatch, type SetStateAction } from 'react'
import CountUp from 'react-countup'


import { getClasses } from './styles/get-classes'
import type { TimelinePeriod } from '../../../../../../widget/time-line/model/types'
import { getTargetAngleValue } from '../../../model/get-target-angle-value'
import { ChevronLeft } from '../../../../../icons/chevron-left'
import { ChevronRight } from '../../../../../icons/chevron-right'

type CarouselDesktopProps = {
	items: TimelinePeriod[]
	activeIndex: number
	setActiveIndex: Dispatch<SetStateAction<number>>
	isRotating: boolean
	setIsRotating: Dispatch<SetStateAction<boolean>>
}

export const CarouselDesktop = ({
	items,
	activeIndex,
	setActiveIndex,
	setIsRotating,
	isRotating,
}: CarouselDesktopProps) => {
	const {
		cnRoot,
		cnCarousel,
		cnLabel,
		cnCenter,
		cnCenterStartYear,
		cnCenterEndYear,
		cnNav,
		cnNavBtn,
		cnNavButtons,
		cnNavCounter,
	} = getClasses({ active: false })

	const [startYear, setStartYear] = useState(items[0].start)
	const [endYear, setEndYear] = useState(items[0].end)

	const carouselRef = useRef<HTMLDivElement>(null)

	const count = items.length
	const step = 360 / count
	const radius = 265
	const targetAngle = getTargetAngleValue(count)
	const rotation = targetAngle - activeIndex * step

	const handleClick = (i: number) => {
		if (i === activeIndex) return

		setStartYear(items[activeIndex].start)
		setEndYear(items[activeIndex].end)

		setActiveIndex(i)
		setIsRotating(true)
	}

	const handlePrev = () => {
		if (activeIndex === 0) return
		handleClick(activeIndex - 1)
	}

	const handleNext = () => {
		if (activeIndex === count - 1) return
		handleClick(activeIndex + 1)
	}

	const activeItem = items[activeIndex]

	return (
		<div className={cnRoot}>
			<div
				className={cnCarousel}
				style={{ transform: `rotate(${rotation}deg)` }}
				ref={carouselRef}
				onTransitionEnd={e => {
					if (e.propertyName === 'transform') setIsRotating(false)
				}}
			>
				{items.map((item, i) => {
					const isActive = i === activeIndex
					const { cnItem } = getClasses({ active: isActive })
					const angle = i * step

					return (
						<div
							key={item.id}
							className={cnItem}
							onClick={() => handleClick(i)}
							style={{
								transform: `
                  rotate(${angle}deg)
                  translate(${radius}px)
                  rotate(${-angle - rotation}deg)
                `,
							}}
						>
							<span>{i + 1}</span>
							{isActive && !isRotating && (
								<div className={cnLabel}>{item.title}</div>
							)}
						</div>
					)
				})}
			</div>


			<div className={cnCenter}>
				<CountUp
					className={`${cnCenterStartYear} year`}
					start={startYear}
					end={activeItem.start}
					duration={0.5}
					useEasing
					separator=''
					onEnd={() => setStartYear(activeItem.start)}
				/>

				<CountUp
					className={`${cnCenterEndYear} year`}
					start={endYear}
					end={activeItem.end}
					duration={0.5}
					useEasing
					separator=''
					onEnd={() => setEndYear(activeItem.end)}
				/>
			</div>

			<nav className={cnNav}>
				<div className={cnNavCounter}>
					{String(activeIndex + 1).padStart(2, '0')}/
					{String(count).padStart(2, '0')}
				</div>

				<div className={cnNavButtons}>
					<button
						onClick={handlePrev}
						className={cnNavBtn}
						disabled={activeIndex === 0}
					>
						<ChevronLeft />
					</button>

					<button
						onClick={handleNext}
						className={cnNavBtn}
						disabled={activeIndex === count - 1}
					>
						<ChevronRight />
					</button>
				</div>
			</nav>
		</div>
	)
}
