import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Acá lógica adicional aquí, como validar tokens, loguear datos, etc.
    console.log(`🤝 Solicitud a Usuarios: ${req.method} ${req.originalUrl}`);
    next();
  }
}
