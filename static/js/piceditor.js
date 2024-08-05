(function () {

  const compressstep1img = document.getElementById("compress-step1-img") || {};
  const compressstep1btn = document.getElementById("compress-step-btn1") || {};
  const compressstep2btn = document.getElementById("compress-step-btn2") || {};

  const editorstep1btn = document.getElementById("editor-step-btn1") || {};
  const editorstep2btn = document.getElementById("editor-step-btn2") || {};
  const editorstep1img = document.getElementById("editor-step1-img") || {};

  const popupContaineRegister = document.querySelector(".popup-container-register") || {};
  
  window.onload = function () {
    var swiper = new Swiper(".swiper-container", {
      autoplay: 2000,
      speed: 2000,
      autoplayDisableOnInteraction: false,
      loop: true,
      centeredSlides: true,
      slidesPerView: 2,
      // pagination: ".swiper-pagination",
      // paginationClickable: true,
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
      onInit: function (swiper) {
        swiper.slides[2].className = "swiper-slide swiper-slide-active"; //第一次打开不要动画
      },
      breakpoints: {
        668: {
          slidesPerView: 1,
        },
      },
    });
  };

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

  $('#compress-file-1').change(function(event) {
    var fileTmp = event.target.files[0];
    console.log("fileTmps, files length");
    let bold = window.URL.createObjectURL(fileTmp);
    compressstep1img.setAttribute("src", bold);

  });

  compressstep1btn.onclick = (e) => {
    // file 转 blob对象
    $('#compress-file-1').click()
  };

  compressstep2btn.onclick = (e) => {
    // file 转 blob对象
    let pic1 = document.getElementById('compress-file-1');
    console.log("compressstep2btn the file:", pic1.files.length)
    let example1 = document.getElementById("input-filename-1").value
    if(pic1.files.length == 0 && example1 == ""){
      alert("you should upload 1 pictures fist")
      return 
    }

    var formData = new FormData();
    formData.append("img1", pic1.files[0]);
    formData.append("example1", example1)

    let picOut = document.getElementById('compress-step2-img');
    let isCompressing = document.getElementById("is_compressing");
    if(isCompressing.value == "True"){
      alert("you are in compressing, wait please!")
      return 
    }

    isCompressing.value = "True";
    picOut.setAttribute("src", "../static/img/loading.gif");
    $.ajax({
      type : "POST",
      url : 'startcompress', 
      data: formData,
      dataType : 'JSON',
      cache : false, // 不缓存
      processData : false, // jQuery不要去处理发送的数据
      contentType : false, // jQuery不要去设置Content-Type请求头
      //dataType : "json",
      
      success : function(data){
              isCompressing.value = "False"
              if(data['code'] == "success"){
                console.log("response",data);
                picOut.setAttribute("src", data['outputpath']);
                $("#download_compress_a").attr("href", data['outputpath']); 
                document.getElementById("profile-credits").innerHTML="credits:"+data['credits'];
              }else{
                alert(data['msg']);
                picOut.setAttribute("src", "../static/img/500.png");
                return;
              }
              
            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                isCompressing.value = "False"
                if(XMLHttpRequest.status  == 403 ){
                  alert("You need login first!");
                  show(popupContaineRegister);
                  return;
                }

                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log("aaa", textStatus);
            },

      complete: function(XMLHttpRequest, textStatus) {
                isCompressing.value = "False"
                    this; //
            }
      });
  };

  $('#editor-up-file-1').change(function(event) {
    var fileTmp = event.target.files[0];
    console.log("fileTmps, files length");
    let bold = window.URL.createObjectURL(fileTmp);
    editorstep1img.setAttribute("src", bold);

  });

  editorstep1btn.onclick = (e) => {
    // file 转 blob对象
    $('#editor-up-file-1').click()
  };

  editorstep2btn.onclick = (e) => {
    // file 转 blob对象
    let pic1 = document.getElementById('editor-up-file-1');
    console.log("editor the file:", pic1.files.length)
    let example1 = document.getElementById("input-filename-1").value
    if(pic1.files.length == 0 && example1 == ""){
      alert("you should upload 1 pictures fist")
      return 
    }

    var type = $("input[name='radio']:checked").val();

    var formData = new FormData();
    formData.append("img1", pic1.files[0]);
    formData.append("example1", example1)
    formData.append("type", type)
    

    let picOut = document.getElementById('editor-step2-img');
    let isEditoring = document.getElementById("is_editoring");
    if(isEditoring.value == "True"){
      alert("you are in editoring, wait please!")
      return 
    }

    isEditoring.value = "True";
    picOut.setAttribute("src", "../static/img/loading.gif");
    $.ajax({
      type : "POST",
      url : 'starteditor', 
      data: formData,
      dataType : 'JSON',
      cache : false, // 不缓存
      processData : false, // jQuery不要去处理发送的数据
      contentType : false, // jQuery不要去设置Content-Type请求头
      //dataType : "json",
      
      success : function(data){
              isEditoring.value = "False"
              if(data['code'] == "success"){
                console.log("response",data);
                picOut.setAttribute("src", data['outputpath']);
                $("#download_editor_a").attr("href", data['outputpath']); 
                document.getElementById("profile-credits").innerHTML="credits:"+data['credits'];
              }else{
                alert(data['msg']);
                picOut.setAttribute("src", "../static/img/500.png");
                return;
              }
              
            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                isEditoring.value = "False"
                if(XMLHttpRequest.status  == 403 ){
                  alert("You need login first!");
                  show(popupContaineRegister);
                  return;
                }

                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log("aaa", textStatus);
            },

      complete: function(XMLHttpRequest, textStatus) {
               isEditoring.value = "False"
                    this; //
            }
      });
  };

  const step1ProfileList = document.querySelector(".step1-profile-click");
  const step1Profile = document.querySelector(".step1-profile");
  // const step2ProfileList = document.querySelector(".step2-profile-click");
  // const step2Profile = document.querySelector(".step2-profile");

  function setImgUrl(parent, currentImg, id) {
      parent.onclick = (e) => {
        if (e.target && e.target.nodeName === "IMG") {
          const currentUrl = e.target.getAttribute("src");
          currentImg.src = currentUrl;
          document.getElementById(id).value = currentUrl
        }
      };
  }

  setImgUrl(step1ProfileList, step1Profile, "input-filename-1");
  //setImgUrl(step2ProfileList, step2Profile);

})();
