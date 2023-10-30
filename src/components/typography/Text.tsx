import styled from 'styled-components/native'
import { BaseTextProps } from 'types/ui'
import {
  backgroundProps,
  commonBorderRadiusProps,
  commonMarginProps,
  commonPaddingProps,
  getColorValue,
  getTextDecoration,
  getTextTransform,
  positionProps,
  sizeProps,
} from 'utils/ui'

export const Text = styled.Text<BaseTextProps>`
  ${({ tabularNums }) => (tabularNums ? 'font-variant: tabular-nums' : undefined)};
  text-decoration: ${props => getTextDecoration(props)};
  ${commonMarginProps};
  ${commonPaddingProps};
  ${commonBorderRadiusProps};
  text-transform: ${props => getTextTransform(props)};
  font-weight: ${props => (props.bold ? 'bold' : 400)};
  color: ${({ color, theme }) => (color ? getColorValue(color, theme) : theme.colors.black)};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ fontWeight }) => (fontWeight ? `font-weight: ${fontWeight}` : 400)};
  ${backgroundProps}
  ${sizeProps}
  ${positionProps}
`
