import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./Details.css";
import Header from "../../common/header/Header";
import { useParams} from "react-router-dom";

export default function Details(props){
    let { restaurantId } = useParams();
    console.log(restaurantId);

    return (
      <div>
        <Header showSearchBar={false} />
      </div>
    )
}