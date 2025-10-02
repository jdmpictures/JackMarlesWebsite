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


