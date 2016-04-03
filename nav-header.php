<header class="header hidden-md-down">
	<div class="container">
		<div class="row">
			<div class="header-left col-sm-6">
				<div class="logo">
					<a href="<?php home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/app/assets/img/logo_.png" alt="Logo"></a>
				</div>
			</div>
			<div class="header-right col-sm-6">
				<?php 
					// Insert menus - check options at codex
				  $defaults = array(
				    'container' => false,
				    'theme_location' => 'main-menu',
				    'menu_class' => 'nav-main'
				    );
				  wp_nav_menu ($defaults);
				?>
			</div>
		</div>
	</div>
</header>