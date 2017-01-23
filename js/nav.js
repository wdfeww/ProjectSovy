$(document).ready(function() {
	var homeTab = $('.navbar-nav').find('li').eq(0);

	/** set active style to home tab when navbar brand is clicked */
	$('#sovyNavImg').click(function () {
		homeTab.addClass('active');
		homeTab.siblings().removeClass('active');
		$('.dropdown').find('li').removeClass('active');
	});

	/** collapse navbar when item is clicked */
	$('.navbar-collapse').find('li').not('.dropdown').click(function () {
		$('.navbar-collapse').removeClass('in');
	});
});