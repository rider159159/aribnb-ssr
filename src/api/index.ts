
import { http } from "../utils/http";
import IndexedDB from "../utils/indexedDB"

const airbnbDb = new IndexedDB('airbnb')

export function fetchRoomList() {
  return http.httpGet('/api/room/room/getRoomList?pageNo=1&pageSize=2')
}

export async function fetchRyderList() {
  await airbnbDb.openStore('room', 'id', ['Ryder', 'test'])
  const result = await airbnbDb.getList('room').then((res)=>{
    return { code:'200', message:'操作成功', result:res, success:true }
  })
  return result
}