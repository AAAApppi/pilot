import { ApiProperty } from "@nestjs/swagger";

export class LoginUserRequest {
    @ApiProperty({ example: 'Ivan' })
    username: string

    @ApiProperty({ example: 'ivan123' })
    password: string
}

export class LoginUserResponce {
    @ApiProperty({
        example: {
            user: {
                userId: 1,
                username: 'Ivan',
                password: 'ivan123',

            }
        }
    })
    user: {
        userId: number,
        username: string,
        password: string,

    };

    @ApiProperty({ example: 'Loggen in' })
    msg: string
}

export class LogoutUserResponse {
    @ApiProperty({ example: 'session has ended' })
    msg: string;
}

export class LoginCheckUserResponse {
    @ApiProperty({ example: 1 })
    userId: number

    @ApiProperty({ example: 'Ivan' })
    username: string

    @ApiProperty({ example: 'ivan@gmal.com' })
    email: string
}

export class SignupResponse {
    @ApiProperty({ example: 1 })
    userId: number

    @ApiProperty({ example: 'Ivan' })
    username: string

    @ApiProperty({ example: '$2b$10$rN5fYKqKwvTZ.LAY8RWzee9eFyYxLyr1H65lGr68RzjwJJaL4E2ge' })
    password: string

    @ApiProperty({ example: 'ivan@gmal.com' })
    email: string

    @ApiProperty({ example: '2023-05-11T08:01:14.501Z' })
    updatedAt: string

    @ApiProperty({ example: '2023-05-11T08:01:14.501Z' })
    emcreatedAtail: string

}