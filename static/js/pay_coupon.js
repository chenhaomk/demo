(function () {

  const price0btn = document.getElementById("price-type0") || {};
  const price1btn = document.getElementById("price-type1") || {};
  const price2btn = document.getElementById("price-type2") || {};
  const price3btn = document.getElementById("price-type3") || {};
  const popupContainePay = document.querySelector(".popup-container-pay") || {};
  const closePayBtn = document.querySelector(".close-icon-pay") || {};
  const paypalSubmit = document.getElementById("paypal-submit") || {};
  const couponSubmit = document.querySelector(".coupon-submit") || {};
  const closeBtn = document.querySelector(".close-icon-register") || {};
  const popupContaineRegister =
        document.querySelector(".popup-container-register") || {};

  const popupContaineLogin =
        document.querySelector(".popup-container-login") || {};

  popupContaineRegister.onclick = (e) => {
    hidden(popupContaineRegister);
  };

  closeBtn.onclick = (e) => {
    e.stopPropagation();
    hidden(popupContaineRegister);
  };

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

  function to_airprepay(type){

    $.ajax({
      type : "POST",
      url : 'islogin', 
      contentType : "application/json;charset=utf-8",
      success : function(data){
              console.log("response",data);
              if(data['code'] == "success"){
                window.location.href = "./airprepay?type="+type;
              }else{
                show(popupContaineLogin)
                return;
              }
            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error happend, try it later!")
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log("aaa", textStatus);
            },

      complete: function(XMLHttpRequest, textStatus) {
                  this; // 调用本次AJAX请求时传递的options参数
            }
      });

  }

  price0btn.onclick = (e) => {
    console.log("to register")
    show(popupContaineRegister)
  };

  price1btn.onclick = (e) => {
    document.getElementById("order_type").value = "picstrick_type1"
    let type = document.getElementById('order_type').value;
    console.log("visa the order_type:", type)
    show(popupContainePay)
    // to_airprepay(type)
  };

  price2btn.onclick = (e) => {
    document.getElementById("order_type").value = "picstrick_type2"
    let type = document.getElementById('order_type').value;
    console.log("visa the order_type:", type)
    //show(popupContainePay)
    to_airprepay(type)
  };

  price3btn.onclick = (e) => {
    document.getElementById("order_type").value = "picstrick_type3"
    let type = document.getElementById('order_type').value;
    console.log("visa the order_type:", type)
    //show(popupContainePay)
    to_airprepay(type)
  };

  closePayBtn.onclick = (e) => {
    hidden(popupContainePay)
  };
  
  //not inused
  function is_couponCode_valid(code){
     return true
  }

  couponSubmit.onclick = (e) => {
    let type = document.getElementById('order_type').value;
    console.log("visa the order_type:", type)
    let code = document.getElementById('coupon-code').value
    if(code != ""){   
          $.ajax({
            type : "POST",
            url : 'codevalid', 
            data : JSON.stringify({code:code}),
            contentType : "application/json;charset=utf-8",
            success : function(data){
                    console.log("response",data);
                    if(data['code'] == "success"){
                      window.location.href = "./airprepay?type="+type+"&code="+code;
                    }else{
                      alert(data['msg'])
                      return;
                    }
                  },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                      alert("error happend, try it later!")
                      console.log(XMLHttpRequest.status);
                      console.log(XMLHttpRequest.readyState);
                      console.log("aaa", textStatus);
                  },
      
            complete: function(XMLHttpRequest, textStatus) {
                        this; // 调用本次AJAX请求时传递的options参数
                  }
            });
    }else{
        window.location.href = "./airprepay?type="+type;
    } 

  }

  paypalSubmit.onclick = (e) => {
    let type = document.getElementById('order_type').value;
    console.log("the order_type:", type)
    
    if(type == ""){
      alert("you should select one product")
      return 
    }

    let is_paying = document.getElementById("is_paying");
    console.log("is_paying", is_paying.value)
    if(is_paying.value == "True"){
      alert("you are in paying, wait please!")
      return 
    }

    is_paying.value = "True"

    $.ajax({
      type : "POST",
      url : 'paypalprepay', 
      data : JSON.stringify({type:type}),
      contentType : "application/json;charset=utf-8",
      success : function(data){
              console.log("response",data);
              is_paying.value = "False"
              if(data['code'] == "success"){
                //is_swaping.value = "False"
                window.location.href = data['redirect']
              }else{
                alert(data['msg']);
                return;
              }
            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                is_paying.value = "False"
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log("aaa", textStatus);
            },

      complete: function(XMLHttpRequest, textStatus) {
                  is_paying.value = "False"
                  this; // 调用本次AJAX请求时传递的options参数
            }
      });

  };

})();