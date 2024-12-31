import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { tap } from 'rxjs';

const messagesToLog = new Set([
  'Group created successfully.',
  'You are not a member in this group.',
  'Specific message 2',
]);

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let myToken = localStorage.getItem('Token');
  if (myToken) {
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + myToken,
        'Content-Type': 'application/json',
      },
    });
  }
  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const onlyMessages = event.body.message;
        if (messagesToLog.has(onlyMessages)) {
          console.log(event.body.message);
        }
      }
    })
  );
};

//  return next(req).pipe(
//   catchError((error: HttpErrorResponse) => {
//     const errorMessage = setError(error);
//     console.log(errorMessage);
//     return throwError(errorMessage);
//   })
// );
// };
