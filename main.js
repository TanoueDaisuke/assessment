const answers = [
  `{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。`,
  `{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。`,
  `{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。`,
  `{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。`,
  `{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。`,
  `{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。`,
  `{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。`,
  `{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。`,
  `{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。`,
  `{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。`,
  `{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。`,
  `{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。`,
  `{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。`,
  `{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。`,
  `{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。`,
  `{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。`,
  `{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒されています。`
]

function assessment() {
  const userName = document.getElementById('user-name').value
  
  // 空欄の時の処理
  if (userName.length === 0) {
    return;
  }

  let sumOfCharCode = 0
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode += userName[i].charCodeAt()
  }
  const index = sumOfCharCode % answers.length

  let result = answers[index]

  // 正規表現を使ってresultの{userName}を書き換え
  // gは最初に見つけて終わりではなく、最後まで探す。
  result = result.replace(/\{userName\}/g, userName)
  
  // div#resultに結果表示
  const resultArea = document.getElementById('result')
  // ※結果がすでにある時に削除
  removeAllChildren(resultArea)
  // 見出し
  const resultHeader = document.createElement('h3')
  resultHeader.textContent = "診断結果"
  resultArea.appendChild(resultHeader)
  // 内容
  const resultDetail = document.createElement('p')
  resultDetail.textContent = result
  resultArea.appendChild(resultDetail)

  // div#tweetにボタン表示
  const tweetArea = document.getElementById('tweet')
  // ボタンがすでにある時に削除
  removeAllChildren(tweetArea)

  // タグ作成と編集
  const tweetBtn = document.createElement('a')
  // const href = "https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw"
  // ↓↓エンコーディング
  const hrefValue = "https://twitter.com/intent/tweet?button_hashtag="
    + encodeURIComponent('あなたのいいところ')
    + "&ref_src=twsrc%5Etfw"
  tweetBtn.setAttribute('href', hrefValue)
  tweetBtn.className = "twitter-hashtag-button"
  tweetBtn.setAttribute('data-text', result)
  tweetBtn.setAttribute('data-show-count', "false")
  // tweetBtn.setAttribute('target', "blank")
  tweetBtn.innerText = "Tweet #あなたのいいところ"
  // 追加
  tweetArea.appendChild(tweetBtn)

  // ボタン装飾用のscriptタグを読み込み
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetArea.appendChild(script);

}

const removeAllChildren = (parentNode) => {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild)
  }
}

document.getElementById('assessment').addEventListener('click', assessment)
// ↓↓入力中にenterキーが押された時にも実行する
document.getElementById('user-name').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    assessment()
  }
})
