import React from 'react';
import Header from './Header';
import Footer from './Footer';


const Layout = (props) => {
    return (
        <>
            <Header session={props.session}/>
                {props.children}
            <Footer/>
        </>
        );

}

export default Layout;