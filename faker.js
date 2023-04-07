const { faker } = require("@faker-js/faker");
const Users = require("./models/usersModels");
const Posts = require("./models/postsModels");
const Reactions = require("./models/reactionsModels");
const Reports = require("./models/reportsModels");

async function generateData(numUsers) {
  const userIds = [];
  const postIds = [];

  for (let i = 0; i < numUsers; i++) {
    const insertUser = await generateUsers();
    userIds.push(insertUser.id);

    for (let j = 0; j < 10; j++) {
      const insertPost = await generatePosts(userIds[userIds.length - 1]);
      postIds.push(insertPost.id);
    }
  }

  for (let postId of postIds) {
    const remainingUserIds = [...userIds];
    for (let j = 0; j < 10; j++) {
      const randomIndex = Math.floor(Math.random() * remainingUserIds.length);
      const userId = remainingUserIds.splice(randomIndex, 1)[0];
      await generateReactions(postId, userId);
    }
  }

  const generatedCombos = new Set();

  for (let i = 0; i < 9; i++) {
    let postId;
    let userId;

    do {
      postId = postIds[Math.floor(Math.random() * postIds.length)];
      userId = userIds[Math.floor(Math.random() * userIds.length)];
    } while (generatedCombos.has(`${postId}-${userId}`));

    generatedCombos.add(`${postId}-${userId}`);

    await generateReports(postId, userId);
  }
}

async function generateUsers() {
  const user = {
    username: faker.name.fullName(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
  };
  return await Users.query().insert(user);
}

async function generatePosts(user_id) {
  for (let i = 0; i < 10; i++) {
    const post = {
      content: faker.lorem.sentence(),
      user_id: user_id,
    };
    return await Posts.query().insert(post);
  }
}

async function generateReactions(post_id, user_id) {
  for (let i = 0; i < 10; i++) {
    const reaction = {
      post_id: post_id,
      user_id: user_id,
      type: "like",
    };
    return await Reactions.query().insert(reaction);
  }
}

async function generateReports(post_id, user_id) {
  const report = {
    post_id: post_id,
    user_id: user_id,
    reason: "testttttt",
  };
  await Reports.query().insert(report);
}

exports.fakeData = async function () {
  //   await Users.query().truncate();
  //   await Posts.query().truncate();
  //   await Reactions.query().truncate();
  //   await Reports.query().truncate();
  const countQuery = await Users.query().count();
  const count = countQuery[0]["count(*)"];
  if (count === 0) {
    generateData(20)
      .then(() => console.log("data generated"))
      .catch((err) => console.error(err));
  }
};
