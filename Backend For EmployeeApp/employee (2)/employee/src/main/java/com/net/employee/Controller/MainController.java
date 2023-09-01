package com.net.employee.Controller;

import com.net.employee.Model.User;
import com.net.employee.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        System.out.println("Hello");
        return ResponseEntity.ok("Hello, Endpoint works!");
    }

    @GetMapping("/login")
    public ResponseEntity<String> login() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userRepository.findByEmail(auth.getName());

        if (user != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(user.getEmail());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }


}

