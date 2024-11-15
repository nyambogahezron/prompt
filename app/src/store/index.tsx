import { User, Post } from '@/types';
import { generateUser, generatePosts } from '@/utils/generate-dummy-data';
import { create } from 'zustand';

type userState = {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
};

let initialUser: User = generateUser();

export const useUserStore = create<userState>()((set) => ({
  user: initialUser,
  setUser: (user) => set((state) => ({ user: user })),
  updateUser: (user: User) => set((state) => ({ user: user })),
  logout: () => set(() => ({ user: null })),
}));

let initialPosts = generatePosts();

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  updatePosts: (posts: Post[]) => void;
  deletePost: (postId: string) => void;
  addPost: (post: Post) => void;
}

export const usePostStore = create<PostStore>()((set) => ({
  posts: initialPosts,
  setPosts: (posts: Post[]) => set((state) => ({ posts: posts })),
  updatePosts: (posts: Post[]) => set((state) => ({ posts: posts })),
  deletePost: (postId: string) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
  addPost: (post: Post) => set((state) => ({ posts: [post, ...state.posts] })),
}));
