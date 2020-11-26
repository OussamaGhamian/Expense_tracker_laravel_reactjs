import axios from 'axios';


const handleAuth = async (e, resource, data, setUser, setToken) => {
    e.preventDefault();
    let fd = new FormData()
    Object.keys(data).map(key => {
        // console.log(key, data[key])
        fd.append(key, data[key])
    })
    // console.log(fd.get('name'));
    try {
        const response = await axios.post(`http://localhost:8000/api/${resource}`, fd, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });
        console.log(response)
        if (response.data.msg) {
            return response.data.msg
        }
        const { user, access_token } = response.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setToken(access_token);
    } catch (err) {
        console.log(err)
    }
}
const getData = async (resource, setter) => {
    const response = await axios.get(`http://localhost:8000/api/${resource}`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    });
    setter([...response.data.data]);
}

const handleSubmit = async (e, resource, data, setter, dataset) => {
    e.preventDefault();
    try {
        const response = await axios.post(`http://localhost:8000/api/${resource}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        });
        if (dataset.length)
            setter([response.data.data, ...dataset])
        else
            setter([response.data.data])
    } catch (err) {
        console.log(err);
        alert(`!!! Violation has happened !!!
        
        \u2022Duplicate categories are not allowed
        \u2022Duplicate expenses are not allowed`);
    }
}
const handleDelete = async (resource, id, setter, dataset) => {
    try {
        let msg = resource === 'category' ? "Deleting a category will delete all its expenses, sure?" : "Delete this expense, sure?";
        let conf = window.confirm(msg);
        if (!conf) {
            return;
        }
        const response = await axios.delete(`http://localhost:8000/api/${resource}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        });
        if (response.statusText === "OK") {
            setter([...dataset.filter(item => item.id !== id)])
        }
    } catch (err) {
        console.log(err)
    }
}
const handleUpdate = async (resource, id, setter, dataset, data) => {
    console.log(data);
    console.log(dataset);
    console.log(id, resource);
    try {
        const response = await axios.put(`http://localhost:8000/api/${resource}/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        if (response.statusText === "OK") {
            dataset.forEach(element => {
                if (element.id === id)
                    Object.assign(element, response.data.data);
            });
            console.log(dataset)
            setter([...dataset]);
        }
        console.log(response)
    } catch (err) {
        console.log(err);
    }
}
export { handleAuth, getData, handleSubmit, handleDelete, handleUpdate };