import DB from '../utils/indexedDB'
import languageObjectStore from './objectStores/language'
import userObjectStore from './objectStores/user'

// 數據庫
export const airbnbDB = new DB('airbnb')

export default {
  airbnbDB,
  languageObjectStore,
  userObjectStore
}