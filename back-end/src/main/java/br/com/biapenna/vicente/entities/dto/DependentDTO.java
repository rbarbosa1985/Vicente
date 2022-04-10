package br.com.biapenna.vicente.entities.dto;

import java.io.Serializable;
import java.time.Instant;

import br.com.biapenna.vicente.entities.Dependent;

public class DependentDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private Instant updatedAt;
	private Instant createdAt;
	private Long guest;
	
	public DependentDTO() {
		
	}

	public DependentDTO(Long id, String name, Instant updatedAt, Instant createdAt, Long guest) {
		this.id = id;
		this.name = name;
		this.updatedAt = updatedAt;
		this.createdAt = createdAt;
		this.guest = guest;
	}
	
	public DependentDTO (Dependent entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.updatedAt = entity.getUpdatedAt();
		this.createdAt = entity.getCreatedAt();
		this.guest = entity.getGuest().getId();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Long getGuest() {
		return guest;
	}

	public void setGuest(Long guest) {
		this.guest = guest;
	}
	
	
}
