import { Fragment } from 'react';
import {Input} from 'reactstrap';

export default function EmailInput(props){
    return (
        <Fragment>
        {props.alert && <p><sub>{props.alert}</sub></p>}
        <Input type="email" {...props} pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />
        </Fragment>
    );
}