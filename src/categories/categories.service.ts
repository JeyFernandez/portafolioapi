import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

import slugify from 'slugify';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  //metodo de crear categorias con try catch
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const slug = slugify(createCategoryDto.name, {
        lower: true,
        strict: true,
      });
      const newCategory = this.categoryRepository.create({
        ...createCategoryDto,
        slug,
      });
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${Category.name} not found`);
    }
    const editedCategory = Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(editedCategory);
  }
  async remove(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${Category.name} not found`);
    }
    return await this.categoryRepository.remove(category);
  }
}
