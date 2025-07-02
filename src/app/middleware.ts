import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Перехватываем запросы вида /katalog/:category/:filterKey/:filterValue
  if (path.startsWith('/katalog/')) {
    const segments = path.split('/').filter(Boolean);
    const newUrl = new URL(`/shop/${segments[1]}`, request.url);
    
    // Обрабатываем фильтры
    for (let i = 2; i < segments.length; i += 2) {
      if (segments[i] && segments[i + 1]) {
        newUrl.searchParams.set(segments[i], segments[i + 1]);
      }
    }
    
    return NextResponse.rewrite(newUrl);
  }
  
  return NextResponse.next();
}