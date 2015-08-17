'use strict'
$(document).ready ->

	# HREFerence for anchor blocks 
	$('[data-href]').click((e)->
		locationArr = window.location.pathname.split('/')
		lastPath = locationArr[locationArr.length - 1]
		mainPath = locationArr[locationArr.length - 2]
		pathObj = {}
		pathObj[mainPath] = lastPath
		window.history.pushState(pathObj, '', lastPath)
		document.location.replace($(this).data('href'))
		return
		)

	return # END ON READY