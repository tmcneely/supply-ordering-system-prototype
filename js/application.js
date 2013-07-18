$(document).ready(function() {
	// $("#add-items").hide();
	$("#set-quantities").hide();

	$(".test").bind("click", function() {
	  console.log("Fuck yeah!");
	  $(this).hide();
	});

	$(".next-button").bind("click", function() {

	  var currentBreadcrumb = $("#breadcrumbs").find(".active");
	  var currentSection = currentBreadcrumb.attr("data-section");
	  $('#'+currentSection).hide();
	  currentBreadcrumb.removeClass("active");

	  if(currentSection == "view-summary") return;

	  var nextBreadcrumb = currentBreadcrumb.next();
	  var nextSection = nextBreadcrumb.attr("data-section");
	  $('#'+nextSection).show();
	  nextBreadcrumb.addClass("active");
	});

	$(".icon-minus").bind("click", function() {
		var num = $(".quantity").text();
		num--;
		if(num >=0) {
			$(".quantity").text(num);
			$(".total-amount .text").text(num*50);
			$(".cost .text").text("$" + num*4);
		}
	});

	$(".icon-plus").bind("click", function() {
		var num = $(".quantity").text();
		num++;
		$(".quantity").text(num);
		$(".total-amount .text").text(num*50);
		$(".cost .text").text("$" + num*4);
	});

	//collapsible management
	$('.collapsible').collapsible({
		defaultOpen: 'item1,item3'
	});

});
