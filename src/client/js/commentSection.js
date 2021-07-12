const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");

const addComment = (text, id) => {
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text} `;
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove";
  removeBtn.textContent = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(removeBtn);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text == "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleRemove = async (event) => {
  if (event.target.className !== "remove") {
    return;
  }
  const videoId = videoContainer.dataset.id;
  const comment = event.target.parentNode;
  const commentId = comment.dataset.id;

  const response = await fetch(`/api/comments/${commentId}/remove-comment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({videoId}),
  });

  if(response.status === 200){
    videoComments.removeChild(comment);
  }

};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
videoComments.addEventListener("click", handleRemove);
