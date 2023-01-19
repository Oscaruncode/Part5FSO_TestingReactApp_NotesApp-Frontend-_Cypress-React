import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent , screen } from '@testing-library/react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'


const blog = {
  'title': 'My React Render',
  'author': 'Oxf rebun',
  'url': 'https://myreact.com',
  'likes': 4
}


test(' only blog´s title and author were Rendered', () => {

  const component = render(
    <Blog blog={blog}/>
  )

  const blogEach = component.container.querySelector('.blogEach')
  expect(blogEach).toBeDefined()
  expect(blogEach).toBeVisible()
  expect(blogEach).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(blogEach).not.toHaveTextContent(blog.url)
  expect(blogEach).not.toHaveTextContent(blog.likes)
})



test(' Click in view button display likes and url', () => {

  const component = render(
    <Blog blog={blog}/>
  )

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  const blogDetails = component.container.querySelector('.blogDetails')
  expect(blogDetails).toBeVisible()
  expect(blogDetails).toHaveTextContent(`${blog.url}`)
  expect(blogDetails).toHaveTextContent(`${blog.likes}`)
})

test('like button call same times the handler', () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandler}/>
  )

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  const blogDetails = component.container.querySelector('.blogDetails')
  expect(blogDetails).toBeVisible()

  const buttonLike = component.getByText('like')
  expect(buttonLike).toBeVisible()

  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('Create a New Blog ', () => {

  const component = render(
    <CreateBlog/>
  )

  screen.debug(component.container.querySelector('[name="Url"]'))
  expect(component.container.querySelector('[name="Url"]')).toBeDefined()
  expect(component.container.querySelector('[name="Title"]')).toBeDefined()
  expect(component.container.querySelector('[name="Author"]')).toBeDefined()

})