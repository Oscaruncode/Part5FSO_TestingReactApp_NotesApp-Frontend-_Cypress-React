import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Message from './components/Message'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [message,setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with',username,password)

    try{
      const user = await loginService.login({ username,password, })

      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser',JSON.stringify(user))
      setUsername('')
      setPassword('')

      setMessage('Success')
      setTimeout(() => {setMessage(null)},5000 )

    }catch(exception){
      setMessage('Wrong credentials')
      setTimeout(() => {setMessage(null)},5000 )
    }
  }

  const handleLike = (blog) => {
    blogService.update( { ...blog , likes: blog.likes + 1 }).then(blogUpdated => { const newBlogs = blogs.map(blog => blog.id===blogUpdated.id?blogUpdated:blog) ; setBlogs(newBlogs)  } ).catch(error => {console.log('error:',error.response.data.error)})
  }


  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    console.log('Token delete, logout user')
  }

  const handleNewBlog = blog => {
    blogService.create(blog).then(blogCreated => {setBlogs([...blogs,blogCreated])}).catch(error => {console.log('error:',error.response.data.error)})
  }

  const handleDelete = (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {return }
    blogService.deleteBlog(blog).then(() => {const newBlogs = blogs.filter((b) => b.id !== blog.id); setBlogs(newBlogs)}).catch(error => {console.log('error:',error.response.data.error)})
  }



  const Blogs = () => (
    <>
      <h2>blogs</h2>
      <p>{user.username} Logged in <button onClick={handleLogout}> Log out</button></p>
      <CreateBlog handleNewBlog={handleNewBlog} />

      {blogs.filter(blog => {if(blog.user){return blog.user.username===user.username} else{return false}}).sort((a,b) => {if(a.likes>b.likes){return -1}else{return 1}}).map(blog => //filter is for only show the author¨s blogs
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
      )}
    </>
  )

  return (
    <div>
      <Message message={message}/>
      {user===null? <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/> : Blogs() }
    </div>
  )
}

export default App
