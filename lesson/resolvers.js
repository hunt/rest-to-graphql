const fetch = require('isomorphic-fetch')

const request = (path, query) => {
  return fetch(`http://localhost:3000${path}`)
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json()
  })
}

module.exports = {
  Idol: {
    height(doc, { unit = 'CM' }, { user }) {
      if (unit !== 'CM') return + (doc.height / 2.54 / 12).toFixed(2)
      return doc.height
    }
  },
  Query: {
    listIdol() {
      return request('/idols')
    },
    listGroup() {
      return request('/groups')
    }
  },
  Mutation: {
    login(doc, { username, password }) {
      return "Success"
    },
    createIdol(doc, { name }) {
      return ({
        id: 555,
        name: "ชื่อ",
        height: 167
      })
    }
  },
}