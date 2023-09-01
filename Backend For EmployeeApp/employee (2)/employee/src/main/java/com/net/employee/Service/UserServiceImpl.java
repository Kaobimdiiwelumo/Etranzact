package com.net.employee.Service;

import com.net.employee.Dto.UserRegistrationDto;
import com.net.employee.Model.User;
import com.net.employee.Repository.UserRepository;
//import com.net.employee.config.PasswordEncoderComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import com.net.employee.Model.Roles;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private PasswordEncoder passwordEncoder;
    private User user;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }

@Override
public User save(UserRegistrationDto registrationDto) {
        User newUser = new User();
    newUser.setFirstName(registrationDto.getFirstName());
    newUser.setLastName(registrationDto.getLastName());
    newUser.setEmail(registrationDto.getEmail());
    newUser.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
    newUser.setRoles(Arrays.asList(new Roles("ROLE_USER")));
    return userRepository.save(newUser);
}







}
