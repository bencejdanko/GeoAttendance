package GeoUnity.GeoAttendance.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TestDataLoad implements CommandLineRunner {
        private final StudentRepository repository;

        @Autowired
        public TestDataLoad(StudentRepository repository) {
            this.repository = repository;
        }

        @Override
        public void run(String... strings) throws Exception {

            this.repository.save(new Student("bence", "danko"));
        }

}
