import React, { useEffect, useState} from 'react'
import './NumberInput.css';
import { useDispatch, useSelector } from 'react-redux'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const NumberInput = ({startNum, handleRemove, handleAdd}) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const { userData } = useSelector(state => state.user)
    
    return (
        <>
        <div className="number-input">
            <div className="remove" onClick={handleRemove}>
                <RemoveIcon />
            </div>
            <div id="content-number">
                { startNum }
            </div>
            <div className="add" onClick={handleAdd}>
                <AddIcon />
            </div>
        </div>


        </>
    );
};

export default NumberInput;
