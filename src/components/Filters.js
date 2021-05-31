import React, { Fragment } from 'react'

import Search from './Search'
import Categories from './Categories'


const Filters = props => {
    return (
        <Fragment>
            {(props.show === 'search') && <Fragment><Search /> <Categories 
            activeCategory={props.activeCategory} 
            selectedCategories={props.selectedCategories} 
            allCategories={props.allCategories}
            makeActive={props.makeActive} /></Fragment>}
        </Fragment>
    )
}

export default Filters
