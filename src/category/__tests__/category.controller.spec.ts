import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { CategoryEntity } from '../entities/category.entity';
import { createCategoryMock } from '../__mocks__/create-category.mock';
import { updateCategoryMock } from '../__mocks__/update-category.mock';

const categoryFixture: CategoryEntity = {
  id: 1,
  name: 'category fixture',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAllCategories: jest
              .fn<() => Promise<CategoryEntity[]>>()
              .mockResolvedValue([categoryFixture]),
            createCategory: jest
              .fn<() => Promise<CategoryEntity>>()
              .mockResolvedValue(categoryFixture),
            deleteCategory: jest
              .fn<() => Promise<DeleteResult>>()
              .mockResolvedValue(returnDeleteMock),
            editCategory: jest
              .fn<() => Promise<CategoryEntity>>()
              .mockResolvedValue(categoryFixture),
            findCategoryById: jest
              .fn<() => Promise<CategoryEntity>>()
              .mockResolvedValue(categoryFixture),
          },
        },
      ],
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return category Entity in findAllCategories', async () => {
    const category = await controller.findAllCategories();

    expect(category).toEqual([categoryFixture]);
  });

  it('should return category Entity in createCategory', async () => {
    const category = await controller.createCategory(createCategoryMock);

    expect(category).toEqual(categoryFixture);
  });

  it('should return DeleteResult in delete category', async () => {
    const category = await controller.deleteCategory(categoryFixture.id);

    expect(category).toEqual(returnDeleteMock);
  });

  it('should send category id to delete category', async () => {
    const spy = jest.spyOn(categoryService, 'deleteCategory');
    await controller.deleteCategory(categoryFixture.id);

    expect(spy.mock.calls[0][0]).toEqual(categoryFixture.id);
  });

  it('should return category in update category', async () => {
    const category = await controller.editCategory(
      categoryFixture.id,
      updateCategoryMock,
    );

    expect(category).toEqual(categoryFixture);
  });

  it('should send category id and body', async () => {
    const spy = jest.spyOn(categoryService, 'editCategory');
    await controller.editCategory(categoryFixture.id, updateCategoryMock);

    expect(spy.mock.calls[0][0]).toEqual(categoryFixture.id);
    expect(spy.mock.calls[0][1]).toEqual(updateCategoryMock);
  });

  it('should return category in find category by id', async () => {
    const category = await controller.findCategoryById(categoryFixture.id);

    expect(category).toEqual({
      id: categoryFixture.id,
      name: categoryFixture.name,
    });
  });

  it('should send id and true relations to findCategoryById', async () => {
    const spy = jest.spyOn(categoryService, 'findCategoryById');
    await controller.findCategoryById(categoryFixture.id);

    expect(spy.mock.calls[0][0]).toEqual(categoryFixture.id);
    expect(spy.mock.calls[0][1]).toEqual(true);
  });

  it('should propagate errors when listing categories fails', async () => {
    jest
      .spyOn(categoryService, 'findAllCategories')
      .mockRejectedValue(new Error('Database unavailable'));

    await expect(controller.findAllCategories()).rejects.toThrow(
      'Database unavailable',
    );
  });

  it('should propagate errors when creating a category fails', async () => {
    jest
      .spyOn(categoryService, 'createCategory')
      .mockRejectedValue(new Error('Database unavailable'));

    await expect(controller.createCategory(createCategoryMock)).rejects.toThrow(
      'Database unavailable',
    );
  });
});
