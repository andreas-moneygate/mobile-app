import { useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { useTheme } from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { checkIsNil, getColorValue, getSpacingValue } from 'utils/ui'

function useSortedStyleProps<T extends LayoutItemProps>(
  props: T,
): Omit<T, keyof Omit<LayoutItemProps, 'children'>> & {
  style: StyleProp<ViewStyle>
} {
  const {
    p,
    pv,
    ph,
    pt,
    pb,
    pl,
    pr,
    m,
    mv,
    mh,
    mt,
    mb,
    ml,
    mr,
    bg,
    style,
    flex,
    brbl,
    brbr,
    br,
    brtl,
    brtr,
    bw,
    bc,
    opacity,
    width,
    height,
    justifyContent,
    alignItems,
    alignSelf,
    top,
    bottom,
    left,
    right,
    position,
    zIndex,
    overflow,
    ...rest
  } = props

  const theme = useTheme()

  const updatedStyle = useMemo<StyleProp<ViewStyle>>(() => {
    const convertedStyle: ViewStyle = {
      alignItems,
      alignSelf,
      backgroundColor: getColorValue(bg, theme),
      borderBottomLeftRadius: brbl,
      borderBottomRightRadius: brbr,
      borderRadius: br,
      borderTopLeftRadius: brtl,
      borderTopRightRadius: brtr,
      borderWidth: bw,
      borderColor: getColorValue(bc, theme),
      bottom: getSpacingValue(bottom, theme),
      flex,
      height,
      justifyContent,
      left: getSpacingValue(left, theme),
      margin: getSpacingValue(m, theme),
      marginBottom: getSpacingValue(mb, theme),
      marginHorizontal: getSpacingValue(mh, theme),
      marginLeft: getSpacingValue(ml, theme),
      marginRight: getSpacingValue(mr, theme),
      marginTop: getSpacingValue(mt, theme),
      marginVertical: getSpacingValue(mv, theme),
      opacity,
      overflow,
      padding: getSpacingValue(p, theme),
      paddingBottom: getSpacingValue(pb, theme),
      paddingHorizontal: getSpacingValue(ph, theme),
      paddingLeft: getSpacingValue(pl, theme),
      paddingRight: getSpacingValue(pr, theme),
      paddingTop: getSpacingValue(pt, theme),
      paddingVertical: getSpacingValue(pv, theme),
      position,
      right: getSpacingValue(right, theme),
      top: getSpacingValue(top, theme),
      width,
      zIndex,
    }

    const newConvertedStyle = Object.entries(convertedStyle).reduce<Partial<ViewStyle>>(
      (acc, [key, val]) => {
        if (!checkIsNil(val)) {
          acc[key as keyof ViewStyle] = val
        }
        return acc
      },
      {},
    )

    return [newConvertedStyle, style]
  }, [
    alignItems,
    alignSelf,
    bg,
    bc,
    bw,
    theme,
    brbl,
    brbr,
    br,
    brtl,
    brtr,
    bottom,
    flex,
    height,
    justifyContent,
    left,
    m,
    mb,
    mh,
    ml,
    mr,
    mt,
    mv,
    opacity,
    p,
    pb,
    ph,
    pl,
    pr,
    pt,
    pv,
    position,
    overflow,
    right,
    top,
    width,
    zIndex,
    style,
  ])

  return { ...rest, style: updatedStyle }
}

export default useSortedStyleProps
