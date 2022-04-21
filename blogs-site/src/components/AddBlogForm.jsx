import React from 'react'

const AddBlogForm = ({handleAddBlog, newTitle, newContent, handleTitleChange, handleContentChange}) => {
  return (
    <div>
        <form onSubmit={handleAddBlog}>
            <input type="text" name="newTitle" placeholder="Title"value={newTitle} onChange={({target}) => handleTitleChange(target.value)}/>
            <textarea type="text" name="newContent" value={newContent} placeholder="Content" onChange={({target}) => handleContentChange(target.value)}/>
            <button type="submit">Add</button>
        </form>
    </div>
  )
}

export default AddBlogForm