import React, { Component } from 'react';
import axios from 'axios';
import NavBtn from './nav_btn';
import config from '../config';

class AddItem extends Component {
    state = {
        title: '',
        details: ''
    }

    handleAddItem = async (e) => {
        e.preventDefault();
        
        await axios.post(`${config.API_URL}/todos${config.API_KEY}`, this.state);

        this.props.history.push('/');
    }

    render(){
        const { title, details } = this.state;

        return (
            <div>
                <h1 className="center">Add To Do Item</h1>
                <NavBtn to="/" text="Back To List" color="purple darken-2"/>
                <form onSubmit={this.handleAddItem}>
                    <div className="row">
                        <div className="col s8 offset-s2">
                            <label>Title</label>
                            <input
                                onChange={(e) => this.setState({ title: e.target.value })}
                                type="text"
                                value={title}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s8 offset-s2">
                            <label>Details</label>
                            <input
                                onChange={({ target }) => this.setState({ details: target.value })}
                                type="text"
                                value={details}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s8 offset-s2 right-align">
                            <button className="btn purple darken-2">Add Item</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddItem;
