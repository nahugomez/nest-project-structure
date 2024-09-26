import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersMiddleware } from './middlewares/users.middleware';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Aplica el middleware a todas las rutas de UsersController
    consumer.apply(UsersMiddleware).forRoutes(UsersController);
  }
}
