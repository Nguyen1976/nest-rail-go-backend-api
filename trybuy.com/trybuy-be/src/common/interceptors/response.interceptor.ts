import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

export interface StandardResponse<T> {
  statusCode: number;
  status: 'success' | 'error';
  message: string;
  data: T | null;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, StandardResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<StandardResponse<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();
    const statusCode = response.statusCode;

    return next
      .handle()
      .pipe(
        map(data => ({
          statusCode: statusCode,
          status: 'success',
          message: 'Request successful',
          data: data,
        })),
      );
  }
}