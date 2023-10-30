import { isValidElement } from 'react'
import { Dimensions, Platform } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { CSSProperties } from 'styled-components'
import { css, DefaultTheme } from 'styled-components/native'
import {
  BackgroundProps,
  BorderRadiusProps,
  ColorKey,
  IconProp,
  MarginProps,
  Maybe,
  PaddingProps,
  PositionProps,
  SizeProps,
  SpacingValue,
  TextTransformProps,
} from 'types/ui'

export const isIos = Platform.OS === 'ios'
export const screenWidth = Dimensions.get('screen').width
export const screenHeight = Dimensions.get('screen').height

export function checkIsNil(
  val: string | number | bigint | boolean | symbol | undefined | null | object | Function,
): boolean {
  if (typeof val === 'undefined' || val === null) {
    return true
  }

  return false
}

function isElement(icon: IconProp): icon is JSX.Element {
  return isValidElement(icon)
}

export const renderIcon = (Icon: IconProp, props?: SvgProps) =>
  isElement(Icon) ? Icon : <Icon {...props} />

export const getSpacingValue = (spacingValue: Maybe<SpacingValue>, theme: DefaultTheme) => {
  if (checkIsNil(spacingValue)) {
    return undefined
  }

  if (typeof spacingValue === 'number') {
    return spacingValue
  }

  return theme.spacings[spacingValue as SpacingValue]
}

export const getColorValue = (colorKey: Maybe<ColorKey>, theme: DefaultTheme) =>
  colorKey ? theme.colors[colorKey] : undefined

export const commonMarginProps = css<MarginProps>`
  ${({ m, theme }) => m && `margin: ${getSpacingValue(m, theme)}px`};
  ${({ mh, theme }) => mh && `margin-horizontal: ${getSpacingValue(mh, theme)}px`};
  ${({ mv, theme }) => mv && `margin-vertical: ${getSpacingValue(mv, theme)}px`};
  ${({ mb, theme }) => mb && `margin-bottom: ${getSpacingValue(mb, theme)}px`};
  ${({ mt, theme }) => mt && `margin-top: ${getSpacingValue(mt, theme)}px`};
  ${({ mr, theme }) => mr && `margin-right: ${getSpacingValue(mr, theme)}px`};
  ${({ ml, theme }) => ml && `margin-left: ${getSpacingValue(ml, theme)}px`};
`

export const commonPaddingProps = css<PaddingProps>`
  ${({ p, theme }) => p && `padding: ${getSpacingValue(p, theme)}px`};
  ${({ ph, theme }) => ph && `padding-horizontal: ${getSpacingValue(ph, theme)}px`};
  ${({ pv, theme }) => pv && `padding-vertical: ${getSpacingValue(pv, theme)}px`};
  ${({ pb, theme }) => pb && `padding-bottom: ${getSpacingValue(pb, theme)}px`};
  ${({ pt, theme }) => pt && `padding-top: ${getSpacingValue(pt, theme)}px`};
  ${({ pr, theme }) => pr && `padding-right: ${getSpacingValue(pr, theme)}px`};
  ${({ pl, theme }) => pl && `padding-left: ${getSpacingValue(pl, theme)}px`};
`

export const commonBorderRadiusProps = css<BorderRadiusProps>`
  ${({ br }) => typeof br === 'number' && `border-radius: ${br}px`};
  ${({ brbr }) => typeof brbr === 'number' && `border-bottom-right-radius: ${brbr}px`};
  ${({ brtr }) => typeof brtr === 'number' && `border-top-right-radius: ${brtr}px`};
  ${({ brbl }) => typeof brbl === 'number' && `border-bottom-left-radius: ${brbl}px`};
  ${({ brtl }) => typeof brtl === 'number' && `border-top-left-radius: ${brtl}px`};
  ${({ bw }) => typeof bw === 'number' && `border-width: ${bw}px`};
  ${({ bbw }) => typeof bbw === 'number' && `border-bottom-width: ${bbw}px`};
  ${({ bc, theme }) => bc && `border-color: ${getColorValue(bc, theme)}`};
`

export const sizeProps = css<SizeProps>`
  ${({ height }) => typeof height === 'number' && `height: ${height}px`};
  ${({ width }) => typeof width === 'number' && `width: ${width}px`};
  ${({ minHeight }) => typeof minHeight === 'number' && `min-height: ${minHeight}px`};
  ${({ minWidth }) => typeof minWidth === 'number' && `min-width: ${minWidth}px`};
`

export const positionProps = css<PositionProps>`
  ${({ position }) => position && `position: ${position}`};
  ${({ theme, top }) => !checkIsNil(top) && `top: ${getSpacingValue(top, theme)}px`};
  ${({ theme, bottom }) => !checkIsNil(bottom) && `bottom: ${getSpacingValue(bottom, theme)}px`};
  ${({ theme, left }) => !checkIsNil(left) && `left: ${getSpacingValue(left, theme)}px`};
  ${({ theme, right }) => !checkIsNil(right) && `right: ${getSpacingValue(right, theme)}px`};
  ${({ zIndex }) => typeof zIndex === 'number' && `z-index: ${zIndex}`};
`

export const backgroundProps = css<BackgroundProps>`
  ${({ bg, theme }) => bg && `background-color: ${getColorValue(bg, theme)};`}
  ${({ opacity }) => opacity && `opacity: ${opacity};`}
`

export const getTextTransform = ({
  uppercase,
  lowercase,
  capitalize,
}: TextTransformProps): string => {
  if (uppercase) {
    return 'uppercase'
  }

  if (lowercase) {
    return 'lowercase'
  }

  if (capitalize) {
    return 'capitalize'
  }

  return 'none'
}

export const getTextDecoration = ({
  crossed,
}: TextTransformProps): CSSProperties['textDecoration'] => (crossed ? 'line-through' : undefined)

export const formatTiming = (sec: number) => {
  if (sec < 59) {
    return '00:' + (sec > 9 ? sec : `0${sec}`)
  } else {
    return null
  }
}

export const valueWithCurrencySymbol = (str: string | undefined, symbol: string | undefined) => {
  if (symbol && str?.includes(symbol)) {
    return str
  } else {
    return str?.replace(new RegExp(`(.){0}`), `$&${symbol}`)
  }
}

export const formatCurrency = (str: string | undefined, symbol: string | undefined) => {
  const val =
    str === symbol || str === '' ? '' : valueWithCurrencySymbol(numbersWithDot(str), symbol)

  return val
}

export const upFirstSymbol = (str: string) =>
  str.replace(/( |^)[a-z]/g, function (x) {
    return x.toUpperCase()
  })

export const startSymbol = (str: string | undefined, symbol: string | undefined) =>
  str?.replace(new RegExp(`(.){0}`), `$&${symbol}`)

const removeRestDots = (str: string) => {
  let isFirstDot = true
  return str.replace(/\./g, () => {
    if (isFirstDot) {
      isFirstDot = false
      return '.'
    }
    return ''
  })
}
export const numbersWithDot = (str: string) =>
  removeRestDots(str.replace(',', '.').replace(/[^.\d]/g, ''))

export const withoutSpaces = (str: string) => str.replace(/\s/g, '')

export const numberWithSpaces = (x: number | string) => {
  const parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return parts.join('.')
}

export const formatExchangeCurrency = (
  str: string | undefined,
  symbol: string | undefined,
  operationSymbol: string,
) => {
  const symbolsPart = `${operationSymbol}${symbol}`
  const defaultCondition = str === symbolsPart || str === ''
  const formatStr = startSymbol(numbersWithDot(str), symbolsPart)
  const val = defaultCondition ? '' : formatStr
  return val?.startsWith(symbolsPart + '00') ? '' : val
}

export const formatExchangeWithCourse = (
  str: string | undefined,
  course: number,
  inverse?: boolean,
) => {
  const withCourse = !inverse ? +numbersWithDot(str) * course : +numbersWithDot(str) / course
  const result = withCourse !== 0 ? withCourse?.toFixed(2)?.toString() : ''
  return result
}

export const formatToCapitalize = (str: string, forEachWord?: boolean) => {
  if (forEachWord) {
    const words = str.split(' ')
    return words.map(word => word.slice(0, 1).toLocaleUpperCase() + word.slice(1)).join(' ')
  }

  return str.slice(0, 1).toLocaleUpperCase() + str.slice(1)
}

export const createTextLogo = (name: string) => {
  const words = name?.split(' ')

  return words
    .slice(0, Math.min(words.length, 2))
    .map(word => word.slice(0, 1))
    .join('')
}
