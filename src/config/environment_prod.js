export const environmentProd = {
  mockEnabled: false,
  appId: '',
  api: {
    name: 'prod',
    mockurl: '',
    defaultEndpoint: {
      url: 'https://run.mocky.io/v3/c2b9b03c-98a4-4384-9dd6-5d8820b6a3d3',
    },
    sameDayDeliveryUrl: 'https://sameday.costco.com/',
    headers: {
      'x-api-key': 'UGNVe7yL211M6TpOs7Vjs2NaOxwth04Y6L93Rxg2',
    },
  },
  lang: {
    defaultLangCd: 'en',
    langType: {
      en: {
        langCode: 'en',
        isRTL: false,
        name: 'English',
      },
      FR: {
        langCode: 'Fr',
        isRTL: true,
        name: 'France',
      },
    },
  },
};
