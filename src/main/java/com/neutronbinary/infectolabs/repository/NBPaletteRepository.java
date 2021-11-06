package com.neutronbinary.infectolabs.repository;

import com.neutronbinary.infectolabs.domain.NBPalette;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the NBPalette entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NBPaletteRepository extends JpaRepository<NBPalette, Long> {}
