import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.NonNull;

import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_student")
public class Student {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String firstName;
    private String lastName;
}