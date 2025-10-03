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


/* Lightbox overlay */
#lightbox {
  display: none; 
  position: fixed;
  z-index: 99999;
  padding-top: 60px;
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  background-color: rgba(0,0,0,0.9);
  justify-content: center;
  align-items: center;
}

/* Lightbox image */
#lightbox-img {
  max-width: 90%;
  max-height: 80%;
  display: block;
  margin: auto;
}

/* Close button */
#lightbox .close {
  position: absolute;
  top: 20px;
  right: 35px;
  color: white;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}

/* Navigation */
.lightbox-nav .prev, .lightbox-nav .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  color: white;
  font-size: 50px;
  padding: 16px;
  user-select: none;
  transition: 0.3s;
}
.lightbox-nav .prev { left: 20px; }
.lightbox-nav .next { right: 20px; }

.lightbox-nav .prev:hover,
.lightbox-nav .next:hover,
#lightbox .close:hover {
  color: yellow;
}

JavaScript (photo.js or inline <script>)

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