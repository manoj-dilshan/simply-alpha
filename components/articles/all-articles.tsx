import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";

type SearchPageProps = {
  filterByUserId?: string;
};

export async function AllArticlesPage({ filterByUserId }: SearchPageProps) {
  const { articles } = await fetchArticleByQuery("", 0, 100, filterByUserId);

  if (articles.length === 0) return <NoSearchResults />;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-6">
            {/* Image Container */}
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Article Content */}
            <h3 className="text-xl font-semibold text-foreground">
              {article.title}
            </h3>
            <p className="mt-2 text-muted-foreground">{article.category}</p>

            {/* Author & Metadata */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.imageUrl || ""} />
                  <AvatarFallback>
                    {article.author.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {article.author.name}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(article.createdAt).toDateString()}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Icon */}
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground">No Results Found</h3>

      {/* Description */}
      <p className="mt-2 text-muted-foreground">
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
}
