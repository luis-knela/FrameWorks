import { JwtService } from "@nestjs/jwt";
import { FindUserByEmailRepository } from "../repository";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly jwtService: JwtService,
        private readonly logger: Logger,
    ) {}   
    
    async execute(data: LoginDto) {
        this.logger.log(`Logging in user...`);

        const existingUser = await this.findUserByEmailRepository.findByEmail(
            data.email
        );
        if (!existingUser) {
            throw new BadRequestException("Invalid credentials");
        }    
        const passwordValid = await bcrypt.compare(data.password, existingUser.passwordHash) 
        if (!passwordValid) {
            throw new BadRequestException("Invalid credentials");
        }   

        const payload = { sub: existingUser.id, email: existingUser.email };
        const acesstoken = this.jwtService.sign(payload);

        this.logger.log(`User logged in successfully!`);

        return {acesstoken, payload}
    }
}


