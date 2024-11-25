export interface Subcategory {
  id: string;
  label: string;
  color: string;
}

export interface Category {
  id: string;
  label: string;
  subcategories: Subcategory[];
}
