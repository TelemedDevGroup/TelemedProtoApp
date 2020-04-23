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
import java.util.stream.Stream;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("select u.id as id, u.name as name from User u where u.id in :ids")
    Collection<UserNameAndIdProjection> findAllByIdIn(@Param("ids") Collection<UUID> ids);

    @Query(value =
            "SELECT u.* from user u " +
            "INNER JOIN assign_user_to_role au on u.user_id = au.user_id " +
            "WHERE au.role_id = 2 AND u.user_id <> :userId", nativeQuery = true)
    Stream<User> getAvailableDoctors(@Param("userId") UUID userId);

    Stream<User> findByIdNot(@Param("userId") UUID userId);

    Stream<User> findAllBy();
}
