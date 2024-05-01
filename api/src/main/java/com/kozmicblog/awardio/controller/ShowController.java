package com.kozmicblog.awardio.controller;

import com.kozmicblog.awardio.model.Show;
import com.kozmicblog.awardio.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/shows")
public class ShowController {
  public record ShowDTO(Integer id, String title, String image, String description, Date airDate) {
    public static ShowDTO ofShow(Show show) {
      return new ShowDTO(show.getId(), show.getTitle(), show.getImage(), show.getDescription(), show.getAirDate());
    }
  }

  @Autowired
  private ShowService showService;

  @GetMapping
  public List<Show> shows() {
    return showService.getAllShows();
  }

  @GetMapping("/{id}")
  public Show show(@PathVariable("id") Integer id) {
    return showService.getShowById(id);
  }

  @PostMapping
  public Show create(@RequestBody Show show) {
    return showService.createShow(show);
  }

  @PutMapping("/{id}")
  public ShowDTO update(@PathVariable("id") Integer id, @RequestBody Show show) {
    var updatedShow = showService.updateShow(id, show);

    return ShowDTO.ofShow(updatedShow);
  }

  @DeleteMapping("/{id}")
  public void removeShow(@PathVariable("id") Integer id) {
    showService.deleteShowById(id);
  }
}