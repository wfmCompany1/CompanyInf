package com.example.backend.mappers;

import com.example.backend.models.Company;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CompanyMapper {
    void insertCompany(Company company);

    List<Company> selectPrimeCompany();
}
