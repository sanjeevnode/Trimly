package com.sanjeevnode.app.trimly.service;

import com.sanjeevnode.app.trimly.dto.AuthResponse;
import com.sanjeevnode.app.trimly.dto.UserRequestDTO;
import com.sanjeevnode.app.trimly.dto.UserDTO;
import com.sanjeevnode.app.trimly.enums.Role;
import com.sanjeevnode.app.trimly.exception.InvalidTokenException;
import com.sanjeevnode.app.trimly.exception.UserAlreadyExistException;
import com.sanjeevnode.app.trimly.exception.UserNotFoundException;
import com.sanjeevnode.app.trimly.model.User;
import com.sanjeevnode.app.trimly.repository.UserRepository;
import com.sanjeevnode.app.trimly.service.impl.UserDetailsServiceImpl;
import com.sanjeevnode.app.trimly.utils.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    
    private JwtService jwtService;

    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;

    private final UserDetailsServiceImpl userDetailsService;

    public ApiResponse register(UserRequestDTO request){


        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new UserAlreadyExistException(request.getUsername());
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_USER);

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return ApiResponse.builder()
                .status(HttpStatus.CREATED)
                .message("User registered successfully")
                .data(new AuthResponse(user.getUsername(), user.getRole().name(),token))
                .build();
    }

    public ApiResponse login(UserRequestDTO request) {

        User user = checkUserExists(request.getUsername());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String token = jwtService.generateToken(user);

        return ApiResponse.builder()
                .status(HttpStatus.OK)
                .message("User logged in successfully")
                .data(new AuthResponse(user.getUsername(), user.getRole().name(),token))
                .build();
    }

    public ApiResponse getUserDetails(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(user.getUsername());
        userDTO.setRole(user.getRole().name());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setUpdatedAt(user.getUpdatedAt());
        userDTO.setId(user.getId());
        return ApiResponse.builder()
                .status(HttpStatus.OK)
                .message("User details retrieved successfully")
                .data(userDTO)
                .build();
    }

    public ApiResponse validateToken(String token){
      String username = jwtService.extractUsername(token);
      UserDetails userDetails = userDetailsService.loadUserByUsername(username);

      if(username==null || !jwtService.isValid(token,userDetails)){
          throw  new InvalidTokenException("Invalid token");
      }
        User user = checkUserExists(username);
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(user.getUsername());
        userDTO.setRole(user.getRole().name());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setUpdatedAt(user.getUpdatedAt());
        userDTO.setId(user.getId());

        return ApiResponse.builder()
                .status(HttpStatus.OK)
                .message("Token is valid")
                .data(userDTO)
                .build();

    }

    private User checkUserExists(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
    }

    public User getUserByIdOrUsername(String idOrUsername) {
        return userRepository.findById(idOrUsername)
                .orElseGet(() -> userRepository.findByUsername(idOrUsername)
                        .orElseThrow(() -> new UserNotFoundException("User not found with id or username: " + idOrUsername)));
    }

    public User getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UserNotFoundException("No user is currently logged in");
        }
        String username = authentication.getName();
        return  getUserByIdOrUsername(username);
    }

}
