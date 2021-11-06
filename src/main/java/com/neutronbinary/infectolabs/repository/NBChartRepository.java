package com.neutronbinary.infectolabs.repository;

import com.neutronbinary.infectolabs.domain.NBChart;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the NBChart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NBChartRepository extends JpaRepository<NBChart, Long> {}
