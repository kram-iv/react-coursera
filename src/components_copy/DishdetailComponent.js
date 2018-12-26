import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle } from 'reactstrap';
import moment from 'moment';

class DishDetail extends Component {

    renderDish(dish) {
        if (dish != null) {
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }


    renderComments(dishComments) {
        if (dishComments != null)
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {dishComments.map((c) => {
                            return (
                                <div key={c.id}>
                                    <li>{c.comment}</li>
                                    <li>-- {c.author}, {moment(c.date).format("ll")}</li>
                                    <br/>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

    render() {
        if ( this.props.selectedDish != null && 
             this.props.selectedDish.comments != null ) {
             // store comments array for selected dish in var selectedDishComments
            var selectedDishComments  = this.props.selectedDish.comments;
        }
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(selectedDishComments)}
                </div>
            </div>
        );
    }
}

export default DishDetail;
