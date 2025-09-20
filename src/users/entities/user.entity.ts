import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    unique: true, 
    comment: '사용자 ID (영문소문자, 숫자)',
    name: 'user_id'
  })
  userId: string;

  @Column({ comment: '사용자 이름 (한글, 영문대소문자)' })
  name: string;

  @Column({ 
    unique: true, 
    comment: '사용자 닉네임 (영문소문자, 중복 불가)' 
  })
  nickname: string;

  @Column({ 
    select: false, 
    comment: '사용자 비밀번호 (암호화 저장)' 
  })
  password: string;

  @Column({ 
    comment: '프로필 이미지 URL',
    name: 'profile_image_url'
  })
  profileImageUrl: string;

  @CreateDateColumn({ 
    name: 'created_at',
    comment: '계정 생성일시' 
  })
  createdAt: Date;

  @UpdateDateColumn({ 
    name: 'updated_at',
    comment: '계정 수정일시' 
  })
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
