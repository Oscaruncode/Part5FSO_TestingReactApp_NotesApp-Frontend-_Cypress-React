describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      'username': 'test',
      'password': 'test',
      'name': 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

  })

  it('Login can be open', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('[name="Username"]').type('test')
      cy.get('[name="Password"]').type('test')
      cy.contains('Login').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('[name="Username"]').type('test')
      cy.get('[name="Password"]').type('wrong')
      cy.contains('Login').click()
    })


  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('[name="Username"]').type('test')
      cy.get('[name="Password"]').type('test')
      cy.contains('Login').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('[name="Url"]').type('random.com')
      cy.get('[name="Title"]').type('The new blog')
      cy.get('[name="Author"]').type('Anon')
      cy.get('#createBlog').click()
      cy.contains('The new blog Anon')
    })

    describe('With only one Blog', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('[name="Url"]').type('random.com')
        cy.get('[name="Title"]').type('The new blog')
        cy.get('[name="Author"]').type('Anon')
        cy.get('#createBlog').click()
      })
      it('Click likes', function () {
        cy.contains('view').click()
        cy.contains('Likes 0')
        cy.contains('like').click()
        cy.contains('Likes 1')
      })

      it('User can Delete', function () {
        cy.contains('view').click()
        cy.contains('Delete').click()
        cy.get('body').should('not.contain', 'The new blog')
      })
    })
  })


  describe('With Multiples Blogs and customs commands cy', function() {
    beforeEach(function () {
      cy.login('test', 'test')
      cy.createBlog({
        'title': 'Menos Likes',
        'author': 'x',
        'url': 'PocoPopular.com',
        'likes': 2
      })
      cy.createBlog({
        'title': 'Mas likes',
        'author': 'Y',
        'url': 'MuyPopular.com',
        'likes': 13
      })
    })

    it('Order blogs is by likes', function () {
      cy.get('.blogEach').eq(0).should("have.text", "Mas likes Yview")
      cy.get('.blogEach').eq(1).should("have.text", "Menos Likes xview")
    })

  })


})