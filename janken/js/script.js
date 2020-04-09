//じゃんけんゲームをどちらかが5勝するまでじゃんけんを行い、
//障害結果を表示するように拡張してください。
let janken = [0, 1, 2]; //0=グー 1=チョキ 2＝パー
let num012; //0から2を入れる変数
let you; //自分の手を入れる変数
let result; //結果を入れる変数
let storage = sessionStorage; //sessionStrageを入れる変数
let youWin = 0; //自分が勝った数を入れる
let comWin = 0; //comが勝った数を入れる

//strageに勝数を保存していく
storage.setItem('youKey', youWin);
storage.setItem('comKey', comWin);

//htmlのID
let rsTxt = document.getElementById('result');
let finTxt = document.getElementById('finaly');
let btnG = document.getElementById("buttonG");
let btnC = document.getElementById("buttonC");
let btnP = document.getElementById("buttonP");
let rst = document.getElementById("reset");

let pics_src = new Array("img/hand_ge45858.png", "img/hand_ce45858.png", "img/hand_pe45858.png");
//じゃんけん画像切り替え
/*
let enmyImgNum = -1;
let enemyHandTimer = () => {
    if (enmyImgNum == 2) {
        enmyImgNum = 0;
    } else {
        enmyImgNum++;
    }
    document.getElementById("enemyHand").src = pics_src[enmyImgNum];
    setTimeout("enemyHandTimer()", 1200);
}
enemyHandTimer()

let myImgNum = 0;
let myHandTimer = () => {
    if (myImgNum == 2) {
        myImgNum = 0;
    } else {
        myImgNum++;
    }
    document.getElementById("myHand").src = pics_src[myImgNum];
    setTimeout("myHandTimer()", 1200);
}
myHandTimer()
*/

//ローディング画面
window.onload = function () {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
}

//じゃんけんの勝敗を判定する関数
let judgment = (hand) => {
    if (hand == 0) {
        if (num012 == 1) {
            result = '勝ちました!!';
        } else if (num012 == 0) {
            result = 'あいこです';
        } else {
            result = '負けました…';
        }

    } else if (hand == 1) {
        if (num012 == 2) {
            result = '勝ちました!!';
        } else if (num012 == 1) {
            result = 'あいこです';
        } else {
            result = '負けました…';
        }

    } else if (hand == 2) {
        if (num012 == 0) {
            result = '勝ちました!!';
        } else if (num012 == 2) {
            result = 'あいこです';
        } else {
            result = '負けました…';
        }
    }

    if (result == '勝ちました!!') {
        storage.setItem('youKey', (youWin += 1));
    } else if (result == '負けました…') {
        storage.setItem('comKey', (comWin += 1));
    }

    finTxt.innerHTML = (`あなた${storage.getItem('youKey')}勝 あいて${storage.getItem('comKey')}敗`);
    document.getElementById("enemyHand").src = pics_src[num012];
    setTimeout(() => {
        document.getElementById("enemyHand").src = pics_src[0]
    }, 1200);
}

//どちらかが5勝したら最終結果を表示
let ifGgFinalResult = () => {
    if (storage.getItem('youKey') == 5) {
        finTxt.innerHTML = (`${storage.getItem('youKey')}勝${storage.getItem('comKey')}敗であなたの勝ち`);
    }
    if (storage.getItem('comKey') == 5) {
        finTxt.innerHTML = (`${storage.getItem('youKey')}勝${storage.getItem('comKey')}敗であなたの負け`);
    }
}

//どちらかが5勝したらグーチョキパーボタン無効
let ifEndDisableButton = () => {
    if (storage.getItem('youKey') == 5 || storage.getItem('comKey') == 5) {
        document.getElementById('buttonG').setAttribute('disabled', 'disabled'); //ボタン無効化
        document.getElementById('buttonC').setAttribute('disabled', 'disabled'); //ボタン無効化
        document.getElementById('buttonP').setAttribute('disabled', 'disabled'); //ボタン無効化
    }
    if (storage.getItem('youKey') == 5) {
        rsTxt.innerHTML = 'おめでとう! あなたの勝ち!';
        setTimeout(() => {
            rsTxt.innerHTML = 'おめでとう! あなたの勝ち!'
        }, 1200);
    } else if (storage.getItem('comKey') == 5) {
        rsTxt.innerHTML = 'ざんねん! 負けです…';
        setTimeout(() => {
            rsTxt.innerHTML = 'リセットしてもう一回!'
        }, 1200);
    }
}

//ボタンを押して['グー', 'チョキ', 'パー']のどれか選択
//結果を表示する
btnG.addEventListener("click", () => {
    num012 = Math.floor(Math.random() * 3);
    you = 0; //グー
    judgment(you)
    document.getElementById("myHand").src = pics_src[0];
    setTimeout(() => {
        document.getElementById("myHand").src = pics_src[0]
    }, 1200);
    rsTxt.innerHTML = result;
    setTimeout(() => {
        rsTxt.innerHTML = 'じゃんけんでしょうぶ!!'
    }, 1200);
    ifGgFinalResult()
    ifEndDisableButton()
});
btnC.addEventListener("click", () => {
    num012 = Math.floor(Math.random() * 3);
    you = 1; //チョキ
    judgment(you)
    document.getElementById("myHand").src = pics_src[1];
    setTimeout(() => {
        document.getElementById("myHand").src = pics_src[0]
    }, 1200);
    rsTxt.innerHTML = result;
    setTimeout(() => {
        rsTxt.innerHTML = 'じゃんけんでしょうぶ!!'
    }, 1200);
    ifGgFinalResult()
    ifEndDisableButton()
});
btnP.addEventListener("click", () => {
    num012 = Math.floor(Math.random() * 3);
    you = 2; //パー
    judgment(you)
    document.getElementById("myHand").src = pics_src[2];
    setTimeout(() => {
        document.getElementById("myHand").src = pics_src[0]
    }, 1200);
    rsTxt.innerHTML = result;
    setTimeout(() => {
        rsTxt.innerHTML = 'じゃんけんでしょうぶ!!'
    }, 1200);
    ifGgFinalResult()
    ifEndDisableButton()
});
rst.addEventListener("click", () => {
    storage.setItem('youKey', (youWin -= youWin)); //sessionStrageを初期化
    storage.setItem('comKey', (comWin -= comWin)); //sessionStrageを初期化
    finTxt.innerHTML = ('けっか'); //勝敗数も初期化
    rsTxt.innerHTML = ('じゃんけんでしょうぶ!!'); //結果表示も初期化
    document.getElementById('buttonG').removeAttribute('disabled'); //ボタン有効化
    document.getElementById('buttonC').removeAttribute('disabled'); //ボタン有効化
    document.getElementById('buttonP').removeAttribute('disabled'); //ボタン有効化
});