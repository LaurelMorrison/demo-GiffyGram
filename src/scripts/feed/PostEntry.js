export const PostEntry = () => {
    return `
    <form action="">
    <fielset id="newPost">
        <div>
            <input value=""
                   name="postTitle"
                   class="newPost__input"
                   type="text"
                   placeholder="Title" />
        </div>
        <div>
            <input value=""
                   name="postURL"
                   class="newPost__input"
                   type="text"
                   placeholder="URL of gif" />
        </div>

        <textarea name="postDescription"
            class="newPost__input newPost__description"
            placeholder="Story behind your gif..."></textarea>

        <button id="newPost__submit">Save</button>
        <button id="newPost__cancel">Cancel</button>
        </fieldset>
    </form>
    `
}

