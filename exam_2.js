// 先觀察題目給的 JSON 結構：
// 1. 最外層是陣列，陣列中的每個元素都是一個物件
// 2. 物件中的 key 種類眾多，看起來偏向「使用者（User）」資料
// 3. 結合上述兩點，將整包資料命名為 `users`（複數），表示多個使用者資料的集合


// 將 URL 抽成一個「常數」變數：
// 1. 全大寫並用底線分隔
// 2. 看到這種格式的命名，就會知道這變數「恆常不變」
// 3. 方便日後維護（只要修改值就好）
const API_URL = "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";

// 定義主要函式：
// 1. 這個函式只做「一件事」：取得多個使用者資料
// 2. 使用 async/await 來撰寫非同步函式
// 3. API 回傳的是多個使用者資料
// 4. 結合上述幾點，將函式命名為 getUsers（get 對應 GET METHOD）
const getUsers = async () => {
  // 使用 try/catch 來捕捉可能發生的錯誤
  try {
    // 發送請求（request）到 API_URL：
    // 1. 使用 GET 方法取得資料（無需額外撰寫參數）
    // 2. 使用 await 等待（非同步邏輯）結果
    // 3. res 代表 response，即「回傳的資料」
    const res = await fetch(API_URL);

    // 解析回傳（response）的資料：
    // 1. 將 res 解析成 JSON 格式
    // 2. 解析 JSON 為非同步邏輯，因此同樣需要 await
    // 3. 由於「被」解析為 JSON 格式，因此變數命名為 json
    const json = await res.json();

    // 回傳解析後的 JSON 資料
    return json;
  } catch(error) {
    // 如果發生錯誤，將錯誤訊息輸出到主控台（Console）
    console.log(error);

    // 回傳一個空陣列，表示沒有取得任何使用者資料
    return [];
  }
};

// 呼叫 getUsers 函式：
// 1. 將 getUsers return 出來的值存到 users 變數中（變數與函式名稱互相關聯）
// 2. 使用 await 等待（非同步邏輯）結果
// 3. 之後每一題的函式都可以使用這個變數來操作
const users = await getUsers();

// 開始撰寫各道題目