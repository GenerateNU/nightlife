import React from "react";
import { useState } from "react";

const CreateUsernmae = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    };

    return (
        <div>
            <h1>What should we call you?</h1>
            <h3>Your @username is unique. You can always change it later</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={handleChange}
                />
                <button type="submit">Save</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default CreateUsernmae;