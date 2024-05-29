package com.example.EventApp.controller;

import com.example.EventApp.model.User;
import com.example.EventApp.service.CustomUserDetailsService;
import com.example.EventApp.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username,@RequestParam String password) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        final String jwt = jwtUtil.generateToken(userDetails);
        System.out.println("Generated JWT: " + jwt);

        return ResponseEntity.ok(Collections.singletonMap("token", jwt));
    }




    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        userDetailsService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }
}
