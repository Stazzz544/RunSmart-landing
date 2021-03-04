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

@@include('jquery-1.11.0.min.js')
@@include('jquery-migrate-1.2.1.min.js')
@@include('slick.js')

<<<<<<< Updated upstream
$(document).ready(function () {
	$('.carusel__inner').slick({
		infinite: true,
		speed: 1300,
		autoplaySpeed: 2000,
		prevArrow: '<button type="button" class="slick-prev"><img src="img/icon/arrleft.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="img/icon/arrright.svg"></button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					dots: true,
					arrows: false
				}
			}
		]
	});
});
=======
$(window).scroll(function() {
	if ($(this).scrollTop() > 1600) { //расстояние при котором блок появится
		$('.классБлока').fadeIn();
	} else {
		$('.классБлока').fadeOut();
	}
});

//В CSS блоку поставить display: none, потому что потомм он появится
>>>>>>> Stashed changes
