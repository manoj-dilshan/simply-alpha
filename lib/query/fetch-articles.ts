import { prisma } from "@/lib/prisma";

export const fetchArticleByQuery = async (
  searchText: string,
  skip: number,
  take: number,
  authorId?: string // Optional filter
) => {
  const whereClause = {
    AND: [
      authorId ? { authorId } : {}, // filter by user if given
      {
        OR: [
          { title: { contains: searchText, mode: "insensitive" } },
          { category: { contains: searchText, mode: "insensitive" } },
        ],
      },
    ],
  };

  const [articles, total] = await prisma.$transaction([
    prisma.articles.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            name: true,
            imageUrl: true,
            email: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.articles.count({
      where: whereClause,
    }),
  ]);

  return { articles, total };
};
