import { PrismaClient } from './generated/prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      level: 'query',
      emit: 'stdout',
    },
  ],
})

const newSave = async () => {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  })
  await prisma.user.create({
    data: {
      name: 'Alice2',
      email: 'alice2@example.com',
    },
  })

  const users = await prisma.user.findMany()
  console.log('🚀 ~ index.ts:20 ~ users:', users)
}

const newPost = async () => {
  const user3 = await prisma.user.create({
    data: {
      name: 'Alice4',
      email: 'alice4@example.com',
      posts: {
        create: [
          {
            title: 'Hello World',
            content: 'This is my first post',
          },
          {
            title: 'Hello World 2',
            content: 'This is my second post',
          },
        ],
      },
    },
  })
  console.log('🚀 ~ index.ts:42 ~ user3:', user3)
}

newPost()
