import { Operation, OperationProps } from 'components/elements/Operation'
import { Row } from 'components/layout/Row'
import { memo } from 'react'
import ROUTES from 'routes/RouteNames'
import { LayoutItemProps } from 'types/ui'

interface ListProps {
  data: any
  containerStyle?: object
  onOpen: (title: string) => void
  accounts?: any
}

export const OperationsList = memo<LayoutItemProps & ListProps>(props => {
  const { data, onOpen, accounts, ...containerStyle } = props

  return (
    <Row justifyContent="space-evenly" {...containerStyle}>
      {data.map((operation: OperationProps) => (
        <Operation
          title={operation.title}
          icon={operation.icon}
          type={operation.type}
          key={operation.title}
          onPress={onOpen}
          disabled={operation.title === ROUTES.Exchange && accounts.length < 2}
        />
      ))}
    </Row>
  )
})
