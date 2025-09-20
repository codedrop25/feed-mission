import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginRequestDto } from './dto/login-request.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 회원가입
   * @param createUserDto
   */
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 409, description: '이미 사용중인 ID 또는 닉네임' })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }
  /**
   * 로그인
   * @param req
   */
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({
    status: 401,
    description: 'ID 또는 비밀번호가 일치하지 않습니다.',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: { user: UserResponseDto }) {
    return this.usersService.login(req.user);
  }

  /**
   * 사용자 프로필 조회
   */
  @ApiOperation({ summary: '사용자 프로필 조회' })
  @ApiResponse({
    status: 200,
    description: '프로필 조회 성공',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다.' })
  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findOneById(parseInt(id));
    return new UserResponseDto(user);
  }
}
