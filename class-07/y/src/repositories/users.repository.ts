import { db } from "@/db";
import { UserCreateModel, UserModel, users } from "@/db/schemas/user.schema";
import { eq } from "drizzle-orm";

export const findByUsername = (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username), // Match the username field.
  });
};

export const create = (user: UserCreateModel): Promise<UserModel> =>
  db
    .insert(users) // Insert into the users table
    .values(user) // Use the provided user data
    .returning() // Returns the inserted record (user)
    .then((res) => res?.[0]); // Get the first result
