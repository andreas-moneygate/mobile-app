import { DotProgress } from 'components/elements/DotProgress'
import { Centered } from 'components/layout/Centered'
import { memo } from 'react'
import { LayoutItemProps } from 'types/ui'

interface BarProps {
  step: number
  numberOfSteps: number
  line?: boolean
}

export const ProgressBar = memo(
  ({ step = 0, numberOfSteps = 4, line, ...restProps }: BarProps & LayoutItemProps) => (
    <Centered {...restProps}>
      <DotProgress step={step} numberOfSteps={numberOfSteps} line={line} />
    </Centered>
  ),
)
