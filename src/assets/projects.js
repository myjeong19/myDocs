class Project {
  constructor(
    title,
    category,
    stack,
    descriptions,
    img,
    website,
    github,
    detailed
  ) {
    this.title = title;
    this.category = category;
    this.stack = stack;
    this.descriptions = descriptions;
    this.img = img;
    this.website = website;
    this.github = github;
    this.detailed = detailed;
  }
}

export const PROJECTS = [
  new Project(
    'Actions',
    'Personal',
    'TypeScript, React, Express, Mongoose, Vercel',
    ['Personal OKR management system', 'Tracking progress and setting goals'],
    'https://via.placeholder.com/300',
    'https://www.naver.com',
    'https://www.naver.com',
    'https://www.naver.com'
  ),
  new Project(
    'Flow',
    'Personal',
    'TypeScript, React, Express, Mongoose, Langchain, Github Actions',
    ['Music recommendation system', 'Based on user preference', 'Like Spotify'],
    'https://via.placeholder.com/300',
    'https://www.naver.com',
    'https://www.naver.com',
    'https://www.naver.com'
  ),

  new Project(
    '범상',
    'Team',
    'Express, EJS, Sequelize, Nginx, AWS S3 ,MySql',
    [
      'Roles: Designer Frontend Enggineer',
      "Build a Restaurant 'Beomsang' User & Admin Page ",
    ],
    'https://via.placeholder.com/300',
    'https://www.naver.com',
    'https://www.naver.com',
    'https://www.naver.com'
  ),

  new Project(
    'A2S Chat',
    'Team',
    'TypeScript, React, Express, Mongoose, Langchain, Github Actions',
    ['Roles: Designer Frontend Enggineer', 'Baseball Player AI Health Tracker'],
    'https://via.placeholder.com/300',
    'https://www.naver.com',
    'https://www.naver.com',
    'https://www.naver.com'
  ),
];
