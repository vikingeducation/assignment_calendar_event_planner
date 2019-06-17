SELECT "Calendar"."id",
  "Calendar"."name",
  "Calendar"."userId",
  "Calendar"."createdAt",
  "Calendar"."updatedAt",
  "Calendar"."UserId",
  "User"."id" AS "User.id",
  "User"."fname" AS "User.fname",
  "User"."lname" AS "User.lname",
  "User"."username" AS "User.username",
  "User"."email" AS "User.email",
  "User"."createdAt" AS "User.createdAt",
  "User"."updatedAt" AS "User.updatedAt"
 FROM "Calendars" AS "Calendar"
 LEFT OUTER JOIN "Users" AS "User"
      ON "Calendar"."UserId" = "User"."id";
