package com.example.backend.controllers;

import com.example.backend.dtos.CompanyDto;
import com.example.backend.models.Company;
import com.example.backend.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompanyController {
    @Autowired
    CompanyService companyService;

    @PostMapping("/insertCompany")
    public String insertCompany(@RequestBody CompanyDto companyDto){
        this.companyService.insertCompany(companyDto);
        return "test";
    }

    @GetMapping("/selectPrimeCompany")
    public List<Company> selectPrimeCompany(){
        return companyService.selectPrimeCompany();
    }
}
