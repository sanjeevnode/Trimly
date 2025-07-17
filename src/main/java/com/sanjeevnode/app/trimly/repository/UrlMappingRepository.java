package com.sanjeevnode.app.trimly.repository;

import com.sanjeevnode.app.trimly.model.UrlMapping;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UrlMappingRepository extends MongoRepository<UrlMapping, String> {
    Optional<UrlMapping> findByShortUrl(String shortUrl);
}
