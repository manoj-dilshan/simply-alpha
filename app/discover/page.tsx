import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Star, Globe } from 'lucide-react';

const stockData = [
  {
    category: 'Consumer Internet',
    stocks: [
      {
        name: 'Duolingo (DUOL)',
        sector: 'Consumer Subscription',
        price: '$473.78',
        change: '+0.02%',
        tags: ['High Quality', 'Timely Buy'],
        description: `Founded by a Carnegie Mellon computer science professor and his Ph.D. student, Duolingo (NASDAQ:DUOL) is a mobile app helping people learn new languages.`,
        reason: `Growing at a remarkable rate, Duolingo is set for sustained revenue, user, and ARPU gains thanks to its innovative product lineup. On top of that, its solid free cash flow generation gives it many reinvestment options. The stock is up 45.4% since the beginning of the year.`
      },
      {
        name: 'MercadoLibre (MELI)',
        sector: 'Online Marketplace',
        price: '$2,383.34',
        change: '+0.07%',
        tags: ['High Quality', 'Timely Buy'],
        description: `Originally started as an online auction platform, MercadoLibre (NASDAQ:MELI) is a one-stop e-commerce marketplace and fintech platform in Latin America.`,
        reason: `MercadoLibre is a world-class company. Its combination of high growth and extraordinary profitability makes it a beloved asset within investment circles.`
      },
      {
        name: 'Reddit (RDDT)',
        sector: 'Social Networking',
        price: '$114.82',
        change: '-0.26%',
        tags: ['High Quality', 'Timely Buy'],
        description: `Founded in 2005 by two University of Virginia roommates, Reddit (NYSE:RDDT) facilitates user-generated content across niche communities.`,
        reason: `Reddit is expanding at an incredible pace, with experts expecting its breakthrough products to fuel long-term growth.`
      },
    ]
  },
  {
    category: 'Consumer Retail',
    stocks: [
      {
        name: 'Lululemon (LULU)',
        sector: 'Apparel Retailer',
        price: '$248.61',
        change: '-1.47%',
        tags: ['High Quality', 'Timely Buy'],
        description: `Lululemon Athletica is a designer, distributor, and retailer of athletic apparel and accessories.`,
        reason: `Lululemon's brand and growth in activewear make it a top pick among consumers and investors.`
      },
      {
        name: 'Costco (COST)',
        sector: 'Large-format Grocery & General Merchandise Retailer',
        price: '',
        change: '',
        tags: ['High Quality'],
        description: `Costco is known for its membership warehouses and low-price strategy.`,
        reason: `Costco's loyal customer base and efficient operations offer long-term investment appeal.`
      },
      {
        name: `O'Reilly (ORLY)`,
        sector: 'Auto Parts Retailer',
        price: '$90.44',
        change: '+0.43%',
        tags: ['High Quality'],
        description: `O'Reilly Automotive is a retailer of automotive aftermarket parts, tools, supplies, equipment, and accessories.`,
        reason: `Strong fundamentals and consistent performance make O'Reilly a resilient stock.`
      },
    ]
  }
];

const Discover = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="stock"> <Sparkles className="mr-2 w-4 h-4" /> Stock of the Month</TabsTrigger>
          <TabsTrigger value="quality"> <Star className="mr-2 w-4 h-4" /> High Quality Stocks</TabsTrigger>
          <TabsTrigger value="all"> <Globe className="mr-2 w-4 h-4" /> All Stocks (1253)</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {stockData.map((category) => (
            <div key={category.category} className="mb-10">
              <h2 className="text-lg font-semibold text-muted-foreground mb-4 flex items-center">
                📂 {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {category.stocks.map((stock) => (
                  <Card key={stock.name}>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {stock.tags.map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                      <CardTitle>{stock.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-sm">
                        <span>{stock.sector}</span>
                        {stock.price && <span className="text-muted-foreground">{stock.price} <span className={stock.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}>({stock.change})</span></span>}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>{stock.description}</p>
                      <div>
                        <p className="font-semibold">📌 WHY WE LIKE IT:</p>
                        <p>{stock.reason}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Add content for other tabs if needed */}

      </Tabs>
    </div>
  );
};

export default Discover;
