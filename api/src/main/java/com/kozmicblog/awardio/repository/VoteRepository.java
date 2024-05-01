package com.kozmicblog.awardio.repository;

import com.kozmicblog.awardio.model.Vote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends CrudRepository<Vote, Integer> {
}
