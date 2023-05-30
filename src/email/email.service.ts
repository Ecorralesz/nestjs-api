import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from './email.entity';
import { Repository } from 'typeorm';
import { CreateEmailDto } from './dto/create-email';
import { UpdateEmailDto } from './dto/update-email.dto';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email) private emailRepository: Repository<Email>,
  ) {}

  createEmail(email: CreateEmailDto) {
    const newEmail = this.emailRepository.create(email);
    return this.emailRepository.save(newEmail);
  }

  getEmails() {
    return this.emailRepository.find();
  }

  async getEmail(id: number) {
    const emailFound = await this.emailRepository.findOne({
      where: {
        id: id,
      },
    });


    if(!emailFound) {
      return new HttpException('Email not found', HttpStatus.NOT_FOUND)
    };

    return emailFound;
  }

  async deleteEmail(id: number) {
    const emailFound = await this.emailRepository.findOne({
      where: {id}
    });

    if(!emailFound) {
      return new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    return this.emailRepository.delete({id});
    // const result = await this.emailRepository.delete({ id });

    // if(result.affected === 0) {
    //   return new HttpException('Email not found', HttpStatus.NOT_FOUND)
    // };

    // return result;
  }

  async updateEmail(id: number, email: UpdateEmailDto) {

    const emailFound = await this.emailRepository.findOne({
      where: {
        id
      }
    })

    if(!emailFound) {
      return new HttpException('Email not found', HttpStatus.NOT_FOUND)
    };

    const updatedEmail = Object.assign(emailFound, email)
    return this.emailRepository.save(updatedEmail);
  }
}