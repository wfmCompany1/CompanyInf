package com.example.backend.services;

import com.example.backend.dtos.CompanyDto;
import com.example.backend.mappers.CompanyMapper;
import com.example.backend.models.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CompanyService {
    @Autowired
    CompanyMapper companyMapper;

    @Transactional
    public void insertCompany(CompanyDto dto) {

        Company company = Company.builder()
                // ▶ 아이디 (화면 name="id")
                // DTO 필드명이 id 라면 이렇게 매핑
                .loginId(dto.getLoginId())
                // DTO 필드명이 loginId 라면 아래처럼 사용
                // .loginId(dto.getLoginId())

                .businessRegNo(dto.getBusinessRegNo())
                .companyName(dto.getCompanyName())
                .contactPerson(dto.getContactPerson())
                .contactPhoneNumber(dto.getContactPhoneNumber())
                .contactEmail(dto.getContactEmail())

                // 주소
                .address(dto.getAddress())
                .addressDetail(dto.getAddressDetail())

                // 대시보드 목표 수치
                .targetNoAccidentDays(dto.getTargetNoAccidentDays())
                .targetIncident(dto.getTargetIncident())
                .targetLaw(dto.getTargetLaw())
                .targetEtc(dto.getTargetEtc())

                // 주요 공정
                .mainProcess(dto.getMainProcess())

                // 필수 제출 서류 여부 (Y/N)
                .hasRequiredDocs(dto.getHasRequiredDocs())
                .build();

        this.companyMapper.insertCompany(company);
    }

    public List<Company> selectPrimeCompany(){
        return companyMapper.selectPrimeCompany();
    }
}
