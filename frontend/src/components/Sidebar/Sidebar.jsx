import React, { useState, useRef, useEffect } from 'react'
import styles from './Sidebar.module.css'

const sortList = [
    {
        id: 1,
        value: "Price (High to Low)"
    },
    {
        id: 2,
        value: "Price (Low to High)"
    },
    {
        id: 3,
        value: "Bedrooms"
    },
    {
        id: 4,
        value: "Bathrooms"
    },
    {
        id: 5,
        value: "Square Feet"
    }
]

 export default function Sidebar({location, realEstates}) {

    const [title, setTitle] = useState('select...')
    const [open, setOpen] = useState(false)
    const [sortOption, setSortOption] = useState('')
    const wrapperRef = useRef(null)
    useOutsideModal(wrapperRef)

    const toggle = () => { setOpen(!open) }

    function useOutsideModal(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            };
        }, [ref])
    }
        
    function handleOnClick (item) {

        setSortOption(item.id)
        setTitle(item.value)
    }

    function sortFnc (a,b) {
        if(sortOption === 1) {
            return b.price - a.price
        }
        else if(sortOption === 2) {
            return a.price - b.price
        }
        else if(sortOption === 3) {
            return b.bedrooms - a.bedrooms
        }
        else if(sortOption === 4) {
            return b.bathrooms - a.bathrooms
        }
        else if(sortOption === 5) {
            return b.sqft - a.sqft
        }
    }

    return (
        <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <span className={styles.searchTitle}>{location.charAt(0).toUpperCase() + location.slice(1)} Real Estate & Homes For Sale</span>
                    <div ref={wrapperRef} className={styles.sortLabel}>
                        Sort by:{'\u00A0'}
                        <div  className={styles.header} role='button' onKeyPress={() => toggle()} onClick={ () => toggle()} >
                            <div className={styles.headerTitle}>
                                {title}
                            </div>
                        </div>
                        <div className={`${styles.wrapper} ${open ? styles.wrapperOpen : ""} `}>
                            {open && (
                                <ul className={styles.list}>
                                    {
                                        sortList.map(item => (
                                            <li className={styles.listItem} key={item.id}>
                                                <button type='button' onClick={() => handleOnClick(item)}>
                                                    {item.value}
                                                </button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            <ul className={styles.sidebarList}>
            {realEstates.sort(sortFnc).map( estate => ( 
                <li key={estate.id} className={styles.item}>
                    <article className={styles.card}>
                    <img className={styles.cardPhoto} src={estate.thumbnail} alt='estate'></img>
                    <div className={styles.cardInfo}>
                        <span className={styles.estatePrice}>${estate.price}</span>
                        <span>{estate.bedrooms} bds {estate.bathrooms} ba {estate.sqft} sqft</span>
                        <span>{estate.address}</span>
                    </div>
                    </article>                  
                </li>
            ))}
            </ul>
        </div>
    )
}

