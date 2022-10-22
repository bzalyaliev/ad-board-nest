
import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';


@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) { }

  /*
  
  */
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return await this.authenticationService.register(registrationData);
  }

  /*

Обрабатывает Passport

Отправляем токен в заголовок ответа Set-Cookie после успешной аутентификации 
UseGuards: требуем проходить аутентификацию
  */
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }


  /*
  Выход из системы - удалить токен из браузера.
  */
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  /*
  Проверка веб-токенов JSON и возврат пользовательских данных. 
  Браузер может проверить, действителен ли текущий токен, и получить данные текущего пользователя, вошедшего в систему.
  */
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

}