import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/ayth/local.auth.guard';
import { AuthenticatedGuard } from 'src/ayth/authenticated.guard';
import { LoginCheckUserResponse, LoginUserRequest, LoginUserResponce, LogoutUserResponse, SignupResponse } from './types';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiOkResponse({type: SignupResponse})
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiBody({type: LoginUserRequest})
    @ApiOkResponse({ type: LoginUserResponce})
    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    login(@Request() req ) {
        return { user: req.user, msg: 'Loggen in'};
    }

    @ApiOkResponse({type: LoginCheckUserResponse})
    @Get('/login-check')
    @UseGuards(AuthenticatedGuard)
    loginCheck(@Request() req ) {
        return req.user;
    }
    
    @ApiOkResponse({type: LogoutUserResponse})
    @Get('/logout')
    logout(@Request() req) {
        req.session.destroy();
        return { msg: 'session has ended' };
    }
}