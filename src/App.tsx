import {useEffect, useState} from "react";
import type {Schema} from "../amplify/data/resource";
import {generateClient} from "aws-amplify/data";
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import './index.css';
import logo from './assets/logo.png';

const client = generateClient<Schema>();

function App() {
    const [funds, setFunds] = useState<Array<Schema["fund"]["type"]>>([]);

    useEffect(() => {
        const fundSubscription = client.models.fund.observeQuery().subscribe({
            next: (data) => setFunds([...data.items]),
        });

        return () => {
            fundSubscription.unsubscribe();
        };
    }, []);

    return (
        <Authenticator>
            {({signOut, user}) => (
                <div id="root">
                    <header className="App-header">
                        <div className="header-content">
                            <img src={logo} className="logo" alt="logo"/>
                            <h1>Vincent's Fund</h1>
                        </div>
                        <div className="user-info">
                            <h2>{user?.signInDetails?.loginId}</h2>
                            <button onClick={signOut}>Sign out</button>
                        </div>
                    </header>
                    <main>
                        <div className="card">
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
                                        <th>Owner</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
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
                                            <td>{fund.owner}</td>
                                            <td>{fund.createdAt}</td>
                                            <td>{fund.updatedAt}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </Authenticator>
    );
}

export default App;