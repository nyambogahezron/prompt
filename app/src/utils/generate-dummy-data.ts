import { faker } from '@faker-js/faker';
import { Post, User, Blog } from '@/types';

export function createRandomFollower(): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const name = firstName + ' ' + lastName;

  return {
    id: faker.string.uuid(),
    photo: faker.image.avatar(),
    name,
    email: faker.internet.email(),
    verified: Math.random() >= 0.5,
    bio: faker.person.bio(),
    username: faker.internet.username(),
    link: faker.internet.url(),
  };
}

export function createRandomUser(): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const name = firstName + ' ' + lastName;

  return {
    id: faker.string.uuid(),
    photo: faker.image.avatar(),
    name,
    email: faker.internet.email(),
    verified: Math.random() >= 0.5,
    bio: faker.person.bio(),
    followers: new Array(Math.floor(Math.random() * 10))
      .fill(null)
      .map((element) => createRandomFollower()),
    username: faker.internet.username(),
    link: faker.internet.url(),
  };
}

export function createRandomPost(): Post {
  const author = createRandomUser();

  return {
    id: faker.string.uuid(),
    author,
    description: faker.lorem.paragraph(),
    content: faker.lorem.paragraph(10),
    image: Math.random() > 0.5 ? faker.image.url() : undefined,
    replies: new Array(Math.floor(Math.random() * 10)).fill(null).map(() => ({
      id: faker.string.uuid(),
      author: createRandomUser(),
      content: faker.lorem.sentence(),
      likes: Math.floor(Math.random() * 1000),
      createdAt: faker.date.recent().toISOString(),
    })),
    repliesCount: Math.floor(Math.random() * 100),
    likesCount: Math.floor(Math.random() * 1000),
    createdAt: faker.date.recent().toISOString(),
  };
}

export function createRandomBlog(): Blog {
  const author = createRandomUser();
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    author,
    content: faker.lorem.paragraphs(5),
    image: faker.image.url(),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
}

export function generatePosts(): Post[] {
  return new Array(50).fill(null).map(() => createRandomPost());
}

export function generateUser(): User {
  const user = createRandomUser();
  return user;
}

export function generateUserPosts(): Post[] {
  return new Array(10).fill(null).map(() => createRandomPost());
}

export function generateBlogs(): Blog[] {
  return new Array(40).fill(null).map(() => createRandomBlog());
}
