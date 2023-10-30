import useSortedStyleProps from 'hooks/useSortedStyleProps'
import React, { memo, useMemo } from 'react'
import { StatusBar, ViewStyle } from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import styled, { DefaultTheme } from 'styled-components/native'
import { LayoutItemProps, Maybe } from 'types/ui'

type ContainerType = 'default' | 'secondary' | 'transparent'

export type ContainerProps = {
  safe?: boolean
  safeTop?: boolean
  safeBottom?: boolean
  style?: ViewStyle
  darkBarStyle?: boolean
} & LayoutItemProps &
  WrapperProps

type WrapperProps = {
  type?: ContainerType
}

export const Container = memo<ContainerProps>(
  ({ safe, safeTop, safeBottom, darkBarStyle, children, ...props }) => {
    const edges = useMemo<Maybe<Edge[]>>(() => {
      if (safe || (safeBottom && safeTop)) {
        return ['top', 'bottom']
      }

      if (safeTop) {
        return ['top']
      }

      if (safeBottom) {
        return ['bottom']
      }
    }, [safe, safeBottom, safeTop])

    const styledProps = useSortedStyleProps(props)

    return (
      <StyledSafeAreaView edges={edges || []} {...styledProps}>
        <StatusBar
          barStyle={darkBarStyle ? 'dark-content' : 'light-content'}
          translucent
          backgroundColor="transparent"
        />
        {children}
      </StyledSafeAreaView>
    )
  },
)

const StyledSafeAreaView = styled(SafeAreaView)<WrapperProps>`
  background-color: ${({ theme, type }) => getBackgroundByType(type, theme)};
  flex: 1;
`

const getBackgroundByType = (type: Maybe<ContainerType>, theme: DefaultTheme) => {
  if (type === 'secondary') {
    return theme.colors.white
  } else if (type === 'transparent') {
    return 'transparent'
  }

  return theme.colors.lightGray
}
