$(document).ready(function() {
	$("#set-quantities").hide();
	$("#set-suppliers").hide();
	$("#main").hide();
	$("#active-shipments").hide();
	$("#order-history").hide();

	$(".next-button").bind("click", function() {

	  var currentBreadcrumb = $("#breadcrumbs").find(".active");
	  var currentSection = currentBreadcrumb.attr("data-section");
	  $('#'+currentSection).hide(200);
	  currentBreadcrumb.removeClass("active");

	  if(currentSection == "view-summary") return;

	  var nextBreadcrumb = currentBreadcrumb.next();
	  var nextSection = nextBreadcrumb.attr("data-section");
	  $('#'+nextSection).show(200);
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

	$(".segment.items, .segment.quantities, .segment.suppliers, .segment.summary").bind("click", function() {
		var currentBreadcrumb = $("#breadcrumbs").find(".active");
		var currentSection = currentBreadcrumb.attr("data-section");
		$('#'+currentSection).hide(200);
		currentBreadcrumb.removeClass("active");

		var nextBreadcrumb = $(this);
		var nextSection = nextBreadcrumb.attr("data-section");
		$('#'+nextSection).show(200);
		nextBreadcrumb.addClass("active");
	});

	//collapsible management
	$('.collapsible').collapsible({
		defaultOpen: 'item1,item3'
	});

	$('.remove-button').bind("click", function() {
		var row = $(this).closest(".item-row");
		row.hide(200);
	});

	$('.new-order-btn').bind("click", function() {
		hideAll();
		$("#main").show(200);
	});

	$('.saved-order-btn').bind("click", function() {
		hideAll();
	});

	$('.incoming-shipment-btn').bind("click", function() {
		hideAll();
		$("#active-shipments").show();
	});

	$('.order-history-btn').bind("click", function() {
		hideAll();
		$("#order-history").show();
	});

        $('.shipment-details-link').bind("click", function() {
            $('.shipment-late').slideUp();
        });

        $('.shipment-morelink').bind("click", function() {
            $('.shipment-morelink').hide();

            $('#active-shipments').find('.more').slideDown();

        });

	function hideAll()
	{
		$("#welcome").hide();
		$("#main").hide();
		$("#active-shipments").hide();
		$("#order-history").hide();
	}
});
