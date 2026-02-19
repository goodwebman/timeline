export const getTargetAngleValue = (length: number): number => {
	switch (length) {
		case 6:
			return 300
		case 5:
			return -55
		case 4:
			return -405
		case 3:
			return -391
		case 2:
			return -90
		default:
			return 0
	}
}
