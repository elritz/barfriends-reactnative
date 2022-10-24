import PropTypes from 'prop-types'
import { TouchableHighlight } from 'react-native'

const Button = ({ onPress, children }) => (
	<TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>
)

export default Button

Button.defaultProps = {
	children: null,
	onPress: () => {},
}

Button.propTypes = {
	children: PropTypes.node,
	onPress: PropTypes.func,
}
