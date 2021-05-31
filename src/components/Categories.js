import React from 'react'
import { Container, Row, Col, ListGroup, NavDropdown } from 'react-bootstrap'
import Sort from './Sort'

const Categories = props => {
    const selected = props.selectedCategories.map((obj, i) => {
        return(
            <ListGroup.Item 
            key={i} 
            id={obj.name}
            className={props.activeCategory.toLowerCase() === obj.name.toLowerCase() && 'active'}
            onClick={props.makeActive}>{obj.name}</ListGroup.Item>
        )
    })
    const more = props.allCategories.map((obj, i) => {
        return(
            <ListGroup.Item 
            key={i} 
            id={obj.name}
            className={props.activeCategory.toLowerCase() === obj.name.toLowerCase() && 'active'}
            onClick={props.makeActive}>{obj.name}</ListGroup.Item>
        )
    })
    return (
        <Container className="categories_wrapper justify-content-center">
            <Row>
            <Col>
            <ListGroup horizontal>
                <ListGroup.Item 
                id="All"
                className={props.activeCategory === 'All' && 'active'}
                onClick={props.makeActive}>All</ListGroup.Item>
                {selected}
            </ListGroup>
            </Col>
            <Col>
            <NavDropdown title="More" id="navbarScrollingDropdown" menuVariant="light">
                {more}
                {/*<NavDropdown.Divider />
                <NavDropdown.Item href="#action">Misc</NavDropdown.Item>*/}
            </NavDropdown>
            </Col>
            <Col><Sort /></Col>
            </Row>
        </Container>
    )
}

export default Categories
