import React, { useState } from 'react';
import styles from './styles.module.css'

const App = () => {
    const [count, setCount] = useState(0);

    const handeCounter = () => {
        setCount(count + 1);
    }

    return <div className={styles.app}>
        <div className={styles.title}>React component</div>
        <div className={styles.counter}><button onClick={handeCounter}>COUNTER IN REACT</button> {count}</div>
    </div>;
}

const Page = () => {
    return <><App /></>;
};

export default Page;