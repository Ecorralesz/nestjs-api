import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'aws.connect.psdb.cloud',
      port: Number(3306),
      username: 'xk9jom80dtw6v89pjkm0',
      password: 'pscale_pw_lorN6ClmRPMVk8UnVejOTeQDZDg8aoSUsmkbFOAmtME',
      database: 'kelloggs',
      entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    EmailModule,
  ],
   
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

