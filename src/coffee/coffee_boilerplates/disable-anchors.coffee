'use strict'
$(document).ready ->
	# DISABLE ANCHORS
	$('.disable-anchors a').click (e)->
		e.preventDefault()
		return

	return # END ON READY