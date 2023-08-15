package com.laptech.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.laptech.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfg extends WebSecurityConfigurerAdapter {

        // Quản lý người dữ liệu người sử dụng
        @Autowired
        UserService userService;

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.userDetailsService(userService);
        }

        // Phân quyền sử dụng và hình thức đăng nhập
        @Override
        protected void configure(HttpSecurity http) throws Exception {
                // CSRF,CORS - chia sẽ từ bên ngoài và truy
                http.csrf().disable().cors().disable();

                http.authorizeHttpRequests(requests -> requests
                                .antMatchers("/admin/**/**").hasRole("ADMIN")
                                //  .antMatchers("/client/favorite").hasRole("USER")
                                .antMatchers("/client/index").permitAll());
                // .antMatchers("/client/index").authenticated());
                http.exceptionHandling(handling -> handling
                                .accessDeniedPage("/account/access/denied-errorPage"));

                http.formLogin(login -> login // giao dien
                                .loginPage("/account/login")
                                .loginProcessingUrl("/perform_login")
                                .defaultSuccessUrl("/client/index", false)
                                .failureUrl("/account/login/error")
                                .usernameParameter("username")
                                .passwordParameter("password"));

                // dang xuat
                http.logout(logout -> logout
                                .logoutUrl("/logoff")
                                .logoutSuccessUrl("/account/logout"));


                http.oauth2Login(login -> login
                                .loginPage("/account/login")
                                .defaultSuccessUrl("/account/oauth2/login/success", false)
                                .failureUrl("/account/login/error")
                                .authorizationEndpoint()
                                .baseUri("/oauth2/authorization"));    

        }

}

// dang nhap bang mang xa hoi demo 7.6
// http.oauth2Login()
// .loginPage("/auth/login/form")
// .defaultSuccessUrl("/auth/login/success",true)
// .failureUrl("/auth/login/error")
// .authorizationEndpoint()
// .baseUri("/oauth2/authorization");