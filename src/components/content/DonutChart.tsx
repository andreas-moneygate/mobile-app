import { ExpenditureCategory } from 'components/elements/ExpenditureСategory'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodyLarge } from 'components/typography/BodyLarge'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import usePrice from 'hooks/usePrice'
import { memo } from 'react'
import { FlexStyle } from 'react-native'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { VictoryNumberCallback } from 'victory-core/src/types/callbacks'
import { VictoryStyleInterface } from 'victory-core/src/victory-theme/types'
import { VictoryPie } from 'victory-native'

interface DonutPieProps {
  data: any[]
  containerStyle?: object
  width?: number
  height?: number
  innerRadius?: number
  radius?: number | VictoryNumberCallback
  donutPieStyle?: VictoryStyleInterface
  dataAnalytics?: any
  summaryList?: boolean
}

export const DonutChart = memo<LayoutItemProps & DonutPieProps & FlexStyle>(props => {
  const {
    data,
    width,
    height,
    radius,
    innerRadius,
    dataAnalytics,
    summaryList = false,
    donutPieStyle,
    ...restProps
  } = props
  const { category, currencySymbol, percent, balance } = dataAnalytics
  const { ceilPart, fractionalPart } = usePrice(balance)

  return (
    <Column flex={1} {...restProps}>
      <Centered>
        <VictoryPie
          data={data}
          width={width ?? 280}
          height={height ?? 280}
          innerRadius={innerRadius ?? 75}
          radius={radius ?? 140}
          labels={[]}
          style={{
            data: {
              fill: ({ datum }) => datum.fill,
            },
            ...donutPieStyle,
          }}
        />
        {dataAnalytics && (
          <TxtContainer>
            <Caption>{category}</Caption>
            <Row mv="xs">
              <Balance>
                {currencySymbol}
                {ceilPart}
              </Balance>
              <BodySmall pt="xs" color="midGray">
                .{fractionalPart}
              </BodySmall>
            </Row>
            <Percent>{percent}%</Percent>
          </TxtContainer>
        )}
      </Centered>
      {summaryList && (
        <List>
          {data.map((item: any, index: number) => (
            <ExpenditureCategory
              color={item.fill}
              y={item.y}
              name={item.name}
              index={index}
              key={item.name}
            />
          ))}
        </List>
      )}
    </Column>
  )
})

const TxtContainer = styled(Column)`
  position: absolute;
  align-items: center;
  justify-content: center;
`

const Balance = styled(BodyLarge)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.purple};
  padding-top: ${({ theme }) => theme.spacings.xs}px;
`

const Percent = styled(BodySmall)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.purple25};
`

const List = styled(Column)`
  margin-top: ${({ theme }) => theme.spacings.xxl}px;
  width: 100%;
`
