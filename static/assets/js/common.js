(() => {
  const searchActive = "is-active";
  const searchBox = $("#header-search-dropdown");
  $(".js-search-dropdown-toggle").on("click", () => {
    if (searchBox.hasClass(searchActive)) {
      searchBox.removeClass(searchActive);
    } else {
      searchBox.addClass(searchActive);
    }
  });

  const gotoDetail = $(".goto-detail");
  gotoDetail.on("click", () => {
    console.log(222);
    window.location.href = "./detail.html";
  });

  const gotoClassify = $(".goto-classify");

  gotoClassify.on("click", () => {
    window.location.href = "./classify.html";
  });
})();
