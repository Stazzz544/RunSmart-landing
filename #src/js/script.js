@@include('jquery-1.11.0.min.js');
@@include('jquery-migrate-1.2.1.min.js');
@@include('slick.js')

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
});
