$(document).ready(function() {

  var $list = $('#list');

  // Load Contacts
  $.ajax({
    url: '/contacts',
    methods: 'GET',
    success: function (data) {
      data.forEach(function (d) {
        var $tr = $('<tr>');

        $('<td>').addClass('name').text(d.name).appendTo($tr);
        $('<td>').addClass('email').text(d.email).appendTo($tr);
        $('<td>').addClass('phone').text(d.phones[0].number).appendTo($tr);

        var editTag = $('<a>').text('Edit')
                              .addClass('btn-edit btn btn-primary btn-xs');
        var deleteTag = $('<a>').text('Delete')
                                .addClass('btn-delete btn btn-danger btn-xs')
                                .attr('data-remote', 'true')
                                .attr('data-method', 'delete')
                                .attr('href', '/contacts/' + d.id);
        $('<td>').append(editTag).append(' ').append(deleteTag).appendTo($tr);

        $tr.attr('id', d.id);
        $tr.attr('data-hash', JSON.stringify(d));
        $tr.appendTo($list);
      });
    }
  });

  // Click Edit Button
  $('#list').on('click','.btn-edit',function(e){
    var contact = JSON.parse($(this).parent().parent().attr('data-hash'));
    $('#modal-id').val(contact.id);
    $('#modal-name').val(contact.name);
    $('#modal-email').val(contact.email);
    $('#modal').modal('show');
  });

  // Click Save Button in Modal
  $('#modal-save').on('click',function(e){
    var contactId = $('#modal-id').val();
    var data = {
      name: $('#modal-name').val(),
      email: $('#modal-email').val()
    };

    $.ajax({
      url: '/contacts/' + contactId,
      method: 'PUT',
      dataType: 'json',
      data: data,
      success: function(data) {
        $('#' + data.id + ' .name' ).text(data.name);
        $('#' + data.id + ' .email' ).text(data.email);
        $('#modal').modal('hide');
      }
    });

    return false;
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
                          '</td><td><a class="btn-edit btn btn-primary btn-xs">Edit</a> ' +
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
