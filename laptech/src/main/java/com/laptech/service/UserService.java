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
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;
import java.util.Map;

import com.laptech.dao.UserDAO;
import com.laptech.model.Account;
import com.laptech.rest.AccountRestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

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
        String email = oauth2.getPrincipal().getAttribute("email");
        String provider = oauth2.getAuthorizedClientRegistrationId();

       
        String formatUsername;
        String password;
        String fullName;
        String role;
        Account account;
                account = dao.findByEmail(email);


        if("google".equals(provider)){
                 String picture = oauth2.getPrincipal().getAttribute("picture");
        String givenName = oauth2.getPrincipal().getAttribute("given_name");
        String familyName = oauth2.getPrincipal().getAttribute("family_name");
        String sub = oauth2.getPrincipal().getAttribute("sub");

        System.out.println("Google - Email: " + email);
        System.out.println("Google - Name: " + name);
        System.out.println("Google - Picture: " + picture);
        System.out.println("Google - givenName: " + givenName);
        System.out.println("Google - familyName: " + familyName);
        System.out.println("Google - sub: " + sub);
        System.out.println("Google - provider: " + provider);
        
             if(account != null){
            password = account.getPassword();
            role = account.getAdmin() ? "ADMIN" : "USER";           
            }else{
                formatUsername = formatName(givenName)+"gg";
                password = Long.toHexString(System.currentTimeMillis());
                fullName = familyName+" "+givenName;
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
                role = account.getAdmin() ? "ADMIN" : "USER";
                System.out.println("TẠO THÀNH CÔNG GG: "+formatUsername);

            }

            UserDetails user = User.withUsername(account.getUsername())
                    .password(getPasswordEncoder().encode(password))
                    .roles(role).build();
            Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);


        }else if("facebook".equals(provider)){

            Map<String, Object> pictureObj = (Map<String, Object>) oauth2.getPrincipal().getAttribute("picture");
            Map<String, Object> pictureData = (Map<String, Object>) pictureObj.get("data");
            String pictureUrl = (String) pictureData.get("url");
            String firstName = oauth2.getPrincipal().getAttribute("first_name");
            String lastName = oauth2.getPrincipal().getAttribute("last_name");
            
            System.out.println("Facebook - Email: " + email);
            System.out.println("Facebook - Name: " + name);
            System.out.println("Facebook - Picture: " + pictureUrl);
            System.out.println("Facebook - firstName: " + firstName);
            System.out.println("Facebook - lastName: " + lastName);

            if(account != null) {
                password = account.getPassword();
                role = account.getAdmin() ? "ADMIN" : "USER";
            }else{
                formatUsername = formatName(name)+"fb";
                password = Long.toHexString(System.currentTimeMillis());
                fullName = lastName+" "+firstName;
                account = new Account();
                account.setUsername(formatUsername);
                account.setPassword(password);
                account.setFullname(fullName);
                account.setEmail(email);
                account.setAdmin(false);
                account.setActive(true);
                account.setImage(pictureUrl);
                userDAO.save(account);
                account = dao.findById(account.getUsername()).get();
                role = account.getAdmin() ? "ADMIN" : "USER";
                System.out.println("TẠO THÀNH CÔNG FB: "+formatUsername);

            }

            UserDetails user = User.withUsername(account.getUsername())
                        .password(getPasswordEncoder().encode(account.getPassword()))
                        .roles(role).build();
                Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);

            

        }        
       


        
       
    }

}
