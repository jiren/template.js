
template.js
-----------

mini html templating js lib.

Usage
----

Syntax is same as erb

```
var htmlTemplate = 
  '<div class="detail">
    <dl>
      <dt>Name</dt>
      <dd><%= name %></dd>
      <dt>Director</dt>
      <dd><%= director %></dd>
      <dt>Actors</dt>
      <dd><%= stars %></dt>
      <dt>Year</dt>
      <dd><%= year %></dd>
    </dl>
   </div>';


var moive = { 
  name: 'The Shawshank Redemption',
  director: 'Frank Darabont', 
  stars: 'Tim Robbins,Morgan Freeman,Bob Gunton',
  year: 1994
};


var movieHtml = Template(htmlTemplate, movie);

# i.e append to moive container
$('#movie').html(movieHtml); 	

```
