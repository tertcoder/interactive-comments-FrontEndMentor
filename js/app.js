import { dataJSON } from "./data.js";
const commentsList = document.querySelector(".comments__list");
const commentBtn = document.querySelector(".add-comment");
const commentArea = document.querySelector(".text-comment");

/**
 * Rendering all content in the html from dataJSON object
 */
const replyHander = (reply, currentUser) => {
  return ` 
  <li class="reply" id="${reply.id}">
  <div class="reply__box">
          <div class="reply__rate">
            <button>
              <img src="./images/icon-plus.svg" alt="satisfied" />
            </button>
            <span>${reply.score}</span>
            <button>
              <img src="./images/icon-minus.svg" alt="unsatisfied" />
            </button>
          </div>
          <div class="reply__content">
          <div class="reply__content--header">
              <div class="left">
                <img
                  src="${reply.user.image.png}"
                  alt="${reply.user.username}"
                />
                <span>${reply.user.username}</span>
                <span>${reply.createdAt}</span>
              </div>
              <div class="action">
              ${
                reply.user.username === currentUser.username
                  ? `<button class="delete">
                  <img src="./images/icon-delete.svg" alt="delete" />
                  <span>delete</span>
                </button>
                <button class="edit">
                <img src="./images/icon-edit.svg" alt="edit" />
                <span>Edit</span>
                </button>`
                  : `<button class="reply-comment">
                <img src="./images/icon-reply.svg" alt="reply" />
                <span class="reply">Reply</span>
                </button>`
              }
              </div>
            </div>
            <p class="reply__content--text">
              <span class="tag-style">${reply.replyingTo}</span> ${
    reply.content
  }
            </p>
          </div>
        </div>
        </li>
        
  
        `;
};
const repliesRendering = replies => {
  const replyContainer = document.createElement("div");
  const replyList = document.createElement("ul");
  replyContainer.className = "reply__container";
  replyList.className = "replies__list";

  const repliesContents = replies
    .map(reply => replyHander(reply, dataJSON.currentUser))
    .join(" ");
  replyList.insertAdjacentHTML("afterbegin", repliesContents);
  replyContainer.appendChild(replyList);

  return replyContainer.outerHTML;
};
const commentHandler = (comment, currentUser) => {
  const commentHTML = `
<li class="comment" id="${comment.id}">
  <div class="comment__box">
    <div class="comment__rate">
      <button>
        <img src="./images/icon-plus.svg" alt="satisfied" />
      </button>
      <span>${comment.score}</span>
      <button>
        <img src="./images/icon-minus.svg" alt="unsatisfied" />
      </button>
    </div>
    <div class="comment__content">
      <div class="comment__content--header">
        <div class="left">
          <img src="${comment.user.image.png}" alt="${comment.user.username}" />
          <span>${comment.user.username}</span>
          <span>${comment.createdAt}</span>
        </div>
        <div class="action">
          ${
            comment.user.username === currentUser.username
              ? `<button class="delete">
            <img src="./images/icon-delete.svg" alt="delete" />
            <span>delete</span>
          </button>
          <button class="edit">
            <img src="./images/icon-edit.svg" alt="edit" />
            <span>Edit</span>
          </button>`
              : `<button class="reply-comment" onclick="replyContainerForm()">
            <img src="./images/icon-reply.svg" alt="reply" />
            <span class="reply">Reply</span>
          </button>`
          }
        </div>
      </div>
      <p class="comment__content--text">${comment.content}</p>
    </div> 
  </div>
  ${(comment.replies && repliesRendering(comment.replies)) || ""}
</li>
`;
  return commentHTML;
};
const commentsRendering = data => {
  const comments = data
    .map(comment => commentHandler(comment, dataJSON.currentUser))
    .join(" ");
  commentsList.insertAdjacentHTML("afterbegin", comments);
};

/**
 * Implementing Sending Comment functionnality
 */
const sendComment = () => {
  const comment = commentArea.value;
  commentArea.value = "";
  commentArea.focus();

  const commentObj = {
    id: Math.floor(Math.random() * 100 + 1),
    score: 0,
    user: {
      image: {
        png: `${dataJSON.currentUser.image.png}`,
      },
      username: `${dataJSON.currentUser.username}`,
    },
    createdAt: "now",
    content: comment,
  };
  commentsList.insertAdjacentHTML(
    "beforeend",
    commentHandler(commentObj, dataJSON.currentUser)
  );
  dataJSON.comments.push(commentObj);

  localStorage.setItem("dataJSON", JSON.stringify(dataJSON));
};
commentBtn.addEventListener("click", sendComment);
commentArea.addEventListener("keyup", e => {
  if (e.key === "Enter") sendComment();
});

/**
 * Implementing Replying comment functionnality
 */
// const replyBtn = document.querySelector(".reply-comment");
// console.log(replyBtn);
const replyBtn = document.querySelectorAll(".reply-comment");
console.log(replyBtn);

function load() {
  if ("dataJSON" in localStorage) {
    const data = JSON.parse(localStorage.getItem("dataJSON"));
    commentsRendering(data.comments);
  } else commentsRendering(dataJSON.comments);
}
load();
