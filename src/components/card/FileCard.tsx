import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { memo, useMemo } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { renderIcon } from 'utils/ui'

interface FileCardProps {
  name: string
  size: number | any
  onDelete?: () => void
}

export const FileCard = memo<FileCardProps & LayoutItemProps>(props => {
  const { size, name, onDelete, ...restProps } = props
  const {
    colors: { purple85 },
  } = useTheme()
  const formatSize = useMemo(() => `${(size / 1024).toFixed(0)} KB`, [size])

  return (
    <Card {...restProps} ph="s">
      {renderIcon(icons.document)}
      <Column ml="s" flex={1}>
        <Row justifyContent="space-between">
          <File flex={1} mr="s" numberOfLines={1}>
            {name}
          </File>
          <IconButton icon={icons.close} iconColor={purple85} onPress={onDelete} />
        </Row>
        <Caption color="darkGray">{formatSize}</Caption>
      </Column>
    </Card>
  )
})

const Card = styled(Row)`
  height: 55px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray85};
  background-color: ${({ theme }) => theme.colors.mintCream};
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  flex: 1px;
`

const File = styled(BodySmall)`
  font-weight: 500;
`
