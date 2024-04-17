
export const HomePage = () => {

    const borderRight = {
        borderRight: '1px solid #d9e1ec',
        paddingRight: '10px'
    };

    const borderBottom = {
        borderBottom: '1px solid #d9e1ec'
    }
   
    const topProducts = [
        {
            iconUrl: '',
            nameOfProduct: 'Reflex',
            description: 'Build web apps in pure Python',
            numberOfComments: '128',
            categories: ['Web app,', 'Open Source', 'Developer Tools']
        },
        {
            iconUrl: '',
            nameOfProduct: 'Reflex',
            description: 'Build web apps in pure Python',
            numberOfComments: '128',
            categories: ['Web app,', 'Open Source', 'Developer Tools']
        },
        {
            iconUrl: '',
            nameOfProduct: 'Reflex',
            description: 'Build web apps in pure Python',
            numberOfComments: '128',
            categories: ['Web app,', 'Open Source', 'Developer Tools']
        },
        {
            iconUrl: '',
            nameOfProduct: 'Reflex',
            description: 'Build web apps in pure Python',
            numberOfComments: '128',
            categories: ['Web app,', 'Open Source', 'Developer Tools']
        },
        {
            iconUrl: '',
            nameOfProduct: 'Reflex',
            description: 'Build web apps in pure Python',
            numberOfComments: '128',
            categories: ['Web app,', 'Open Source', 'Developer Tools']
        }

    ]



    return (
        
        <>
            <div className="">
                <div className="row pt-3 mt-3">
                    <div className="col-2"></div>
                    <div style={borderRight} className="col-lg-5">
                        <div className="alert alert-primary">
                            <h3>Welcome to Product Hunt! 👋</h3>
                            <label>The place to lauch andd discover new tech products. Take a tour</label>
                        </div>
                        <div style={borderBottom} className="pb-2 d-flex align-items-center justify-content-between pt-2 mt-2 ">

                            <h3>Top Products Launching Today</h3>



                            <div className="d-flex justify-content-end ">
                                <a className="me-3">Featured</a> | <a className="ms-3">All</a>
                            </div>
                        </div>


                    </div>
                    <div className="col-lg-4">
                        <label className="mb-3 pb-2">TOP LAUNCHES</label>
                        <div className="d-flex flex-column ">

                        <label className="mb-1" ><b>Today's winners</b></label> 
                        <label className="mb-1"><b>Yesterday's winners</b></label> 
                        <label className="mb-1" ><b>Last week's winners</b></label>
                        <label className="mb-1"><b>Last month's winners</b></label>
                        </div>
                        
                        

                    </div>
                </div>
            </div>
        </>
    )
}