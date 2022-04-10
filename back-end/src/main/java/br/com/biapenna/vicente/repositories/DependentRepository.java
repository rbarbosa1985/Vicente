package br.com.biapenna.vicente.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.biapenna.vicente.entities.Dependent;

@Repository
public interface DependentRepository extends JpaRepository<Dependent, Long> {
	
}

