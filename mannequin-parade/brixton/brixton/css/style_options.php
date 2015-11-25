<?php
global $pmc_data; 
$use_bg = ''; $background = ''; $custom_bg = ''; $body_face = ''; $use_bg_full = ''; $bg_img = ''; $bg_prop = '';



if(isset($pmc_data['background_image_full'])) {
	$use_bg_full = $pmc_data['background_image_full'];
	
}

if(isset($pmc_data['use_boxed'])){
	$use_boxed = $pmc_data['use_boxed'];
}
else{
	$use_boxed = 0;
}

if($use_bg_full) {


	if($use_bg_full && isset($pmc_data['use_boxed']) && $pmc_data['use_boxed'] == 1) {
		$bg_img = $pmc_data['image_background'];
		$bg_prop = '';
	}

	

	
	$background = 'url('. $bg_img .') '.$bg_prop ;

}

function ieOpacity($opacityIn){
	
	$opacity = explode('.',$opacityIn);
	if($opacity[0] == 1)
		$opacity = 100;
	else
		$opacity = $opacity[1] * 10;
		
	return $opacity;
}

function HexToRGB($hex,$opacity) {
		$hex = preg_replace("/#/", "", $hex);
		$color = array();
 
		if(strlen($hex) == 3) {
			$color['r'] = hexdec(substr($hex, 0, 1) . $r);
			$color['g'] = hexdec(substr($hex, 1, 1) . $g);
			$color['b'] = hexdec(substr($hex, 2, 1) . $b);
		}
		else if(strlen($hex) == 6) {
			$color['r'] = hexdec(substr($hex, 0, 2));
			$color['g'] = hexdec(substr($hex, 2, 2));
			$color['b'] = hexdec(substr($hex, 4, 2));
		}
 
		return 'rgba('.$color['r'] .','.$color['g'].','.$color['b'].','.$opacity.')';
	}
	
	if(isset($pmc_data['google_menu_custom']) && $pmc_data['google_menu_custom'] != ''){
		$font_menu = explode(':',$pmc_data['google_menu_custom']);
		if(count($font_menu)>1) {
			$font_menu = $font_menu[0];
		}
		else{
			$font_menu = $pmc_data['google_menu_custom'];
		}
	}else{
		$font_menu = explode(':',$font_menu);
		if(count($font_menu)>1) {
			$font_menu = $font_menu[0];
		}
		else{
			$font_menu = $font_menu;
		}
	}		
	
	if(isset($pmc_data['google_quote_custom']) && $pmc_data['google_quote_custom'] != ''){
		$font_quote = explode(':',$pmc_data['google_quote_custom']);
		if(count($font_quote)>1) {
			$font_quote = $font_quote[0];
		}
		else{
			$font_quote = $pmc_data['google_quote_custom'];
		}
	}else{
		$font_quote = explode(':',$font_quote);
		if(count($font_quote)>1) {
			$font_quote = $font_quote[0];
		}
		else{
			$font_quote = $font_quote;
		}
	}	

	if(isset($pmc_data['google_heading_custom']) && $pmc_data['google_heading_custom'] != ''){
		$font_heading = explode(':',$pmc_data['google_heading_custom']);
		if(count($font_heading)>1) {
			$font_heading = $font_heading[0];
		}
		else{
			$font_heading= $pmc_data['google_heading_custom'];
		}	
	}else{
		$font_heading = explode(':',$font_heading);
		if(count($font_heading)>1) {
			$font_heading = $font_heading[0];
		}
		else{
			$font_heading=$font_heading;
		}	
	}

	if(isset($pmc_data['google_body_custom']) && $pmc_data['google_body_custom'] != ''){
		$font_body = explode(':',$pmc_data['google_body_custom']);
		if(count($font_body)>1) {
			$font_body = $font_body[0];
		}
		else{
			$font_body = $pmc_data['google_body_custom'];
		}
	}else{
		$font_body = explode(':',$font_body);
		if(count($font_body)>1) {
			$font_body = $font_body[0];
		}
		else{
			$font_body = $font_body;
		}		
	}	

?>


.block_footer_text, .quote-category .blogpostcategory {font-family: <?php echo $font_quote; ?>, "Helvetica Neue", Arial, Helvetica, Verdana, sans-serif;}
body {	 
	background:<?php echo $pmc_data['body_background_color'].' '.$background ?>  !important;
	color:<?php echo $pmc_data['body_font']['color']; ?>;
	font-family: <?php echo $font_body; ?>, "Helvetica Neue", Arial, Helvetica, Verdana, sans-serif;
	font-size: <?php echo $pmc_data['body_font']['size']; ?>;
	font-weight: normal;
}
::selection { background: #000; color:#fff; text-shadow: none; }

h1, h2, h3, h4, h5, h6, .block1 p, .blog-category a, .post-meta a,.widget_wysija_cont .wysija-submit  {font-family: <?php echo $font_heading; ?>, "Helvetica Neue", Arial, Helvetica, Verdana, sans-serif;}
h1 { 	
	color:<?php echo $pmc_data['heading_font_h1']['color']; ?>;
	font-size: <?php echo $pmc_data['heading_font_h1']['size'] ?> !important;
	}
	
h2, .term-description p { 	
	color:<?php echo $pmc_data['heading_font_h2']['color']; ?>;
	font-size: <?php echo $pmc_data['heading_font_h2']['size'] ?> !important;
	}

h3 { 	
	color:<?php echo $pmc_data['heading_font_h3']['color']; ?>;
	font-size: <?php echo $pmc_data['heading_font_h3']['size'] ?> !important;
	}

h4 { 	
	color:<?php echo $pmc_data['heading_font_h4']['color']; ?>;
	font-size: <?php echo $pmc_data['heading_font_h4']['size'] ?> !important;
	}	
	
h5 { 	
	color:<?php echo $pmc_data['heading_font_h5']['color']; ?>;
	font-size: <?php echo $pmc_data['heading_font_h5']['size'] ?> !important;
	}	

h6 { 	
	color:<?php echo $pmc_data['heading_font_h6']['color']; ?>;
	font-size: <?php echo $pmc_data['heading_font_h6']['size'] ?> !important;
	}	

.pagenav a {font-family: <?php echo $font_menu; ?> !important;
			  font-size: <?php echo $pmc_data['menu_font']['size'] ?>;
			  font-weight:<?php echo $pmc_data['menu_font']['style'] ?>;
			  color:<?php echo $pmc_data['menu_font']['color'] ?>;
}
.pagenav li li a, .block1_lower_text p,.widget_wysija_cont .updated, .widget_wysija_cont .login .message  {font-family: <?php echo $font_body; ?>, "Helvetica Neue", Arial, Helvetica, Verdana, sans-serif !important;color:#444;font-size:14px;}

a, select, input, textarea, button{ color:<?php echo $pmc_data['body_link_coler']; ?>;}
h3#reply-title, select, input, textarea, button, .link-category .title a{font-family: <?php echo $font_body; ?>, "Helvetica Neue", Arial, Helvetica, Verdana, sans-serif;}

.prev-post-title, .next-post-title, .blogmore, .more-link {font-family: <?php echo $font_heading; ?>, "Helvetica Neue", Arial, Helvetica, Verdana, sans-serif;}

/* ***********************
--------------------------------------
------------MAIN COLOR----------
--------------------------------------
*********************** */

a:hover, span, .current-menu-item a, .blogmore, .more-link, .pagenav.fixedmenu li a:hover, .widget ul li a:hover,.pagenav.fixedmenu li.current-menu-item > a,.block2_text a,
.blogcontent a, .sentry a

{
	color:<?php echo $pmc_data['mainColor']; ?>;
}

.su-quote-style-default  {border-left:5px solid <?php echo $pmc_data['mainColor']; ?>;}

 
/* ***********************
--------------------------------------
------------BACKGROUND MAIN COLOR----------
--------------------------------------
*********************** */

.top-cart, .blog_social .addthis_toolbox a:hover, #footer .social_icons a, .sidebar .social_icons a, .widget_tag_cloud a, .sidebar .widget_search #searchsubmit,
.menu ul.sub-menu li:hover, .specificComment .comment-reply-link:hover, #submit:hover, .addthis_toolbox a:hover, .wpcf7-submit:hover, #submit:hover,
.link-title-previous:hover, .link-title-next:hover, .specificComment .comment-edit-link:hover, .specificComment .comment-reply-link:hover, h3#reply-title small a:hover, .pagenav li a:after,
.widget_wysija_cont .wysija-submit,.sidebar-buy-button a, .widget ul li:before, #footer .widget_search #searchsubmit
  {
	background:<?php echo $pmc_data['mainColor']; ?> ;
}
.pagenav  li li a:hover {background:none;}
.link-title-previous:hover, .link-title-next:hover {color:#fff;}
#headerwrap {background:<?php echo $pmc_data['menu_background_color']; ?>;}
div#logo {background:<?php echo $pmc_data['header_background_color']; ?>;}

 /* ***********************
--------------------------------------
------------BOXED---------------------
-----------------------------------*/
<?php if($use_boxed == 0 &&  isset($pmc_data['use_background']) && $pmc_data['use_background'] == 1){ ?>
	body, .cf, .mainwrap, .post-full-width, .titleborderh2, .sidebar  {
	background:<?php echo $pmc_data['body_background_color'].' '.$background ?>  !important; 
	}
	
<?php	} ?>
 <?php if(isset($pmc_data['use_boxed']) &&  $use_boxed == 1){ ?>
header,.outerpagewrap{background:none !important;}
header,.outerpagewrap,.mainwrap{background-color:<?php echo $pmc_data['body_background_color'] ?> ;}
@media screen and (min-width:1220px){
body {width:1220px !important;margin:0 auto !important;}
.top-nav ul{margin-right: -21px !important;}
.mainwrap.shop {float:none;}
.pagenav.fixedmenu { width: 1220px !important;}
.bottom-support-tab,.totop{right:5px;}
<?php if($use_bg_full){ ?>
	body {
	background:<?php echo $pmc_data['body_background_color'].' '.$background ?>  !important; 
	background-attachment:fixed !important;
	background-size:cover !important; 
	-webkit-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.2);
-moz-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.2);
box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.2);
	}	
<?php	} ?>
 <?php if(!$use_bg_full){ ?>
	body {
	background:<?php echo $pmc_data['body_background_color'].' '.$background ?>  !important; 
	
	}
	
<?php	} ?>	
}
<?php } ?>
 
 
 
 
/* ***********************
--------------------------------------
------------RESPONSIVE MODE----------
--------------------------------------
*********************** */

<?php if(isset($pmc_data['showresponsive']) && $pmc_data['showresponsive'] == 1 ) { ?>

@media screen and (min-width:0px) and (max-width:1220px){
	
	.widget_search form input#s {width:40%;}
	.relatedPosts {min-width:initial;width:auto !important;}
	.main, #footerb, #footer {width: 94%; padding-left:3%;padding-right:3%; }
	.pagenav .menu {padding-left:3%;}
	.top-nav {width: 100%; padding-left:0%;padding-right:0%;}
	.pagecontent, .block2_content, #footerinside{width:100%;}
    .blogimage img, .blogsingleimage img, .related img, #slider-category img{width:100%;height:auto;}
	.bx-viewport {height:auto;}
	.pagenav .social_icons {float:left;}
	
	.block2_social:before, .social_text, .pagenav.fixedmenu {display:none !important;}
	.block2_social .social_content  {margin-left:0;}
	.block2_social .social_content {margin-top:0;}
	.block2_social {top:0; padding:10px;background:#fff;}
	.block1 p, .block1 a:hover p {font-size:16px;}
	
	/* BLOG */
	
	.blog_social, .socialsingle {background-position: -11px 21px;}
	.right-part {width:85%;}
	.mainwrap.single-default.sidebar .right-part {width:70% !important;}
	.mainwrap.single-default.sidebar .related img{max-width:initial;}
	
	/* FOOTER */
	.lowerfooter {height:2px;padding:0;margin-top:0px;}
	.footer_widget3 {float:left;}
	div#logo img {height:auto;max-width:94%;}
	.left-footer-content, .right-footer-content {margin-top:30px;}
	
	/* WITH SIDEBAR */
	
	.mainwrap.sidebar .content.blog, .mainwrap.single-default.sidebar .main .content.singledefult,.sidebar .content.singlepage{width:60% !important;margin-right:1% !important;}
	.mainwrap.sidebar .postcontent, .mainwrap.single-default.sidebar .content.singledefult .related img  {width:100% !important;}
	.mainwrap .sidebar {width: 27.4% !important; float: left; }	
	.widget-line {width:100%;}
	.mainwrap.blog.sidebar .main .content.blog .blogimage img, .mainwrap.single-default.sidebar .main .content.singledefult .blogsingleimage img {padding:0;}
	.link-category .title, .sidebar .link-category .title {display:block;float:left;position:relative;width:100%;margin-top:0;padding:0 !important; }
	.su-column img {height:auto;}
	
	.block2_text {width:48%;max-height:initial;}
}


@media screen and (min-width:0px) and (max-width:960px){
	
	
	
	textarea#comment {width:85%;}
	.pagenav .menu, .postcontent.singledefult .share-post::before, .postcontent.singledefult .share-post::after, .blog-category:before, .blog-category:after{display:none;}
	.pagenav {padding: 0px 3.2%;margin-left:-3.2%;width:100%;float:left;background: #222;border-top: 1px solid #333;}
	.pagenav .social_icons {position:relative;text-align:center ;left:50%;margin:0 auto !important;margin-left:-90px !important;float: none;margin-top: 14px;}
	#headerwrap {margin-bottom:50px;}
	
	/* MENU */
	
	.respMenu {width:100% !important;float:none !important; text-transform:uppercase;background:#fff;background:rgba(255,255,255,1);border-left:1px solid #eee;border-right:1px solid #eee; text-align: center; color:#121212;font-weight:normal;     cursor:pointer;display:block;}
	.resp_menu_button {font-size:14px;position:absolute;display:inline-block; text-align:center;margin:0 auto;top:16px;color:#fff;z-index:9999;width:32px;height:24px;margin-left:-16px;}
	.respMenu.noscroll a i {display:none;}
	
	.respMenu .menu-main-menu-container {margin-top:60px;}
	.event-type-selector-dropdown {display:none;margin-top:60px;}
	.respMenu a{border-left:1px solid #eee;border-right:1px solid #eee; background:#fff;width:94%;font-size:14px;font-weight:bold;padding:10px 3%; border-bottom:1px solid #ddd;text-transform:uppercase !important;float:left;text-align: left !important;text-transform:none;font-weight:normal;}
	
	.right-part {width:80%;}
	.mainwrap.single-default.sidebar .right-part {width:55% !important;}
	.blog_social, .socialsingle {margin-top:45px;}
	textarea {width:97%;}
	
	.mainwrap.blog .blog_social,.mainwrap.single-default .blog_social {margin:0 0 30px 0;}
	.mainwrap.single-default .blog_social {margin-left:30px;}
	.post-meta {margin-bottom:0;}
	.quote-category .blogpostcategory .meta p:before, .quote-category .blogpostcategory .meta p:after {display:none;}
	.quote-category .blogpostcategory p {text-indent:0;}
	
	.block2_text{margin-left:0; background:none;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;width:90%;}
	.block2_img {text-align:center;background:none;width:100%;padding:35px 0;}
	.block2_img .block2_img_big{float:none}
	.block2 {background:#fff;}
	.post-meta{margin-top:25px;}
}

@media screen and (min-width:0px) and (max-width:768px){
	h1 {font-size:48px !important;}
	h2 {font-size:36px !important;}
	h3 {font-size:28px !important;}
	h4 {font-size:24px !important;}
	h5 {font-size:22px !important;}
	h6 {font-size:18px !important;}
    .right-part{width:78%;}
	.mainwrap.single-default.sidebar .right-part  {width:75% !important;}

	.link-title-next {float:left;padding-left:25px;}
	.link-title-next span, .next-post-title {float:left;text-align:left;}
	
	.blog-category em:before,.blog-category em:after{display:none;}
	
	/* WITH SIDEBAR */
	.bibliographical-info {padding:0 20px;}
	.mainwrap .sidebar {width:80% !important;float:left !important;margin-left:0;}
	.mainwrap.blog.sidebar .sidebar, .mainwrap.single-default.sidebar .sidebar, .mainwrap.sidebar .sidebar, .sidebar .widget {margin-left:0;}
	.mainwrap.sidebar .content.blog, .mainwrap.single-default.sidebar .main .content.singledefult,.sidebar .content.singlepage {width:100% !important;}
	#footer .wttitle {float:none;}
}

@media screen and (min-width:0px) and (max-width:720px){
	.footer_widget1, .footer_widget2, .footer_widget3 {width:100%;text-align:center;}
	.footer_widget3 {margin-bottom:30px;}
	.footer_widget2 .widget.widget_text p {padding-left:0;}
	#footer .social_icons {float:left;margin-top:20px;position:relative;left:50%;margin-left:-100px;  }
	.footer_widget1 {margin-bottom:30px;}
	
	#footerb .copyright {float:left;margin-top:30px; text-align:center;}
	.right-part {width:75%;}

	img.alignleft, img.alignright {width:100%;height:auto;margin-bottom:20px;}
}

@media screen and (min-width:0px) and (max-width:620px){
	.blog-category {font-size:18px;}
	.quote-category .blogpostcategory {font-size:24px;line-height:34px;}
	.mainwrap.blog.sidebar h2.title, .mainwrap.single-default.sidebar h2.title {font-size:24px !important;}
	.block1 a{width:94%;padding-left:3%;padding-right:3%; float:left;}
	.block1 p, .block1 a:hover p {}
	.block1 {background:#FAFAFA;}
	.block2_social {width: 100%;left:0;margin:0; position:relative;float:left;background:#f4f4f4 !important;padding:25px 0 15px 0;}
	.block2_social .social_content {width:auto;}
	
	.left-footer-content, .right-footer-content {width:100%;float:left;text-align:center;margin-top:0;}
	
	.related .one_third {width:100%;margin-bottom:30px;}
	.right-part {width:70%;}
	
	.mainwrap.blog .blog_social,.mainwrap.single-default .blog_social {float:left !important;}
	.post-meta a:after {display:none;}
	.blog_social, .socialsingle {float:left;margin:10px 0;}
	
	.block2_content {margin-top:10px;}
	
	/* INSTAGRAM */
	
	h5.block3-instagram-title {font-size:36px !important;}
	.block3-instagram-username {display:none;}
	.link-category .title a {line-height:40px;}
}
	
	
@media screen and (min-width:0px) and (max-width:515px){	
	.specificComment .blogAuthor {display:none;}
	.right-part {width:100%;}
	.mainwrap.single-default.sidebar .right-part  {width:100% !important;}
	h1 {font-size:40px !important;}
	h2, .mainwrap.blog.sidebar h2.title, .mainwrap.single-default.sidebar h2.title {font-size:28px !important;}
	h3 {font-size:24px !important;}
	h4 {font-size:20px !important;}
	h5 {font-size:18px !important;}
	h6 {font-size:16px !important;}
	.blog_category {font-size:13px;}
	.gallery-single {text-align:center;}
	.image-gallery, .gallery-item {float:none;}
	
	.post-meta:after {display:none;}
	.post-meta{padding:0 15px 0 15px !important;font-size:12px !important;}
	
	.block2_text{width:80%;}
}

@media screen\0 {
	 .resp_menu_button{margin-left:48%;}
}

@media screen and (min-width:0px) and (max-width:415px){	
	
}

@media 
(-webkit-min-device-pixel-ratio: 2), 
(min-resolution: 192dpi) { 
 
	}
	
	
<?php } ?>

/* ***********************
--------------------------------------
------------CUSTOM CSS----------
--------------------------------------
*********************** */

<?php echo pmc_stripText($pmc_data['custom_style']) ?>