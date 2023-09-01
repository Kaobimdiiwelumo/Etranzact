package com.net.employee.Model;

import javax.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
   @Column(name = "FirstName")
   private String firstName;
    @Column(name = "LastName")
   private String LastName;
    @Column(name = "Email")
   private String Email;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstname) {
        firstName = firstname;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }
}
