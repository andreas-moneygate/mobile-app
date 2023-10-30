import icons from 'assets/icons'
import { Column } from 'components/layout/Column'
import { memo } from 'react'
import { ActivityIndicator } from 'react-native'
import colors from 'theme/colors'
import { renderIcon } from 'utils/ui'

interface InputLoadingIndicator {
  isLoading: boolean
  isValid: boolean
}

export const InputLoadingIndicator = memo(({ isLoading, isValid }: InputLoadingIndicator) => (
  <Column mr="m">
    {isLoading ? <ActivityIndicator color={colors.pumpkin} /> : null}
    {isValid ? renderIcon(icons.check, { color: '#18BB48' }) : null}
  </Column>
))
