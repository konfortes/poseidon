import { Module, Global } from '@nestjs/common'
import { Logger } from './logger'

@Global()
@Module({
  providers: [Logger],
  exports: [Logger],
})
export class CommonModule {}
