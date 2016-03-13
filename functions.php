<?php 

	add_theme_support('menus');
	add_theme_support('post-thumbnails');
	function register_theme_menus(){
		register_nav_menus(
			array( 
				'main-menu' => __('Main Menu'),
				'post-categories' => __('Post categories')
			)
		);
	}
	add_action('init', 'register_theme_menus');

	function wordpress_theme_styles(){
		// wp_enqueue_style( 'style', get_template_directory_uri() . '/app/assets/css/style.pkgd.min.css', false, '1.0');
		wp_enqueue_style( 'style', get_template_directory_uri() . '/app/assets/css/style.css', false, '1.0');
		wp_enqueue_style( 'ebm', get_template_directory_uri() . '/app/assets/css/ebm.css', false, '1.0');
	}
	add_action('wp_enqueue_scripts', 'wordpress_theme_styles');

	function wordpress_theme_js(){
		wp_enqueue_script('jquery_js', get_template_directory_uri() . '/app/assets/js/jquery.min.js', '', '', true);
		wp_enqueue_script('scripts_js', get_template_directory_uri() . '/app/assets/js/scripts.min.js', array('jquery'), '', true);
	}
	add_action('wp_enqueue_scripts', 'wordpress_theme_js');

?>