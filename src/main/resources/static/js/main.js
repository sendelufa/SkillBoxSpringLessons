$(function(){

    const appendTodo = function(data){
        var todoItem = '<a href="#" class="todo-link" data-id="' + data.id + '"><h3>' +
        data.title + '</h3></a><a href="#" class="btn btn-primary btn-sm" data-id="' + data.id +
         '"><span class="glyphicon glyphicon-edit"></span> Редактировать</a>' +
         ' <a href="#" class="btn btn-danger btn-sm" data-id="' + data.id +
          '"><span class="glyphicon glyphicon-remove"></span> Удалить</a> ';
        $('.list-group').append('<li class="list-group-item">' + todoItem + '</li>');
        console.log(todoItem);
    };

    //Loading todos
    $.get('/todos/', function(response)
    {
        for (i in response){
            appendTodo(response[i]);
        }


    });

    //get todo
    $(document).on('click', '.todo-link', function(){
        var todoId = $(this).data('id');
        var link = $(this);
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