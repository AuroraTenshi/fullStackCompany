package hu.elte.company.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String phone;

    @Column
    private Integer payment;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;

    enum Role {
        EMPLOYEE,
        EMPLOYER,
        GUEST
    }

    @ManyToOne
    @JsonIgnore
    private Site site;

    @ManyToMany
    @JsonIgnore
    @JoinColumn
    private List<Project> projects;
}
