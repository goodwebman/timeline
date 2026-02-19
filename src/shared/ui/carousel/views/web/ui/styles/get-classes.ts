import classNames from 'classnames/bind'
import classes from './carousel-desktop.module.scss'

const cn = classNames.bind(classes)

export const getClasses = ({ active }: { active?: boolean }) => ({
	cnRoot: cn('root'),
	cnCarousel: cn('carousel'),
	cnItem: cn('itemCarousel', { active }),
	cnActive: cn('active'),
	cnLabel: cn('rightLabel'),
	cnCenter: cn('centerLabel'),
	cnCenterStartYear: cn('centerLabel--startYear'),
	cnCenterEndYear: cn('centerLabel--endYear'),
	cnNav: cn('nav'),
	cnNavCounter: cn('navCounter'),
	cnNavButtons: cn('navButtons'),
	cnNavBtn: cn('navBtn'),
})
