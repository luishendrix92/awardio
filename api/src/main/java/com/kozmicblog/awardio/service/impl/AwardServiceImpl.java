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

  @Override
  public Award setWinner(Integer awardId, Integer winnerEntryId) {
    var award = awardRepository.findById(awardId).orElseThrow(EntityNotFoundException::new);

    award.setWinnerEntryId(winnerEntryId);

    return awardRepository.save(award);
  }

  @Override
  public String updateAwardTitle(Integer id, String title) {
    var award = awardRepository.findById(id).orElseThrow(EntityNotFoundException::new);

    award.setTitle(title);

    return awardRepository.save(award).getTitle();
  }

  @Override
  public void deleteAward(Integer id) {
    awardRepository.deleteById(id);
  }
}
