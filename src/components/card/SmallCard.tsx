import { Centered } from 'components/layout/Centered'
import { Body } from 'components/typography/Body'
import { Caption } from 'components/typography/Caption'
import { LinearGradient } from 'expo-linear-gradient'
import { memo, useMemo } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { gradients } from 'theme/gradients'
import { LayoutItemProps, SvgComponent } from 'types/ui'
import { renderIcon } from 'utils/ui'

interface SmallCard {
  title: string
  beneficiaryName?: string
  icon?: SvgComponent | JSX.Element | undefined
  onPress: () => void
}

export const SmallCard = memo((props: SmallCard & LayoutItemProps) => {
  const { title, beneficiaryName, icon, onPress, ...restProps } = props
  const txtLogo = useMemo(() => beneficiaryName?.match(/[A-Z]/gu)?.slice(0, 2), [beneficiaryName])
  return (
    <TouchableOpacity onPress={onPress}>
      <Card {...restProps}>
        <Gradient
          colors={gradients.logo.colors}
          start={[1, 1]}
          end={[0, 0]}
          locations={gradients.logo.locations}
        >
          {icon ? <Icon>{renderIcon(icon)}</Icon> : <Body color="white">{txtLogo}</Body>}
        </Gradient>
        <Title numberOfLines={2}>{title}</Title>
      </Card>
    </TouchableOpacity>
  )
})

const Card = styled(Centered)``

const Gradient = styled(LinearGradient)`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 40px;
  width: 40px;
`

const Icon = styled(Centered)`
  height: 40px;
  width: 40px;
  border-radius: 10px;
`

const Title = styled(Caption)`
  width: 80px;
  margin-top: ${({ theme }) => theme.spacings.xs}px;
  text-align: center;
`
