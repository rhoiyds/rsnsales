package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.ListingService;
import io.github.jhipster.application.domain.Listing;
import io.github.jhipster.application.domain.Tag;
import io.github.jhipster.application.domain.enumeration.ListingType;
import io.github.jhipster.application.repository.ListingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Listing}.
 */
@Service
@Transactional
public class ListingServiceImpl implements ListingService {

    private final Logger log = LoggerFactory.getLogger(ListingServiceImpl.class);

    private final ListingRepository listingRepository;

    public ListingServiceImpl(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    /**
     * Save a listing.
     *
     * @param listing the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Listing save(Listing listing) {
        log.debug("Request to save Listing : {}", listing);
        return listingRepository.save(listing);
    }

    /**
     * Get all the listings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Listing> findAll(Pageable pageable) {
        log.debug("Request to get all Listings");
        return listingRepository.findAllActive(pageable);
    }

    @Override
    public Page<Listing> findAllWithEagerRelationships(Pageable pageable) {
        log.debug("Request to get all Listings with eager relationship");
        return listingRepository.findAllWithEagerRelationships(pageable);
    }


    /**
     * Get one listing by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Listing> findOne(Long id) {
        log.debug("Request to get Listing : {}", id);
        return listingRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the listing by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Listing : {}", id);
        listingRepository.deleteById(id);
    }

    /**
     * Change all non-finished listings activation status.
     *
     * @param status the status to change listings to.
     */
    @Override
    public void changeOutstandingListingsStatus(List<Listing> completedListings, Boolean status) {
        log.debug("Updating outstanding listings");
        listingRepository.getOutstandingListings(completedListings).forEach(listing -> {
            listing.setActive(status);
            this.save(listing);
        });
    }

    @Override
    public Integer getTotalListingsCount() {
        return listingRepository.countTotalListingsForUser();
    }

    @Override
    public List<Listing> getMatches(Listing listing) {
        List<Listing> matches = listingRepository.findByRsnLikeOrTagsIn(listing.getRsn() != null ? listing.getRsn() : "", listing.getTags());
        matches = matches.stream().filter(l -> !l.equals(listing) && !l.getOwner().equals(listing.getOwner())).collect(Collectors.toList());
        return matches;
    }

    @Override
    public Long getTotalBuyingCount() {
        return this.listingRepository.countByTypeIsAndActiveTrue(ListingType.WANT);
    }

    @Override
    public Long getTotalSellingCount() {
        return this.listingRepository.countByTypeIsAndActiveTrue(ListingType.HAVE);
    }

    @Override
    public Long countByTag(Tag tag) {
        log.debug("For tag {} there is count {}", tag.getName(), this.listingRepository.countByTagsContainsAndActiveTrue(tag));
        return this.listingRepository.countByTagsContainsAndActiveTrue(tag);
    }

    @Override
    public List<String> getLatestTags() {
        return this.listingRepository.findTop10ByOrderByTimestampDesc().stream().map(listing -> listing.getTags().stream().map(Tag::getName)
            .collect(Collectors.toList()))
            .flatMap(List::stream)
            .distinct()
            .collect(Collectors.toList());
    }

}
