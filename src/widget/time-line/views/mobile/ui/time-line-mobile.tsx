import { useState, type FC } from 'react'

import { CarouselMobile } from '../../../../../shared/ui/carousel/views/mobile/ui/carousel-mobile'
import { EventsSliderMobile } from '../../../../../shared/ui/events-slider/views/mobile/ui/events-slider-mobile'
import { timelineData } from '../../../model/data'
import { getClasses } from './styles/get-classes'

export const TimeLineMobile: FC = () => {
	const { cnRoot, cnTitle, cnCenter } = getClasses()
	const [activeIndex, setActiveIndex] = useState(0)
	const [showSlider, setShowSlider] = useState(true)
	const [sliderData, setSliderData] = useState(timelineData[0].events)

	const handleChangeIndex = (newIndex: number) => {
		if (newIndex < 0 || newIndex >= timelineData.length) return

		setShowSlider(false)

		setTimeout(() => {
			const period = timelineData[newIndex]
			if (!period) return

			setActiveIndex(newIndex)
			setSliderData(period.events || [])
			setShowSlider(true)
		}, 700)
	}

	return (
		<section className={cnRoot}>
			<div className={cnTitle}>
				<h2>
					Исторические <br /> даты
				</h2>
			</div>

			<div className={cnCenter}>
				<CarouselMobile
					activeIndex={activeIndex}
					setActiveIndex={handleChangeIndex}
					items={timelineData}
					show={showSlider}
				/>
			</div>

			<div>
				<EventsSliderMobile
					events={sliderData}
					activeIndex={activeIndex}
					setActiveIndex={handleChangeIndex}
					periodsCount={timelineData.length}
					show={showSlider}
				/>
			</div>
		</section>
	)
}

TimeLineMobile.displayName = 'TimeLineMobile'
