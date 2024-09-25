import { PostModel } from 'src/posts/dto/PostModel';

export type UserModel = {
  id: number;
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  posts?: PostModel[];
};
