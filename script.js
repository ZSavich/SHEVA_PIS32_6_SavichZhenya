"use strict";

const btnAdd = document.getElementById('add');
const btnSub = document.getElementById('btnSub');
const formAdd = document.getElementById('addForm');
const inpName = document.getElementById('name');
const inpCost = document.getElementById('cost');
let tbody = document.getElementById('tbody');
let btnsRemove = tbody.querySelectorAll('.btn--remove');
let diagArray = document.querySelectorAll('.diagram');

// --- Функции --- //

function refreshRemoveButtons() {
    Array.from(btnsRemove).forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            let target = btn.parentElement.parentElement;
            target.remove();
            addDiagram();
        });
    });
}

function refreshDiagrams() {
    Array.from(diagArray).forEach((diag) => {
        diag.addEventListener('mouseover', (event) => {
            diag.querySelector('.diagram__cost').style.display = 'block';
        });
        diag.addEventListener('mouseout', (event) => {
            diag.querySelector('.diagram__cost').style.display = 'none';
        });
    });
}

function addDiagram() {
    let dataArray = [];
    let maxValue = [-9999,0];
    let index = 0;
    const elements = document.querySelectorAll('#tbody>tr');
    elements.forEach((el)=>{
        const name = el.querySelector('td:nth-child(2)').innerText;
        const cost = parseInt(el.querySelector('td:last-child').innerText);
        maxValue[0] < cost ? maxValue = [cost,index] : '';
        dataArray[index++] = [name,cost];
    });

    const diagramsArray = document.querySelectorAll('.diagram');
    diagramsArray.forEach((diag)=>{diag.remove()});

    dataArray.forEach((el,index)=>{
        let diagram = document.createElement('div');
        let diagName = document.createElement('p');
        let diagCost = document.createElement('p');
        let diagBlock = document.createElement('span');
        let diagrams = document.querySelector('.diagrams__list');

        diagName.innerText = el[0];
        diagCost.innerText = el[1];

        diagName.className = 'diagram__name';
        diagCost.className = 'diagram__cost';
        diagram.className = 'diagram diagram--' + index;
        diagBlock.className = 'diagram__block';

        diagCost.style.display = 'none';

        diagram.appendChild(diagName);
        let showDiag = diagram.appendChild(diagBlock);
        diagram.appendChild(diagCost);
        diagrams.appendChild(diagram);
        if(maxValue[1] === index) {
            showDiag.style.height = '0%';
            setTimeout(()=>{showDiag.style.height = '100%'} ,100+index*10);

        } else {
            showDiag.style.height = '0%';
            setTimeout(()=>{showDiag.style.height = el[1] / maxValue[0] * 100 + '%'} ,100+index*10);

        }
    });

    diagArray = document.querySelectorAll('.diagram');
}

function changeParam(elem) {
    const newParam = prompt('Задайте новое значение', '');
    elem.innerText = newParam;
    addDiagram();
}

// --- END:Функции --- //

// --- События --- //


btnAdd.addEventListener('click', () => {
    formAdd.classList.toggle('show');
});

btnSub.addEventListener('click', (event) => {
    event.preventDefault();

    const newName = inpName.value;
    const newCost = inpCost.value;

    let record = document.createElement('tr');
    let btnDel = document.createElement('td');
    let name = document.createElement('td');
    let cost = document.createElement('td');
    let linkDel = document.createElement('a');

    linkDel.className = 'btn btn-danger btn--remove';
    linkDel.setAttribute('href','#');
    name.setAttribute('onclick','changeParam(this)');
    cost.setAttribute('onclick','changeParam(this)');


    linkDel.innerText = 'Удалить';
    name.innerText = newName;
    cost.innerText = newCost;

    btnDel.appendChild(linkDel);
    record.appendChild(btnDel);
    record.appendChild(name);
    record.appendChild(cost);
    tbody.appendChild(record);

    btnsRemove = tbody.querySelectorAll('.btn--remove');
    addDiagram();

    inpName.value = '';
    inpCost.value = '';
});

document.addEventListener('click', () => {
    refreshRemoveButtons();
    refreshDiagrams();
});

// --- END:События --- //


addDiagram();
refreshDiagrams();
refreshRemoveButtons();