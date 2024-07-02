import { google } from "googleapis";
import { DataGrid } from '@mui/x-data-grid';
import { TableContainer } from '@mui/material';
import { GoogleAuth } from "google-auth-library";
import Head from "next/head";
const columns = [
    {field: 'category', headerName: 'Category', flex: 2, minWidth: 200},
    {field: 'played', headerName: 'Cycles Played', flex: 1, minWidth: 150},
    {field: 'doubled', headerName: 'Cycles Doubled', flex: 1, minWidth: 150},
    {field: 'points', headerName: 'Total Points', flex: 1, minWidth: 150},
    {field: 'pointsAdj', headerName: 'Total Points (unadj. for doubling)', flex: 1, minWidth: 150},
    {field: 'ppb', headerName: 'PPB', flex: 1, minWidth: 150},
    {field: 'ppbAdj', headerName: 'PPB (unadj. for doubling)', flex: 1, minWidth: 150}
]

const categoryOrder = ["History", "Literature", "Science", "Fine Arts", "Thought & Culture", "Entertainment", "Modern World", "All"]
export async function getServerSideProps({ query }) {
    const base64EncodedServiceAccount = process.env.BASE_64_ACCOUNT
    const decodedServiceAccount = Buffer.from(base64EncodedServiceAccount, 'base64').toString('utf-8')
    const credentials = JSON.parse(decodedServiceAccount)
    const auth = new GoogleAuth({
        credentials: credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] 
    })

    const sheets = google.sheets({ version: 'v4', auth });

    const { id } = query;

    const range = `Statistics!A${id}:I${id}`;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID_u18_novice,
        range
    });

    const [title, ...content] = response.data.values[0];
    let rowData = []

    for (let i = 0; i < content.length; i++) {
        let nums = content[i].split(',').map(a => Number(a))

        let temp = {
            id: i,
            category: categoryOrder[i],
            played: nums[0], 
            doubled: nums[1], 
            points: nums[2],
            pointsAdj: nums[3]
        }

        if (temp["played"] != 0) {
            temp["ppb"] = Number(temp["points"] / temp["played"]).toFixed(2)
            temp["ppbAdj"] = Number(temp["pointsAdj"] / temp["played"]).toFixed(2)
        } else {
            temp["ppb"] = Number(0).toFixed(2)
            temp["ppbAdj"] = Number(0).toFixed(2)
        }
        rowData.push(temp)
    }

    return {
        props: {
            title,
            rowData
        }
    }
}

export default function Post({ title, rowData }) {
    return <>
    <Head>
    <title>{title}</title>
   </Head>
        <main className="content">
        <div className="title">
                <h1>{title}</h1>
                
            </div>
            <TableContainer>
                    <DataGrid
                        rows={rowData}
                        columns={columns}
                        style = {{
                            display: "block",
                            overflowX: "auto"
                    }} />
                </TableContainer>
        </main>
    </>

}