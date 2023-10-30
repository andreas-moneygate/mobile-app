import { FC, PropsWithChildren } from 'react'
import { FlexStyle, TextStyle, ViewProps } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { DefaultTheme } from 'styled-components/native'
import lightThemeColors from 'theme/lightThemeColors'

export type ThemeColors = typeof lightThemeColors

export enum Spacings {
  xs = 5,
  s = 10,
  m = 15,
  l = 20,
  xl = 25,
  xxl = 30,
}

export type SvgComponent = FC<SvgProps>
export type IconProp = SvgComponent | JSX.Element
export type Maybe<T> = T | null | undefined

export type SpacingKey = keyof DefaultTheme['spacings']
export type ColorKey = keyof DefaultTheme['colors']

export type SpacingValue = SpacingKey | Spacings

export type SizeProps = Pick<FlexStyle, 'height' | 'width' | 'minHeight' | 'minWidth'>

export type MarginProps = {
  m?: SpacingValue
  mh?: SpacingValue
  mv?: SpacingValue
  mb?: SpacingValue
  mt?: SpacingValue
  ml?: SpacingValue
  mr?: SpacingValue
}

export type PaddingProps = {
  p?: SpacingValue
  ph?: SpacingValue
  pv?: SpacingValue
  pb?: SpacingValue
  pt?: SpacingValue
  pl?: SpacingValue
  pr?: SpacingValue
}

export type BorderRadiusProps = {
  br?: number
  brbr?: number
  brtr?: number
  brbl?: number
  brtl?: number
  bw?: number
  bbw?: number
  bc?: ColorKey
}

export type BackgroundProps = {
  opacity?: number
  bg?: ColorKey
}

export type FlexProps = Pick<
  FlexStyle,
  'flex' | 'alignItems' | 'alignSelf' | 'justifyContent' | 'flexWrap'
>

export type PositionProps = Pick<FlexStyle, 'position' | 'zIndex'> & {
  top?: SpacingValue
  bottom?: SpacingValue
  left?: SpacingValue
  right?: SpacingValue
}

export type LayoutItemProps = BorderRadiusProps &
  MarginProps &
  PaddingProps &
  Pick<ViewProps, 'style'> &
  FlexProps &
  Pick<FlexStyle, 'flex' | 'overflow'> &
  SizeProps &
  PositionProps &
  PropsWithChildren<BackgroundProps>

export type TextTransformProps = Partial<Record<TextTransformKeys, boolean>>

export enum TextTransformKeys {
  uppercase = 'uppercase',
  lowercase = 'lowercase',
  capitalize = 'capitalize',
  bold = 'bold',
  semiBold = 'semiBold',
  crossed = 'crossed',
  tabularNums = 'tabularNums',
}

export type TextColorProps = BackgroundProps & { color?: ColorKey }

export type BaseTextProps = TextTransformProps &
  BorderRadiusProps &
  PaddingProps &
  MarginProps &
  BackgroundProps &
  PositionProps &
  Pick<TextStyle, 'textAlign'> &
  Pick<TextStyle, 'fontWeight'> &
  SizeProps &
  FlexProps &
  TextColorProps

export interface SvgIconProps {
  xmlns?: string
  xmlnsXlink?: string
}
