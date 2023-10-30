import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import images from 'assets/images'
import { Background } from 'components'
import { useContext } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ROUTES from 'routes/RouteNames'
import {
  Account,
  AccountDetails,
  AccountStatement,
  ChangePassword,
  ClientStatement,
  ContactUs,
  DocumentPreview,
  EditField,
  FeeStatement,
  Home,
  MessageSent,
  NotificationsList,
  PersonalInfo,
  SearchTransaction,
  Settings,
} from 'screens/DashboardFlow'
import {
  EmailSend,
  EnterPin,
  ForgottenPassScreen,
  Login,
  OneTimePassword,
  ResetPassword,
  SuccessPassword,
} from 'screens/LoginFlow'
import {
  AddTransactionToFavorites,
  ConfirmTransfer,
  CreatePayment,
  CurrencyRates,
  EnterAmount,
  Exchange,
  FavouritesTransactions,
  Filter,
  RatesHistory,
  SuccessTransaction,
  ToAnotherBank,
  ToMoneyGateFirstStep,
  ToMoneyGateSecondStep,
  ToOwnAccount,
  TransactionAddedToFavorites,
  TransactionDetails,
} from 'screens/MoneyTransferFlow'
import BulkFilePayment from 'screens/MoneyTransferFlow/BulkFilePayment'
import BulkFileUpload from 'screens/MoneyTransferFlow/BulkFileUpload'
import { UserContext } from 'state/contexts'
import { defaultNavTheme, defaultScreenOptions } from 'theme/navTheme'

const Stack = createStackNavigator()

const Navigator = () => {
  const { user } = useContext(UserContext)

  return (
    <Background image={images.background}>
      <NavigationContainer theme={defaultNavTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            {user ? (
              <Stack.Navigator
                key={1}
                screenOptions={defaultScreenOptions}
                initialRouteName={ROUTES.Home}
              >
                <Stack.Screen
                  component={NotificationsList}
                  name={ROUTES.NotificationsList}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={EmailSend}
                  name={ROUTES.EmailSend}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={ResetPassword}
                  name={ROUTES.ResetPassword}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={SuccessPassword}
                  name={ROUTES.SuccessPassword}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={EnterPin}
                  name={ROUTES.EnterPin}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={Home}
                  name={ROUTES.Home}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={Account}
                  name={ROUTES.Account}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={ToOwnAccount}
                  name={ROUTES.ToOwnAccount}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={EnterAmount}
                  name={ROUTES.EnterAmount}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={ConfirmTransfer}
                  name={ROUTES.ConfirmTransfer}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={ToAnotherBank}
                  name={ROUTES.ToAnotherBank}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={CreatePayment}
                  name={ROUTES.CreatePayment}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={SuccessTransaction}
                  name={ROUTES.SuccessTransaction}
                  options={{ headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                  component={AddTransactionToFavorites}
                  name={ROUTES.AddTransactionToFavorites}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={TransactionAddedToFavorites}
                  name={ROUTES.TransactionAddedToFavorites}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={ToMoneyGateFirstStep}
                  name={ROUTES.ToMoneyGateFirstStep}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={ToMoneyGateSecondStep}
                  name={ROUTES.ToMoneyGateSecondStep}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={BulkFileUpload}
                  name={ROUTES.BulkFileUpload}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={BulkFilePayment}
                  name={ROUTES.BulkFilePayment}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={FavouritesTransactions}
                  name={ROUTES.FavouritesTransactions}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={TransactionDetails}
                  name={ROUTES.TransactionDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={Filter}
                  name={ROUTES.Filter}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={Exchange}
                  name={ROUTES.Exchange}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={CurrencyRates}
                  name={ROUTES.CurrencyRates}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={RatesHistory}
                  name={ROUTES.RatesHistory}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={EditField}
                  name={ROUTES.EditField}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={Settings}
                  name={ROUTES.Settings}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={PersonalInfo}
                  name={ROUTES.PersonalInfo}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={ChangePassword}
                  name={ROUTES.Password}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={ContactUs}
                  name={ROUTES.ContactUs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={MessageSent}
                  name={ROUTES.MessageSent}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={AccountDetails}
                  name={ROUTES.AccountDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={AccountStatement}
                  name={ROUTES.AccountStatement}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={ClientStatement}
                  name={ROUTES.ClientStatement}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={OneTimePassword}
                  name={ROUTES.OneTimePassword}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={SearchTransaction}
                  name={ROUTES.SearchTransaction}
                  options={{ headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                  component={DocumentPreview}
                  name={ROUTES.DocumentPreview}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={FeeStatement}
                  name={ROUTES.FeeStatement}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator
                key={2}
                screenOptions={defaultScreenOptions}
                initialRouteName={ROUTES.Login}
              >
                <Stack.Screen
                  component={Login}
                  name={ROUTES.Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={ForgottenPassScreen}
                  name={ROUTES.ForgottenPass}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={OneTimePassword}
                  name={ROUTES.OneTimePassword}
                  options={{ headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                  component={ChangePassword}
                  name={ROUTES.Password}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  component={SuccessPassword}
                  name={ROUTES.SuccessPassword}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            )}
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Background>
  )
}

export default Navigator
