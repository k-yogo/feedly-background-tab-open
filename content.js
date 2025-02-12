{
  let shortcutkey;
  chrome.storage.sync.get({ shortcutkey: 'i' }, function (items) {
    shortcutkey = items.shortcutkey;
  });
  const keyListener = e => {
    if (!e.repeat && e.key === shortcutkey) {
      let targetURL = null;

      if (document.querySelector('.EntryTitleLink--selected') !== null) {
        // ETLS: Title-Only View(Select by N - P), Magazine View, Cards View
        targetURL = document.querySelector('.EntryTitleLink--selected').href;
      } else if (e.target.classList.contains('InlineArticle')) {
        // AT: Article View
        targetURL = e.target.querySelector('.ArticleTitle').href;
      } else if (document.querySelector('.InlineArticle') !== null) {
        // IA: Title-Only View(Select by J - K)
        targetURL = document.querySelector('.InlineArticle').querySelector('.ArticleTitle').href;
      }
      if (targetURL !== null) {
        chrome.runtime.sendMessage({ url: targetURL });
      } else {
        console.log('targetURL is Null');
      }
    }
  };

  window.addEventListener('keydown', keyListener, false);
}
