(() => {
  let Storage = window.sessionStorage;
  let imgH = document.querySelectorAll('.img-holder');
  let imgBlocks = document.querySelectorAll('.img-block');
  let firstImg = document.querySelector('.img-holder img');
  let navigatorsTo = [
    ".to-hoodies *",
    ".to-sweaters *",
    ".to-shirts *",
    ".to-pants *"
  ];
  let toList = ['hoodies','sweaters','shirts','pants'];
  let navigatorsFrom = [
    ".from-hoodies",
    ".from-sweaters",
    ".from-shirts",
    ".from-pants"
  ];
  let fromList = ['hoodies','sweaters','shirts','pants'];
  navigatorsTo.forEach((nav, index) => {
    let lento = document.querySelector(nav);
    if(lento) {
      lento.addEventListener('click', e => {
        console.log('clicked' + lento.innerHTML);
        let el = document.querySelector(`#${toList[index]}`);
        console.log(toList[index]);
        el.style.top = `-${index !== 0 ? h * (index + 1) : h}px`;
  
        console.log(lento.parentElement.parentElement.parentElement.parentElement);
      })
    }
  })
  navigatorsFrom.forEach((nav, index) => {
    let lento = document.querySelector(nav);
    if(lento) {
      lento.addEventListener('click', e => {
        console.log('clicked' + lento.innerHTML);
        let el = document.querySelector(`#${fromList[index]}`);
        console.log(fromList[index]);
        el.style.top = `${index !== 0 ? h * (index + 1) : h}px`;
  
        console.log(lento.parentElement.parentElement.parentElement.parentElement);
      })
    }
  })

  if(imgBlocks && firstImg) {
    let widthImg = firstImg.offsetWidth;
  let heightImg = imgBlocks[0].offsetHeight;
  widthImg !== 0 ? Storage.setItem('imgWidth', `${widthImg}`) : console.log('value is zero width');
  heightImg !== 0 ? Storage.setItem('imgHeight', `${heightImg}`) : console.log('value is zero height');

  console.log(Storage.getItem('imgWidth'));
  let w = Number(Storage.getItem('imgWidth'));
  let h = Number(Storage.getItem('imgHeight'));

  imgBlocks.forEach(block => {
    let imageHs = block.querySelectorAll('.img-holder');

    imageHs.forEach((img, key) => {
  
      img.style.left = `${key > 0 ? key * w : 0}px`;
    })
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
        img.style.left = `${mouseDiff > 0 ? init - w : init + w}px`;
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
        img.style.left = `${mouseDiff > 0 ? init - w : init + w}px`;
      })
      }
      dragged = true;
    })
  })
  }

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

  menuBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      menu.style.left = menu.style.left == '-200px' ? '0' : '-200px';
    });
  })
  
})();