
import { http } from "../utils/http";

export function fetchRoomList() {
  return http.httpGet('/api/room/room/getRoomList?pageNo=1&pageSize=2')
}
