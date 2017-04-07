requirejs.config({
	paths:{
		jquery: 'jquery'
	}
});

requirejs(['jquery', 'backtop'],function($, backtop){

	// new backtop.BackTop($('#backTop'), {
	// 	mode: 'move',
	// 	speed: 2000,

	// });
	//jquery插件写法
	$('#backTop').backtop({
		mode: 'move'
	})












	// var scroll = new scrollto.ScrollTo({
	// 	dest:0,
	// 	speed:2000

	// })
	// $('#backTop').on('click', $.proxy(scroll.move, scroll));
	// $(window).on('scroll', function() {
	// 	checkPosition($(window).height());
	// });

	// function move() {
	// 	$('html, body').animate({
	// 		scrollTop: 0
	// 	}, 0);
	// }

	// function go() {
	// 	$('html, body').scrollTop(0);
	// }

	// function checkPosition(pos) {
	// 	if($(window).scrollTop() > pos) {
	// 		$('#backTop').fadeIn();
	// 		$('#backTop').css('display','block');
	// 	}else{
	// 		$('#backTop').fadeOut();
	// 	}
	// }
});