package com.sistemaventas.backend.controller;

import com.sistemaventas.backend.model.Venta;
import com.sistemaventas.backend.model.VentaRequest;
import com.sistemaventas.backend.repository.VentaRepository;
import com.sistemaventas.backend.service.VentaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ventas")
@CrossOrigin("*")
public class VentaController {

    private final VentaService service;
    private final VentaRepository repository;

    public VentaController(VentaService service, VentaRepository repository) {

        this.service = service;
        this.repository = repository;

    }

    @PostMapping
    public Venta vender(@RequestBody VentaRequest request) {
        return service.registrarVenta(request);
    }

    @GetMapping
    public java.util.List<Venta> listar() {
        return repository.findAll();
    }

}