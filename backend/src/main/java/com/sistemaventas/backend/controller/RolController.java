package com.sistemaventas.backend.controller;

import com.sistemaventas.backend.model.Rol;
import com.sistemaventas.backend.repository.RolRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RolController {

    private final RolRepository repository;

    public RolController(RolRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Rol> listar() {
        return repository.findAll();
    }
}