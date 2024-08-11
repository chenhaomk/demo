(() => {
  const tag = $(".classify-tag");
  const searchParams = new URLSearchParams(window.location.search);
  const keyWords = searchParams.get("keyWords");
  const breadCrumbs = $(".breadCrumbs");
  const searchResult = $(".show-search-result");
  if (keyWords) {
    breadCrumbs.addClass("hasSearch");
    searchResult.addClass("show");
    searchResult.removeClass("hidden");
  } else {
    searchResult.removeClass("show");
    searchResult.addClass("hidden");
    breadCrumbs.removeClass("hasSearch");
  }
  // tag.html(keyWords);
})();
