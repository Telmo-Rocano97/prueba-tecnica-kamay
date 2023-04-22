import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { User } from 'src/interfaces/user.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';



@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly UserModel: Model<User>) {} 
    
    // Get  todos los Usuarios
    async getUsers(): Promise<User[]> {
        const users = await this.UserModel.find();
        return users;
    }
    
    // Get solo un usuario
    async getUser(_id: string): Promise<User> {
        const users = await this.UserModel.findById(_id); 
        return users;
    }

    // Post usuarios
    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = new this.UserModel(createUserDTO);
        return newUser.save();
    }


  
 //Delete usarios
     async deleteUser(_id: string): Promise<any> {
        const deletedUser= await this.UserModel.findOneAndDelete(_id);
    return deletedUser;
    }

    // Put 
    async updateUser(_id: number, createUserDTO: CreateUserDTO): Promise<User> {
        const updatedUser = await this.UserModel
                            .findByIdAndUpdate(_id, createUserDTO, {new: true});
        return updatedUser;
    }

}


