import React from 'react';
//  import { makeStyles } from '@material-ui/core/styles';
import "./Details.css";
import Header from "../../common/header/Header";
import { useParams } from "react-router-dom";

export default function Details(props) {
    let { restaurantId } = useParams();
    //const classes = makeStyles();
    const [restaurantDetails, setRestaurantDetails] = React.useState(getRestaurantDetails());
    const [error, setError] = React.useState(false);
    const [erorCode, setErorCode] = React.useState(null);
    const [erorMsg, setErorMsg] = React.useState("");
    function getRestaurantDetails() {
        //console.log(restaurantId);
        var url = props.baseUrl + "restaurant/" + restaurantId;
        fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                response.json().then((json) => {
                    console.log(json);
                    return json;
                })
            } else {
                console.log("Error " + response.status);
                response.json().then((json) => {
                    setError(true);
                    setErorCode(json.code);
                    setErorMsg(json.message);
                })
            }
        }, error => {
            console.log("Error while making request to FoodOrderingApp Backend", error)
            setError(true);
            setErorCode(error.code);
            setErorMsg("Error while making request to FoodOrderingApp Backend");
        })
    }
    return (
        <div>
            <Header showSearchBar={false} />
        </div>
    )
}