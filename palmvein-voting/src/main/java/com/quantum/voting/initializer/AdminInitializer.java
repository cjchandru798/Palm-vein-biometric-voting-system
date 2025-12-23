package com.quantum.voting.initializer;

import com.quantum.voting.entity.Admin;
import com.quantum.voting.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;

    @Override
    public void run(String... args) {
        if (adminRepository.count() == 0) {
            Admin defaultAdmin = new Admin();
            defaultAdmin.setUsername("admin1");
            defaultAdmin.setPassword("admin123");
            adminRepository.save(defaultAdmin);
            System.out.println("Default admin created: username=admin1, password=admin123");
        }
    }
}
