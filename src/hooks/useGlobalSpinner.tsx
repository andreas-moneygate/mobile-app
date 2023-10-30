import { useCallback, useContext } from 'react'
import { SpinnerContext } from 'state/contexts'

const useGlobalSpinner = () => {
  const { show, options, setShow, setOptions } = useContext(SpinnerContext)

  const showGlobalSpinner = useCallback(
    (options: any) => {
      setShow(true)
      if (options) {
        setOptions(options)
      }
    },
    [setOptions, setShow],
  )

  const hideGlobalSpinner = useCallback(() => {
    setShow(false)
  }, [setShow])

  return { show, options, showGlobalSpinner, hideGlobalSpinner }
}

export default useGlobalSpinner
