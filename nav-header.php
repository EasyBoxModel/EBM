<?php 
	// Insert menus - check options at codex
  $defaults = array(
    'container' => false,
    'theme_location' => 'main-menu',
    'menu_class' => 'nav-main'
    );
  wp_nav_menu ($defaults);
?>