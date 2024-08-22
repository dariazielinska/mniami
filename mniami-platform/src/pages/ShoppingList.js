import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { firestore } from '../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

function ShoppingList() {
  const { currentUser } = useAuth()
  const [shoppingList, setShoppingList] = useState(null)

  useEffect(() => {
    const fetchShoppingList = async () => {
      if (currentUser) {
        try {
          const shoppingListRef = doc(
            firestore,
            'shoppingLists',
            currentUser.uid
          )
          const docSnap = await getDoc(shoppingListRef)
          if (docSnap.exists()) {
            setShoppingList(docSnap.data())
          } else {
            setShoppingList({ items: [] })
          }
        } catch (error) {
          console.error('Error fetching shopping list:', error)
        }
      }
    }
    fetchShoppingList()
  }, [currentUser])

  return (
    <div>
      <Header />
      ZAKŁADKA LISTA ZAKUPÓW
      <div>
        {currentUser ? (
          shoppingList ? (
            <ul>
              {shoppingList.items.length === 0 ? (
                <p>Twoja lista zakupów jest pusta.</p>
              ) : (
                shoppingList.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} {item.unit}
                  </li>
                ))
              )}
            </ul>
          ) : (
            <p>Ładowanie listy zakupów...</p>
          )
        ) : (
          <p>Musisz być zalogowany, aby zobaczyć swoją listę zakupów.</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ShoppingList
