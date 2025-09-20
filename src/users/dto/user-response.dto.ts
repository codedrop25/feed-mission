import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: '사용자 기본키 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '사용자 ID', example: 'testuser1' })
  userId: string;

  @ApiProperty({ description: '사용자 이름', example: '홍길동' })
  name: string;

  @ApiProperty({ description: '사용자 닉네임', example: 'gildong' })
  nickname: string;

  @ApiProperty({ 
    description: '프로필 이미지 URL', 
    example: 'https://picsum.photos/40/40?random=1' 
  })
  profileImageUrl: string;

  @ApiProperty({ description: '계정 생성일시' })
  createdAt: Date;

  @ApiProperty({ description: '계정 수정일시' })
  updatedAt: Date;

  constructor(user: any) {
    this.id = user.id;
    this.userId = user.userId;
    this.name = user.name;
    this.nickname = user.nickname;
    this.profileImageUrl = user.profileImageUrl;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
