package com.laptech.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import com.laptech.dao.UserDAO;
import com.laptech.model.Account;
import com.laptech.rest.AccountRestController;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserDAO dao;

    @Bean
    public BCryptPasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    AccountRestController a;

    @Autowired
    HttpSession session;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            Account account = dao.findById(username).get();
            String password = account.getPassword();
            String role = account.getAdmin() ? "ADMIN" : "USER";
            if (account != null) {
                a.a(account);
                session.setAttribute("account", account);
            }

            return User.withUsername(username)
                    .password(getPasswordEncoder().encode(password))
                    .roles(role).build();
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found");
        }
    }

    public void loginFormOauth2(OAuth2AuthenticationToken oauth2) {
        String name = oauth2.getPrincipal().getAttribute("name");
        String email = oauth2.getPrincipal().getAttribute("email");
        String password = Long.toHexString(System.currentTimeMillis());

        UserDetails user = User.withUsername(email)
                .password(getPasswordEncoder().encode(password))
                .roles("GUEST").build();

        Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(auth);

    }

}
