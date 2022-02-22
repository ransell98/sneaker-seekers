package learn.sneaker_seekers.controllers;

import learn.sneaker_seekers.domain.Result;
import learn.sneaker_seekers.domain.ResultType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ErrorResponse {

    public static <T> ResponseEntity<Object> build(Result<T> result) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (result.getStatus() == null || result.getStatus() == ResultType.INVALID) {
            status = HttpStatus.BAD_REQUEST;
        } else if (result.getStatus() == ResultType.NOT_FOUND) {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(result.getMessages(), status);
    }
}
