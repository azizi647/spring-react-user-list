package dev.azizli.springreactuserlist.controller;


import dev.azizli.springreactuserlist.exceptions.ResourceNotFoundException;
import dev.azizli.springreactuserlist.model.User;
import dev.azizli.springreactuserlist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(value = "http://localhost:3004")
@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // list all users
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    // create new user
    @PostMapping("/users")
    public User createNewUser(@RequestBody User user){
        return userRepository.save(user);
    }

    // get user by id
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User userById = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + id));

        return ResponseEntity.ok(userById);
    }

    // update user by id
    @PutMapping("/users/{id}")
    public ResponseEntity<User> editUserById(@PathVariable Long id, @RequestBody User user){
        User updatedUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + id));
        updatedUser.setName(user.getName());
        updatedUser.setDepartment(user.getDepartment());
        updatedUser.setSalary(user.getSalary());
        return ResponseEntity.ok(userRepository.save(updatedUser));
    }

    // delete user by id
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUserById(@PathVariable Long id){
        User deletedUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + id));
        userRepository.delete(deletedUser);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
