const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.header__actions');
const overlay = document.querySelector('.overlay');
const body = document.body;

const youtubeModal = document.querySelector('[data-id="youtube-modal"]');
const formModal = document.querySelector('[data-id="form-modal"]');
const iframe = document.querySelector('.video-box__iframe');

const elements = [burger, mobileMenu, overlay];

burger.addEventListener('click', () => {
	elements.forEach(elem => elem.classList.toggle('active'));
	body.classList.toggle('no-scroll');
});

overlay.addEventListener('click', () => {
	elements.forEach(elem => elem.classList.remove('active'));
	body.classList.remove('no-scroll');
});

Array.from(document.querySelectorAll('[data-trigger="form-modal"]')).forEach(
	trigger => {
		trigger.addEventListener('click', () => {
			openModal(formModal);
		});
	}
);

formModal.addEventListener('click', e => {
	if (e.target === formModal || e.target.closest('.form-card__btn')) {
		closeModal(formModal);
	}
});

Array.from(document.querySelectorAll('[data-trigger="youtube-modal"]')).forEach(
	trigger => {
		trigger.addEventListener('click', () => {
			openModal(youtubeModal);

			iframe.src = trigger.dataset.src;
		});
	}
);

youtubeModal.addEventListener('click', e => {
	closeModal(youtubeModal);

	iframe.src = '';
});

const openModal = modal => {
	modal.classList.add('active');
	body.classList.add('no-scroll');
};

const closeModal = modal => {
	modal.classList.remove('active');
	body.classList.remove('no-scroll');
};

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
