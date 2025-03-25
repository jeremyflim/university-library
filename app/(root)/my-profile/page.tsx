import React from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { desc, eq } from "drizzle-orm";

const Page = async () => {
  const session = await auth();

  const borrowJoinResult = await db
    .select()
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session?.user?.id))
    .orderBy(desc(borrowRecords.createdAt));

  const borrowedBooks = borrowJoinResult.map(
    (record) => record.books,
  ) as unknown as Book[];

  console.log(borrowedBooks);
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={borrowedBooks} />
    </>
  );
};
export default Page;
