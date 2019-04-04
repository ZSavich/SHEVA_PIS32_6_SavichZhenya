"use strict";

const image = document.getElementById('img');
const btn = document.getElementById('change');
const width = document.getElementById('width');
const height = document.getElementById('height');
const weight = document.getElementById('borderWeight');
const color = document.getElementById('borderColor');
const text = document.getElementById('text');

image.style.border = "5px solid blue";

width.value = image.clientWidth;
height.value = image.clientHeight;
weight.value = parseInt(image.style.borderWidth);
color.value = image.style.borderColor;
text.value = image.alt;

function validator(elem, type) {
    const regNum = /^\d+$/;
    const regSumb = /^[a-z]+$/i;
    const regString = /^[A-Za-z0-9]+$/;

    if (type === 'number') {
        if (elem.value.match(regNum)) {
            elem.classList.add('agree');
            elem.classList.remove('error');
            btn.disabled = false;
        } else {
            elem.classList.add('error');
            elem.classList.remove('agree');
            btn.disabled = true;
        }
    } else if (type === 'symbols') {
        if (elem.value.match(regSumb)) {
            elem.classList.add('agree');
            elem.classList.remove('error');
            btn.disabled = false;
        } else {
            elem.classList.add('error');
            elem.classList.remove('agree');
            btn.disabled = true;
        }
    } else if (type === 'string') {
        if (elem.value.match(regString)) {
            elem.classList.add('agree');
            elem.classList.remove('error');
            btn.disabled = false;
        } else {
            elem.classList.add('error');
            elem.classList.remove('agree');
            btn.disabled = true;
        }
    }
}


width.addEventListener('input', () => {validator(width, 'number')});
height.addEventListener('input', () => {validator(height, 'number')});
weight.addEventListener('input', () => {validator(weight, 'number')});
color.addEventListener('input', () => {validator(color, 'symbols')});
text.addEventListener('input', () => {validator(text, 'string')});

btn.addEventListener('click', (event)=> {
    event.preventDefault();
    changeParams();
});

function changeParams() {
    image.style.width = width.value + 'px';
    image.style.height = height.value + 'px';
    image.style.borderWidth = weight.value + 'px';
    image.style.borderColor = color.value;
    image.alt = text.value;
}