$(document).ready(function() {
	$(".test").bind("click", function() {
	  console.log("Fuck yeah!");
	  $(this).hide();
	});

	$(".next-btn").bind("click", function() {
	  console.log("Next button clicked.");

	  var currentBreadcrumb = $("#breadcrumbs").find(".active");
	  var currentSection = currentBreadcrumb.attr("data-section");
	  $(currentSection).hide();
	  currentBreadcrumb.removeClass("active");

	  if(currentSection == "view-summary") return;

	  var nextBreadcrumb = currentBreadcrumb.next();
	  var nextSection = nextBreadcrumb.attr("data-section");
	  $(nextSection).show();
	  nextBreadcrumb.addClass("active");
	});
});