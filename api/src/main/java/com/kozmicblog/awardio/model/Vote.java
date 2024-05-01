package com.kozmicblog.awardio.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "votes")
public class Vote {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(columnDefinition = "text")
  private String comment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "fk_entries")
  @JsonBackReference
  private Entry entry;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "fk_users")
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private User voter;

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getId() {
    return id;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Entry getEntry() {
    return entry;
  }

  public void setEntry(Entry entry) {
    this.entry = entry;
  }

  public User getVoter() {
    return voter;
  }

  public void setVoter(User voter) {
    this.voter = voter;
  }
}
