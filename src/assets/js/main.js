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

const formModalTriggers = document.querySelectorAll(
	'[data-trigger="form-modal"]'
);
const formModalCloseBtn = document.querySelector('.form-card__btn');
const formModal = document.querySelector('[data-id="form-modal"]');

formModalTriggers.forEach(trigger => {
	trigger.addEventListener('click', () => {
		formModal.classList.add('active');
		body.classList.add('no-scroll');
	});
});

formModal.addEventListener('click', e => {
	if (e.target === formModal) {
		formModal.classList.remove('active');
		body.classList.remove('no-scroll');
	}
});

formModalCloseBtn.addEventListener('click', () => {
	formModal.classList.remove('active');
	body.classList.remove('no-scroll');
});

const iframe = document.querySelector('.video-box__iframe');
//
const youtubeModalTriggers = document.querySelectorAll(
	'[data-trigger="youtube-modal"]'
);
const youtubeModal = document.querySelector('[data-id="youtube-modal"]');
youtubeModalTriggers.forEach(trigger => {
	trigger.addEventListener('click', () => {
		youtubeModal.classList.add('active');
		body.classList.add('no-scroll');

		iframe.src = trigger.dataset.src;
	});
});

youtubeModal.addEventListener('click', e => {
	youtubeModal.classList.remove('active');
	iframe.src = '';
	body.classList.remove('no-scroll');
});
