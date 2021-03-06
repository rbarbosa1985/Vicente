package br.com.biapenna.vicente.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.biapenna.vicente.entities.User;
import br.com.biapenna.vicente.repositories.UserRepository;
import br.com.biapenna.vicente.resources.exceptions.ForbiddenException;
import br.com.biapenna.vicente.resources.exceptions.UnauthorizedException;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public User authenticated() {
		try {
			String username = SecurityContextHolder.getContext().getAuthentication().getName();
			return userRepository.findByEmail(username);
		}
		catch (Exception e) {
			throw new UnauthorizedException("Invalid User");
		}
	}
	
	public void validateSelfOrAdmin (Long userId) {
		User user = authenticated();
		
		if (!user.getId().equals(userId) && (!user.hasHole("ROLE_ADMIN"))) {
			throw new ForbiddenException("Access dined");
		}
	}
}
