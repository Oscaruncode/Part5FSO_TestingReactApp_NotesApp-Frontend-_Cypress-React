import { useState } from 'react'


const MoreInfoBlog = ({ blog,handleLike,handleDelete }) => (<div className="blogDetails">
  <div>{blog.url}</div>
  <div>Likes {blog.likes} <button className='ButtonsOfBlogs like-Button' onClick={() => handleLike(blog)}>like</button></div>
  <div>{blog.author}</div>
  <div><button className="ButtonsOfBlogs delete-Button" onClick={() => handleDelete(blog)}>Delete</button></div>

</div>)

const Blog = ({ blog,handleLike,handleDelete }) => {
  const [showMore,setShowMore] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  return (
    <div style={blogStyle} className="blogEach">
      {blog.title} {blog.author}
      <button className="blog-button" onClick={() => setShowMore(value => !value)}>{ showMore?'hide':'view'}</button>
      {showMore && (<MoreInfoBlog blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>)}
    </div>
  )}

export default Blog