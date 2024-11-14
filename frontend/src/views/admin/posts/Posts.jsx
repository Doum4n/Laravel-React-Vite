import { Col, Container, Row, Table } from "react-bootstrap";
import SideBar from "../sidebar/sidebar";
import NavBar from "../navbar/navbar";
import { useEffect, useState } from "react";
import { set } from "firebase/database";
import { Checkbox, InputLabel, ListItemText, MenuItem, OutlinedInput } from "@mui/material";
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';


const Post = () => {
    const [posts, setPosts] = useState([]);
    const [selectId, setSeletedId] = useState(null);
    const [column, setColumn] = useState([]);
    const [action, setAction] = useState('');
    const handleChange = (event) => {
        setAction(event.target.value);
    };

    const handleColumnChange = (event) => {
        const {
            target: { value },
        } = event;
        setColumn(
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(column);
    };

    const columns = [
        'Id',
        'Title',
        'Username',
        'Create_at',
        'Update_at'
    ]

    const sortedColumn = column.sort((a, b) => {
        return columns.indexOf(a) - columns.indexOf(b);
    });

    const PostCell = ({ Id, Title, Username, Create_at, Update_at }) => {
        const [selectId, setSeletedId] = useState(null);

        useEffect(() => {
            console.log(selectId);
        }, [selectId]);

        const OnSeleted = (id) => {
            setSeletedId(id);
        };

        const rowData = { Id, Title, Username, Create_at, Update_at };

        return (
            <tr>
                {sortedColumn.map((col) => (
                    <th key={col}>{rowData[col]}</th>
                ))}

                <th className="d-flex justify-content-center">
                    {action === 'View' && (
                        <Button variant="contained" onClick={() => OnSeleted(Id)}>View</Button>
                    )}
                    {action === 'Delete' && (
                        <Checkbox />
                    )}
                </th>
            </tr>
        );
    };

    useEffect(() => {
        fetch('http://0.0.0.0/post/index')
            .then(response => {
                if (!response.ok) throw new Error('Cant get post');
                return response.json();
            })
            .then(data => {
                setPosts(data);
                console.log('ok')
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));

        setColumn(columns);
    }, [])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <Container fluid className="mt-3">
            <Row>
                <Col md={2}>
                    <SideBar />
                </Col>
                <Col md={10}>
                    <NavBar />
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="checkbox-label">Tag</InputLabel>
                            <Select
                                labelId="checkbox-label"
                                id="multiple-checkbox"
                                multiple
                                value={column}
                                onChange={handleColumnChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {columns.map((col) => (
                                    <MenuItem key={col} value={col}>
                                        <Checkbox checked={column.includes(col)} />
                                        <ListItemText primary={col} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant="contained">Fillter</Button>
                        <Button variant="contained">Export</Button>

                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {sortedColumn.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}

                                <th>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-label">Action</InputLabel>
                                        <Select
                                            labelId="select-label"
                                            id="select"
                                            value={action}
                                            label="Action"
                                            onChange={handleChange}
                                            style={{ minWidth: '90px' }}
                                        >
                                            <MenuItem value={'View'}>View</MenuItem>
                                            <MenuItem value={'Delete'}>Delete</MenuItem>
                                        </Select>
                                    </FormControl>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <PostCell
                                    Id={post.id}
                                    Title={post.title}
                                    Username=''
                                    Create_at={post.created_at}
                                    Update_at={post.updated_at}
                                />
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Post