## Video
Step by Step
[NestJS (25): BUID API tìm kiếm TỶ sản phẩm trên eCommerce với thiết kế chuẩn trong ELASTICSEARCH](https://youtu.be/sQb9aHBOVvs)

## Sơ đồ Quan hệ (ERD)

+---------------------+            +----------------------+
|      Product        |            |     ProductVariant   |
|---------------------|            |----------------------|
| id (PK)             |<---------->| id (PK)              |
| name                |            | sku (unique)         |
| slug (unique)       |            | price                |
| description         |            | stockQuantity        |
| createdAt           |            | productId (FK)       |
| updatedAt           |            | createdAt            |
+---------------------+            | updatedAt            |
                                   +----------------------+
                                            ^
                                            |
                                            |
                                            |
                           +----------------+----------------+
                           |                                 |
                           v                                 v
                 +-------------------+           +---------------------+
                 |     OptionValue   |<--------->| ProductVariantOption|
                 |-------------------|           | Value               |
                 | id (PK)           |           |---------------------|
                 | value             |           | productVariantId (PK, FK)|
                 | optionId (FK)     |           | optionValueId (PK, FK)  |
                 +-------------------+           +---------------------+
                           ^
                           |
                           |
                 +-------------------+
                 |      Option       |
                 |-------------------|
                 | id (PK)           |
                 | name (unique)     |
                 +-------------------+

## Docker MySQL and ElasticSearch OR CLOUD           

[Docker MySQL](https://www.youtube.com/watch?v=-UX_bz376UA&t=852s)
[ElasticSearch](https://www.youtube.com/watch?v=Bs41dR_Kf-0&t=266s)

## How to run

```bash
~ npm i
~ npx prisma migrate dev --name add_synonyms_to_optionvalue

~ npm run start:dev
```

## How to test

Open file: "./test/api.test.http"