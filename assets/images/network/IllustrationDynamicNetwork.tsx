import { useReactiveVar } from '@apollo/client'
import { DynamicIllustrationProps } from '@ctypes/styled'
import { ThemeReactiveVar } from '@reactive'
import Svg, { G, Path, Rect, Defs } from 'react-native-svg'

const NetworkIllustrationDynamic: React.FC<DynamicIllustrationProps> = ({
	width,
	height,
	primary,
	secondary,
	tertiary,
}: DynamicIllustrationProps) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	IllustrationDynamicLocation.defaultProps = {
		width: 200,
		height: 200,
		primary: rTheme.theme?.gluestack.tokens.colors.primary500,
		secondary: rTheme.theme?.gluestack.tokens.colors.secondary500,
		tertiary: rTheme.theme?.gluestack.tokens.colors.tertiary500,
	}

	return (
		<Svg
			width={width}
			height={height}
			viewBox='0 0 500 500'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<G filter='url(#filter0_d_182_2529)'>
				<Path
					d='M142.509 17.292a3.719 3.719 0 00.183-5.25 3.706 3.706 0 00-2.586-1.179 3.715 3.715 0 00-2.663.995L126.576 21.99l-10.132-10.87a3.715 3.715 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.724 3.724 0 00-1.239 2.602 3.724 3.724 0 00.995 2.704 3.71 3.71 0 005.31.124l10.867-10.128 10.132 10.867a3.71 3.71 0 005.335.28 3.725 3.725 0 001.181-2.651 3.723 3.723 0 00-1.086-2.691l-10.128-10.867 10.867-10.132zM241.535 66.778a3.706 3.706 0 001.18-2.587 3.711 3.711 0 00-2.172-3.51 3.715 3.715 0 00-4.073.663l-10.867 10.132-10.132-10.871a3.714 3.714 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.724 3.724 0 00-1.239 2.601 3.706 3.706 0 00.995 2.704 3.712 3.712 0 005.31.124l10.867-10.128 10.132 10.867a3.71 3.71 0 005.335.28 3.695 3.695 0 001.18-2.65 3.703 3.703 0 00-1.086-2.692L230.668 76.91l10.867-10.131zM489.103 66.778a3.722 3.722 0 001.179-2.587 3.711 3.711 0 00-2.171-3.51 3.72 3.72 0 00-4.074.663L473.17 71.476l-10.132-10.871a3.713 3.713 0 00-6.367 2.424c-.045.97.292 1.917.937 2.642l10.132 10.867-10.871 10.132a3.724 3.724 0 00-1.238 2.601 3.705 3.705 0 00.994 2.704 3.717 3.717 0 005.31.124l10.867-10.128 10.132 10.867a3.714 3.714 0 105.43-5.062L478.236 76.91l10.867-10.131zM43.482 116.263a3.704 3.704 0 001.18-2.587 3.715 3.715 0 00-6.246-2.846L27.55 120.961l-10.132-10.87a3.713 3.713 0 00-5.43 5.065l10.132 10.867-10.87 10.132a3.71 3.71 0 00-1.015 4.054 3.712 3.712 0 006.08 1.376l10.867-10.128 10.132 10.867a3.709 3.709 0 002.608 1.272 3.706 3.706 0 002.727-.992 3.712 3.712 0 00.095-5.342l-10.128-10.867 10.867-10.132zM142.509 116.263a3.71 3.71 0 001.179-2.587 3.711 3.711 0 00-2.172-3.509 3.7 3.7 0 00-2.841-.1c-.457.171-.875.43-1.232.763l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.239 2.602 3.721 3.721 0 002.19 3.559 3.718 3.718 0 002.881.067c.46-.181.88-.452 1.234-.798l10.867-10.128 10.132 10.867a3.706 3.706 0 002.608 1.272 3.72 3.72 0 003.587-2.198 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM439.589 165.749a3.708 3.708 0 001.179-2.587 3.707 3.707 0 00-2.171-3.51 3.719 3.719 0 00-4.074.663l-10.867 10.132-10.131-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.704 3.704 0 00-1.239 2.601 3.725 3.725 0 00.995 2.705 3.715 3.715 0 005.31.124l10.867-10.128 10.131 10.867a3.722 3.722 0 004.073 1.053 3.719 3.719 0 002.174-4.881 3.704 3.704 0 00-.817-1.234l-10.128-10.868 10.867-10.131zM142.509 363.691a3.72 3.72 0 00.946-4.017 3.717 3.717 0 00-4.78-2.179c-.457.171-.875.43-1.232.763l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.239 2.602 3.721 3.721 0 002.19 3.559c.452.203.939.313 1.434.324a3.707 3.707 0 002.681-1.055l10.867-10.128 10.132 10.867a3.706 3.706 0 002.608 1.272 3.72 3.72 0 003.587-2.198 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM192.022 363.691a3.708 3.708 0 001.179-2.587 3.71 3.71 0 00-3.582-3.842 3.711 3.711 0 00-2.663.996l-10.867 10.131-10.131-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.704 3.704 0 00-1.239 2.602 3.72 3.72 0 00.994 2.704 3.704 3.704 0 002.63 1.179 3.707 3.707 0 002.681-1.055l10.867-10.128 10.131 10.867a3.72 3.72 0 004.073 1.053 3.719 3.719 0 002.174-4.88 3.718 3.718 0 00-.817-1.235l-10.128-10.867 10.867-10.132zM142.509 413.177a3.732 3.732 0 001.179-2.587 3.713 3.713 0 00-6.245-2.847l-10.867 10.132-10.132-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.726 3.726 0 00-1.239 2.601 3.729 3.729 0 00.995 2.705 3.73 3.73 0 001.195.855 3.707 3.707 0 004.115-.732l10.867-10.128 10.132 10.868a3.72 3.72 0 002.608 1.271 3.705 3.705 0 003.587-2.197 3.718 3.718 0 00-.765-4.137l-10.128-10.867 10.867-10.131z'
					fill={tertiary}
				/>
				<Path
					d='M43.482 17.292a3.713 3.713 0 10-5.066-5.434L27.55 21.99 17.417 11.12a3.714 3.714 0 00-5.43 5.065L22.12 27.052 11.25 37.184a3.714 3.714 0 105.065 5.43l10.867-10.128 10.132 10.867a3.713 3.713 0 105.43-5.062L32.615 27.424l10.867-10.132zM340.563 17.292a3.719 3.719 0 00.183-5.25 3.706 3.706 0 00-2.586-1.179 3.715 3.715 0 00-2.663.995L324.63 21.99l-10.132-10.87a3.715 3.715 0 00-5.43 5.065L319.2 27.052l-10.871 10.132a3.724 3.724 0 00-1.239 2.602 3.724 3.724 0 00.995 2.704 3.71 3.71 0 005.31.124l10.867-10.128 10.132 10.867a3.71 3.71 0 005.335.28 3.725 3.725 0 001.181-2.651 3.723 3.723 0 00-1.087-2.691l-10.127-10.867 10.867-10.132zM390.076 17.292a3.722 3.722 0 001.179-2.587 3.712 3.712 0 00-2.172-3.51 3.709 3.709 0 00-4.073.663L374.143 21.99l-10.132-10.87a3.715 3.715 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.724 3.724 0 00-1.238 2.602 3.705 3.705 0 00.994 2.704 3.722 3.722 0 002.629 1.18 3.711 3.711 0 002.681-1.056l10.867-10.128 10.132 10.867a3.714 3.714 0 105.43-5.062l-10.128-10.867 10.867-10.132zM92.995 66.778a3.715 3.715 0 00-5.065-5.434L77.062 71.476 66.931 60.605a3.713 3.713 0 00-5.43 5.066l10.132 10.867L60.762 86.67a3.713 3.713 0 105.066 5.43L76.695 81.97l10.132 10.867a3.715 3.715 0 105.43-5.062L82.127 76.91l10.867-10.131zM291.049 66.778a3.706 3.706 0 001.179-2.587 3.711 3.711 0 00-2.171-3.51 3.715 3.715 0 00-4.074.663l-10.867 10.132-10.132-10.871a3.71 3.71 0 00-5.191-.121 3.717 3.717 0 00-.238 5.187l10.131 10.867-10.87 10.132a3.714 3.714 0 105.065 5.43l10.867-10.129 10.132 10.867a3.714 3.714 0 105.43-5.062L280.182 76.91l10.867-10.131zM390.076 116.263a3.712 3.712 0 00-.993-6.096 3.696 3.696 0 00-2.841-.1c-.457.171-.875.43-1.232.763l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.238 2.602 3.702 3.702 0 00.994 2.704 3.71 3.71 0 005.31.124l10.867-10.128 10.132 10.867a3.71 3.71 0 004.072 1.053 3.72 3.72 0 002.123-1.979 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM192.022 165.749a3.708 3.708 0 001.179-2.587 3.707 3.707 0 00-2.171-3.51 3.719 3.719 0 00-4.074.663l-10.867 10.132-10.131-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.704 3.704 0 00-1.239 2.601 3.725 3.725 0 00.994 2.705 3.72 3.72 0 004.077.922c.46-.181.88-.453 1.234-.798l10.867-10.128 10.131 10.867a3.722 3.722 0 004.073 1.053 3.719 3.719 0 002.174-4.881 3.704 3.704 0 00-.817-1.234l-10.128-10.868 10.867-10.131zM43.482 215.234a3.704 3.704 0 001.18-2.586 3.717 3.717 0 00-3.583-3.843 3.714 3.714 0 00-2.663.996L27.55 219.932l-10.132-10.87a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.87 10.131a3.721 3.721 0 00-1.24 2.602 3.712 3.712 0 003.624 3.884 3.71 3.71 0 002.681-1.056l10.867-10.128 10.132 10.867a3.709 3.709 0 002.608 1.272 3.706 3.706 0 002.727-.992 3.712 3.712 0 00.095-5.342l-10.128-10.867 10.867-10.132zM43.482 264.72a3.715 3.715 0 00-5.066-5.434L27.55 269.418l-10.132-10.871a3.717 3.717 0 00-5.19-.121 3.715 3.715 0 00-.24 5.187L22.12 274.48l-10.87 10.132a3.71 3.71 0 00-1.015 4.054 3.712 3.712 0 006.08 1.376l10.867-10.128 10.132 10.867a3.709 3.709 0 002.608 1.272 3.724 3.724 0 002.727-.993 3.719 3.719 0 001.181-2.65 3.712 3.712 0 00-1.086-2.691l-10.128-10.867 10.867-10.132zM241.535 264.72a3.708 3.708 0 001.18-2.587 3.711 3.711 0 00-2.172-3.51 3.718 3.718 0 00-4.073.663l-10.867 10.132-10.132-10.871a3.717 3.717 0 00-5.191-.121 3.715 3.715 0 00-.239 5.187l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.239 2.602c-.023.494.054.988.225 1.452a3.715 3.715 0 006.08 1.376l10.867-10.128 10.132 10.867a3.706 3.706 0 002.608 1.272 3.72 3.72 0 003.587-2.198c.203-.455.312-.947.32-1.445a3.701 3.701 0 00-1.086-2.691l-10.128-10.867 10.867-10.132zM291.049 264.72a3.708 3.708 0 00.946-4.017 3.714 3.714 0 00-6.012-1.417l-10.867 10.132-10.132-10.871a3.713 3.713 0 00-5.429 5.066l10.131 10.867-10.87 10.132a3.708 3.708 0 00-1.015 4.054 3.723 3.723 0 001.966 2.107 3.712 3.712 0 004.114-.731l10.867-10.128 10.132 10.867a3.71 3.71 0 002.608 1.272 3.719 3.719 0 003.639-5.099 3.713 3.713 0 00-.817-1.235l-10.128-10.867 10.867-10.132zM390.076 264.72a3.724 3.724 0 001.179-2.587 3.711 3.711 0 00-2.172-3.51 3.714 3.714 0 00-4.073.663l-10.867 10.132-10.132-10.871a3.717 3.717 0 00-5.191-.121 3.714 3.714 0 00-.239 5.187l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.238 2.602 3.702 3.702 0 00.994 2.704 3.717 3.717 0 005.31.124l10.867-10.128 10.132 10.867a3.71 3.71 0 004.072 1.053 3.723 3.723 0 002.123-1.979 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM43.482 314.206a3.72 3.72 0 00.946-4.018 3.711 3.711 0 00-3.349-2.411 3.714 3.714 0 00-2.663.995L27.55 318.904l-10.132-10.871a3.712 3.712 0 00-5.19-.121 3.713 3.713 0 00-.24 5.187l10.132 10.867-10.87 10.132a3.717 3.717 0 00-1.015 4.054 3.708 3.708 0 001.966 2.107 3.732 3.732 0 002.88.067c.46-.182.88-.453 1.234-.799l10.867-10.128 10.132 10.867a3.712 3.712 0 006.516-2.371 3.719 3.719 0 00-1.086-2.691l-10.128-10.867 10.867-10.131zM241.535 314.206a3.712 3.712 0 00.947-4.018 3.713 3.713 0 00-3.349-2.411 3.703 3.703 0 00-2.663.995l-10.867 10.132-10.132-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.726 3.726 0 00-1.239 2.601 3.71 3.71 0 00.995 2.704 3.718 3.718 0 002.629 1.18 3.726 3.726 0 002.681-1.056l10.867-10.128 10.132 10.867a3.709 3.709 0 005.335.28 3.699 3.699 0 001.18-2.651 3.708 3.708 0 00-1.086-2.691l-10.128-10.867 10.867-10.131zM439.589 314.206a3.712 3.712 0 00.947-4.018 3.713 3.713 0 00-3.35-2.411 3.717 3.717 0 00-2.663.995l-10.867 10.132-10.131-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.711 3.711 0 00.951 6.161 3.73 3.73 0 002.881.067c.46-.182.88-.453 1.234-.799l10.867-10.128 10.131 10.867a3.722 3.722 0 004.073 1.053 3.7 3.7 0 002.122-1.978 3.718 3.718 0 00-.765-4.137l-10.128-10.867 10.867-10.131zM489.103 314.206a3.728 3.728 0 001.179-2.587 3.713 3.713 0 00-6.245-2.847l-10.867 10.132-10.132-10.871a3.711 3.711 0 00-5.191-.121 3.712 3.712 0 00-.239 5.187l10.132 10.867-10.871 10.132a3.716 3.716 0 105.066 5.429l10.867-10.128 10.132 10.867a3.713 3.713 0 006.246-3.827 3.715 3.715 0 00-.816-1.235l-10.128-10.867 10.867-10.131zM241.535 363.691a3.708 3.708 0 001.18-2.587 3.711 3.711 0 00-2.172-3.509 3.7 3.7 0 00-2.841-.1c-.457.171-.876.43-1.232.763l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.239 2.602c-.023.494.054.988.225 1.452a3.7 3.7 0 003.399 2.431 3.707 3.707 0 002.681-1.055l10.867-10.128 10.132 10.867a3.706 3.706 0 002.608 1.272 3.72 3.72 0 003.587-2.198c.203-.455.312-.947.32-1.445a3.701 3.701 0 00-1.086-2.691l-10.128-10.867 10.867-10.132zM439.589 363.691a3.708 3.708 0 001.179-2.587 3.71 3.71 0 00-3.582-3.842 3.711 3.711 0 00-2.663.996l-10.867 10.131-10.131-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.704 3.704 0 00-1.239 2.602 3.72 3.72 0 00.995 2.704 3.7 3.7 0 002.629 1.179 3.707 3.707 0 002.681-1.055l10.867-10.128 10.131 10.867a3.72 3.72 0 004.073 1.053 3.719 3.719 0 002.174-4.88 3.718 3.718 0 00-.817-1.235l-10.128-10.867 10.867-10.132zM489.103 363.691a3.724 3.724 0 001.179-2.587 3.711 3.711 0 00-2.171-3.509 3.706 3.706 0 00-4.074.663l-10.867 10.131-10.132-10.87a3.712 3.712 0 00-6.367 2.423c-.045.97.292 1.918.937 2.642l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.238 2.602 3.702 3.702 0 00.994 2.704 3.704 3.704 0 002.629 1.179 3.69 3.69 0 001.447-.257c.461-.181.88-.452 1.234-.798l10.867-10.128 10.132 10.867a3.71 3.71 0 002.608 1.272c.498.026.996-.049 1.465-.219a3.728 3.728 0 002.122-1.979 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM92.995 360.012a3.717 3.717 0 00.184-5.25 3.718 3.718 0 00-5.25-.184L77.063 364.71l-10.131-10.871a3.716 3.716 0 00-5.191-.121 3.715 3.715 0 00-.239 5.187l10.132 10.867-10.871 10.132a3.709 3.709 0 00-1.014 4.054 3.71 3.71 0 004.846 2.174 3.72 3.72 0 001.234-.798l10.867-10.128 10.132 10.867a3.71 3.71 0 004.072 1.053 3.722 3.722 0 002.123-1.979 3.71 3.71 0 00-.766-4.136l-10.128-10.867 10.867-10.132zM92.995 462.662a3.706 3.706 0 001.18-2.587 3.715 3.715 0 00-6.245-2.846L77.062 467.36l-10.131-10.87a3.713 3.713 0 00-5.43 5.065l10.132 10.868-10.871 10.131a3.709 3.709 0 00-1.014 4.054 3.71 3.71 0 004.846 2.174c.46-.181.88-.452 1.234-.798l10.867-10.128 10.132 10.867a3.71 3.71 0 004.072 1.053 3.704 3.704 0 002.123-1.979 3.71 3.71 0 00-.766-4.136l-10.128-10.867 10.867-10.132zM241.535 462.662a3.701 3.701 0 00.947-4.017 3.703 3.703 0 00-.763-1.232 3.697 3.697 0 00-1.176-.847 3.7 3.7 0 00-2.841-.1c-.457.171-.876.43-1.232.763l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.868-10.871 10.131a3.72 3.72 0 00-1.239 2.602c-.023.494.054.988.225 1.452a3.7 3.7 0 001.965 2.107 3.718 3.718 0 002.881.067c.46-.181.88-.452 1.234-.798l10.867-10.128 10.132 10.867a3.706 3.706 0 002.608 1.272 3.705 3.705 0 003.907-3.643 3.701 3.701 0 00-1.086-2.691l-10.128-10.867 10.867-10.132zM291.049 462.662a3.697 3.697 0 001.179-2.587 3.711 3.711 0 00-2.171-3.509 3.701 3.701 0 00-2.841-.1c-.457.171-.876.43-1.233.763l-10.867 10.131-10.132-10.87a3.71 3.71 0 00-5.191-.121 3.716 3.716 0 00-.238 5.186l10.131 10.868-10.87 10.131a3.717 3.717 0 00-.245 5.306 3.713 3.713 0 005.31.124l10.867-10.128 10.132 10.867a3.71 3.71 0 002.608 1.272 3.71 3.71 0 003.587-2.198 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132z'
					fill={soft?.secondary}
				/>
				<Path
					d='M92.995 17.292a3.715 3.715 0 00-5.065-5.434L77.062 21.99 66.931 11.12a3.714 3.714 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.713 3.713 0 105.066 5.43l10.867-10.128 10.132 10.867a3.715 3.715 0 105.43-5.062L82.127 27.424l10.867-10.132zM291.049 17.292a3.706 3.706 0 001.179-2.587 3.712 3.712 0 00-2.171-3.51 3.714 3.714 0 00-4.074.663L275.116 21.99l-10.132-10.87a3.71 3.71 0 00-5.191-.122 3.717 3.717 0 00-.238 5.187l10.131 10.867-10.87 10.132a3.714 3.714 0 105.065 5.43l10.867-10.128 10.132 10.867a3.714 3.714 0 105.43-5.062l-10.128-10.867 10.867-10.132zM439.589 17.292a3.706 3.706 0 001.179-2.587 3.71 3.71 0 00-5.012-3.609c-.457.17-.876.43-1.233.762L423.656 21.99l-10.131-10.87a3.715 3.715 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.709 3.709 0 00-1.239 2.602 3.723 3.723 0 00.995 2.704 3.71 3.71 0 005.31.124l10.867-10.128 10.131 10.867a3.725 3.725 0 002.609 1.272 3.712 3.712 0 003.907-3.643 3.704 3.704 0 00-1.086-2.691l-10.128-10.867 10.867-10.132zM489.103 17.292a3.722 3.722 0 001.179-2.587 3.712 3.712 0 00-2.171-3.51 3.718 3.718 0 00-4.074.663L473.17 21.99l-10.132-10.87a3.713 3.713 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.724 3.724 0 00-1.238 2.602 3.705 3.705 0 00.994 2.704 3.715 3.715 0 005.31.124l10.867-10.128 10.132 10.867a3.714 3.714 0 105.43-5.062l-10.128-10.867 10.867-10.132zM43.482 66.778a3.713 3.713 0 10-5.066-5.434L27.55 71.476 17.417 60.605a3.714 3.714 0 00-5.43 5.066L22.12 76.538 11.25 86.67a3.714 3.714 0 105.065 5.43L27.181 81.97l10.132 10.867a3.714 3.714 0 105.43-5.062L32.615 76.91l10.867-10.131zM192.022 66.778a3.706 3.706 0 001.179-2.587 3.71 3.71 0 00-3.582-3.842 3.715 3.715 0 00-2.663.995l-10.867 10.132-10.131-10.871a3.714 3.714 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.709 3.709 0 00-1.239 2.601 3.724 3.724 0 00.994 2.704 3.717 3.717 0 005.311.124l10.867-10.128 10.131 10.867a3.726 3.726 0 002.609 1.272 3.713 3.713 0 002.821-6.334L181.155 76.91l10.867-10.131zM92.995 116.263a3.706 3.706 0 001.18-2.587 3.715 3.715 0 00-6.245-2.846l-10.868 10.131-10.131-10.87a3.713 3.713 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.709 3.709 0 00-1.014 4.054 3.71 3.71 0 004.846 2.174c.46-.181.88-.452 1.234-.798l10.867-10.128 10.132 10.867a3.71 3.71 0 004.072 1.053 3.72 3.72 0 002.123-1.979 3.71 3.71 0 00-.766-4.136l-10.128-10.867 10.867-10.132zM241.535 116.263a3.701 3.701 0 00.947-4.017 3.703 3.703 0 00-.763-1.232 3.697 3.697 0 00-1.176-.847 3.7 3.7 0 00-2.841-.1c-.457.171-.876.43-1.232.763l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.239 2.602c-.023.494.054.988.225 1.452a3.7 3.7 0 001.965 2.107 3.718 3.718 0 002.881.067c.46-.181.88-.452 1.234-.798l10.867-10.128 10.132 10.867a3.706 3.706 0 002.608 1.272 3.72 3.72 0 003.587-2.198c.203-.455.312-.947.32-1.445a3.701 3.701 0 00-1.086-2.691l-10.128-10.867 10.867-10.132zM291.049 116.263a3.697 3.697 0 001.179-2.587 3.711 3.711 0 00-2.171-3.509 3.701 3.701 0 00-2.841-.1c-.457.171-.876.43-1.233.763l-10.867 10.131-10.132-10.87a3.71 3.71 0 00-5.191-.121 3.716 3.716 0 00-.238 5.186l10.131 10.867-10.87 10.132a3.712 3.712 0 105.065 5.43l10.867-10.128 10.132 10.867a3.71 3.71 0 002.608 1.272 3.71 3.71 0 003.587-2.198 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM340.563 116.263a3.71 3.71 0 001.179-2.587 3.711 3.711 0 00-2.172-3.509 3.7 3.7 0 00-2.841-.1c-.457.171-.876.43-1.232.763l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.239 2.602 3.721 3.721 0 002.19 3.559 3.718 3.718 0 002.881.067c.46-.181.88-.452 1.234-.798l10.867-10.128 10.132 10.867a3.706 3.706 0 002.608 1.272 3.72 3.72 0 003.587-2.198 3.713 3.713 0 00-.766-4.136l-10.127-10.867 10.867-10.132zM439.589 116.263a3.697 3.697 0 001.179-2.587 3.71 3.71 0 00-3.582-3.842 3.711 3.711 0 00-2.663.996l-10.867 10.131-10.131-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.704 3.704 0 00-1.239 2.602 3.72 3.72 0 00.995 2.704 3.714 3.714 0 005.31.124l10.867-10.128 10.131 10.867a3.72 3.72 0 004.073 1.053 3.716 3.716 0 002.174-4.88 3.718 3.718 0 00-.817-1.235l-10.128-10.867 10.867-10.132zM489.103 116.263a3.712 3.712 0 00-.992-6.096 3.706 3.706 0 00-4.074.663l-10.867 10.131-10.132-10.87a3.712 3.712 0 00-6.367 2.423c-.045.97.292 1.918.937 2.642l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.238 2.602 3.702 3.702 0 00.994 2.704 3.709 3.709 0 005.31.124l10.867-10.128 10.132 10.867a3.71 3.71 0 002.608 1.272 3.71 3.71 0 003.587-2.198 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM92.995 165.749a3.717 3.717 0 00.184-5.25 3.722 3.722 0 00-2.587-1.179 3.712 3.712 0 00-2.662.995l-10.868 10.132-10.131-10.871a3.712 3.712 0 00-5.191-.121 3.715 3.715 0 00-.239 5.187l10.132 10.867-10.871 10.132a3.709 3.709 0 00-1.014 4.054 3.72 3.72 0 001.965 2.107 3.714 3.714 0 004.115-.731l10.867-10.128 10.132 10.867a3.724 3.724 0 002.608 1.271 3.722 3.722 0 003.587-2.197 3.716 3.716 0 00-.766-4.136L82.128 175.88l10.867-10.131zM142.509 165.749a3.72 3.72 0 00.946-4.017 3.717 3.717 0 00-4.78-2.179c-.457.171-.875.43-1.232.762l-10.867 10.132-10.132-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.239 2.601 3.726 3.726 0 00.995 2.705 3.715 3.715 0 005.31.124l10.867-10.128 10.132 10.867a3.72 3.72 0 002.608 1.271 3.72 3.72 0 002.727-.992 3.73 3.73 0 001.181-2.651 3.727 3.727 0 00-1.086-2.69l-10.128-10.868 10.867-10.131zM241.535 165.749a3.708 3.708 0 001.18-2.587 3.708 3.708 0 00-.996-2.663 3.712 3.712 0 00-5.249-.184l-10.867 10.132-10.132-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.239 2.601 3.708 3.708 0 00.995 2.705 3.715 3.715 0 005.31.124l10.867-10.128 10.132 10.867a3.72 3.72 0 002.608 1.271 3.72 3.72 0 002.727-.992 3.699 3.699 0 001.18-2.651 3.708 3.708 0 00-1.086-2.69l-10.128-10.868 10.867-10.131zM340.563 165.749a3.72 3.72 0 00.946-4.017 3.717 3.717 0 00-4.78-2.179c-.457.171-.876.43-1.232.762l-10.867 10.132-10.132-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.239 2.601 3.726 3.726 0 00.995 2.705 3.715 3.715 0 005.31.124l10.867-10.128 10.132 10.867a3.72 3.72 0 002.608 1.271 3.72 3.72 0 002.727-.992 3.73 3.73 0 001.181-2.651 3.727 3.727 0 00-1.087-2.69l-10.127-10.868 10.867-10.131zM92.995 215.234a3.706 3.706 0 001.18-2.586 3.717 3.717 0 00-3.582-3.843 3.712 3.712 0 00-2.663.996l-10.868 10.131-10.131-10.87a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.131a3.72 3.72 0 00-1.239 2.602 3.711 3.711 0 002.19 3.559 3.715 3.715 0 004.115-.731l10.867-10.128 10.132 10.867a3.71 3.71 0 004.072 1.053 3.704 3.704 0 002.123-1.979 3.71 3.71 0 00-.766-4.136l-10.128-10.867 10.867-10.132zM192.022 215.234a3.697 3.697 0 001.179-2.586 3.712 3.712 0 00-6.245-2.847l-10.867 10.131-10.131-10.87a3.714 3.714 0 00-5.43 5.066l10.132 10.867-10.871 10.131a3.715 3.715 0 002.385 6.486 3.715 3.715 0 002.681-1.056l10.867-10.128 10.131 10.867a3.72 3.72 0 004.073 1.053 3.7 3.7 0 002.122-1.979 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM291.049 215.234a3.697 3.697 0 001.179-2.586 3.713 3.713 0 00-6.245-2.847l-10.867 10.131-10.132-10.87a3.71 3.71 0 00-5.191-.121 3.716 3.716 0 00-.238 5.187l10.131 10.867-10.87 10.131a3.7 3.7 0 00-1.239 2.602 3.702 3.702 0 00.994 2.704 3.713 3.713 0 005.31.124l10.867-10.128 10.132 10.867a3.71 3.71 0 002.608 1.272 3.71 3.71 0 003.587-2.198 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM340.563 215.234a3.71 3.71 0 001.179-2.586 3.713 3.713 0 00-6.245-2.847l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.066l10.132 10.867-10.871 10.131a3.73 3.73 0 00-1.239 2.602 3.721 3.721 0 002.19 3.559 3.718 3.718 0 002.881.067c.46-.181.88-.452 1.234-.798l10.867-10.128 10.132 10.867a3.706 3.706 0 002.608 1.272 3.705 3.705 0 003.587-2.198 3.713 3.713 0 00-.766-4.136l-10.127-10.867 10.867-10.132zM390.076 215.234a3.712 3.712 0 00-.993-6.096 3.715 3.715 0 00-4.073.663l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.066l10.132 10.867-10.871 10.131a3.716 3.716 0 105.066 5.43l10.867-10.128 10.132 10.867a3.71 3.71 0 004.072 1.053 3.705 3.705 0 002.123-1.979 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM439.589 215.234a3.697 3.697 0 001.179-2.586 3.712 3.712 0 00-6.245-2.847l-10.867 10.131-10.131-10.87a3.714 3.714 0 00-5.43 5.066l10.132 10.867-10.871 10.131a3.715 3.715 0 002.385 6.486 3.715 3.715 0 002.681-1.056l10.867-10.128 10.131 10.867a3.72 3.72 0 004.073 1.053 3.7 3.7 0 002.122-1.979 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM92.995 264.72a3.717 3.717 0 00.184-5.25 3.718 3.718 0 00-5.25-.184l-10.867 10.132-10.131-10.871a3.716 3.716 0 00-5.191-.121 3.715 3.715 0 00-.239 5.187l10.132 10.867-10.871 10.132a3.709 3.709 0 00-1.014 4.054 3.71 3.71 0 004.846 2.174 3.72 3.72 0 001.234-.798l10.867-10.128 10.132 10.867a3.71 3.71 0 004.072 1.053 3.722 3.722 0 002.123-1.979 3.71 3.71 0 00-.766-4.136l-10.128-10.867 10.867-10.132zM489.103 264.72a3.724 3.724 0 001.179-2.587 3.711 3.711 0 00-.995-2.663 3.723 3.723 0 00-4.018-.946c-.456.171-.875.43-1.232.762l-10.867 10.132-10.132-10.871a3.716 3.716 0 00-6.367 2.424 3.715 3.715 0 00.937 2.642l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.238 2.602 3.702 3.702 0 00.994 2.704 3.72 3.72 0 004.076.922c.461-.181.88-.453 1.234-.798l10.867-10.128 10.132 10.867a3.71 3.71 0 002.608 1.272c.498.026.996-.049 1.465-.219a3.728 3.728 0 002.122-1.979 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM92.995 314.206a3.721 3.721 0 00.947-4.018 3.714 3.714 0 00-6.012-1.416l-10.868 10.132-10.131-10.871a3.712 3.712 0 00-5.191-.121 3.713 3.713 0 00-.239 5.187l10.132 10.867-10.871 10.132a3.716 3.716 0 00-1.014 4.054 3.706 3.706 0 001.965 2.107 3.732 3.732 0 002.88.067c.461-.182.88-.453 1.235-.799l10.867-10.128 10.132 10.867a3.713 3.713 0 105.43-5.062l-10.129-10.867 10.867-10.131zM192.022 314.206a3.712 3.712 0 00.947-4.018 3.713 3.713 0 00-3.35-2.411 3.717 3.717 0 00-2.663.995l-10.867 10.132-10.131-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.711 3.711 0 00.951 6.161 3.73 3.73 0 002.881.067c.46-.182.88-.453 1.234-.799l10.867-10.128 10.131 10.867a3.722 3.722 0 004.073 1.053 3.7 3.7 0 002.122-1.978 3.718 3.718 0 00-.765-4.137l-10.128-10.867 10.867-10.131zM291.049 314.206a3.712 3.712 0 00.946-4.018 3.71 3.71 0 00-3.349-2.411 3.717 3.717 0 00-2.663.995l-10.867 10.132-10.132-10.871a3.713 3.713 0 00-5.429 5.066l10.131 10.867-10.87 10.132a3.697 3.697 0 00-1.239 2.601 3.71 3.71 0 002.19 3.56 3.73 3.73 0 002.88.067c.461-.182.88-.453 1.234-.799l10.867-10.128 10.132 10.867a3.713 3.713 0 006.247-3.827 3.733 3.733 0 00-.817-1.235l-10.128-10.867 10.867-10.131zM340.563 314.206a3.725 3.725 0 00.946-4.018 3.713 3.713 0 00-3.349-2.411 3.703 3.703 0 00-2.663.995l-10.867 10.132-10.132-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.726 3.726 0 00-1.239 2.601 3.729 3.729 0 00.995 2.704 3.718 3.718 0 002.629 1.18 3.726 3.726 0 002.681-1.056l10.867-10.128 10.132 10.867a3.709 3.709 0 005.335.28 3.73 3.73 0 001.181-2.651 3.727 3.727 0 00-1.087-2.691l-10.127-10.867 10.867-10.131zM43.482 363.691a3.715 3.715 0 10-5.066-5.433L27.55 368.389l-10.132-10.87a3.713 3.713 0 00-5.43 5.065l10.132 10.867-10.87 10.132a3.71 3.71 0 00-1.015 4.054 3.712 3.712 0 006.08 1.376l10.867-10.128 10.132 10.867a3.709 3.709 0 002.608 1.272 3.724 3.724 0 002.727-.993 3.708 3.708 0 00.912-4.106 3.72 3.72 0 00-.817-1.235l-10.128-10.867 10.867-10.132zM340.563 363.691a3.72 3.72 0 00.946-4.017 3.717 3.717 0 00-4.78-2.179c-.457.171-.876.43-1.232.763l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.867-10.871 10.132a3.72 3.72 0 00-1.239 2.602 3.721 3.721 0 002.19 3.559c.452.203.939.313 1.434.324a3.707 3.707 0 002.681-1.055l10.867-10.128 10.132 10.867a3.706 3.706 0 002.608 1.272 3.72 3.72 0 003.587-2.198 3.713 3.713 0 00-.766-4.136l-10.127-10.867 10.867-10.132zM390.042 363.691a3.708 3.708 0 00.946-4.017 3.698 3.698 0 00-1.938-2.079 3.701 3.701 0 00-2.841-.1c-.457.171-.876.43-1.233.763l-10.867 10.131-10.132-10.87a3.71 3.71 0 00-5.191-.122 3.719 3.719 0 00-1.176 2.545 3.71 3.71 0 00.938 2.642l10.131 10.867-10.87 10.132a3.712 3.712 0 105.065 5.43l10.867-10.128 10.132 10.867a3.71 3.71 0 002.608 1.272 3.719 3.719 0 003.639-5.099 3.733 3.733 0 00-.817-1.235l-10.128-10.867 10.867-10.132zM192.022 413.177a3.72 3.72 0 00.947-4.018 3.723 3.723 0 00-1.939-2.079 3.719 3.719 0 00-4.074.663l-10.867 10.132-10.131-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.711 3.711 0 00.951 6.161 3.73 3.73 0 002.881.067 3.71 3.71 0 001.234-.799l10.867-10.128 10.131 10.868a3.722 3.722 0 004.073 1.052 3.7 3.7 0 002.122-1.978 3.718 3.718 0 00-.765-4.137l-10.128-10.867 10.867-10.131zM241.535 413.177a3.72 3.72 0 00.947-4.018 3.723 3.723 0 00-1.939-2.079 3.718 3.718 0 00-4.073.663l-10.867 10.132-10.132-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.726 3.726 0 00-1.239 2.601 3.71 3.71 0 00.995 2.705 3.73 3.73 0 001.195.855 3.714 3.714 0 004.115-.732l10.867-10.128 10.132 10.868a3.72 3.72 0 002.608 1.271 3.705 3.705 0 003.907-3.643 3.708 3.708 0 00-1.086-2.691l-10.128-10.867 10.867-10.131zM439.589 413.177a3.72 3.72 0 00.947-4.018 3.723 3.723 0 00-1.939-2.079 3.719 3.719 0 00-4.074.663l-10.867 10.132-10.131-10.871a3.713 3.713 0 00-5.43 5.066l10.132 10.867-10.871 10.132a3.711 3.711 0 00.951 6.161 3.73 3.73 0 002.881.067 3.71 3.71 0 001.234-.799l10.867-10.128 10.131 10.868a3.722 3.722 0 004.073 1.052 3.7 3.7 0 002.122-1.978 3.718 3.718 0 00-.765-4.137l-10.128-10.867 10.867-10.131zM489.103 413.177a3.723 3.723 0 00.946-4.018 3.72 3.72 0 00-3.349-2.411 3.713 3.713 0 00-2.663.995l-10.867 10.132-10.132-10.871a3.711 3.711 0 00-5.191-.121 3.712 3.712 0 00-.239 5.187l10.132 10.867-10.871 10.132a3.716 3.716 0 105.066 5.429l10.867-10.128 10.132 10.868a3.724 3.724 0 002.608 1.271 3.71 3.71 0 003.587-2.197 3.718 3.718 0 00-.765-4.137l-10.128-10.867 10.867-10.131zM43.482 462.662a3.704 3.704 0 001.18-2.587 3.715 3.715 0 00-6.246-2.846L27.55 467.36l-10.132-10.87a3.713 3.713 0 00-5.43 5.065l10.132 10.868-10.87 10.131a3.71 3.71 0 00-1.015 4.054 3.712 3.712 0 006.08 1.376l10.867-10.128 10.132 10.867a3.709 3.709 0 002.608 1.272 3.706 3.706 0 002.727-.992 3.712 3.712 0 00.095-5.342l-10.128-10.867 10.867-10.132zM142.509 462.662a3.71 3.71 0 001.179-2.587 3.711 3.711 0 00-2.172-3.509 3.7 3.7 0 00-2.841-.1c-.457.171-.875.43-1.232.763l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.868-10.871 10.131a3.72 3.72 0 00-1.239 2.602 3.721 3.721 0 002.19 3.559 3.718 3.718 0 002.881.067c.46-.181.88-.452 1.234-.798l10.867-10.128 10.132 10.867a3.706 3.706 0 002.608 1.272 3.705 3.705 0 003.587-2.198 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM340.563 462.662a3.71 3.71 0 001.179-2.587 3.711 3.711 0 00-2.172-3.509 3.7 3.7 0 00-2.841-.1c-.457.171-.876.43-1.232.763L324.63 467.36l-10.132-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.868-10.871 10.131a3.72 3.72 0 00-1.239 2.602 3.721 3.721 0 002.19 3.559 3.718 3.718 0 002.881.067c.46-.181.88-.452 1.234-.798l10.867-10.128 10.132 10.867a3.706 3.706 0 002.608 1.272 3.705 3.705 0 003.587-2.198 3.713 3.713 0 00-.766-4.136l-10.127-10.867 10.867-10.132zM390.076 462.662a3.712 3.712 0 00-.993-6.096 3.696 3.696 0 00-2.841-.1c-.457.171-.875.43-1.232.763l-10.867 10.131-10.132-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.868-10.871 10.131a3.72 3.72 0 00-1.238 2.602 3.702 3.702 0 00.994 2.704 3.71 3.71 0 005.31.124l10.867-10.128 10.132 10.867a3.71 3.71 0 004.072 1.053 3.705 3.705 0 002.123-1.979 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM439.589 462.662a3.697 3.697 0 001.179-2.587 3.71 3.71 0 00-3.582-3.842 3.711 3.711 0 00-2.663.996l-10.867 10.131-10.131-10.87a3.714 3.714 0 00-5.43 5.065l10.132 10.868-10.871 10.131a3.704 3.704 0 00-1.239 2.602 3.72 3.72 0 00.995 2.704 3.714 3.714 0 005.31.124l10.867-10.128 10.131 10.867a3.72 3.72 0 004.073 1.053 3.7 3.7 0 002.122-1.979 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132zM489.103 462.662a3.712 3.712 0 00-.992-6.096 3.706 3.706 0 00-4.074.663L473.17 467.36l-10.132-10.87a3.712 3.712 0 00-6.367 2.423c-.045.97.292 1.918.937 2.642l10.132 10.868-10.871 10.131a3.72 3.72 0 00-1.238 2.602 3.702 3.702 0 00.994 2.704 3.709 3.709 0 005.31.124l10.867-10.128 10.132 10.867a3.71 3.71 0 002.608 1.272 3.71 3.71 0 003.587-2.198 3.713 3.713 0 00-.765-4.136l-10.128-10.867 10.867-10.132z'
					fill={primary}
				/>
			</G>
			<Rect y={405} width={94} height={36} rx={18} fill={soft?.secondary} />
			<Rect
				x={491}
				y={153}
				width={94}
				height={36}
				rx={18}
				transform='rotate(90 491 153)'
				fill={soft?.secondary}
			/>
			<Rect x={307} y={58} width={134} height={37} rx={18.5} fill={secondary} />
			<Rect
				x={144}
				y={205}
				width={137}
				height={37}
				rx={18.5}
				transform='rotate(90 144 205)'
				fill={secondary}
			/>
			<Rect x={159} y={8} width={84} height={37} rx={18.5} fill={soft?.primary} />
			<Rect x={253} y={405} width={142} height={36} rx={18} fill={soft?.primary} />
			<G filter='url(#filter1_d_182_2529)'>
				<Path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M274.975 348.612c-8.551 6.602-9.526 19.146-2.099 26.991 6.442 6.804 16.989 7.624 24.405 1.898l16.168-12.485a383.691 383.691 0 0014.631-11.881l22.693 25.204c7.021 7.797 19.032 8.426 26.829 1.406 7.797-7.02 8.427-19.032 1.406-26.829l-23.28-25.855a383.179 383.179 0 0014.309-15.75l12.192-14.19c6.093-7.092 5.838-17.643-.591-24.433-7.437-7.856-20.037-7.551-27.087.654l-12.231 14.237a346.762 346.762 0 01-11.078 12.287l-21.689-24.087c-7.02-7.797-19.032-8.426-26.828-1.406-7.797 7.02-8.427 19.032-1.407 26.829l22.334 24.804a348.18 348.18 0 01-12.391 10.031l-16.286 12.575z'
					fill='#00E676'
				/>
			</G>
			<G filter='url(#filter2_d_182_2529)'>
				<Path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M250.404 107a291.024 291.024 0 01193.372 73.14c7.59 6.728 8.108 18.285 1.035 25.358L405.309 245H284.731c-18.975 0-34.5 15.525-34.5 34.5v113.505c-4.312 0-8.797-1.725-12.075-5.002L55.996 205.498c-7.072-7.073-6.555-18.63 1.035-25.358C108.61 134.6 176.23 107 250.404 107zM217 169c-18.778 0-34 15.222-34 34s15.222 34 34 34 34-15.222 34-34-15.222-34-34-34z'
					fill='#00E676'
				/>
			</G>
			<Defs></Defs>
		</Svg>
	)
}

export default NetworkIllustrationDynamic
