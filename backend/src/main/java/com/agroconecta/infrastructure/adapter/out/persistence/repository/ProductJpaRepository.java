package com.agroconecta.infrastructure.adapter.out.persistence.repository;

import com.agroconecta.domain.model.ProductCategory;
import com.agroconecta.infrastructure.adapter.out.persistence.entity.ProductJpaEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductJpaRepository extends JpaRepository<ProductJpaEntity, Long> {

    Page<ProductJpaEntity> findByOwnerId(Long ownerId, Pageable pageable);

    long countByOwnerIdAndActiveTrue(Long ownerId);

    long countByActiveTrue();

    List<ProductJpaEntity> findTop6ByActiveTrueOrderByCreatedAtDesc();

    Optional<ProductJpaEntity> findByIdAndActiveTrue(Long id);

    Page<ProductJpaEntity> findByActiveTrue(Pageable pageable);

    Page<ProductJpaEntity> findByActiveTrueAndCategory(ProductCategory category, Pageable pageable);

    @Query("""
            select p from ProductJpaEntity p
            where p.active = true
              and (lower(p.name) like lower(concat('%', :search, '%'))
                   or lower(p.description) like lower(concat('%', :search, '%')))
            """)
    Page<ProductJpaEntity> searchActiveByText(@Param("search") String search, Pageable pageable);

    @Query("""
            select p from ProductJpaEntity p
            where p.active = true
              and (lower(p.name) like lower(concat('%', :search, '%'))
                   or lower(p.description) like lower(concat('%', :search, '%')))
              and p.category = :category
            """)
    Page<ProductJpaEntity> searchActiveByTextAndCategory(@Param("search") String search,
                                                         @Param("category") ProductCategory category,
                                                         Pageable pageable);
}
