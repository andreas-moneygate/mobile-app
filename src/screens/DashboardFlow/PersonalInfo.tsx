import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AccountFieldSection, AccountHeader, Column, SmallBackground } from 'components'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DashboardStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { SECTION_FIELD_TYPE } from 'utils/enum'

function PersonalInfo() {
  const { goBack, navigate } = useNavigation<NavigationProp<DashboardStackParamList>>()
  const { params } = useRoute<RouteProp<DashboardStackParamList, ROUTES.PersonalInfo>>()
  const { t } = useTranslation('dashboardFlow')
  const insets = useSafeAreaInsets()
  const { details } = params
  const { data } = details
  const goTo = useCallback((route, params) => navigate(route, params), [navigate])

  const onEdit = useCallback(
    field => () => {
      if (field.type === SECTION_FIELD_TYPE.DETAILS) {
        goTo(ROUTES.EditField, { ...field })
      }
    },
    [goTo],
  )

  return (
    <Wrapper pb={insets.bottom}>
      <SmallBackground>
        <AccountHeader title={t('PERSONAL_INFO')} onBack={goBack} />
      </SmallBackground>
      <ScrollWrapper>
        {data.map((section: any, index: number) => (
          <Column key={index} mb="s">
            {/* <Line /> */}
            {section.fields.map((field: any, i: number) => (
              <AccountFieldSection
                alignItems="center"
                {...field}
                key={i}
                onAction={onEdit(field)}
                ph="l"
              />
            ))}
          </Column>
        ))}
      </ScrollWrapper>
    </Wrapper>
  )
}

const Wrapper = styled(Column)`
  flex: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`

const ScrollWrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))``

const Line = styled(Column)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  height: 10px;
  width: 100%;
`

export default memo(PersonalInfo)
