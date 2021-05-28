import React from 'react'
import styles from './Searchbar.module.css'
import Loupe from '../../assets/svgs/loupe/loupe'

export default function Searchbar(props) {

    const handleEnterDown = (e) => {
        if( e.key === 'Enter') {
            props.fetchData();
        }
    }

    return (
        <div className={styles.wrapper}>
            <input className={styles.searchInput} type='text' onChange={(e) => props.setLocation(e.target.value)} onKeyDown={handleEnterDown} placeholder='Address'></input>
            <button className={styles.loupe} type='button' value='search' onClick={props.fetchData}>
                <Loupe />
            </button>
            <input className={styles.searchBtn} type='button' value='price'></input>
            <input className={styles.searchBtn} type='button' value='Beds & Baths'></input>
        </div>
    )
}

