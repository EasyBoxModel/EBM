			<footer class="footer">
				<div class="container">
					<div class="row text-white">
						<div class="col-sm-6">
							<div class="logo">
								<a href="<?php home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/app/assets/img/logo_.png" alt="Logo"></a>
							</div>
						</div>
						<div class="col-sm-6">
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
			</footer>
		</div>
		<?php wp_footer(); ?>
	</body>
</html>