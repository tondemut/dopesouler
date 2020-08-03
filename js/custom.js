(() => {
  let imgH = document.querySelectorAll('.img-holder');
  imgH.forEach((img, key) => {
    img.style.left = `${key > 0 ? key * 325 : 0}px`;
  })

  let imgBlock = document.querySelectorAll('.img-holder');
  let xmove = 0;
  let dragged = false;
  imgBlock.forEach(img => {

    img.addEventListener('mousedown', (e) => {
      xmove = e.clientX;
      dragged = false;
    })
    img.addEventListener('drag', (e) => {
      if(!dragged){
        let mouseDiff = xmove - e.clientX;
        imgH.forEach((img) => {
        let init = Number(img.style.left.replace('px', ''));
        img.style.left = `${mouseDiff > 0 ? init - 325 : init + 325}px`;
      })
      }
      dragged = true;
    })
    img.addEventListener('touchstart', (e) => {
      xmove = e.touches[0].clientX;
      dragged = false;
    })
    img.addEventListener('touchmove', (e) => {
      if(!dragged){
        let mouseDiff = xmove - e.touches[0].clientX;
        imgH.forEach((img) => {
        let init = Number(img.style.left.replace('px', ''));
        img.style.left = `${mouseDiff > 0 ? init - 325 : init + 325}px`;
      })
      }
      dragged = true;
    })
  })
})();