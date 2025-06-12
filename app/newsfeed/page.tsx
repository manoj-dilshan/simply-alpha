'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { StockNewsCard } from '@/components/newsfeed/StockNewsfeedCard';

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
};

const PAGE_SIZE = 10;

const Newsfeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(0);

  const fetchNews = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=stock+market&sortBy=publishedAt&pageSize=30&apiKey=6f9fdbedfda44228b85d1c074498f56e`
    );
    const data = await response.json();
    if (data.status === 'ok') {
      setArticles(data.articles);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const currentPageArticles = articles.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {currentPageArticles.map((article, idx) => (
        <StockNewsCard
          key={idx}
          title={article.title}
          description={article.description}
          source={article.source.name}
          publishedAt={new Date(article.publishedAt).toLocaleDateString()}
          category="Why It Moves"
          logoUrl={article.urlToImage} // You may use static logos if needed
          price="$361.49"
          priceChange="-3.42%"
        />
      ))}

      <div className="flex justify-between mt-8">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
          Previous
        </Button>
        <Button
          onClick={() =>
            setPage((p) => (p + 1) * PAGE_SIZE < articles.length ? p + 1 : p)
          }
          disabled={(page + 1) * PAGE_SIZE >= articles.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Newsfeed;
