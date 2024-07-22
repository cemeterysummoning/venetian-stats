import { google } from 'googleapis';
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, Input, TableContainer } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import {Select} from '@mui/material';
import {MenuItem} from '@mui/material';
import {InputLabel} from '@mui/material';
const categoryOrder = ["History", "Literature", "Science", "Fine Arts", "Thought & Culture", "Entertainment", "Modern World", "All"]
import { GoogleAuth } from 'google-auth-library';
import Head from 'next/head';

function sortPlayers(a, b) {
    let a1 = a.gamePoints;
    let a2 = a.points;
    let b1 = b.gamePoints;
    let b2 = b.points;
    return (b1 < a1) ? -1 : (b1 > a1) ? 1 : ( (b2 < a2) ? -1 : (b2 > a2) ? 1 : 0)
}

export async function getServerSideProps() {
    // const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
    const base64EncodedServiceAccount = process.env.BASE_64_ACCOUNT
    const decodedServiceAccount = Buffer.from(base64EncodedServiceAccount, 'base64').toString('utf-8')
    const credentials = JSON.parse(decodedServiceAccount)
    const auth = new GoogleAuth({
        credentials: credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] 
    })

    const sheets = google.sheets({ version: 'v4', auth });

    const range = `Statistics!A1:J51`;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID_u18_novice,
        range
    });

    const [titles, ...content] = response.data.values;

    let final = []

    for (let j = 1; j < titles.length - 1; j++) {
        let player_data = []
        for (let i = 0; i < content.length; i++) {
            let total_stats = content[i][j].split(',')
            let [played, doubled, points, pointsAdj] = total_stats.map(item => Number(item))
            let game_points = Number(content[i][titles.length - 1])
            let temp = {
                id: i + 2,
                url: `/u18-novice/players/${i + 2}`, 
                player: content[i][0],
                played: played,
                doubled: doubled,
                points: points,
                pointsAdj: pointsAdj, 
                gamePoints: game_points
            }
            player_data.push(temp);
        }
        player_data.sort(sortPlayers)
        for (let i = 0; i < player_data.length; i++) {
            player_data[i]["ranking"] = i + 1;
        }
        final.push(player_data)
    }


    
    return {
        props: {
            final
        }
    }
}

function Home({ final }) {
    const [category, setCategory] = useState(7)

    const handleChange = (e) => {
        setCategory(e.target.value);
    }

    return ( 
    <>
    <Head>
    <title>U18 Novice</title>
   </Head>
        <main className="content">
        <div className="title"><h1>U18 Novice Standings</h1></div>
        <FormControl sx={{m: 1, minWidth: 120}}>
            <InputLabel id="cat-label">Category</InputLabel>
            <Select
                labelId="cat-label"
                id="category-select"
                value={category}
                label="Category"
                onChange={handleChange}>
                <MenuItem value={0}>History</MenuItem>
                <MenuItem value={1}>Literature</MenuItem>
                <MenuItem value={2}>Science</MenuItem>
                <MenuItem value={3}>Fine Arts</MenuItem>
                <MenuItem value={4}>Thought and Culture</MenuItem>
                <MenuItem value={5}>Entertainment</MenuItem>
                <MenuItem value={6}>Modern World</MenuItem>
                <MenuItem value={7}>All</MenuItem>
                {
                    categoryOrder.map((cat, ind) => {
                        (<MenuItem value={ind}>{cat}</MenuItem>)
                    })
                }
            </Select>
        </FormControl>
        <TableContainer>
            <DataGrid
                rows={final[category]}
                columns={[
                    {field: 'ranking', headerName: 'Ranking', flex: 0.5, minWidth: 25},
                    {field: 'player', headerName: 'Player', flex: 2, minWidth: 200,
                        renderCell: (params) => (<Link href={params.row.url}>{params.row.player}</Link>), cellClassName: 'name'},
                    {field: 'played', headerName: 'Cycles Played', flex: 1, minWidth: 150},
                    {field: 'doubled', headerName: 'Cycles Doubled', flex: 1, minWidth: 150},
                    {field: 'points', headerName: 'Total Points', flex: 1, minWidth: 150},
                    {field: 'pointsAdj', headerName: 'Total Points (unadj. for doubling)', flex: 1, minWidth: 150},
                    {field: 'gamePoints', headerName: 'Game Points', flex: 1, minWidth: 150}
                ]}
                style = {{
                        display: "block",
                        overflowX: "auto"
                }}
                />
        </TableContainer>
    </main> 
    </>
);
}

export default Home;