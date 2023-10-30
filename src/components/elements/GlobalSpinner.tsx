import icons from 'assets/icons'
import { Column } from 'components/layout/Column'
import useGlobalSpinner from 'hooks/useGlobalSpinner'
import { ActivityIndicator, Modal as RNModal } from 'react-native'
import colors from 'theme/colors'
import { renderIcon } from 'utils/ui'

export const GlobalSpinner = () => {
  const { show, options } = useGlobalSpinner()

  const withLogo = options.type === 'withLogo'
  const bgColor = withLogo ? 'white' : 'lightTransparent'

  return (
    <RNModal
      animationType={options.animationType || 'fade'}
      transparent={true}
      visible={show}
      onRequestClose={null}
      statusBarTranslucent
    >
      <Column width="100%" height="100%" justifyContent="center" alignItems="center" bg={bgColor}>
        {withLogo ? (
          <Column mb="m">{renderIcon(icons.smallLogo, { width: 100, height: 100 })}</Column>
        ) : null}
        <ActivityIndicator color={colors.pumpkin} size="large" />
      </Column>
    </RNModal>
  )
}
