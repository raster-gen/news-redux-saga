export const getLatestNews = async (search) => {
  const request = await fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${search}&tags=story&hitsPerPage=10&page=0`)
  return await request.json()
}

export const getPopularNews = async () => {
  const request = await fetch(`http://hn.algolia.com/apii/v1/search_by_date?query=&tags=story&hitsPerPage=10&page=0`)
  return await request.json()
}
