import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('APP')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
