$(document).ready(function(){

	var movie = movies[0]

	var movieHtml = Template('movie-tmpl', movie);

  $('#movie').html(movieHtml);

  return;

	var i = 0,
			iterations = 1000;;

	var t1 = new Date();
	for(i; i < iterations; i++){
		Template('movie-tmpl', movie);
	}
	t2 = new Date();

	$('#time_bm').html("Benchmake: Iterations: " + iterations + ' , Time taken: ' + (t2 - t1) + 'ms');
});
