(() => {
  let puzzlePieces = {
    one: {
      perfect: {
        t: 20,
        l: 38
      },
      current: {
        t: 250,
        l: 0
      },
      init: {
        t: 250,
        l: 0
      }
    },
    two: {
      perfect: {
        t: 7,
        l: 85
      },
      current: {
        t: 150,
        l: 0
      },
      init: {
        t: 150,
        l: 0
      }
    },
    three: {
      perfect: {
        t: 11,
        l: 167
      },
      current: {
        t: 250,
        l: 200
      },
      init: {
        t: 250,
        l: 200
      }
    },
    four: {
      perfect: {
        t: 86,
        l: 35
      },
      current: {
        t: 150,
        l: 230
      },
      init: {
        t: 150,
        l: 230
      }
    },
    five: {
      perfect: {
        t: 87,
        l: 70
      },
      current: {
        t: 250,
        l: 70
      },
      init: {
        t: 250,
        l: 70
      }
    },
    six: {
      perfect: {
        t: 68,
        l: 186
      },
      current: {
        t: 0,
        l: 125
      },
      init: {
        t: 0,
        l: 125
      }
    },
    seven: {
      perfect: {
        t: 250,
        l: 82
      },
      current: {
        t: -50,
        l: 130
      },
      init: {
        t: -50,
        l: 130
      }
    },
    eight: {
      perfect: {
        t: 151,
        l: 92
      },
      current: {
        t: 0,
        l: 0
      },
      init: {
        t: 0,
        l: 0
      }
    },
    nine: {
      perfect: {
        t: 169,
        l: 168
      },
      current: {
        t: 0,
        l: 210
      },
      init: {
        t: 0,
        l: 210
      }
    }
  }
  let current = {
    name: ''
  };
  let completePieces = [];

  var mousePosition;
  var offset = [0,0];
  var div;
  var isDown = false;

  let pieces = document.querySelectorAll('.puzzle-piece');
  let actButton = document.querySelector('#revealPieces');
  let completePuzzle = document.querySelector('.complete-puzzle');

  actButton.addEventListener('click', e => {
    pieces.forEach(piece => {
      let id = piece.id;
      let piecer = document.querySelector(`#${id}`);
      piecer.style.opacity = '1';
      piecer.style.top = `${puzzlePieces[id].init.t}px`;
      piecer.style.left = `${puzzlePieces[id].init.l}px`;
      console.log(id, piecer.style.top, piecer.style.left);
    })
  })

  pieces.forEach(piece => {
    piece.addEventListener('mousedown', function(e) {
      current.name = piece.id;
      isDown = true;
      offset = [
          piece.offsetLeft - e.clientX,
          piece.offsetTop - e.clientY
      ];

      console.log(isDown);
    }, true);

    piece.addEventListener('touchstart', function(e) {
      current.name = piece.id;
      isDown = true;
      offset = [
          piece.offsetLeft - e.touches[0].clientX,
          piece.offsetTop - e.touches[0].clientY
      ];

      console.log(isDown);
    }, true);
  })

  document.addEventListener('mouseup', function() {
    isDown = false;

    confirmPiece(current.name);

    current.name = '';
  }, true);
  document.addEventListener('touchend', function() {
    isDown = false;

    confirmPiece(current.name);

    current.name = '';
  }, true);

document.addEventListener('mousemove', function(event) {
  event.preventDefault();
  if (isDown) {
    div = document.querySelector(`#${current.name}`);
      mousePosition = {

          x : event.clientX,
          y : event.clientY

      };
      div.style.left = (mousePosition.x + offset[0]) + 'px';
      div.style.top  = (mousePosition.y + offset[1]) + 'px';
  }
}, true);
document.addEventListener('touchmove', function(event) {
  if (isDown) {
    div = document.querySelector(`#${current.name}`);
      mousePosition = {

          x : event.touches[0].clientX,
          y : event.touches[0].clientY

      };
      div.style.left = (mousePosition.x + offset[0]) + 'px';
      div.style.top  = (mousePosition.y + offset[1]) + 'px';
  }
}, true);

function confirmPiece(pieceName) {
  if(pieceName) {
    let piecer = document.querySelector(`#${pieceName}`);

    let diffL = piecer.offsetLeft > puzzlePieces[pieceName].perfect.l ? piecer.offsetLeft - puzzlePieces[pieceName].perfect.l : puzzlePieces[pieceName].perfect.l - piecer.offsetLeft;
    let diffT = piecer.offsetTop > puzzlePieces[pieceName].perfect.t ? piecer.offsetTop - puzzlePieces[pieceName].perfect.t : puzzlePieces[pieceName].perfect.t - piecer.offsetTop;

    if(diffT <= 2 && diffL <= 2) {
      let there = completePieces.indexOf(pieceName);

      if(there == -1) {
        completePieces.push(pieceName);
      }

      if(completePieces.length == 9) {
        pieces.forEach(piece => {
          piece.style.display = 'none';
          completePuzzle.style.display = 'block';
        })
      }
    } else {
      let there = completePieces.indexOf(pieceName);

      if(there !== -1) {
        completePieces.splice(there, 1);
      }

      console.log(completePieces);
    }
  }
}
})();