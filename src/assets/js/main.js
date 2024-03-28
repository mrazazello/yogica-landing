const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.header__actions');
const overlay = document.querySelector('.overlay');
const body = document.body;

const elements = [burger, mobileMenu, overlay];

burger.addEventListener('click', () => {
	elements.forEach(elem => elem.classList.toggle('active'));
	body.classList.toggle('no-scroll');
});

overlay.addEventListener('click', () => {
	elements.forEach(elem => elem.classList.remove('active'));
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
const formModal = document.querySelector('[data-id="form-modal"]');

formModalTriggers.forEach(trigger => {
	trigger.addEventListener('click', () => {
		formModal.classList.add('active');
		body.classList.add('no-scroll');
	});
});

formModal.addEventListener('click', e => {
	if (e.target === formModal || e.target.closest('.form-card__btn')) {
		formModal.classList.remove('active');
		body.classList.remove('no-scroll');
	}
});

const youtubeModalTriggers = document.querySelectorAll(
	'[data-trigger="youtube-modal"]'
);
const youtubeModal = document.querySelector('[data-id="youtube-modal"]');
const iframe = document.querySelector('.video-box__iframe');

youtubeModalTriggers.forEach(trigger => {
	trigger.addEventListener('click', () => {
		youtubeModal.classList.add('active');
		body.classList.add('no-scroll');

		iframe.src = trigger.dataset.src;
	});
});

youtubeModal.addEventListener('click', e => {
	youtubeModal.classList.remove('active');
	body.classList.remove('no-scroll');

	iframe.src = '';
});
