@@include('jquery-1.11.0.min.js');
@@include('jquery-migrate-1.2.1.min.js');
@@include('slick.js');
@@include('jquery.validate.min.js');
@@include('jquery.maskedinput.min.js');


//функция для подключения webp
function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});

//==================================

$(document).ready(function(){
	$('.carusel__inner').slick({
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		prevArrow: '<button type="button" class="slick-prev"><img src="../img/icon/arrleft.svg" alt=""></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="../img/icon/arrright.svg" alt=""></button>'
	});
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	 });
//Переключение класса(слайда) на jquerry
	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__link-back');

	// Modal

	$('[data-modal=consultation]').on('click', function(){
		$('.overlay, #consultation').fadeIn('slow');
	}); 
	$('.modal__close').on('click', function(){
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});

	$('.catalog-item__btn').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	})

	//validation

	function validationForm(form){
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				 },
				phone: "required",
				email: {
					required: true,
					email: true
				},
			},
			messages: {
				name: {
					required: "Пожалуйста, введите своё имя",
					minlength: jQuery.validator.format("Минимально допустимое количество символов: {0}"),
				 },
				email: {
				  required: "Пожалуйста, введите ваш имейл",
				  email: "Формат адреса должен быть: name@domain.com",
				},
				phone: {
					required: "Пожалуйста введите номер вашего телефона",
				}
			},
		});
	};
	validationForm('#consultation-form');
	validationForm('#consultation form');
	validationForm('#order form');

	//phone mask
	$('input[name=phone]').mask("+7 (999) 999-99-99");
});

