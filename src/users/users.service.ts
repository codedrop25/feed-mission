import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * 새로운 사용자를 생성합니다.
   * @param createUserDto 사용자 생성 DTO
   */
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { userId, nickname, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: [{ userId }, { nickname }],
    });

    if (existingUser) {
      if (existingUser.userId === userId) {
        throw new ConflictException('이미 사용중인 ID입니다.');
      }
      if (existingUser.nickname === nickname) {
        throw new ConflictException('이미 사용중인 닉네임입니다.');
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    return new UserResponseDto(newUser);
  }

  /**
   * ID로 사용자를 조회합니다. (로그인 시 사용)
   * @param userId 사용자 ID
   */
  async findOneByUserId(userId: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { userId },
      select: {
        id: true,
        userId: true,
        name: true,
        nickname: true,
        password: true, // 로그인 시에는 비밀번호도 조회
        profileImageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * PK로 사용자를 조회합니다. (프로필 조회 시 사용)
   * @param id 사용자 PK
   */
  async findOneById(id: number): Promise<User | null> {
    const result = await this.usersRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return result;
  }

  /**
   * 사용자 ID와 비밀번호로 사용자를 검증합니다.
   * @param userId 사용자 ID
   * @param pass 비밀번호
   */
  async validateUser(
    userId: string,
    pass: string,
  ): Promise<UserResponseDto | null> {
    const user = await this.findOneByUserId(userId);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return new UserResponseDto(user);
    }
    return null;
  }

  /**
   * 검증된 사용자에게 JWT 액세스 토큰을 발급합니다.
   * @param user 사용자 정보 객체
   */
  login(user: UserResponseDto) {
    const payload = { userId: user.userId, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
