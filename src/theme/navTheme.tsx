import { DefaultTheme } from '@react-navigation/native'

export const defaultNavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
}

export const defaultScreenOptions = {
  cardStyle: { backgroundColor: 'transparent', shadowColor: 'transparent' },
}
