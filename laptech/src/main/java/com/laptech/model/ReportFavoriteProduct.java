package com.laptech.model;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportFavoriteProduct implements Serializable {
    @Id
    String name;
    String categoryName;
    Long numberOfLikes;
    Date startDate;
    Date endDate;
}
