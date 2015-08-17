'use strict'
$(document).ready ->

	# SCROLL TO AUTOMATIC ANCHORS
	sectionScrollAnchor = $('.section-scroll-anchor-block')
	sectionScrollAnchors = []
	$.each(sectionScrollAnchor, (index, item)->
		sectionScrollAnchors.push(item)
		return
		)
	console.log sectionScrollAnchors
	window['anchorScrollIndex']
	$.each(sectionScrollAnchors, (index, item)->
		window['anchorScrollIndex'] = 'section-scroll-anchor-block-' + index
		$(item).attr('id', anchorScrollIndex)
		scrollDownAnchor = '<div class="scroll-down-anchor">' + 
											'<a class="icon-chevron-down"' +
											'href="#section-scroll-anchor-block-' + (index + 1) + '"' +
											'rel="nofollow"></a></div>'
		$(item).append scrollDownAnchor
		return
		)
	console.log window['anchorScrollIndex']
	$('.section-scroll-anchor-block-last .scroll-down-anchor').remove()


	return