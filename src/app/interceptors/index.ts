import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from './api/api.interceptor';

const interceptors = [
  ApiInterceptor,
];

const interceptorsProvider: Provider[] = interceptors.map(interceptor => ({
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: interceptor,
}));

export default interceptorsProvider;