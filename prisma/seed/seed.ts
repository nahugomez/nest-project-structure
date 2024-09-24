import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Limpiar la base de datos
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Crear Usuarios de Prueba
  const usersData: Prisma.UserCreateInput[] = [];

  for (let i = 0; i < 15; i++) {
    usersData.push({
      email: faker.internet.email(),
      name: faker.person.fullName(),
    });
  }

  const createdUsers = await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true,
  });

  console.log(`Created ${createdUsers.count} users.`);

  // Obtener todos los usuarios para asociarlos a los posts
  const allUsers = await prisma.user.findMany();

  // Crear Posts de Prueba
  const postsData: Prisma.PostCreateManyInput[] = [];

  for (let i = 0; i < 30; i++) {
    const randomUser = faker.helpers.arrayElement(allUsers);
    postsData.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(2),
      published: faker.datatype.boolean(),
      author_id: randomUser.id,
    });
  }

  const createdPosts = await prisma.post.createMany({
    data: postsData,
    skipDuplicates: true,
  });

  console.log(`Created ${createdPosts.count} posts.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
