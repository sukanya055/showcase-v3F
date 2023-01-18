import React from 'react'
import circle1 from '../../../assets/circle1.png'
import circle2 from '../../../assets/circle2.png'
import circle3 from '../../../assets/circle3.png'
import circle4 from '../../../assets/circle4.png'
import shoes from '../../../assets/shoes1.png'
// import person from '../../assets/person.png'
import elipse1 from '../../../assets/Ellipse1.png'
import elipse2 from '../../../assets/Ellipse 2.png'

const Hero = () => {

    return (
        <div>
            <div className="hero min-h-screen p-0 my-20 lg:my-0">
                <div className="hero-content items-start flex-col lg:flex-row-reverse  max-w-[1600px] p-0">
                    <div className='lg:w-[60%] w-full relative'>
                        <div>
                            <div className='absolute top-0 left-[90px]'>
                                <img className='w-[120px]' src={circle3} alt="" />
                                <img className='w-[31px]' src={circle4} alt="" />
                            </div>
                        </div>
                        <div className='flex justify-end w-full relative mt-40'>
                            <img
                                className='w-[200px] md:w-[300px] lg:w-[354px] xl:w-[500px] 2xl:w-[552px] 2xl:h-[480px] absolute top-[94px] lg:top-[161px] xl:top-[134px]  right-[100px]  lg:right-[183px] xl:right-[238px]'
                                src={circle1}
                                alt=""
                            />
                            <img
                                className='w-[230px] md:w-[400px]  lg:w-[400px] xl:w-[480px]  2xl:w-[580px] 2xl:h-[601px]'
                                src={circle2}
                                alt=""
                            />
                            <div className='absolute  '>
                                <img className=' w-[70%] lg:w-[80%] ml-[27%] lg:mt-[82px]  lg:ml-[92px]' src={shoes} alt="shoes" />
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-[40%] my-20 lg:my-0'>
                        <div>
                            <img src={elipse1} alt="" />
                            <img src={elipse2} alt="" />
                        </div>
                        <div className='pl-5 md:pl-14'>
                            <h1 className="text-[27px] md:text-[34px] lg:text-[44px] xl:text-[53px] 2xl:text-[64px] text-[#112D57] font-bold">Let’s Showcase</h1>
                            <p className="py-6 text-[#5C5C5C] lg:text-[23px] xl:[26px] 2xl:text-[30px] leading-[34px] md:leading-[48px]">Bringing your product online is now easy and brezzy.You have
                                something to sell , show is online.</p>

                        </div>
                        <div className='pl:5  md:pl-14 flex justify-center lg:justify-start gap-9'>
                            <button className="btn btn-primary bg-[#FF109F] rounded-full border-0 outline-none text-white px-5 sm:px-7">Shop more</button>
                            <button className="btn btn-primary bg-[#719efd] opacity-[0.3] rounded-full border-0 outline-none text-white px-5 sm:px-7">Read more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero