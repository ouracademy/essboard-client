import { distanceInWordsToNow } from 'date-fns'
const esLocale = require('date-fns/locale/es')

export const timeAgo = date =>
  distanceInWordsToNow(date, {
    locale: esLocale,
    includeSeconds: true,
    addSuffix: true
  })
