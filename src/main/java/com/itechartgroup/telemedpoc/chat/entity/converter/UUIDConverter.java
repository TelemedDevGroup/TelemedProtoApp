package com.itechartgroup.telemedpoc.chat.entity.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Optional;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 09.04.2020
 */
@Converter
public class UUIDConverter implements AttributeConverter<UUID, String> {
    @Override
    public String convertToDatabaseColumn(final UUID attribute) {
        return Optional.ofNullable(attribute).map(UUID::toString).orElse(null);
    }

    @Override
    public UUID convertToEntityAttribute(final String dbData) {
        return Optional.ofNullable(dbData).map(UUID::fromString).orElse(null);
    }
}
