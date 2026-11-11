import { Pagination } from 'src/dtos/pagination.dto';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  createdAt: new Date(),
  id: 7435,
  image: 'http://image.com',
  name: 'name product mock',
  price: 34.3,
  updatedAt: new Date(),
  diameter: 2,
  height: 43,
  length: 5,
  weight: 4,
  width: 2,
};

export const mockProductList: ProductEntity[] = [
  productMock,
  {
    id: 1,
    name: 'Teclado Mecânico Gamer RGB',
    price: 299.9,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    categoryId: categoryMock.id,
    diameter: 0,
    height: 4,
    length: 44,
    weight: 0.9,
    width: 14,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Mouse Óptico Sem Fio 16000 DPI',
    price: 189.9,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    categoryId: categoryMock.id,
    diameter: 0,
    height: 4,
    length: 12,
    weight: 0.1,
    width: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Monitor LED 27" Full HD 144Hz',
    price: 1249.9,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    categoryId: categoryMock.id,
    diameter: 0,
    height: 40,
    length: 62,
    weight: 4.2,
    width: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const productPaginationMock: Pagination<ProductEntity[]> = {
  data: [productMock],
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 10,
    totalPages: 1,
  },
};
