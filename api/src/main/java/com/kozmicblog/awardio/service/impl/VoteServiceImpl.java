package com.kozmicblog.awardio.service.impl;

import com.kozmicblog.awardio.model.Vote;
import com.kozmicblog.awardio.repository.EntryRepository;
import com.kozmicblog.awardio.repository.UserRepository;
import com.kozmicblog.awardio.repository.VoteRepository;
import com.kozmicblog.awardio.service.VoteService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteServiceImpl implements VoteService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private VoteRepository voteRepository;

  @Autowired
  private EntryRepository entryRepository;

  @Override
  public Vote castVote(Integer entryId, Integer userId, String comment) {
    var entry = entryRepository.findById(entryId).orElseThrow(EntityNotFoundException::new);
    var voter = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
    Vote vote = new Vote();

    vote.setEntry(entry);
    vote.setVoter(voter);
    vote.setComment(comment);

    return voteRepository.save(vote);
  }

  @Override
  public void deleteVote(Integer id) {
    voteRepository.deleteById(id);
  }
}
