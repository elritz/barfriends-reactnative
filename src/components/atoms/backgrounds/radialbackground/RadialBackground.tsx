import { Svg, Rect, Stop, RadialGradient } from 'react-native-svg'

interface RadialProps {
	color1: string
	color2: string
}

const RadialBackground = ({ color1, color2 }: RadialProps) => (
	<Svg style={{ position: 'absolute' }} height='100%' width='100%'>
		<RadialGradient
			id='grad'
			cx='50%'
			cy='40%'
			rx='90%'
			ry='100%'
			fx='50%'
			fy='-50%'
			gradientUnits='userSpaceOnUse'
		>
			<Stop offset='10%' stopColor={color1} stopOpacity='1' />
			<Stop offset='90%' stopColor={color2} stopOpacity='0.75' />
		</RadialGradient>
		<Rect x='0' y='0' width='100%' height='100%' fill='url(#grad)' clipPath='url(#clip)' />
	</Svg>
)

export default RadialBackground
