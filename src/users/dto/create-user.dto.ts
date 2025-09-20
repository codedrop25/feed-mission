import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, Length, Matches, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '사용자 ID (영문소문자, 숫자)',
    example: 'testuser1',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+$/, {
    message: 'ID는 영문 소문자, 숫자만 허용됩니다.',
  })
  userId: string;

  @ApiProperty({
    description: '사용자 이름 (한글, 영문대소문자)',
    example: '홍길동',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z가-힣]+$/, {
    message: '이름은 한글, 영문 대소문자만 허용됩니다.',
  })
  name: string;

  @ApiProperty({ description: '닉네임 (영문소문자)', example: 'gildong' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z]+$/, {
    message: '닉네임은 영문 소문자만 허용됩니다.',
  })
  nickname: string;

  @ApiProperty({
    description:
      '비밀번호 (영문소문자, 숫자, 특수문자 1개 이상 포함, 8자 이상)',
    example: 'password123!',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      '비밀번호는 영문 소문자, 숫자, 특수문자를 1개 이상 포함해야 합니다.',
  })
  password: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    example: 'https://picsum.photos/40/40?random=1',
  })
  @IsUrl({}, { message: '프로필 이미지는 유효한 URL이어야 합니다.' })
  @IsNotEmpty()
  profileImageUrl: string;
}
