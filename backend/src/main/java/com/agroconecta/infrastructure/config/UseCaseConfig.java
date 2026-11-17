package com.agroconecta.infrastructure.config;

import com.agroconecta.application.port.in.ActivityUseCase;
import com.agroconecta.application.port.in.AuthUseCase;
import com.agroconecta.application.port.in.CropUseCase;
import com.agroconecta.application.port.in.DashboardUseCase;
import com.agroconecta.application.port.in.ExpenseUseCase;
import com.agroconecta.application.port.in.ParcelUseCase;
import com.agroconecta.application.port.in.ProductUseCase;
import com.agroconecta.application.port.in.ProductionUseCase;
import com.agroconecta.application.port.in.UserUseCase;
import com.agroconecta.application.port.out.ActivityRepositoryPort;
import com.agroconecta.application.port.out.CropRepositoryPort;
import com.agroconecta.application.port.out.ExpenseRepositoryPort;
import com.agroconecta.application.port.out.ParcelRepositoryPort;
import com.agroconecta.application.port.out.PasswordHasherPort;
import com.agroconecta.application.port.out.ProductRepositoryPort;
import com.agroconecta.application.port.out.ProductionRepositoryPort;
import com.agroconecta.application.port.out.TokenProviderPort;
import com.agroconecta.application.port.out.UserRepositoryPort;
import com.agroconecta.application.usecase.ActivityService;
import com.agroconecta.application.usecase.AuthService;
import com.agroconecta.application.usecase.CropService;
import com.agroconecta.application.usecase.DashboardService;
import com.agroconecta.application.usecase.ExpenseService;
import com.agroconecta.application.usecase.ParcelService;
import com.agroconecta.application.usecase.ProductService;
import com.agroconecta.application.usecase.ProductionService;
import com.agroconecta.application.usecase.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UseCaseConfig {

    @Bean
    public AuthUseCase authUseCase(UserRepositoryPort userRepository, PasswordHasherPort passwordHasher,
                                   TokenProviderPort tokenProvider) {
        return new AuthService(userRepository, passwordHasher, tokenProvider);
    }

    @Bean
    public UserUseCase userUseCase(UserRepositoryPort userRepository, PasswordHasherPort passwordHasher) {
        return new UserService(userRepository, passwordHasher);
    }

    @Bean
    public ParcelUseCase parcelUseCase(ParcelRepositoryPort parcelRepository) {
        return new ParcelService(parcelRepository);
    }

    @Bean
    public CropUseCase cropUseCase(CropRepositoryPort cropRepository, ParcelRepositoryPort parcelRepository) {
        return new CropService(cropRepository, parcelRepository);
    }

    @Bean
    public ActivityUseCase activityUseCase(ActivityRepositoryPort activityRepository,
                                           CropRepositoryPort cropRepository) {
        return new ActivityService(activityRepository, cropRepository);
    }

    @Bean
    public ExpenseUseCase expenseUseCase(ExpenseRepositoryPort expenseRepository,
                                         ParcelRepositoryPort parcelRepository,
                                         CropRepositoryPort cropRepository) {
        return new ExpenseService(expenseRepository, parcelRepository, cropRepository);
    }

    @Bean
    public ProductionUseCase productionUseCase(ProductionRepositoryPort productionRepository,
                                               CropRepositoryPort cropRepository) {
        return new ProductionService(productionRepository, cropRepository);
    }

    @Bean
    public ProductUseCase productUseCase(ProductRepositoryPort productRepository) {
        return new ProductService(productRepository);
    }

    @Bean
    public DashboardUseCase dashboardUseCase(ParcelRepositoryPort parcelRepository,
                                             CropRepositoryPort cropRepository,
                                             ExpenseRepositoryPort expenseRepository,
                                             ProductionRepositoryPort productionRepository,
                                             ProductRepositoryPort productRepository,
                                             ActivityRepositoryPort activityRepository) {
        return new DashboardService(parcelRepository, cropRepository, expenseRepository,
                productionRepository, productRepository, activityRepository);
    }
}
