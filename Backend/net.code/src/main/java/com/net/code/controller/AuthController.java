package com.net.code.controller;

import com.net.code.entity.Users;
import com.net.code.model.UserRegistrationRequest;
import com.net.code.repository.UserRepository;
import com.net.code.service.UserDetailsImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody UserRegistrationRequest registrationRequest) {
        // Validate input (you can add more validation as needed)

        Users exist = userRepository.findUserByUsername(registrationRequest.getUsername());

        if (exist == null) {
        Users newUser = new Users();
        newUser.setUsername(registrationRequest.getUsername());
        newUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        newUser.setRole(registrationRequest.getRole());
        userRepository.save(newUser);
            return "user Added Successfully";
        }
        return "Username already taken";
    }
}
