import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBearerAuth, 
  ApiResponse,
  ApiBody 
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostDto } from './dto/query-post.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 게시물 등록
   */
  @ApiOperation({ summary: '게시물 등록' })
  @ApiBearerAuth()
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, description: '게시물 등록 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(createPostDto, req.user.id);
  }

  /**
   * 게시물 목록 조회
   */
  @ApiOperation({ summary: '게시물 목록 조회' })
  @ApiResponse({ status: 200, description: '게시물 목록 조회 성공' })
  @Get()
  findAll(@Query() queryDto: QueryPostDto) {
    return this.postsService.findAll(queryDto);
  }

  /**
   * 게시물 상세 조회
   */
  @ApiOperation({ summary: '게시물 상세 조회' })
  @ApiResponse({ status: 200, description: '게시물 상세 조회 성공' })
  @ApiResponse({ status: 404, description: '게시물을 찾을 수 없습니다' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  /**
   * 게시물 수정
   */
  @ApiOperation({ summary: '게시물 수정' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdatePostDto })
  @ApiResponse({ status: 200, description: '게시물 수정 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiResponse({ status: 403, description: '권한 없음 (작성자만 수정 가능)' })
  @ApiResponse({ status: 404, description: '게시물을 찾을 수 없습니다' })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req,
  ) {
    return this.postsService.update(id, updatePostDto, req.user.id);
  }

  /**
   * 게시물 삭제 (Soft Delete)
   */
  @ApiOperation({ summary: '게시물 삭제' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: '게시물 삭제 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiResponse({ status: 403, description: '권한 없음 (작성자만 삭제 가능)' })
  @ApiResponse({ status: 404, description: '게시물을 찾을 수 없습니다' })
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/delete')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.postsService.remove(id, req.user.id);
  }
}
