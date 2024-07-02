jQuery(document).ready(function () {
  ImgUpload();
});

function HideFirstImg() {
  var firstImg = document.getElementById('upload-img1');
  firstImg.style.display = 'none';
}
var imgArray = [];

function ImgUpload() {
  var imgWrap = '';

  $('.upload__inputfile').each(function () {
    $(this).on('change', function (e) {
      imgWrap = $(this).closest('.upload__box').find('.upload_img-wrap_inner');
      var maxLength = 12;
      var files = e.target.files;
      var filesArr = Array.prototype.slice.call(files);
      var uploadBtnBox = document.getElementById('checking-img');
      var errorMessageDiv = document.getElementById('error-message');

      if (imgArray.length + filesArr.length > maxLength) {
        uploadBtnBox.disabled = true;
        errorMessageDiv.textContent = 'بحد أدنى صورة واحدة (۱) وحدأقصى اثني عشرة صورة (۱۲) ';
        errorMessageDiv.style.display = 'block';
      } else {
        uploadBtnBox.disabled = false;
        errorMessageDiv.style.display = 'none';
      }

      for (var i = 0; i < Math.min(filesArr.length, maxLength - imgArray.length); i++) {
        (function(f) {
          if (!f.type.match('image.*')) {
            return;
          }

          var reader = new FileReader();
          reader.onload = function (e) {
            var html =
              "<div class='upload__img-box'><div style='background-image: url(" +
              e.target.result +
              ")' data-number='" +
              $('.upload__img-close').length +
              "' data-file='" +
              f.name +
              "' class='img-bg'><div class='upload__img-close'><img src='delete.png'></div></div></div>";
            imgWrap.append(html);
            imgArray.push({
              f: f,
              url: e.target.result
            });
            console.log(imgArray);
          };
          reader.readAsDataURL(f);
        })(filesArr[i]);
      }
    });
  });

  $('body').on('click', '.upload__img-close', function (e) {
    e.stopPropagation(); 
    var file = $(this).parent().data('file');

    for (var i = 0; i < imgArray.length; i++) {
      if (imgArray[i].f.name === file) {
        imgArray.splice(i, 1);
        break;
      }
    }

    $(this).parent().parent().remove();
    console.log(imgArray);

    var maxLength = 12;
    var uploadBtnBox = document.getElementById('checking-img');
    var errorMessageDiv = document.getElementById('error-message');
    
    if (imgArray.length >= maxLength) {
      uploadBtnBox.disabled = true;
      errorMessageDiv.textContent = 'بحد أدنى صورة واحدة (۱) وحدأقصى اثني عشرة صورة (۱۲) ';
      errorMessageDiv.style.display = 'block';
    } else {
      uploadBtnBox.disabled = false;
      errorMessageDiv.style.display = 'none';
    }
  });

  $('body').on('click', '.img-bg', function (e) {
    var imageUrl = $(this).css('background-image');
    $('#preview-image').attr('src', imageUrl);
    $('#image-preview').modal('show');
  });
}
/////////////////////////////////////////////////////////////////////////search-icon-payment///////////////////////////////////////////////////////////////////
const imagePay = document.getElementById('payment-extra-details');
const dropdownPay = document.getElementById('dropdown-content-payment');

imagePay.addEventListener('click', function () {
    if (dropdownPay.style.display === 'block') {
        dropdownPay.style.display = 'none';
    } else {
        dropdownPay.style.display = 'block';
    }
});
 

// ///////////////timer function/////////////////////
var interval; 
var lastClickedButtonId; 

function TimerFunction(buttonId){
  if (buttonId !== lastClickedButtonId || !interval) {
    if (interval) {
      clearInterval(interval); 
    }
    lastClickedButtonId = buttonId; 
    var display = document.querySelector('#timerDiv');
    var timer = 90 , minutes, seconds;
    interval =  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = 0;
        clearInterval(interval); 
        $('#checkModalToggle').modal('hide');
      }
    }, 1000);
  }
}
