package com.kozmicblog.awardio.controller;

import com.kozmicblog.awardio.model.Show;
import com.kozmicblog.awardio.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shows")
public class ShowController {
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

  @DeleteMapping("/{id}")
  public void removeShow(@PathVariable("id") Integer id) {
    showService.deleteShowById(id);
  }
}