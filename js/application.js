$(document).ready(function() {

	$(".next-button").bind("click", function() {

	  var currentBreadcrumb = $("#breadcrumbs").find(".active");
	  var currentSection = currentBreadcrumb.attr("data-section");
	  $('#'+currentSection).fadeOut(200);
	  currentBreadcrumb.removeClass("active");

	  if(currentSection == "view-summary") return;

	  var nextBreadcrumb = currentBreadcrumb.next();
	  var nextSection = nextBreadcrumb.attr("data-section");
	  $('#'+nextSection).fadeIn(200);
	  nextBreadcrumb.addClass("active");
	});

	$(".icon-minus").bind("click", function() {
		var row = $(this).closest(".item-row");
		var id = row.attr("data-id");
		
		var num = Number($("div[data-id=" +id+ "] .quantity").text());
		num--;


		var cost = Number($("div[data-id=" +id+ "] .cost").attr("data-value"));
		// var cost = Number($("div[data-id=" +id+ "] .cost .number").text())/num;
		// if(num == 0){
		// 	cost = 0;
		// }
		var per_order = $("div[data-id=" +id+ "] .per-order .number").text();

		if(num >=0) {
			$("div[data-id=" +id+ "] .quantity").text(num);
			$("div[data-id=" +id+ "] .total-amount .number").text(num*per_order);
			$("div[data-id=" +id+ "] .cost .number").text(num*cost);
		}
	});

	$(".icon-plus").bind("click", function() {
		var row = $(this).closest(".item-row");
		var id = row.attr("data-id");
		var num = $("div[data-id=" +id+ "] .quantity").text();
		var cost = Number($("div[data-id=" +id+ "] .cost").attr("data-value"));
		// var cost = Number($("div[data-id=" +id+ "] .cost .number").text())/num;
		
		num++;

		var per_order = $("div[data-id=" +id+ "] .per-order .number").text();
		$("div[data-id=" +id+ "] .quantity").text(num);
		$("div[data-id=" +id+ "] .total-amount .number").text(num*per_order);
		$("div[data-id=" +id+ "] .cost .number").text(num*cost);
	});

	$(".segment.items, .segment.quantities, .segment.suppliers, .segment.summary").bind("click", function() {
		var currentBreadcrumb = $("#breadcrumbs").find(".active");
		var currentSection = currentBreadcrumb.attr("data-section");
		$('#'+currentSection).fadeOut(200);
		currentBreadcrumb.removeClass("active");

		var nextBreadcrumb = $(this);
		var nextSection = nextBreadcrumb.attr("data-section");
		$('#'+nextSection).fadeIn(200);
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

	$('.home-button').bind("click", function() {
		hideAll();
		$("#welcome").fadeIn(200);
	});

	$('.new-order-btn').bind("click", function() {
		hideAll();
		$("#main").fadeIn(200);
	});

	$('.saved-order-btn').bind("click", function() {
		hideAll();
	});

	$('.incoming-shipment-btn').bind("click", function() {
		hideAll();
		$("#active-shipments").fadeIn(200);
	});

	$('.order-history-btn').bind("click", function() {
		hideAll();
		$("#order-history").fadeIn(200);
	});

    $('.shipment-details-link').bind("click", function() {
        $('.shipment-late').slideUp();
    });

    $('.shipment-morelink').bind("click", function() {
        $('.shipment-morelink').slideUp("fast", "linear", function () { $('#active-shipments').find('.more').slideDown(400, "swing", null); });
    });

    $('.collapsible').click(function(){
	    $('suppliers').slideToggle('slow');
	});

	$('.suppliers').bind("click", function(){
		var row = $('.collapsible');
		var old_delivery = row.find(".delivery .text").text();
		var old_supplier = row.find(".supplier .text").text();
		var new_delivery = $(this).find(".delivery .text").text();
		var new_supplier = $(this).find(".supplier .text").text();

		row.find(".delivery .text").text(new_delivery);
		row.find(".supplier .text").text(new_supplier);
		$(this).find(".delivery .text").text(old_delivery);
		$(this).find(".supplier .text").text(old_supplier);

		$('.suppliers').slideToggle('slow');
	});

    $('.shipment-details-supplier').tooltip();

	function hideAll()
	{
		$("#welcome").hide();
		$("#main").hide();
		$("#active-shipments").hide();
		$("#order-history").hide();
	}
});
