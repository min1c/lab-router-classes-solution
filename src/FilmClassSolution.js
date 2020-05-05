import React from "react";
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import {
  Link,
  Route,
  Switch,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import * as C from './FilmConstants'
import { FilmDetails } from './FilmDetailsClassSolution';

export class Films extends React.Component {

  constructor(props) {
    super(props);
    this.state = { films: [] };
  }

  async componentDidMount() {
    const response = await fetch(`https://ghibliapi.herokuapp.com/films?fields=id,title`);
    const json = await response.json();
    this.setState({ films: json });
  }

  render() {
    return (
      <Container>
        <h3 className="display-3" style={{'marginBottom': '10px'}}>
          Ghibli Films
        </h3>
        <Row>
          <Tab.Container id="film-list-container">
            <Row>
              <Col md="3" lg="auto" style={{'height': '70vh', 'overflowY': 'auto', 'padding': 0}}>
                <ListGroup id="filmList">
                  {
                    this.state.films.map((film, index) => {
                      return (
                        <ListGroup.Item as={ Link } 
                                        key={ film.id } 
                                        action 
                                        variant='light'
                                        to={ this.props.match.params.id ? `${this.props.match.path.slice(0, this.props.match.path.lastIndexOf('/'))}/${film.id}` : `${this.props.match.url}/${film.id}` }
                                        className={ this.props.match.params.id !== null && film.id === this.props.match.params.id? "active" : ""}>
                          {film.title}
                        </ListGroup.Item>
                      );
                    })
                  }
                </ListGroup>
              </Col>
              <Col md="9" lg style={{'height': '70vh', 'overflowY': 'auto'}}>
                <Tab.Content>
                  <Switch>
                    <Route exact path={`${this.props.match.path}/:id`} component={FilmDetails}/>
                    <Route exact path={`${this.props.match.path}`}>
                      <C.SelectFilmScreen />
                    </Route>
                  </Switch>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Row>
      </Container>
    );
  }
}
