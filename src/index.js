import generateField from './generateField';
import model from './model';
import arraySet from './arraySet';

function view() {
  const redo = document.querySelector('.redo-btn');
  const undo = document.querySelector('.undo-btn');

  if (localStorage.getItem('full')) {
    const full = Number(localStorage.getItem('full'));
    if (full === 0) {
      undo.disabled = true;
    }
  }
  if (!localStorage.getItem('undo')) {
    redo.disabled = true;
  }
  const arrayOfKinds = arraySet();
  if (localStorage.getItem('undo')) {
    const redoArray = localStorage.undo.split(',');
    for (let i = 0; i < redoArray.length; i += 1) {
      document.getElementById(redoArray[i]).classList = 'cell';
      i += 1;
    }
  }
  for (let i = 0; i < arrayOfKinds.length; i += 1) {
    document.getElementById(arrayOfKinds[i]).classList.add(arrayOfKinds[i + 1]);
    i += 1;
  }
}
function undoClick() {
  const redo = document.querySelector('.redo-btn');
  redo.disabled = false;
  const arrayOfKinds = arraySet();
  let redoArray = [];

  if (localStorage.getItem('undo')) {
    redoArray = localStorage.getItem('undo').split(',');
  }
  redoArray.reverse();
  redoArray.push(arrayOfKinds.pop());
  redoArray.push(arrayOfKinds.pop());
  redoArray.reverse();
  localStorage.setItem('undo', redoArray);
  localStorage.setItem('kinds', arrayOfKinds);
  let full = Number(localStorage.getItem('full'));
  full -= 1;
  let queue = Number(localStorage.getItem('queue'));
  queue *= -1;
  localStorage.setItem('queue', queue);
  localStorage.setItem('full', full);
  model();
  view();
}
function redoClick() {
  const undo = document.querySelector('.undo-btn');
  undo.disabled = false;
  const arrayOfKinds = arraySet();
  const redoArray = localStorage.getItem('undo').split(',');
  redoArray.reverse();
  let full = Number(localStorage.getItem('full'));
  full += 1;
  let queue = Number(localStorage.getItem('queue'));
  queue *= -1;
  arrayOfKinds.push(redoArray.pop());
  arrayOfKinds.push(redoArray.pop());
  redoArray.reverse();
  localStorage.setItem('undo', redoArray);
  localStorage.setItem('kinds', arrayOfKinds);
  localStorage.setItem('queue', queue);
  localStorage.setItem('full', full);
  model();
  view();
}
function getKinds(e) {
  localStorage.removeItem('undo');
  const target = e.target;
  if (target.classList[0] === 'row') {
    return;
  } else {
    let queue = 1;
    if (localStorage.getItem('queue')) {
      queue = Number(localStorage.getItem('queue'));
    }
    let full = 0;
    if (localStorage.getItem('full')) {
      full = Number(localStorage.getItem('full'));
    }
    let kind = 'ch';
    if (queue < 0) {
      kind = 'r';
    }
    const arrayOfKinds = arraySet();
    arrayOfKinds.push(target.id);
    arrayOfKinds.push(kind);
    queue *= -1;
    full += 1;
    localStorage.setItem('queue', queue);
    localStorage.setItem('full', full);
    localStorage.setItem('kinds', arrayOfKinds);
    model();
    view();
  }
}
function controller() {
  const redo = document.querySelector('.redo-btn');
  const undo = document.querySelector('.undo-btn');
  undo.addEventListener('click', undoClick);
  redo.addEventListener('click', redoClick);
  const field = document.querySelector('.field');
  undo.disabled = false;
  redo.disabled = false;
  if (localStorage.getItem('full')) {
    const full = Number(localStorage.getItem('full'));
    if (full === 0 || !localStorage.getItem('kinds')) {
      undo.disabled = true;
    }
  }
  if (!localStorage.getItem('undo')) {
    redo.disabled = true;
  }
  field.addEventListener('click', getKinds);
}

function game() {
  if (localStorage) {
    view();
  }
  controller();
}
window.addEventListener('load', game);
