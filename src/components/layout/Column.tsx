import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import {
  backgroundProps,
  commonBorderRadiusProps,
  commonMarginProps,
  commonPaddingProps,
  positionProps,
  sizeProps,
} from 'utils/ui'

export const Column = styled.View<LayoutItemProps>`
  ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf}`};
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  ${positionProps}
  ${commonMarginProps}
  ${commonPaddingProps}
  ${sizeProps}
  ${backgroundProps}
  ${commonBorderRadiusProps}
`
