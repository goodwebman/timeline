import { useMediaQuery } from './shared/hooks/use-media-query'
import { TimeLineMobile } from './widget/time-line/views/mobile/ui/time-line-mobile'
import { TimeLineDesktop } from './widget/time-line/views/web/ui/time-line-desktop'

function App() {
	const isPhone = useMediaQuery(`(max-width: 450px)`)
	return (
		<div className='container'>
			{isPhone ? <TimeLineMobile /> : <TimeLineDesktop />}
		</div>
	)
}

export default App
