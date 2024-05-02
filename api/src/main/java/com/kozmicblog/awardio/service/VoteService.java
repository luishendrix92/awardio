package com.kozmicblog.awardio.service;

import com.kozmicblog.awardio.model.Vote;

public interface VoteService {
  Vote castVote(Integer entryId, Integer userId, String comment);
}
