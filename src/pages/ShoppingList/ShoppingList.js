import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthProvider'
import { useShoppingList } from '../../hooks/useShoppingList'
import styled from '@emotion/styled'
import Header from '../../components/Header/Header'
import ProductAdder from './ProductAdder'
import Products from './Products'
import Footer from '../../components/Footer'

const Title = styled.h1`
  width: 90%;
  margin: 20px auto 9px auto;
  font-size: 24px;
  font-weight: 500;
`

function ShoppingList() {
  const { currentUser } = useAuth()
  const {
    getShoppingList,
    addToShoppingList,
    removeFromShoppingList,
    toggleProductPurchased,
  } = useShoppingList()

  const [shoppingList, setShoppingList] = useState(null)

  useEffect(() => {
    const fetchShoppingList = async () => {
      if (currentUser) {
        try {
          const list = await getShoppingList()
          setShoppingList(list)
        } catch (error) {
          console.error('Error fetching shopping list:', error)
        }
      }
    }
    fetchShoppingList()
  }, [currentUser, getShoppingList])

  const handleAddProduct = async (newProduct) => {
    if (!currentUser || !shoppingList) return

    const updatedList = {
      ...shoppingList,
      items: [...shoppingList.items, newProduct],
    }

    try {
      await addToShoppingList([newProduct], shoppingList.items)
      setShoppingList(updatedList)
    } catch (error) {
      console.error('Error updating shopping list:', error)
    }
  }

  const handleDeleteProduct = async (product) => {
    try {
      await removeFromShoppingList(product)
      setShoppingList((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.name !== product.name),
      }))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleCheckProduct = async (product) => {
    try {
      await toggleProductPurchased(product)
      setShoppingList((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.name === product.name
            ? { ...item, purchased: !item.purchased }
            : item
        ),
      }))
    } catch (error) {
      console.error('Error toggling purchased status:', error)
    }
  }

  return (
    <div>
      <Header />
      <ProductAdder onAddProduct={handleAddProduct} />
      <Title>Lista zakupów</Title>
      {currentUser ? (
        shoppingList ? (
          <Products
            items={shoppingList.items}
            onDelete={handleDeleteProduct}
            onCheck={handleCheckProduct}
          />
        ) : (
          <p>Ładowanie listy zakupów...</p>
        )
      ) : (
        <p>Musisz być zalogowany, aby zobaczyć swoją listę zakupów.</p>
      )}
      <Footer />
    </div>
  )
}

export default ShoppingList
