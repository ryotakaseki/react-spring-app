import React, { useState, useEffect } from 'react';

// APIのベースURL
const API_URL = 'http://localhost:8080/api/todos';

/**
 * TodoPageコンポーネント
 * Reactにおける「コンポーネント」とは、UIを構成する独立した部品のこと。
 * このコンポーネントがTODOリスト機能全体を担当する。
 */
function TodoPage() {

    // === Reactフック: stateの定義 ===
    // stateはコンポーネントが持つ「状態」や「記憶」。
    // stateが更新されると、画面が自動的に再描画される。

    // TODOリスト全体を保持するstate
    const [todos, setTodos] = useState([]);
    // 新規タスクの入力フォームの文字列を保持するstate
    const [newTodoTitle, setNewTodoTitle] = useState('');

    // === Reactフック: useEffectの定義 ===
    // useEffectは、特定のタイミングで処理を実行するためのフック。
    // ここでは、画面が最初に表示されたとき(マウント時)に、APIからTODOリストを取得する。
    useEffect(() => {
        fetchTodos();
    }, []); // 第2引数の配列が空なので、マウント時に一度だけ実行される

    // --- API通信関数 --- 

    // (R) GET: 全タスクを取得してstateを更新する
    const fetchTodos = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Error fetching todos:', error));
    };

    // (C) POST: 新しいタスクを追加する
    const handleAddTodo = () => {
        if (!newTodoTitle.trim()) return; // 空の場合は何もしない
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTodoTitle }),
        })
        .then(response => response.json())
        .then(newTodo => {
            setTodos([...todos, newTodo]); // 現在のリストの末尾に新しいタスクを追加
            setNewTodoTitle(''); // 入力フォームを空にする
        })
        .catch(error => console.error('Error adding todo:', error));
    };

    // (U) PUT: タスクの完了/未完了を切り替える
    const handleToggleTodo = (id, completed) => {
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !completed }),
        })
        .then(() => {
            // stateを直接書き換えるのではなく、新しい配列を作って更新する
            const updatedTodos = todos.map(todo =>
                todo.id === id ? { ...todo, completed: !completed } : todo
            );
            setTodos(updatedTodos);
        })
        .catch(error => console.error('Error updating todo:', error));
    };

    // (D) DELETE: タスクを削除する
    const handleDeleteTodo = (id) => {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            // 指定されたID以外のタスクで新しい配列を作ってstateを更新
            const filteredTodos = todos.filter(todo => todo.id !== id);
            setTodos(filteredTodos);
        })
        .catch(error => console.error('Error deleting todo:', error));
    };

    // === JSX: コンポーネントの見た目を定義 ===
    // HTMLに似ているが、JavaScriptの拡張構文。Reactのコンポーネントは最終的にこれを返す。
    return (
        <div>
            <h2>TODOリスト</h2>

            {/* 新規タスク追加フォーム */}
            <div>
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="新しいタスクを入力"
                />
                <button onClick={handleAddTodo}>追加</button>
            </div>

            {/* タスク一覧 */}
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo.id, todo.completed)}
                        />
                        {todo.title}
                        <button onClick={() => handleDeleteTodo(todo.id)} style={{ marginLeft: '10px' }}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoPage;
