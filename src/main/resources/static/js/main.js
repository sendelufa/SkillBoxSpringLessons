$(function(){
    const appendTodo = function(data){
        var todoItem = '<a href="#" class="todo-link" data-id="' + data.id + '"><h3 class="todo-title">' +
        data.title + '</h3></a><button class="btn btn-primary btn-sm todo-edit" data-id="' + data.id +
        '"><span class="glyphicon glyphicon-edit"></span> Редактировать</button>' +
        ' <button class="btn btn-danger btn-sm todo-delete" data-id="' + data.id +
        '" data-bb-example-key="alert-default">'+
        '<span class="glyphicon glyphicon-remove"></span> Удалить</button> ';
        $('.list-group').append('<li class="list-group-item" id="todo-'+ data.id + '">' + todoItem + '</li>');
        console.log(todoItem);
    };

    //Loading todos
    $.get('/todos/', function(response){
        for (i in response){
            appendTodo(response[i]);
        }
    });

    //confirmation of delete
    $(document).on('click', '.todo-delete', function(){
        var title = $(this).parent().find('.todo-title').html();
        var id = $(this).data('id');

        console.log(title);
        var locales = Object.keys(bootbox.locales());
        bootbox.confirm({
            size: "small",
            message: "Точно удалить дело: " + title + "?",
            buttons: {
                confirm: {
                    label: 'Удалить',
                    className: 'btn-danger'
                },
                cancel: {
                    label: 'Отмена',
                    className: 'btn-success'
                }
            },
            callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/
                if (result){
                    deleteTodo(id);}
                }
            })
        return false;
    });



    //delete
    deleteTodo = function(todoId){
        $.ajax({
            type: 'DELETE',
            url: '/todos/' + todoId,
            success: function(response){
             $('#todo-' + todoId).remove();
         },
         error: function(response){
            if (response.status == 404) {
                alert('дело не найдено!');
            }
        }
    });
    }



    getTodo = function(link){
        var todoId = link.data('id');
        var link = link;
        $.ajax({
            method: 'GET',
            url: '/todos/' + todoId,
            success: function(response){
             var code ='<p class="description"><strong>Описание:</strong><br>' + response.description + '</p>';
             link.parent().find('.description').remove();
             link.parent().append(code);
         },
         error: function(response){
            if (response.status == 404) {
                alert('дело не найдено!');
            }
        }
    });
        return false;
    }
//edit todo





$(document).on('click', '.todo-edit', function(){
    getTodoItem(repaintItemToEditForm, $(this));
    return false;
});

$(document).on('click', '.edit-todo-submit', function(){
    editTodo(repaintAfterEdit, $(this));
    return false;
});

$(document).on('click', '.edit-todo-cancel', function(){
    var todoId = $(this).data('id');
    $('.edit-' + todoId + '-container').remove();
    let html='<button class="btn btn-primary btn-sm todo-edit" data-id="' + todoId +
    '"><span class="glyphicon glyphicon-edit"></span> Редактировать</button>' +
    ' <button class="btn btn-danger btn-sm todo-delete" data-id="' + todoId +
    '" data-bb-example-key="alert-default">'+
    '<span class="glyphicon glyphicon-remove"></span> Удалить</button>';
    $('#todo-' + todoId).append(html);
    return false;
});

function editTodo(callback, link){
    var todoId = link.data('id');
    var editTitle = $('.edit-' + todoId + '-title').val();
    var editDesc = $('.edit-'+ todoId + '-description').val();
    var dataArray = {
        id: todoId,
        title: editTitle, 
        description: editDesc
    };
    $.ajax({
        method: 'POST',
        url: '/todos/' + todoId,
        data: $.param(dataArray),
        success: function(response){
            callback(dataArray);
        }
    })
};

function repaintAfterEdit(dataArray){
    console.log(dataArray);
    console.log(dataArray.id);
    $('.edit-' + dataArray.id + '-container').remove();
    let html='<button class="btn btn-primary btn-sm todo-edit" data-id="' + dataArray.id +
    '"><span class="glyphicon glyphicon-edit"></span> Редактировать</button>' +
    ' <button class="btn btn-danger btn-sm todo-delete" data-id="' + dataArray.id +
    '" data-bb-example-key="alert-default">'+
    '<span class="glyphicon glyphicon-remove"></span> Удалить</button>';
    $('#todo-' + dataArray.id).append(html);
    $('#todo-' + dataArray.id + ' .todo-title').text(dataArray.title);
    $('#todo-' + dataArray.id + ' .description').remove();

};

function getTodoItem(callback, link){
    var todoId = link.data('id');
    $.ajax({
        method: 'GET',
        url: '/todos/' + todoId,
        success: function(response){
         callback(link, response);
     },
     error: function(response){
        console.log("ошибка получения");
    }
});

}


function repaintItemToEditForm(HTMLelement, result) {
    console.log(result);
    let editHTML = [];
    let editContainer = $('<div>', { class: 'edit-'+result.id+'-container'});

    editHTML.push($('<div>', { class: 'edit-'+result.id+'-title-label', text:'Заголовок'}));
    editHTML.push($('<input>', { class: 'edit-'+result.id+'-title', value:result.title}));
    editHTML.push($('<div>', { class: 'edit-'+result.id+'-description-label', text:'Описание'}));
    editHTML.push($('<input>', { class: 'edit-'+result.id+'-description', value:result.description}));
    editHTML.push($('<br>'));
    editHTML.push($('<button>', { class: 'btn btn-primary btn-sm edit-todo-submit edit-' + result.id + '-submit', 'data-id':result.id, text:'Изменить'}));
    editHTML.push($('<button>', { class: 'btn btn-warning btn-sm edit-todo-cancel edit-' + result.id + '-cancel', 'data-id':result.id, text:'Отменить'}));

    for (var i = 0; i < editHTML.length; i++) {
      editHTML[i].appendTo(editContainer);
  }
  console.log(editContainer);
  HTMLelement.parent().find('button').hide(); 
  HTMLelement.parent().append(editContainer);
}

      //get to do
      $(document).on('click', '.todo-link', function(){
        getTodo($(this));
    });

   //adding book
   $('#save-todo').click(function(){
    var data = $('#todo-form').serialize();
    $.ajax({
        method: 'POST',
        url: '/todos/',
        data: data,
        success: function(response){
            $('#addTodo').modal('hide');
            var todo = {};
            todo.id = response;
            var dataArray = $('#todo-form').serializeArray();
            for (i in dataArray){
                todo[dataArray[i]['name']] = dataArray[i]['value'];
            }
            appendTodo(todo);
        }
    });
    return false;
})
}

)