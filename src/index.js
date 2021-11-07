const redo = document.querySelector('.redo-btn');
const undo = document.querySelector('.undo-btn');
let arrayOfKinds = [];

const rows = document.querySelector('.field').querySelectorAll('.row');
let redoArray = [];
let a = 0;
let queue = 1;
if (localStorage.getItem('queue')) {
  queue = Number(localStorage.getItem('queue'));
}
if (localStorage.getItem('full')) {
  a = Number(localStorage.getItem('full'));
}
if (a < 0) {
  a = 0;
}
function loadField() {
  if (!localStorage.getItem('undo')) {
    redo.disabled = true;
  } else if (localStorage.getItem('undo')) {
    redo.disabled = false;
  }
  if (!localStorage.getItem('kinds')) {
    undo.disabled = true;
  } else if (localStorage.getItem('kinds')) {
    undo.disabled = false;
  }
  arrayOfKinds = localStorage.getItem('kinds').split(',');

  for (let i = 0; i < arrayOfKinds.length; i += 1) {
    document.getElementById(arrayOfKinds[i]).classList.add(arrayOfKinds[i + 1]);
    i += 1;
  }
}
function someWin(w) {
  if (w === 'ch') {
    document.querySelector('.won-message').innerHTML = `Crosses won!`;
  } else if (w === 'r') {
    document.querySelector('.won-message').innerHTML = `Toes won!`;
  } else {
    document.querySelector('.won-message').innerHTML = `It's a draw!`;
  }
}
function endGame() {
  const won = document.querySelector('.won-title');
  won.classList.remove('hidden');
  const restart = document.querySelector('.restart-btn');
  restart.addEventListener('click', function restartClick() {
    for (let i = 0; i < rows.length; i += 1) {
      for (let j = 0; j < rows[i].querySelectorAll('.cell').length; j += 1) {
        rows[i]
          .querySelectorAll('.cell')
          [j].classList.remove(
            rows[i].querySelectorAll('.cell')[j].classList[1],
            rows[i].querySelectorAll('.cell')[j].classList[2],
            rows[i].querySelectorAll('.cell')[j].classList[3],
            rows[i].querySelectorAll('.cell')[j].classList[4]
          );
      }
    }
    won.classList.add('hidden');
    queue = 1;
    localStorage.setItem('queue', queue);

    a = 0;
    localStorage.clear();
    arrayOfKinds = [];
  });
  redo.disabled = true;
  undo.disabled = true;
}
function checkWin() {
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = 0; j < rows[i].querySelectorAll('.cell').length; j += 1) {
      const cellj = rows[i].querySelectorAll('.cell');
      if (cellj[0].classList[1] && cellj[1].classList[1] && cellj[2].classList[1]) {
        if (cellj[0].classList[1] === cellj[1].classList[1] && cellj[1].classList[1] === cellj[2].classList[1]) {
          cellj[0].classList.add('win', 'horizontal');
          cellj[1].classList.add('win', 'horizontal');
          cellj[2].classList.add('win', 'horizontal');
          someWin(cellj[0].classList[1]);
          endGame();
        }
      }
      if (
        rows[0].querySelectorAll('.cell')[j].classList[1] &&
        rows[1].querySelectorAll('.cell')[j].classList[1] &&
        rows[2].querySelectorAll('.cell')[j].classList[1]
      ) {
        if (
          rows[0].querySelectorAll('.cell')[j].classList[1] === rows[1].querySelectorAll('.cell')[j].classList[1] &&
          rows[1].querySelectorAll('.cell')[j].classList[1] === rows[2].querySelectorAll('.cell')[j].classList[1]
        ) {
          rows[0].querySelectorAll('.cell')[j].classList.add('win', 'vertical');
          rows[1].querySelectorAll('.cell')[j].classList.add('win', 'vertical');
          rows[2].querySelectorAll('.cell')[j].classList.add('win', 'vertical');
          someWin(rows[0].querySelectorAll('.cell')[j].classList[1]);
          endGame();
        }
      }
      if (
        rows[0].querySelectorAll('.cell')[0].classList[1] &&
        rows[1].querySelectorAll('.cell')[1].classList[1] &&
        rows[2].querySelectorAll('.cell')[2].classList[1]
      ) {
        if (
          rows[0].querySelectorAll('.cell')[0].classList[1] === rows[1].querySelectorAll('.cell')[1].classList[1] &&
          rows[1].querySelectorAll('.cell')[1].classList[1] === rows[2].querySelectorAll('.cell')[2].classList[1]
        ) {
          rows[0].querySelectorAll('.cell')[0].classList.add('win', 'diagonal-right');
          rows[1].querySelectorAll('.cell')[1].classList.add('win', 'diagonal-right');
          rows[2].querySelectorAll('.cell')[2].classList.add('win', 'diagonal-right');
          someWin(rows[1].querySelectorAll('.cell')[1].classList[1]);
          endGame();
        }
      }
      if (
        rows[0].querySelectorAll('.cell')[2].classList[1] &&
        rows[1].querySelectorAll('.cell')[1].classList[1] &&
        rows[2].querySelectorAll('.cell')[0].classList[1]
      ) {
        if (
          rows[0].querySelectorAll('.cell')[2].classList[1] === rows[1].querySelectorAll('.cell')[1].classList[1] &&
          rows[1].querySelectorAll('.cell')[1].classList[1] === rows[2].querySelectorAll('.cell')[0].classList[1]
        ) {
          rows[2].querySelectorAll('.cell')[0].classList.add('win', 'diagonal-left');
          rows[1].querySelectorAll('.cell')[1].classList.add('win', 'diagonal-left');
          rows[0].querySelectorAll('.cell')[2].classList.add('win', 'diagonal-left');
          someWin(rows[1].querySelectorAll('.cell')[1].classList[1]);
          endGame();
        }
      }
    }
  }
}
function playing() {
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = 0; j < rows[i].querySelectorAll('.cell').length; j += 1) {
      rows[i].querySelectorAll('.cell')[j].addEventListener('click', function ceilClick() {
        undo.disabled = false;
        redo.disabled = true;
        redoArray = [];
        localStorage.setItem('undo', redoArray);
        if (rows[i].querySelectorAll('.cell')[j].classList[1]) {
          alert('no');
        } else {
          let kind = 'ch';
          if (queue < 0) {
            kind = 'r';
          }
          queue *= -1;
          localStorage.setItem('queue', queue);

          rows[i].querySelectorAll('.cell')[j].classList.add(kind);
          arrayOfKinds.push(rows[i].querySelectorAll('.cell')[j].id, kind);
          localStorage.setItem('kinds', arrayOfKinds);

          a += 1;
          localStorage.setItem('full', a);

          checkWin();

          if (a > 8) {
            checkWin();
            if (!document.querySelector('.won-message').innerHTML) {
              someWin();
            }
            endGame();
            a = 0;
          }
        }
      });
    }
  }
}
function game() {
  if (localStorage.getItem('kinds')) {
    loadField();
  }
  playing();
}
function undoClick() {
  redo.disabled = false;
  arrayOfKinds = localStorage.getItem('kinds').split(',');
  if (localStorage.getItem('undo')) {
    redoArray = localStorage.getItem('undo').split(',');
  }
  redoArray.reverse();
  redoArray.push(arrayOfKinds.pop());
  redoArray.push(arrayOfKinds.pop());
  redoArray.reverse();
  localStorage.setItem('undo', redoArray);
  localStorage.setItem('kinds', arrayOfKinds);
  a = Number(localStorage.getItem('full'));
  a -= 1;
  queue *= -1;
  localStorage.setItem('queue', queue);
  localStorage.setItem('full', a);
  window.location.reload();
}
function redoClick() {
  const redoForClick = localStorage.getItem('undo').split(',');
  redoArray.push(redoForClick.shift());
  redoArray.push(redoForClick.shift());
  localStorage.setItem('undo', redoForClick);
  arrayOfKinds = localStorage.getItem('kinds').split(',');
  redoArray.reverse();
  arrayOfKinds.push(redoArray.pop());
  arrayOfKinds.push(redoArray.pop());
  localStorage.setItem('kinds', arrayOfKinds);
  a = Number(localStorage.getItem('full'));
  a += 1;
  queue *= -1;
  localStorage.setItem('queue', queue);
  localStorage.setItem('full', a);
  window.location.reload();
}
window.addEventListener('load', game);
undo.addEventListener('click', undoClick);
redo.addEventListener('click', redoClick);
