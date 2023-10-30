import { Tab } from 'components/elements/Tab'
import { Row } from 'components/layout/Row'
import React, { memo } from 'react'
import styled from 'styled-components'
import { LayoutItemProps } from 'types/ui'

interface TabsViewProps {
  tabs: string[]
  activeTab?: string | undefined
  onSelectTab: (name: string) => void
  filter?: boolean
}

export const TabsView = memo((props: TabsViewProps & LayoutItemProps) => {
  const { tabs = [], activeTab = tabs[0] || undefined, onSelectTab, filter, ...restProps } = props

  return (
    <Tabs bg={filter ? 'white10' : 'lightGray'} {...restProps}>
      {tabs.map((tab: string, index: number) => (
        <Tab
          tab={tab}
          activeTab={activeTab}
          onSelectTab={onSelectTab}
          key={index}
          filter={filter}
        />
      ))}
    </Tabs>
  )
})

const Tabs = styled(Row)`
  border-radius: 8px;
  width: 100%;
  height: 35px;
`
