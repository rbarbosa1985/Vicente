package br.com.biapenna.vicente.entities.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import br.com.biapenna.vicente.entities.Role;
import br.com.biapenna.vicente.entities.User;

public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
	private Long id;
	@NotBlank(message = "O campo nome não aceita um campo em branco!")
	private String firstName;
	private String lastName;
	
	@Email(message = "Digite um e-mail valido!")
	private String email;
	
	private List<RoleDTO> roles =  new ArrayList<>();
	
	public UserDTO() {
		
	}
	
	
	public UserDTO(Long id, String firstName, String lastName, String email) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}

	/*Como foi feito o Fetch no relacionamento o usuário 
	 * já traz os campos da tabela do relacionamento e assim
	 * consigo injetar ela direto sem precisar receber o Role
	 */
	public UserDTO(User entity) {
		this.id = entity.getId();
		this.firstName = entity.getFirstName();
		this.lastName = entity.getLastName();
		this.email = entity.getEmail();
		entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
	}
	
	public UserDTO(User entity, List<Role> list) {
		this.id = entity.getId();
		this.firstName = entity.getFirstName();
		this.lastName = entity.getLastName();
		this.email = entity.getEmail();
		list.forEach(role -> this.roles.add(new RoleDTO(role)));
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<RoleDTO> getRoles() {
		return roles;
	}


	public void setRoles(List<RoleDTO> list) {
		this.roles = list;
	}
	
	
	
}
