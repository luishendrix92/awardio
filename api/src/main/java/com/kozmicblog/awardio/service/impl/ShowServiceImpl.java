package com.kozmicblog.awardio.service.impl;

import com.kozmicblog.awardio.model.Show;
import com.kozmicblog.awardio.repository.ShowRepository;
import com.kozmicblog.awardio.service.ShowService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShowServiceImpl implements ShowService {
  @Autowired
  private ShowRepository showRepository;

  @Override
  public Iterable<Show> getAllShows() {
    return showRepository.findAll();
  }

  @Override
  public Show getShowById(Integer id) {
    return showRepository.findById(id)
      .orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public void deleteShowById(Integer id) {
    showRepository.deleteById(id);
  }
}
