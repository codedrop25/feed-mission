import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: '게시물 내용 (최대 280자)',
    example: '내용을 수정합니다.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  content: string;
}
