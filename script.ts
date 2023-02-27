import { Post, Image, Video, PrismaClient, FeedItem } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const results1 = await prisma.feedItem.findMany({
    include: {
      post: true,
      image: true,
      video: true,
    },
  })

  const feed1 = results1.map(item => {
    return item.post || item.image || item.video
  }) as (Post | Image | Video)[]
  
  console.log(feed1)

  const results2 = await prisma.$queryRaw`
    SELECT * FROM feedItem
    LEFT OUTER JOIN Post ON postId = Post.id
    LEFT OUTER JOIN Image ON imgId = Image.id
    LEFT OUTER JOIN Video ON videoId = Video.id;
  ` as (FeedItem & Post & Image & Video)[]

  const feed2 = results2.map(item => {
    switch (item.type) {
      case 'post':
        return {
          id: item.postId,
          content: item.content,
        }
      case 'image':
        return {
          id: item.imgId,
          imgUrl: item.imgUrl,
        }
      case 'video':
        return {
          id: item.videoId,
          videoUrl: item.videoUrl
        }
    }
  }) as (Post | Image | Video)[]

  console.log(feed2)

  const feed3 = await prisma.$queryRaw`
    SELECT id, content, null AS imgUrl, null AS videoUrl FROM Post
    UNION ALL
    SELECT id, null AS content, imgUrl, null AS videoUrl FROM Image
    UNION ALL
    SELECT id, null AS content, null AS imgUrl, videoUrl FROM Video;
  ` as (Post | Image | Video)[]

  console.log(feed3)
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