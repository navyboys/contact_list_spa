$(document).ready(function() {

  // Load Contacts
  $.ajax({
    url: '/contacts',
    methods: 'GET',
    success: function (data) {
      data.forEach(function (d) {
        $('#list').append('<tr><td>' + d.name +
                          '</td><td>' + d.email +
                          '</td><td>' + d.phones[0].number +
                          '</td><td><a class="btn btn-primary btn-xs" href="/contacts">Edit</a> ' +
                          '<a class="btn-delete btn btn-danger btn-xs" data-remote="true" data-method="delete" href="/contacts/' + d.id + '">Delete</a></td><tr>'
                         );
      });
    }
  });

  // Create Contact
  $('#new-submit').click(function (event) {
    // event.preventDefault();
    var data = {
      name: $('#name').val(),
      email: $('#email').val()
      // phones: {
      //   label: $('#label').val(),
      //   number: $('#number').val()
      // }
    };
    // data.name = $('#name').val();
    // data.email = $('#email').val();
    // data.phones.label = $('#label').val();
    // data.phones.number = $('#number').val();

    $.ajax({
      url: '/contacts',
      method: 'POST',
      dataType: 'json',
      data: data,
      success: function(data) {
        console.log(data);
        $('#list').append('<tr><td>' + data.name +
                          '</td><td>' + data.email +
                          '</td><td>' +
                          // '</td><td>' + data.phones[0].number +
                          '</td><td><a class="btn btn-primary btn-xs" href="/contacts">Edit</a> ' +
                          '<a class="btn-delete btn btn-danger btn-xs" data-remote="true" data-method="delete" href="/contacts/' + data.id + '">Delete</a></td><tr>'
                         );
      }
    });
    // Prevent the form from being submitted.
    return false;
  });

  // Delete Contact
  $('#list').on('click','.btn-delete',function(e){
    $(this).parent().parent().remove();
  });

});
