const dataJSON = {
  currentUser: {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};
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
                  <span class="">delete</span>
                </button>
                <button class="edit">
                <img src="./images/icon-edit.svg" alt="edit" />
                <span class="">Edit</span>
                </button>`
                  : `<button>
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
const commentHandler = (comment, currentUser) => `
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
              : `<button>
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

function load() {
  if ("dataJSON" in localStorage) {
    const data = JSON.parse(localStorage.getItem("dataJSON"));
    commentsRendering(data.comments);
  } else commentsRendering(dataJSON.comments);
}
load();
