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
let expireTexts = [];
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

let date = new Date();
let MM = parseInt(date.getMonth() + 1);
let DD = parseInt(date.getDate());
let YYMMDD = date.toISOString().split("T");
nowDate = YYMMDD[0];

function printVdty(){
  let paragraph = document.createElement("p");
  paragraph.innerText = "";
  for(let i = 0; i <=n; i++) {
    if(validData[i] <= nowDate && nowDate <= expireData[i]) {
      paragraph.innerText = `★${cvsData[i]}》${goodsData[i]} !期限:${expireData[i]}`;
      expireTexts = expireData[i].split("-");
      if(expireTexts[1] - MM >= 1){        //月またぎ処理
        if(expireTexts[2] + 30 - DD <= 3){  //月初Dateレコードに+30して差を取り直前レコード判定
          closeArea.appendChild(paragraph);
        } else {
          resultArea.appendChild(paragraph);
        }
      }else if( expireTexts[2] - DD <= 3 ) {
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