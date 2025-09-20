import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description: '사용자 ID (영문소문자, 숫자)',
    example: 'testuser1',
  })
  @IsString()
  @IsNotEmpty({ message: 'ID를 입력해주세요.' })
  @Matches(/^[a-z0-9]+$/, {
    message: 'ID는 영문 소문자, 숫자만 허용됩니다.',
  })
  userId: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password123!',
  })
  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}
