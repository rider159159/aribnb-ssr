
import { http } from "../utils/http";
import airbnb from '../db'

export function fetchRoomList() {
  return http.httpGet('/api/room/room/getRoomList?pageNo=1&pageSize=2')
}

export async function fetchRyderList() {
  await airbnb.airbnbDB.openStore({ Ryder: { keyPath: 'id', indexs: ['nose', 'ear'] } })
  const result = await airbnb.airbnbDB.getList('Ryder').then(res => {
    return { code: '000000', message: '操作成功', result: res, success: true }
  })
  return result
}