(() => {
  let Storage = window.sessionStorage;
  let imgH = document.querySelectorAll('.img-holder');
  let imgBlocks = document.querySelectorAll('.img-block');
  let firstImg = document.querySelector('.img-holder img');
  let scrollLeft = document.querySelector('.auto-scroll.left');
  let scrollRight = document.querySelector('.auto-scroll.right');
  let hasScrolled = false;
  let currentNgee = document.querySelector(`#overview`);
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
        
        let el = document.querySelector(`#${toList[index]}`);
        el.style.top = `-${index !== 0 ? h * (index + 1) : h}px`;

        currentNgee = document.querySelector(`#${toList[index]}`);
      })
    }
  })
  navigatorsFrom.forEach((nav, index) => {
    let lento = document.querySelector(nav);
    if(lento) {
      lento.addEventListener('click', e => {
        let el = document.querySelector(`#${fromList[index]}`);
        el.style.top = `${index !== 0 ? h * (index + 1) : h}px`;

        currentNgee = index - 1 !== -1 ? document.querySelector(`#${fromList[index - 1]}`) : document.querySelector(`#overview`);
      })
    }
  })

  let widthImg = firstImg.offsetWidth;
  let heightImg = imgBlocks[1].offsetHeight;
  widthImg !== 0 ? Storage.setItem('imgWidth', `${widthImg}`) : Storage.setItem('imgWidth', `300`);
  heightImg !== 0 ? Storage.setItem('imgHeight', `${heightImg}`) : console.log('value is zero height');

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
          if(Number(imgH[0].style.left.replace('px', '')) == 0 && mouseDiff < 0) {
            return;
          }
          if(Number(imgH[6].style.left.replace('px', '')) == 0 && mouseDiff > 0) {
            return;
          }
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
        console.log(imgH[0].style.left);
        if(imgH[1].style.left <= 0) {
          let mouseDiff = xmove - e.touches[0].clientX;
          if(Number(imgH[0].style.left.replace('px', '')) == 0 && mouseDiff < 0) {
            return;
          }
          if(Number(imgH[6].style.left.replace('px', '')) == 0 && mouseDiff > 0) {
            return;
          }
          imgH.forEach((img) => {
          let init = Number(img.style.left.replace('px', ''));
          img.style.left = `${mouseDiff > 0 ? init - w : init + w}px`;
          })
        }
      }
      dragged = true;
    })
  })

  window.addEventListener('load', e => {
    if(!hasScrolled) {
      scrollRight.style.display = 'flex';
    } else {
      scrollLeft.style.display = 'flex';
    }
  })

  scrollRight.addEventListener('click', e => {
    scrollRight.style.display = 'none';

    let adjust = 0;
    let imgHols = currentNgee.querySelectorAll('.img-holder');
    
    let mover = setInterval(function() {
      imgHols.forEach((img) => {
      let init = Number(img.style.left.replace('px', ''));
      img.style.left = `${init - w}px`;
      });

      adjust++;

      if(adjust >= 6) {
        clearInterval(mover);
        scrollLeft.style.display = 'flex';
      }
    }, 2000);
  })
  scrollLeft.addEventListener('click', e => {
    scrollLeft.style.display = 'none';

    let adjust = 0;
    let imgHols = currentNgee.querySelectorAll('.img-holder');
    
    let mover = setInterval(function() {
      imgHols.forEach((img) => {
      let init = Number(img.style.left.replace('px', ''));
      img.style.left = `${init + w}px`;
      });

      adjust++;

      if(adjust >= 6) {
        clearInterval(mover);
        scrollRight.style.display = 'flex';
      }
    }, 2000);
  })
})();