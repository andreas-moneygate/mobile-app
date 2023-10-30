import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Row } from 'components/layout/Row'
import { Body } from 'components/typography/Body'
import { memo } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import colors from 'theme/colors'
import { ColorKey, LayoutItemProps, SvgComponent } from 'types/ui'
import { renderIcon } from 'utils/ui'

export type ButtonType = 'pumpkin' | 'light'

export interface ButtonProps {
  onPress: (data: any) => void
  title: string
  disabled?: boolean
  style?: object
  type?: ButtonType
  icon?: SvgComponent | JSX.Element
  isLoading?: boolean
}

export type ButtonOptions = Pick<LayoutItemProps, 'bg' | 'height' | 'ph' | 'bw' | 'bc'> & {
  titleColor?: ColorKey
}

export const Button = memo<ButtonProps & LayoutItemProps>(
  ({ onPress, title, disabled = false, type = 'pumpkin', icon, isLoading, ...props }) => {
    const { titleColor, ...buttonProps } = ((): ButtonOptions => {
      const options = ((): Partial<ButtonOptions> => {
        if (disabled) {
          return {
            bg: 'pumpkin25',
            titleColor: 'white',
          }
        }

        switch (type) {
          case 'light':
            return {
              bg: 'lightPowder',
              titleColor: 'pumpkin',
            }
          default:
            return {
              bg: 'pumpkin',
              titleColor: 'white',
            }
        }
      })()

      return options
    })()
    return (
      <Wrapper onPress={onPress} disabled={disabled} {...buttonProps} {...props}>
        {icon && <Centered mr="s">{renderIcon(icon)}</Centered>}
        {isLoading ? (
          <Row mr="s">
            <ActivityIndicator color={type === 'light' ? colors.pumpkin : colors.white} />
          </Row>
        ) : null}
        <ButtonTitle color={titleColor}>{title}</ButtonTitle>
      </Wrapper>
    )
  },
)

const ButtonTitle = styled(Body)`
  font-weight: 700;
  text-align: center;
`

const Wrapper = styled(TouchableOpacity)`
  border-radius: 10px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
