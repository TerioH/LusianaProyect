package com.sistemaventas.backend.model;

public class ProductoVentaDTO {

    private Integer idProducto;
    private Integer cantidad;

    public ProductoVentaDTO() {
    }

    public Integer getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
}
