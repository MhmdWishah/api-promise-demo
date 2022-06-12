import React, { useState } from "react";
import "./App.css";
function App() {

    const [data, setData] = React.useState([]);
    const [titleInput, setTitleInput] = React.useState("");
    const [imageInput, setImageInput] = React.useState("");
    const [loader, setLoader] = React.useState(false);

    
    React.useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setLoader(true);
        await fetch('https://629e71fe3dda090f3c19d701.mockapi.io/v1/meals', {method: 'get'} )
            .then((res) => res.json())
            .then((res) => {
                setData(res);
                setLoader(false);
            }).catch((err) => { setLoader(false); })
    }

    const saveNewData = async (body) => {
        setLoader(true);
        await fetch('https://629e71fe3dda090f3c19d701.mockapi.io/v1/meals', {method: 'post', body: body} )
            .then((res) => res.json())
            .then((res) => {
                setData([...data, res]);
                setTitleInput("");
                setImageInput("");
                setLoader(false);
            }).catch((err) => {
                setLoader(false);
            })
    }

    const handleClick = (event) => {
        event.preventDefault();
        if(!!titleInput && !!imageInput){
            const obj = {
                title: titleInput,
                image: imageInput
            };
            saveNewData(obj);
        }
    }


    return (
        <div className="hero">
            <form onSubmit={(e) => handleClick(e)}>
                <input placeholder="Enter Title" className="titleInput" value={titleInput} onChange={(e) => {setTitleInput(e.target.value);}}/>
                <input placeholder="Enter Image Url" type="url" className="imgInput" value={imageInput} onChange={(e) => {setImageInput(e.target.value)}}/>
                {loader? 
                    <span className="spinner"></span>
                    :
                    <button>Store</button>
                }
                
            </form>

            <div className="cardsContainer">
                {data.map((item, index) => 
                    <div key={index} className="card">
                        <img src={item.image} alt="image"/>
                        <hr/>
                        <p>{item.name}</p>
                    </div>
                )}
            </div> 
        </div>
    );
}

export default App;