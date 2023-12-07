import { Badge, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup } from "./style";
import * as UserService from '../../services/UserService'
import { UserAddOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from "../../redux/slides/productSlide";


const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const [username, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const dispatch = useDispatch()
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const order = useSelector((state) => state.order)
    const [Search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate('profile')} > Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => handleClickNavigate('admin')} > Quản lý hệ thống </WrapperContentPopup>
            )}
            <WrapperContentPopup  onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
            <WrapperContentPopup onClick={() => handleClickNavigate}>Đăng xuất</WrapperContentPopup>
            
        </div>
    );

    const handleClickNavigate = (type) => {
        if(type === 'profile') {
            navigate('/profile-user')
        }else if(type === 'admin'){
            navigate('/system/admin')
        }else if(type === 'my-order'){
            navigate('/my-order', { state: {
                id: user?.id,
                token : user?.access_token
            }
            })
        }else{
            handleLogout()
        }
        setIsOpenPopup(false)
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', background: '#9255FD', justifyContent: 'center' }}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WrapperTextHeader to='/'>
                        WebPhone
                    </WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size="large"
                            bordered={false}
                            textbutton="Tìm Kiếm"
                            placeholder="Input Search Text"
                            onChange={onSearch}
                        />
                    </Col>
                )}
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <Loading isLoading={loading}>
                        <WrapperHeaderAccount>
                            {userAvatar ? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                            ) : (
                                <UserAddOutlined style={{ fontSize: '30px' }} />
                            )}

                            {user?.access_token ? ( // Kiểm tra xem người dùng đã đăng nhập và có tên người dùng hay không
                                <>
                                    <Popover content={content} trigger="click" oopen={isOpenPopup}>
                                        <div style={{ cursor: 'pointer' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{username?.length ? username : user?.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                // Nếu không đăng nhập, hiển thị nút Đăng nhập/Đăng ký
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeaderSmall>Đăng Nhập/ Đăng Ký</WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}

                        </WrapperHeaderAccount>
                    </Loading>
                    {!isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{cursor: 'pointer'}}>
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>

                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent 