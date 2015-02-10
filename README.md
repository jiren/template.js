
template.js
-----------

mini html templating js lib.

Usage
----

Syntax is same as erb

```
<script id="detail-tmpl" type="text/x-template">
  <div class="detail">
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
  </div>
</script>

var moive = { 
  name: 'The Shawshank Redemption',
  director: 'Frank Darabont', 
  stars: 'Tim Robbins,Morgan Freeman,Bob Gunton',
  year: 1994
};


# `movie-tmpl` is id of template element
var movieHtml = Template('movie-tmpl', movie);

# i.e append to moive container
$('#movie').html(movieHtml); 	

```

Using Partials
-------

```
<script id="address-tmpl" type="text/x-template">
  <h2> Address1 : <%= address1 %></h1>
  <h2> City : <%= city %> </h2>
  <h2> State : <%= state %> </h2>
</script>

<script id="user-tmpl" type="text/x-template">
  <h1> Name <%= name %> </h1>
  <h2> email <%=  email %> </h2>
  <h3> Billing Address <h3>
  <%= render('address-tmpl', obj.billing_address) %>
  <h3> Shipping Address <h3>
  <%= render('address-tmpl', obj.shipping_address) %>
</script>

var user = {
  name: 'Candace',
  email: 'jada@jakubowski.biz',
  billing_address: {
    address1: '43140 Feest Corners',
    city: 'Port Nicholaston',
    state: 'Florida'
  },
  shipping_address: {
    address1: '2828 Gilbert Point',
    city: 'New Juston',
    state: 'West Virginia'
  }
}

var html = Template('user-tmpl', user);
$('#user').append(html);

```

- partial rendering using `render` function. It takes 3 arguments, two arguments html template id and object are must.
- default object name is `obj` in template. So in template passed object can be access using `obj`
  i.e `<%= render('address-tmpl', obj.billing_address) %>` in this `obj` is `user` object

- render array of objects, pass third argument `as: collection`.
  `<%= render('detail-tmpl', [{director: 2000, stars: 3, year: 2015}, {director: 2006, stars: 6, year: 2016}], {as: 'collection'}) %>`
