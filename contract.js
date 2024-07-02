var current_fs, next_fs, previous_fs;
$(".next").click(function () {
  current_fs = $(this).closest("fieldset");
  next_fs = $(this).closest("fieldset").next();

  if (
    $("#progressbar li").eq($("fieldset").index(next_fs))[0].id == "add-driver"
  ) {
    var checkbox = document.getElementById("addational-driver");

    if (checkbox.checked) {
      next_fs = $(this).closest("fieldset").next();
    } else {
      next_fs = $(this).closest("fieldset").next().next();
    }
  }

  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

  // Show the next fieldset
  next_fs.show();
  // Hide the current fieldset with style
  current_fs.hide();
});

$(".previous").click(function () {
  current_fs = $(this).closest("fieldset");
  previous_fs = $(this).closest("fieldset").prev();

  if (
    $("#progressbar li").eq($("fieldset").index(current_fs))[0].id == "options"
  ) {
    var checkbox = document.getElementById("addational-driver");

    if (checkbox.checked) {
      previous_fs = $(this).closest("fieldset").prev();
    } else {
      previous_fs = $(this).closest("fieldset").prev().prev();
    }
  }

  $("#progressbar li")
    .eq($("fieldset").index(current_fs))
    .removeClass("active");

  // Show the previous fieldset
  previous_fs.show();
  // Hide the current fieldset with style
  current_fs.hide();
});

///////////////////////////////////////////////the-Modal-6-digit-vaildation/////////////////////
function openThirdPopup() {
  // Hide the second popup modal
  $("#checkModalToggle").modal("hide");

  // Open the third popup modal
  $("#thirdPopupModal").modal("show");

  // Close the third popup modal after 5 seconds
  setTimeout(function () {
    $("#thirdPopupModal").modal("hide");
  }, 5000); // Adjust the duration as needed (in milliseconds)
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#otc").addEventListener("submit", function (event) {
    event.preventDefault();
    var inputFieldValue = document.getElementById("otc-1");
    var numericValue = parseInt(inputFieldValue.value);

    if (isNaN(numericValue)) {
      // Input value is not a number or is empty
      console.log("Input value:", numericValue);
      return;
    }
    $.ajax({
      type: "POST",
      url: "https://jsonplaceholder.typicode.com/posts", // Using JSONPlaceholder as a mock server
      data: $(this).serialize(),
      success: function (response) {
        // Handle the response from the mock server
        console.log("Form data submitted successfully:", response);
        openThirdPopup();
      },
      error: function (error) {
        // Handle any errors
        console.error("Error submitting form data:", error);
      },
    });
    document.getElementById("otc-1").value = "";
    document.getElementById("otc-2").value = "";
    document.getElementById("otc-3").value = "";
    document.getElementById("otc-4").value = "";
    document.getElementById("otc-5").value = "";
    document.getElementById("otc-6").value = "";
  });
});

let in1 = document.getElementById("otc-1"),
  ins = document.querySelectorAll('input[type="number"]'),
  splitNumber = function (e) {
    let data = e.data || e.target.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
    if (!data) return; // Shouldn't happen, just in case.
    if (data.length === 1) return; // Here is a normal behavior, not a paste action.

    popuNext(e.target, data);
  },
  popuNext = function (el, data) {
    el.value = data[0]; // Apply first item to first input
    data = data.substring(1); // remove the first char.
    if (el.nextElementSibling && data.length) {
      // Do the same with the next element and next data
      popuNext(el.nextElementSibling, data);
    }
  };

ins.forEach(function (input) {
  /**
	 * Control on keyup to catch what the user intent to do.
	 ... */
  input.addEventListener("keyup", function (e) {
    // Break if Shift, Tab, CMD, Option, Control.
    if (
      e.keyCode === 16 ||
      e.keyCode == 9 ||
      e.keyCode == 224 ||
      e.keyCode == 18 ||
      e.keyCode == 17
    ) {
      return;
    }

    // On Backspace or left arrow, go to the previous field.
    if (
      (e.keyCode === 8 || e.keyCode === 37) &&
      this.previousElementSibling &&
      this.previousElementSibling.tagName === "INPUT"
    ) {
      this.previousElementSibling.select();
    } else if (e.keyCode !== 8 && this.nextElementSibling) {
      this.nextElementSibling.select();
    }

    // If the target is populated too quickly, value length can be > 1
    if (e.target.value.length > 1) {
      splitNumber(e);
    }
  });

  input.addEventListener("focus", function (e) {
    if (this === in1) return;

    if (in1.value == "") {
      in1.focus();
    }
    if (this.previousElementSibling.value == "") {
      this.previousElementSibling.focus();
    }
  });
  const B = document.querySelector(".check-btn.check");
});
in1.addEventListener("input", splitNumber);

// // //////////////////////choose-adriver-display////////////////
document.addEventListener("DOMContentLoaded", function () {
  var driverRadio1 = document.getElementById("driver1");
  var driverRadio2 = document.getElementById("driver2");
  var dropdownContainer = document.getElementById("dropdown-container");

  driverRadio1.addEventListener("click", function () {
    dropdownContainer.style.display = "none";
  });

  driverRadio2.addEventListener("click", function () {
    if (this.checked) {
      dropdownContainer.style.display = "block";
    } else {
      dropdownContainer.style.display = "none";
    }
  });
});

//////////////////////////serch-icon-list-for Tenant////////////////////////
const image = document.getElementById("hover-image");
const dropdown = document.getElementById("dropdown-content");

image.addEventListener("mouseover", function () {
  dropdown.style.display = "block";
});

image.addEventListener("mouseout", function () {
  dropdown.style.display = "none";
});
///////////////serch-icon-list-for driver/////////////////////
const imageDriver = document.getElementById("hover-image-driver");
const dropdown2 = document.getElementById("dropdown-content-driver");

imageDriver.addEventListener("mouseover", function () {
  dropdown2.style.display = "block";
});

imageDriver.addEventListener("mouseout", function () {
  dropdown2.style.display = "none";
});
/////////////////serch-icon-list-for add driver//////////////////////
const imageAddDriver = document.getElementById("hover-image-Add-driver");
const dropdown3 = document.getElementById("dropdown-content-Add-driver");

imageAddDriver.addEventListener("mouseover", function () {
  dropdown3.style.display = "block";
});

imageAddDriver.addEventListener("mouseout", function () {
  dropdown3.style.display = "none";
});

// // /////////////////////////////////////////
let isScrolling = false;
let startX, startY, scrollLeft, scrollTop;

const scrollContainer = document.getElementById("scrollContainer");

// Mouse events
scrollContainer.addEventListener("mousedown", (e) => {
  isScrolling = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  startY = e.pageY - scrollContainer.offsetTop;
  scrollLeft = scrollContainer.scrollLeft;
  scrollTop = scrollContainer.scrollTop;
});

scrollContainer.addEventListener("mouseleave", () => {
  isScrolling = false;
});

scrollContainer.addEventListener("mouseup", () => {
  isScrolling = false;
});

scrollContainer.addEventListener("mousemove", (e) => {
  if (!isScrolling) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const y = e.pageY - scrollContainer.offsetTop;
  const walkX = (x - startX) * 2;
  const walkY = (y - startY) * 2;
  scrollContainer.scrollLeft = scrollLeft - walkX;
  scrollContainer.scrollTop = scrollTop - walkY;
});

// Touch events
scrollContainer.addEventListener("touchstart", (e) => {
  isScrolling = true;
  startX = e.touches[0].pageX - scrollContainer.offsetLeft;
  startY = e.touches[0].pageY - scrollContainer.offsetTop;
  scrollLeft = scrollContainer.scrollLeft;
  scrollTop = scrollContainer.scrollTop;
});

scrollContainer.addEventListener("touchmove", (e) => {
  if (!isScrolling) return;
  e.preventDefault();
  const x = e.touches[0].pageX - scrollContainer.offsetLeft;
  const y = e.touches[0].pageY - scrollContainer.offsetTop;
  const walkX = (x - startX) * 2;
  const walkY = (y - startY) * 2;
  scrollContainer.scrollLeft = scrollLeft - walkX;
  scrollContainer.scrollTop = scrollTop - walkY;
});

scrollContainer.addEventListener("touchend", () => {
  isScrolling = false;
});

// // //////////////////////////////////////////////// رفع صورة التوقيع ////////////////////////////////////////////////////////////////////////

//variables//
let saveSignatureBtn = null;

document
  .getElementById("UploadSigntaurePic")
  .addEventListener("click", function () {
    saveSignatureBtn = "UploadSigntaurePic";
  });

document
  .getElementById("WriteSignature")
  .addEventListener("click", function () {
    saveSignatureBtn = "WriteSignature";
  });
const uploadContainer = document.querySelector(".upload-container");
const mainContainer = document.querySelector(".main-container");
const UploadSigntaurePic = document.getElementById("UploadSigntaurePic");
const imageUpload = document.getElementById("imageUpload");
var imgeURL;
const uploadedImg = null;
//

UploadSigntaurePic.addEventListener("click", function () {
  imageUpload.click();
});

imageUpload.addEventListener("change", function () {
  const file = imageUpload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageURL = e.target.result;
      const previewImage = document.createElement("img");
      previewImage.classList.add("preview-image");
      previewImage.src = imageURL;
      previewImage.id = "signatureImage";
      imgeURL = imageURL;
      mainContainer.innerHTML =
        '<i class="fa-regular fa-circle-xmark"  style="cursor: pointer;"></i>';
      uploadContainer.innerHTML = "";
      uploadContainer.appendChild(previewImage);
      uploadContainer.classList.add("previewing");
    };
    reader.readAsDataURL(file);
  }
});

removeSignatureImg.addEventListener("click", function (event) {
  event.preventDefault();
  if (uploadContainer.firstChild) {
    uploadContainer.innerHTML = "";
    mainContainer.innerHTML = "";
    uploadContainer.classList.remove("previewing");
    uploadContainer.innerHTML =
      ' <img class="upload-icon" src="img/Rectangle 144.png" alt="Upload Icon"><p>ارفق صورة التوقيع</p>';
  }
});
// // //////////////////////////////////////////////// كتابة التوقيع ////////////////////////////////////////////////////////////////////////
const WriteSignature = document.getElementById("WriteSignature");
WriteSignature.addEventListener("click", function () {
  uploadContainer.innerHTML = "";
  mainContainer.innerHTML = "";
  uploadContainer.innerHTML =
    '<canvas id="canvas" width="200" height="200" class="mb-2"></canvas>';
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 4;

  var drawing = false;
  var prevX = 0;
  var prevY = 0;
  var currX = 0;
  var currY = 0;

  function drawLine(x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
  }

  canvas.addEventListener("mousedown", handleMouseDown, false);
  canvas.addEventListener("mousemove", handleMouseMove, false);
  canvas.addEventListener("mouseup", handleMouseUp, false);

  canvas.addEventListener("touchstart", handleTouchStart, false);
  canvas.addEventListener("touchmove", handleTouchMove, false);
  canvas.addEventListener("touchend", handleTouchEnd, false);

  function handleMouseDown(e) {
    drawing = true;
    prevX = e.clientX - canvas.getBoundingClientRect().left;
    prevY = e.clientY - canvas.getBoundingClientRect().top;
  }

  function handleMouseMove(e) {
    if (!drawing) return;
    currX = e.clientX - canvas.getBoundingClientRect().left;
    currY = e.clientY - canvas.getBoundingClientRect().top;

    drawLine(prevX, prevY, currX, currY);
    prevX = currX;
    prevY = currY;
  }

  function handleMouseUp() {
    drawing = false;
  }

  function handleTouchStart(e) {
    drawing = true;
    prevX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    prevY = e.touches[0].clientY - canvas.getBoundingClientRect().top;
  }

  function handleTouchMove(e) {
    if (!drawing) return;
    currX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    currY = e.touches[0].clientY - canvas.getBoundingClientRect().top;

    drawLine(prevX, prevY, currX, currY);
    prevX = currX;
    prevY = currY;
  }

  function handleTouchEnd() {
    drawing = false;
  }
  // Clear the canvas
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  document.getElementById("clear").addEventListener("click", function () {
    clearCanvas();
  });
 
});
 // Save the written signature as an image
 function SaveWrittenSignature() {
	var canvas = document.getElementById("canvas");
    var dataURL = canvas.toDataURL();
    var link = document.createElement("a");
    link.href = dataURL;
    console.log(link.href);
    $("#signature-modal").modal("hide");

  }
 // Save the uploded signature image
 function SaveUplodedSignature() {
    const img = document.getElementById("signatureImage");
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL("image/jpeg");
    console.log(base64);
    $("#signature-modal").modal("hide");

  }
  document.getElementById("save").addEventListener("click", function () {
    if (saveSignatureBtn === "UploadSigntaurePic") {
      SaveUplodedSignature();
    } else if (saveSignatureBtn === "WriteSignature") {
      SaveWrittenSignature();
    } else {
      console.log("No button has been clicked yet");
    }
  });