import React, {useState} from "react";

const ResourceFilter = (props) => {
    const [list, setList] = useState(3);
    const itemPerPageHandler = (e) => {
        setList(e.target.value);
    }
    
    props.onChange(list);

    return(
        <div className={props.className}>
            <div className={`viewBox ${props.spacing}`}>
                <div className="form-group">
                    <label>View:</label>
                    <select onChange={itemPerPageHandler} value={list}>
                        <option>3</option>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ResourceFilter;

