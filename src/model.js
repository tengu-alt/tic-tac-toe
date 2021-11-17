import arraySet from './arraySet';
function model() {
  const redo = document.querySelector('.redo-btn');
  const undo = document.querySelector('.undo-btn');
  const fieldSize = Math.pow(document.querySelectorAll('.row').length, 2);
  let full = Number(localStorage.getItem('full'));
  if (localStorage.getItem('kinds')) {
    undo.disabled = false;
  }
  if (full > 0) {
    undo.disabled = false;
  }
  if (full >= fieldSize) {
    full = 0;
    restart();
  }
}
function clearField() {
  const redo = document.querySelector('.redo-btn');
  const undo = document.querySelector('.undo-btn');
  undo.disabled = true;
  redo.disabled = true;
  let arrayOfKinds = arraySet();
  for (let i = 0; i < arrayOfKinds.length; i += 1) {
    document.getElementById(arrayOfKinds[i]).classList = 'cell';
    i += 1;
  }
  const won = document.querySelector('.won-title');
  won.classList.add('hidden');
  localStorage.clear();
}
function restart() {
  const redo = document.querySelector('.redo-btn');
  const undo = document.querySelector('.undo-btn');
  undo.disabled = true;
  redo.disabled = true;
  const won = document.querySelector('.won-title');
  won.classList.remove('hidden');
  const restartbtn = document.querySelector('.restart-btn');
  restartbtn.addEventListener('click', clearField);
}

export default model;
