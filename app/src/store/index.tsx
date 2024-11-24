import { User, Post, Blog } from '@/types';
import {
  generateUser,
  generatePosts,
  generateBlogs,
} from '@/utils/generate-dummy-data';
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

interface Bookmark extends Post {}

let initialBookmarks: Bookmark[] = [];

interface BookmarkStore {
  bookmarks: Bookmark[];
  setBookmarks: (bookmarks: Bookmark[]) => void;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (bookmarkId: string) => void;
}

export const useBookmarkStore = create<BookmarkStore>()((set) => ({
  bookmarks: initialBookmarks,
  setBookmarks: (bookmarks: Bookmark[]) =>
    set((state) => ({ bookmarks: bookmarks })),
  addBookmark: (bookmark: Bookmark) =>
    set((state) => ({ bookmarks: [bookmark, ...state.bookmarks] })),
  removeBookmark: (bookmarkId: string) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter(
        (bookmark) => bookmark.id !== bookmarkId
      ),
    })),
}));

let initialBlogs: Blog[] = generateBlogs();

interface BlogStore {
  blogs: Blog[];
  setBlogs: (blogs: Blog[]) => void;
  addBlog: (blog: Blog) => void;
  updateBlog: (blog: Blog) => void;
  deleteBlog: (blogId: string) => void;
}

export const useBlogStore = create<BlogStore>()((set) => ({
  blogs: initialBlogs,
  setBlogs: (blogs: Blog[]) => set((state) => ({ blogs: blogs })),
  addBlog: (blog: Blog) => set((state) => ({ blogs: [blog, ...state.blogs] })),
  updateBlog: (blog: Blog) =>
    set((state) => ({
      blogs: state.blogs.map((b) => (b.id === blog.id ? blog : b)),
    })),
  deleteBlog: (blogId: string) =>
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog.id !== blogId),
    })),
}));
