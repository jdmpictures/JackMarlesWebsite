function filterImagesByPhrase(phrase) {
    var gallery = document.querySelector('.gallery');
    var images = gallery.querySelectorAll('img');
    var imagesArray = Array.from(images);
    
    imagesArray = imagesArray.filter(function(image) {
        return image.id.includes(phrase);
    });

    images.forEach((image) => {
        image.style.display = 'none';
    })

    imagesArray.forEach(function(image) {
        image.style.display = ''
    });
}

let categories  = document.querySelectorAll('.sub').forEach(item => 
    item.addEventListener('click', e => { 
        filterImagesByPhrase(item.textContent.toLowerCase());
        console.log(item.textContent)
        
    })
    )

function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('active');
}



//Lightbox Coding

const gallery = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('#lightbox .close');
const prevBtn = document.querySelector('.lightbox-nav .prev');
const nextBtn = document.querySelector('.lightbox-nav .next');

let currentIndex = 0;

function showLightbox(index) {
  currentIndex = index;
  lightboxImg.src = gallery[index].src;
  lightbox.style.display = 'flex';
}

gallery.forEach((img, i) => {
  img.addEventListener('click', () => showLightbox(i));
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % gallery.length;
  showLightbox(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
  showLightbox(currentIndex);
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

/* Optional: swipe support for mobile */
let startX = 0;
lightbox.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
lightbox.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (endX < startX - 50) nextBtn.click();
  if (endX > startX + 50) prevBtn.click();
});