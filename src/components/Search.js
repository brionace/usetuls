import React from 'react'
import PropTypes from 'prop-types'

import { Container, Form, FormControl, Button } from 'react-bootstrap'

const Search = props => {
    return (
        <Container className="search_wrapper justify-content-center">
            <Form className="justify-content-center" inline>
                <FormControl
                type="search"
                placeholder="Search for tools"
                className="mr-2"
                arial-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
        </Container>
    )
}

Search.propTypes = {

}

export default Search
