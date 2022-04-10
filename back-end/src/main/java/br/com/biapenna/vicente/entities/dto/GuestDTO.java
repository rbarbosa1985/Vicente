package br.com.biapenna.vicente.entities.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import br.com.biapenna.vicente.entities.Dependent;
import br.com.biapenna.vicente.entities.Guest;

public class GuestDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String email;
	private Integer invitation;
	private Boolean status;
	private Instant updatedAt;
	private Instant createdAt;
	private String telephone;
	private List<DependentDTO> dependents = new ArrayList<>();

	public GuestDTO() {
		
	}

	public GuestDTO(Long id, String name, String email, Integer invitation, Boolean status, Instant updatedAt,
			Instant createdAt, String telephone) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.invitation = invitation;
		this.status = status;
		this.updatedAt = updatedAt;
		this.createdAt = createdAt;
		this.telephone = telephone;
	}
	
	public GuestDTO(Guest entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.invitation = entity.getInvitation();
		this.status = entity.getStatus();
		this.updatedAt = entity.getUpdatedAt();
		this.createdAt = entity.getCreatedAt();
		this.telephone = entity.getTelephone();
	}
	
	public GuestDTO(Guest entity, List<Dependent> list2) {
		this(entity);
		list2.forEach(tel -> this.dependents.add(new DependentDTO(tel)));
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getInvitation() {
		return invitation;
	}

	public void setInvitation(Integer invitation) {
		this.invitation = invitation;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public List<DependentDTO> getDependents() {
		return dependents;
	}

	public void setDependents(List<DependentDTO> dependents) {
		this.dependents = dependents;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}
}
