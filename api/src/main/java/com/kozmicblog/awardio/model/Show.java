package com.kozmicblog.awardio.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "shows")
public class Show {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String title;

  @Column
  private String image = "https://www.tibs.org.tw/images/default.jpg";

  @Column(columnDefinition = "text")
  private String description;

  @Column(name = "air_date")
  @Temporal(TemporalType.DATE)
  private Date airDate;

  @OneToMany(
    mappedBy = "show",
    fetch = FetchType.LAZY,
    cascade = {
      CascadeType.PERSIST,
      CascadeType.DETACH,
      CascadeType.MERGE,
      CascadeType.REFRESH
    }
  )
  @JsonManagedReference
  @OrderBy("id DESC")
  private List<Award> awards = new ArrayList<>();

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Date getAirDate() {
    return airDate;
  }

  public void setAirDate(Date airDate) {
    this.airDate = airDate;
  }

  public List<Award> getAwards() {
    return awards;
  }

  public void setAwards(List<Award> awards) {
    this.awards = awards;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getId() {
    return id;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}
