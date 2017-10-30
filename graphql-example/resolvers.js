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
  Query: {
    groups() {
      return request('/groups')
    },
    async idols(doc, { limit = 10 }) {
      const result = await request('/idols')
      return result.slice(0, limit)
    }
  },
  Mutation: {
    addIdol(doc, { name, team }) {
      return ({
        name,
        team
      })
    }
  },
  Group: {
  },
  Idol: {
    age(doc) {
      const birthdate = new Date(doc.birthdate)
      const currentYear = new Date().getYear()
      return currentYear - birthdate.getYear()
    },
    height(doc, { unit = 'CM' }) {
      return unit === 'CM' ? doc.height : parseFloat(((doc.height / 2.54) / 12).toFixed(2))
    },
    group(doc) {
      return request(`/groups/${doc.group}`)
    }
  },
}