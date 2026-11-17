package com.agroconecta.application.usecase;

import com.agroconecta.application.command.ChangePasswordCommand;
import com.agroconecta.application.command.UpdateProfileCommand;
import com.agroconecta.application.model.PageQuery;
import com.agroconecta.application.model.PageResult;
import com.agroconecta.application.port.in.UserUseCase;
import com.agroconecta.application.port.out.PasswordHasherPort;
import com.agroconecta.application.port.out.UserRepositoryPort;
import com.agroconecta.domain.exception.BusinessRuleException;
import com.agroconecta.domain.exception.ForbiddenException;
import com.agroconecta.domain.exception.NotFoundException;
import com.agroconecta.domain.model.Role;
import com.agroconecta.domain.model.User;
import com.agroconecta.domain.validation.DomainValidator;

import java.util.Objects;

public class UserService implements UserUseCase {

    private final UserRepositoryPort userRepository;
    private final PasswordHasherPort passwordHasher;

    public UserService(UserRepositoryPort userRepository, PasswordHasherPort passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    @Override
    public User getProfile(Long userId) {
        return requireUser(userId);
    }

    @Override
    public User updateProfile(Long userId, UpdateProfileCommand command) {
        User user = requireUser(userId);
        return userRepository.save(user.updateProfile(command.fullName(), command.phone(), command.location()));
    }

    @Override
    public void changePassword(Long userId, ChangePasswordCommand command) {
        User user = requireUser(userId);
        if (!passwordHasher.matches(command.currentPassword(), user.passwordHash())) {
            throw new BusinessRuleException("La contraseña actual no es correcta");
        }
        String newPassword = DomainValidator.password(command.newPassword());
        if (passwordHasher.matches(newPassword, user.passwordHash())) {
            throw new BusinessRuleException("La nueva contraseña debe ser diferente a la actual");
        }
        userRepository.save(user.withPasswordHash(passwordHasher.hash(newPassword)));
    }

    @Override
    public PageResult<User> listUsers(Long requesterId, PageQuery pageQuery) {
        requireAdministrator(requesterId);
        return userRepository.findAll(pageQuery);
    }

    @Override
    public User updateStatus(Long requesterId, Long targetUserId, boolean active) {
        requireAdministrator(requesterId);
        if (Objects.equals(requesterId, targetUserId)) {
            throw new BusinessRuleException("No puedes cambiar el estado de tu propia cuenta");
        }
        User target = requireUser(targetUserId);
        return userRepository.save(target.withStatus(active));
    }

    @Override
    public User updateRole(Long requesterId, Long targetUserId, Role role) {
        requireAdministrator(requesterId);
        if (Objects.equals(requesterId, targetUserId)) {
            throw new BusinessRuleException("No puedes cambiar el rol de tu propia cuenta");
        }
        if (role == null) {
            throw new BusinessRuleException("El rol es obligatorio");
        }
        User target = requireUser(targetUserId);
        return userRepository.save(target.withRole(role));
    }

    private User requireUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Usuario", userId));
    }

    private void requireAdministrator(Long requesterId) {
        User requester = requireUser(requesterId);
        if (requester.role() != Role.ADMINISTRADOR) {
            throw new ForbiddenException("Solo un administrador puede realizar esta acción");
        }
    }
}
