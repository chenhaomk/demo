(function () {
  const tab = document.querySelector(".tab") || {};
  const content2 = document.querySelector(".tab-content2") || {};
  const content1 = document.querySelector(".tab-content1") || {};
  const content3 = document.querySelector(".tab-content3") || {};
  const step1btn = document.getElementById("step-btn1") || {};
  const step2btn = document.getElementById("step-btn2") || {};
  const step1img = document.getElementById("step1-img") || {};
  const step2img = document.getElementById("step2-img") || {};
  const step3btn = document.getElementById("step-btn3") || {};

  const multistep1btn = document.getElementById("multi-step-btn1") || {};
  const multistep1img = document.getElementById("multi-file-1") || {};
  const multistep2btn = document.getElementById("multi-step-btn2") || {};
  const multistep2img = document.getElementById("multi-file-2") || {};
  const multistep3btn = document.getElementById("multi-step-btn3") || {};

  const multishow1img = document.getElementById("step1-show-img") || {};
  const multishow2img = document.getElementById("step2-show-img") || {};

  const videostep1btn = document.getElementById("video-step-btn1") || {};
  const videostep1img = document.getElementById("video-step1-img") || {};
  const videostep2btn = document.getElementById("video-step-btn2") || {};
  const videostep2img = document.getElementById("video-step2-img") || {};
  const videostep3btn = document.getElementById("video-step-btn3") || {};

  const compressstep1img = document.getElementById("compress-file-1") || {};
  const compressstep1btn = document.getElementById("compress-step-btn1") || {};
  const compressstep2img = document.getElementById("compress-file-2") || {};
  const compressstep2btn = document.getElementById("compress-step-btn2") || {};

  const login = document.querySelector(".login") || {};
  const profile = document.querySelector(".profile") || {};
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
  }

  function hidden(e) {
    if (e && e.classList) {
      e.classList.add("hidden");
    }
  }

  const getPutPresingUrl = function (opt, callback) {
    //const url = `https://www.picstrick.com/getpresignurl?name=${opt.fileName}`;
    const url = `http://127.0.0.1:10000/getpresignurl?name=${opt.fileName}`;
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, false);
    xhr.onload = function (e) {
      let info;
      try {
        const result = JSON.parse(e.target.responseText);
        console.log(result)
        info = result;
      } catch (e) {
         console.error(xhr.responseText);
         callback('get presign url failed');
      }

      if (info) {
        // console.log(credentials);
        callback(null, info);
      } else {
        console.error(xhr.responseText);
        callback('get presign url failed');
      }
    };

    xhr.onerror = function (e) {
      callback('get presign url failed');
      return 
    };
    xhr.send();
  };


  // 上传文件
  const uploadFile = function (file, callback) {
    const fileName = file.name;

    console.log("the filename:", fileName)

    getPutPresingUrl({ fileName }, function (err, info) {
      if (err) {
        alert(err);
        return;
      }

      const url = info.url
      console.log("the upload url:", url)
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url, false);
      xhr.withCredentials = true;
      console.time()
      xhr.upload.onprogress = function (e) {
        console.log(
          'progress ' +
            Math.round((e.loaded / e.total) * 10000) / 100 +
            '%'
        );
      };
      xhr.onload = function () {
        if (/^2\d\d$/.test('' + xhr.status)) {
          const ETag = xhr.getResponseHeader('etag');
          console.timeEnd()
          callback(null, { url: url, ETag: ETag });
        } else {
          callback(' file '  +' upload failed， status：' + xhr.status);
        }
      };
      xhr.onerror = function () {
        callback(
          'file ' + ' fail, please check CORS rule'
        );
      };
      xhr.send(file);
    });
  };


  tab.onclick = (e) => {
    const children = tab.children;
    var index = Array.prototype.indexOf.call(children, e.target);
    if (index === 0) {
      content1.classList.remove("hidden");
      content2.classList.add("hidden");
      content3.classList.add("hidden")
    } else if (index == 1) {
      content1.classList.add("hidden");
      content2.classList.remove("hidden");
      content3.classList.add("hidden")
    } else {
      content1.classList.add("hidden");
      content2.classList.add("hidden");
      content3.classList.remove("hidden")
    }
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("li-active");
    }
    if (e.target && e.target.nodeName === "LI") {
      e.target.classList.add("li-active");
    }
  };

  $('#up-file-1').change(function(event) {
    var fileTmp = event.target.files[0];
    console.log("fileTmps, files length");
    let bold = window.URL.createObjectURL(fileTmp);
    step1img.setAttribute("src", bold);

  });

  step1btn.onclick = (e) => {
    // file 转 blob对象
    console.log("start select")
    $('#up-file-1').click()

  };

  $('#up-file-2').change(function(event) {
    var fileTmp = event.target.files[0];
    console.log("fileTmps, files length");
    let bold = window.URL.createObjectURL(fileTmp);
    step2img.setAttribute("src", bold);
  });


  step2btn.onclick = (e) => {
    // file 转 blob对象
    $('#up-file-2').click() 
  };

  step3btn.onclick = (e) => {
    // file 转 blob对象
    let pic1 = document.getElementById('up-file-1');
    let pic2 = document.getElementById('up-file-2');
    let example1 = document.getElementById('input-filename-1').value;
    let example2 = document.getElementById("input-filename-2").value;
    
    console.log("the file:", pic1.files.length, pic2.files.length, "aaa"+ example1, "bbbb"+example2 )
    if((pic1.files.length == 0  && example1 == "") || (pic2.files.length == 0  && example2 == "")){
      alert("you should upload 2 pictures fist")
      return 
    }

    let is_swaping = document.getElementById("is_swaping");
    console.log("is_in_swaping", is_swaping.value)
    if(is_swaping.value == "True"){
      alert("you are in swaping, wait please!")
      return 
    }

    var formData = new FormData();
    formData.append("img1", pic1.files[0]);
    formData.append("img2", pic2.files[0]);
    formData.append("example1", example1)
    formData.append("example2", example2)

    is_swaping.value = "True"
    let picOut = document.getElementById('output_img')

    picOut.setAttribute("src", "../static/img/loading.gif");

    $.ajax({
      type : "POST",
      url : 'startswap', 
      data: formData,
      dataType : 'JSON',
      cache : false, // 不缓存
      processData : false, // jQuery不要去处理发送的数据
      contentType : false, // jQuery不要去设置Content-Type请求头
      //dataType : "json",
      success : function(data){
              console.log("response",data);
              is_swaping.value = "False"
              if(data['code'] == "success"){
                picOut.setAttribute("src", data['outputpath']);
                $("#download_a").attr("href", data['outputpath']); 
                document.getElementById("profile-credits").innerHTML="credits:"+data['credits']
              }else{
                alert(data['msg']);
                picOut.setAttribute("src", "../static/img/500.png");
                return;
              }

            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                is_swaping.value = "False"
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
                  is_swaping.value = "False"
                    this; // 调用本次AJAX请求时传递的options参数
            }
      });

  };

  $('#multi-file-1').change(function(event) {
    var fileTmp = event.target.files[0];
    console.log("fileTmps, files length");
    let bold = window.URL.createObjectURL(fileTmp);
    multishow1img.setAttribute("src", bold);
  });

  multistep1btn.onclick = (e) => {
    $('#multi-file-1').click()
  };

  $('#multi-file-2').change(function(event) {
    var fileTmp = event.target.files[0];
    console.log("fileTmps, files length");
    let bold = window.URL.createObjectURL(fileTmp);
    multishow2img.setAttribute("src", bold);
  });

  multistep2btn.onclick = (e) => {
    $('#multi-file-2').click();
  };

  multistep3btn.onclick = (e) => {
    // file 转 blob对象
    let pic1 = document.getElementById('multi-file-1');
    let pic2 = document.getElementById('multi-file-2');
    
    console.log("the file:", pic1.files.length, pic2.files.length)
    if(pic1.files.length == 0 || pic2.files.length == 0){
      alert("you should upload 2 pictures fist")
      return 
    }

    var formData = new FormData();
    formData.append("img1", pic1.files[0]);
    formData.append("img2", pic2.files[0]);

    let picOut = document.getElementById('multi-outimg');
    let is_swaping = document.getElementById("is_swaping");
    if(is_swaping.value == "True"){
      alert("you are in swaping, wait please!")
      return 
    }
    is_swaping.value = "True";
    picOut.setAttribute("src", "../static/img/loading.gif");

    download = document.querySelector(".share-button-profile") || {};
    
    $.ajax({
      type : "POST",
      url : 'startmultiswap', 
      data: formData,
      dataType : 'JSON',
      cache : false,
      processData : false,
      contentType : false, 
      //dataType : "json",
      
      success : function(data){
              console.log("response",data);
              is_swaping.value = "False";
              if(data['code'] == "success"){
                picOut.setAttribute("src", data['outputpath']);
                $("#download_multi_a").attr("href", data['outputpath']); 
                document.getElementById("profile-credits").innerHTML="credits:"+data['credits'];
              }else{
                alert(data['msg']);
                picOut.setAttribute("src", "../static/img/500.png");
                return;
              }
            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                is_swaping.value = "False"
                picOut.setAttribute("src", "../static/img/500.png");
                
                if(XMLHttpRequest.status  == 403 ){
                  alert("You need login first!");
                  show(popupContaineRegister);
                  return;
                }

                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log("server error happend", textStatus);
            },

      complete: function(XMLHttpRequest, textStatus) {
              is_swaping.value = "False"
              this; //
            }
      });

  };

  $('#video-up-file-1').change(function(event) {
    var fileTmp = event.target.files[0];
    console.log("fileTmps, files length");
    let bold = window.URL.createObjectURL(fileTmp);
    videostep1img.setAttribute("src", bold);
    // uploadFile(fileTmp, function (err, data) {
    //   if(err){
    //     alert(err)
    //   }
    // })  
  });

  videostep1btn.onclick = (e) => {
    // file 转 blob对象
    console.log("start select")
    $('#video-up-file-1').click()
  };

  $('#video-up-file-2').change(function(event) {
    var fileTmp = event.target.files[0];
    console.log("fileTmps, files length");
    let bold = window.URL.createObjectURL(fileTmp);
    videostep2img.setAttribute("src", bold);
    // uploadFile(fileTmp, function (err, data) {
    //   if(err){
    //     alert(err)
    //   }
    // }) 
  });

  videostep2btn.onclick = (e) => {
    console.log("step2 select")
    $('#video-up-file-2').click() 
  };

  async function startvideoSwap(is_swaping,picOut, pic1, video, example1, example2){
    needStop = false
    pic1Name = ''
    if(pic1.files.length > 0)
    {
      pic1Name = pic1.files[0].name
      uploadFile(pic1.files[0], function (err, data) {
        if(err){
          alert(err)
          needStop = true
          picOut.setAttribute("src", "../static/img/500.png");
        }
      })      
    }

    if(needStop){
      console.log("request cos failed, contack the adminsitor of pickstrick")
      return
    }
    
    videoName = ''
    if(video.files.length > 0){
      videoName = video.files[0].name
      uploadFile(video.files[0], function(err, data) {
        if(err)
        {
          alert(err)
          needStop = true
          picOut.setAttribute("src", "../static/img/500.png");
        }
      });
    }

    if(needStop){
      console.log("request cos failed, contack the adminsitor of pickstrick")
      return
    }

    is_swaping.value = "True"
    $.ajax({
      type : "POST",
      url : 'videostartswap', 
      data : JSON.stringify({img1:pic1Name, video:videoName, example1:example1, example2:example2}),
      contentType : "application/json;charset=utf-8",
      //dataType : "json",
      success : function(data){
              console.log("response",data);
              if(data['code'] == "success"){
                is_swaping.value = "False"
                picOut.setAttribute("src", "../static/img/success.png");
                $("#video_download_a").attr("href", data['outputpath']); 
                document.getElementById("profile-credits").innerHTML="credits:"+data['credits']
              }else{
                alert(data['msg']);
                picOut.setAttribute("src", "../static/img/500.png");
                return;
              }

            },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
                is_swaping.value = "False"
                if(XMLHttpRequest.status  == 403 ){
                  alert("You need login first!");
                  show(popupContaineRegister);
                  return;
                }

                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log("server error ", textStatus);
                picOut.setAttribute("src", "../static/img/500.png");
            },

      complete: function(XMLHttpRequest, textStatus) {
                  is_swaping.value = "False"
                    this; // 调用本次AJAX请求时传递的options参数
            }
      });

  }

  videostep3btn.onclick = (e) => {

    if($(".profile").is(":hidden")){
      alert("you need login first!")
      return
    }

    console.log($(".profile").is(":hidden"))

    // file 转 blob对象
    let pic1 = document.getElementById('video-up-file-1');
    let video = document.getElementById('video-up-file-2');
    let example1 = document.getElementById('video-input-filename-1').value;
    let example2 = document.getElementById("video-input-filename-2").value;
    
    console.log("the select:", pic1.files.length, video.files.length, "example1："+ example1, "example2："+example2 )
    if((pic1.files.length == 0  && example1 == "") || (video.files.length == 0  && example2 == "")){
      alert("you should upload picture and video fist")
      return;
    }

    var videoS = video.size/1024/1024;
    if(videoS > 10){
       alert("video must be with in 10M");
       return;
    }

    let is_swaping = document.getElementById("is_swaping");
    console.log("videoswap is_in_swaping", is_swaping.value)
    if(is_swaping.value == "True"){
      alert("you are in swaping, wait please!")
      return;
    }


    let picOut = document.getElementById('video_output_img')
    picOut.setAttribute("src", "../static/img/loading.gif");

    console.log("set loader gif, and start swap now")

    startvideoSwap(is_swaping,picOut, pic1, video, example1, example2)
    
  };

  compressstep1btn.onclick = (e) => {
    // file 转 blob对象
    let fileTmp = document.getElementById('compress-file-1');
    console.log("fileTmps, files length", fileTmp.files.length);
    let bold = window.URL.createObjectURL(fileTmp.files[0]);
    compressstep1img.setAttribute("src", bold);
  };

  compressstep2btn.onclick = (e) => {
    // file 转 blob对象
    let pic1 = document.getElementById('compress-file-1');
    console.log("the file:", pic1.files.length, pic2.files.length)
    if(pic1.files.length == 0){
      alert("you should upload 1 pictures fist")
      return 
    }

    var formData = new FormData();
    formData.append("img1", pic1.files[0]);

    let picOut = document.getElementById('compressstep2img');
    let isCompressing = document.getElementById("is_compressing");
    if(isCompressing.value == "True"){
      alert("you are in compressing, wait please!")
      return 
    }
    isCompressing.value = "True";
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
              console.log("response",data);
              if(data['code'] == "success"){
                isCompressing.value = "False";
                picOut.setAttribute("src", data['outputpath']);
                $("#download_compress_a").attr("href", data['outputpath']); 
                document.getElementById("profile-credits").innerHTML="credits:"+data['credits'];
                
              }else{
                alert(data['msg']);
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
                    this; //
            }
      });

  };

  const commentBox = document.getElementById("comment-box");
  const comments = document.querySelectorAll(".comment");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let activeIndex = 0;

  function showComment(index) {
    comments.forEach((comment) => comment.classList.remove("active"));
    comments[index].classList.add("active");
    if (index === 3) {
      comments[0].classList.add("active");
    } else {
      comments[index + 1].classList.add("active");
    }
  }

  function nextComment() {
    activeIndex = (activeIndex + 1) % comments.length;
    console.log(activeIndex);
    showComment(activeIndex);
  }

  function prevComment() {
    console.log(activeIndex);
    activeIndex = (activeIndex - 1 + comments.length) % comments.length;
    showComment(activeIndex);
  }

  showComment(activeIndex);

  nextBtn.addEventListener("click", nextComment);
  prevBtn.addEventListener("click", prevComment);

  const step1ProfileList = document.querySelector(".step1-profile-click");
  const step1Profile = document.querySelector(".step1-profile");
  const step2ProfileList = document.querySelector(".step2-profile-click");
  const step2Profile = document.querySelector(".step2-profile");

  const videostep1ProfileList = document.querySelector(".video-step1-profile-click");
  const videostep1Profile = document.querySelector(".video-step1-profile");
  const videostep2ProfileList = document.querySelector(".video-step2-profile-click");
  const videostep2Profile = document.querySelector(".video-step2-profile");

  function setImgUrl(parent, currentImg, id) {
    parent.onclick = (e) => {
      if (e.target && e.target.nodeName === "IMG") {
        const currentUrl = e.target.getAttribute("src");
        currentImg.src = currentUrl;
        currentImg.setAttribute("src", currentUrl);
        document.getElementById(id).value = currentUrl
      }
    };
  }
  setImgUrl(step1ProfileList, step1Profile, "input-filename-1");
  setImgUrl(step2ProfileList, step2Profile, "input-filename-2");
  
  setImgUrl(videostep1ProfileList, videostep1Profile, "video-input-filename-1");
  setImgUrl(videostep2ProfileList, videostep2Profile, "video-input-filename-2");

})();