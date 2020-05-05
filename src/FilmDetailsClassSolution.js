import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as C from './FilmConstants'

export class FilmDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = { film: {}, filmChildren: {} };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await fetch(`https://ghibliapi.herokuapp.com/films/` + id);
    const json = await response.json();
    this.setState({ film: json, filmChildren: {} });
    
    if (Object.keys(this.state.film).length > 0) {
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
        this.setState({ filmChildren: {...this.state.filmChildren, [key]: formattedValue} })
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const id = this.props.match.params.id;
      const response = await fetch(`https://ghibliapi.herokuapp.com/films/` + id);
      const json = await response.json();
      this.setState({ film: json });
    }
    if (prevState.film !== this.state.film) {
      this.setState({ filmChildren: {} });
      if (Object.keys(this.state.film).length > 0) {
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
          this.setState({ filmChildren: {...this.state.filmChildren, [key]: formattedValue} })
        });
      }
    }
  }
  

  getFilmElements() {
    return Object.keys(this.state.film).map( key => {
      let content = ""
      if (key in C.KEY_LABELS) {
        let formattedValue = !this.state.filmChildren[key] 
            ? "Loading..." 
            : Array.isArray(this.state.filmChildren[key]) 
            ? JSON.stringify(this.state.filmChildren[key], null, 2) 
            : this.state.filmChildren[key];
        return (        
          <React.Fragment key={key}>
            <Col as="dt" lg="3">{C.KEY_LABELS[key]}</Col>
            <Col as="dd" lg="9">{formattedValue}</Col>
          </React.Fragment>
        );
      }
      return <React.Fragment key={key}>{content}</React.Fragment>;
    })
  };

  render() {
    const film = this.state.film;
    const filmElements = this.getFilmElements();
    return (
      <>
        <h4 className="display-4">{film.title}</h4>
        <br/>
        <Row as="dl">
          { filmElements.length > 0 ? filmElements : C.INCOMPLETE_FILM_DETAILS }
        </Row>
      </>
    );
  }
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