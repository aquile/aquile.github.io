<?php
add_action( 'after_setup_theme', 'pmc_Brixton_theme_setup' );
function pmc_Brixton_theme_setup() {
	global $pmc_data;
	/*text domain*/
	load_theme_textdomain( 'pmc-themes', get_template_directory() . '/lang' );
	/*woocommerce support*/
	add_theme_support( 'post-formats', array( 'link', 'gallery', 'video' , 'audio', 'quote') );
	/*feed support*/
	add_theme_support( 'automatic-feed-links' );
	/*post thumb support*/
	add_theme_support( 'post-thumbnails' ); // this enable thumbnails and stuffs
	/*title*/
	add_theme_support( 'title-tag' );
	/*setting thumb size*/
	add_image_size( 'gallery', 185,185, true );	
	add_image_size( 'widget', 285,155, true );
	add_image_size( 'postBlock', 370,260, true );
	add_image_size( 'blog', 1180, 650, true );
	add_image_size( 'related', 345,190, true );

	
	register_nav_menus(array(
	
			'pmcmainmenu' => 'Main Menu',
			'pmcrespmenu' => 'Responsive Menu',	
			'pmcscrollmenu' => 'Scroll Menu'			
	));	
	
		
    register_sidebar(array(
        'id' => 'sidebar',
        'name' => 'Sidebar main',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3><div class="widget-line"></div>'
    ));		    		
	
 
    register_sidebar(array(
        'id' => 'footer1',
        'name' => 'Footer sidebar 1',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>'
    ));
    
    register_sidebar(array(
        'id' => 'footer2',
        'name' => 'Footer sidebar 2',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>'
    ));
	
    
    register_sidebar(array(
        'id' => 'footer3',
        'name' => 'Footer sidebar 3',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>'
    ));
    


	
	// Responsive walker menu
	class pmc_Walker_Responsive_Menu extends Walker_Nav_Menu {
		
		function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
			global $wp_query;		
			$item_output = $attributes = $prepend ='';
			$class_names = $value = '';
			$classes = empty( $item->classes ) ? array() : (array) $item->classes;
			$class_names = join( ' ', apply_filters( '', array_filter( $classes ), $item ) );			
			$class_names = ' class="'. esc_attr( $class_names ) . '"';			   
			// Create a visual indent in the list if we have a child item.
			$visual_indent = ( $depth ) ? str_repeat('&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-circle"></i>', $depth) : '';
			// Load the item URL
			$attributes .= ! empty( $item->url ) ? ' href="'   . esc_attr( $item->url ) .'"' : '';
			// If we have hierarchy for the item, add the indent, if not, leave it out.
			// Loop through and output each menu item as this.
			if($depth != 0) {
				$item_output .= '<a '. $class_names . $attributes .'>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-circle"></i>' . $item->title. '</a><br>';
			} else {
				$item_output .= '<a ' . $class_names . $attributes .'><strong>'.$prepend.$item->title.'</strong></a><br>';
			}
			// Make the output happen.
			$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
		}
	}
	
	
	// Main walker menu	
	class pmc_Walker_Main_Menu extends Walker_Nav_Menu
	{		
		function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
		   $this->curItem = $item;
		   global $wp_query;
		   $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
		   $class_names = $value = '';
		   $classes = empty( $item->classes ) ? array() : (array) $item->classes;
		   $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
		   $class_names = ' class="'. esc_attr( $class_names ) . '"';
		   $image  = ! empty( $item->custom )     ? ' <img src="'.esc_attr($item->custom).'">' : '';
		   $output .= $indent . '<li id="menu-item-'.rand(0,9999).'-'. $item->ID . '"' . $value . $class_names .' );">';
		   $attributes_title  = ! empty( $item->attr_title ) ? ' <i class="fa '  . esc_attr( $item->attr_title ) .'"></i>' : '';
		   $attributes  = ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
		   $attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
		   $attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';
		   $prepend = '';
		   $append = '';
		   if($depth != 0)
		   {
				$append = $prepend = '';
		   }
			$item_output = $args->before;
			$item_output .= '<a '. $attributes .'>';
			$item_output .= $attributes_title.$args->link_before .$prepend.apply_filters( 'the_title', $item->title, $item->ID ).$append;
			$item_output .= $args->link_after;
			$item_output .= '</a>';	
			$item_output .= $args->after;
			$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
		}
	}
	
	

}




/*-----------------------------------------------------------------------------------*/
// Options Framework
/*-----------------------------------------------------------------------------------*/
// Paths to admin functions
define('MY_TEXTDOMAIN', 'pmc-themes');
define('ADMIN_PATH', get_stylesheet_directory() . '/admin/');
define('BOX_PATH', get_stylesheet_directory() . '/includes/boxes/');
define('ADMIN_DIR', get_template_directory_uri() . '/admin/');
define('LAYOUT_PATH', ADMIN_PATH . '/layouts/');
define('OPTIONS', 'of_options_pmc'); // Name of the database row where your options are stored
add_option('IMPORT', 'false');
if (is_admin() && isset($_GET['activated'] ) && $pagenow == "themes.php" ) {
	//Call action that sets
	add_action('admin_head','pmc_options');
	if(get_option('IMPORT') == 'false'){
		wp_redirect( admin_url( 'themes.php?page=optionsframework&import=false' ) );
		update_option('IMPORT', 'true');
	}
	else{
		wp_redirect( admin_url( 'themes.php?page=optionsframework' ) );
	}
}
/* import theme options */
function pmc_options()	{
		
	if (!get_option('of_options_pmc')){
		$pmc_data = 'YTo2OTp7czoxNDoic2hvd3Jlc3BvbnNpdmUiO3M6MToiMSI7czoxMDoidXNlX2Jsb2NrMSI7czoxOiIxIjtzOjEwOiJ1c2VfYmxvY2szIjtzOjE6IjEiO3M6NDoibG9nbyI7czo4MzoiaHR0cDovL2JyaXh0b24ucHJlbWl1bWNvZGluZy5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTUvMDIvYnJpeHRvbi1sb2dvLWxpZ2h0Mi5wbmciO3M6MTE6ImxvZ29fcmV0aW5hIjtzOjg2OiJodHRwOi8vYnJpeHRvbi5wcmVtaXVtY29kaW5nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNS8wMi9icml4dG9uLWxvZ28tbGlnaHQyQDJ4LnBuZyI7czoxMToic2Nyb2xsX2xvZ28iO3M6ODM6Imh0dHA6Ly9icml4dG9uLnByZW1pdW1jb2RpbmcuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE1LzAyL2JyaXh0b24tZm9vdGVyLWxvZ28ucG5nIjtzOjc6ImZhdmljb24iO3M6Nzk6Imh0dHA6Ly9icml4dG9uLnByZW1pdW1jb2RpbmcuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE1LzAyL2JyaXh0b24tZmF2aWNvbi5wbmciO3M6MTE6ImJsb2NrMV9pbWcxIjtzOjgwOiJodHRwOi8vYnJpeHRvbi5wcmVtaXVtY29kaW5nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNS8wMi9mZWF0dXJlZC1pbWFnZS0yLmpwZyI7czoxMjoiYmxvY2sxX3RleHQxIjtzOjMwOiJORVcgQlJFQUtGQVNUIENBRkUgT1BFTlMgVE9EQVkiO3M6MTg6ImJsb2NrMV9sb3dlcl90ZXh0MSI7czoyNzoiV0UgSEFWRSBSRVZJRVdFRCBJVCBGT1IgWU9VIjtzOjEyOiJibG9jazFfbGluazEiO3M6NjQ6Imh0dHA6Ly9icml4dG9uLnByZW1pdW1jb2RpbmcuY29tL25ldy1lY28tcmVzdGF1cmFudC1vcGVucy10b2RheS8iO3M6MTE6ImJsb2NrMV9pbWcyIjtzOjgwOiJodHRwOi8vYnJpeHRvbi5wcmVtaXVtY29kaW5nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNS8wMi9mZWF0dXJlZC1pbWFnZS0xLmpwZyI7czoxMjoiYmxvY2sxX3RleHQyIjtzOjQzOiJUSEVSRSBJUyBOT1RISU5HIExJS0UgQ09GRkVFIElOIFRIRSBNT1JOSU5HIjtzOjE4OiJibG9jazFfbG93ZXJfdGV4dDIiO3M6MzQ6IkZSRVNIIENPRkZFRSBFVkVSWSBEQVkgQVQgQlJJWFRPTlMiO3M6MTI6ImJsb2NrMV9saW5rMiI7czozMjoiaHR0cDovL2JyaXh0b24ucHJlbWl1bWNvZGluZy5jb20iO3M6MTE6ImJsb2NrMV9pbWczIjtzOjgwOiJodHRwOi8vYnJpeHRvbi5wcmVtaXVtY29kaW5nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNS8wMi9mZWF0dXJlZC1pbWFnZS01LmpwZyI7czoxMjoiYmxvY2sxX3RleHQzIjtzOjI5OiJORVcgQkFSQkVSIFNBTE9PTiBKVVNUIE9QRU5FRCI7czoxODoiYmxvY2sxX2xvd2VyX3RleHQzIjtzOjMwOiJUUklNIFlPVVIgQkVBUkQgVEhFIFBST1BFUiBXQVkiO3M6MTI6ImJsb2NrMV9saW5rMyI7czo2NzoiaHR0cDovL2JyaXh0b24ucHJlbWl1bWNvZGluZy5jb20vYnJhbmQtbmV3LWJhcmJlci1zaG9wLWp1c3Qtb3BlbmVkLyI7czoxMDoiYmxvY2syX2ltZyI7czo4NjoiaHR0cDovL2JyaXh0b24ucHJlbWl1bWNvZGluZy5jb20vYnJpeHRvbjIvd3AtY29udGVudC91cGxvYWRzLzIwMTUvMDMvYmFyYmVyLXRlYW0tNy5qcGciO3M6MTE6ImJsb2NrMl90ZXh0IjtzOjgyNjoiSGVsbG8sIG15IG5hbWUgaXMgPGI+QnJpeHRvbjwvYj4uIEkgYW0gYSBibG9nZ2VyIGxpdmluZyBpbiBOZXcgWW9yay4gVGhpcyBpcyBteSBibG9nLCB3aGVyZSBJIHBvc3QgbXkgcGhvdG9zLCBmYXNoaW9uIHRyZW5kcyBhbmQgdGlwcyBhYm91dCB0aGUgZmFzaGlvbiB3b3JsZC4gTmV2ZXIgbWlzcyBvdXQgb24gbmV3IHN0dWZmLiBJIHN0YXJ0ZWQgd2l0aCBCcml4dG9uIHRvIHByb3ZpZGUgeW91IHdpdGggPGI+ZGFpbHkgZnJlc2ggbmV3IGlkZWFzPC9iPiBhYm91dCB0cmVuZHMuIEl0IGlzIGEgdmVyeSBjbGVhbiBhbmQgZWxlZ2FudCBXb3JkcHJlc3MgVGhlbWUgc3VpdGFibGUgZm9yIGV2ZXJ5IGJsb2dnZXIuIFlvdSBjYW4gY29udGFjdCBtZSBhdDogPGEgaHJlZj1cIm1haWx0bzppbmZvQGJyaXh0b24uY29tXCI+PGI+aW5mb0Bicml4dG9uLmNvbTwvYj48L2E+DQo8L2JyPjwvYnI+DQpTb21ldGltZXMgZ3JlYXQgaWRlYXMgY29tZSBvdXQgb2YgdGhlIHNpbXBsZXN0IHRoaW5ncy4gVGhpcyBpcyB0aGUgdHJ1ZSBlc3NlbmNlIG9mIDxhIGhyZWYgPVwiaHR0cDovL3RoZW1lZm9yZXN0Lm5ldC9pdGVtL2JyaXh0b24tbWluaW1hbC1wZXJzb25hbC13b3JkcHJlc3MtYmxvZy10aGVtZS8xMDMwOTg2NT9yZWY9cG1jcm9rclwiPjxiPjxzcGFuPkJyaXh0b248L3NwYW4+PC9iPjwvYT4sIGEgbWluaW1hbCBXb3JkcHJlc3MgYmxvZyBUaGVtZSBmb3IgcGVvcGxlIHRoYXQgbGlrZSB0byBnZXQgc3RyYWlnaHQgdG8gdGhlIHBvaW50LiBTaGFyZSB5b3VyIHN0b3JpZXMsIHR1dG9yaWFscyBhbmQgbmV3cyBpbiBhIG1pbmltYWwsIHlldCBhcHBlYWxpbmcgd2F5LiI7czoxNzoiYmxvY2tfZm9vdGVyX3RleHQiO3M6MjIxOiLigJxJIHN0YXJ0ZWQgd2l0aCBCcml4dG9uIHRvIHByb3ZpZGUgeW91IHdpdGggPHNwYW4+ZGFpbHkgZnJlc2ggbmV3IGlkZWFzPC9zcGFuPiBhYm91dCB0cmVuZHMuIEl0IGlzIGEgdmVyeSBjbGVhbiBhbmQgZWxlZ2FudCBXb3JkcHJlc3MgVGhlbWUgc3VpdGFibGUgZm9yIGV2ZXJ5IGJsb2dnZXIuIFBlcmZlY3QgZm9yIHNoYXJpbmcgeW91ciA8c3Bhbj5saWZlc3R5bGUuPC9zcGFuPuKAnSI7czoxMjoiYmxvY2szX3RpdGxlIjtzOjIyOiJGT0xMT1cgTUUgT04gSU5TVEFHUkFNIjtzOjE1OiJibG9jazNfdXNlcm5hbWUiO3M6MTM6ImJyaXh0b25sb3VuZ2UiO3M6MTA6ImJsb2NrM191cmwiO3M6MzQ6Imh0dHA6Ly9pbnN0YWdyYW0uY29tL2JyaXh0b25sb3VuZ2UiO3M6MTc6ImRpc3BsYXlfcG9zdF9tZXRhIjtzOjE6IjEiO3M6MTU6ImRpc3BsYXlfc29jaWFscyI7czoxOiIxIjtzOjE1OiJkaXNwbGF5X3JlbGF0ZWQiO3M6MToiMSI7czoxOToic2luZ2xlX2Rpc3BsYXlfdGFncyI7czoxOiIxIjtzOjE5OiJkaXNwbGF5X2F1dGhvcl9pbmZvIjtzOjE6IjEiO3M6MjQ6InNpbmdsZV9kaXNwbGF5X3Bvc3RfbWV0YSI7czoxOiIxIjtzOjIyOiJzaW5nbGVfZGlzcGxheV9zb2NpYWxzIjtzOjE6IjEiO3M6MzA6InNpbmdsZV9kaXNwbGF5X3Bvc3RfbmF2aWdhdGlvbiI7czoxOiIxIjtzOjk6Im1haW5Db2xvciI7czo3OiIjYWQ2YzYwIjtzOjE0OiJncmFkaWVudF9jb2xvciI7czo3OiIjYWQ2YzYwIjtzOjg6ImJveENvbG9yIjtzOjc6IiNmNWYxZjEiO3M6MTU6IlNoYWRvd0NvbG9yRm9udCI7czo0OiIjZmZmIjtzOjIzOiJTaGFkb3dPcGFjaXR0eUNvbG9yRm9udCI7czoxOiIwIjtzOjIxOiJtZW51X2JhY2tncm91bmRfY29sb3IiO3M6NzoiIzI2MjYyNiI7czoyMzoiaGVhZGVyX2JhY2tncm91bmRfY29sb3IiO3M6NzoiI2ZhZmFmYSI7czoyMToiYm9keV9iYWNrZ3JvdW5kX2NvbG9yIjtzOjc6IiNmMmYyZjIiO3M6MjE6ImJhY2tncm91bmRfaW1hZ2VfZnVsbCI7czoxOiIxIjtzOjE2OiJpbWFnZV9iYWNrZ3JvdW5kIjtzOjg4OiJodHRwOi8vc2NyaWJiby5wcmVtaXVtY29kaW5nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8xMi9zY3JpYmJvLWJveGVkLWJhY2tncm91bmQuanBnIjtzOjEyOiJjdXN0b21fc3R5bGUiO3M6MDoiIjtzOjk6ImJvZHlfZm9udCI7YTozOntzOjQ6InNpemUiO3M6NDoiMThweCI7czo1OiJjb2xvciI7czo3OiIjNTI1NDUyIjtzOjQ6ImZhY2UiO3M6MTE6Ik9wZW4lMjBTYW5zIjt9czoxODoiZ29vZ2xlX2JvZHlfY3VzdG9tIjtzOjE5OiJSYWxld2F5OjQwMCw2MDAsNzAwIjtzOjEyOiJoZWFkaW5nX2ZvbnQiO2E6Mjp7czo0OiJmYWNlIjtzOjExOiJPcGVuJTIwU2FucyI7czo1OiJzdHlsZSI7czo0OiJib2xkIjt9czoyMToiZ29vZ2xlX2hlYWRpbmdfY3VzdG9tIjtzOjE0OiJPc3dhbGQ6NDAwLDcwMCI7czo5OiJtZW51X2ZvbnQiO2E6NDp7czo0OiJzaXplIjtzOjQ6IjE2cHgiO3M6NToiY29sb3IiO3M6NDoiI2ZmZiI7czo0OiJmYWNlIjtzOjExOiJPcGVuJTIwU2FucyI7czo1OiJzdHlsZSI7czo2OiJub3JtYWwiO31zOjE4OiJnb29nbGVfbWVudV9jdXN0b20iO3M6NjoiT3N3YWxkIjtzOjE5OiJnb29nbGVfcXVvdGVfY3VzdG9tIjtzOjMwOiJQbGF5ZmFpciBEaXNwbGF5OjQwMCw0MDBpdGFsaWMiO3M6MTQ6ImJvZHlfYm94X2NvbGVyIjtzOjc6IiNmZmZmZmYiO3M6MTU6ImJvZHlfbGlua19jb2xlciI7czo3OiIjMzQzNDM0IjtzOjE1OiJoZWFkaW5nX2ZvbnRfaDEiO2E6Mjp7czo0OiJzaXplIjtzOjQ6IjQ4cHgiO3M6NToiY29sb3IiO3M6NDoiIzMzMyI7fXM6MTU6ImhlYWRpbmdfZm9udF9oMiI7YToyOntzOjQ6InNpemUiO3M6NDoiNDBweCI7czo1OiJjb2xvciI7czo0OiIjMzMzIjt9czoxNToiaGVhZGluZ19mb250X2gzIjthOjI6e3M6NDoic2l6ZSI7czo0OiIzNnB4IjtzOjU6ImNvbG9yIjtzOjQ6IiMzMzMiO31zOjE1OiJoZWFkaW5nX2ZvbnRfaDQiO2E6Mjp7czo0OiJzaXplIjtzOjQ6IjMwcHgiO3M6NToiY29sb3IiO3M6NDoiIzMzMyI7fXM6MTU6ImhlYWRpbmdfZm9udF9oNSI7YToyOntzOjQ6InNpemUiO3M6NDoiMjRweCI7czo1OiJjb2xvciI7czo0OiIjMzMzIjt9czoxNToiaGVhZGluZ19mb250X2g2IjthOjI6e3M6NDoic2l6ZSI7czo0OiIyMHB4IjtzOjU6ImNvbG9yIjtzOjQ6IiMzMzMiO31zOjExOiJzb2NpYWxpY29ucyI7YTo1OntpOjE7YTo0OntzOjU6Im9yZGVyIjtzOjE6IjEiO3M6NToidGl0bGUiO3M6NzoiVHdpdHRlciI7czozOiJ1cmwiO3M6MTA6ImZhLXR3aXR0ZXIiO3M6NDoibGluayI7czozMjoiaHR0cDovL3R3aXR0ZXIuY29tL1ByZW1pdW1Db2RpbmciO31pOjI7YTo0OntzOjU6Im9yZGVyIjtzOjE6IjIiO3M6NToidGl0bGUiO3M6ODoiRmFjZWJvb2siO3M6MzoidXJsIjtzOjExOiJmYS1mYWNlYm9vayI7czo0OiJsaW5rIjtzOjM4OiJodHRwczovL3d3dy5mYWNlYm9vay5jb20vUHJlbWl1bUNvZGluZyI7fWk6MzthOjQ6e3M6NToib3JkZXIiO3M6MToiMyI7czo1OiJ0aXRsZSI7czo4OiJEcmliYmJsZSI7czozOiJ1cmwiO3M6MTE6ImZhLWRyaWJiYmxlIjtzOjQ6ImxpbmsiO3M6Mjg6Imh0dHBzOi8vZHJpYmJibGUuY29tL2dsaml2ZWMiO31pOjQ7YTo0OntzOjU6Im9yZGVyIjtzOjE6IjQiO3M6NToidGl0bGUiO3M6NjoiRmxpY2tyIjtzOjM6InVybCI7czo5OiJmYS1mbGlja3IiO3M6NDoibGluayI7czoyMzoiaHR0cHM6Ly93d3cuZmxpY2tyLmNvbS8iO31pOjU7YTo0OntzOjU6Im9yZGVyIjtzOjE6IjUiO3M6NToidGl0bGUiO3M6OToiUGludGVyZXN0IjtzOjM6InVybCI7czoxNDoiZmEtcGludGVyZXN0LXAiO3M6NDoibGluayI7czozMzoiaHR0cDovL3d3dy5waW50ZXJlc3QuY29tL2dsaml2ZWMvIjt9fXM6MTQ6ImVycm9ycGFnZXRpdGxlIjtzOjEwOiJPT09QUyEgNDA0IjtzOjk6ImVycm9ycGFnZSI7czozMjY6IlNvcnJ5LCBidXQgdGhlIHBhZ2UgeW91IGFyZSBsb29raW5nIGZvciBoYXMgbm90IGJlZW4gZm91bmQuPGJyLz5UcnkgY2hlY2tpbmcgdGhlIFVSTCBmb3IgZXJyb3JzLCB0aGVuIGhpdCByZWZyZXNoLjwvYnI+T3IgeW91IGNhbiBzaW1wbHkgY2xpY2sgdGhlIGljb24gYmVsb3cgYW5kIGdvIGhvbWU6KQ0KPGJyPjxicj4NCjxhIGhyZWYgPSBcImh0dHA6Ly90ZXJlc2EucHJlbWl1bWNvZGluZy5jb20vXCI+PGltZyBzcmMgPSBcImh0dHA6Ly9idWxsc3kucHJlbWl1bWNvZGluZy5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTMvMDgvaG9tZUhvdXNlSWNvbi5wbmdcIj48L2E+IjtzOjk6ImNvcHlyaWdodCI7czoyOTU6IjxkaXYgY2xhc3MgPVwibGVmdC1mb290ZXItY29udGVudFwiPsKpIDIwMTUgY29weXJpZ2h0IFBSRU1JVU1DT0RJTkcgLy8gQWxsIHJpZ2h0cyByZXNlcnZlZCAvLyA8YSBzdHlsZSA9XCJjb2xvcjojYmJiO1wiIGhyZWYgPSBcImh0dHA6Ly9icml4dG9uLnByZW1pdW1jb2RpbmcuY29tL3ByaXZhY3ktcG9saWN5XCI+UHJpdmFjeSBQb2xpY3k8L2E+PC9kaXY+DQoNCjxkaXYgY2xhc3MgPVwicmlnaHQtZm9vdGVyLWNvbnRlbnRcIj5Ccml4dG9uIHdhcyBtYWRlIHdpdGggbG92ZSBieSBQcmVtaXVtY29kaW5nPC9kaXY+DQoiO3M6ODoidXNlcm5hbWUiO3M6MDoiIjtzOjQ6ImNvZGUiO3M6MDoiIjtzOjEwOiJ1c2VfYmxvY2syIjtzOjA6IiI7czoxMzoidXNlX2Z1bGx3aWR0aCI7czowOiIiO3M6ODoibG9nb190b3AiO3M6MDoiIjtzOjk6InVzZV9ib3hlZCI7czowOiIiO30=';
		$pmc_data_in = unserialize(base64_decode($pmc_data)); //100% safe - ignore theme check nag
		update_option('of_options_pmc', $pmc_data_in);
		
			

		

		
	}
	
	
}
// Build Options
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
$root =  get_template_directory() .'/';
$admin =  get_template_directory() . '/admin/';
require_once ($admin . 'theme-options.php');   // Options panel settings and custom settings
require_once ($admin . 'admin-interface.php');  // Admin Interfaces
require_once ($admin . 'admin-functions.php');  // Theme actions based on options settings
$includes =  get_template_directory() . '/includes/';
$widget_includes =  get_template_directory() . '/includes/widgets/';
/* include custom widgets */
require_once ($widget_includes . 'recent_post_widget.php'); 
require_once ($widget_includes . 'popular_post_widget.php');
require_once ($widget_includes . 'social_widget.php');
/*theme update*/
load_template( trailingslashit( get_template_directory() ) . 'update/envato-wp-theme-updater.php' );
Envato_WP_Theme_Updater::init( $pmc_data['username'], $pmc_data['code'], 'gljivec' );
/* include scripts */
function pmc_scripts() {
	global $pmc_data;
	/*scripts*/
	wp_enqueue_script('pmc_fitvideos', get_template_directory_uri() . '/js/jquery.fitvids.js', array('jquery'),true,true);	
	wp_enqueue_script('pmc_scrollto', get_template_directory_uri() . '/js/jquery.scrollTo.js', array('jquery'),true,true);	
	wp_enqueue_script('pmc_retinaimages', get_template_directory_uri() . '/js/retina.min.js', array('jquery'),true,true);	
	wp_enqueue_script('pmc_customjs', get_template_directory_uri() . '/js/custom.js', array('jquery'),true,true);  	      
	wp_enqueue_script('pmc_prettyphoto_n', get_template_directory_uri() . '/js/jquery.prettyPhoto.js', array('jquery'),true,true);
	wp_enqueue_script('pmc_easing', get_template_directory_uri() . '/js/jquery.easing.1.3.js', array('jquery'),true,true);
	wp_enqueue_script('pmc_cycle', get_template_directory_uri() . '/js/jquery.cycle.all.min.js', array('jquery'),true,true);		
	wp_register_script('pmc_news', get_template_directory_uri() . '/js/jquery.li-scroller.1.0.js', array('jquery'),true,true);  
	wp_enqueue_script('pmc_gistfile', get_template_directory_uri() . '/js/gistfile_pmc.js', array('jquery') ,true,true);  
	wp_enqueue_script('pmc_bxSlider', get_template_directory_uri() . '/js/jquery.bxslider.js', array('jquery') ,true,true);  				
	/*style*/
	wp_enqueue_style( 'main', get_stylesheet_uri(), 'style');
	wp_enqueue_style( 'prettyp', get_template_directory_uri() . '/css/prettyPhoto.css', 'style');
	/*style*/
	wp_enqueue_style( 'main', get_stylesheet_uri(), 'style');
	
	
	if(isset($pmc_data['body_font'])){			
		if(($pmc_data['body_font']['face'] != 'verdana') and ($pmc_data['body_font']['face'] != 'trebuchet') and 
			($pmc_data['body_font']['face'] != 'georgia') and ($pmc_data['body_font']['face'] != 'Helvetica Neue') and 
			($pmc_data['body_font']['face'] != 'times,tahoma') and ($pmc_data['body_font']['face'] != 'arial')) {	
				if(isset($pmc_data['google_body_custom']) && $pmc_data['google_body_custom'] != ''){
					$font_explode = explode(' ' , $pmc_data['google_body_custom']);
					$font_body  = '';
					$size = count($font_explode);
					$count = 0;
					if(count($font_explode) > 0){
						foreach($font_explode as $font){
							if($count < $size-1){
								$font_body .= $font_explode[$count].'+';
							}
							else{
								$font_body .= $font_explode[$count];
							}
							$count++;
						}
					}else{
						$font_body = $pmc_data['google_body_custom'];
					}
				}else{
					$font_body = $pmc_data['body_font']['face'];
				}			
				wp_enqueue_style('googleFontbody', 'http://fonts.googleapis.com/css?family='.$font_body ,'',NULL);			
		}						
	}		
	if(isset($pmc_data['heading_font'])){			
		if(($pmc_data['heading_font']['face'] != 'verdana') and ($pmc_data['heading_font']['face'] != 'trebuchet') and 
			($pmc_data['heading_font']['face'] != 'georgia') and ($pmc_data['heading_font']['face'] != 'Helvetica Neue') and 
			($pmc_data['heading_font']['face'] != 'times,tahoma') and ($pmc_data['heading_font']['face'] != 'arial')) {	
				if(isset($pmc_data['google_heading_custom']) && $pmc_data['google_heading_custom'] != ''){
					$font_explode = explode(' ' , $pmc_data['google_heading_custom']);
					$font_heading  = '';
					$size = count($font_explode);
					$count = 0;
					if(count($font_explode) > 0){
						foreach($font_explode as $font){
							if($count < $size-1){
								$font_heading .= $font_explode[$count].'+';
							}
							else{
								$font_heading .= $font_explode[$count];
							}
							$count++;
						}
					}else{
						$font_heading = $pmc_data['google_heading_custom'];
					}
				}else{
					$font_heading = $pmc_data['heading_font']['face'];
				}
		
				wp_enqueue_style('googleFontHeading', 'http://fonts.googleapis.com/css?family='.$font_heading ,'',NULL);			
		}						
	}
	if(isset($pmc_data['menu_font']['face'])){			
		if(($pmc_data['menu_font']['face'] != 'verdana') and ($pmc_data['menu_font']['face'] != 'trebuchet') and 
			($pmc_data['menu_font']['face']!= 'georgia') and ($pmc_data['menu_font']['face'] != 'Helvetica Neue') and 
			($pmc_data['menu_font']['face'] != 'times,tahoma') and ($pmc_data['menu_font']['face'] != 'arial')) {	
				if(isset($pmc_data['google_menu_custom']) && $pmc_data['google_menu_custom'] != ''){
					$font_explode = explode(' ' , $pmc_data['google_menu_custom']);
					$font_menu  = '';
					$size = count($font_explode);
					$count = 0;
					if(count($font_explode) > 0){
						foreach($font_explode as $font){
							if($count < $size-1){
								$font_menu .= $font_explode[$count].'+';
							}
							else{
								$font_menu .= $font_explode[$count];
							}
							$count++;
						}
					}else{
						$font_menu = $pmc_data['google_menu_custom'];
					}
				}else{
					$font_menu = $pmc_data['menu_font']['face'];
				}				
				wp_enqueue_style('googleFontMenu', 'http://fonts.googleapis.com/css?family='.$font_menu ,'',NULL);			
		}						
	}	
	
	/* FONT FOR QUOTE */
	
	if(isset($pmc_data['google_quote_custom']) && $pmc_data['google_quote_custom'] != ''){
		$font_explode = explode(' ' , $pmc_data['google_quote_custom']);
		$font_quote  = '';
		$size = count($font_explode);
		$count = 0;
		if(count($font_explode) > 0){
			foreach($font_explode as $font){
				if($count < $size-1){
					$font_quote .= $font_explode[$count].'+';
							}
				else{
					$font_quote .= $font_explode[$count];
					}
				$count++;
			}
		}else{
			$font_quote = $pmc_data['google_quote_custom'];
		}
	}else{
		$font_quote = $pmc_data['google_quote_custom']['face'];
	}
	wp_enqueue_style('googleFontQuote', 'http://fonts.googleapis.com/css?family='.$font_quote ,'',NULL);		


	wp_enqueue_style('font-awesome_pms', get_template_directory_uri() . '/css/font-awesome.css' ,'',NULL);	
	
	wp_enqueue_style('options',  get_stylesheet_directory_uri() . '/css/options.css', 'style');				
}
add_action( 'wp_enqueue_scripts', 'pmc_scripts' );
 
/*shorcode to excerpt*/
remove_filter( 'get_the_excerpt', 'wp_trim_excerpt'  ); //Remove the filter we don't want
add_filter( 'get_the_excerpt', 'pmc_wp_trim_excerpt' ); //Add the modified filter
add_filter( 'the_excerpt', 'do_shortcode' ); //Make sure shortcodes get processed

function pmc_wp_trim_excerpt($text = '') {
	$raw_excerpt = $text;
	if ( '' == $text ) {
		$text = get_the_content('');
		//$text = strip_shortcodes( $text ); //Comment out the part we don't want
		$text = apply_filters('the_content', $text);
		$text = str_replace(']]>', ']]&gt;', $text);
		$excerpt_length = apply_filters('excerpt_length', 55);
		$excerpt_more = apply_filters('excerpt_more', ' ' . '[...]');
		$text = wp_trim_words( $text, $excerpt_length, $excerpt_more );
	}
	return apply_filters('wp_trim_excerpt', $text, $raw_excerpt);
}

/*add boxed to body class*/

add_filter('body_class','pmc_body_class');

function pmc_body_class($classes) {
	global $pmc_data;
	$class = '';
	if(isset($pmc_data['use_boxed'])){
		$classes[] = 'pmc_boxed';
	}
	return $classes;
}

/* custom breadcrumb */
function pmc_breadcrumb($title = false) {
	global $pmc_data;
	$breadcrumb = '';
	if (!is_home()) {
		if($title == false){
			$breadcrumb .= '<a href="';
			$breadcrumb .=  home_url();
			$breadcrumb .=  '">';
			$breadcrumb .= __('Home', 'pmc-themes');
			$breadcrumb .=  "</a> &#187; ";
		}
		if (is_single()) {
			if (is_single()) {
				$name = '';
				if(!get_query_var($pmc_data['port_slug']) && !get_query_var('product')){
					$category = get_the_category(); +
					$category_id = get_cat_ID($category[0]->cat_name);
					$category_link = get_category_link($category_id);					
					$name = '<a href="'. esc_url( $category_link ).'">'.$category[0]->cat_name .'</a>';
				}
				else{
					$taxonomy = 'portfoliocategory';
					$entrycategory = get_the_term_list( get_the_ID(), $taxonomy, '', ',', '' );
					$catstring = $entrycategory;
					$catidlist = explode(",", $catstring);	
					$name = $catidlist[0];
				}
				if($title == false){
					$breadcrumb .= $name .' &#187; <span>'. get_the_title().'</span>';
				}
				else{
					$breadcrumb .= get_the_title();
				}
			}	
		} elseif (is_page()) {
			$breadcrumb .=  '<span>'.get_the_title().'</span>';
		}
		elseif(get_query_var('portfoliocategory')){
			$term = get_term_by('slug', get_query_var('portfoliocategory'), 'portfoliocategory'); $name = $term->name; 
			$breadcrumb .=  '<span>'.$name.'</span>';
		}	
		else if(is_tag()){
			$tag = get_query_var('tag');
			$tag = str_replace('-',' ',$tag);
			$breadcrumb .=  '<span>'.$tag.'</span>';
		}
		else if(is_search()){
			$breadcrumb .= __('Search results for ', 'pmc-themes') .'"<span>'.get_search_query().'</span>"';			
		} 
		else if(is_category()){
			$cat = get_query_var('cat');
			$cat = get_category($cat);
			$breadcrumb .=  '<span>'.$cat->name.'</span>';
		}
		else if(is_archive()){
			$breadcrumb .=  '<span>'.__('Archive','pmc-themes').'</span>';
		}	
		else{
			$breadcrumb .=  'Home';
		}

	}
	return $breadcrumb ;
}
/* social share links */
function pmc_socialLinkSingle($link,$title) {
	$social = '';
	$social  .= '<div class="addthis_toolbox">';
	$social .= '<div class="custom_images">';
	$social .= '<a class="addthis_button_facebook" addthis:url="'.esc_url($link).'" addthis:title="'.esc_attr($title).'" ><img src = "'.get_template_directory_uri().'/images/brixton-facebook-about.png" alt="Facebook"></a>';
	$social .= '<a class="addthis_button_twitter" addthis:url="'.esc_url($link).'" addthis:title="'.esc_attr($title).'"><img src = "'.get_template_directory_uri().'/images/brixton-twitter-about.png" alt="Twitter"></a>';  
	$social .= '<a class="addthis_button_pinterest_share" addthis:url="'.esc_url($link).'" addthis:title="'.esc_attr($title).'"><img src = "'.get_template_directory_uri().'/images/brixton-pinterest-about.png" alt="Pinterest"></a>'; 
	$social .= '<a class="addthis_button_google_plusone_share" addthis:url="'.esc_url($link).'" g:plusone:count="false" addthis:title="'.esc_attr($title).'"><img src = "'.get_template_directory_uri().'/images/brixton-google-about.png" alt="Google +"></a>'; 	
	$social .= '<a class="addthis_button_stumbleupon" addthis:url="'.esc_url($link).'" addthis:title="'.esc_attr($title).'"><img src = "'.get_template_directory_uri().'/images/brixton-stumbleupon-about.png" alt="Stumbleupon"></a>';
	$social .='</div><script type="text/javascript" src="http://s7.addthis.com/js/300/addthis_widget.js"></script>';	
	$social .= '</div>'; 
	echo $social;
	
	
}
/* links to social profile */
function pmc_socialLink() {
	$social = '';
	global $pmc_data; 
	$icons = $pmc_data['socialicons'];
	foreach ($icons as $icon){
		$social .= '<a target="_blank"  href="'.esc_url($icon['link']).'" title="'.esc_attr($icon['title']).'"><i class="fa '.esc_attr($icon['url']).'"></i></a>';	
	}
	echo $social;
}

add_filter('the_content', 'pmc_addlightbox');
/* add lightbox to images*/
function pmc_addlightbox($content)
{	global $post;
	$pattern = "/<a(.*?)href=('|\")(.*?).(bmp|gif|jpeg|jpg|png)('|\")(.*?)>/i";
  	$replacement = '<a$1href=$2$3.$4$5 rel="lightbox[%LIGHTID%]"$6>';
    $content = preg_replace($pattern, $replacement, $content);
	if(isset($post->ID))
		$content = str_replace("%LIGHTID%", $post->ID, $content);
    return $content;
}
/* remove double // char */
function pmc_stripText($string) 
{ 
    return str_replace("\\",'',$string);
} 
	
/* custom post types */	
add_action('save_post', 'pmc_update_post_type');
add_action("admin_init", "pmc_add_meta_box");
add_action("admin_init", "pmc_add_meta_box_sidebar");

function pmc_add_meta_box_sidebar(){
	add_meta_box("pmc_post_sidebar", "Image options", "pmc_post_sidebar", "post", "side", "high");		
}	

function pmc_post_sidebar(){
	global $post;
	$pmc_data = get_post_custom(get_the_id());
	
	
	if (isset($pmc_data["pmc_featured_category"][0])){
		$pmc_featured_category = $pmc_data["pmc_featured_category"][0];
	}else{
		$pmc_featured_category = 1;
		$pmc_data["pmc_featured_category"][0] = 1;
	}	
	if (isset($pmc_data["pmc_featured_post"][0])){
		$pmc_featured_post = $pmc_data["pmc_featured_post"][0];
	}else{
		$pmc_featured_post = 1;
		$pmc_data["pmc_featured_post"][0] = 1;
	}		
?>
    <div id="pmc-sidebar">
        <table cellpadding="15" cellspacing="15">
            <tr>
                <td><input type="checkbox" name="pmc_featured_category" value="1" <?php if( isset($pmc_featured_category)){ checked( '1', $pmc_data["pmc_featured_category"][0] ); } ?> /><td><label>Show featured Image in category:</label></td></td>	
            </tr>
            <tr>
                <td><input type="checkbox" name="pmc_featured_post" value="1" <?php if( isset($pmc_featured_post)){ checked( '1', $pmc_data["pmc_featured_post"][0] ); } ?> /><td><label>Show featured Image in post view:</label></td></td>	
            </tr>			
        </table>
    </div>
      
<?php
	
}

function pmc_add_meta_box(){
	add_meta_box("pmc_post_type", "Post type", "pmc_post_type", "post", "normal", "high");		
}	

function pmc_post_type(){
	global $post;
	$pmc_data = get_post_custom(get_the_id());

	if (isset($pmc_data["video_post_url"][0])){
		$video_post_url = $pmc_data["video_post_url"][0];
	}else{
		$video_post_url = "";
	}	
	
	if (isset($pmc_data["link_post_url"][0])){
		$link_post_url = $pmc_data["link_post_url"][0];
	}else{
		$link_post_url = "";
	}	
	
	if (isset($pmc_data["audio_post_url"][0])){
		$audio_post_url = $pmc_data["audio_post_url"][0];
	}else{
		$audio_post_url = "";
	}	
	if (isset($pmc_data["audio_post_title"][0])){
		$audio_post_title = $pmc_data["audio_post_title"][0];
	}else{
		$audio_post_title = "";
	}	
?>
    <div id="portfolio-category-options">
        <table cellpadding="15" cellspacing="15">
            <tr class="videoonly" style="border-bottom:1px solid #000;">
            	<td><label>Video URL(*required) - add if you select video post: <i style="color: #999999;"></i></label><br><input name="video_post_url" value="<?php echo esc_attr($video_post_url); ?>" /> </td>	
			</tr>		
            <tr class="linkonly" >
            	<td><label>Link URL - add if you select link post : <i style="color: #999999;"></i></label><br><input name="link_post_url"  value="<?php echo esc_attr($link_post_url); ?>" /></td>
            </tr>				
            <tr class="audioonly">
            	<td><label>Audio URL - add if you select audio post: <i style="color: #999999;"></i></label><br><input name="audio_post_url"  value="<?php echo esc_attr($audio_post_url); ?>" /></td>
            </tr>
            <tr class="audioonly">
            	<td><label>Audio title - add if you select audio post: <i style="color: #999999;"></i></label><br><input name="audio_post_title"  value="<?php echo esc_attr($audio_post_title); ?>" /></td>
            </tr>		
            <tr class="nooptions">
            	<td>No options for this post type.</td>
            </tr>				
        </table>
    </div>
	<style>
	#portfolio-category-options td {width:50%}
	#portfolio-category-options input {width:100%}
	</style>
	<script>
	jQuery(document).ready(function(){	
			if (jQuery("input[name=post_format]:checked").val() == 'video'){
				jQuery('.videoonly').show();
				jQuery('.audioonly, .linkonly , .nooptions').hide();}
				
			else if (jQuery("input[name=post_format]:checked").val() == 'link'){
				jQuery('.linkonly').show();
				jQuery('.videoonly, .select_video,.nooptions').hide();	}	
				
			else if (jQuery("input[name=post_format]:checked").val() == 'audio'){
				jQuery('.videoonly, .linkonly,.nooptions').hide();	
				jQuery('.audioonly').show();}						
			else{
				jQuery('.videoonly').hide();
				jQuery('.audioonly').hide();
				jQuery('.linkonly').hide();
				jQuery('.nooptions').show();}	
			
			jQuery("input[name=post_format]").change(function(){
			if (jQuery("input[name=post_format]:checked").val() == 'video'){
				jQuery('.videoonly').show();
				jQuery('.audioonly, .linkonly,.nooptions').hide();}
				
			else if (jQuery("input[name=post_format]:checked").val() == 'link'){
				jQuery('.linkonly').show();
				jQuery('.videoonly, .audioonly,.nooptions').hide();	}	
				
			else if (jQuery("input[name=post_format]:checked").val() == 'audio'){
				jQuery('.videoonly, .linkonly,.nooptions').hide();	
				jQuery('.audioonly').show();}	
				
			else{
				jQuery('.videoonly').hide();
				jQuery('.audioonly').hide();
				jQuery('.linkonly').hide();
				jQuery('.nooptions').show();}				
		});
	});
	</script>	
      
<?php
	
}
function pmc_update_post_type(){
	global $post;
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return $post_id;
    }
	if($post){

		if( isset($_POST["video_post_url"]) ) {
			update_post_meta($post->ID, "video_post_url", $_POST["video_post_url"]);
		}		
		if( isset($_POST["link_post_url"]) ) {
			update_post_meta($post->ID, "link_post_url", $_POST["link_post_url"]);
		}	
		if( isset($_POST["audio_post_url"]) ) {
			update_post_meta($post->ID, "audio_post_url", $_POST["audio_post_url"]);
		}		
		if( isset($_POST["audio_post_title"]) ) {
			update_post_meta($post->ID, "audio_post_title", $_POST["audio_post_title"]);
		}	
		if( isset($_POST["pmc_featured_category"]) ) {
			update_post_meta($post->ID, "pmc_featured_category", $_POST["pmc_featured_category"]);
		}else{
			update_post_meta($post->ID, "pmc_featured_category", 0);
		}		
		if( isset($_POST["pmc_featured_post"]) ) {
			update_post_meta($post->ID, "pmc_featured_post", $_POST["pmc_featured_post"]);
		}else{
			update_post_meta($post->ID, "pmc_featured_post", 0);
		}				
	}
	
	
	
}
if( !function_exists( 'Brixton_fallback_menu' ) )
{

	function Brixton_fallback_menu()
	{
		$current = "";
		if (is_front_page()){$current = "class='current-menu-item'";} 
		echo "<div class='fallback_menu'>";
		echo "<ul class='Brixton_fallback menu'>";
		echo "<li $current><a href='".esc_url(home_url())."'>Home</a></li>";
		wp_list_pages('title_li=&sort_column=menu_order');
		echo "</ul></div>";
	}
}

add_filter( 'the_category', 'pmc_add_nofollow_cat' );  

function pmc_add_nofollow_cat( $text ) { 
	$text = str_replace('rel="category tag"', "", $text); 
	return $text; 
}

/* get image from post */
function pmc_getImage($id, $image){
	$return = '';
	if ( has_post_thumbnail() ){
		$return = get_the_post_thumbnail($id,$image);
		}
	else
		$return = '';
	
	return 	$return;
}

if ( ! isset( $content_width ) ) $content_width = 800;


function pmc_add_this_script_footer(){ 
	global $pmc_data;


?>
<script>	
	jQuery(document).ready(function(){	
		jQuery('.searchform #s').attr('value','<?php _e('Search','pmc-themes'); ?>');
		
		jQuery('.searchform #s').focus(function() {
			jQuery('.searchform #s').val('');
		});
		
		jQuery('.searchform #s').focusout(function() {
			if(jQuery('.searchform #s').attr('value') == '')
				jQuery('.searchform #s').attr('value','<?php _e('Search','pmc-themes'); ?>');
		});	
		jQuery("a[rel^='lightbox']").prettyPhoto({theme:'light_rounded',show_title: true, deeplinking:false,callback:function(){scroll_menu()}});		
	});	</script>

<?php  }


add_action('wp_footer', 'pmc_add_this_script_footer'); 

function pmc_security($string){
	$value = esc_html($string);
	$value_out = html_entity_decode($value);
	echo stripslashes($value_out); 

}

?>