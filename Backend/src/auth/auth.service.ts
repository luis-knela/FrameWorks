import { Injectable } from "@nestjs/common";
import { RegisterUseCase } from "./use-cases/register.use-cases";
import { LoginUseCase } from "./use-cases/login.use-cases";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase
    ) {}

    async register(data: RegisterDto) {
    return await this.registerUseCase.execute(data);
}

    async login(data: LoginDto) {
        return await this.loginUseCase.execute(data);
    }
}

