<?php get_header(); ?>
		<!-- Custom post type loop -->
		<?php 
			$args = array(
				'post_type' => 'post-type',
				'posts_per_page' => '1'
				);
			$query = new WP_Query( $args );
		?>
		<?php while( $query->have_posts() ) : $query->the_post(); ?>
			<?php the_title(); ?>
			<?php the_category(' '); ?>
			<?php the_excerpt(); ?>
			<?php the_permalink(); ?>
		<?php endwhile; ?>
		<?php wp_reset_query(); ?>
		
<?php get_footer(); ?>