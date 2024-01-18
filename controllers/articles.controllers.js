const {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
  addCommentToArticle,
  updateArticleById,
  addNewArticle,
  removeArticle,
} = require("../models/articles.models");

const { checkArticleExists, checkCommentBodyFormat, checkTopicsExists, checkUserExists } = require("../utils/db-checks");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  const {topic, sort_by, order ,limit, p} = req.query
  const checkTopics = checkTopicsExists(topic)
  const selectArticles = selectAllArticles(topic, sort_by, order, limit, p)
  Promise.all([selectArticles, checkTopics])
    .then((response) => {
      const articles = response[0]
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const {limit, p} = req.query
  const checkArticle = checkArticleExists(article_id);
  const fetchComments = selectCommentsByArticleId(article_id, limit, p);
  Promise.all([fetchComments, checkArticle])
    .then((response) => {
      const comments = response[0];
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentToArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  const checkArticle = checkArticleExists(article_id)
  const checkBody = checkCommentBodyFormat(body)
  const addComment = addCommentToArticle(article_id, body)
  Promise.all([addComment, checkArticle, checkBody])
    .then((response) => {
      const comment = response[0]
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const {article_id} = req.params
  const { inc_votes } = req.body
  updateArticleById(article_id, inc_votes)
  .then((article) => {
    res.status(200).send({article})
  })
  .catch((err) => {
    next(err)
  })
}

exports.postArticle = (req, res, next) => {
  const { author, title, body, topic, article_img_url } = req.body;
  const checkUser = checkUserExists(author)
  const checkTopic = checkTopicsExists(topic)
  const addArticle = addNewArticle(author, title, body, topic, article_img_url)
  Promise.all([addArticle, checkUser, checkTopic])
    .then((response) => {
      const article = response[0]
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteArticle = (req, res, next) => {
  const {article_id} = req.params
  removeArticle(article_id)
  .then((article) => {
    res.status(204).send()
  })
  .catch((err) => {
    next(err)
  })
}