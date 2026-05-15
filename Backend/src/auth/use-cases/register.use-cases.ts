import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserRepository, FindUserByEmailRepository } from "../repository";
import { RegisterDto } from "../dto/register.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class RegisterUseCase {
    constructor(
        private readonly createUserRepository: CreateUserRepository,
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly jwtService: JwtService,
        private readonly logger: Logger,
    ) {}   
    
    async execute(data: RegisterDto) {
        this.logger.log(`Registering user...`);

        const existingUser = await this.findUserByEmailRepository.findByEmail(
            data.email
        );
        if (existingUser) {
            throw new BadRequestException("Email exists");
        }    
        const passwordHash = await bcrypt.hash(data.password, 10);
        
        const  user = await this.createUserRepository.create({
            name: data.name,
            email: data.email,
            passwordHash,
        });

        const payload = { sub: user.id, email: user.email };
        const acesstoken = this.jwtService.sign(payload);

        this.logger.log(`User registered successfully!`);

        return {acesstoken, payload}
    }
}