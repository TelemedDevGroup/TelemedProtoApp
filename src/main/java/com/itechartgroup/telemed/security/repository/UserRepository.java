package com.itechartgroup.telemed.security.repository;

import com.itechartgroup.telemed.security.entity.User;
import com.itechartgroup.telemed.security.repository.projection.UserNameAndIdProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("select u.id as id, u.name as name from User u where u.id in :ids")
    Collection<UserNameAndIdProjection> findAllByIdIn(@Param("ids") Collection<UUID> ids);
}
