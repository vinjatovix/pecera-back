import {
  TodoTitle,
  TodoCategory,
  TodoDescription,
  TodoDuration,
  TodoPrice,
  TodoRank
} from '../../../../../../src/Contexts/pecera/Todos/domain';
import { Uuid } from '../../../../../../src/Contexts/shared/domain/value-object';
import { UuidMother } from '../../../../fixtures/shared/domain/mothers';
import { TodoCategoryMother } from '../../domain/TodoCategoryMother';
import { TodoDescriptionMother } from '../../domain/TodoDescriptionMother';
import { TodoDurationMother } from '../../domain/TodoDurationMother';
import { TodoPriceMother } from '../../domain/TodoPriceMother';
import { TodoRankMother } from '../../domain/TodoRankMother';
import { TodoTitleMother } from '../../domain/TodoTitleMother';
import { TodoPatcherRequest } from '../../../../../../src/Contexts/pecera/Todos/application/interfaces/TodoPatcherRequest';

export class TodoPatcherRequestMother {
  static create(
    data: Partial<{
      id: Uuid;
      title: TodoTitle;
      category: TodoCategory;
      description: TodoDescription;
      duration: TodoDuration;
      price: TodoPrice;
      rank: TodoRank;
      user: Uuid;
    }> = {}
  ): TodoPatcherRequest {
    return {
      id: (data.id ?? UuidMother.random()).value,
      title: (data.title ?? TodoTitleMother.random()).value,
      category: (data.category ?? TodoCategoryMother.random()).value,
      description: (data.description ?? TodoDescriptionMother.random()).value,
      duration: (data.duration ?? TodoDurationMother.random()).value,
      price: (data.price ?? TodoPriceMother.random()).value,
      rank: (data.rank ?? TodoRankMother.random()).value,
      user: (data.user ?? UuidMother.random()).value
    };
  }

  static random(): TodoPatcherRequest {
    return this.create();
  }

  static invalidValue(keys: string[]): TodoPatcherRequest {
    const id = keys.includes('id')
      ? UuidMother.invalidValue()
      : UuidMother.random().value;
    const title = keys.includes('title')
      ? (TodoTitleMother.invalidValue() as string)
      : TodoTitleMother.random().value;
    const category = keys.includes('category')
      ? (TodoCategoryMother.invalidValue() as string)
      : TodoCategoryMother.random().value;
    const description = keys.includes('description')
      ? (TodoDescriptionMother.invalidValue() as string)
      : TodoDescriptionMother.random().value;
    const duration = keys.includes('duration')
      ? (TodoDurationMother.invalidValue() as string)
      : TodoDurationMother.random().value;
    const price = keys.includes('price')
      ? (TodoPriceMother.invalidValue() as string)
      : TodoPriceMother.random().value;
    const rank = keys.includes('rank')
      ? (TodoRankMother.invalidValue() as number)
      : TodoRankMother.random().value;
    const user = keys.includes('user')
      ? UuidMother.invalidValue()
      : UuidMother.random().value;

    return {
      id,
      title,
      category,
      description,
      duration,
      price,
      rank,
      user
    };
  }
}
