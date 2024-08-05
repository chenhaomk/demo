(function () {
  const bannerBtnLeft = document.getElementById("banner-btn-left") || {};
  const bannerBtnRight = document.getElementById("banner-btn-right") || {};
  const loginBtn = document.getElementsByClassName("nav-right")[1] || {};
  const popupContaineRegister =
    document.querySelector(".popup-container-register") || {};

  // const activeBtn = document.getElementsByClassName("nav-right")[0] || {};
  const popupContaineActive =
    document.querySelector(".popup-container-active") || {};

  const popupContaineLogin =
    document.querySelector(".popup-container-login") || {};

  const popupContainePasswd =
    document.querySelector(".popup-container-passwd") || {};

  const closeBtn = document.querySelector(".close-icon-register") || {};
  const closeLogin = document.querySelector(".close-icon-login") || {};
  const closeActive = document.querySelector(".close-icon-active") || {};
  const closePasswd = document.querySelector(".close-icon-passwd") || {};

  const formRegister =
    document.getElementsByClassName("form-register")[0] || {};
  const popupRegister =
    document.getElementsByClassName("popup-register")[0] || {};
  
  //const register = document.querySelector(".register-submit") || {}

  const signIn = document.querySelector(".sign-in") || {};
  const register = document.querySelector(".register") || {};
  const findPasswd = document.querySelector(".find-passwd") || {};
  const registerSubmit = document.querySelector(".register-submit") || {};
  const loginSubmit = document.querySelector(".login-submit") || {};
  const activeSubmit = document.querySelector(".active-submit") || {};
  const passwdSubmit = document.querySelector(".passwd-submit") || {};
  const suggestSubmit = document.querySelector(".suggest-submit") || {};
  const login = document.querySelector(".login") || {};
  const keyactive = document.querySelector(".keyactive") || {};
  const profile = document.querySelector(".profile") || {};
  const credits = document.querySelector(".profile-credits") || {};
  const signOut = document.querySelector(".profile-sign-out") || {};
  //const pricing = document.querySelector(".pricing") || {};
  const detailBtn = document.getElementsByClassName("detail-btn") || [];
  const logo = document.querySelector(".logo");
  const navBtn = document.getElementsByClassName("nav-mian-click") || [];
  
  const tofaceswap = document.getElementById("face-swap") || [];
  const topricing = document.getElementById("to-pricing") || [];
  const topiccompress = document.getElementById("pic-compress") || [];
  const topiceditor = document.getElementById("pic-editor") || [];
  const tovideoeditor = document.getElementById("video-editor") || [];
  const toabout = document.getElementById("to-about") || [];
  const tocontackus = document.getElementById("to-contack-us") || [];

  function show(e) {
    if (e && e.classList) {
      e.classList.remove("hidden");
    }
  };

  function hidden(e) {
    if (e && e.classList) {
      e.classList.add("hidden");
    }
  };
  
  topricing.onclick = () => {
    console.log("pricing", "");
    window.location.href = "./pricing";
  };
  
  tofaceswap.onclick = () => {
    console.log("toone", "");
    window.location.href = "./faceswap";
  };

  topiccompress.onclick = () => {
    window.location.href = "./free-photo-compressor";
  };
  topiceditor.onclick = () => {
    window.location.href = "./free-photo-retoucher";
  };
  tovideoeditor.onclick = () => {
    window.location.href = "./videoeditor";
  };
  toabout.onclick = () => {
    window.location.href = "./aboutus";
  };
  tocontackus.onclick = () => {
    window.location.href = "./contactus";
  };

  bannerBtnLeft.onclick = () => {
    window.location.href = "./faceswap";
  };
  bannerBtnRight.onclick = () => {
    console.log("bannerBtnRight");
  };

  loginBtn.onclick = () => {
    show(popupContaineLogin);
  };

  keyactive.onclick = () => {
    show(popupContaineActive);
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

  closeActive.onclick = (e) => {
    e.stopPropagation();
    hidden(popupContaineActive);
  };

  closePasswd.onclick = (e) => {
    e.stopPropagation();
    hidden(popupContainePasswd);
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
    console.log("signin click")
    show(popupContaineLogin);
  };

  register.onclick = (e) => {
    e.stopPropagation();
    hidden(popupContaineLogin);
    console.log("register click")
    show(popupContaineRegister);
  };

  findPasswd.onclick = (e) => {
    e.stopPropagation();
    hidden(popupContaineRegister);
    hidden(popupContaineLogin)
    console.log("findpasswd click")
    show(popupContainePasswd);
  };

  registerSubmit.onclick = () => {
    const email = document.querySelector(".register-email");
    console.log("注册", email.value);
    show(signOut)
  };

  registerSubmit.onclick = () => {
    const email = document.querySelector(".register-email");
    const password = document.querySelector(".register-password");
    const repassword = document.querySelector(".register-repassword");
    const code = document.querySelector(".register-code");
    console.log("register", email.value, password.value, repassword.value);

    if((email.value == "")){
      alert("email can not be null")
      return 
    }

    if((password.value == "")){
      alert("password can not be null")
      return 
    }

    if((repassword.value == "")){
      alert("repassword can not be null")
      return 
    }

    if((password.value != repassword.value )){
      alert("password must be equal repassword!")
      return 
    }

    $.ajax({
      type : "POST",
      url : 'signup', 
      data : JSON.stringify({email:email.value, password:password.value, repassword: repassword.value, code:code.value}),
      contentType : "application/json;charset=utf-8",
      //dataType : "json",
      success : function(data){
              console.log("response",data);
              if(data['code'] === "success"){  
                alert("please take care of "+data['id'] + " for retrive password! ")   
                hidden(login);
                hidden(popupContaineRegister)
                hidden(popupContaineLogin);
                show(profile);
                document.getElementById("profile-credits").innerHTML="credits:"+data['credits']
                show(credits)
                show(signOut);
              }else{
                alert(data['msg']);
                return;
              }

            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error happend");
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            },

      complete: function(XMLHttpRequest, textStatus) {
                    this; // 调用本次AJAX请求时传递的options参数
            }
      });
  };

  loginSubmit.onclick = () => {
    const email = document.querySelector(".login-email");
    const password = document.querySelector(".login-password");
    console.log("login", email.value, password.value);

    $.ajax({
      type : "POST",
      url : 'login', 
      data : JSON.stringify({email:email.value, password:password.value}),
      contentType : "application/json;charset=utf-8",
      //dataType : "json",
      success : function(data){
              console.log("response",data);
              if(data['code'] === "success"){
                hidden(login)
                hidden(popupRegister);
                hidden(popupContaineLogin);
                show(profile);
                document.getElementById("profile-credits").innerHTML="credits:"+data['credits']
                show(credits)
                show(signOut);
              }else{
                alert(data['msg']);
                return;
              }
            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error happend");
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            },

      complete: function(XMLHttpRequest, textStatus) {
                    this; // 调用本次AJAX请求时传递的options参数
            }

      
    });
  };

  activeSubmit.onclick = () => {
    const code = document.querySelector(".active-code");
    console.log("code", code.value);
    $.ajax({
      type : "POST",
      url : 'active', 
      data : JSON.stringify({code:code.value}),
      contentType : "application/json;charset=utf-8",
      //dataType : "json",
      success : function(data){
              console.log("response",data);
              if(data['code'] === "success"){
                alert("the license code is actived!")
                document.getElementById("profile-credits").innerHTML="credits:"+data['credits']
                show(credits)
                hidden(popupContaineActive);
              }else{
                alert(data['msg']);
                return;
              }
            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error happend");
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            },

      complete: function(XMLHttpRequest, textStatus) {
                    this; // 调用本次AJAX请求时传递的options参数
            }
    });
  };

  passwdSubmit.onclick = () => {
    const email = document.querySelector(".passwd-email");
    const uuid = document.querySelector(".passwd-uuid");
    console.log("email", email.value, uuid.value);

    if((email.value == "")){
      alert("email can not be null")
      return 
    }

    if((uuid.value == "")){
      alert("uuid can not be null")
      return 
    }

    $.ajax({
      type : "POST",
      url : 'findpasswd', 
      data : JSON.stringify({email:email.value, uuid:uuid.value}),
      contentType : "application/json;charset=utf-8",
      //dataType : "json",
      success : function(data){
              console.log("response",data);
              if(data['code'] === "success"){
                alert("have send password to your email");
              }else{
                alert(data['msg']);
                return;
              }
            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error happend");
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            },

      complete: function(XMLHttpRequest, textStatus) {
                    this; // 调用本次AJAX请求时传递的options参数
            }
    });
  };


  suggestSubmit.onclick = () => {
    const name = document.querySelector(".suggest-name");
    const email = document.querySelector(".suggest-email");
    const suggestion = document.querySelector(".suggestion");
    console.log(email.value, name.value, suggestion.value);

    if((name.value == "")){
      alert("name can not be null")
      return 
    }

    if((email.value == "")){
      alert("email can not be null")
      return 
    }

    if((suggestion.value == "")){
      alert("suggestion can not be null")
      return 
    }

    $.ajax({
      type : "POST",
      url : 'addsuggest', 
      data : JSON.stringify({name:name.value, email:email.value, detail:suggestion.value}),
      contentType : "application/json;charset=utf-8",
      //dataType : "json",
      success : function(data){
              console.log("response",data);
              if(data['code'] === "success"){
                alert(data['msg']);
                hidden(popupContaineLogin)
              }else{
                alert(data['msg']);
                return;
              }
            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error happend");
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            },

      complete: function(XMLHttpRequest, textStatus) {
                    this; // 调用本次AJAX请求时传递的options参数
            }
    });



  };

  signOut.onclick = (e) => {
    e.stopPropagation();
    $.ajax({
      type : "GET",
      url : 'signout', 
      contentType : "application/json;charset=utf-8",
      //dataType : "json",
      success : function(data){
              show(login);
              hidden(profile);
              hidden(popupContaineRegister);
            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error happend");
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            },

      complete: function(XMLHttpRequest, textStatus) {
                    this; // 调用本次AJAX请求时传递的options参数
            }
    });
  };

  logo.onclick = () => {
    console.log("logo");
    window.location.href = "./";
  };

})();