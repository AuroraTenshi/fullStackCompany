package hu.elte.company.security;

import hu.elte.company.entities.Worker;
import hu.elte.company.repositories.WorkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final WorkerRepository workerRepository;

    @Override
    public UserDetails loadUserByUsername(String workerName) throws UsernameNotFoundException {
        Worker workerEntity = workerRepository.findByName(workerName).orElseThrow(
                () -> new RuntimeException("No worker found with name."));
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        switch (workerEntity.getRole()) {
            case GUEST:
                grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_GUEST"));
                break;
            case EMPLOYEE:
                grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_EMPLOYEE"));
                break;
            case EMPLOYER:
                grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_EMPLOYER"));
                break;
        }
        return User.withDefaultPasswordEncoder()
                .username(workerEntity.getName())
                .password(workerEntity.getPassword())
                .authorities(grantedAuthorities).build();

    }
}
