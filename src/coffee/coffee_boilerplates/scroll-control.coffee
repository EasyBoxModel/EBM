'use strict'
$(document).ready ->
	scrollToController = new ScrollMagic.Controller()

	# SCROLL TO
	scrollToController.scrollTo((newpos)->
		TweenMax.to(window, 0.5, {scrollTo: {y: newpos}})
		return
		)
	$(document).on('click', 'a[href^=#]', (e)->
		$('a[href^=#]').parent().removeClass('current-menu-item')
		id = $(this).attr('href')
		current = 'a[href^=' + id + ']';
		$(current).parent().addClass('current-menu-item')
		if $(id).length > 0 && !id.match(/nav/g) && !id.match(/carousel/g)
			e.preventDefault()
			scrollToController.scrollTo(id)
		return
		)

	return