import {
  Todo,
  TodoTitle,
  TodoCategory,
  TodoDescription,
  TodoDuration,
  TodoPrice,
  TodoRank
} from '../../../../../src/Contexts/pecera/Todos/domain';
import { InvalidArgumentError } from '../../../../../src/Contexts/shared/domain/errors';
import { Uuid } from '../../../../../src/Contexts/shared/domain/value-object';
import { UuidMother } from '../../../fixtures/shared/domain/mothers';
import { TodoCategoryMother } from './TodoCategoryMother';
import { TodoDescriptionMother } from './TodoDescriptionMother';
import { TodoDurationMother } from './TodoDurationMother';
import { TodoPriceMother } from './TodoPriceMother';
import { TodoRankMother } from './TodoRankMother';
import { TodoTitleMother } from './TodoTitleMother';

const TODO_ID = UuidMother.random();
const TODO_TITLE = TodoTitleMother.random();
const TODO_CATEGORY = TodoCategoryMother.random();
const TODO_DESCRIPTION = TodoDescriptionMother.random();
const TODO_DURATION = TodoDurationMother.random();
const TODO_PRICE = TodoPriceMother.random();
const TODO_RANK = TodoRankMother.random();
const TODO_USER = UuidMother.random();

const TODO_VALUES = {
  id: TODO_ID,
  title: TODO_TITLE,
  category: TODO_CATEGORY,
  description: TODO_DESCRIPTION,
  duration: TODO_DURATION,
  price: TODO_PRICE,
  rank: TODO_RANK,
  user: TODO_USER
};

describe('Todo', () => {
  it('should create a valid Todo', () => {
    const todo = new Todo(TODO_VALUES);

    expect(todo).toEqual(TODO_VALUES);
  });
});

describe('Todo Id', () => {
  it('should throw an error when the id is not a valid uuid', () => {
    try {
      new Uuid(UuidMother.invalidValue());
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });
});

describe('Todo Title', () => {
  it('should throw an error when the title is not valid', () => {
    try {
      new TodoTitle(TodoTitleMother.invalidValue() as string);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });
});

describe('Todo Category', () => {
  it('should throw an error when the category is not valid', () => {
    try {
      new TodoCategory(TodoCategoryMother.invalidValue() as string);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });
});

describe('Todo Description', () => {
  it('should throw an error when the description is not valid', () => {
    try {
      new TodoDescription(TodoDescriptionMother.invalidValue() as string);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });
});

describe('Todo Duration', () => {
  it('should throw an error when the duration is not valid', () => {
    try {
      new TodoDuration(TodoDurationMother.invalidValue() as string);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });
});

describe('Todo Price', () => {
  it('should throw an error when the price is not valid', () => {
    try {
      new TodoPrice(TodoPriceMother.invalidValue() as string);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });
});

describe('Todo Rank', () => {
  it('should throw an error when the rank is not valid', () => {
    try {
      new TodoRank(TodoRankMother.invalidValue() as number);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });
});
