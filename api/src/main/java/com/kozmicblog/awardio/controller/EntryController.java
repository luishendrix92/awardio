package com.kozmicblog.awardio.controller;

import com.kozmicblog.awardio.model.Entry;
import com.kozmicblog.awardio.service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/entries")
public class EntryController {
  public record EntryDTO(String title, String description, String image, Integer awardId) {
  }

  @Autowired
  private EntryService entryService;

  @PostMapping
  public Entry create(@RequestBody EntryDTO entry) {
    Entry toInsert = new Entry();

    toInsert.setTitle(entry.title());
    toInsert.setDescription(entry.description());
    toInsert.setImage(entry.image());

    return entryService.createEntry(entry.awardId(), toInsert);
  }

  @PutMapping("/{id}")
  public Entry update(@PathVariable("id") Integer id, @RequestBody Entry entry) {
    return entryService.updateEntry(id, entry);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable("id") Integer id) {
    entryService.deleteEntry(id);
  }
}
