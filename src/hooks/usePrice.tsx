import { useMemo } from 'react'

function usePrice(balance: number) {
  const ceilPart = useMemo(
    () => Number(Math.abs(balance).toFixed(2).split('.')[0]).toLocaleString(),
    [balance],
  )

  const fractionalPart = useMemo(() => Math.abs(balance).toFixed(2).split('.')[1], [balance])

  const isPositive = useMemo(() => balance >= 0, [balance])

  const res = useMemo(
    () => ({ ceilPart, fractionalPart, isPositive }),
    [ceilPart, fractionalPart, isPositive],
  )

  return res
}

export default usePrice
