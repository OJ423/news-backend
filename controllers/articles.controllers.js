const {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
  addCommentToArticle,
  updateArticleById,
} = require("../models/articles.models");

const { checkArticleExists, checkUserExists, checkCommentBodyFormat } = require("../utils/db-checks");

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
  selectAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const checkArticle = checkArticleExists(article_id);
  const fetchComments = selectCommentsByArticleId(article_id);
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