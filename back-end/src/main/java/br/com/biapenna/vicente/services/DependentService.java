package br.com.biapenna.vicente.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.biapenna.vicente.entities.Dependent;
import br.com.biapenna.vicente.entities.dto.DependentDTO;
import br.com.biapenna.vicente.repositories.DependentRepository;
import br.com.biapenna.vicente.repositories.GuestRepository;
import br.com.biapenna.vicente.services.exceptions.DatabaseException;
import br.com.biapenna.vicente.services.exceptions.ResourceNotFoundException;

@Service
public class DependentService {
	
	@Autowired
	private DependentRepository repository;
	
	@Autowired
	private GuestRepository guestRepository;
	
	@Transactional(readOnly = true)
	public List<DependentDTO> findAll() {
		List<Dependent> list = repository.findAll();
		return list.stream().map(x -> new DependentDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public DependentDTO findById(Long id) {
		Optional<Dependent> obj = repository.findById(id);
		Dependent entity = obj.orElseThrow(() -> new ResourceNotFoundException("Dependente não encontrado!"));
		return new DependentDTO(entity);
		
	}
	
	@Transactional
	public DependentDTO insert(DependentDTO dto) {
		Dependent entity = new Dependent();
		entity.setName(dto.getName());
		entity.setGuest(guestRepository.getOne(dto.getGuest()));
		entity = repository.save(entity);
		return new DependentDTO(entity);
	}
	
	@Transactional
	public DependentDTO update(Long id,DependentDTO dto) {
		try {
			Dependent entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new DependentDTO(entity);	
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Dependente com o id: " + id + " não encontrado!");	
		}
	}
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Convidado com o id: " + id + " não encontrado!");
		}
		catch(DataIntegrityViolationException e) {
			throw new DatabaseException("Convidado com o id: " + id + " não pode ser apagado, pois ainda possuem dependentes ou telefones cadastrados com esse convidado!");
		}
	}
	
	@Transactional(readOnly = true)
	public Page<DependentDTO> findAllPaged(PageRequest pageRequest){
		Page<Dependent> list = repository.findAll(pageRequest);
		return list.map( x -> new DependentDTO(x));
	}
	
}