import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { BodySmall } from 'components/typography/BodySmall'
import React, { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { ColorKey, LayoutItemProps } from 'types/ui'

interface TabProps {
  tab: string
  activeTab?: string | undefined
  onSelectTab: (name: string) => void
  filter?: boolean | undefined
}

export type TabOptions = Pick<LayoutItemProps, 'bg' | 'height' | 'ph' | 'bw' | 'bc'> & {
  color?: ColorKey
}

export const Tab = memo((props: TabProps & LayoutItemProps) => {
  const { tab, filter = false, activeTab, onSelectTab } = props
  const currentTabIsSelected = useMemo(() => tab === activeTab, [activeTab, tab])
  const onSwitchTab = useCallback(() => onSelectTab(tab), [onSelectTab, tab])

  const { color, bg }: TabOptions = useMemo(() => {
    if (filter) {
      return {
        bg: currentTabIsSelected ? 'white' : 'transparent',
        color: currentTabIsSelected ? 'purple' : 'lightMagentaPink',
      }
    } else {
      return {
        bg: currentTabIsSelected ? 'black' : 'transparent',
        color: currentTabIsSelected ? 'white' : 'midGray',
      }
    }
  }, [filter, currentTabIsSelected])

  return (
    <Container bg={bg} onPress={onSwitchTab}>
      <BodySmall color={color} bold={currentTabIsSelected}>
        {tab}
      </BodySmall>
    </Container>
  )
})

const Container = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`
