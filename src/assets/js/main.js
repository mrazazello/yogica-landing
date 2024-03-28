const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.header__actions');
const overlay = document.querySelector('.overlay');
const body = document.body;

burger.addEventListener('click', () => {
	burger.classList.toggle('active');
	mobileMenu.classList.toggle('active');
	overlay.classList.toggle('active');
	body.classList.toggle('no-scroll');
});

overlay.addEventListener('click', () => {
	burger.classList.remove('active');
	mobileMenu.classList.remove('active');
	overlay.classList.remove('active');
	body.classList.remove('no-scroll');
});

const sessionSlider = new Swiper('.session__carousel', {
	slidesPerView: 1,
	spaceBetween: 10,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	breakpoints: {
		500: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 6,
			spaceBetween: 20,
		},
	},
});

const feedbackSlider = new Swiper('.feedback__carousel', {
	slidesPerView: 1,
	spaceBetween: 20,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	breakpoints: {
		992: {
			slidesPerView: 3,
			spaceBetween: 26,
		},
	},
});

const modalTriggers = document.querySelectorAll("[data-trigger='modal']");
const modalCloseBtn = document.querySelector('.form-card__btn');
const modal = document.querySelector('.modal');

modalTriggers.forEach(modalTrigger => {
	modalTrigger.addEventListener('click', () => {
		modal.classList.add('active');
		body.classList.add('no-scroll');
	});
});

modal.addEventListener('click', e => {
	if (e.target === modal) {
		modal.classList.remove('active');
		body.classList.remove('no-scroll');
	}
});

modalCloseBtn.addEventListener('click', () => {
	modal.classList.remove('active');
	body.classList.remove('no-scroll');
});
