import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  AccountFieldSection,
  AccountHeader,
  AccountPicker,
  Button,
  Column,
  SmallBackground,
} from 'components'
import * as Clipboard from 'expo-clipboard'
import useClients from 'hooks/useClients'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DashboardStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { MappedAccount } from 'types/mapped/account'
import { getAccountDetailsCertificate } from 'utils/apiQueries/account'
import { Account } from 'utils/currencies'
import { SECTION_FIELD_TYPE } from 'utils/enum'
import { I18N_NAMESPACES } from 'utils/i18n'

function AccountDetails() {
  const { goBack, navigate, setParams } = useNavigation<NavigationProp<DashboardStackParamList>>()
  const { params } = useRoute<RouteProp<DashboardStackParamList, ROUTES.AccountDetails>>()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)

  const insets = useSafeAreaInsets()
  const { selectedClient } = useClients()

  const customAccounts = useMemo(() => selectedClient?.accounts || [], [selectedClient?.accounts])

  const defFromAccount = useMemo(
    () =>
      customAccounts?.find(it => it.accountNumber === params?.from?.accountNumber) ||
      customAccounts?.[0],
    [customAccounts, params],
  )

  const [selectedAccount, setSelectedAccount] = useState<MappedAccount>(
    params?.from?.accountNumber ? params?.from : customAccounts[0],
  )

  useEffect(() => {
    if (defFromAccount) {
      setSelectedAccount(defFromAccount)
    }
  }, [defFromAccount])

  const onSelectAccount = useCallback(
    (account: Account) => {
      const selAccount = customAccounts?.find((it: Account) => it.id === account?.id)
      if (selAccount) {
        setSelectedAccount(selAccount)
        setParams({ from: selAccount })
      }
    },
    [customAccounts, setParams],
  )

  const onEdit = useCallback(
    field => async () => {
      if (field.type === SECTION_FIELD_TYPE.EDIT) {
        navigate(ROUTES.EditField, { ...field })
        return
      }
      await Clipboard.setStringAsync(field.value)
    },
    [navigate],
  )

  const onShare = useCallback(async () => {
    if (selectedAccount?.accountNumber) {
      const accountDetailsCertificate = await getAccountDetailsCertificate(
        selectedAccount.accountNumber,
      )

      const fileName = `${t('ACCOUNT_DETAILS_FILE_NAME')}_${selectedAccount.accountNumber}`

      navigate(ROUTES.DocumentPreview, { fileName, file: accountDetailsCertificate })
    }
  }, [navigate, selectedAccount?.accountNumber, t])

  return (
    <Wrapper pb={insets.bottom}>
      <SmallBackground>
        <AccountHeader title={t('ACCOUNT_DETAILS')} onBack={goBack} />
      </SmallBackground>
      <ScrollWrapper>
        <Column>
          <AccountPicker
            accounts={customAccounts}
            initialAccount={selectedAccount}
            onSelect={onSelectAccount}
          />
          {selectedAccount?.fields?.map((field: any, index: number) => (
            <AccountFieldSection
              alignItems="flex-end"
              {...field}
              key={`${selectedAccount.accountNumber}-${index}`}
              onAction={onEdit(field)}
            />
          ))}
        </Column>
        <Button onPress={onShare} title="Get details" />
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    padding: 20,
  },
}))``

export default memo(AccountDetails)
