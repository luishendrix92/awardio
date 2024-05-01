package com.kozmicblog.awardio.repository;

import com.kozmicblog.awardio.model.Show;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowRepository extends CrudRepository<Show, Integer> {
}
