package com.example.backend.dtos;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CompanyDto {
    private Long companyUid;

    private String loginId;
    private String businessRegNo;
    private String companyName;
    private String contactPerson;
    private String contactPhoneNumber;
    private String contactEmail;

    private String address;
    private String addressDetail;

    private Integer targetNoAccidentDays;
    private Integer targetIncident;
    private Integer targetLaw;
    private Integer targetEtc;

    private String mainProcess;
    private String hasRequiredDocs;
}
