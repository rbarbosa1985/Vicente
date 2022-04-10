package br.com.biapenna.vicente.services;

import java.util.ArrayList;
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
import br.com.biapenna.vicente.entities.Guest;
import br.com.biapenna.vicente.entities.Role;
import br.com.biapenna.vicente.entities.User;
import br.com.biapenna.vicente.entities.dto.DependentDTO;
import br.com.biapenna.vicente.entities.dto.GuestDTO;
import br.com.biapenna.vicente.entities.dto.RoleDTO;
import br.com.biapenna.vicente.entities.dto.UserDTO;
import br.com.biapenna.vicente.entities.dto.UserInsertDTO;
import br.com.biapenna.vicente.repositories.DependentRepository;
import br.com.biapenna.vicente.repositories.GuestRepository;
import br.com.biapenna.vicente.repositories.RoleRepository;
import br.com.biapenna.vicente.repositories.UserRepository;
import br.com.biapenna.vicente.services.exceptions.DatabaseException;
import br.com.biapenna.vicente.services.exceptions.ResourceNotFoundException;

@Service
public class GuestService {
	
	@Autowired
	private GuestRepository repository;
	
	@Autowired
	private DependentRepository DependentRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserService userService;
	
	@Transactional(readOnly = true)
	public List<GuestDTO> findAll() {
		List<Guest> list = repository.findAll();
		return list.stream().map(x -> new GuestDTO(x, x.getDependents())).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public GuestDTO findById(Long id) {
		Optional<Guest> obj = repository.findById(id);
		Guest entity = obj.orElseThrow(() -> new ResourceNotFoundException("Convidado não encontrado!"));
		return new GuestDTO(entity, entity.getDependents());
	}
	
	@Transactional
	public GuestDTO insert (GuestDTO dto) {
		Guest entity = new Guest();
		copyDtoToEntity(dto, entity);
		
		UserInsertDTO user = new UserInsertDTO();
		user.setEmail(dto.getEmail());
		user.setFirstName(dto.getName());
		user.setPassword("123456");
		UserDTO usernew = new UserDTO();
		Role role = roleRepository.getOne((long) 1);
		List<Role> list = new ArrayList<>();
		list.add(role);
		user.setRoles(list.stream().map(x -> new RoleDTO(x)).collect(Collectors.toList()));
		usernew = userService.insert(user);
		User newuser = userRepository.getOne(usernew.getId());
		entity.setUser(newuser);
		entity = repository.save(entity);
		return new	GuestDTO(entity);
	}
	
	@Transactional
	public GuestDTO update(Long id, GuestDTO dto) {
		try {
			Guest entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity.setUser(userRepository.getOne(entity.getUser().getId()));
			entity = repository.save(entity);
			return new GuestDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Convidado com o id: " + id + " não encontrado!");	
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
	public Page<GuestDTO> findAllPaged(PageRequest pageRequest){
		Page<Guest> list = repository.findAll(pageRequest);
		return list.map(x -> new GuestDTO(x, x.getDependents()));
	}

	private void copyDtoToEntity(GuestDTO dto, Guest entity) {
		entity.setName(dto.getName());
		entity.setStatus(dto.getStatus());
		entity.setEmail(dto.getEmail());
		entity.setInvitation(dto.getInvitation());
		entity.setTelephone(dto.getTelephone());
		
		
		entity.getDependents().clear();
		for (DependentDTO dependto : dto.getDependents()) {
			Dependent dependet = DependentRepository.getOne(dependto.getId());
			entity.getDependents().add(dependet);
		}
	}

}
