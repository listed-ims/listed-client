import React, { useEffect, useState } from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { Product } from '../../types/Product'
import ProductList from '../../components/ProductList'
import { getProductsService } from '../../services/ProductServices'


const Collaborators = () => {
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJveSIsImV4cCI6MTY4NTAwNzgzMiwidXNlciI6NywiaWF0IjoxNjg0OTIxNDMyfQ.2i9dknDYPfOwPnsPOVQnKepJPmUfOrBuRWAPQFtSZFWJZ8tn9zk7_QD5skkMXd4FUPiphpg5M8qB_lNk14YaVA";

  const [products, setProducts] = useState(Array<Product>)
  useEffect(() => {
    getProductsService(token).then((response) => {
      setProducts(response.data);
    })
      .catch((error: any) => (console.log(error)))
  }, [])


  return (
    <ScreenContainer>
      <ProductList data={products} onItemPress={() => { }} />
    </ScreenContainer>
  )
}

export default Collaborators