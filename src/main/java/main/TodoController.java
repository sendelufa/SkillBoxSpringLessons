package main;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import response.Todo;

@RestController
public class TodoController {

   @GetMapping("/todos/")
   public List<Todo> list() {
      return Storage.getAllTodos();
   }

   @PostMapping("/todos/")
   public int add(Todo todo) {
      return Storage.addTodo(todo);
   }

   @GetMapping("/todos/{id}")
   public ResponseEntity<Object> get(@PathVariable int id) {
      Todo todo = Storage.getTodo(id);
      if (todo == null) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
      }
      return new ResponseEntity<>(todo, HttpStatus.OK);
   }

   @DeleteMapping("/todos/{id}")
   public ResponseEntity<Object> delete(@PathVariable int id) {
      if (Storage.deleteTodo(id)) {
         return new ResponseEntity<>(true, HttpStatus.OK);
      }
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
   }
}
