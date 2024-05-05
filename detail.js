(function () {
  const tab = document.querySelector(".tab");
  const content2 = document.querySelector(".tab-content2");
  const content1 = document.querySelector(".tab-content1");
  tab.onclick = (e) => {
    const children = tab.children;
    var index = Array.prototype.indexOf.call(children, e.target);
    if (index === 0) {
      content1.classList.remove("hidden");
      content2.classList.add("hidden");
    } else {
      content1.classList.add("hidden");
      content2.classList.remove("hidden");
    }
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("li-active");
    }
    if (e.target && e.target.nodeName === "LI") {
      e.target.classList.add("li-active");
    }
  };
})();
