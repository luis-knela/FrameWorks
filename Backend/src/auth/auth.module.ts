import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { PrismaService } from "src/shared/databases/prisma.database";
import { Logger, Module } from "@nestjs/common";
import * as UseCases from './use-cases'
import * as Repositories from './repository'

const useCases = Object.values(UseCases);
const repository = Object.values(Repositories);

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d'},
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        PrismaService,
        Logger,
        ... repository,
        ... useCases,
    ]
})
export class AuthModule {}