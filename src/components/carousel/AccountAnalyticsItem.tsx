import { DonutChart } from 'components/content/DonutChart'
import { memo } from 'react'

interface Item {
  y: number
  name: string
  fill: string
}
interface Props {
  item: Item
  index: number
  graphicData: Array<Item>
}

export const AccountAnalyticsItem = memo(({ item, index, graphicData }: Props) => (
  <DonutChart
    data={graphicData}
    radius={({ datum }) => (datum.name === graphicData[index].name ? 140 : 120)}
    alignItems="center"
    mv={60}
    dataAnalytics={item}
  />
))
