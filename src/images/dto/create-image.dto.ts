import { IsString, IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
