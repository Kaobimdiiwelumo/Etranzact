// Java Program to Illustrate LoginController Class

package com.net.code.controller;

// Importing required classes
import com.net.code.entity.Users;
import com.net.code.model.LoginModel;
import com.net.code.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// Annotation

@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;

//    @GetMapping("/sign-in")
//    public ResponseEntity<String> login() {
//
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//
//        //Users user = userRepository.findUserByUsername(auth.getName());
//
//        return ResponseEntity.status(HttpStatus.ACCEPTED).body("success");
//
//    }
@GetMapping("/sign-in")
public ResponseEntity<Long> login() {

    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    Users user = userRepository.findUserByUsername(auth.getName());

    if (user != null) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(user.getId());
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
}

}








