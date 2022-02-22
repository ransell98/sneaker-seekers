package learn.sneaker_seekers.domain;

import learn.sneaker_seekers.data.AppUserRepository;
import learn.sneaker_seekers.models.AppUser;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService {

    private final AppUserRepository repository;
    private final PasswordEncoder encoder;

    public AppUserService(AppUserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public List<AppUser> findAll() {
        return repository.findAll();
    }

    public List<String> findAllRoles() {
        return repository.findAllRoles();
    }

    public AppUser findByUserName(String userName) {
        return repository.findByUsername(userName);
    }

    public Result<AppUser> add(AppUser user) {

        Result<AppUser> result = validateWithoutPassword(user);
        if (!result.isSuccess()) {
            return result;
        }

        result = validatePassword(user);
        if (!result.isSuccess()) {
            return result;
        }

        if (user.getId() != 0) {
            result.addErrorMessage("user id cannot be set before user creation");
            return result;
        }

        user.setPassword(encoder.encode(user.getPassword()));

        user = repository.add(user);
        if (user == null) {
            result.addErrorMessage("user not created.");
        }
        result.setPayload(user);

        return result;
    }

    public Result<AppUser> update(AppUser user) {
        Result<AppUser> result = validateWithoutPassword(user);
        if (!result.isSuccess()) {
            return result;
        }

        if (user.getId() <= 0) {
            result.addErrorMessage("user id must be set for update");
            return result;
        }

        boolean success = repository.update(user);
        if (!success) {
            result.addErrorMessage("user not updated");
        }

        return result;
    }

    public Result<AppUser> changePassword(AppUser user) {
        Result<AppUser> result = validatePassword(user);
        if (!result.isSuccess()) {
            return result;
        }

        if (user.getId() <= 0) {
            result.addErrorMessage("user id must be set to change password");
            return result;
        }

        user.setPassword(encoder.encode(user.getPassword()));
        boolean success = repository.changePassword(user);
        if (!success) {
            result.addErrorMessage("password not updated");
        }

        return result;
    }

    private Result<AppUser> validateWithoutPassword(AppUser user) {
        var result = new Result<AppUser>();

        if (user == null) {
            result.addErrorMessage("user cannot be null");
            return result;
        }

        if (user.getUsername() == null || user.getUsername().isBlank()) {
            result.addErrorMessage("username is required");
            return result;
        }

        var existing = repository.findByUsername(user.getUsername());
        if (existing != null && existing.getId() != user.getId()) {
            result.addErrorMessage("username is already in use");
            return result;
        }

        return result;
    }

    private Result<AppUser> validatePassword(AppUser user) {

        var result = new Result<AppUser>();

        if (user == null) {
            result.addErrorMessage("user cannot be null");
            return result;
        }

        if (user.getPassword() == null || user.getPassword().isBlank() || user.getPassword().length() < 8) {
            result.addErrorMessage("password must be at least 8 characters");
            return result;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : user.getPassword().toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        if (digits == 0 || letters == 0 || others == 0) {
            result.addErrorMessage("password must contain a digit, a letter, and a non-digit/non-letter");
        }

        return result;
    }
}
