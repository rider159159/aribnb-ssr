
import { http } from "../utils/http";
import IndexedDB from "../utils/indexedDB"

const airbnbDb = new IndexedDB('airbnb')

export function fetchRoomList() {
  return http.httpGet('/api/room/room/getRoomList?pageNo=1&pageSize=2')
}

// export async function fetchRyderList() {
//   await airbnbDb.openStore('room', 'id', ['Ryder', 'test'])
//   await airbnbDb.getList('room')
// }