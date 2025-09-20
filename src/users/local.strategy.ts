import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({ usernameField: 'userId' });
  }

  async validate(userId: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUser(userId, pass);
    if (!user) {
      throw new UnauthorizedException('ID 또는 비밀번호가 일치하지 않습니다.');
    }
    return user;
  }
}
