import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(createImageDto: CreateImageDto) {
    const image = await this.imageRepository.create(createImageDto);
    await this.imageRepository.save(image);
    return image;
  }

  findAll() {
    return this.imageRepository.find();
  }

  findOne(id: string) {
    return this.imageRepository.findOneBy({ id });
  }
  async update(id: string, updateImageDto: UpdateImageDto) {
    const image = await this.imageRepository.findOneBy({ id });
    const editedImage = Object.assign(image, updateImageDto);
    return this.imageRepository.save(editedImage);
  }

  async remove(id: string) {
    const image = await this.imageRepository.findOneBy({ id });
    return this.imageRepository.remove(image);
    return `this image was deleted: ${image.name}`;
  }
}
