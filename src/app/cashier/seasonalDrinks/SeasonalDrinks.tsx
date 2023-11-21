"use client"; // necessary for useState to work
import styles from './page.module.css'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cart from '../page'

export default function SeasonalDrinks({ addToCart }: { addToCart: any }) {

    const [menuData, setMenuData] = useState<any[]>([]); // for fetching menu data

    const fetchMenu = async () => {
        const response = await fetch('/api/manager/menuDisplay');
        const json = await response.json();
        setMenuData(json.message);
    }

    // Fetch menu data on page load
    useEffect(() => {
        fetchMenu();
    },[]);  
    
    const handleOrderSelection = (menuItem: any) => {
      addToCart(menuItem);
    };

    return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          {menuData
            .filter(menuItem => menuItem.drink_type === 'Seasonal Drinks')
            .map((menuItem, index) => (
              <div className={styles.imageContainer} key={index}>
                {/* Wrap the Image inside a Link so it's clickable */}
                <Link href={`http://localhost:3000/cashier`}>
                  <Image
                    src="/images/brownsugarimgj.jpg"
                    alt={`Boba Drink ${index + 1}`}
                    width={300}
                    height={300}
                    className={styles.image}
                  />
                </Link>
                <p>Boba Drink {index + 1}</p>
                <p>Drink Name: {menuItem.drink_name}</p>
                <button onClick={() => handleOrderSelection(menuItem)}>Add to Order</button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}