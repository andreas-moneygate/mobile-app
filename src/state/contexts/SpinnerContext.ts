import { createContext } from 'react'

export const SpinnerContext = createContext({
  show: false,
  options: {
    type: 'withLogo',
  },
  setShow: () => ({}),
  setOptions: () => ({}),
})
