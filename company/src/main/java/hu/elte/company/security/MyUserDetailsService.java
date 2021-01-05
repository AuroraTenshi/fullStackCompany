package hu.elte.company.security;

import hu.elte.company.entities.Worker;
import hu.elte.company.repositories.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private AuthenticatedWorker authenticatedWorker;

    @Override
    @Transactional(readOnly=true)
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Optional<Worker> oWorker=workerRepository.findByName(name);
        if(!oWorker.isPresent()){
            throw new UsernameNotFoundException(name);
        }
        Worker worker=oWorker.get();
        authenticatedWorker.setWorker(worker);
        Set<GrantedAuthority> grantedAuthorities=new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(worker.getRole().toString()));

        return new org.springframework.security.core.userdetails.User(worker.getName(), worker.getPassword(), grantedAuthorities);
    }
}
