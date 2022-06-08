import React, { useEffect } from 'react'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchGetArticlesByPageNum, paginationPageChange } from '../../redux/articles'
import Card from '../../components/UI/card/card'
import ErrorMessage from '../../components/error-massege/error-message'
import Loader from '../../components/loader/loader'

import './card-list.css'

const CardList = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user)
  const { token } = userData || ''
  const { maxPages, activePage, list, status, error } = useSelector((state) => state.articles)
  const handleChangePage = (pageNumber) => {
    dispatch(paginationPageChange(pageNumber))
  }
  useEffect(() => {
    dispatch(fetchGetArticlesByPageNum([(activePage - 1) * 5, token]))
  }, [activePage])

  return (
    <>
      {status === 'loading' && <Loader />}
      {error && <ErrorMessage description={error} />}
      {list && list.map((item) => <Card key={item.slug} {...item} />)}
      {list && (
        <div className="card__pagination">
          <Pagination
            style={{ margin: '0 auto' }}
            showSizeChanger={false}
            current={activePage}
            total={maxPages * 10}
            onChange={handleChangePage}
          />
        </div>
      )}
    </>
  )
}

export default CardList
