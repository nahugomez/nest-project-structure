export type PostModel = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author_id: number;
  created_at: Date;
  updated_at: Date;
};
