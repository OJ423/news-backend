const {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
  addCommentToArticle,
} = require("../models/articles.models");

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
  selectCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentToArticle = (req, res, next) => {
    const {article_id} = req.params;
    const {body} = req
    addCommentToArticle(article_id, body)
    .then((comment) => {
        res.status(201).send({comment})
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}
