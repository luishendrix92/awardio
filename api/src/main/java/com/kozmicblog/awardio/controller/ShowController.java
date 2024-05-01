package com.kozmicblog.awardio.controller;

import com.kozmicblog.awardio.model.Show;
import com.kozmicblog.awardio.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/shows")
public class ShowController {
  @Autowired
  private ShowService showService;

  @GetMapping
  public List<Show> shows() {
    var showIter = showService.getAllShows();

    showIter.forEach(show -> show.setAwards(null));

    return StreamSupport
      .stream(showIter.spliterator(), false)
      .collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public Show show(@PathVariable("id") Integer id) {
    return showService.getShowById(id);
  }

  @DeleteMapping("/{id}")
  public void removeShow(@PathVariable("id") Integer id) {
    showService.deleteShowById(id);
  }
}