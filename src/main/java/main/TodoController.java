package main;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import main.model.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import main.model.Todo;

@RestController
public class TodoController {

   @Autowired
   private TodoRepository todoRepository;

   //get list
   @GetMapping("/todos/")
   public List<Todo> list() {
      ArrayList<Todo> todos = new ArrayList<>();
      todoRepository.findAll().forEach(todos::add);
      return todos;
   }

   //add to do
   @PostMapping("/todos/")
   public int add(Todo todo) {
      Todo newTodo = todoRepository.save(todo);
      return newTodo.getId();
   }

   //get item
   @GetMapping("/todos/{id}")
   public ResponseEntity<Object> get(@PathVariable int id) {
      return todoRepository.findById(id).<ResponseEntity<Object>>map(
          todo -> new ResponseEntity<>(todo, HttpStatus.OK)).orElseGet(this::returnError404);
   }



   //delete
   @DeleteMapping("/todos/{id}")
   public ResponseEntity<Object> delete(@PathVariable int id) {
      if (todoRepository.findById(id).isPresent()) {
         todoRepository.deleteById(id);
         return new ResponseEntity<>(true, HttpStatus.OK);
      }
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
   }


   //edit item
   @PostMapping("/todos/{id}")
   public ResponseEntity<Object> edit(@PathVariable int id, Todo todo) {
      Optional<Todo> optionalTodo = todoRepository.findById(id);
      if (optionalTodo.isPresent()) {
         todoRepository.save(optionalTodo.get().copyFrom(todo));
         return new ResponseEntity<>(true, HttpStatus.OK);
      }
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
   }

   private ResponseEntity<Object> returnError404() {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
   }
}
