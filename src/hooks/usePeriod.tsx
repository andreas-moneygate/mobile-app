import { useMemo } from 'react'
import { timePeriod } from 'utils/enum'

const usePeriod = () =>
  useMemo(() => {
    return {
      statement: [
        { title: timePeriod.MONTH, id: 1 },
        { title: timePeriod.MM, id: 2 },
        { title: timePeriod.QUARTER, id: 3 },
      ],
      filter: [
        { title: timePeriod.CUSTOM, id: 1 },
        { title: timePeriod.MONTH, id: 2 },
        { title: timePeriod.MM, id: 3 },
      ],
    }
  }, [])

export default usePeriod
