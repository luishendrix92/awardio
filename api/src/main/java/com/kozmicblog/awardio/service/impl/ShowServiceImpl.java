package com.kozmicblog.awardio.service.impl;

import com.kozmicblog.awardio.model.Show;
import com.kozmicblog.awardio.repository.ShowRepository;
import com.kozmicblog.awardio.service.ShowService;
import jakarta.persistence.EntityManager;
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

  @Autowired
  private EntityManager entityManager;

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
    return (Show) entityManager
      .createQuery(
        "select distinct s " +
          "from Show s " +
          "left join fetch s.awards a " +
          "left join fetch a.entries e " +
          "left join fetch e.votes v " +
          "left join fetch v.voter " +
          "where s.id = :showId")
      .setParameter("showId", id)
      .getSingleResult();
  }

  @Override
  public Show createShow(Show show) {
    return showRepository.save(show);
  }

  @Override
  public Show updateShow(Integer id, Show show) {
    var toUpdate = showRepository.findById(id).orElseThrow(EntityNotFoundException::new);

    toUpdate.setTitle(show.getTitle());
    toUpdate.setDescription(show.getDescription());
    toUpdate.setImage(show.getImage());
    toUpdate.setAirDate(show.getAirDate());

    return showRepository.save(toUpdate);
  }

  @Override
  public void deleteShowById(Integer id) {
    showRepository.deleteById(id);
  }
}
