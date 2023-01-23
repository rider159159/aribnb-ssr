export default class DB {
  private dbName: string // 數據庫名稱
  private db: any // 數據庫對象
  constructor(dbName: string) {
    this.dbName = dbName
  }
  // 打開數據庫 open 第二參數(版本)只能往後，否則抱錯
  openStore(storeName: string, keyPath: string, indexs?: Array<string>) { 
    const request = window.indexedDB.open(this.dbName, 2)
    request.onsuccess = (event:any) => {
      console.log('數據庫開啟成功',event)
      this.db = event.target.result 
    }
    request.onerror = (event) => {
      console.log('數據庫開啟失敗',event)
    }
    request.onupgradeneeded = (event) => {
      console.log('數據庫升級成功',event)
      const { result }:any = event.target
      const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })
      if(indexs && indexs.length > 0) {
        indexs.map((v: string) => {
          store.createIndex(v,v,{ unique: false })
        })
      }
      // 數據庫中的集合 (表)
      store.transaction.oncomplete = (e: any)=>{
        console.log('創降數據庫-倉庫成功',e)
      }
    }
  }
  updateItem(storeName: string, data: any) {
    const store = this.db.transaction([storeName],'readwrite').objectStore(storeName)
    const request = store.put({  // put 新增修改即可
      ...data,
      updateTime: new Date().getTime()
    })
    request.onsuccess = (event: any) => {
      console.log('數據寫入成功',event)
    }
    request.onerror = (event: any) => {
      console.log('數據寫入失敗',event)
    }
  }
  deleteItem(storeName: string, key: number|string) {
    const store = this.db.transaction([storeName],'readwrite').objectStore(storeName)
    const request = store.delete(key)
    request.onsuccess = (event: any) => {
      console.log('數據刪除成功',event)
    }
    request.onerror = (event: any) => {
      console.log('數據刪除失敗',event)
    }
  }
  getList(storeName: string) {
    const store = this.db.transaction([storeName],'readwrite').objectStore(storeName)
    const request = store.getAll()
    request.onsuccess = (event: any) => {
      console.log('數據集查詢成功',event.target.result)
    }
    request.onerror = (event: any) => {
      console.log('數據集查詢失敗',event)
    }
  }
  getItem(storeName: string, key: number|string) {
    const store = this.db.transaction([storeName],'readwrite').objectStore(storeName)
    const request = store.get(key)
    request.onsuccess = (event: any) => {
      console.log('查詢單一數據成功',event.target.result)
    }
    request.onerror = (event: any) => {
      console.log('查詢單一數據失敗',event)
    }
  }
}