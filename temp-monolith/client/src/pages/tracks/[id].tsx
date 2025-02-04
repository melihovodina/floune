import React, { useState } from 'react';
import { ITrack } from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "../../hooks/useInput";

interface TrackPageProps {
    serverTrack: ITrack;
}

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {
    const [track, setTrack] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput('');
    const text = useInput('');

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            });
            setTrack({ ...track, comments: [...track.comments, response.data] });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <MainLayout
            title={"Музыкальная площадка - " + track.name + " - " + track.artist}
            keywords={'Music, artists, ' + track.name + ", " + track.artist}
        >
            <Button
                variant={"outlined"}
                style={{ fontSize: 32 }}
                onClick={() => router.push('/tracks')}
            >
                К списку
            </Button>
            <Grid container style={{ margin: '20px 0' }}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200} alt={track.name} />
                <div style={{ marginLeft: 30 }}>
                    <h1>Track name - {track.name}</h1>
                    <h1>Author - {track.artist}</h1>
                    <h1>Auditions - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Lyrics</h1>
            <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>
                <TextField
                    label="Your name"
                    fullWidth
                    {...username}
                />
                <TextField
                    label="Comment"
                    {...text}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Send</Button>
            </Grid>
            <div>
                {track.comments.map(comment => (
                    <div key={comment._id}>
                        <div>Author - {comment.username}</div>
                        <div>Comment - {comment.text}</div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params || !params.id) {
        return {
            notFound: true,
        };
    }

    const response = await axios.get('http://localhost:5000/tracks/' + params.id);
    return {
        props: {
            serverTrack: response.data,
        },
    };
};