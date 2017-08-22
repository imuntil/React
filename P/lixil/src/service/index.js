import request from '../utils/request'
const dev = false

const COMPANY_ID = 1
const devURL = 'http://192.168.2.98:8080/enterpriseSys'
const proURL = 'http://112.74.80.87:8080/enterpriseSys'
export const URL = dev ? devURL : proURL
const api = {
  fetchProductsById (id) {
    return request(URL + `/selProducts.action?companyId=${COMPANY_ID}&categoryId=${id}`)
  },
  fetchProductDetail (id) {
    return request(URL + `/selProductById.action?companyId=${COMPANY_ID}&productId=${id}`)
  },
  fetchNewsList () {
    return request(URL + `/selNewsTitle.action?companyId=${COMPANY_ID}`)
  },
  fetchNewsDetail (id) {
    return request(URL + `/selNewsContent.action?companyId=${COMPANY_ID}&newsId=${id}`)
  }
}
export default api
