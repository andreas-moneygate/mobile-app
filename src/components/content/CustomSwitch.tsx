import useSortedStyleProps from 'hooks/useSortedStyleProps'
import { memo } from 'react'
import { Switch } from 'react-native'
import { useTheme } from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'

interface CustomSwitchProps {
  isEnabled: boolean
  onToggle: ((item?: any) => void) | undefined
}

export const CustomSwitch = memo((props: CustomSwitchProps & LayoutItemProps) => {
  const { isEnabled, onToggle } = props

  const styledProps = useSortedStyleProps(props)
  const {
    colors: { pumpkin, white, darkGray, lightGray },
  } = useTheme()

  return (
    <Switch
      trackColor={{ false: darkGray, true: pumpkin }}
      thumbColor={isEnabled ? white : lightGray}
      onValueChange={onToggle}
      value={isEnabled}
      {...styledProps}
    />
  )
})
