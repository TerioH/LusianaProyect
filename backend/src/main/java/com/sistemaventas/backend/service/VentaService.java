package com.sistemaventas.backend.service;

import com.sistemaventas.backend.model.*;
import com.sistemaventas.backend.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class VentaService {

    private final VentaRepository ventaRepository;
    private final DetalleVentaRepository detalleRepository;
    private final ProductoRepository productoRepository;

    public VentaService(
            VentaRepository ventaRepository,
            DetalleVentaRepository detalleRepository,
            ProductoRepository productoRepository) {

        this.ventaRepository = ventaRepository;
        this.detalleRepository = detalleRepository;
        this.productoRepository = productoRepository;
    }
    public Venta registrarVenta(VentaRequest request) {

        Venta venta = new Venta();

        venta.setIdCliente(request.getIdCliente());

        // Por ahora siempre venderá el usuario 1
        venta.setIdUsuario(1);

        venta.setFecha(LocalDateTime.now());

        venta.setTotal(BigDecimal.ZERO);

        venta = ventaRepository.save(venta);

        BigDecimal total = BigDecimal.ZERO;

        for (ProductoVentaDTO item : request.getProductos()) {

            Producto producto = productoRepository.findById(item.getIdProducto())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            if (producto.getStock() < item.getCantidad()) {
                throw new RuntimeException("Stock insuficiente");
            }

            BigDecimal subtotal = producto.getPrecio()
                    .multiply(BigDecimal.valueOf(item.getCantidad()));

            DetalleVenta detalle = new DetalleVenta();

            detalle.setIdVenta(venta.getIdVenta());
            detalle.setIdProducto(producto.getIdProducto());
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            detalle.setSubtotal(subtotal);

            detalleRepository.save(detalle);

            producto.setStock(producto.getStock() - item.getCantidad());

            productoRepository.save(producto);

            total = total.add(subtotal);
        }

        venta.setTotal(total);

        return ventaRepository.save(venta);

    }
}
