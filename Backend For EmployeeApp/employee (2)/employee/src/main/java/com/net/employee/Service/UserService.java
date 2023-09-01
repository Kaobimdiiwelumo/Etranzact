package com.net.employee.Service;

import com.net.employee.Dto.UserRegistrationDto;
import com.net.employee.Model.User;
import com.net.employee.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService{

    User save(UserRegistrationDto registrationDto);
}