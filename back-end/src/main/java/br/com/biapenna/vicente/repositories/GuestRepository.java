package br.com.biapenna.vicente.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.biapenna.vicente.entities.Guest;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
	
	@Query("SELECT DISTINCT obj FROM Guest obj WHERE "
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<Guest> find(String name, Pageable page);

	@Query(
			  value = "SELECT * FROM TB_GUEST where user_id = :id", 
			  nativeQuery = true)
	Guest findByUserId(Long id);
	
}

