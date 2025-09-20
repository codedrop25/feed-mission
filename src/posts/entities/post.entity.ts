import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 280,
    comment: '게시물 내용 (최대 280자)',
  })
  content: string;

  @Column('simple-array', {
    nullable: true,
    name: 'image_urls',
    comment: '게시물 이미지 URL 배열 (최대 4개)',
  })
  imageUrls: string[];

  @CreateDateColumn({
    name: 'created_at',
    comment: '게시물 작성일시',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '게시물 수정일시',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({
    name: 'author_id',
    comment: '작성자 ID (User 테이블 참조)',
  })
  authorId: number;

  @ManyToOne(() => Category, (category) => category.posts, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({
    nullable: true,
    name: 'category_id',
    comment: '카테고리 ID (Category 테이블 참조)',
  })
  categoryId: number;

  // 상호작용 필드들
  @Column({
    default: 0,
    comment: '좋아요 수',
  })
  likes: number;

  @Column({
    default: 0,
    comment: '리트윗 수',
  })
  retweets: number;

  @Column({
    default: 0,
    name: 'comments_count',
    comment: '댓글 수',
  })
  commentsCount: number;

  // 사용 여부 (1: 사용, 0: 사용하지 않음/삭제됨)
  @Column({
    default: 1,
    name: 'is_used',
    comment: '사용 여부 (1: 사용중, 0: 삭제됨, Soft Delete용)',
  })
  isUsed: number;
}
