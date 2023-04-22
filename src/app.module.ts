import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule, MongooseModule.forRoot('mongodb://localhost/prueba_tecnica_kamay', {
      useNewUrlParser: true 
    })],
}) 

export class AppModule {}
