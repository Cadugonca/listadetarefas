import React from 'react'
import Header from "../components/Header/Header"
import List from "../components/List/List"
import "./index.scss"

const Inicial = () => {
  return (
    <div>
        <Header />
        <section>
             <h1>Otimize seu tempo e se organize com o nosso Planejador Diário</h1>
             <List/>

        </section>
    </div>
  )
}

export default Inicial