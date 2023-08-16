// Java Program to Illustrate Spring Security

package com.net.code.config;

// Importing required classes
import com.net.code.service.CustomerUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

// Annotation
@EnableWebSecurity
@Configuration
public class SecurityConfig
        extends WebSecurityConfigurerAdapter {

    public final String[] WHITE_LISTED_URL = {"/my_login", "/login", "/home",
            "/index*", "/static/**", "/*.js", "/*.json", "/*.ico", "/auth/register"};

    @Autowired
    CustomerUserDetailService userDetailService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth){
        auth.authenticationProvider(authenticationProvider());
    }


    @Bean
    DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        daoAuthenticationProvider.setUserDetailsService(userDetailService);
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http)
            throws Exception
    {
        http.cors().and().csrf().disable()
                .authorizeRequests().antMatchers(WHITE_LISTED_URL).permitAll()
                .antMatchers("/api/**").authenticated()
                .and().httpBasic();
    }
}
