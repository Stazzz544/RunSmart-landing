@@include('wow.min.js');
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


//wow js
new WOW().init();

//script for map
// создаём элемент <div>, который будем перемещать вместе с указателем мыши пользователя
var mapTitle = document.createElement('div'); mapTitle.className = 'mapTitle';
// вписываем нужный нам текст внутрь элемента
mapTitle.textContent = 'Для активации карты нажмите по ней';
// добавляем элемент с подсказкой последним элементов внутрь нашего <div> с id wrapMap
wrapMap.appendChild(mapTitle);
// по клику на карту
wrapMap.onclick = function() {
	 // убираем атрибут "style", в котором прописано свойство "pointer-events"
	 this.children[0].removeAttribute('style');
	 // удаляем элемент с интерактивной подсказкой
	 mapTitle.parentElement.removeChild(mapTitle);
}
// по движению мыши в области карты
wrapMap.onmousemove = function(event) {
	 // показываем подсказку
	 mapTitle.style.display = 'block';
	 // двигаем подсказку по области карты вместе с мышкой пользователя
	 if(event.offsetY > 10) mapTitle.style.top = event.offsetY + 20 + 'px';
	 if(event.offsetX > 10) mapTitle.style.left = event.offsetX + 20 + 'px';
}
// при уходе указателя мыши с области карты
wrapMap.onmouseleave = function() {
	 // прячем подсказку
	 mapTitle.style.display = 'none';
}

//JQuerry scripts


$(document).ready(function(){
	$('.carusel__inner').slick({
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		prevArrow: '<button type="button" class="slick-prev"><img src="img/icon/arrleft.svg" alt=""></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="img/icon/arrright.svg" alt=""></button>'
	});
//tabs
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

	//pageup
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		 } else {
			 $('.pageup').fadeOut();
		 }
	});
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

// 	function validateForms(form){
// 		$(form).validate({
// 			 rules: {
// 				  name: {
// 						required: true,
// 						minlength: 2
// 				  },
// 				  phone: "required",
// 				  email: {
// 						required: true,
// 						email: true
// 				  }
// 			 },
// 			 messages: {
// 				  name: {
// 						required: "Пожалуйста, введите свое имя",
// 						minlength: jQuery.validator.format("Введите {0} символа!")
// 					 },
// 				  phone: "Пожалуйста, введите свой номер телефона",
// 				  email: {
// 					 required: "Пожалуйста, введите свою почту",
// 					 email: "Неправильно введен адрес почты"
// 				  }
// 			 }
// 		});
//   };

//   validateForms('#consultation-form');
//   validateForms('#consultation form');
//   validateForms('#order form');

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			 type: "POST",
			 url: "mailer/smart.php",
			 data: $(this).serialize()
		}).done(function() {
			 $(this).find("input").val("");
			 $('#consultation, #order').fadeOut();
			 $('.overlay, #thanks').fadeIn('slow');

			 $('form').trigger('reset');
		});
		return false;
  });
});
	//ajax запрос
	 //$('form')обращаюсь ко всем формам(если нужно было бы обратится к id - запись была бы ('#name'), класс по аналогии). 
	 //submit - пропускает на отправку если все условия валидации в инпутах выполнены
	 //function(e) - event //обрабатываем ответ от сервера(выполняем функцию)   
	 //e.preventDefault() отменяет стандартное поведение браузера(отменяет перезагрузку после отправки формы)
	 //$ajax - метод jquerry для отправки данные на сервер
	 //type: "" - указываем , хотим мы получить данные у сервера или отдать их ему
	 //url: "mailer/smart.php" - указываем какой обработчик будет обрабатыватть отправку
	 //$(this) указываем тип даные( в даннном случае мы говорим: сейчас работаем с тем, с чем работаем)
	 //.find("input") - находим инпуты и говорим что их value - будет пустая строка
	 // $('form').trigger('reset') - все формы должны очиститься
