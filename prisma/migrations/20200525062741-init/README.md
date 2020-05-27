# Migration `20200525062741-init`

This migration has been generated by Ian de Jesus at 5/25/2020, 6:27:41 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."Post" (
    "content" TEXT   ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "published" BOOLEAN NOT NULL DEFAULT false ,
    "title" TEXT NOT NULL  
) 

CREATE TABLE "quaint"."User" (
    "email" TEXT NOT NULL  ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "name" TEXT   ,
    "password" TEXT NOT NULL  
) 

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200525062741-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,24 @@
+datasource db {
+  provider = "sqlite"
+  url      = "file:./dev.db"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Post {
+  id        Int     @id @default(autoincrement())
+  title     String
+  content   String?
+  published Boolean @default(false)
+  author    User?
+}
+
+model User {
+  id       Int     @id @default(autoincrement())
+  email    String  @unique
+  password String
+  name     String?
+  posts    Post[]
+}
```

