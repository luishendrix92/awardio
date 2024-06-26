package com.kozmicblog.awardio.service;

import com.kozmicblog.awardio.model.Entry;

public interface EntryService {
  Entry createEntry(Integer awardId, Entry entry);

  Entry updateEntry(Integer id, Entry entry);

  void deleteEntry(Integer id);
}
