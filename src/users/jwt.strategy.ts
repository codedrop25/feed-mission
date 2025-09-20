import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * JWT 페이로드 인터페이스
 */
interface JwtPayload {
  sub: number;
  userId: string;
}
/**
 * JWT 토큰 인증 전략
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Authorization 에서 토큰 추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 토큰 만료 시간 검증
      ignoreExpiration: false,
      // JWT 서명 검증을 위한 비밀키 (.env의 JWT_SECRET 사용)
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
    });
  }

  /**
   * JWT 토큰이 유효할 때 호출되는 메서드
   */
  validate(payload: JwtPayload) {
    return {
      id: payload.sub, // 사용자 기본키 ID
      userId: payload.userId, // 사용자 로그인 ID
    };
  }
}
