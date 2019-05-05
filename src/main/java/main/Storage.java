package main;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import response.Todo;

public class Storage {

   private static int currentId = 1;
   private static HashMap<Integer, Todo> todos = new HashMap<>();

   public static List<Todo> getAllTodos() {
      return new ArrayList<>(todos.values());
   }

   public static int addTodo(Todo todo) {
      int id = currentId;
      currentId++;
      todo.setId(id);
      todos.put(id, todo);
      return id;
   }

   public static Todo getTodo(int todoId) {
      if (todos.containsKey(todoId)) {
         return todos.get(todoId);
      }
      return null;
   }

}
