import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email';
import { EmailService } from './email.service';
import { Email } from './email.entity';
import { UpdateEmailDto } from './dto/update-email.dto';

@Controller('emails')
export class EmailController {

  constructor(private emailService: EmailService) {}


  @Get()
  getEmails(): 
  Promise<Email[]>{
    return this.emailService.getEmails()
  }

  @Get(':id')
  getEmail(@Param('id', ParseIntPipe) id: number) {
    return this.emailService.getEmail(id)
  }

  @Post()
  createEmail(@Body() newEmail: CreateEmailDto):
  Promise<Email>{
    return this.emailService.createEmail(newEmail)
  }

  @Delete(':id')
  deleteEmail(@Param('id', ParseIntPipe) id: number) {
    return this.emailService.deleteEmail(id)
  }

  @Patch(':id')
  updateEmail(@Param('id', ParseIntPipe) id: number, @Body() 
  email: UpdateEmailDto) {
    return this.emailService.updateEmail(id, email)
  }

}
