import { CategoryEntity } from '../entities/category.entity';

export const categoryMock: CategoryEntity = {
  createdAt: new Date(),
  id: 654743,
  name: 'categoryMock',
  updatedAt: new Date(),
};

export const mockCategoryList: CategoryEntity[] = [
  categoryMock,
  {
    id: 1,
    name: 'Pães',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Salgados',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Confeitaria',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: 'Bebidas',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
