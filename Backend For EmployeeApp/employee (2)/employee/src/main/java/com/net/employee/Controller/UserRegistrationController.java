package com.net.employee.Controller;

import com.net.employee.Dto.UserRegistrationDto;
import com.net.employee.Model.User;
import com.net.employee.Repository.UserRepository;
import com.net.employee.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/registration")
    public class UserRegistrationController {

    private final UserService userService;
    private UserRepository userRepository;


    @Autowired
    public UserRegistrationController(
            UserService userService,
            UserRepository userRepository
            ) {
        this.userService = userService;
        this.userRepository = userRepository;

    }

//        @ModelAttribute("user")
//        public UserRegistrationDto userRegistrationDto() {
//            return new UserRegistrationDto();
//        }

//        @GetMapping
//        public String showRegistrationForm() {
//            return "registration";
//        }

//    @PostMapping("/new")
//    @ModelAttribute("user")
//    @ResponseBody
//    public String registerUserAccount(UserRegistrationDto registrationDto) {
//        User exists = userRepository.findByEmail(registrationDto.getEmail());
//        if (exists == null) {
//            User newUser = new User();
//            newUser.setFirstName(registrationDto.getFirstName());
//            newUser.setLastName(registrationDto.getLastName());
//            newUser.setEmail(registrationDto.getEmail());
//            newUser.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
//            userService.save(registrationDto);
//            return "successful";
//        } else if (registrationDto.getPassword() == null || registrationDto.getPassword().isEmpty()) {
//            // Handle the case where password is null or empty
//            // You can return an error response or perform some other action
//            return "no omo received";
//        } else {
//            return "ERROR";
//        }
//    }
@PostMapping("/new")
@ResponseBody
public String registerUserAccount(@RequestBody UserRegistrationDto registrationDto) {

    User exists = userRepository.findByEmail(registrationDto.getEmail());
    if (exists == null) {
        userService.save(registrationDto);
        return "successful";
    } else if (registrationDto.getPassword() == null || registrationDto.getPassword().isEmpty()) {
        return "no omo received";
    } else {
        return "ERROR";
    }
}

}



