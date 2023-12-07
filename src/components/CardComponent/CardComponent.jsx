import React from "react";
import { StarFilled } from '@ant-design/icons';
import { WrapperCardStyle, StyleNameProduct, WrapperReportText, WrapperPriceText, WrapperDiscountText, WrapperStyleTextSell } from "./style";
import logo from '../../assets/images/logo.png'
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../ultils";





const CardComponent = (props) => {
  const { countInSttock, description, image, name, price, rating, type, selled, discount, id } = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: '200px', height: '200px' }}
      style={{ width: 240 }}
      bodyStyle={{ padding: '10px' }}
      cover={<img alt="example" src={image} />}
      onClick={() => handleDetailsProduct(id)}
    >
      <img
        src={logo} alt="logo"
        style={{
          width: '68px',
          height: '14px',
          position: 'absolute',
          top: -1,
          left: -1,
          borderTopLeftRadius: '3px'
        }} />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          <span>{rating}</span><StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54' }} />
        </span>
        <WrapperStyleTextSell>| Đã bán {selled || 1000}+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
        <WrapperDiscountText>-{discount || 5} %</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle >
  )
}


export default CardComponent;
