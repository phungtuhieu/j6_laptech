package com.laptech.service;

import java.text.Normalizer;
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
import java.text.Normalizer;
import java.util.regex.Pattern;

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

    @Autowired
    UserDAO userDAO;

    public static String formatName(String name) {
        String normalized = Normalizer.normalize(name, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String formatted = pattern.matcher(normalized).replaceAll("").replaceAll(" ", "").toLowerCase();
        return formatted;
    }








    public void loginFormOauth2(OAuth2AuthenticationToken oauth2) {
        String name = oauth2.getPrincipal().getAttribute("name");
        String picture = oauth2.getPrincipal().getAttribute("picture");
        String givenName = oauth2.getPrincipal().getAttribute("given_name");
        String familyName = oauth2.getPrincipal().getAttribute("family_name");
        String email = oauth2.getPrincipal().getAttribute("email");
        String sub = oauth2.getPrincipal().getAttribute("sub");
        String provider = oauth2.getAuthorizedClientRegistrationId();

        System.out.println("Google - Email: " + email);
        System.out.println("Google - Name: " + name);
        System.out.println("Google - Picture: " + picture);
        System.out.println("Google - givenName: " + givenName);
        System.out.println("Google - familyName: " + familyName);
        System.out.println("Google - sub: " + sub);
        System.out.println("Google - provider: " + provider);

        Account account;
                account = dao.findByEmail(email);

        if(account != null){
            String password = account.getPassword();
            String role = account.getAdmin() ? "ADMIN" : "USER";
            UserDetails user = User.withUsername(account.getUsername())
                    .password(getPasswordEncoder().encode(password))
                    .roles(role).build();
            Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }else{
            String formatUsername = formatName(givenName);
            String password = Long.toHexString(System.currentTimeMillis());
            String fullName = familyName+" "+givenName;
            account = new Account();
            account.setUsername(formatUsername);
            account.setPassword(password);
            account.setFullname(fullName);
            account.setEmail(email);
            account.setAdmin(false);
            account.setActive(true);
            account.setImage(picture);
            userDAO.save(account);
            account = dao.findById(account.getUsername()).get();
            String role = account.getAdmin() ? "ADMIN" : "USER";
            UserDetails user = User.withUsername(account.getUsername())
                    .password(getPasswordEncoder().encode(account.getPassword()))
                    .roles(role).build();
            Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);
             System.out.println("TẠO THÀNH CÔNG: "+formatUsername);

        }


        
       
    }

}
