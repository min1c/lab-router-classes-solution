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

  // 1. Add state variables for "films" and "id"
  // 2. Add a lifecycle method which fetches the films and sets the films state upon first time loading
  // 3. Get the match object in the render method
  //    -  Add a "to" property to the ListGroup.Item elements to link to the film details. Use the match object and film.id
  // 4. Replace { C.INCOMPLETE_2_FULL } with  two <Route> components within a <Switch> component
  //    a. The first route will render the <FilmDetails> component if the path is exactly the match path + "/:id"
  //    b. The second route will render { C.SELECT_FILM } if the path is the match path
  // 5. Add an event handler to the class
  //    a. It should accept selectedId and set the "id" state to selectedId
  //    b. Pass it as a prop called onIdChange to the FilmDetails component in the route you created in the previous step
  //    c. Add a "className" property to the ListGroup.Item elements that will conditionally set the class to "active" or "" 
  //       depending if the state id matches the element's film.id

  constructor(props) {
    super(props);
    this.state = { films: [], id: "" };
    this.handleIdChange = this.handleIdChange.bind(this);
  }

  async componentDidMount() {
    const films = await fetchFilms();
    this.setState({ films: films });
  }

  handleIdChange(selectedId) {
    this.setState({id: selectedId});
  }

  render() {
    const films = this.state ? this.state.films : [{"title": "Lab incomplete"}];
    const match = this.props.match;
    const id = this.state.id;
    
    return (
      <Container>
        <h3 className="display-3" style={{'marginBottom': '10px'}}>
          { !this.state ? "Part 2 Incomplete" : films.length > 0 ? "Ghibli Films" : ""}
        </h3>
        <Row>
          <Tab.Container id="film-list-container">
            <Row>
              <div style={{'height': '70vh', 'overflowY': 'auto', 'padding': 0}}>
                <ListGroup id="filmList">
                  {
                    films.map(film => {
                      return (
                        <ListGroup.Item as={ Link } key={ film.id } action variant='light'
                                        to={ `${match.url}/${film.id}` }
                                        className={ id && id === film.id? "active" : ""}
                                        >
                          {film.title}
                        </ListGroup.Item>
                      );
                    })
                  }
                </ListGroup>
              </div>
              <Col style={{'height': '70vh', 'overflowY': 'auto'}}>
                <Tab.Content>
                  <Switch>
                    <Route exact path={`${match.path}/:id`} render={(props) => <FilmDetails {...props} onIdChange={this.handleIdChange} />} />
                    <Route path={`${match.path}`}>
                      { C.SELECT_FILM }
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

async function fetchFilms() {
  const response = await fetch(`${C.API_URL}?fields=id,title`);
  return response.json();
}
