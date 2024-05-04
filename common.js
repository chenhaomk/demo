(function () {
  const bannerBtnLeft = document.getElementById("banner-btn-left");
  const bannerBtnRight = -document.getElementById("banner-btn-right");
  bannerBtnLeft.onclick = () => {
    console.log("bannerBtnLeft");
  };
  bannerBtnRight.onclick = () => {
    console.log("bannerBtnRight");
  };
})();
