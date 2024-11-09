// 変数の初期化
let untyped = "";
let typed = "";
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById(`untyped`);
const typedfield = document.getElementById("typed");
const wrap = document.getElementById("wrap");
const start = document.getElementById("start");
const count = document.getElementById("count");

// 複数のテキストを格納する配列
const textLists = [
  "Hello World",
  "This is my App",
  "How are you?",
  "Today is sunny",
  "I love JavaScript!",
  "Good morning",
  "I am Japanese",
  "Let it be",
  "Samurai",
  "Typing Game",
  "Information Technology",
  "I want to be a programmer",
  "What day is today?",
  "I want to build a web app",
  "Nice to meet you",
  "Chrome Firefox Edge Safari",
  "machine learning",
  "Brendan Eich",
  "John Resig",
  "React Vue Angular",
  "Netscape Communications",
  "undefined null NaN",
  "Thank you very much",
  "Google Apple Facebook Amazon",
  "ECMAScript",
  "console.log",
  "for while if switch",
  "var let const",
  "Windows Mac Linux iOS Android",
  "programming",
];

// ランダムテキスト表示
const createText = () => {
  // 正typeした文字列をクリア
  typed = "";
  typedfield.textContent = typed;
  //配列インデックス数からランダムな数値を生成
  let random = Math.floor(Math.random() * textLists.length);

  // 配列からランダムにテキストを取得して画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キーの入力判定
const keyPress = (e) => {
  // 誤typeの場合
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add("mistyped");
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove("mistyped");
    }, 100);
    return;
  }

  // 正typeの場合
  //スコアのインクリメント
  score++;
  //untypedの先頭文字をtypedの末尾へ追加
  typed += untyped.substring(0, 1);
  //untypedの2文字目以降をuntypedにセット
  untyped = untyped.substring(1);
  //typedにtypedfieldの文字列をセット
  typedfield.textContent = typed;
  //untypedにuntypedfieldの文字列をセット
  untypedfield.textContent = untyped;
  // テキストがなくなったら新しいテキストを表示
  if (untyped === "") {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = () => {
  // テキストを格納する変数を作る
  let text = "";
  // スコアに応じて異なるメッセージを変数textに格納する
  if (score < 100) {
    text = `あなたのランクはCです。 \nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。 \nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。 \nSランクまであと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはSです。 \nおめでとうございます!`;
  }
  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = (id) => {
  clearInterval(id);

  const result = confirm(rankCheck(score));
  //  OKボタンがクリックされたらリロードする
  if (result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
  // タイマー部分のHTML要素を取得
  let time = count.textContent;
  const id = setInterval(() => {
    // カウントダウンする
    time--;
    count.textContent = time;
    // カウントが０になったらタイマーを停止する
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時のイベント処理
start.addEventListener("click", () => {
  // カウントダウンタイマーを開始する
  timer();
  // ランダムなテキスト表示
  createText();
  // 「スタート」ボタンを非表示にする
  start.style.display = "none";
  // キーボードのイベント処理
  document.addEventListener("keypress", keyPress);
});
