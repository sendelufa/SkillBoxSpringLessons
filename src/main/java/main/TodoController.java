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

   //get list
   @GetMapping("/todos/")
   public List<Todo> list() {
      return Storage.getAllTodos();
   }

   //add to do
   @PostMapping("/todos/")
   public int add(Todo todo) {
      return Storage.addTodo(todo);
   }

   //get item
   @GetMapping("/todos/{id}")
   public ResponseEntity<Object> get(@PathVariable int id) {
      Todo todo = Storage.getTodo(id);
      if (todo == null) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
      }
      return new ResponseEntity<>(todo, HttpStatus.OK);
   }

   //delete
   @DeleteMapping("/todos/{id}")
   public ResponseEntity<Object> delete(@PathVariable int id) {
      if (Storage.deleteTodo(id)) {
         return new ResponseEntity<>(true, HttpStatus.OK);
      }
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
   }

   //edit item
   @PostMapping("/todos/{id}")
   public ResponseEntity<Object> edit(@PathVariable int id, Todo todo) {
      if (Storage.editTodo(id, todo)) {
         return new ResponseEntity<>(true, HttpStatus.OK);
      }
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
   }
}
