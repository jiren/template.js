$(document).ready(function(){

	var htmlTemplate = $('#movie-template').html();
	var movie = movies[0]

	var movieHtml = Template(htmlTemplate, movie);

	$('#movie').html(movieHtml);

	var i = 0,
			iterations = 1;

	var t1 = new Date();
	for(i; i < iterations; i++){
		Template(htmlTemplate, movie);
	}
	t2 = new Date();

	$('#time_bm').html("Benchmake: Iterations: " + iterations + ' , Time taken: ' + (t2 - t1) + 'ms');
});
