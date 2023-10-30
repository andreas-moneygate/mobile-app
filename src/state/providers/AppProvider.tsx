import { ComponentProps, FC } from 'react'

import { ClientProvider } from './ClientProvider'
import { FiltersProvider } from './FiltersProvider'
import { SpinnerProvider } from './SpinnerProvider'
import UserProvider from './UserProvider'

const combineComponents = (...components: Array<FC>): FC =>
  components.reduce(
    (AccumulatedComponents, CurrentComponent) =>
      ({ children }: ComponentProps<FC>): JSX.Element =>
        (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        ),

    ({ children }) => <>{children}</>,
  )

const providers = [UserProvider, SpinnerProvider, ClientProvider, FiltersProvider]

export const AppProvider = combineComponents(...providers)
