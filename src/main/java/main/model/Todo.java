package main.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Todo {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name="id")
   private int id;
   private String title;
   private String description;

   public int getId() {
      return id;
   }

   public void setId(int id) {
      this.id = id;
   }

   public String getTitle() {
      return title;
   }

   public void setTitle(String title) {
      this.title = title;
   }

   public String getDescription() {
      return description;
   }

   public void setDescription(String description) {
      this.description = description;
   }

   public Todo copyFrom(Todo original){
      this.setTitle(original.getTitle());
      this.setDescription(original.getDescription());
      return this;
   }
}
