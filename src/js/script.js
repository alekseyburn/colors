/* eslint-disable no-undef */
const color = document.querySelector('.colors');
const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.btn--generate');
const sliders = document.querySelectorAll('.field-range__input');
const currentHexes = document.querySelectorAll('.color__title');
const popup = document.querySelector('.modal--copy');
const adjustButton = document.querySelectorAll('.btn--adjust');
const lockButton = document.querySelectorAll('.btn--lock');
const closeAdjustments = color.querySelectorAll('.btn--close');
const sliderContainers = document.querySelectorAll('.sliders');
let initialColors;
//For local storage
let savedPalettes = [];

//Add event listeners
generateBtn.addEventListener('click', randomColors);
sliders.forEach(slider => {
  slider.addEventListener('input', hslControls);
});
colorDivs.forEach((div, index) => {
  div.addEventListener('change', () => {
    updateTextUI(index);
  });
});
currentHexes.forEach(hex => {
  hex.addEventListener('click', () => {
    copyToClipboard(hex);
  });
});
popup.addEventListener('transitionend', () => {
  const popupBox = popup.children[0];
  popup.classList.remove('active');
  popupBox.classList.remove('active');
});
adjustButton.forEach((button, index) => {
  button.addEventListener('click', () => {
    openAdjustmentPanel(index);
  });
});
closeAdjustments.forEach((button, index) => {
  button.addEventListener('click', () => {
    closeAdjustmentPanel(index);
  });
});
lockButton.forEach((button, index) => {
  button.addEventListener('click', e => {
    lockLayer(e, index);
  });
});

//Color generator
function generateHex() {
  return chroma.random();
}

function randomColors() {
  initialColors = [];
  colorDivs.forEach((div) => {
    const hexText = div.querySelector('.color__title');
    const randomColor = generateHex();
    //Add color to the array
    if(div.classList.contains('locked')) {
      initialColors.push(hexText.innerText);
      return;
    } else {
      initialColors.push(randomColor.hex());
    }

    //Add the color to the bg
    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    //Check for contrast
    checkTextContrast(randomColor, hexText);
    //Initial colorize sliders
    const color = chroma(randomColor);
    const sliders = div.querySelectorAll('.field-range__input');
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorizeSliders(color, hue, brightness, saturation);
  });
  //Reset inputs
  resetInputs();
  //Check for button contrast
  adjustButton.forEach((button, index) => {
    checkTextContrast(initialColors[index], button);
    checkTextContrast(initialColors[index], lockButton[index]);
  })
}

function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) {
    text.style.color = 'black';
    text.style.fill = 'black';
  } else {
    text.style.color = 'white';
    text.style.fill = 'white';
  }
}

function colorizeSliders(color, hue, brightness, saturation) {
  //Scale Saturation
  const noSat = color.set('hsl.s', 0);
  const fullSat = color.set('hsl.s', 1);
  const scaleSat = chroma.scale([noSat, color, fullSat]);
  //Scale Brightness
  const midBright = color.set('hsl.l', 0.5);
  const scaleBright = chroma.scale(['black', midBright, 'white']);

  //Update input colors
  saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)}`;
  brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)}, ${scaleBright(1)}`;
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75), rgb(204,204,75), rgb(75,204,75), rgb(75,204,204), rgb(75,75,204), rgb(204,75,204), rgb(204,75,75))`
}

function hslControls(e) {
  const index = e.target.getAttribute('data-bright') || e.target.getAttribute('data-sat') || e.target.getAttribute('data-hue');

  let sliders = e.target.parentElement.parentElement.querySelectorAll('.field-range__input');
  const hue = sliders[0];
  const brightness = sliders[1];
  const saturation = sliders[2];

  const bgColor = initialColors[index];

  let color = chroma(bgColor).set('hsl.s', saturation.value).set('hsl.l', brightness.value).set('hsl.h', hue.value);

  colorDivs[index].style.backgroundColor = color;

  //Colorize inputs/sliders
  colorizeSliders(color, hue, brightness, saturation);
}

function updateTextUI(index) {
  const activeDiv = colorDivs[index];
  const color = chroma(activeDiv.style.backgroundColor);
  const textHex = activeDiv.querySelector('.color__title');
  const btns = activeDiv.querySelectorAll('.color__btn');
  textHex.innerText = color.hex();
  //Check contrast
  checkTextContrast(color, textHex);
  for (btn of btns) {
    checkTextContrast(color, btn);
  }
}

function resetInputs() {
  const sliders = document.querySelectorAll('.field-range__input');
  sliders.forEach(slider => {
    if(slider.name === 'hue') {
      const hueColor = initialColors[slider.getAttribute('data-hue')];
      const hueValue = chroma(hueColor).hsl()[0];
      slider.value = Math.floor(hueValue);
    }
    if(slider.name === 'brightness') {
      const brightColor = initialColors[slider.getAttribute('data-bright')];
      const brightValue = chroma(brightColor).hsl()[2];
      slider.value = Math.floor(brightValue * 100) / 100;
    }
    if(slider.name === 'saturation') {
      const satColor = initialColors[slider.getAttribute('data-sat')];
      const satValue = chroma(satColor).hsl()[1];
      slider.value = Math.floor(satValue * 100) / 100;
    }
  });
}

function copyToClipboard(hex) {
  const el = document.createElement('textarea');
  el.value = hex.innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  //Popup animation
  const popupBox = popup.children[0];
  popup.classList.add('active');
  popupBox.classList.add('active');
}

function openAdjustmentPanel(index) {
  sliderContainers[index].classList.toggle('active');
}

function closeAdjustmentPanel(index) {
  sliderContainers[index].classList.remove('active');
}

function lockLayer(e, index) {
  const activeBg = colorDivs[index];
  activeBg.classList.toggle('locked')
  if (activeBg.classList.contains('locked')) {
    e.target.children[0].children[0].setAttribute('xlink:href', 'img/sprite.svg#icon-lock');
  } else {
    e.target.children[0].children[0].setAttribute('xlink:href', 'img/sprite.svg#icon-unlock');
  }
}

//Implement Save to palette and localStorage stuff
const saveBtn = document.querySelector('.btn--save');
const submitSave = document.querySelector('.save__btn');
const closeSave = document.querySelector('.save__close-btn');
const saveContainer = document.querySelector('.modal--save');
const saveInput = document.querySelector('.save__input .field-text__input');
const libraryContainer = document.querySelector('.modal--lib');
const libraryBtn = document.querySelector('.btn--library');
const closeLibraryBtn = document.querySelector('.library__btn');

saveBtn.addEventListener('click', openPalette);
closeSave.addEventListener('click', closePalette);
submitSave.addEventListener('click', savePalette);
libraryBtn.addEventListener('click', openLibrary);
closeLibraryBtn.addEventListener('click', closeLibrary);

function openPalette() {
  const popup = saveContainer.children[0];
  saveContainer.classList.add('active');
  popup.classList.add('active');
}

function closePalette() {
  const popup = saveContainer.children[0];
  saveContainer.classList.remove('active');
  popup.classList.remove('active');
}

function savePalette() {
  saveContainer.classList.remove('active');
  popup.classList.remove('active');
  const name = saveInput.value;
  const colors = [];
  currentHexes.forEach(hex => {
    colors.push(hex.innerText);
  });
  //Generate Object
  let paletteNr;
  const paletteObjects = JSON.parse(localStorage.getItem('palettes'));
  if(paletteObjects) {
    paletteNr = paletteObjects.length;
  } else {
    paletteNr = savedPalettes.length;
  }
  const paletteObj = {name, colors, nr: paletteNr};
  savedPalettes.push(paletteObj);
  //Save to localStorage
  savetoLocal(paletteObj);
  saveInput.value = '';
  //Generate the palette for library
  const palette = document.createElement('div');
  palette.classList.add('library__palette');
  const title = document.createElement('h2');
  title.classList.add('library__name');
  title.innerText = paletteObj.name;
  const preview = document.createElement('div');
  preview.classList.add('library__preview');
  paletteObj.colors.forEach(smallColor => {
    const smallDiv = document.createElement('div');
    smallDiv.style.backgroundColor = smallColor;
    preview.appendChild(smallDiv);
  });
  const paletteBtn = document.createElement('button');
  paletteBtn.classList.add('library__palette-btn', 'btn', 'btn--palette');
  paletteBtn.classList.add(paletteObj.nr);
  paletteBtn.innerText = 'Выбрать';

  //Attach event to the button
  paletteBtn.addEventListener('click', e => {
    closeLibrary();
    const paletteIndex = e.target.classList[3];
    initialColors = [];
    savedPalettes[paletteIndex].colors.forEach((color, index) => {
      initialColors.push(color);
      colorDivs[index].style.backgroundColor = color;
      const text = colorDivs[index].children[0];
      checkTextContrast(color, text);
      updateTextUI(index);
    });
    resetInputs();
  })

  //Append to library
  palette.appendChild(title);
  palette.appendChild(preview);
  palette.appendChild(paletteBtn);
  libraryContainer.children[0].appendChild(palette);
}

function savetoLocal(paletteObj) {
  let localPalettes;
  if(localStorage.getItem('palettes') === null) {
    localPalettes = [];
  } else {
    localPalettes = JSON.parse(localStorage.getItem('palettes'));
  }
  localPalettes.push(paletteObj);
  localStorage.setItem('palettes', JSON.stringify(localPalettes));
}

function openLibrary() {
  const popup = libraryContainer.children[0];
  libraryContainer.classList.add('active');
  popup.classList.add('active');
}

function closeLibrary() {
  const popup = libraryContainer.children[0];
  libraryContainer.classList.remove('active');
  popup.classList.remove('active');
}

function getLocal() {
  if(localStorage.getItem('palettes') === null) {
    localPalettes = [];
  } else {
    const paletteObjects = JSON.parse(localStorage.getItem('palettes'));
    savedPalettes = [...paletteObjects]; //issue
    paletteObjects.forEach(paletteObj => {
      //Generate the palette for library
      const palette = document.createElement('div');
      palette.classList.add('library__palette');
      const title = document.createElement('h2');
      title.classList.add('library__name');
      title.innerText = paletteObj.name;
      const preview = document.createElement('div');
      preview.classList.add('library__preview');
      paletteObj.colors.forEach(smallColor => {
        const smallDiv = document.createElement('div');
        smallDiv.style.backgroundColor = smallColor;
        preview.appendChild(smallDiv);
      });
      const paletteBtn = document.createElement('button');
      paletteBtn.classList.add('library__palette-btn', 'btn', 'btn--palette');
      paletteBtn.classList.add(paletteObj.nr);
      paletteBtn.innerText = 'Выбрать';

      //Attach event to the button
      paletteBtn.addEventListener('click', e => {
        closeLibrary();
        const paletteIndex = e.target.classList[3];
        initialColors = [];
        paletteObjects[paletteIndex].colors.forEach((color, index) => {
          initialColors.push(color);
          colorDivs[index].style.backgroundColor = color;
          const text = colorDivs[index].children[0];
          checkTextContrast(color, text);
          updateTextUI(index);
        });
        resetInputs();
      })

      //Append to library
      palette.appendChild(title);
      palette.appendChild(preview);
      palette.appendChild(paletteBtn);
      libraryContainer.children[0].appendChild(palette);
    })
  }
}

getLocal();
randomColors();
