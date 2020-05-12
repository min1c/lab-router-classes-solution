import React from 'react';
import Col from 'react-bootstrap/Col'

export const API_URL = 'https://ghibliapi.herokuapp.com/films';

export const KEY_LABELS = {
  'title': 'Title',
  'description': 'Description',
  'director': 'Director',
  'producer': 'Producer',
  'release_date': 'Release Date',
  'rt_score': 'Rotten Tomatoes Score',
  'people': 'People',
  'species': 'Species',
  // 'locations': 'Locations',
  // 'vehicles': 'Vehicles',
}

export const INCOMPLETE_1_HTML = (
  <>
    <li>In <strong>App.js</strong>:</li>
    <ol>
      <li>
        {`Modify the behaviour of the Navbar.Brand and Nav.Link elements to behave as a react-router <NavLink>.`}<br/>
        <ul>
          <li>{`Using <NavLink> will not trigger a full page refresh when navigating within a router.`}</li>
          <li>{`Hint: Use 'as' attribute`}</li>
        </ul>
      </li>
      <li>
        {`Replace the current <Home> return with  two <Route> components within a <Switch> component`}
        <ol type="a">
          <li>{`The first route will render the <Films> component if the path is "/films"`}</li>
          <li>{`The second route will render the <Home> component if the path is "/"`}</li>
        </ol>
      </li>
    </ol>
  </>
);

export const INCOMPLETE_2_HTML = (
  <>
    <li>In <strong>FilmsClass.js</strong>:</li>
    <ol>
      <li>{`Add state variables for "films" and "id"`}</li>
      <li>{`Add a lifecycle method which fetches the films and sets the films state upon first time loading`}</li>
      <li>{`Get the match object in the render method`}
        <ul>
          <li>{`Add a "to" property to the ListGroup.Item elements to link to the film details. Use the match object and film.id`}</li>
        </ul>
      </li>
      <li>{`Replace { C.INCOMPLETE_2_FULL } with  two <Route> components within a <Switch> component`}
        <ol type="a">
          <li>{`The first route will render the <FilmDetails> component if the path is exactly the match path + "/:id"`}</li>
          <li>{`The second route will render { C.SELECT_FILM } if the path is the match path`}</li>
        </ol>
      </li>
      <li>{`Add an event handler to the class`}
        <ol type="a">
          <li>{`It should accept selectedId and set the "id" state to selectedId`}</li>
          <li>{`Pass it as a prop called onIdChange to the FilmDetails component in the route you created in the previous step`}</li>
          <li>{`Add a "className" property to the ListGroup.Item elements that will conditionally set the class to "active" or "" depending if the state id matches the element's film.id`}</li>
        </ol>
      </li>
    </ol>
  </>
);

export const INCOMPLETE_3_HTML = (
  <>
    <li>In <strong>FilmDetailsClass.js</strong>:</li>
    <ol>
      <li>{`Add state variables for "film" and "filmChildren"`}</li>
      <li>{`Add lifecycle methods:`}
        <ol type="a">
          <li>{`Get "id" parameter from the match object`}</li>
          <li>{`Fetch the film and set the film state:`}
            <ul>
              <li>{`upon first time loading `}</li>
              <li>{`when id is different than previous id `}</li>
            </ul>
          </li>
          <li>{`Generate the film children and set the filmChildren state:`}
            <ul>
              <li>{`when film state is different from previous film state`}</li>
            </ul>
          </li>
        </ol>
      </li>
      <li>{`Add an event handler to the class`}
        <ol type="a">
          <li>{`It should accept id and pass it to the callback provided in the props by the parent`}</li>
          <li>{`This event handler should be called upon first time loading and when id is different than previous id`}</li>
        </ol>
      </li>
    </ol>
  </>
);

export const INCOMPLETE_2_FULL = (
  <>
    <Col as="dt" lg="3">Goals</Col>
    <Col as="dd" lg="9">
      <li>Display film list</li>
      <li>Set up routing using the film list to get film details</li>
    </Col>
    <Col as="dt" lg="3">Instructions</Col>
    <Col as="dd" lg="9">{INCOMPLETE_2_HTML}</Col>
  </>
);

export const INCOMPLETE_3_FULL = (
  <>
    <Col as="dt" lg="3">Goals</Col>
    <Col as="dd" lg="9">
      <li>Display film details</li>
      <li>Highlight selected film in film list</li>
    </Col>
    <Col as="dt" lg="3">Instructions</Col>
    <Col as="dd" lg="9">{INCOMPLETE_3_HTML}</Col>
  </>
);

export const SELECT_FILM = (
  <h4 className="display-4">
    <i>Please select a film.</i>
  </h4> 
);
