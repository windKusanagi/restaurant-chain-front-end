import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchEmployees } from '../actions/';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';

// Container for Employees View, based on Thumbnail module imported from 
// react-bootstrap
class EmployeesIndex extends Component {

    // Fetch employees' data from remote server(Promise based)
    componentDidMount() {
        this.props.fetchEmployees();
    }

    // Render Thumbnail item according to the number of employees
    renderThumbnail() {
        const { employees } = this.props;
        // lodash map function to get each employee in employees' list and render Carousel Item
        return _.map(employees, employee => {
            const employeeSubject = employee.employeeSex==1?"Mr. ":"Ms. "
            return (
                <Col xs={10} xsOffset={1} md={4} mdOffset={1} key={employee.employeeId}>
                    <Thumbnail style={thumbnailMargin} src={employee.employeePhoto} alt="242x200">
                        <h4> {employeeSubject}{employee.employeeFirstname}</h4>
                        <p> Title:{` ${employee.employeeTitle}`}</p>
                        <p> Restaurant Serial Number:{` ${employee.employeeBelong}`}</p>
                        <p>
                            <Button bsStyle="primary">Edit</Button>&nbsp;
                            <Button bsStyle="danger">Fire!</Button>
                        </p>
                    </Thumbnail>

                </Col>

            );
        })
    }

    render() {
        // ES6 to get prop from this.props
        const { employees } = this.props;
        // if employees' data is not presented, return Loading       
        if (!employees) {
            return (
                <div>
                    <br />
                    <br />
                    <div>Loading ... </div>
                </div>
            )
        } 
        return (
            <div>
                <br />

                <Grid>
                    {this.renderThumbnail()}
                </Grid>

            </div>
        );
    }
}

// map the employees' data in application level state to the props of 
// EmployeesIndex component
function mapStateToProps(state) {
    return { employees: state.employees };
}

// Connect the action creator and the props item from application level state 
// to the EmployeesIndex View, then the fetchEmployees action and the employees' data 
// is available to this.props
export default connect(mapStateToProps, { fetchEmployees })(EmployeesIndex);

const thumbnailMargin = {
    marginTop: 20 + 'px',
    marginBottom: 20 + 'px'
}

