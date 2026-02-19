import { type FC, useRef, useState } from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'
import { ChevronLeft } from '../../../../../icons/chevron-left'
import { ChevronRight } from '../../../../../icons/chevron-right'
import { getClasses } from './styles/get-classes'
export type TimelineEvent = {
	id: string
	year: string
	text: string
}

type Props = {
	events: TimelineEvent[]
}

export const EventsSliderDesktop: FC<Props> = ({ events }) => {
	const { cnRoot, cnCard, cnYear, cnNavNext, cnNavPrev } = getClasses()

	const swiperRef = useRef<SwiperClass | null>(null)

	const [canSlidePrev, setCanSlidePrev] = useState(false)
	const [canSlideNext, setCanSlideNext] = useState(true)

	const handleSlideChange = (swiper: SwiperClass) => {
		setCanSlidePrev(!swiper.isBeginning)
		setCanSlideNext(!swiper.isEnd)
	}

	return (
		<div className={cnRoot}>
			{canSlidePrev && (
				<button
					onClick={() => swiperRef.current?.slidePrev()}
					className={cnNavPrev}
				>
					<ChevronLeft width={10} height={10} color='#3877EE' />
				</button>
			)}

			<Swiper
				modules={[Navigation]}
				slidesPerView={3}
				spaceBetween={80}
				onSwiper={swiper => {
					swiperRef.current = swiper
					setCanSlidePrev(!swiper.isBeginning)
					setCanSlideNext(!swiper.isEnd)
				}}
				onSlideChange={swiper => handleSlideChange(swiper)}
			>
				{events.map(event => (
					<SwiperSlide key={event.id}>
						<div className={cnCard}>
							<div className={cnYear}>{event.year}</div>
							<p>{event.text}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{canSlideNext && (
				<button
					onClick={() => swiperRef.current?.slideNext()}
					className={cnNavNext}
				>
					<ChevronRight width={10} height={10} color='#3877EE' />
				</button>
			)}
		</div>
	)
}

EventsSliderDesktop.displayName = 'EventsSliderDesktop'
