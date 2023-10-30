import { memo } from 'react'
import { VictoryChart, VictoryLabel, VictoryLine } from 'victory-native'

interface LineChartProps {
  data: any[]
  domain: any
}

export const LineChart = memo((props: LineChartProps) => {
  const { data, domain } = props
  return (
    <VictoryChart padding={0} height={235} theme={axisStyle}>
      <VictoryLine animate domain={domain} style={chartStyle} data={data} />
      <VictoryLine
        domain={domain}
        y={() => 1}
        style={labelLine}
        labelComponent={<VictoryLabel dx={0} dy={1} />}
      />
    </VictoryChart>
  )
})

const axisStyle = {
  axis: {
    style: {
      axis: { strokeWidth: 0 },
      grid: { strokeWidth: 0 },
    },
  },
}

const chartStyle = {
  data: { stroke: '#FB7021' },
}

const labelLine = {
  data: {
    stroke: '#AAAAAA',
    strokeWidth: 1,
    strokeDasharray: '4 1',
  },
}
