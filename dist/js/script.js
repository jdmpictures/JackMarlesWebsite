let main = document.querySelector('main'),
	canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	text = document.querySelector('.text'),
	ww = window.innerWidth,
	menu = document.querySelector('.menu'),
	ul = menu.querySelector('ul'),
	idx = 0,
	count = ul.childElementCount - 1,
	toggle = true,
	frame;
const allLiElements = ul.querySelectorAll('li');

// Set canvas size
canvas.width = ww / 3;
canvas.height = (ww * 0.5625) / 3;

// Generate CRT noise
function snow(ctx) {

	let w = ctx.canvas.width,
		h = ctx.canvas.height,
		d = ctx.createImageData(w, h),
		b = new Uint32Array(d.data.buffer),
		len = b.length;

	for (let i = 0; i < len; i++) {
		b[i] = ((255 * Math.random()) | 0) << 24;
	}

	ctx.putImageData(d, 0, 0);
}

function animate() {
	snow(ctx);
	frame = requestAnimationFrame(animate);
};

// Glitch
for (i = 0; i < 4; i++) {
	let span = text.firstElementChild.cloneNode(true);
	text.appendChild(span);
}

window.addEventListener('DOMContentLoaded', function(e) {
	setTimeout(function() {
		main.classList.add('on');
		main.classList.remove('off');
		animate();
	}, 1000);
});

function setActive(element) {
	const ul = element.closest('ul');
	
	allLiElements.forEach(li => li.classList.remove('active'));
	element.classList.add('active');
  }
  
  window.addEventListener('keydown', function(e) {
	let key = e.keyCode;
	let prev = idx;
	
	if (key == 38 || key == 40 || key == 13) {
	  e.preventDefault();
  
	  switch (key) {
		case 38:
		  if (idx > 0) {
			idx--;
		  }
		  break;
		case 40:
		  if (idx < count) {
			idx++;
		  }
		  break;
		case 13:
		  openLink();
		  break;
	  }
  
	  setActive(ul.children[prev]);
	  setActive(ul.children[idx]);
	} 
  }, false);


function openLink(){
	const activeLink = document.querySelector('.active');
	const linkHref = activeLink.querySelector('a').href;

	if(linkHref){
		window.open(linkHref, '_blank');
		console.log(linkHref);
	}
	
}

// Assuming li elements have a class name 'menu-item'

allLiElements.forEach(item => {
  item.addEventListener('click', function() {
    setActive(this); // 'this' refers to the clicked li element
  });
});