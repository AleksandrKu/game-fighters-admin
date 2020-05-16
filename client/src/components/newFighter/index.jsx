import { TextField } from "material-ui"
import { createFighter } from "../../services/domainRequest/fightersRequest";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import './newFighter.css';

export default function NewFighter({ onCreated }) {
    const [name, setName] = useState();
    const [power, setPower] = useState();
    const [defense, setDefense] = useState();
    const [source, setSource] = useState();

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onPowerChange = (event) => {
        const value = event.target.value || event.target.value === 0 ? Number(event.target.value) : null;
        setPower(value);
    }

    const onDefenseChange = (event) => {
        const value = event.target.value || event.target.value === 0 ? Number(event.target.value) : null;
        setDefense(value);
    }

    const onSourceChange = (event) => {
        setSource(event.target.value);
    }

    const onSubmit = async () => {
        const data = await createFighter({ name, power, defense, source });
        if(data && !data.error) {
            onCreated(data);
        }
    }

    return (
        <div id="new-fighter">
            <div>New Fighter</div>
            <TextField onChange={onNameChange} id="standard-basic1" label="Standard" placeholder="Name"/>
            <TextField onChange={onPowerChange} id="standard-basic2" label="Standard" placeholder="Power" type="number" />
            <TextField onChange={onDefenseChange} id="standard-basic3" label="Standard" placeholder="Defense" type="number" />
            <TextField onChange={onSourceChange} id="standard-basic4" label="Standard" placeholder="Source"/>
            <Button onClick={onSubmit} variant="contained" color="primary">Create</Button>
        </div>
    );
};