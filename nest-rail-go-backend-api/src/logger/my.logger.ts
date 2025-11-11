import { LoggerService, LogLevel } from '@nestjs/common'
import { createLogger, format, Logger, transports } from 'winston'
import dayjs from 'dayjs'
import chalk from 'chalk'

export class MyLogger implements LoggerService {
  private logger: Logger
  constructor() {
    this.logger = createLogger({
      level: 'debug',
      // format: format.combine(
      //   format.colorize(),
      //   format.timestamp(),
      //   format.simple(),
      // ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, message, level, time }) => {
              const strApp = chalk.green('[NEST]')
              const strContext = chalk.yellow(`[${context}]`)
              
              return `${strApp} - ${time} ${level} ${strContext} ${message}`
            }),
          ),
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          dirname: 'log',
          filename: 'demo.dev.log',
        }),
      ],
    })
  }

  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss')
    this.logger.log('info', message, { context, time })
  }
  error(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss')
    this.logger.error('error', message, { context, time })
  }
  warn(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss')
    this.logger.warn('warn', message, { context, time })
  }
  debug?(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss')
    this.logger.debug('debug', message, { context, time })
  }
  verbose?(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss')
    this.logger.verbose('verbose', message, { context, time })
  }
  fatal?(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss')
    this.logger.log('fatal', message, { context, time })
  }
  setLogLevels?(levels: LogLevel[]) {}
}
