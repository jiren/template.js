$(document).ready(function(){
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

});
