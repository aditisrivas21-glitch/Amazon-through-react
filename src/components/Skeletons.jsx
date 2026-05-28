import React from 'react';

// Single Product Card loading skeleton
export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800/80 shadow-sm h-full p-0 animate-pulse">
      {/* Image space */}
      <div className="aspect-square bg-slate-200 dark:bg-slate-800 w-full" />
      
      {/* Content details space */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category tag */}
        <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded-md mb-2" />
        
        {/* Title */}
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-11/12 mb-1.5" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 mb-3" />
        
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
        
        {/* Price & Action */}
        <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md mt-auto mb-4" />
        <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
};

// Grid container skeleton
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
};

// Product detail loading skeleton
export const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          </div>
        </div>

        {/* Text descriptions */}
        <div className="flex flex-col gap-4">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-11/12" />
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/3" />
          
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-md mt-2" />
          
          <hr className="border-slate-200 dark:border-slate-800 my-4" />
          
          <div className="h-6 w-28 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
          
          <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded-xl mt-4" />
          <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-xl mt-2" />
        </div>
      </div>
    </div>
  );
};
