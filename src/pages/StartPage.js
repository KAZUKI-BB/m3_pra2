// 各フックのインポート
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axiosを使用してAPI呼び出し

const StartPage = () => {
    // ユーザ名とパスワードを保存するステートの宣言
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // ページ遷移に使うuseNavigate関数の取得
    const navigate = useNavigate();

    // ログインボタンクリックでhandleLogin関数を呼び出し
    const handleLogin = async () => {
        try {
            // POSTリクエストを用いて認証トークンを取得
            const response = await axios.post('http://localhost:8085/api/auth/login', {
                username,
                password
            });

            // 認証成功後セッションをストレージに保存
            if (response.status === 200) {
                sessionStorage.setItem('authToken', response.data.token);
                // selectページに遷移
                navigate('/select');
            }
        } catch (error) {
            // 認証失敗時にはエラーメッセージをアラート表示
            alert('The username or password is incorrect.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default StartPage;


