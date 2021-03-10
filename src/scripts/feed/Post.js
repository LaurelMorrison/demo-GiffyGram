export const Post = (postObject) => {
    return `
      <section class="post">
        <h3>${postObject.title} </h3>
        <img class="postImage" src="${postObject.imageURL}" />
        <p>${postObject.description} </p>
        <p>${postObject.timestamp = new Date(postObject.timestamp)} </p>
      </section>
    `
  }