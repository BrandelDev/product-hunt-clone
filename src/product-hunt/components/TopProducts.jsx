import icon1 from '../../assets/Home/1416dd26-6580-47d9-899a-12726184b052.mp4'
import icon2 from '../../assets/Home/product-1.mp4'
import icon3 from '../../assets/Home/product-3.avif'
import icon4 from '../../assets/Home/product-4.avif'
import icon5 from '../../assets/Home/producto-5.avif'
import iconUp from '../../assets/Home/icon-up.png'
import best from '../../assets/Home/best.jpg'
import './TopProducts.css'

export const TopProducts = () => {
    const handleVideoEnded = (event) => {
        // Reiniciar la reproducción del video cuando termine
        event.target.play();
    };


    const topProducts = [
        {
            iconUrl: icon1,
            typeOfIcon: 'video',
            nameOfProduct: 'Reflex',
            description: 'Build web apps in pure Python',
            numberOfComments: '128',
            categories: ['Web app', 'Open Source', 'Developer Tools']
        },
        {
            iconUrl: icon2,
            typeOfIcon: 'video',
            nameOfProduct: 'Collabwriting for Teams',
            description: 'The easiest way to capture, store, and find knowledge ',
            numberOfComments: '123',
            categories: ['Browser Extensions', 'Chrome Extentions', 'Productivity']
        },
        {
            iconUrl: icon3,
            typeOfIcon: 'image',
            nameOfProduct: 'Pullpo.io',
            description: 'Complete code reviwes in hours, not days, right from slack ',
            numberOfComments: '52',
            categories: ['Productivity,', 'Software Engineeering', 'Developer Tools']
        },
        {
            iconUrl: icon4,
            typeOfIcon: 'image',
            nameOfProduct: 'Latitude',
            description: 'Open-source framework for embedded analytics',
            numberOfComments: '37',
            categories: ['Open source,', 'GitHub', 'Developer Tools']
        },
        {
            iconUrl: icon5,
            typeOfIcon: 'image',
            nameOfProduct: 'Cascadeur',
            description: 'You can clean up and edit assets and mocap with AI',
            numberOfComments: '17',
            categories: ['Analytics', 'Artificial Inteligence', 'Developer Tools']
        }

    ]

    return (
        <>
            {topProducts.map((item) => (
                <div className="row product d-flex align-items-center">
                    <div className="col-md-1 me-3">
                        {item.typeOfIcon === 'video' && (
                            <video autoPlay width='48px' onEnded={handleVideoEnded}>
                                <source src={item.iconUrl} type="video/mp4" />
                            </video>
                        )}
                        {item.typeOfIcon == 'image' && (

                            <img width='48px' src={item.iconUrl} />
                        )
                        }



                    </div>
                    <div className="col-md-8">
                        <div className="py-3 my-2">
                            <label><b>{item.nameOfProduct}</b> — {item.description}</label>
                            <div className="sub-description-product fs-6">
                                <svg width='16px' xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 13 12"><path d="M10.99 5.126c0-2.422-2.236-4.376-5-4.376S1 2.714 1 5.126C1 7.537 3.236 9.5 6 9.5c.288 0 .576-.028.854-.076l.029.038 3.416 1.287-.182-2.05c-.058-.6.106-1.182.394-1.715A3.9 3.9 0 0 0 11 5.115l-.01.01Z"></path></svg>
                                {item.numberOfComments}{item.categories.map(e => (<label>{' • ' + e}</label>))}
                            </div>

                        </div>
                    </div>

                    <div className='col-md-2 text-center'>
                        <button type="button" data-test="vote-button" class="buttom-up">
                            <div class="flex flex-col items-center">
                                <img src={iconUp} width='20px' />
                                <div class="">{item.numberOfComments}</div>
                            </div>
                        </button>
                    </div>



                </div>
            ))}
            <div className='row'>
                <img src={best} className='w-100' />
            </div>


        </>
    )


}