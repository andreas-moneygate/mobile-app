import { INSTANCE } from '@env'

import app from '../../app.json'

export const instance: 'dev' | 'prod' = (INSTANCE as 'dev' | 'prod') || 'prod'

const configs = {
  dev: {
    apiEndpoint: 'https://finapivityhubib.azurewebsites.net/api',
    apiAuthEndpoint: 'https://finapivityidentityserveruat.azurewebsites.net',
    termsFeed: {
      privacy: 'https://www.moneygate.com/cookie-policy-eu/',
      termsAndConditions: 'https://www.moneygate.com/terms-conditions-eu/',
    },
    urls: {
      bulkFileTemplate:
        'https://www.moneygate.com/wp-content/uploads/2022/11/bulktransfersamplefile.csv',
    },
    appVersion: app.expo.version,
  },
  prod: {
    apiEndpoint: 'https://api2.moneygate.com/api',
    apiAuthEndpoint: 'https://auth2.moneygate.com',
    termsFeed: {
      privacy: 'https://www.moneygate.com/cookie-policy-eu/',
      termsAndConditions: 'https://www.moneygate.com/terms-conditions-eu/',
    },
    urls: {
      bulkFileTemplate:
        'https://www.moneygate.com/wp-content/uploads/2022/11/bulktransfersamplefile.csv',
    },
    appVersion: app.expo.version,
  },
}

export default configs[instance]
