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
import { KEY_LABELS } from './FilmConstants';

export class Films extends React.Component {

  constructor(props) {
    super(props);
    this.state = { films: [], selected: ""};
    this.selectFilm = this.selectFilm.bind(this);
  }

  async componentDidMount() {
    const response = await fetch(`https://ghibliapi.herokuapp.com/films?fields=id,title`);
    const json = await response.json();
    this.setState({ films: json, selected: this.props.match.params.id});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState( { selected: this.props.match.params.id? this.props.match.params.id : undefined });
    }
  }
  
  selectFilm(filmId) {
    if (filmId !== this.state.selected) {
      this.setState({selected: filmId});
    } 
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
                      const elementClass = (this.state.selected !== null) ? "active" : "";
                      return (
                        <ListGroup.Item onClick={() => this.selectFilm(film.id)} 
                                        as={Link} 
                                        key={film.id} 
                                        action 
                                        variant='light'
                                        to={
                                          this.props.match.params.id 
                                          ? `${this.props.match.path.slice(0, this.props.match.path.lastIndexOf('/'))}/${film.id}` 
                                          : `${this.props.match.url}/${film.id}`
                                        }
                                        className={film.id === this.state.selected? elementClass : ""}>
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
                      <SelectFilmScreen />
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

class FilmDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = { filmId: "", film: {}};
  }

  async componentDidMount() {
    const response = await fetch(`https://ghibliapi.herokuapp.com/films/` + this.props.match.params.id);
    const json = await response.json();
    this.setState({ film: json });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const id = this.props.match.params.id;
      const response = await fetch(`https://ghibliapi.herokuapp.com/films/` + id);
      const json = await response.json();
      this.setState({ film: json });
    }
  }

  getFilmElements() {
    return Object.entries(this.state.film).map(([key, value], index) => {
      if (key in KEY_LABELS) {
        return (        
          <React.Fragment key={key}>
            <Col as="dt" lg="3">{KEY_LABELS[key]}</Col>
            <Col as="dd" lg="9">{value}</Col>
          </React.Fragment>
        );
      }
      return <React.Fragment key={key}></React.Fragment>;
    })
  };

  render() {
    const film = this.state.film;
    return (
      <>
        <h4 className="display-4">{film.title}</h4>
        <br/>
        <Row as="dl">
          {this.getFilmElements()}
        </Row>
      </>
    );
  }
}

function SelectFilmScreen() {
  return (
    <h4 className="display-4">
      <i>Please select a film.</i>
    </h4>
  );
}
