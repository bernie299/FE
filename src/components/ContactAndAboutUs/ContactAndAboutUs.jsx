import React from 'react';
import { WrapperContactAndAboutUs, ContactInfo, AboutUsInfo } from './style';

const ContactAndAboutUs = () => (
  <WrapperContactAndAboutUs>
    <ContactInfo>
      <h2>Instructors</h2>
      <p>Đặng Thanh Linh Phú</p>
    </ContactInfo>
    <ContactInfo>
      
      <h2>Contact</h2>
      <div>
        <p>Nguyễn Tiến Đạt</p>
        <p>Email: dat.nt3160@gmail.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Mssv: 2183160</p>
      </div>
      <div>
        <p>Nguyễn Trung Hiếu</p>
        <p>Email: 22012296@sinhvien.hoasen.edu.vn</p>
        <p>Phone: +123 456 7890</p>
        <p>Mssv: 22012296</p>
      </div>
    </ContactInfo>
    <AboutUsInfo>
      <h2>About Us</h2>
      <p>Ngày bắt đầu Dự án Website: 11/09/2023</p>
    </AboutUsInfo>
  </WrapperContactAndAboutUs>
);

export default ContactAndAboutUs;