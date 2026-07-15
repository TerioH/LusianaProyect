package com.sistemaventas.backend.repository;

import com.sistemaventas.backend.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentaRepository extends JpaRepository<Venta,Integer>{
}