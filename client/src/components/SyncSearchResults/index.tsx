import { useContext } from 'react';
import { useMutation } from "@tanstack/react-query";
import { syncSearchResults } from "../../api";
import { Button } from "@mui/material";
import { UserContext } from "../../context/UserContext.tsx";
import { Container } from './style';

const SyncSearchResults = () => {
    const { isAdmin } = useContext(UserContext)
    const { mutate, isLoading } = useMutation(() => {
        return syncSearchResults()
    })

    if (!isAdmin) {
        return null;
    }

    return (
        <Container>
            <Button disabled={isLoading} onClick={() => mutate()} variant="contained">Sync search results</Button>
        </Container>
    );
}

export default SyncSearchResults;
