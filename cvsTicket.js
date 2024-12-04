let nowDate = null;
let validDate = document.getElementById(`validDate`);
let expireDate = document.getElementById(`expireDate`);
let cvsName = document.getElementById(`cvs`);
let goodsName = document.getElementById(`goodsName`);
let submit = document.getElementById(`submit`);
let infoArea = document.getElementById(`info`);
let closeArea = document.getElementById(`closeResult`);
let resultArea = document.getElementById(`result`);
let validData = ["2024-09-01"];
let expireData = ["2024-11-30"];
let cvsData = ["その他CVS"];
let goodsData = ["マツキヨ10%割引クーポン券"];
let SZvalidData = null;
let SZexireData = null;
let SZcvsData = null;
let SZgoodsData = null;
let expireTexts = [];
let nowTexts = [];
let n = 0; //データカウンタ

submit.addEventListener(
  `click`,
  ()=>{
    let valid = validDate.value;
    let expire = expireDate.value;
    let cvs = cvsName.value;
    let goods = goodsName.value;
    const infoMsg = document.createElement("text");
    infoArea.innerText = "";

  if (valid.length === 0) {
      infoMsg.innerText = "❕引換開始日が入力されていません。❕"
      infoArea.appendChild(infoMsg);
      return;
    } else if (expire.length === 0) {
      infoMsg.innerText = "❕引換終了日が入力されていません。❕"
      infoArea.appendChild(infoMsg);
      return;
    } else if(cvs.length === 0) {
      infoMsg.innerText = "❕チェーン名が入力されていません。❕"
      infoArea.appendChild(infoMsg);
      return;
    } else if(goods.length === 0) {
      infoMsg.innerText = "❕商品名が入力されていません。❕"
      infoArea.appendChild(infoMsg);
      return;
    } else {
      validData.push(valid);
      expireData.push(expire);
      cvsData.push(cvs);
      goodsData.push(goods);
      n = n+1;
      validDate.value = ""
      expireDate.value = ""
      goodsName.value = ""
      infoMsg.innerText = "👍引換クーポン情報が登録されました👍"
      infoArea.appendChild(infoMsg);
      SZvalidData = JSON.stringify(validData);
      localStorage.setItem("LSvaliData",SZvalidData);
      SZexireData = JSON.stringify(expireData);
      localStorage.setItem("LSexpireData",SZexireData);
      SZcvsData = JSON.stringify(cvsData);
      localStorage.setItem("LScvsData",SZcvsData);
      SZgoodsData = JSON.stringify(goodsData);
      localStorage.setItem("LSgoodsData",SZgoodsData);
      printVdty();
    }
    console.log(valid);
    console.log(expire);
    console.log(cvs);
    console.log(goods);
  }
);

let degree = 0;
function rotateInfo() {
  degree = degree + 6;
  infoArea.style.transform = `rotateX(${degree}deg)`;
}
setInterval(rotateInfo, 30);

/**
 * dateオブジェクトを渡すと　yyyy-mm-dd　形式の日付を返す関数formatDate
 * @param {object} date         !new Date()で作成したdateオブジェクト
 * @return {string} yyyy-mm-dd  !yyyy-mm-dd形式に整形された文字列
 */

const formatDate = (date = new Date()) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため、1を足す
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

function printVdty(){
  nowDate = formatDate();
  let paragraph = document.createElement("p");
  paragraph.innerText = "";
  SZvalidData = localStorage.getItem("LSvalidData");
  validData = JSON.parse(SZvalidData);
  SZexireData = localStorage.getItem("LSexpireData");
  expireData = JSON.parse(SZexireData);
  SZcvsData = localStorage.getItem("LScvsData");
  cvsData = JSON.parse(SZcvsData);
  SZgoodsData = localStorage.getItem("LSgoodsData");
  goodsData = JSON.parse(SZgoodsData);
  for(let i = 0; i <=n; i++) {
    if(validData[i] <= nowDate && nowDate <= expireData[i]) {
      paragraph.innerText = `★${cvsData[i]}》${goodsData[i]} !期限:${expireData[i]}`;
      expireTexts = expireData[i].split("-");
      nowTexts = nowDate.split("-");
      if(parseInt(expireTexts[1]) - parseInt(nowTexts[1]) > 0){         //月またぎ処理 parseInt() で明示的に整数変換
        if(parseInt(expireTexts[2]) +30 - parseInt(nowTexts[2]) <= 3){  //月初Dateレコードに+30して差を取り直前レコード判定
          closeArea.appendChild(paragraph);                             //期限3日以内のレコードを closeArea に掲示
        } else {
          resultArea.appendChild(paragraph);
        }
      }else if( parseInt(expireTexts[2]) - parseInt(nowTexts[2]) <= 3 ) {
        closeArea.appendChild(paragraph);
      } else {
        resultArea.appendChild(paragraph);
      }
    } else {
      paragraph.innerText = ""
    }
  }
  console.log(validData[0]);
  console.log(expireData[0]);
  console.log(cvsData[0]);
  console.log(goodsData[0]);
}

printVdty();
