package com.kozmicblog.awardio.service.impl;

import com.kozmicblog.awardio.model.Show;
import com.kozmicblog.awardio.repository.ShowRepository;
import com.kozmicblog.awardio.service.ShowService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShowServiceImpl implements ShowService {
  @Autowired
  private ShowRepository showRepository;

  @Override
  public List<Show> getAllShows() {
    var showIter = showRepository.findAll(
      Sort.by(Sort.Direction.DESC, "id")
    );

    showIter.forEach(show -> show.setAwards(null));

    return new ArrayList<>(showIter);
  }

  @Override
  public Show getShowById(Integer id) {
    return showRepository.findById(id)
      .orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public Show createShow(Show show) {
    return showRepository.save(show);
  }

  @Override
  public void deleteShowById(Integer id) {
    showRepository.deleteById(id);
  }
}
