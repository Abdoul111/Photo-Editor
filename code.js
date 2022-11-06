const saturation = document.getElementById('saturation');
const contrast = document.getElementById('contrast');
const brightness = document.getElementById('brightness');
const sepia = document.getElementById('sepia');
const grayscale = document.getElementById('grayscale');
const blur = document.getElementById('blur');
const hueRotate = document.getElementById('hue-rotate');

const upload = document.getElementById('upload');
const download = document.getElementById('download');
const img = document.getElementById('img');

const reset = document.querySelector('span');
const imageBox = document.querySelector('.imageContainer');
const filtersBox = document.querySelector('.filters');
const uploadDiv = document.querySelector('.upload');
const imageSection = document.querySelector('.image');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

window.onload = function () {
  download.style.display = 'none';
  reset.style.display = 'none';
  imageBox.style.display = 'none';
  filtersBox.style.display = 'none';
}

function resetValues() {
  img.style.filter = 'none';
  context.filter = 'none';
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  saturation.value = 100;
  contrast.value = 100;
  brightness.value = 100;
  sepia.value = 0;
  grayscale.value = 0;
  blur.value = 0;
  hueRotate.value = 0;
}

upload.onchange = function () {
  resetValues();
  download.style.display = 'block';
  reset.style.display = 'block';
  imageBox.style.display = 'block';
  filtersBox.style.display = 'block';
  uploadDiv.style.marginTop = '0';
  uploadDiv.style.marginBottom = '20px';
  imageSection.style.borderRight = "none";

  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  }
  
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = 'none';
  }
}

let filters = document.querySelectorAll("ul li input");

for (const filter of filters) {
  filter.addEventListener("input", function() {
    context.filter = `
      saturate(${saturation.value}%)
      contrast(${contrast.value}%)
      brightness(${brightness.value}%)
      sepia(${sepia.value}%)
      grayscale(${grayscale.value})
      blur(${blur.value}px)
      hue-rotate(${hueRotate.value}deg)
    `
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

  })
}

download.onclick = function() {
  download.href = canvas.toDataURL();
}

