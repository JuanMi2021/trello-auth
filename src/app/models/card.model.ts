import { List } from '@models/list.model'

export interface Card{
  id: string;
  title: string;
  description?: string;
  position: number;
  list: List;
}

// export interface CreateCardDto{
//   id: string;
//   description?: string;
//   position: number;
//   listId: number | string;
//   boardId: string;
// }

//  Hecho por utility types
export interface CreateCardDto extends Omit <Card, 'id' | 'list'>{
  listId: number | string;
  boardId: string;
}

export interface UpdateCardDto{
  title?: string;
  description?: string;
  position?: number;
  listId?: string | number;
  boardId?: string;
}
