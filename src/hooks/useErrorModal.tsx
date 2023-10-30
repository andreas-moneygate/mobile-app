import { useCallback, useState } from 'react'

const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null)

  const showErrorModal = useCallback((error: unknown) => {
    if (typeof error === 'string') {
      return setError(error)
    }

    if (error?.payload?.errors && Object.keys(error.payload.errors).length) {
      const errors = Object.values(error.payload.errors)
      return setError(errors[0])
    }

    if (error?.payload?.title && typeof error?.payload?.title === 'string') {
      return setError(error.payload.title)
    }

    if (error?.payload?.error_description) {
      return setError(error.payload.error_description)
    }

    if (error?.status === 422) {
      if (error?.payload?.bulkTransfersDetails) {
        const item = error.payload.bulkTransfersDetails?.find(item => item?.errors)
        const message = Object.values(item?.errors)[0][0]
        return setError(message)
      }
    }

    console.log('UNHANDLED ERROR >> ', error)
    setError('Oops! Something went wrong.')
  }, [])

  const hideErrorModal = useCallback(() => {
    setError(null)
  }, [])

  return { error, showErrorModal, hideErrorModal }
}

export default useErrorHandler
