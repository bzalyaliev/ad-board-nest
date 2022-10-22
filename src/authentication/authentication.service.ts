import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import TokenPayLoad from "./tokenPayload.interface";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  /* 
  Регистрация пользователя,
  создаём хэш hashedPassword, передаём его в user.service.create() метод вместе с остальными данными,
  если пользователь с таким e-mail существует, то бросить исключение
  createdUser.password = undefined - способ не отправлять пароль в ответ
  */
  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /*
  Вход в систему
  - проверяем, есть ли пользователь с таким паролем
  - проверяем пароль verifyPassword
  - возвращаем пользователя (без пароля)
  - если ошибка, то выбрасываем исключение
  */
  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  /*
  Проверка пароля
  - сравниваем захэшированный пароль и пароль, который пришёл от пользователя в методе bcrypt.compare
  - скорее всего пароль, который пришел тоже захэшируется и будет сравнен с захэшированным сохраненным паролем
  - при несовпадении ошибка
  */
  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  /*
  Создаём токен
  */
  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayLoad = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  
}