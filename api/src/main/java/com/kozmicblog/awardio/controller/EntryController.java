package com.kozmicblog.awardio.controller;

import com.kozmicblog.awardio.model.Entry;
import com.kozmicblog.awardio.service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/entries")
public class EntryController {
  public record EntryDTO(String title, String description, String image, Integer awardId) {
  }

  @Autowired
  private EntryService entryService;

  @PostMapping
  public Entry createEntry(@RequestBody EntryDTO entry) {
    Entry toInsert = new Entry();

    toInsert.setTitle(entry.title());
    toInsert.setDescription(entry.description());
    toInsert.setImage(entry.image());

    return entryService.createEntry(entry.awardId(), toInsert);
  }
}
