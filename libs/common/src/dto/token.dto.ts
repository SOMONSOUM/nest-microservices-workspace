export class TokenDto {
  userId: number;
}

export class ValidateRefreshTokenDto {
  userId: number;
  refreshToken: string;
}

export class ValidateRefreshTokenResponseDto {
  userId: number;
}
