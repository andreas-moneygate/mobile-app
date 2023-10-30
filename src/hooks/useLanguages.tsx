import icons from 'assets/icons'
import { useMemo } from 'react'

const useLanguages = () =>
  useMemo(() => {
    return [
      { value: 'en', label: 'English', icon: icons.flagGBP, id: 1 },
      { value: 'el', label: 'Greek', icon: icons.flagEuro, id: 2 },
    ]
  }, [])

export default useLanguages
