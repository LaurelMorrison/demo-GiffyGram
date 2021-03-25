import { showEditButton, showDeleteButton } from "../main.js"


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
      </section>
    `
  }




