"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AllArticlesPage } from "@/components/articles/all-articles";
import CreateArticleForm  from "@/components/articles/create-article-form"; // You create this component
import { useSession } from "@clerk/nextjs";

export default function ArticlesPageWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { session } = useSession();
  const userId = session?.user.id;

  const view = searchParams.get("view") || "all";
  const heading = view === "my" ? "My Articles" : "All Articles";

  const handleViewChange = (type: string) => {
    router.push(`?view=${type}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-foreground">{heading}</h1>
          <div className="flex gap-3">
            <Button onClick={() => handleViewChange("create")}>
              Add New Article
            </Button>
            <Button onClick={() => handleViewChange("my")}>My Articles</Button>
            <Button onClick={() => handleViewChange("all")}>All Articles</Button>
          </div>
        </div>

        {/* View Switcher */}
        <Suspense fallback={<AllArticlesPageSkeleton />}>
          {view === "create" && <CreateArticleForm />}
          {view === "my" && <AllArticlesPage filterByUserId={userId} />}
          {view === "all" && <AllArticlesPage />}
        </Suspense>
      </main>
    </div>
  );
}

function AllArticlesPageSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="p-6">
            <Skeleton className="mb-4 h-48 w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />
            <div className="mt-6 flex items-center justify-between">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
