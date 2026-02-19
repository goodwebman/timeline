import classNames from 'classnames/bind'
import classes from './events-slider-desktop.module.scss'

const cn = classNames.bind(classes)

export const getClasses = () => ({
	cnRoot: cn('root'),
	cnCard: cn('card'),
	cnYear: cn('year'),
	cnNavNext: cn('nav--next'),
	cnNavPrev: cn('nav--prev'),
})
