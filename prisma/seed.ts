import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.post.create({
      data: {
        content: 'I like turtles',
        feedItem: {
          create: {
            type: 'post',
          }
        }
      },
    }),
    prisma.image.create({
      data: {
        imgUrl: 'https://fillmurray.lucidinternets.com/300/200',
        feedItem: {
          create: {
            type: 'image',
          }
        }
      },
    }),
    prisma.video.create({
      data: {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        feedItem: {
          create: {
            type: 'video',
          }
        }
      },
    })
  ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })