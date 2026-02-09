// 先觀察題目給的 JSON 結構：
// 1. 最外層是陣列，陣列中的每個元素都是一個物件
// 2. 物件中的 key 種類眾多，看起來偏向「使用者（User）」資料
// 3. 結合上述兩點，將整包資料命名為 `users`（複數），表示多個使用者資料的集合

// 將 URL 抽成一個「常數」變數：
// 1. 全大寫並用底線分隔
// 2. 看到這種格式的命名，就會知道這變數「恆常不變」
// 3. 方便日後維護（只要修改值就好）
const API_URL =
  "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";

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
  } catch (error) {
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

/*
題目一
subject：各學歷人數

output：
{
    "大專院校畢業": 30,
    "碩士畢業": 50,
    ...
}

---

觀察 output 格式（大專院校畢業、30...）並對照 users 中的欄位。

可以發現題目的要求，其實就是「挑出 user.education，並計算各個種類的數量」。
*/

// 宣告題目要求的函式
const a = () => {
  // a 這個函式會包含數個邏輯與步驟，為避免讓函式過長、難以閱讀，我個人習慣：
  // 1. 用「三個部分」來組織程式碼
  // 2. 用「小函式」來拆解邏輯，且每個函式只做「一件事」
  // 3. 撰寫順序：output（先想要什麼結果）-> utils（再想需要哪些工具）-> process（用工具把結果算出來）

  // ------ 1. utils（工具函式） ------

  // 挑出 user.education 欄位：
  // 1. 函式用動詞開頭（get），説明這個函式的行為（挑出）
  // 2. 函式名稱要具體，説明挑出的是什麼欄位（User 的 Educations）
  // 3. 這裡的「參數」 users 是刻意對齊外部的變數 users（説明要傳什麼進來）
  const getUserEducations = (users) => {
    // 一般寫法:
    // 1. 傳進來的參數 users（陣列）會拿來跑 map
    // 2. 每一個 user（物件）都會被處理，並回傳 user.education
    // 3. 最後會組成一個新的陣列 educations
    const educations = users.map((user) => {
      const education = user.education;

      return education;
    });

    // 精簡寫法:
    // const educations = users.map((user) => user.education);

    return educations;
  };

  // 計算 educations 種類與數量：
  // 1. 函式用動詞開頭（count），説明這個函式的行為（計算）
  // 2. 函式名稱要具體，説明計算的是什麼（Educations）
  // 3. 這裡的「參數」 educations 是刻意對齊上一步驟的變數 educations（説明要傳什麼進來）
  const countEducations = (educations) => {
    // 一般寫法:
    // 1. 傳進來的參數 educations（陣列）會拿來跑 reduce
    // 2. 每一個 education（字串，例：'大專院校畢業'）都會被處理，並計算各種類別的數量
    // 3. 累加器命名為 obj（物件），會比 acc 之類的更好理解
    // 4. 最後會組成一個物件 countedEducations（計算後的 Educations）
    const countedEducations = educations.reduce((obj, education) => {
      // obj[education] -> obj['大專院校畢業']
      if (obj[education]) {
        // Truthy：如果'大專院校畢業'在 obj 中已存在
        obj[education]++;
      } else {
        // Falsy：如果'大專院校畢業'在 obj 中不存在
        obj[education] = 1;
      }

      // 精簡寫法:
      // obj[education] ? :

      return obj;

      // 初始值為空物件 {}
    }, {});

    return countedEducations;
  };

  // ------ 2. process（運算結果） ------

  // 挑出 user.education 的欄位：
  // 1. 這裡的 users 會取到 a() 函式外的變數
  // 2. 變數的 educations 命名會對應（函式內 return 什麼，外部就用什麼接）
  const educations = getUserEducations(users);

  // 計算「後」的 educations 種類與數量
  const countedEducations = countEducations(educations);

  // ------ 3. output（輸出結果） ------

  // 印出結果
  console.log(countedEducations);
  // FYI: return countedEducations
};

// 最後別忘了呼叫函式
a();

/*
題目二
subject：各地區工作人士佔比人數

output：
[
    {"台灣 - 北北基": "78%"},
    {"台灣 - 中彰投": "3%"}
    ...
]
*/

// 宣告題目要求的函式
const b = () => {
  // 計算總人數
  const total = users.length;

  // 統計各地區人數
  const areaCount = users.reduce((acc, user) => {
    const area = user.company.area;

    if (!acc[area]) {
      acc[area] = 0;
    }

    acc[area] += 1;
    return acc;
  }, {});

  // map 只能用在「陣列」上，先把「物件 → 陣列」
  // Object.keys 只拿「第一層 key」、回傳陣列
  const result = Object.keys(areaCount).map((area) => {
    // Math.round 把數字「四捨五入」成最接近的整數
    const percent = Math.round((areaCount[area] / total) * 100);

    return {
      [area]: `${percent}%`,
    };
  });

  // 印出結果
  console.log(result);
};

// 呼叫函式
b();

/*
題目三
subject：26~30 年齡族群的平均薪水滿意度為？

output：
{
  average: 7.7   
}
*/

// 宣告題目要求的函式
const c = () => {
  // 挑出符合年齡的資料
  const ageData = users.filter((user) => user.age === "26~30 歲");

  // 加總符合年齡的資料薪資滿意度
  const total = ageData.reduce(
    (acc, user) => acc + Number(user.company.salary_score),
    0,
  );

  // 符合年齡的資料數量
  const count = ageData.length;

  // 計算平均薪水滿意度
  const average = total / count;

  const result = {
    average,
  };

  // 印出結果
  console.log(result);
};

// 呼叫函式
c();

/*
題目四
subject：產業簽到區有寫與沒寫的人數比例為？

output：
[
    ["有寫333人", {
      no:"沒寫200人"
    }]
]
*/

// 宣告題目要求的函式
const d = () => {
  const count = users.reduce(
    (acc, user) => {
      if (user.company.industry_message === "") {
        acc.withoutMessage += 1;
      } else {
        acc.withMessage += 1;
      }

      return acc;
    },
    { withMessage: 0, withoutMessage: 0 },
  );

  const result = [
    [`有寫 ${count.withMessage} 人`, { no: `沒寫 ${count.withoutMessage} 人` }],
  ];

  // 印出結果
  console.log(result);
};

// 呼叫函式
d();

/*
題目五
subject：各產業的實體與遠端人數

output：
{
    "教育產業":{
      "實體辦公室" : "20間",
      "遠端工作": "2間"
    },
    "數位整合行銷":{
      "實體辦公室" : "20間",
      "遠端工作": "2間"
    }
    
    ...全數列出
}
*/

// 宣告題目要求的函式
const e = () => {
  // 先用 reduce 統計各產業各工作數量
  const totalCount = users.reduce((acc, user) => {
    const industry = user.company.industry;
    const work = user.company.work;

    // 如果還沒有這個產業，先建立空物件
    if (!acc[industry]) {
      acc[industry] = {};
    }

    // 計數
    // 這裡 industry、work 是變數，代表不同的產業或工作類型，因為每次值都不同，需要動態取值 → 中括號 [] 記法
    // 點號（.）記法：屬性名稱固定，不能用變數
    acc[industry][work] = (acc[industry][work] || 0) + 1;

    return acc;

    // 初始值為空物件 {}
  }, {});

  // 再用 reduce 生成最後格式（加上 "間"）
  const result = Object.keys(totalCount).reduce((acc, industry) => {
    const workObj = totalCount[industry];

    acc[industry] = Object.keys(workObj).reduce((workAcc, workType) => {
      workAcc[workType] = `${workObj[workType]} 間`;
      return workAcc;
    }, {});

    return acc;

    // 初始值為空物件 {}
  }, {});

  // 印出結果
  console.log(result);
};

// 呼叫函式
e();

/*
題目六
subject：各產業的男女性比例，與產業滿意度

output：
{
    "教育產業":{
      "男性比例" : "40%",
      "女性比例":"60%"
      "男性產業滿意度": "3.8分",
      "女性產業滿意度": "5.5分"
    },
    "數位整合行銷":{
      "男性比例" : "50%",
      "女性比例":"50%"
      "男性產業滿意度": "4.8分",
      "女性產業滿意度": "7.5分"
    }
    
    ...全數列出
}
*/

// 宣告題目要求的函式
const f = () => {
  // 先做資料統計
  const temp = users.reduce((acc, user) => {
    const industry = user.company.industry;
    const gender = user.gender;
    const score = Number(user.company.score); // 資料給的是字串，Number 轉成數字型別

    // 如果還沒有這個產業，先建立預設物件
    if (acc[industry] === undefined) {
      acc[industry] = {
        maleCount: 0,
        femaleCount: 0,
        maleScoreTotal: 0,
        femaleScoreTotal: 0,
      };
    }

    // 判斷性別
    if (gender === "男性") {
      acc[industry].maleCount += 1;
      acc[industry].maleScoreTotal += score;
    } else if (gender === "女性") {
      acc[industry].femaleCount += 1;
      acc[industry].femaleScoreTotal += score;
    }

    return acc;

    // 初始值為空物件 {}
  }, {});

  const result = {};

  // Object.keys 只拿「第一層 key」、回傳陣列
  Object.keys(temp).forEach((industry) => {
    const maleCount = temp[industry].maleCount;
    const femaleCount = temp[industry].femaleCount;
    const total = maleCount + femaleCount;

    // 計算數字，並處理可能為 0 的情況
    // NaN 出現的核心條件： 0 / 0
    // 分母 ≠ 0 → 安全
    // 分子 = 0 → 結果就是 0
    const malePercent = total === 0 ? 0 : (maleCount / total) * 100;
    const femalePercent = total === 0 ? 0 : (femaleCount / total) * 100;

    // 平均分數，沒人就用 null
    const maleAvg =
      maleCount === 0 ? null : temp[industry].maleScoreTotal / maleCount;
    const femaleAvg =
      femaleCount === 0 ? null : temp[industry].femaleScoreTotal / femaleCount;

    // result 格式化輸出
    // .toFixed()  把數字「格式化」成「指定小數位數的"字串"」
    result[industry] = {
      男性比例: malePercent.toFixed(0) + "%",
      女性比例: femalePercent.toFixed(0) + "%",
      男性產業滿意度: maleAvg === null ? "0分" : maleAvg.toFixed(1) + "分",
      女性產業滿意度: femaleAvg === null ? "0分" : femaleAvg.toFixed(1) + "分",
    };
  });

  // 印出結果
  console.log(result);
};

// 呼叫函式
f();

/*
題目七
subject：各年資的實體與遠端工作，平均薪水滿意度為？

output：
[
    {
      "工作經驗1年以下": {
        "實體辦公室的平均薪水滿意度" : "6.6分",
        "遠端工作的平均薪水滿意度": "8.8分"
      }
    },
      {
      "工作經驗2~3年以下": {
        "實體辦公室的平均薪水滿意度" : "3.6分",
        "遠端工作的平均薪水滿意度": "1.8分"
      }
    }    
]
*/

// 宣告題目要求的函式
const g = () => {
  // 先做資料統計
  const temp = users.reduce((acc, user) => {
    const tenure = user.company.job_tenure;
    const work = user.company.work;
    const score = Number(user.company.score); // 資料給的是字串，Number 轉成數字型別

    // 忽略空值或無效的年資
    if (!tenure) return acc; // ""、null、undefined 都會被過濾掉

    // 如果還沒有這個產業，先建立預設物件
    if (acc[tenure] === undefined) {
      acc[tenure] = {
        officeCount: 0,
        remoteCount: 0,
        officeScoreTotal: 0,
        remoteScoreTotal: 0,
      };
    }

    // 判斷工作型態
    if (work === "實體辦公室") {
      acc[tenure].officeCount += 1;
      acc[tenure].officeScoreTotal += score;
    } else if (work === "遠端工作") {
      acc[tenure].remoteCount += 1;
      acc[tenure].remoteScoreTotal += score;
    }

    return acc;

    // 初始值為空物件 {}
  }, {});

  const result = [];

  // Object.keys 只拿「第一層 key」、回傳陣列
  Object.keys(temp).forEach((tenure) => {
    const officeCount = temp[tenure].officeCount;
    const remoteCount = temp[tenure].remoteCount;
    const officeScoreTotal = temp[tenure].officeScoreTotal;
    const remoteScoreTotal = temp[tenure].remoteScoreTotal;

    // 計算平均薪水滿意度，並處理可能為 0 的情況
    // NaN 出現的核心條件： 0 / 0
    // 分母 ≠ 0 → 安全
    // 分子 = 0 → 結果就是 0
    const officeAvg = officeCount === 0 ? null : officeScoreTotal / officeCount;
    const remoteAvg = remoteCount === 0 ? null : remoteScoreTotal / remoteCount;

    // 推進陣列，key 加上前綴 "工作經驗"
    result.push({
      ["工作經驗" + tenure]: {
        實體辦公室的平均薪水滿意度:
          officeAvg === null ? "0分" : officeAvg.toFixed(1) + "分",
        遠端工作的平均薪水滿意度:
          remoteAvg === null ? "0分" : remoteAvg.toFixed(1) + "分",
      },
    });
  });

  // 印出結果
  console.log(result);
};

// 呼叫函式
g();
