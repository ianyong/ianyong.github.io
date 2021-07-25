const getRandomPostFromSubreddit = async (subreddit) => {
  const apiUrl = `https://www.reddit.com/r/${subreddit}/random.json`;
  return await fetch(apiUrl)
    .catch(() => console.log(`Unable to make the API call to '${apiUrl}'`))
    .then(response => response.json());
};

const getRandomImageFromSubreddit = async (subreddit) => {
  let imageUrl = null;
  let isImage = false;
  do {
    await getRandomPostFromSubreddit(subreddit)
      .then(data => {
        imageUrl = data[0].data.children[0].data.url;
        isImage = data[0].data.children[0].data.post_hint === 'image';
      });
  } while(!isImage);
  return imageUrl;
};
