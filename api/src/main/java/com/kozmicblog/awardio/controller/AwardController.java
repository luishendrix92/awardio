package com.kozmicblog.awardio.controller;

import com.kozmicblog.awardio.model.Award;
import com.kozmicblog.awardio.service.AwardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/awards")
public class AwardController {
  public record AwardDto(Integer showId, String title) {
  }

  @Autowired
  private AwardService awardService;

  @PostMapping
  public Award create(@RequestBody AwardDto award) {
    return awardService.createAward(award.showId(), award.title());
  }
}
