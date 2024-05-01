package com.kozmicblog.awardio.repository;

import com.kozmicblog.awardio.model.Entry;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepository extends CrudRepository<Entry, Integer> {
}
