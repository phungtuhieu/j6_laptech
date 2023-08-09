package com.laptech.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
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
