import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getSearch } from '../../store/search';
import './search.css'


const SearchMessages = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const channel_message = useSelector(state => state.search.channelMessages)
    const group_message = useSelector(state => state.search.groupMessages)
    console.log("message in component",channel_message,group_message)

    useEffect(() => {
        dispatch(getSearch(keyword))
    }, [dispatch, keyword])

    return (
        <div className='search-container'>

            {channel_message.length ?
                `{channel_message.length} results for ${keyword}`
                : `Nothing turned up for ${keyword}`
            }



        </div>

)
}


export default SearchMessages;
