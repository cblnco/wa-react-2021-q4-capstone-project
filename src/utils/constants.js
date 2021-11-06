export const API_BASE_URL = 'https://wizeline-academy.cdn.prismic.io/api/v2';
export const BANNERS_QUERY = `${encodeURIComponent(
  '[[at(document.type, "banner")]]'
)}&lang=en-us&pageSize=5`;
export const CATEGORIES_QUERY =
  '%5B%5Bat(document.type%2C%20%22category%22)%5D%5D&lang=en-us&pageSize=30';
export const FEATURED_PRODS_QUERY =
  '%5B%5Bat(document.type%2C%20%22product%22)%5D%5D&q=%5B%5Bat(document.tags%2C%20%5B%22Featured%22%5D)%5D%5D&lang=en-us&pageSize=16';
export const PRODUCT_QUERY =
  '%5B%5B%3Ad+%3D+at%28document.id%2C+%22{productId}%22%29+%5D%5D';
export const PRODUCTS_QUERY =
  '%5B%5Bat(document.type%2C%20%22product%22)%5D%5D&lang=en-us&pageSize=12';
export const SEARCH_QUERY =
  '%5B%5Bat(document.type%2C%20%22product%22)%5D%5D&q=%5B%5Bfulltext(document%2C%20%22{searchTerm}%22)%5D%5D&lang=en-us&pageSize=20';
