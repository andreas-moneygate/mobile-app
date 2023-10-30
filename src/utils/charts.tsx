import colors from 'theme/colors'

const donutColors = [
  colors.purple95,
  colors.purple85,
  colors.purple75,
  colors.purple55,
  colors.purple45,
  colors.purple35,
  colors.purple25,
  colors.purple15,
]

export const renderLineDomain = (data: any) => {
  const maxValueOfY = Math.max(...data.map((o: any) => o.y))
  const minValueOfY = Math.min(...data.map((o: any) => o.y))
  const maxValueOfX = Math.max(...data.map((o: any) => o.x))
  const minValueOfX = Math.min(...data.map((o: any) => o.x))
  return { x: [minValueOfX, maxValueOfX], y: [minValueOfY, maxValueOfY] }
}

export const calcPercentage = (credit: number, debit: number) => {
  const full = parseFloat((credit + debit).toFixed(2))

  const creditPercentage = Math.round((100 * credit) / full) || 0
  const debitPercentage = Math.round((100 * debit) / full) || 0

  return [creditPercentage, debitPercentage]
}

export const getDonutColor = (index: number, colorsLength: number) => {
  if (index > donutColors.length) {
    return donutColors[donutColors.length % index]
  }
  if (colorsLength <= donutColors.length / 4) {
    return donutColors[index * 4]
  }
  if (colorsLength <= donutColors.length / 2) {
    return donutColors[index * 2]
  }
  return donutColors[index] || donutColors[0]
}
