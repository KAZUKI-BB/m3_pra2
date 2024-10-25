// 各フックのインポート
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RequireAuth from '../components/RequireAuth';

const ProfilePage = () => {
    // ユーザ名とニックネーム保存用のステート
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    // ページ遷移用関数useNavigateの取得
    const navigate = useNavigate();

    // ページの読み込み時にプロフィール情報を取得
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = sessionStorage.getItem('authToken');
                const response = await axios.get('http://localhost:8085/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setUsername(response.data.username);
                    setNickname(response.data.nickname);
                }
            } catch (error) {
                alert('プロフィール情報の取得に失敗しました');
            }
        };

        // プロフィール情報の取得を実行
        fetchProfile();
    }, []); // 初回レンダリング時のみの実行

    // プロフィール情報の更新処理
    const handleUpdateProfile = async () => {
        try {
            const token = sessionStorage.getItem('authToken');
            const response = await axios.put('http://localhost:8085/api/profile', {
                username,
                nickname
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                alert('プロフィールが更新されました');
                // 選択画面に戻る
                navigate('/select');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('The username is already taken.');
            } else {
                alert('プロフィールの更新に失敗しました');
            }
        }
    };

    return (
        <RequireAuth>
            <div>
                <h1>ProfilePage</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <button onClick={handleUpdateProfile}>Update Profile</button>
            </div>
        </RequireAuth>
    );
};

export default ProfilePage;
