import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import axios from "axios";

const ClearPage = () => {
    const [ranking, setRanking] = useState([]);
    const navigate = useNavigate();

    // ランキング情報の取得
    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const token = sessionStorage.getItem('authToken');
                const queryParams = new URLSearchParams(window.location.search);
                const difficulty = queryParams.get('difficulty');

                const response = await axios.get(`http://localhost:8085/api/results?level=${difficulty}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setRanking(response.data.results);
                }
            } catch (error) {
                console.error('ランキングの取得に失敗しました:', error);
            }
        };

        fetchRanking();
    }, []);

    // リプレイボタンの処理
    const handleReplay = () => {
        navigate('/select');
    };

    // 時間のフォーマット
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <RequireAuth>
            <div>
                <h1>Clear Page</h1>
                <h2>Congratulations! You cleared the game.</h2>
                <h2>Ranking</h2>
                <ul>
                    {ranking.map((item, index) => (
                        <li key={index}>
                            {index + 1}. {item.username} - {formatTime(item.time)}
                        </li>
                    ))}
                </ul>
                <button onClick={handleReplay}>Replay</button>
            </div>
        </RequireAuth>
    );
};

export default ClearPage;
