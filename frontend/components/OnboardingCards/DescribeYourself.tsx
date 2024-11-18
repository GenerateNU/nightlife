import React, { useState } from "react";

const DescribeYourself = () => {
    const [bio, setBio] = useState('');

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= 160) {
            setBio(e.target.value);
        }
    };

    return (
        <div>
            <h1>Describe Yourself</h1>
            <h3>What makes you special? Don't think too hard, just have fun with it</h3>
            <textarea
                value={bio}
                onChange={handleBioChange}
                placeholder="Your bio"
            />
            <p>{bio.length}/160</p>
        </div>
    );
};

export default DescribeYourself;
