import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error && error.error.message) {
        alert(error.error.message);
      } else {
        alert('An unexpected error occurred');
      }
      return throwError(() => error);
    })
  );
};


