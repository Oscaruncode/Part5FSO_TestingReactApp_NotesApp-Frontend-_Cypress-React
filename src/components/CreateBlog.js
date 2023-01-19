import { useRef, useState } from 'react'
import Togglable from './Togeable'

const CreateBlog = ({ handleNewBlog }) => {
  const [title,setTitle] = useState()
  const [author,setAuthor] = useState()
  const [url,setUrl] = useState()

  const visibilityRef = useRef()

  const handleSubmit = event => {
    event.preventDefault()
    handleNewBlog({ title,author,url })
    setTitle('')
    setAuthor('')
    setUrl('')
    visibilityRef.current.toggleVisibility()
  }


  return (
    <>
      <Togglable ref={visibilityRef} buttonLabel='new blog'>
        <h2>Create New</h2>
        <form onSubmit={handleSubmit}>
          <div>
                 title
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
                 Author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
                 Url
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>

          <button type="submit" id="createBlog">Create</button>
        </form>
      </Togglable>
    </>
  )

}

export default CreateBlog