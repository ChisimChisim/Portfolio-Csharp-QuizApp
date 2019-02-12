import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreatorsCategory } from '../store/Category';
import { Link } from 'react-router-dom';
import { Thumbnail, Grid, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';



class Home extends Component {

    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestGetCategory();
    }

  render() {
    return (
      <div>
            <h1>Let's start!</h1>
            <h4>What category would you like to try?</h4>
            {renderSelectCategory(this.props)}
      </div>
    );
  }
}

function renderSelectCategory(props) {
  return (
      <div>
          <Grid fluid>
              <Row>
                  {props.categories.map(category =>
                      <Col xs={6} md={4} key={category.id}>
                          <Thumbnail>
                              <div style={{textAlign: 'center' }}>
                              <h3>{category.name}</h3>
                              <div className='btn-group'>
                                  <Link className='btn btn-info' to={`/quiz/${category.id}/1`}>Easy</Link>
                                  <Link className='btn btn-warning' to={`/quiz/${category.id}/2`}>Midium</Link>
                                  <Link className='btn btn-danger'  to={`/quiz/${category.id}/3`}>hard</Link>
                                  </div>
                                  </div>

                          </Thumbnail>
                      </Col>
                  )}
              </Row>
                  </Grid>
                     
  </div>
  );
}

export default connect(
  state => state.category,
  dispatch => bindActionCreators(actionCreatorsCategory, dispatch)
)(Home);
