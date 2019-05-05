package main;


import java.util.stream.Stream;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DefaultController {

   @RequestMapping("/")
   public String index() {
      return Stream.generate(() -> String.valueOf(Math.random() * 100)).limit(40)
          .map(String::toString).reduce(((strings, s) -> strings +=  "<br>\n" + s )).orElse("");
   }
}
