(function () {
  const bannerBtnLeft = document.getElementById("banner-btn-left") || {};
  const bannerBtnRight = document.getElementById("banner-btn-right") || {};
  const loginBtn = document.getElementsByClassName("nav-right")[0] || {};
  const popupContaineRegister =
    document.querySelector(".popup-container-register") || {};

  const popupContaineLogin =
    document.querySelector(".popup-container-login") || {};

  const closeBtn = document.querySelector(".close-icon-register") || {};
  const closeLogin = document.querySelector(".close-icon-login") || {};

  const formRegister =
    document.getElementsByClassName("form-register")[0] || {};
  const popupRegister =
    document.getElementsByClassName("popup-register")[0] || {};
  const signIn = document.querySelector(".sign-in") || {};

  const registerSubmit = document.querySelector(".register-submit") || {};
  const loginSubmit = document.querySelector(".login-submit") || {};
  const login = document.querySelector(".login") || {};
  const profile = document.querySelector(".profile") || {};
  const signOut = document.querySelector(".profile-sign-out") || {};
  const pricing = document.querySelector(".pricing") || {};
  const detailBtn = document.getElementsByClassName("detail-btn") || [];
  const logo = document.querySelector(".logo");

  function show(e) {
    if (e && e.classList) {
      e.classList.remove("hidden");
    }
  }

  function hidden(e) {
    if (e && e.classList) {
      e.classList.add("hidden");
    }
  }
  bannerBtnLeft.onclick = () => {
    console.log("bannerBtnLeft");
  };
  bannerBtnRight.onclick = () => {
    console.log("bannerBtnRight");
  };

  loginBtn.onclick = () => {
    show(popupContaineRegister);
  };
  popupContaineRegister.onclick = (e) => {
    hidden(popupContaineRegister);
  };

  closeBtn.onclick = (e) => {
    e.stopPropagation();
    hidden(popupContaineRegister);
  };

  closeLogin.onclick = (e) => {
    e.stopPropagation();
    hidden(popupContaineLogin);
  };

  popupRegister.onclick = (e) => {
    e.stopPropagation();
  };

  formRegister.onclick = (e) => {
    e.stopPropagation();
  };

  signIn.onclick = (e) => {
    e.stopPropagation();
    hidden(popupContaineRegister);
    show(popupContaineLogin);
  };

  registerSubmit.onclick = () => {
    const email = document.querySelector(".register-email");
    console.log("注册", email.value);
  };

  loginSubmit.onclick = () => {
    const email = document.querySelector(".login-email");
    const password = document.querySelector(".password");
    console.log("登录", email.value, password.value);
    hidden(login);
    hidden(popupContaineLogin);
    show(profile);
  };

  signOut.onclick = (e) => {
    e.stopPropagation();
    show(login);
    hidden(profile);
    hidden(popupContaineRegister);
  };

  pricing.onclick = () => {
    window.location.href = "./pricing.html";
  };

  for (let i = 0; i < detailBtn.length; i++) {
    detailBtn[i].onclick = () => {
      window.location.href = "./detail.html";
    };
  }

  logo.onclick = () => {
    console.log(11);
    window.location.href = "./index.html";
  };
})();
