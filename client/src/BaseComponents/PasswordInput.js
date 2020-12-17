import {Fragment} from 'react';
import {Input} from 'reactstrap';

export default function PasswordInput(props){
    return (
        <Fragment>
        {props.alert && <p><sub>{props.alert}</sub></p>}
        <Input type="password" {...props} patterns="^([a-zA-Z0-9@*#]{8,15})$" />
        </Fragment>
    );
}