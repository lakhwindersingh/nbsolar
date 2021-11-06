package com.neutronbinary.infectolabs.repository;

import com.neutronbinary.infectolabs.domain.NBMapComponentAttributes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the NBMapComponentAttributes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NBMapComponentAttributesRepository extends JpaRepository<NBMapComponentAttributes, Long> {}
