import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperProducts, WrapperButtonMore, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import Slider1 from '../../assets/images/Slider1.jfif'
import Slider2 from '../../assets/images/Slider2.jfif'
import Slider3 from '../../assets/images/Slider3.jfif'
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import ContactAndAboutUs from "../../components/ContactAndAboutUs/ContactAndAboutUs";



const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [loading,setLoading] = useState(false)
    const [limit, setlimit] = useState(6)
    const [TypeProducts,setTypeProducts] = useState ([])
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
            return res
    }

    const fetAlltypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if(res?.status === 'OK'){
        setTypeProducts(res?.data)
    }
 }
    const { isLoading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })

    useEffect(() => {
        fetAlltypeProduct()
    }, [])

    return (
        <Loading isLoading={isLoading || loading}>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {TypeProducts.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
                <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}>
                    <SliderComponent arrImages={[Slider1, Slider2, Slider3]} />
                    <WrapperProducts >
                        {products?.data?.map((product) => {
                            return (
                                <CardComponent
                                    key={product._id}
                                    countInSttock={product.countInSttock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    discount={product.discount}
                                    selled={product.selled}
                                    id={product._id}
                                    />
                            )
                        })}
                    </WrapperProducts>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore  textButton={isPreviousData ? 'Load more' : "Xem Thêm"} type="outline" styleButton={{
                            border: `1px solid rgb(11,116,229)`, color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11,116,229)'}`,
                            width: '240px', height: '38px', borderRadius: '4px'
                        }}
                            disable={products?.total === products?.data?.length || products?.totalPage === 1}
                            styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length&& '#fff' }}
                            onClick={() => setlimit((prev)=> prev + 6)}
                            />
                    </div>
                </div>
            </div>
            <ContactAndAboutUs />
        </Loading>

    )
}

export default HomePage