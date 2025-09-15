enum StorageType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(storageType: StorageType) {
    // localStorage vs sessionStorage:localStorage相比于sessionStorage更能够进行持久化保存 sessionStorage的状态保存和会话的状态息息相关
    this.storage =
      storageType === StorageType.Local ? localStorage : sessionStorage
  }

  getItem(key: string) {
    const value = this.storage.getItem(key)
    // 获取时还是需要考虑到对象的问题 因为对象是转换成字符串后保存的 因此我们需要还原对象并获取
    if (value) return JSON.parse(value)
  }

  // storage保存的都是字符串键值对 为了保证对象存入时可以正常保存 我们需要将对象处理成字符串在进行保存为妥
  setItem(key: string, value: any) {
    // 原生的set方法不够健壮 我们需要进行边界检查后在设置
    // 这里注意 如果单纯写成value 则他会过滤掉false值 但是我们有保存false到storage的需求 所以需要将判断范围缩小为undefined才行
    if (value !== undefined) {
      console.log(value)
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  // get/set方法不够健壮 需要进行边界检查 但是我们的remove/clear方法很健壮 无需进行边界检查
  removeItem(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

// 尽量不要和localStorage/sessionStorage命名冲突
const localCache = new Cache(StorageType.Local)
const sessionCache = new Cache(StorageType.Session)

export { localCache, sessionCache }
