package com.itechartgroup.telemed.security.repository.projection;

import java.util.UUID;

/**
 * @author s.vareyko
 * @since 14.04.2020
 */
public interface UserNameAndIdProjection {

    UUID getId();

    String getName();
}
