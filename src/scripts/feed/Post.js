import { showEditButton, showDeleteButton } from "../main.js";
import { getLikes } from "../data/DataManager.js";


//this needs to be located above the Post declaration
const getNumberOfLikes = (postId) => {
  getLikes(postId)
  .then(response => {
    document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
  })
}


export const Post = (postObject) => {
  const editButton = showEditButton(postObject)
  const deleteButton = showDeleteButton(postObject)
    return `
      <section class="post">
        <h3>${postObject.title} </h3>
        <img class="postImage" src="${postObject.imageURL}" />
        <p>${postObject.description} </p>
        <p>Posted by: ${postObject.user.name}</p>
        <p>${postObject.timestamp = new Date(postObject.timestamp)} </p>
        ${editButton?editButton:""}
        ${deleteButton?deleteButton:""}
        <button id="like__${postObject.id}">Like</button>
        <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
      </section>
    `
  }



 