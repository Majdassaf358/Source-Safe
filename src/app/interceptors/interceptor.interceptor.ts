import { HttpInterceptorFn } from '@angular/common/http';

export const testviewempInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken = localStorage.getItem('Token');
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${myToken}`,
    },
  });
  return next(cloneRequest);
};
