import { TodoCreatorRequest } from '../../../../../src/Contexts/pecera/Todos/application/interfaces';
import {
  TodoTitle,
  TodoCategory,
  TodoDescription,
  TodoDuration,
  TodoPrice,
  TodoRank,
  Todo
} from '../../../../../src/Contexts/pecera/Todos/domain';
import { Uuid } from '../../../../../src/Contexts/shared/domain/value-object';
import { UuidMother } from '../../../fixtures/shared/domain/mothers';
import { TodoCategoryMother } from './TodoCategoryMother';
import { TodoDescriptionMother } from './TodoDescriptionMother';
import { TodoDurationMother } from './TodoDurationMother';
import { TodoPriceMother } from './TodoPriceMother';
import { TodoRankMother } from './TodoRankMother';
import { TodoTitleMother } from './TodoTitleMother';

export class TodoMother {
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
  ): Todo {
    return new Todo({
      id: data.id ?? UuidMother.random(),
      title: data.title ?? TodoTitleMother.random(),
      category: data.category ?? TodoCategoryMother.random(),
      description: data.description ?? TodoDescriptionMother.random(),
      duration: data.duration ?? TodoDurationMother.random(),
      price: data.price ?? TodoPriceMother.random(),
      rank: data.rank ?? TodoRankMother.random(),
      user: data.user ?? UuidMother.random()
    });
  }

  static from(command: TodoCreatorRequest): Todo {
    return this.create({
      id: UuidMother.create(command.id),
      title: TodoTitleMother.create(command.title),
      category: TodoCategoryMother.create(command.category),
      description: TodoDescriptionMother.create(command.description),
      duration: TodoDurationMother.create(command.duration),
      price: TodoPriceMother.create(command.price),
      rank: TodoRankMother.create(command.rank),
      user: UuidMother.create(command.user)
    });
  }

  static random(): Todo {
    return this.create();
  }

  static randomList(length: number): Todo[] {
    return Array.from({ length }, () => this.random());
  }
}
