package infinity.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

import infinity.service.exception.FaultException;

@SpringBootApplication
public class InfinityServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InfinityServiceApplication.class, args);
	}

}
