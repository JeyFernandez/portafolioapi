import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from './images/images.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { Image } from './images/entities/image.entity';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'profileDB',
      entities: [Image, Category],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ImagesModule,
    CategoriesModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
