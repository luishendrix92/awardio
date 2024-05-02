package com.kozmicblog.awardio.controller;

import com.kozmicblog.awardio.model.Vote;
import com.kozmicblog.awardio.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/votes")
public class VoteController {
  public record VoteDto(Integer voterId, Integer entryId, String comment) {
  }

  @Autowired
  private VoteService voteService;

  @PostMapping
  public Vote create(@RequestBody VoteDto vote) {
    return voteService.castVote(vote.entryId(), vote.voterId(), vote.comment());
  }
}
