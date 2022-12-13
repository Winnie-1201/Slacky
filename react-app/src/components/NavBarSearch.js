import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSearch } from '../store/search';
import './NavBarLoggedIn.css';

const NavBarSearch = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [keyword, setKeyword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault()

        const res = await dispatch(getSearch(keyword))
        if (res) {
            history.push(`/search/${keyword}`)
        }
        setKeyword('')

    }

    return (
        <form onSubmit={onSubmit}>
            <div className='logged-in-navbar'>
           <input placeholder='search placeholder'/>
</div>
        </form>
    )
}


export default NavBarSearch
