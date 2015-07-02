'use strict'
$(document).ready ->

	# HEADER DISPLAY
	headerDisplayController = new ScrollMagic.Controller()

	headerScrollScene = new ScrollMagic.Scene({
		triggerHook: 'onLeave'
		triggerElement: '.site-content'
		duration: $('.site-content').height()
		offset: -70
		})
		.setClassToggle('.site-wrapper', 'header-fixed')
		.addTo(headerDisplayController)
	# headerScrollScene.addIndicators({zindex: 1000, suffix: 1})

	return