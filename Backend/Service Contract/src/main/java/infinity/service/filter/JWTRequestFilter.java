package infinity.service.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import infinity.service.implementation.AuthService;
import infinity.service.implementation.UserDetailService;
import infinity.service.utils.JWTUtil;

public class JWTRequestFilter extends OncePerRequestFilter {

	private JWTUtil jwtUtil = new JWTUtil();

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		final String authorizationHeader = request.getHeader("Authorization");

		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			String jwt = authorizationHeader.substring(7);
			String id = jwtUtil.extractId(jwt);

			if (id != null && SecurityContextHolder.getContext().getAuthentication() == null) {

				infinity.service.user.User user = new UserDetailService().loadUserById(UUID.fromString(id));

				if (jwtUtil.validateToken(jwt, user)) {
					AuthService.authorize(request, response, user);
				}

			}
		}

		filterChain.doFilter(request, response);

	}

}
