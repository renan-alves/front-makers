import { getPublishedArticles } from './lib/articles';

(async () => {
  try {
    const articles = await getPublishedArticles('en');
    console.log(JSON.stringify(articles, null, 2));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
