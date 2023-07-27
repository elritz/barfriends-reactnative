import { COL, Positions, SIZE } from './Config'
import Item from './GestureItem'
import React, { ReactElement } from 'react'
import Animated, {
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated'

interface ListProps {
	children: ReactElement<{ id: string }>[]
	editing: boolean
	onDragEnd: (diff: Positions) => void
}

const List = ({ children, editing, onDragEnd }: ListProps) => {
	const scrollY = useSharedValue(0)
	const scrollView = useAnimatedRef<Animated.View>()
	const positions = useSharedValue<Positions>(
		Object.assign({}, ...children.map((child, index) => ({ [child.props.id]: index }))),
	)
	const onScroll = useAnimatedScrollHandler({
		onScroll: ({ contentOffset: { y } }) => {
			scrollY.value = y
		},
	})

	return (
		<Animated.View
			// onScroll={onScroll}
			ref={scrollView}
			style={{
				height: Math.ceil(children.length / COL) * SIZE,
			}}
			// contentContainerStyle={{
			//   height: Math.ceil(children.length / COL) * SIZE,
			// }}
			// showsVerticalScrollIndicator={false}
			// bounces={false}
			// scrollEventThrottle={16}
		>
			{children.map(child => (
				<Item
					key={child.props.id}
					positions={positions}
					id={child.props.id}
					editing={editing}
					onDragEnd={onDragEnd}
					scrollView={scrollView}
					scrollY={scrollY}
				>
					{child}
				</Item>
			))}
		</Animated.View>
	)
}

export default List
