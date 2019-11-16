function FavoriteHelper() {
  let that = {};

  function isFavoriteCircles() {
    return location.hostname == "webcatalog.circle.ms" && location.pathname == "/User/Favorites";
  }

  function isFavoriteBooths() {
    return location.hostname == "webcatalog.circle.ms" && location.pathname == "/User/FavoritesBooth";
  }

  function getMemos() {
    let those = [];
    let selector = "";
    if (isFavoriteCircles()) {
      selector = "table.t-user-favorites tbody tr.webcatalog-circle-list-detail+tr td.infotable-left input";
    } else if (isFavoriteBooths()) {
      selector = "table.t-user-favorites tbody tr.webcatalog-booth-list-detail+tr td.infotable-left input";
    } else {
      return those;
    }
    let inputs = document.querySelectorAll(selector);
    for (let input of inputs) {
      let that = {};
      that.cell = input.parentElement;
      that.edit = input.previousElementSibling.previousElementSibling;
      that.span = input.previousElementSibling;
      that.input = input;
      that.submit = input.nextElementSibling;
      those.push(that);
    }
    return those;
  }

  function replaceLinks(memoSpan) {
    let regEx = /(https?\:\/\/[\w-./?=&#%]+)/g;
    memoSpan.innerHTML = memoSpan.innerHTML.replace(regEx, '<a target="_blank" href="$1">$1</a>');

    let links = memoSpan.getElementsByTagName("a");
    for (let link of links) {
      link.onclick = function(event) { event.stopPropagation(); };
    }
    return memoSpan.innerHTML;
  }

  function getInputIsHidden(memo) {
    return memo.input.style.display == "none";
  }

  function createMemoUpdater(memo) {
    memo.inputOld = memo.span.innerText;
    memo.spanOld = replaceLinks(memo.span);
    memo.inputIsHidden = getInputIsHidden(memo);
    setInterval(function() {
      if (memo.spanOld != memo.span.innerHTML) {
        memo.inputOld = memo.span.innerText;
        memo.spanOld = replaceLinks(memo.span);
      }
      let newIsHidden = getInputIsHidden(memo);
      if (memo.inputIsHidden != newIsHidden) {
        memo.inputIsHidden = newIsHidden;
        if (!newIsHidden) {
          memo.input.focus();
        }
      }
    }, 100);
  }

  function addMemoListeners(memo) {
    memo.cell.onclick = function(event) {
      if (event.target == memo.cell && event.isTrusted) {
        memo.edit.click();
      }
    };
    memo.input.onkeydown = function(event) {
      event.stopPropagation();
      if (event.key == "Enter" ||
          (event.key == "s" && event.ctrlKey)) {
        memo.inputOld = memo.input.value;
        memo.submit.click();
        return false;
      } else if (event.key == "Escape") {
        memo.input.value = memo.inputOld;
        memo.submit.click();
        return false;
      }
      return true;
    };
  }

  function createMemoHelpers() {
    let memos = getMemos();
    for (let memo of memos) {
      createMemoUpdater(memo);
      addMemoListeners(memo);
    }
  }

  function getModels() {
    let that = {};
    let models = JSON.parse(document.getElementById("TheModel").innerHTML).Circles;
    that.getById = function(id) {
      for (let model of models) {
        if (model.Id == id) {
          return model;
        }
      }
      return null;
    };
    return that;
  }

  function getSupports() {
    let those = [];
    let supports = document.getElementsByClassName("support-list");
    for (let support of supports) {
      let that = {};
      that.id = support.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.id;
      that.pixiv = support.getElementsByClassName("support-list-pixiv")[0];
      that.twitter = support.getElementsByClassName("support-list-twitter")[0];
      that.niconico = support.getElementsByClassName("support-list-niconico")[0];
      that.myhome = support.getElementsByClassName("support-list-myhome")[0];
      those.push(that);
    }
    return those;
  }

  function copySupport(support, shouldCopy, url) {
    let supportCopy = support.cloneNode();
    support.parentElement.insertBefore(supportCopy, support);
    support.style.display = "none";
    if (shouldCopy) {
      supportCopy.title = url;
      supportCopy.onclick = function(event) {
        event.stopPropagation();
        window.open(url, "_blank");
      };
    }
  }

  function createSocialLinks(models) {
    let supports = getSupports();
    for (let support of supports) {
      let model = models.getById(support.id);
      if (model == null) {
        continue;
      }
      copySupport(support.pixiv, model.IsPixivRegistered, model.PixivUrl);
      copySupport(support.twitter, model.IsTwitterRegistered, model.TwitterUrl);
      copySupport(support.niconico, model.IsNiconicoRegistered, model.NiconicoUrl);
      copySupport(support.myhome, model.WebSite, model.WebSite);
    }
  }

  function createAuthorHeader() {
    let nameHeader = document.querySelector("th.infotable-space").nextElementSibling;
    let authorHeader = nameHeader.cloneNode();
    authorHeader.innerHTML = "執筆者名";
    nameHeader.parentElement.insertBefore(authorHeader, nameHeader.nextElementSibling);

    let genreHeader = document.querySelector("th.infotable-distribution");
    genreHeader.style.width = "auto";
  }

  function getAuthors() {
    let those = [];
    let details = document.querySelectorAll("table.t-user-favorites tr.webcatalog-circle-list-detail");
    for (let detail of details) {
      let that = {};
      that.id = detail.id;
      that.nameElement = detail.querySelector("td.infotable-circlename");
      that.memoElement = detail.nextElementSibling.firstElementChild;
      that.supportElement = detail.nextElementSibling.nextElementSibling.firstElementChild;
      those.push(that);
    }
    return those;
  }

  function createAuthors(models) {
    createAuthorHeader();
    let authors = getAuthors();
    for (let author of authors) {
      let model = models.getById(author.id);
      let authorElement = author.nameElement.cloneNode(true);
      authorElement.firstElementChild.innerHTML = model ? model.Author : "";
      author.nameElement.parentElement.insertBefore(authorElement, author.nameElement.nextElementSibling);
      author.memoElement.colSpan += 1;
      author.supportElement.colSpan += 1;
    }
  }

  that.run = function() {
    let isCircles = isFavoriteCircles();
    let isBooths = isFavoriteBooths();
    if (!isCircles && !isBooths) {
      return;
    }

    createMemoHelpers();
    if (!isCircles) {
      return;
    }

    let models = getModels();
    createSocialLinks(models);
    createAuthors(models);
  };

  return that;
}

let favoriteHelper = FavoriteHelper();
favoriteHelper.run();