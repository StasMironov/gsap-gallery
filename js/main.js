(function($) {

    // Variables
    var $projects = $('.projects'), // projects container
    	$project = $('.project'), // individual projects
    	$projectImageBefore = CSSRulePlugin.getRule(".project-image:before"), //decoration
    	$projectImageAfter = CSSRulePlugin.getRule(".project-image:after"), //decoration
    	tlProjects, tlProject, tlProjectLoader;

    // Main projects timeline
    tlProjects = new TimelineMax();
    tlProjects
    	.set($projects, {autoAlpha: 1});

    tlProject = new TimelineMax({repeat: -1, repeatDelay: 2});

    $project.each(function(index, element){

	    var projectClasses = $(this).attr('class').split(' '),
	        projectClass = projectClasses[1],
	        $pixel = $(this).find('.pixel'),
	        $pixels = $(this).find('.project-pixels'),
	        $projectTitle = $(this).find('.project-title'),
	        $projectSubtitle = $(this).find('.project-subtitle'),
	        $projectImage = $(this).find('.project-image');

	    // Project CTA
	    var tlProjectsCTA = new TimelineMax(),
	    	$projectLink = $(this).find('.button-container'),
	    	$projectLinkButton = $(this).find('.button'),
	    	$projectLinkSpan = $(this).find('.bp'),
	    	$projectLinkText = $(this).find('.bp-text');

	    tlProjectsCTA
	    	.to($projectSubtitle, 0.3, {autoAlpha: 0, yPercent: 100, ease:Back.easeOut})
	    	.staggerFrom($projectLinkSpan, 0.3, {autoAlpha: 0, yPercent: -100, ease:Back.easeOut}, 0.1)
	    	.from($projectLinkText,  0.3, {autoAlpha: 0, x: '-100%', ease:Power4.easeInOut}, '-=0.2');

	    // Project Loader
	    tlProjectLoader = new TimelineMax({paused: true}),
	    	$loader = $(this).find('.loader');

	    tlProjectLoader
	    	.to([$projectImageBefore, $projectImageAfter], 0.4, {cssRule:{opacity: '0'}})
	    	.fromTo($loader, 5, {strokeDasharray: 547, strokeDashoffset: 547}, {strokeDasharray: 547, strokeDashoffset: 0, ease: Power0.easeNone})
	    	.to($loader, 0.4, {autoAlpha: 0, onComplete: resumeProjects})
	    	.to([$projectImageBefore, $projectImageAfter], 0.4, {cssRule:{opacity: '1'}}, '-=0.4');

	    // Create a project timeline
	    tlProject
	    	.set($(this), {zIndex: 1})
	    	.set([$projectTitle, $projectSubtitle, $pixel], {autoAlpha: 0})
	    	.fromTo($projectImage, 0.4, {autoAlpha: 0, xPercent: '-200'}, {autoAlpha: 1, xPercent: '-10', ease:Power4.easeInOut, onStart: updateClass, onStartParams: [projectClass]})
	    	.add('imageIn')
	    	.staggerFromTo($pixel, 0.3, {autoAlpha: 0, x: '-=10'}, {autoAlpha: 1, x: '0', ease:Power4.easeInOut}, 0.02, '-=0.2')
	    	.add('pixelsIn')
	    	.fromTo($projectTitle, 0.7, {autoAlpha: 0, xPercent: '-50'}, {autoAlpha: 1, xPercent: '-5', ease:Power4.easeInOut}, '-=0.4')
	    	.fromTo($projectSubtitle, 0.7, {autoAlpha: 0, xPercent: '-50'}, {autoAlpha: 1, xPercent: '-2', ease:Power4.easeInOut}, '-=0.5')
	    	.add('titleIn')
	    	.add(tlProjectsCTA, '+=2') // add button animation to the project timeline
	    	.to($projectTitle, 4.3, {xPercent: '+=5', ease:Linear.easeNone}, 'titleIn-=0.1')
	    	.to($projectSubtitle, 4.3, {xPercent: '+=2', ease:Linear.easeNone}, 'titleIn-=0.2')
	    	.add('titleOut')
	    	.to($projectImage, 5, {xPercent: '0', ease:Linear.easeNone, onComplete: pauseProjects, onCompleteParams: [projectClass, tlProjectLoader]}, 'imageIn')
	    	.add('imageOut')
	    	.to($pixels, 4.1, {x: '-5', ease:Linear.easeNone}, 'pixelsIn')
	    	.to([$projectTitle, $projectSubtitle, $projectLink], 0.5, {autoAlpha: 0, xPercent: '+=10', ease:Power4.easeInOut}, 'titleOut')
	    	.to($projectImage, 0.4, {autoAlpha: 0, xPercent: '+=80', ease:Power4.easeInOut}, 'imageOut');

	    // Add project to the projects timeline
	    tlProjects.add(tlProject);

    });

	// create a function to update the body class
	function updateClass(projectClass){
		$('body').attr('class', projectClass);
	}

	// pausing the project timeline
	function pauseProjects(projectClass, tlProjectLoader){

		tlProjects.pause();

		if(projectClass != 'project00'){

			tlProjectLoader.seek(0);
			tlProjectLoader.play();

		}

	}

	// resume the project timeline
	$('.project00 .button').on('click', function(e){
		if(e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}		

		tlProjects.resume();

	});

	// resume projects
	function resumeProjects(){

		tlProjects.resume();

	}

})(jQuery);










