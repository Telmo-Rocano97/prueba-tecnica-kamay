import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UsersService) { }

    //Agregar User: /user/create
    @Post('/create')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.createUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: 'El Usuario se a creado',
            user
        });
    }

    // Get Users /user
    // @Get('/list')
    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    // GET single users: /product/?
    @Get('/:_id')
    async getUser(@Res() res, @Param('_id') _id) {
        const user = await this.userService.getUser(_id);
        if (!user) throw new NotFoundException('El usuario no existe!');
        return res.status(HttpStatus.OK).json(user);
    }

    //Delete users: /delete?_id=?
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('_id') _id) {
        const userDeleted = await this.userService.deleteUser(_id);
        if (!userDeleted) throw new NotFoundException('El usuario no existe!!');
        return res.status(HttpStatus.OK).json({
            message: 'Usuario Eliminado',
            userDeleted
        });
    }

    // Update user: /user?_id=?
    @Put('/update')
    async updateUser(@Res() res, @Body() createUserDTO: CreateUserDTO, @Query('_id') _id) {
        const updatedUser = await this.userService.updateUser(_id, createUserDTO);
        if (!updatedUser) throw new NotFoundException('El usuario no existe!');
        return res.status(HttpStatus.OK).json({
            message: 'Usuario Actualizado',
            updatedUser 
        });
    }

}