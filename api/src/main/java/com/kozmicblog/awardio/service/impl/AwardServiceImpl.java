package com.kozmicblog.awardio.service.impl;

import com.kozmicblog.awardio.model.Award;
import com.kozmicblog.awardio.repository.AwardRepository;
import com.kozmicblog.awardio.repository.ShowRepository;
import com.kozmicblog.awardio.service.AwardService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AwardServiceImpl implements AwardService {
  @Autowired
  private ShowRepository showRepository;

  @Autowired
  private AwardRepository awardRepository;

  @Override
  public Award createAward(Integer showId, String title) {
    var show = showRepository.findById(showId).orElseThrow(EntityNotFoundException::new);
    Award award = new Award();

    award.setTitle(title);
    award.setShow(show);

    return awardRepository.save(award);
  }
}
