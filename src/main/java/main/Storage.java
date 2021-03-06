package main;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import main.model.Todo;

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

   public static boolean deleteTodo(int id) {
      return todos.remove(id) != null;
   }

   public static boolean editTodo(int id, Todo todo) {
      if (todos.containsKey(id)) {
         todos.put(id, todo);
         return true;
      }
      return false;
   }
}
