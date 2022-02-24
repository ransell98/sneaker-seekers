package learn.sneaker_seekers.security;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@EnableWebSecurity
@ConditionalOnWebApplication
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.cors();

        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/health_check").permitAll()
                .antMatchers(HttpMethod.POST, "/authenticate", "/encode", "/user/create").permitAll()
                .antMatchers(HttpMethod.GET, "/user/{username}").permitAll()
                .antMatchers(HttpMethod.POST, "/refresh_token").authenticated()
                .antMatchers(HttpMethod.GET, "/sneakerseekers/brand").permitAll()
                .antMatchers(HttpMethod.POST, "/sneakerseekers/brand").hasAnyAuthority("VENDOR", "ADMIN")
                .antMatchers(HttpMethod.GET, "/sneakerseekers/condition").permitAll()
                .antMatchers(HttpMethod.GET, "/sneakerseekers/event").permitAll()
                .antMatchers(HttpMethod.POST, "/sneakerseekers/event").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/sneakerseekers/favorite/{id}").hasAnyAuthority("USER", "VENDOR", "ADMIN")
                .antMatchers(HttpMethod.POST, "/sneakerseekers/favorite").hasAnyAuthority("USER", "VENDOR", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/sneakerseekers/favorite/{id}").hasAnyAuthority("USER", "VENDOR", "ADMIN")
                .antMatchers(HttpMethod.GET, "/sneakerseekers/follow/{id}").hasAnyAuthority("USER", "VENDOR", "ADMIN")
                .antMatchers(HttpMethod.POST, "/sneakerseekers/follow").hasAnyAuthority("USER", "VENDOR", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/sneakerseekers/follow/{followerId}/{vendorId}").hasAnyAuthority("USER", "VENDOR", "ADMIN")
                .antMatchers(HttpMethod.GET, "/sneakerseekers/listing/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/sneakerseekers/listing").hasAnyAuthority( "VENDOR", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/sneakerseekers/listing/{id}").hasAnyAuthority("VENDOR", "ADMIN")
                .antMatchers(HttpMethod.GET, "/sneakerseekers/location/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/sneakerseekers/location").hasAnyAuthority( "ADMIN")
                .antMatchers(HttpMethod.GET, "/sneakerseekers/style/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/sneakerseekers/style").hasAnyAuthority( "VENDOR","ADMIN")
                .antMatchers(HttpMethod.GET, "/sneakerseekers/table/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/sneakerseekers/table").hasAnyAuthority( "VENDOR","ADMIN")
                .antMatchers(HttpMethod.PUT, "/sneakerseekers/table/{id}").hasAnyAuthority("VENDOR", "ADMIN")
                .antMatchers(HttpMethod.GET, "/sneakerseekers/upgraderequest").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/sneakerseekers/upgraderequest").hasAnyAuthority( "USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/sneakerseekers/upgraderequest/{id}").hasAnyAuthority("ADMIN")
                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

}
