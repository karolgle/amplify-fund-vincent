import React, {useEffect, useState} from "react";
import type {Schema} from "../amplify/data/resource";
import {generateClient} from "aws-amplify/data";
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import './index.css';
import logo from './assets/logo.png';

const client = generateClient<Schema>();

function App() {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
    const [funds, setFunds] = useState<Array<Schema["fund"]["type"]>>([]);

    useEffect(() => {
        const todoSubscription = client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });

        const fundSubscription = client.models.fund.observeQuery().subscribe({
            next: (data) => setFunds([...data.items]),
        });

        return () => {
            todoSubscription.unsubscribe();
            fundSubscription.unsubscribe();
        };
    }, []);

    function createTodo() {
        client.models.Todo.create({content: window.prompt("Todo content")});
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({id});
    }

    return (
        <Authenticator>
            {({signOut, user}) => (
                <div id="root">
                    <header className="App-header">
                        <div className="header-content">
                            <img src={logo} className="logo" alt="logo"/>
                            <h1>Vincent's Fund</h1>
                        </div>
                    </header>
                    <main>
                        <div className="card">
                            <h2>Funds</h2>
                            <div className="table-container">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Email</th>
                                        <th>Quantity</th>
                                        <th>Amount</th>
                                        <th>Price</th>
                                        <th>Date/Time</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {funds.map(fund => (
                                        <tr key={fund.id}>
                                            <td>{fund.id}</td>
                                            <td>{fund.email}</td>
                                            <td>{fund.quantity}</td>
                                            <td>{fund.amount}</td>
                                            <td>{fund.price}</td>
                                            <td>{fund.datetime}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button onClick={signOut}>Sign out</button>
                        <h2>{user?.signInDetails?.loginId}'s todos</h2>
                    </main>
                </div>
            )}
        </Authenticator>
    );
}

export default App;
