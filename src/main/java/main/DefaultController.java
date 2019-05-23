package main;


import java.util.ArrayList;
import java.util.stream.Stream;
import main.model.Todo;
import main.model.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class DefaultController {

   @Autowired
   private TodoRepository todoRepository;

   @Value("${someParameter.value}")
   private int someParameter;

   @RequestMapping("/")
   public String index(Model model) {
      ArrayList<Todo> todos = new ArrayList<>();
      todoRepository.findAll().forEach(todos::add);

      model.addAttribute("todos", todos);
      model.addAttribute("todosCount", todos.size());
      model.addAttribute("someParameter", someParameter);

      return "index";
   }
}
