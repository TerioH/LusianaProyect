package com.sistemaventas.backend.model;

import java.util.List;

public class VentaRequest {

    private Integer idCliente;

    private List<ProductoVentaDTO> productos;

    public VentaRequest() {
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public List<ProductoVentaDTO> getProductos() {
        return productos;
    }

    public void setProductos(List<ProductoVentaDTO> productos) {
        this.productos = productos;
    }
}
