(() => {

  let videoW = document.querySelector('#myVideos');
  let closeB = document.querySelector('.close');

  if(closeB) {
    closeB.addEventListener('click', (e) => {
      if(videoW.paused) {
        return false;
      } else {
        videoW.pause();
      }
    })
  }

  let menuBtn = document.querySelectorAll('.bringMenu');
  let menu = document.querySelector('#Menu');
  let isfirst = true;

  menuBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      if(isfirst) {
        menu.style.left = '0px';

        isfirst = false;
      } else {
        menu.style.left = '-200px';

        isfirst = true;
      }
    });
  })
  
})();