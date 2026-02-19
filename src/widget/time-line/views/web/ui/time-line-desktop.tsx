import { useEffect, useState, type FC } from 'react'

import { CarouselDesktop } from '../../../../../shared/ui/carousel/views/web/ui/carousel-desktop'
import { EventsSliderDesktop } from '../../../../../shared/ui/events-slider/views/web/ui/events-slider-desktop'
import { timelineData } from '../../../model/data'
import { getClasses } from './styles/get-classes'

export const TimeLineDesktop: FC = () => {
	const { cnRoot, cnTitle, cnCenter } = getClasses()

	const [activeIndex, setActiveIndex] = useState(0)
	const [isRotating, setIsRotating] = useState(false)
	const [showSlider, setShowSlider] = useState(true)
	const [sliderData, setSliderData] = useState(timelineData[0].events)

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>

		if (isRotating) {
			setShowSlider(false)
		} else {
			timer = setTimeout(() => {
				setSliderData(timelineData[activeIndex].events)
				setShowSlider(true)
			}, 500)
		}

		return () => clearTimeout(timer)
	}, [isRotating, activeIndex])

	return (
		<section className={cnRoot}>
			<div className={cnTitle}>
				<h2>
					Исторические <br /> даты
				</h2>
			</div>

			<div className={cnCenter}>
				<CarouselDesktop
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
					isRotating={isRotating}
					setIsRotating={setIsRotating}
					items={timelineData}
				/>
			</div>

			<div
				style={{
					opacity: showSlider ? 1 : 0,
					transition: 'opacity 0.5s ease-in-out',
				}}
			>
				<EventsSliderDesktop events={sliderData} />
			</div>
		</section>
	)
}

TimeLineDesktop.displayName = 'TimeLineDesktop'
