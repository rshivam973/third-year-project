import React from 'react'
import CardContainer from './CardContainer'
import HomeInfoCardContainer from './HomeInfoCardContainer'
import Hero from './Hero'

function Home() {
    //console.log("home rendered");
    return (
        <div>
            <Hero/>
            <CardContainer/>
            <HomeInfoCardContainer/>
        </div>
    )
}

export default React.memo(Home)
