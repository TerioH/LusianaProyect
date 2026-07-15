package com.sistemaventas.backend.controller;

import com.sistemaventas.backend.model.Producto;
import com.sistemaventas.backend.repository.ProductoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin("*")
public class ProductoController {

    private final ProductoRepository repository;

    public ProductoController(ProductoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Producto> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Producto guardar(@RequestBody Producto producto) {
        return repository.save(producto);
    }

    @GetMapping("/{id}")
    public Producto buscar(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Integer id, @RequestBody Producto producto) {

        Producto existente = repository.findById(id).orElse(null);

        if (existente == null) {
            return null;
        }

        existente.setNombre(producto.getNombre());
        existente.setCodigo(producto.getCodigo());
        existente.setTipoTela(producto.getTipoTela());
        existente.setTalla(producto.getTalla());
        existente.setColor(producto.getColor());
        existente.setPrecio(producto.getPrecio());
        existente.setStock(producto.getStock());
        existente.setDescripcion(producto.getDescripcion());
        existente.setImagen(producto.getImagen());
        existente.setEstado(producto.getEstado());

        return repository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}