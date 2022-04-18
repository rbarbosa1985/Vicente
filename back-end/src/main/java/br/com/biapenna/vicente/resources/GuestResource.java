package br.com.biapenna.vicente.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.biapenna.vicente.entities.dto.GuestDTO;
import br.com.biapenna.vicente.services.GuestService;

@RestController
@RequestMapping(value = "/guests")
public class GuestResource {

	@Autowired
	private GuestService service;
	
	@GetMapping
	public ResponseEntity<Page<GuestDTO>> findAll(
			@RequestParam(value = "name", defaultValue = "") String name,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "name") String orderBy
			){
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);		
		Page<GuestDTO> list = service.findAllPaged(pageRequest, name.trim());
		return ResponseEntity.ok().body(list);
	}
	
//	@GetMapping
//	public ResponseEntity<List<GuestDTO>> findAll(){
//				
//		List<GuestDTO> list = service.findAll();
//		return ResponseEntity.ok().body(list);
//	}
	
	@GetMapping(value= "/dependent/{id}")
	public ResponseEntity<GuestDTO> findByUserId(@PathVariable Long id){
		GuestDTO guest = service.findByUserId(id);
		return ResponseEntity.ok().body(guest);
	}
	
	@PutMapping(value= "/dependent/{id}")
	public ResponseEntity<GuestDTO> insertConfirm(@PathVariable Long id, @RequestBody GuestDTO dto){
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping(value= "/{id}")
	public ResponseEntity<GuestDTO> findById(@PathVariable Long id){
		GuestDTO guest = service.findById(id);
		return ResponseEntity.ok().body(guest);
	}
	
	@PostMapping
	public ResponseEntity<GuestDTO> insert (@Valid @RequestBody GuestDTO dto){
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto); 
	}
	
	@PutMapping(value= "/{id}")
	public ResponseEntity<GuestDTO> update(@PathVariable Long id, @RequestBody GuestDTO dto){
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping(value= "/{id}")
	public ResponseEntity<GuestDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
