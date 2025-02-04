import React, { useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/actions-creators/track";
import { GetServerSideProps } from 'next';

const Index = () => {
    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)
    const [query, setQuery] = useState<string>('')

    const <search></search>

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout title={"Track list - music service"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Track list</h1>
                            <Button onClick={() => router.push('/tracks/create')}>
                                Download
                            </Button>
                        </Grid>
                    </Box>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(await fetchTracks())
      return {
        props: {}, // will be passed to the page component as props
      };
    }
  );