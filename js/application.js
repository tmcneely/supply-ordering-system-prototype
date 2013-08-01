$(document).ready(function() {

	var undoStack = new Array();
	var redoStack = new Array();

	function clearUndo() {
		undoStack = new Array();
		redoStack = new Array();
		$('.undo-button').addClass('disabled');
		$('.redo-button').addClass('disabled');
	}

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
	  clearUndo();
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
		clearUndo();
	});

	//collapsible management
	$('.collapsible').collapsible({
		defaultOpen: 'item1,item3'
	});

	$('.remove-button').bind("click", function() {
		var row = $(this).closest(".item-row");
		undoStack.push(row);
		$('.undo-button').removeClass('disabled');
		row.hide(200);
	});

	$('.undo-button').bind('click', function() {
		if (undoStack.length > 0) {
			var div = undoStack.pop();
			redoStack.push(div);
			div.show(200);
			$('.redo-button').removeClass('disabled');
			if (undoStack.length == 0) {
				$('.undo-button').addClass('disabled');
			}
		}
	});

	$('.redo-button').bind('click', function() {
		if (redoStack.length > 0) {
			var div = redoStack.pop();
			undoStack.push(div);
			div.hide(200);
			$('.undo-button').removeClass('disabled');
			if (redoStack.length == 0) {
				$('.redo-button').addClass('disabled');
			}
		}
	});

	$('.home-button').bind("click", function() {
		hideAll();
		$("#welcome").fadeIn(200);
		clearUndo();
	});

	$('.new-order-btn').bind("click", function() {
		confirm("Are you sure you want to start a new order?\n(Current saved order will be cleared.)")
	});

	$('.saved-order-btn').bind("click", function() {
		hideAll();
		$("#main").fadeIn(200);
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

  $('#current-items .item-row .supplier').click(function(){
  	var supplierDiv = $(this).parents('.item').find('.suppliers')[0];
  	if ($(supplierDiv).css('display') == 'none') {
	    $(supplierDiv).slideDown(400);
	    $(this).find('.supplier-dropdown-button').addClass('active');
	  } else {
	    $(supplierDiv).slideUp(400);
	    $(this).find('.supplier-dropdown-button').removeClass('active');
	  }
	});

	$('#current-items .suppliers .item-row').bind("click", function(){
		var row = $(this).parents('.item').children('.item-row')[0];
		var old_cost = $(row).find(".cost .text").text();
		var old_delivery = $(row).find(".delivery .text").text();
		var old_supplier = $(row).find(".supplier .text").text();
		var new_cost = $(this).find(".cost .text").text();
		var new_delivery = $(this).find(".delivery .text").text();
		var new_supplier = $(this).find(".supplier .text").text();

		$(this).parents('.suppliers').slideUp(400);
		$(row).find('.supplier-dropdown-button').removeClass('active');
		var _this = this;

		$(row).find('.cost, .delivery, .supplier').find('.text').fadeOut(200, function() { 
			$(row).find(".cost .text").text(new_cost);
			$(row).find(".delivery .text").text(new_delivery);
			$(row).find(".supplier .text").text(new_supplier);

			$(this).fadeIn(200, function() {
				$(_this).find(".cost .text").text(old_cost);
				$(_this).find(".delivery .text").text(old_delivery);
				$(_this).find(".supplier .text").text(old_supplier);
			});

		});
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
