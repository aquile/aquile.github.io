/**
 * Created by aquile_bernadotte on 23.01.16.
 */

import React from 'react';

export default function ListItem({text, onDelete}) {
    return <li>{text} <button onClick={onDelete}>X</button></li>;
}