import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as C from './FilmConstants'

export class FilmDetails extends React.Component {

  // 1. Add state variables for "film" and "filmChildren"
  // 2. Add lifecycle methods:
  //    a. Get "id" parameter from the match object
  //    b. Fetch the film and set the film state:
  //       - upon first time loading 
  //       - when id is different than previous id 
  //    c. Generate the film children and set the filmChildren state
  //       - when film state is different from previous film state
  // 3. Add an event handler to the class
  //    a. It should accept id and pass it to the callback provided in the props by the parent
  //    b. This event handler should be called upon first time loading and when id is different than previous id

  constructor(props) {
    super(props);
    this.state = { film: {}, filmChildren: {} };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    this.handleChange(id);
    const film = await fetchFilm(id);
    this.setState({ film: film, filmChildren: {} });
  }

  async componentDidUpdate(prevProps, prevState) {
    const id = this.props.match.params.id;
    if (id !== prevProps.match.params.id) {
      this.handleChange(id);
      const film = await fetchFilm(id);
      this.setState({ film: film });
    }
    else if (prevState.film !== this.state.film && Object.keys(this.state.film).length > 0) {
      this.generateChildren();
    }
  }

  componentWillUnmount() {
    this.handleChange("");
  }

  handleChange(id) {
    this.props.onIdChange(id);
  }

  generateChildren() {
    this.setState({ filmChildren: {} });
    Object.entries(this.state.film).map( async ([key, value]) => {
      let formattedValue = value;
      if (value instanceof Array) {
        if (value.length !== 1  || value[0].lastIndexOf('/') !== value[0].length - 1) {
          formattedValue = await fetchChildren(value);
        }
        else {
          formattedValue = "None are currently available in the database";
        }
      }
      this.setState((state) => { 
        return { filmChildren: {...state.filmChildren, [key]: formattedValue} }; 
      });
    });
  }

  render() {
    const film = this.state ? this.state.film : {} ;
    const filmChildren = this.state ? this.state.filmChildren : {} ;
    const filmElements = getFilmElements(film, filmChildren);
    
    return (
      <>
        <h4 className="display-4">{ !this.state ? "Part 3 Incomplete" : film.title ? film.title : ""}</h4>
        <br/>
        <Row as="dl">
          { !this.state ? C.INCOMPLETE_3_FULL : filmElements.length > 0 ? filmElements : <></> }
        </Row>
      </>
    );
  }
}

async function fetchFilm(id) {
  const response = await fetch(`${C.API_URL}/${id}`);
  return response.json();
}

async function fetchChildren(url) {
  const promises = url.map(async item => {
    const response = await fetch(item + '?fields=name');
    return response.json();
  });
  return Promise.all(promises).then(function(value) { 
    value.forEach(json => delete json['length']); 
    return value;
  });
}

function getFilmElements(film, filmChildren) {
  return Object.keys(film).map( key => {
    if (key in C.KEY_LABELS) {
      let formattedValue = !filmChildren[key] 
          ? "Loading..." 
          : Array.isArray(filmChildren[key]) 
          ? filmChildren[key].map((item, index) => ( <React.Fragment key={`${filmChildren[key]}-${index}`}>{item.name}<br/></React.Fragment> )) 
          : filmChildren[key];
      return (        
        <React.Fragment key={key}>
          <Col as="dt" lg="3">{C.KEY_LABELS[key]}</Col>
          <Col as="dd" lg="9">{formattedValue}</Col>
        </React.Fragment>
      );
    }
    return <React.Fragment key={key}></React.Fragment>;
  })
};
