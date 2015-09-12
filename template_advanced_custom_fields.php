<?php get_header(); ?>
	<?php 
		$args = array(
			'post_type' => 'section'
			);
		$query = new WP_Query( $args );
	?>
	<?php 
		while( $query->have_posts() ) : $query->the_post(); 
    $img_url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
	?>
		<section 
			id="<?php echo $post->post_name; ?>"
      <?php if ( has_post_thumbnail() ) : ?>
			style="background-image: url(<?php echo $img_url; ?>)"
      <?php endif; ?>
		>
			<?php if ( get_field('section_title') ) : ?>
				<?php the_field('section_title'); ?>
				<?php if ( have_rows('section_gallery') ) : ?>
					<?php while ( have_rows('section_gallery') ) : the_row(); 
						$image = get_sub_field('section_pic');
					?>
						<div style="background-image: url(<?php echo $image['sizes']['medium']; ?>)">
						<?php echo the_sub_field('section_sub_field'); ?>
					<?php endwhile; ?>
				<?php endif; ?>
			<?php endif; ?>
	<?php endwhile; ?>
	<?php wp_reset_query(); ?>

<?php get_footer(); ?>