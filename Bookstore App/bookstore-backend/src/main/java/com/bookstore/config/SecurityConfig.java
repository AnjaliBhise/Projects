package com.bookstore.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().configurationSource(corsConfigurationSource()) // <-- Enable CORS
            .and()
            .authorizeRequests()

                // Public Endpoints
                .antMatchers("/api/signup", "/api/login").permitAll()

                // Common Endpoints
                .antMatchers(HttpMethod.GET, "/api/books/**").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/books/search").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/users/email/**").hasAnyRole("USER", "ADMIN")

                // USER Endpoints
                .antMatchers(HttpMethod.PUT, "/api/users/**").hasRole("USER")
                .antMatchers(HttpMethod.POST, "/api/books/buy/*").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/api/users/my-orders").hasRole("USER")

                // ADMIN Endpoints
                .antMatchers(HttpMethod.GET, "/api/users/id/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/users/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/books/import/google").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/books/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/books/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/books/**").hasRole("ADMIN")
                
                //for orders
                .antMatchers("/api/orders/**").hasAnyRole("USER", "ADMIN")

                // Everything else
                .anyRequest().authenticated()

            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http
            .getSharedObject(AuthenticationManagerBuilder.class)
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder())
            .and()
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
