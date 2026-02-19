import classNames from 'classnames/bind'
import classes from './events-slider-mobile.module.scss'

const cn = classNames.bind(classes)

export const getClasses = (active = false) => ({
	cnRoot: cn('root'),
	cnCard: cn('card'),
	cnYear: cn('year'),
	cnFooter: cn('footer'),
	cnNavBtn: cn('nav-btn'),
	cnCounter: cn('counter'),
	cnNavBtnsContainer: cn('navBtnsContainer'),
	cnNavButtons: cn('navButtons'),
	cnRightSide: cn('rightSide'),
	cnLeftSide: cn('leftSide'),
	cnPaginationContainer: cn('paginationContainer'),
	cnItem: cn('paginationItem', { active }), // <- теперь нормально
})
