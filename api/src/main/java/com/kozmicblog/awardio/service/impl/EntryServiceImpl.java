package com.kozmicblog.awardio.service.impl;

import com.kozmicblog.awardio.model.Entry;
import com.kozmicblog.awardio.repository.AwardRepository;
import com.kozmicblog.awardio.repository.EntryRepository;
import com.kozmicblog.awardio.service.EntryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EntryServiceImpl implements EntryService {
  @Autowired
  private AwardRepository awardRepository;

  @Autowired
  private EntryRepository entryRepository;

  @Override
  public Entry createEntry(Integer awardId, Entry entry) {
    var award = awardRepository.findById(awardId).orElseThrow(EntityNotFoundException::new);

    entry.setAward(award);

    return entryRepository.save(entry);
  }
}
