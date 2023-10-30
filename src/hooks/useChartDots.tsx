import { useMemo } from 'react'

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const formatFakeChartData = (length: number) =>
  Array.from({ length: length })?.map((_, index) => ({
    x: index,
    y: getRandomArbitrary(0.95, 1.01),
  }))

const useChartDots = () =>
  useMemo(
    () => [
      {
        '1d': formatFakeChartData(12),
      },
      {
        '1w': formatFakeChartData(12 * 10),
      },
      {
        '1m': formatFakeChartData(12 * 11),
      },
      {
        '3m': formatFakeChartData(12 * 12),
      },
      {
        '6m': formatFakeChartData(12 * 13),
      },
      {
        '1y': formatFakeChartData(12 * 14),
      },
    ],
    [],
  )

export default useChartDots
