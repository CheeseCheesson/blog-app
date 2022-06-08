/* eslint-disable */
import { fetchToken } from './fetchToken'
class ApiService {
  baseStr = 'https://kata.academy:8021/api'

  async getAarticleFull(slug, data) {
    let { token } = data || ''
    const url = new URL(`${this.baseStr}/articles/${slug}`)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }).catch((err) => err.message)

    return response.json()
  }

  async postCreateArticle(newArticle) {
    const url = new URL(`${this.baseStr}/articles`)
    const token = await fetchToken()
    const body = {
      article: newArticle,
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    }).catch((err) => err.message)

    return response.json()
  }

  async deleteArticle(slug) {
    const url = new URL(`${this.baseStr}/articles/${slug}`)
    const tokenDelete = await fetchToken()
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${tokenDelete}`,
      },
    }).catch((err) => err.message)

    return response
  }

  async putArticleUpdate(slug, modifiedArticle) {
    const url = new URL(`${this.baseStr}/articles/${slug}`)
    const tokenUpdate = await fetchToken()
    const body = {
      article: modifiedArticle,
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${tokenUpdate}`,
    }

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    })

    return response.json()
  }

  async postAddFavorites(slug) {
    const url = new URL(`${this.baseStr}/articles/${slug}/favorite`)
    const tokenAddFavorites = await fetchToken()
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${tokenAddFavorites}`,
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
    })
    return response.json()
  }

  async deleteFavorites(slug) {
    const url = new URL(`${this.baseStr}/articles/${slug}/favorite`)
    const tokenDeleteFavorites= await fetchToken()
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${tokenDeleteFavorites}`,
      },
    }).catch((err) => err.message)
    return response.json()
  }
}

const apiService = new ApiService()

export default apiService
