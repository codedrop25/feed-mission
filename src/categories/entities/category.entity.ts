import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    unique: true,
    comment: '카테고리 이름 (영화, 드라마, 음악 등)'
  })
  name: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
