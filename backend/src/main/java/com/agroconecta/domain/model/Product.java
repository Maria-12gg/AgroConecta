package com.agroconecta.domain.model;

import com.agroconecta.domain.validation.DomainValidator;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

public record Product(
        Long id,
        Long ownerId,
        String name,
        String description,
        ProductCategory category,
        BigDecimal price,
        BigDecimal availableQuantity,
        MeasurementUnit unit,
        String contactPhone,
        String contactEmail,
        boolean active,
        Instant createdAt,
        Instant updatedAt
) {

    public Product {
        Objects.requireNonNull(ownerId, "El productor es obligatorio");
        name = DomainValidator.requiredText(name, "nombre del producto");
        description = DomainValidator.requiredText(description, "descripción");
        Objects.requireNonNull(category, "La categoría es obligatoria");
        price = DomainValidator.positive(price, "precio");
        availableQuantity = DomainValidator.nonNegative(availableQuantity, "cantidad disponible");
        Objects.requireNonNull(unit, "La unidad de medida es obligatoria");
        contactPhone = DomainValidator.requiredText(contactPhone, "teléfono de contacto");
        contactEmail = DomainValidator.email(contactEmail);
    }

    public static Product create(Long ownerId, String name, String description, ProductCategory category,
                                 BigDecimal price, BigDecimal availableQuantity, MeasurementUnit unit,
                                 String contactPhone, String contactEmail) {
        return new Product(null, ownerId, name, description, category, price, availableQuantity, unit,
                contactPhone, contactEmail, true, null, null);
    }

    public Product update(String name, String description, ProductCategory category, BigDecimal price,
                          BigDecimal availableQuantity, MeasurementUnit unit, String contactPhone,
                          String contactEmail, boolean active) {
        return new Product(id, ownerId, name, description, category, price, availableQuantity, unit,
                contactPhone, contactEmail, active, createdAt, updatedAt);
    }

    public Product withStatus(boolean newActive) {
        return new Product(id, ownerId, name, description, category, price, availableQuantity, unit,
                contactPhone, contactEmail, newActive, createdAt, updatedAt);
    }

    public boolean belongsTo(Long userId) {
        return ownerId.equals(userId);
    }
}
