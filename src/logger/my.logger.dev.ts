import { ConsoleLogger } from '@nestjs/common'

export class MyLoggerDev extends ConsoleLogger {
  log(message: unknown, context?: string) {
    console.log(`[${context}] |` + message)
  }
}
