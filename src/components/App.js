import React, { useState, useEffect } from 'react'
//import { Router, Route, Link } from "react-router-dom";
//import logo from './logo.svg';
import '../css/App.css';

import Header from './Header'
import Filters from './Filters'
import Tools from './Tools'
import Footer from './Footer'


const App = () => {
  const selectedCategories_total = 4
  const [ activeCategory, setActiveCategory ] = useState('All')
  const [ selectedCategories, setSelectedCategories ] = useState([])
  const [ allCategories, setAllCategories ] = useState([])
  const [ tools, setTools ] = useState([])
  const [ sortby, setSortBy ] = useState('name')
  const [ sort, setSort ] = useState('DESC')

  useEffect(() => {   
    const getCategories = async () => {
      const categoriesFromServer = await fetchCategories()
      let sCategories = []
      for (let i = 0; i < selectedCategories_total; i++) {
        sCategories.push(categoriesFromServer[i])
      }
      const filteredAllCategories = categoriesFromServer.filter(obj=> sCategories.includes(obj) == false)

      setAllCategories(filteredAllCategories)
      setSelectedCategories(sCategories)
    }

    getCategories()

    const getTools = async () => {
      const toolsFromServer = await fetchTools()

      setTools(toolsFromServer)
    }

    getTools()    

    // test sort
    sortBy()

  }, [])

  // test sort
  function sortBy(){
    allCategories.sort(function(a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (sort === 'ASC'){
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      } 
      if (sort === 'DESC') {
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }        
      }

      // names must be equal
      return 0;
    });      
  }  

  // Fetch categories
  const fetchCategories = async () => {
    const res = await fetch('http://localhost:3000/categories')
    const data = await res.json()
    
    return data
  }
  // Fetch tools
  const fetchTools = async () => {
    const res = await fetch('http://localhost:3000/tools')
    const data = await res.json()
    
    return data
  }  

  function makeActive(e){
    let clicked = e.target.id;

    // set Active Category
    setActiveCategory(clicked);

    // dont go any further if we only clicked All
    if (clicked === 'All') return;

    const result = selectedCategories.find( ({ name }) => name === clicked );
    // if nothing in selected, add to selected
    if(result === undefined || result.length == 0){
      // pop removes from end and returns popped element
      const removedFromEnd = selectedCategories.pop()
      // unshift add to the beginning of array
      selectedCategories.unshift({"name": clicked})
      // add to useState
      setSelectedCategories(selectedCategories)

      // delected selected from All Categories
      const newAll = allCategories.filter( cat => {
        return cat.name != clicked
      })

      // add popped element from Selected Categories to All Categories
      setAllCategories(newAll.concat(removedFromEnd))
    }
  }

  return (
    <div className="App">
        <Header />
        <Filters 
        activeCategory={activeCategory}
        selectedCategories={selectedCategories} 
        allCategories={allCategories}
        show='search'
        makeActive={makeActive} />
        <Tools tools={tools} />
        <Footer />
    </div>
  )
}

export default App;
