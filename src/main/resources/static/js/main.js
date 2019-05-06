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

    $(document).on('click', '.todo-edit', function(){
        let response = getTodoItem($(this));
        console.log(getTodoItem($(this)));
        var code = '<p>' + response.title + '</p>';
          
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

     function getTodoItem(link){
        var todoId = link.data('id');
        var responseFunct;
        $.ajax({
            method: 'GET',
            url: '/todos/' + todoId,
            success: function(response){
                responseFunct = response;
                console.log(responseFunct);
                return response;
            },
            error: function(response){
                console.log("ошибка получения");
            }
        });
        return responseFunct;
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