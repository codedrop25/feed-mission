import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsArray,
  IsUrl,
  ArrayMaxSize,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: '게시물 내용 (최대 280자)',
    example: '오늘 날씨가 좋네요!',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  content: string;

  @ApiProperty({
    description: '이미지 URL 배열 (최대 4개)',
    example: ['https://picsum.photos/500/300?random=1'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @ArrayMaxSize(4)
  @IsUrl({}, { each: true })
  imageUrls?: string[];

  @ApiProperty({ description: '카테고리 ID', example: 1 })
  @IsInt()
  categoryId: number;
}
