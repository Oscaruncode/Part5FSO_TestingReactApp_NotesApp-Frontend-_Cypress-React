const baseUrl = 'http://localhost:3003'

Cypress.Commands.add('login', (username, password) => {
  cy.request(
    'POST',
    `${baseUrl}/api/login`,
    { username, password }
  ).then(res => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(res.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (blog) => {
  const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
  cy.request({
    'url': `${baseUrl}/api/blogs`,
    'method': 'POST',
    'body': { ...blog },
    'headers': {
      'Authorization': `bearer ${user.token}`
    }
  })
  cy.visit('http://localhost:3000')
})
