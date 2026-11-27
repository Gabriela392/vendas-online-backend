import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from '../../product/product.service';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryService } from '../category.service';
import { CategoryEntity } from '../entities/category.entity';
import { createCategoryMock } from '../__mocks__/create-category.mock';
import { countProductMock } from '../../product/__mocks__/count-product.mock';
import { CountProduct } from '../../product/dtos/count-product.dto';
import { ReturnCategory } from '../dtos/return-category.dto';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { BadRequestException } from '@nestjs/common';
import { updateCategoryMock } from '../__mocks__/update-category.mock';

const categoryFixture: CategoryEntity = {
  id: 1,
  name: 'category fixture',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: ProductService,
          useValue: {
            countProdutsByCategoryId: jest
              .fn<() => Promise<CountProduct[]>>()
              .mockResolvedValue([countProductMock]),
          },
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            findOne: jest
              .fn<() => Promise<CategoryEntity>>()
              .mockResolvedValue(categoryFixture),
            find: jest
              .fn<() => Promise<CategoryEntity[]>>()
              .mockResolvedValue([categoryFixture]),
            save: jest
              .fn<() => Promise<CategoryEntity>>()
              .mockResolvedValue(categoryFixture),
            delete: jest
              .fn<() => Promise<DeleteResult>>()
              .mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    productService = module.get<ProductService>(ProductService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return list category', async () => {
    const categories = await service.findAllCategories();

    expect(categories).toEqual([
      new ReturnCategory(categoryFixture, countProductMock.total),
    ]);
  });

  it('should return error in list category empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

    await expect(service.findAllCategories()).rejects.toThrow();
  });

  it('should return error in list category exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

    await expect(service.findAllCategories()).rejects.toThrow();
  });

  it('should return error if exist category name', async () => {
    await expect(service.createCategory(createCategoryMock)).rejects.toThrow();
  });

  it('should return category after save', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);

    const category = await service.createCategory(createCategoryMock);

    expect(category).toEqual(categoryFixture);
  });

  it('should return error in exception', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());

    await expect(service.createCategory(createCategoryMock)).rejects.toThrow();
  });

  it('should return category in find by name', async () => {
    const category = await service.findCategoryByName(categoryFixture.name);

    expect(category).toEqual(categoryFixture);
  });

  it('should return error if category find by name empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);

    await expect(
      service.findCategoryByName(categoryFixture.name),
    ).rejects.toThrow();
  });

  it('should return category in find by id', async () => {
    const category = await service.findCategoryById(categoryFixture.id);

    expect(category).toEqual(categoryFixture);
  });

  it('should return error in not found category id', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);

    await expect(
      service.findCategoryById(categoryFixture.id),
    ).rejects.toThrow();
  });

  it('should return delete result in success', async () => {
    const deleteResult = await service.deleteCategory(categoryFixture.id);

    expect(deleteResult).toEqual(returnDeleteMock);
  });

  it('should send relations in request findOne', async () => {
    const spy = jest.spyOn(categoryRepository, 'findOne');
    await service.deleteCategory(categoryFixture.id);

    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        id: categoryFixture.id,
      },
      relations: {
        products: true,
      },
    });
  });

  it('should return error if category with relations', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue({
      ...categoryFixture,
      products: [productMock],
    });

    await expect(service.deleteCategory(categoryFixture.id)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return category in update category', async () => {
    const spy = jest.spyOn(categoryRepository, 'findOne');
    const category = await service.editCategory(
      categoryFixture.id,
      updateCategoryMock,
    );

    expect(category).toEqual(categoryFixture);
    expect(spy.mock.calls.length > 0).toEqual(true);
  });

  it('should send new category to save', async () => {
    const spy = jest.spyOn(categoryRepository, 'save');
    await service.editCategory(categoryFixture.id, updateCategoryMock);

    expect(spy.mock.calls[0][0]).toEqual({
      ...categoryFixture,
      ...updateCategoryMock,
    });
  });
});
