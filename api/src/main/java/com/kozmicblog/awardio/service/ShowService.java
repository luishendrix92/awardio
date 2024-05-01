package com.kozmicblog.awardio.service;

import com.kozmicblog.awardio.model.Show;

public interface ShowService {
  Iterable<Show> getAllShows();

  Show getShowById(Integer id);

  void deleteShowById(Integer id);
}
