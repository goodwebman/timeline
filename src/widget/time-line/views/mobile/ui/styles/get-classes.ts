import classNames from 'classnames/bind'
import classes from './time-line-mobile.module.scss'

const cn = classNames.bind(classes)

export const getClasses = () => {
	return {
		cnRoot: cn('root'),
		cnTitle: cn('title'),
		cnCenter: cn('center'),
	}
}
