import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import axios from 'axios';
import AddItem from './add_item';
import List from './list';
import dummyListData from '../dummy_data/list_data';

const BASE_URL = 'http://api.reactprototypes.com';
const API_KEY = '?key=c718_demouser';

class App extends Component {
    state = {
        list: [],
        error: ''
    }

    componentDidMount() {
        this.getListData();
    }

    async getListData() {
        // Call server to get data
        // http://api.reactprototypes.com/todos?key=somekey;

        try {
            const resp = await axios.get(`${BASE_URL}/todos${API_KEY}`);

            if(!resp.data.success){
                throw new Error('Something went wrong!');
            }

            this.setState({
                list: resp.data.todos
            });
        } catch(err){
            console.log('Get Data Error:', err);

            this.setState({
                error: 'Error retrieving list data'
            });
        }
    }

    addItem = async (item) => {
        await axios.post(`${BASE_URL}/todos${API_KEY}`, item);

        this.getListData();
    }

    deleteItem = async id => {
        console.log('Delete Item ID:', id);

        await axios.delete(`${BASE_URL}/todos/${id + API_KEY}`);

        this.getListData();
    }

    render(){
        const { list, error } = this.state;

        console.log('List:', list);
        return (
            <div className="container">
                <h1 className="center">To Do App</h1>
                <AddItem add={this.addItem}/>
                <p className="red-text">{error}</p>
                <List data={list} delete={this.deleteItem}/>
            </div>
        );
    }
}

export default App;
