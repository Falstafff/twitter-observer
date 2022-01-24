import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class ExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    Logger.log('exception:filter');
    Logger.log('exception', exception);
    Logger.log('host', host);
    Logger.log('>>>>>>>>');
  }
}
