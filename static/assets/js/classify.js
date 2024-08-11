(() => {
  const dataContainer = $(".category-list");
  const mockData = [];
  for (let i = 0; i < 6; i++) {
    mockData.push({
      img: "../assets/imgs/classify1.png",
      tag: `app${i + 1}`,
      desc: `how much does is cost to hire a mobile app development
      company?_${i + 1}`,
      auther: `Anusha_${i + 1}`,
    });
  }
  $("#Pagination").pagination({
    dataSource: [
      1, 2, 3, 4, 5, 6, 7, 23, 32, 23, 23, 2, 323, 23, 12, 31, 23, 123, 123,
      123, 1, 35, 4, 5, 6, 7, 23, 32, 23, 23, 2, 323, 23, 12, 31, 23, 123, 123,
      123, 1, 35, 1, 2, 3, 4, 5, 6, 7, 23, 32, 23, 23, 2, 323, 23, 12, 31, 23,
      123, 123, 123, 1, 35, 4, 5, 6, 7, 23, 32, 23, 23, 2, 323, 23, 12, 31, 23,
      123, 123, 123, 1, 35,
    ],
    pageSize: 6,
    pageNumber: 3,
    showPrevious: false,
    callback: function (data, pagination) {
      let html = "";
      mockData.forEach((item) => {
        html += ` <div class="category-list-item margin-right">
          <div class="category-list-item-img goto-detail">
            <img src="${item.img}" alt="" />
          </div>
          <div class="category-list-item-desc">
            <div class="auther-box auther-box-normal">
              <div class="auther-desc goto-detail">${item.desc}
              </div>
              <div class="auther-name goto-detail">${item.auther}</div>
            </div>
          </div>
        </div>`;
      });
      console.log(data, pagination);
      dataContainer.html(html);
      const gotoDetail = $(".goto-detail");
      gotoDetail.on("click", () => {
        console.log(222);
        window.location.href = "./detail.html";
      });
    },
  });
})();
