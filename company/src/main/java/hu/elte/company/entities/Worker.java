package hu.elte.company.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.elte.company.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private Integer payment;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;


    @ManyToOne
    @JsonIgnore
    private Site site;

    @ManyToMany
//    @JsonIgnore
    @JoinTable
    private List<Project> projects;
}
