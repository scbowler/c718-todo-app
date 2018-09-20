import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import AddItem from './add_item';
import List from './list';
import dummyListData from '../dummy_data/list_data';

class App extends Component {
    state = {
        list: []
    }

    componentDidMount() {
        this.getListData();
    }

    getListData() {
        // Call server to get data

        this.setState({
            list: dummyListData
        });
    }

    addItem = (item) => {
        item._id = new Date().getTime();

        this.setState({
            list: [item, ...this.state.list]
        });
    }

    deleteItem = index => {
        const { list } = this.state;

        const listCopy = list.slice();

        listCopy.splice(index, 1);

        this.setState({
            list: listCopy
        });
    }

    render(){
        const { list } = this.state;

        return (
            <div className="container">
                <h1 className="center">To Do App</h1>
                <AddItem add={this.addItem}/>
                <List data={list} delete={this.deleteItem}/>
            </div>
        );
    }
}

export default App;
