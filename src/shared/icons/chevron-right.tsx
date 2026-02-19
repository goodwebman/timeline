import React from 'react'

interface ChevronRightProps {
	width?: number | string
	height?: number | string
	color?: string
}

export const ChevronRight: React.FC<ChevronRightProps> = ({
	width = 9,
	height = 14,
	color = '#42567A',
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 9 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M0.707093 13.2071L6.95709 6.95711L0.707093 0.707108'
				stroke={color}
				strokeWidth={2}
			/>
		</svg>
	)
}
