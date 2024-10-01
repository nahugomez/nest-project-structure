# Estructura de Proyectos con NestJS

## Tabla de Contenidos

- [Introducción](#introducción)
- [Requisitos](#requisitos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Principios y Características](#principios-y-características)
  - [Modulos](#modulos)
  - [Controladores](#controladores)
  - [Servicios](#servicios)
- [Estructura de Directorios](#estructura-de-directorios)
- [Tecnologías Complementarias](#tecnologías-complementarias)
- [Test](#test)
- [Buenas Prácticas](#buenas-prácticas)
- [Contacto](#contacto)

## Introducción

Este repositorio contiene el código de ejemplo de implementación de una API realizada con NestJS para el manejo de usuarios y posts. El objetivo de este repositorio es proporcionar una base de código sólida y escalable, para el desarrollo de aplicaciones back-end con NestJS, y permitir una mejor comprensión de las funcionalidades de NestJS, tomando ventaja de sus características para promover la separación de responsabilidades, favorecer el mantenimiento y la escalabilidad de la aplicación.

## Requisitos

Para ejecutar el proyecto, se requiere tener instalados los siguientes softwares:

- Node.js (v18.x o superior)
- PNPM (v8.x o superior)
- PostgreSQL (v15.x o superior)

## Instalación y Configuración

Para instalar y configurar el proyecto, seguir los siguientes pasos:

1. Clonar el repositorio:

```bash
    git clone https://github.com/nahugomez/nest-project-structure.git
```

2. Instalar las dependencias:

```bash
    pnpm install
```

3. Ejecutar los comandos de la base de datos:

```bash
    pnpm run prisma:migrate
    pnpm run prisma:seed // Para crear los usuarios y los posts iniciales
```

4. Iniciar el servidor de desarrollo:

```bash
    pnpm run start:dev
```

5. Abrir el navegador y acceder a la API en `http://localhost:3000/api`.

## Principios y Características

El proyecto sigue las convenciones de diseño de NestJS, utilizando la estructura de directorios y archivos recomendada por la [documentación oficial](https://docs.nestjs.com/). Se utiliza la configuración de TypeScript para proporcionar un entorno de desarrollo más robusto y seguro.

### [Modulos](https://docs.nestjs.com/modules)

Los modulos de NestJS son clases anotadas con el decorador `@Module`. Todas las aplicaciones de NestJS tienen al menos un módulo raíz, que se utiliza como punto de entrada para la aplicación. En NestJS, los módulos son una forma de organizar el código de una aplicación, permitiendo una mejor organización y mantenimiento. Se usa para indicar las relaciones y dependencias entre diferentes componentes de la aplicación.

```typescript
@Module({
  imports: [UsersModule, PostsModule], // Importa los módulos de usuarios y posts
  controllers: [AppController], // Importa el controlador de la aplicación
  providers: [AppService], // Importa los servicios de la aplicación
})
export class AppModule {}
```

### [Controladores](https://docs.nestjs.com/controllers)

Los controladores son las clases anotadas con el decorador `@Controller`, encargados de manejar las solicitudes HTTP y proporcionar una respuesta. En NestJS, los controladores son una forma de separar la lógica de negocio de la implementación de la aplicación. Para cada ruta de la API, se crea un método dentro del controlador, junto con un decorador que expresa el verbo HTTP y la ruta correspondiente.

```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users found',
    type: ResponseUserDto,
  })
  findAll(@Query() query: FindUsersQueryDto): Promise<ResponseUserDto[]> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: ResponseUserDto,
  })
  findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: ResponseUserDto,
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.usersService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: ResponseUserDto,
  })
  remove(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.usersService.remove(+id);
  }
}
```

### [Servicios](https://docs.nestjs.com/providers)

Los servicios son las clases anotadas con el decorador `@Injectable`, que pueden ser inyectados en otros componentes de la aplicación. Los servicios son los encargados de la implementación de la lógica de negocio de la aplicación, y proporcionan una capa de abstracción entre el código de negocio y la capa de presentación.

```typescript
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<ResponseUserDto> {
    return this.prisma.user.create({
      data,
      include: { posts: true },
    });
  }

  async findAll(query: FindUsersQueryDto): Promise<ResponseUserDto[]> {
    const { take, skip, orderBy, order, filterBy, filter } = query;

    const findOptions: Prisma.UserFindManyArgs = {};

    if (take !== undefined) {
      findOptions.take = Number(take);
    }

    if (skip !== undefined) {
      findOptions.skip = Number(skip);
    }

    if (orderBy && order) {
      findOptions.orderBy = {
        [orderBy]: order,
      };
    }

    if (filterBy && filter) {
      findOptions.where = {
        [filterBy]: {
          contains: filter,
          mode: 'insensitive',
        },
      };
    }

    return this.prisma.user.findMany({
      ...findOptions,
      include: { posts: true },
    });
  }

  async findOne(id: number): Promise<ResponseUserDto | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<ResponseUserDto> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: { posts: true },
    });
  }

  async remove(id: number): Promise<ResponseUserDto> {
    return this.prisma.user.delete({
      where: { id },
      include: { posts: true },
    });
  }
}
```

## Estructura de Directorios

La estructura de directorios recomendada por la documentación oficial de NestJS es la siguiente:

```
src/
|
|   app.controller.ts
|   app.module.ts
|   app.service.ts
|   main.ts
|
+---general
|   \---interceptors
+---posts
|   |   posts.controller.ts
|   |   posts.module.ts
|   |   posts.service.ts
|   |
|   \---dto
|           BasePost.dto.ts
|           CreatePost.dto.ts
|           FindPostQuery.dto.ts
|           ResponsePost.dto.ts
|           UpdatePost.dto.ts
|           UserPostResponse.dto.ts
|
+---prisma
|       prisma.module.ts
|       prisma.service.ts
|
\---users
    |   users.controller.ts
    |   users.module.ts
    |   users.service.ts
    |
    +---dto
    |       BaseUser.dto.ts
    |       CreateUser.dto.ts
    |       FindUserQuery.dto.ts
    |       PostUserResponse.dto.ts
    |       ResponseUser.dto.ts
    |       UpdateUser.dto.ts
    |
    \---middlewares
            users.middleware.ts
```

## Tecnologías Complementarias

### PostgreSQL

Esta tecnología es una base de datos relacional de código abierto que se utiliza para la creación de aplicaciones web y móviles. Es una base de datos orientada a objetos que proporciona una estructura de datos relacional flexible y escalable, permitiendo la creación de modelos complejos y la integración de diferentes fuentes de datos. La elección de esta base de datos se debe a su licenciamiento open-source, y su amplia flexibilidad para hacerla una base de datos ideal para todo tipo de aplicaciones.

### Prisma

Uno de los ORM más populares y flexibles para Node.js, Prisma proporciona una forma de poder comunicarse con la base de datos por medio de la utilización de objetos de datos. Esto permite una mayor flexibilidad y facilidad en la creación de consultas y operaciones en la base de datos, lo que resulta en una aplicación más fácil de mantener y escalar.

### Class-validator y class-transformer

Estas librerías son utilizadas para validar y transformar objetos de datos. Esto permite a los desarrolladores de NestJS tener una mayor flexibilidad en la creación de validaciones y transformaciones de datos, lo que resulta en una aplicación más fácil de mantener y escalar.

## Test

Para la prueba de la aplicación, se utiliza Jest. Jest es una herramienta de pruebas de JavaScript que se utiliza para automatizar la ejecución de pruebas unitarias y integracionales. Se utiliza para asegurar que el código se comporta como se espera antes de que sea lanzado en producción. Al momento de querer crear un nuevo commit, previamente se ejecutará la prueba unitaria y integral para asegurar que el código esté en buenas condiciones. Si el código está correcto, se lanzará el commit.

Es importante que los desarrolladores a medida que vayan creando nuevas entidades y sus recursos asociados (servicios, controladores, etc.) se aseguren de que se estén probando todas las funcionalidades de la aplicación.

Para correr las pruebas unitarias, se utiliza el comando `pnpm run test`. Este comando ejecutará todos los tests unitarios de la aplicación y mostrará el resultado en la consola.

## Contacto

Ante cualquier duda o sugerencia, contactarme a través de [LinkedIn](https://www.linkedin.com/in/nahuel-gomez-suarez/)
