-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imgUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "videoUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FeedItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "postId" TEXT,
    "imgId" TEXT,
    "videoId" TEXT,
    CONSTRAINT "FeedItem_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FeedItem_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FeedItem_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedItem_postId_key" ON "FeedItem"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "FeedItem_imgId_key" ON "FeedItem"("imgId");

-- CreateIndex
CREATE UNIQUE INDEX "FeedItem_videoId_key" ON "FeedItem"("videoId");
