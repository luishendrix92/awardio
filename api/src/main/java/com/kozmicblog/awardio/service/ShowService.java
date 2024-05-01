package com.kozmicblog.awardio.service;

import com.kozmicblog.awardio.model.Show;

import java.util.List;

public interface ShowService {
  List<Show> getAllShows();

  Show getShowById(Integer id);

  Show createShow(Show show);

  void deleteShowById(Integer id);
}
