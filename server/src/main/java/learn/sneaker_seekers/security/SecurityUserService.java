package learn.sneaker_seekers.security;

import learn.sneaker_seekers.data.AppUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityUserService implements UserDetailsService {

    private final AppUserRepository userRepository;

    public SecurityUserService(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(username);

        if (user == null || !user.isEnabled()) {
            throw new UsernameNotFoundException("username " + username + " not found.");
        }

        return user;
    }
}
