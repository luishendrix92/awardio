package com.kozmicblog.awardio.service;

import com.kozmicblog.awardio.model.Award;

public interface AwardService {
  Award createAward(Integer showId, String title);
}