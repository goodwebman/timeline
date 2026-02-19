import { type FC, useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { TimelineEvent } from '../../../../../../widget/time-line/model/types'
import { ChevronLeft } from '../../../../../icons/chevron-left'
import { ChevronRight } from '../../../../../icons/chevron-right'
import { getClasses } from './styles/get-classes'

type EventsSliderMobileProps = {
	events: TimelineEvent[]
	activeIndex: number
	setActiveIndex: (i: number) => void
	periodsCount: number
	show: boolean
}

export const EventsSliderMobile: FC<EventsSliderMobileProps> = ({
	events,
	activeIndex,
	setActiveIndex,
	periodsCount,
	show,
}) => {
	const {
		cnRoot,
		cnCard,
		cnYear,
		cnFooter,
		cnCounter,
		cnNavBtn,
		cnPaginationContainer,
		cnRightSide,
		cnNavButtons,
		cnLeftSide,
	} = getClasses()

	const swiperRef = useRef<SwiperType | null>(null)

	const handlePrev = () => {
		if (activeIndex === 0) return
		setActiveIndex(activeIndex - 1)
		swiperRef.current?.slideTo(activeIndex - 1)
	}

	const handleNext = () => {
		if (activeIndex === periodsCount - 1) return
		setActiveIndex(activeIndex + 1)
		swiperRef.current?.slideTo(activeIndex + 1)
	}

	return (
		<div className={cnRoot}>
			<div
				style={{
					opacity: show ? 1 : 0,
					transition: 'opacity 0.7s ease-in-out',
				}}
			>
				<Swiper
					key={activeIndex}
					initialSlide={0}
					slidesPerView={2}
					spaceBetween={25}
					onSwiper={swiper => (swiperRef.current = swiper)}
					pagination={{ clickable: true }}
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
			</div>

			<footer className={cnFooter}>
				<div className={cnLeftSide}>
					<div className={cnCounter}>
						{String(activeIndex + 1).padStart(2, '0')}/
						{String(periodsCount).padStart(2, '0')}
					</div>

					<div className={cnNavButtons}>
						<button
							onClick={handlePrev}
							className={cnNavBtn}
							disabled={activeIndex === 0}
						>
							<ChevronLeft width={10} height={10} />
						</button>

						<button
							onClick={handleNext}
							className={cnNavBtn}
							disabled={activeIndex === periodsCount - 1}
						>
							<ChevronRight width={10} height={10} />
						</button>
					</div>
				</div>

				<div className={cnRightSide}>
					<div className={cnPaginationContainer}>
						{Array.from({ length: periodsCount }).map((_, index) => {
							const { cnItem } = getClasses(index === activeIndex)
							return (
								<button
									key={index}
									onClick={() => {
										setActiveIndex(index)
										swiperRef.current?.slideTo(index)
									}}
									className={cnItem}
								/>
							)
						})}
					</div>
				</div>
			</footer>
		</div>
	)
}

EventsSliderMobile.displayName = 'EventsSliderMobile'
