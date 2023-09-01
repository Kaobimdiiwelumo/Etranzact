package com.net.employee.Service;


import com.net.employee.Model.Roles;
import com.net.employee.Model.User;
import com.net.employee.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FindbyEmail implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;@Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        // Assuming user.getRoles() returns a collection of Role instances
        List<GrantedAuthority> authorities = mapRolesToAuthorities(user.getRoles());
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }
    private List<GrantedAuthority> mapRolesToAuthorities(Collection<Roles> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }
}

//@Override
//            public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//                UserDetails details = User.builder().username("user").authorities("USER_ROLE").build();
//                return details;
//            }
