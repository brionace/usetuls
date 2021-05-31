import React from 'react'
import { Container, CardDeck, Card } from 'react-bootstrap/'

const Tools = props => {
    const tools = props.tools.map((tool,i) => {
        return(
            <Card key={i} data-category={tool.category} data-updated={tool.update}>
                <Card.Img variant="top" src={tool.favicon} />
                <Card.Body>
                    <Card.Title>{tool.title}</Card.Title>
                    <Card.Text>{tool.description}</Card.Text>
                </Card.Body>
            </Card>
        )
    })
    return (
        <Container className="tools_wrapper">
            <CardDeck>
                {tools}
            </CardDeck>
        </Container>
    )
}

export default Tools

