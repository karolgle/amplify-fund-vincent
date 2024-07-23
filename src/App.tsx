import {useEffect, useState} from "react";
import type {Schema} from "../amplify/data/resource";
import {generateClient} from "aws-amplify/data";
import {Authenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>();

function App() {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
    const [funds, setFunds] = useState<Array<Schema["fund"]["type"]>>([]);

    useEffect(() => {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });

        client.models.fund.observeQuery().subscribe({
            next: (data) => setFunds([...data.items]),
        });

    }, []);

    function createTodo() {
        client.models.Todo.create({content: window.prompt("Todo content")});
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({id})
    }

    return (

        <Authenticator>
            {({signOut, user}) => (
                <main>
                    {/*                    <h1>My todos</h1>
                    <button onClick={createTodo}>+ new</button>
                    <ul>
                        {todos.map(todo => <li
                            onClick={() => deleteTodo(todo.id)}
                            key={todo.id}>
                            {todo.content}</li>
                        )}
                        {todos.length === 0 && <li>No todos</li>}
                    </ul>*/}
                    <h1>Funds</h1>
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

                    <button onClick={signOut}>Sign out</button>
                    <h1>{user?.signInDetails?.loginId}'s todos</h1>
                </main>

            )}
        </Authenticator>
    );
}

export default App;
