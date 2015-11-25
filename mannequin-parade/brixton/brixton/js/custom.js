"use strict";
	
jQuery(document).ready(function(){
	jQuery('.menu li a').click(function() {
		var href = jQuery(this).attr('href');
		jQuery("html, body").animate({ scrollTop: jQuery(href).offset().top - 90 }, 1000);
		return false;
	});
});


/* RESPONSIVE VIDEOS */

jQuery(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    jQuery(".main").fitVids();
	
  });
  

 

/*blog hover image*/
jQuery(document).ready(function(){
	jQuery( ".blogpostcategory" ).each(function() {		
		var img = jQuery(this).find('img');
		var height = img.height();
		var width = img.width();
		var over = jQuery(this).find('a.overdefultlink');
		over.css({'width':width+'px', 'height':height+'px'});
		var margin_left = parseInt(width)/2 - 18
		var margin_top = parseInt(height)/2 - 18
		over.css('backgroundPosition', margin_left+'px '+margin_top+'px');
	});		
});	

jQuery.fn.isOnScreen = function(){
     
    var win = jQuery(window);
     
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
	if(this.offset()){
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
     
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
     }
};
/*resp menu*/
jQuery(document).ready(function(){	
jQuery('.resp_menu_button').click(function() {
if(jQuery('.event-type-selector-dropdown').attr('style') == 'display: block;')
jQuery('.event-type-selector-dropdown').slideUp({ duration: 500, easing: "easeInOutCubic" });
else
jQuery('.event-type-selector-dropdown').slideDown({ duration: 500, easing: "easeInOutCubic" });
});	
jQuery('.event-type-selector-dropdown').click(function() {
jQuery('.event-type-selector-dropdown').slideUp({ duration: 500, easing: "easeInOutCubic" });
});
});
jQuery(document).ready(function(){
	jQuery( ".pagenav.home .menu > li:first-child a" ).addClass('important_color');
	if (jQuery( ".menu-fixedmenu" ).length) {
		jQuery( ".menu-fixedmenu .menu a" ).each(function() {
			var id  = jQuery(this).attr('href');
			var lenght_id  = id.length;
			if (typeof id !== "undefined" && lenght_id > 2) {
			if(id.search("#") != -1 && id.search("http")){
				jQuery( window ).scroll(function() {
					
					if(jQuery(id).isOnScreen()){
						jQuery(id+' h2').removeClass('fadeInDown');
						jQuery(id+' h2').addClass('animated fadeInUp');					
						var newid = id.split("#");
						if(document.getElementById(newid[1]).getBoundingClientRect().top < 250){
							jQuery( ".fixedmenu .menu > li a[href='"+id+"']" ).addClass('important_color');
							}
							
						else{
							jQuery( ".fixedmenu .menu > li a[href='"+id+"']" ).removeClass('important_color');					
						}
						 
					}
					else{
						if(id != jQuery( ".menu > li:first-child a" ).attr('href') )
							jQuery( ".fixedmenu .menu > li a[href='"+id+"']" ).removeClass('important_color');
							if(jQuery(this).scrollTop() > 700)
								jQuery( ".menu-fixedmenu .menu > li:first-child a" ).removeClass('important_color');
							else
								jQuery( ".menu-fixedmenu .menu > li:first-child a" ).addClass('important_color');
								
							jQuery(id+' h2').removeClass('fadeInUp');
							jQuery(id+' h2').addClass('animated fadeInDown');	
						}
					
				});
			}
			}
		});
	}
	
	
});
jQuery(document).ready(function(){
jQuery('.overgallery').hide();
jQuery('.overvideo').hide();
jQuery('.overdefult').hide();
jQuery('.overport').hide();
jQuery(window).load(function () {
jQuery('.one_half').find('.loading').attr('class', '');
jQuery('.one_third').find('.loading').attr('class', '');
jQuery('.one_fourth').find('.loading').attr('class', '');
jQuery('.item').find('.loading').attr('class', '');
jQuery('.item4').find('.loading').attr('class', '');
jQuery('.item3').find('.loading').attr('class', '');
jQuery('.blogimage').find('.loading').attr('class', '');
jQuery('.image').css('background', 'none');
jQuery('.recentimage').css('background', 'none');
jQuery('.audioPlayerWrap').css({'background':'none','height':'25px','padding-top':'0px'});
jQuery('.blogpostcategory').find('.loading').removeClass('loading');
jQuery('.image').find('.loading').removeClass('loading');
//show the loaded image
jQuery('iframe').show();
jQuery('img').show();
jQuery('.audioPlayer').show();
jQuery('.overgallery').show();
jQuery('.overvideo').show();
jQuery('.overdefult').show();
jQuery('.overport').show();
jQuery('#slider-wrapper .loading').removeClass('loading');
jQuery('.imagesSPAll .loading').removeClass('loading');
jQuery('#slider').css('display','block');
jQuery('#slider .images').animate({'opacity':1},300);
jQuery('#slider,#slider img,.textSlide').css('opacity','1');
jQuery('#slider-wrapper').css('max-height','500px');
});
});


/*add submenu class*/
jQuery(document).ready(function(){
jQuery('.menu > li').each(function() {
if(jQuery(this).find('ul').size() > 0 ){
jQuery(this).addClass('has-sub-menu');
}
});
});
/*animate menu*/
jQuery(document).ready(function(){
jQuery('ul.menu > li').hover(function(){
jQuery(this).find('ul').stop(true,true).fadeIn(300);
},
function () {
jQuery(this).find('ul').stop(true,true).fadeOut(300);
});
});
/*add lightbox*/
jQuery(document).ready(function(){
jQuery(".gallery a").attr("rel", "lightbox[gallery]");
});
/*form hide replay*/
jQuery(document).ready(function(){
jQuery(".reply").click(function(){
jQuery('#commentform h3').hide();
});
jQuery("#cancel-comment-reply-link").click(function(){
jQuery('#commentform h3').show();
});
});
jQuery(document).ready(function(){
var menu = jQuery('.mainmenu');
jQuery( window ).scroll(function() {
if(!menu.isOnScreen() && jQuery(this).scrollTop() > 350){ 
jQuery(".totop").fadeIn(200);
jQuery(".fixedmenu").slideDown(200);}
else{
jQuery(".fixedmenu").slideUp(200);
jQuery(".totop").fadeOut(200);}
});
});

/* lightbox*/
function loadprety(){
jQuery(".gallery a").attr("rel", "lightbox[gallery]").prettyPhoto({theme:'light_rounded',overlay_gallery: false,show_title: false,deeplinking:false});
}
jQuery(document).ready(function(){
jQuery('.gototop').click(function() {
jQuery('html, body').animate({scrollTop:0}, 'medium');
});
});
/*search*/
jQuery(document).ready(function(){
if(jQuery('.widget_search').length>0){
jQuery('#sidebarsearch input').val('Search...');
jQuery('#sidebarsearch input').focus(function() {
jQuery('#sidebarsearch input').val('');
});
jQuery('#sidebarsearch input').focusout(function() {
jQuery('#sidebarsearch input').val('Search...');
});
}
});


var addthis_config = addthis_config||{};
addthis_config.data_track_addressbar = false;
