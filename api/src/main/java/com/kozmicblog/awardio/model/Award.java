package com.kozmicblog.awardio.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "awards")
public class Award {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column
  private String title = "Untitled";

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "fk_shows")
  @JsonBackReference
  private Show show;

  @OneToMany(
    mappedBy = "award",
    cascade = CascadeType.ALL,
    fetch = FetchType.LAZY
  )
  @JsonManagedReference
  private List<Entry> entries = new ArrayList<>();

  @Column(name = "fk_winner")
  private Integer winnerEntryId;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Show getShow() {
    return show;
  }

  public void setShow(Show show) {
    this.show = show;
  }

  public List<Entry> getEntries() {
    return entries;
  }

  public void setEntries(List<Entry> entries) {
    this.entries = entries;
  }

  public Integer getWinnerEntryId() {
    return winnerEntryId;
  }

  public void setWinnerEntryId(Integer winnerEntryId) {
    this.winnerEntryId = winnerEntryId;
  }
}