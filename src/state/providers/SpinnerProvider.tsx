import { ComponentProps, FC, useMemo, useState } from 'react'
import { SpinnerContext } from 'state/contexts/SpinnerContext'

export const SpinnerProvider = ({ children }: ComponentProps<FC>) => {
  const [show, setShow] = useState(false)

  const [options, setOptions] = useState({ type: 'withLogo' })

  const contextSpinner = useMemo(() => ({ show, setShow, options, setOptions }), [options, show])

  return <SpinnerContext.Provider value={contextSpinner}>{children}</SpinnerContext.Provider>
}
