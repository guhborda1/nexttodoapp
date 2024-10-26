'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useRouter, useSearchParams } from 'next/navigation'

export interface PaginationProps {
  className?: string
  page?: string
  totalPages: number
  hasNextPage: boolean
}

export const PaginationComponent = (props: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { page = '1', totalPages, hasNextPage, className } = props
  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);
  const [newPage, setNewPage] = useState(currentPage);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', `${newPage}`);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }, [newPage, router, searchParams]);

  const handlePageChange = (pageNumber: number) => {
    setNewPage(pageNumber);
  };

  const renderPageButtons = () => {
    const delta = 1; // Reduced from 2 to 1 to show fewer buttons
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots.map((i, index) =>
      typeof i === 'number' ? (
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={i === currentPage ? "default" : "outline"}
          className={`w-10 h-10 p-0 ${i === currentPage ? 'dark:bg-primary-foreground text-white border-solid border-2 border-indigo-600 rounded-full' : 'dark:bg-primary-foreground dark:hover:bg-[#141d32] hover:border-solid hover:border-2 hover:border-indigo-600 dark:hover:text-white rounded-full'}`}
          aria-label={`Go to page ${i}`}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i}
        </Button>
      ) : (
        <Button key={`dots-${index}`} variant="ghost" className="w-10 h-10 p-0" disabled>
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More pages</span>
        </Button>
      )
    );
  };

  return (
    <nav className={`flex items-center justify-center space-x-2 ${className}`} aria-label="Pagination">
      {currentPage !== 1 && (
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          variant="outline"
          className="rounded-full text-center dark:bg-primary-foreground border-2 hover:border-solid hover:border-2 hover:border-indigo-600 dark:hover:text-white w-fit py-3 px-3"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      {renderPageButtons()}
      {currentPage !== totalPages && (
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          variant="outline"
          className="rounded-full text-center dark:bg-primary-foreground border-2 hover:border-solid hover:border-2 hover:border-indigo-600 dark:hover:text-white w-fit py-3 px-3"
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4 " />
        </Button>
      )}
    </nav>
  );
};