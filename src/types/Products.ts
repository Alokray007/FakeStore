interface Pdct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };

}

// Define the props interface for the ProductList component
interface ProductListProps {
  products: Pdct[];
  search: string | number |null;
}

interface RatingStarsProps {
  rating: number;
}

interface CategoryFilterProps {
  onCategoryClick: (category: string) => void;
}

interface CategoriesFilterProps {
  onCategoryChange: (category: string) => void;
}


export type { Pdct, ProductListProps, RatingStarsProps, CategoryFilterProps, CategoriesFilterProps };
