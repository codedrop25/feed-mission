import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostDto } from './dto/query-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  /**
   * 새로운 게시물을 생성합니다.
   * @param createPostDto 게시물 생성 DTO
   * @param userId 작성자 ID
   */
  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
      authorId: userId,
      isUsed: 1, // 등록시 기본값 1 (사용 중)
    });
    return this.postsRepository.save(post);
  }

  /**
   * 게시물 목록을 조회합니다.
   * @param queryDto 쿼리 DTO (페이지네이션, 필터링, 정렬)
   */
  async findAll(
    queryDto: QueryPostDto,
  ): Promise<{ data: Post[]; total: number }> {
    const { page = 1, limit = 10, categoryId, sort = 'desc' } = queryDto;
    const query = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.category', 'category')
      .select([
        'post.id',
        'post.content',
        'post.imageUrls',
        'post.createdAt',
        'post.likes',
        'post.retweets', 
        'post.commentsCount',
        'author.nickname',
        'author.profileImageUrl',
        'category.name',
      ])
      .where('post.isUsed = 1') // 사용 중인 게시물만 조회
      .skip((page - 1) * limit)
      .take(limit);

    if (categoryId) {
      query.andWhere('post.categoryId = :categoryId', { categoryId });
    }

    const order = sort === 'desc' ? 'DESC' : 'ASC';
    query.orderBy('post.createdAt', order);

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  /**
   * 특정 게시물을 상세 조회합니다.
   * @param id 게시물 ID
   */
  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id, isUsed: 1 }, // 사용 중인 게시물만 조회
      relations: ['author', 'category'],
    });
    if (!post) {
      throw new NotFoundException(`ID "${id}"인 게시물을 찾을 수 없습니다.`);
    }
    return post;
  }

  /**
   * 게시물을 수정합니다.
   * @param id 게시물 ID
   * @param updatePostDto 게시물 수정 DTO
   * @param userId 요청한 사용자 ID
   */
  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    userId: number,
  ): Promise<Post> {
    // 사용 중인 게시물만 조회
    const post = await this.postsRepository.findOne({
      where: { id, isUsed: 1 },
      relations: ['author', 'category'],
    });

    if (!post) {
      throw new NotFoundException(`ID "${id}"인 게시물을 찾을 수 없습니다.`);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('본인이 작성한 게시물만 수정할 수 있습니다.');
    }

    post.content = updatePostDto.content;
    return this.postsRepository.save(post);
  }

  /**
   * 게시물을 삭제합니다 (Soft Delete).
   * @param id 게시물 ID
   * @param userId 요청한 사용자 ID
   */
  async remove(id: number, userId: number): Promise<{ message: string }> {
    // 사용 중인 게시물만 조회
    const post = await this.postsRepository.findOne({
      where: { id, isUsed: 1 },
      relations: ['author', 'category'],
    });

    if (!post) {
      throw new NotFoundException(`ID "${id}"인 게시물을 찾을 수 없습니다.`);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('본인이 작성한 게시물만 삭제할 수 있습니다.');
    }

    // Soft Delete: isUsed를 0으로 변경
    post.isUsed = 0;
    await this.postsRepository.save(post);

    return { message: '게시물이 성공적으로 삭제되었습니다.' };
  }
}
