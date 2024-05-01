package com.kozmicblog.awardio.controller;

import com.kozmicblog.awardio.model.Award;
import com.kozmicblog.awardio.service.AwardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/awards")
public class AwardController {
  public record AwardDto(Integer showId, String title) {
  }

  public record SetWinnerResponse(Integer awardId, Integer winnerEntryId) {
  }

  @Autowired
  private AwardService awardService;

  @PostMapping
  public Award create(@RequestBody AwardDto award) {
    return awardService.createAward(award.showId(), award.title());
  }

  @PutMapping("/{id}")
  public String updateTitle(@PathVariable("id") Integer id, @RequestBody Award award) {
    return awardService.updateAwardTitle(id, award.getTitle());
  }

  @PatchMapping("/{id}/winner")
  public SetWinnerResponse setWinnerEntry(@PathVariable("id") Integer awardId, @RequestBody Award award) {
    var updatedAward = awardService.setWinner(awardId, award.getWinnerEntryId());

    return new SetWinnerResponse(updatedAward.getId(), updatedAward.getWinnerEntryId());
  }
}
