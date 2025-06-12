'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StockNewsCardProps = {
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  category: string;
  logoUrl?: string;
  price?: string;
  priceChange?: string;
};

export const StockNewsCard = ({
  title,
  description,
  source,
  publishedAt,
  category,
  logoUrl,
  price,
  priceChange,
}: StockNewsCardProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-start gap-4">
        {logoUrl && (
          <img src={logoUrl} alt="logo" className="w-10 h-10 rounded-full object-contain" />
        )}
        <div className="space-y-1">
          <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-md">
            {category}
          </span>
          <CardTitle className="text-xl font-semibold mt-1 leading-snug">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <p className="mb-2">{description}</p>
        <div className="flex justify-between items-center mt-4 text-xs">
          <div className="flex gap-2">
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{source}</span>
            {price && (
              <span className="text-blue-600 font-medium">
                {price} {priceChange && <span>({priceChange})</span>}
              </span>
            )}
          </div>
          <span className="text-gray-500">{publishedAt}</span>
        </div>
      </CardContent>
    </Card>
  );
};
