import 'styled-components/native'

import { Spacings, ThemeColors } from 'types/ui'

export type ThemeType = 'light'
declare module 'styled-components/native' {
  export interface DefaultTheme {
    type: ThemeType
    colors: ThemeColors
    spacings: typeof Spacings
  }
}
